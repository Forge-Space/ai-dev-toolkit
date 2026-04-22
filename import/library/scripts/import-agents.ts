/**
 * Import curated Claude sub-agents from dev-assets/global/claude/agents/.
 *
 * Agents are single files that install to ~/.claude/agents/<id>.md. Source
 * frontmatter is Claude Code's sub-agent format (name, description, model,
 * level, disallowedTools). We rewrite it into catalog/agents/<id>.md with a
 * library-standard frontmatter shape that passes agent.schema.json.
 *
 * Blocks on secrets scan. Idempotent.
 */
import { readFile, writeFile, mkdir, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { CATALOG_ROOT } from "./lib/catalog.ts";
import { scanText, formatFindings } from "./lib/secrets.ts";

const SOURCE = process.env.ADT_AGENTS_DIR
  ?? "/Volumes/External HD/Desenvolvimento/dev-assets/global/claude/agents";

// Curate ~10 broadly-useful agents. Keep the domain spread: architecture,
// debugging, review, testing, execution, git, verification, critique,
// planning, documentation.
const AGENTS = new Set([
  "architect",
  "debugger",
  "code-reviewer",
  "test-engineer",
  "executor",
  "git-master",
  "verifier",
  "critic",
  "planner",
  "document-specialist",
]);

function slugOf(filename: string): string {
  return filename.replace(/\.md$/i, "");
}

function titleCase(slug: string): string {
  return slug
    .split("-")
    .map((w) => (w.length <= 2 ? w.toUpperCase() : w[0].toUpperCase() + w.slice(1)))
    .join(" ");
}

function tagsFor(slug: string, description: string): string[] {
  const base = new Set<string>(["agent", "claude-code"]);
  const d = description.toLowerCase();
  if (/review|lint|quality/.test(d)) base.add("review");
  if (/test|qa/.test(d)) base.add("testing");
  if (/debug|regression|root.?cause/.test(d)) base.add("debugging");
  if (/architect|design/.test(d)) base.add("architecture");
  if (/git|branch|worktree/.test(d)) base.add("git");
  if (/plan|strategy/.test(d)) base.add("planning");
  if (/doc|writer|readme/.test(d)) base.add("docs");
  if (/verif|validation|check/.test(d)) base.add("verification");
  if (/critic|critique/.test(d)) base.add("critique");
  if (/execut/.test(d)) base.add("execution");
  return Array.from(base).slice(0, 8);
}

async function main() {
  if (!existsSync(SOURCE)) {
    console.error(`❌ source not found: ${SOURCE}`);
    process.exit(1);
  }

  const files = (await readdir(SOURCE)).filter((f) => f.endsWith(".md")).sort();
  const findings: Awaited<ReturnType<typeof scanText>> = [];
  const written: string[] = [];
  const skipped: string[] = [];
  const destDir = path.join(CATALOG_ROOT, "agents");
  await mkdir(destDir, { recursive: true });

  for (const file of files) {
    const slug = slugOf(file);
    if (!AGENTS.has(slug)) {
      skipped.push(slug);
      continue;
    }

    const src = path.join(SOURCE, file);
    const raw = await readFile(src, "utf8");
    const hits = scanText(src, raw);
    if (hits.length) {
      findings.push(...hits);
      continue;
    }

    const { data: srcFront, content: body } = matter(raw);
    const name = titleCase(slug);
    const description = (srcFront.description as string) ?? "";
    if (!description) {
      console.error(`❌ ${slug}: missing description in source frontmatter`);
      process.exit(1);
    }

    // Library-standard frontmatter — schema-validated.
    const front: Record<string, unknown> = {
      id: slug,
      name,
      description: description.slice(0, 500),
      version: "0.1.0",
      tags: tagsFor(slug, description),
    };
    if (srcFront.model) front.model = String(srcFront.model);
    if (srcFront.level !== undefined) front.level = Number(srcFront.level);
    if (srcFront.disallowedTools) {
      const dt = srcFront.disallowedTools;
      const arr = Array.isArray(dt)
        ? dt.map(String)
        : String(dt)
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean);
      front.disallowed_tools = arr;
    }
    front.source = { type: "local", path: `dev-assets/global/claude/agents/${file}` };
    front.license = "MIT";
    front.author = "Lucas Santana";

    const rebuilt = matter.stringify(body.trimStart(), front);
    await writeFile(path.join(destDir, `${slug}.md`), rebuilt);
    written.push(slug);
  }

  if (findings.length) {
    console.error("❌ secrets scan BLOCKED import. Fix these before re-running:\n");
    console.error(formatFindings(findings));
    process.exit(1);
  }

  console.log(`✅ imported ${written.length} agents`);
  for (const w of written) console.log(`  agent  ${w}`);
  if (skipped.length) {
    console.log(`\nskipped (not in allowlist): ${skipped.length}`);
    for (const s of skipped) console.log(`  - ${s}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
