import { writeFile, mkdir, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import kleur from "kleur";
import { loadIndex, fetchRawFile } from "../lib/catalog.js";
import {
  ensureSkillsDir,
  ensureAgentsDir,
  skillInstallPath,
  agentInstallPath,
} from "../lib/claude-config.js";

export async function runInstall(args: string[]): Promise<void> {
  const id = args[0];
  if (!id) {
    console.error("Usage: adtl install <skill-or-agent-id>");
    process.exit(2);
  }
  const index = await loadIndex();
  const entry = index.entries.find(
    (e) => (e.kind === "skill" || e.kind === "agent") && e.id === id,
  );
  if (!entry) {
    console.error(kleur.red(`✗ no skill or agent with id '${id}'`));
    console.error(kleur.dim("  run `adtl list --kind skill` or `adtl list --kind agent`"));
    process.exit(1);
  }

  const force = args.includes("--force") || args.includes("-f");

  if (entry.kind === "skill") {
    await installSkill(id, force);
  } else {
    await installAgent(id, force);
  }
}

async function installSkill(id: string, force: boolean) {
  await ensureSkillsDir();
  const target = skillInstallPath(id);
  if (existsSync(target) && !force) {
    console.error(kleur.yellow(`✗ ${target} already exists. Pass --force to overwrite.`));
    process.exit(1);
  }
  await mkdir(target, { recursive: true });
  for (const name of ["manifest.json", "SKILL.md"]) {
    const content = await loadFile(`catalog/skills/${id}/${name}`);
    await writeFile(path.join(target, name), content);
  }
  console.log(kleur.green(`✓ installed skill '${id}'`));
  console.log(kleur.dim(`  → ${target}`));
  console.log(kleur.dim("  Claude Code picks this up on next session start."));
}

async function installAgent(id: string, force: boolean) {
  await ensureAgentsDir();
  const target = agentInstallPath(id);
  if (existsSync(target) && !force) {
    console.error(kleur.yellow(`✗ ${target} already exists. Pass --force to overwrite.`));
    process.exit(1);
  }
  const content = await loadFile(`catalog/agents/${id}.md`);
  await writeFile(target, content);
  console.log(kleur.green(`✓ installed agent '${id}'`));
  console.log(kleur.dim(`  → ${target}`));
  console.log(kleur.dim("  Claude Code picks this up on next session start."));
}

async function loadFile(repoRelPath: string): Promise<string> {
  const localCandidate = path.resolve(process.cwd(), repoRelPath);
  if (existsSync(localCandidate)) return readFile(localCandidate, "utf8");
  return fetchRawFile(repoRelPath);
}
