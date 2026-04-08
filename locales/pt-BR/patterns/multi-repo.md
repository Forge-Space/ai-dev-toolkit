# Workflows Multi-Repo

> Quando uma mudança atravessa vários repositórios, a ordem importa mais do que a velocidade.

## O Problema

Em trabalho multi-repo, agentes tendem a otimizar localmente: corrigem o consumidor antes da biblioteca, abrem PRs fora de ordem ou esquecem dependências de release. Isso cria filas quebradas, versões inconsistentes e integrações que funcionam apenas no ambiente local.

## O Pattern

Trate o conjunto de repositórios como um sistema:
- descubra a ordem de dependência
- mude primeiro a peça mais abaixo na cadeia
- faça release ou pin da dependência
- atualize consumidores depois
- valide o fluxo inteiro, não só cada repo isoladamente
