# AI Dev Toolkit

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Latest Release](https://img.shields.io/github/v/release/LucasSantana-Dev/ai-dev-toolkit)](https://github.com/LucasSantana-Dev/ai-dev-toolkit/releases)
[![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg)](CONTRIBUTING.md)

**Idioma:** [English](README.md) | Português

A maioria das sessões de programação com IA falha por um motivo: o agente não tem contexto do projeto.

O `ai-dev-toolkit` reúne blocos reutilizáveis para corrigir isso — templates de regras, padrões de construção de contexto e orquestração, implementações de referência e scripts de terminal para workflows pesados em IA. O resultado é saída mais previsível, menos retrabalho e entrega mais rápida.

Precisa também de um bootstrap portátil para máquinas novas? Veja o repositório companheiro [ai-dev-toolkit-setup](https://github.com/LucasSantana-Dev/ai-dev-toolkit-setup).

## Escolha o repositório certo

- Use **ai-dev-toolkit** quando você quiser padrões reutilizáveis, templates de regras, implementações de referência e guias de workflow com IA para copiar entre vários projetos.
- Use **ai-dev-toolkit-setup** quando você quiser preparar uma máquina nova com CLI, shell, tmux, MCP e ambiente OpenCode já configurados.

## Índice

- [Escolha o repositório certo](#escolha-o-repositório-certo)
- [Por que este toolkit](#por-que-este-toolkit)
- [Início rápido](#início-rápido)
- [Como adotar em uma semana](#como-adotar-em-uma-semana)
- [Mapa do repositório](#mapa-do-repositório)
- [Filosofia](#filosofia)
- [Para quem é](#para-quem-é)
- [Contribuindo](#contribuindo)
- [Licença](#licença)

## Por que este toolkit

| Sem ele | Com ele |
|---|---|
| Boilerplate genérico | Código alinhado às suas convenções |
| Reexplicar a estrutura a cada sessão | Contexto carregado no primeiro dia |
| Um modelo caro para tudo | Modelo certo para cada tarefa |
| Coordenação manual entre sessões | Filas e padrões de orquestração |
| Decisões repetidas toda semana | Memória durável e contexto persistente |
| Ações arriscadas do agente | Guardrails e limites de permissão |
| Saída difícil de auditar | Rastros, testes e observabilidade |

## Início rápido

### 1) Adicione um arquivo de regras ao projeto

```bash
cp rules/CLAUDE.md your-project/CLAUDE.md             # Claude Code / OpenCode
cp rules/AGENTS.md your-project/AGENTS.md             # Codex CLI / OpenCode
cp rules/.cursorrules your-project/.cursorrules       # Cursor
cp rules/.windsurfrules your-project/.windsurfrules   # Windsurf
cp rules/COPILOT.md your-project/COPILOT.md           # GitHub Copilot
```

Essa é a mudança de maior impacto imediato: o agente recebe suas convenções antes do primeiro prompt.

### 2) Leia o padrão principal

Comece por [Context Building](patterns/context-building.md). Ele é a base dos demais padrões.

### 3) Configuração opcional do Claude Code

```bash
bash tools/setup-claude-code.sh
```

Esse script configura `~/.claude/.mcp.json` com servidores MCP recomendados, define modelos padrão/subagentes, cria a estrutura inicial de memória e faz uma auditoria de plugins.

### 4) Instale a stack opcional de produtividade

```bash
bash tools/install-macos.sh
bash tools/install-ubuntu.sh
.\tools\install-windows.ps1
bash tools/setup-ai-workflow-macos.sh
```

Se o seu objetivo aqui for preparar uma máquina nova, em vez de adotar os padrões no seu projeto, o caminho certo é o repo [ai-dev-toolkit-setup](https://github.com/LucasSantana-Dev/ai-dev-toolkit-setup).

## Como adotar em uma semana

| Dia | Ação | Recurso |
|---|---|---|
| 1 | Adicionar um arquivo de regras | `rules/CLAUDE.md` ou equivalente |
| 2 | Aplicar Context Building | [`patterns/context-building.md`](patterns/context-building.md) |
| 3 | Adicionar Task Orchestration | [`patterns/task-orchestration.md`](patterns/task-orchestration.md) |
| 4 | Reforçar review e testes | [`patterns/code-review.md`](patterns/code-review.md), [`patterns/testing.md`](patterns/testing.md) |
| 5 | Adicionar memória e observabilidade | [`patterns/memory-systems.md`](patterns/memory-systems.md), [`patterns/agent-observability.md`](patterns/agent-observability.md) |

## Mapa do repositório

### `patterns/`
Playbooks agnósticos de ferramenta para problemas recorrentes em workflows com IA.

Principais arquivos:
- [Context Building](patterns/context-building.md)
- [Prompt Engineering](patterns/prompt-engineering.md)
- [Task Orchestration](patterns/task-orchestration.md)
- [Multi-Model Routing](patterns/multi-model-routing.md)
- [Session Management](patterns/session-management.md)
- [Memory Systems](patterns/memory-systems.md)
- [Code Review](patterns/code-review.md)
- [Testing with AI](patterns/testing.md)
- [Git Worktrees](patterns/git-worktrees.md)
- [Agent Gotchas](patterns/agent-gotchas.md)
- [Multi-Repo Workflows](patterns/multi-repo.md)
- [Agent Observability](patterns/agent-observability.md)

### `best-practices/`
Guias transversais de segurança, workflow e gestão de contexto.

### `rules/`
Templates prontos para copiar e adaptar ao seu projeto.

### `tools/`
Scripts e automações para acelerar workflows de IA. Consulte [tools/README.md](tools/README.md) para a lista completa de ferramentas, ordem de adoção e comandos locais.

### `implementations/`
Implementações de referência por ferramenta:
- Claude Code
- Codex CLI
- OpenCode
- Cursor

### `examples/`
Arquivos prontos para copiar, como backlog e estrutura de memória do Claude Code.

## Filosofia

1. Qualidade de contexto vence upgrade de modelo.
2. Design de ambiente vence troca impulsiva de provedor.
3. Automatize o agendamento, não só a geração de código.
4. Reutilize decisões entre sessões.
5. Evite lock-in mantendo tudo o mais agnóstico possível.

## Para quem é

- Pessoas que usam ferramentas de coding com IA diariamente e querem mais consistência.
- Times que precisam de padrões compartilhados para desenvolvimento assistido por IA.
- Projetos novos que querem nascer com uma fundação pronta para IA.

## Contribuindo

Veja [CONTRIBUTING.md](CONTRIBUTING.md).

Contribuições de alto impacto:
- novos padrões realmente testados em produção
- implementações de referência para ferramentas ainda não cobertas
- melhorias em scripts de instalação e guardrails de segurança

## Licença

[MIT](LICENSE)
