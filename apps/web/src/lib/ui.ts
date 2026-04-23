import { marked } from "marked";

export type Kind = "skill" | "server" | "agent" | "collection" | "doc" | "hook" | "command" | "tool";

export function displayEntryName(name: string): string {
  return name
    .replace(/^Adt\s+/i, "")
    .replace(/\bAi\b/g, "AI")
    .replace(/\bApi\b/g, "API")
    .replace(/\bCi Cd\b/g, "CI/CD")
    .replace(/\bMcp\b/g, "MCP")
    .replace(/\bRag\b/g, "RAG")
    .replace(/\bRtk\b/g, "RTK");
}

export function kindGlyph(kind: Kind): string {
  switch (kind) {
    case "skill":
      return "SK";
    case "server":
      return "MCP";
    case "agent":
      return "AG";
    case "collection":
      return "COL";
    case "doc":
      return "DOC";
    case "hook":
      return "HK";
    case "command":
      return "CMD";
    case "tool":
      return "TL";
  }
}

export function kindIcon(kind: Kind): string {
  return kindGlyph(kind);
}

export function kindLabel(kind: Kind): string {
  switch (kind) {
    case "skill":
      return "Skill";
    case "server":
      return "MCP server";
    case "agent":
      return "Agent";
    case "collection":
      return "Collection";
    case "doc":
      return "Doc";
    case "hook":
      return "Hook";
    case "command":
      return "Command";
    case "tool":
      return "Tool";
  }
}

export function installCommand(kind: Kind, id: string): string | null {
  if (kind === "skill" || kind === "agent" || kind === "hook" || kind === "command" || kind === "tool") {
    return `npx forge-kit install ${id}`;
  }
  if (kind === "server") return `npx forge-kit add-server ${id}`;
  return null;
}

export function renderMarkdown(body: string): string {
  return marked.parse(body, { async: false, gfm: true, breaks: false }) as string;
}
