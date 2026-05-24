# Teste Técnico — Desenvolvedor Backend Node.js (Júnior/Pleno)

Empresa: Namu (Saúde e Bem-Estar)
Nível: Júnior / Pleno (mesmo teste, avaliação pela qualidade da entrega)
Tempo estimado: 3 a 4 horas
Prazo de entrega: 7 dias corridos
Entrega: repositório público no GitHub

---

## Sobre a Namu

A Namu é uma empresa de saúde e bem-estar. Este teste simula um cenário do dia a dia de desenvolvimento na empresa.

Júnior e pleno fazem o mesmo teste. A diferença está na entrega: esperamos que pleno entregue mais funcionalidades, código melhor organizado, tratamento de erros mais completo e alguns diferenciais. Júnior deve focar em entregar o que é obrigatório, com clareza e código funcional.

### Sobre o uso de IA

Não é permitido usar ferramentas de IA como Copilot, ChatGPT ou Claude neste teste. O objetivo é avaliar raciocínio lógico e capacidade técnica real. Na entrevista, o time da Namu vai avaliar com base no projeto entregue.

---

## Projeto: API de gerenciamento de programas de bem-estar

Desenvolva uma API REST para gerenciar programas de bem-estar (meditação, yoga, nutrição) e suas atividades. A API deve permitir cadastro de programas, atividades vinculadas a cada programa e registro de participação dos usuários.

### O que fornecemos

Um `docker-compose.yml` com MySQL pronto, um `.env.example` e um script SQL de seed com dados iniciais.

O candidato configura o projeto Node.js do zero. O Docker Compose serve só para o banco.

### Funcionalidades obrigatórias

1. CRUD de Programas (`/programs`)
   - Campos: `id`, `name`, `description`, `category` (meditação, exercício, nutrição), `duration_weeks`, `created_at`, `updated_at`

2. CRUD de Atividades (`/programs/:programId/activities`)
   - Campos: `id`, `program_id`, `title`, `description`, `day_of_week`, `duration_minutes`

3. Registro de Participação (`/participations`)
   - Endpoint para registrar que um usuário completou uma atividade
   - Campos: `id`, `user_name`, `activity_id`, `completed_at`, `notes`

4. Relatório Simples (`GET /programs/:programId/summary`)
   - Retorna: total de atividades, total de participações, lista dos 5 participantes mais ativos

### Requisitos técnicos

- Node.js com TypeScript
- Framework: Express ou NestJS
- Banco de dados: MySQL (usar migrations)
- ORM: Sequelize ou TypeORM (incluir ao menos uma query mais elaborada, como a do relatório)
- Validação de dados nos endpoints (campos obrigatórios, tipos)
- Tratamento de erros com respostas HTTP adequadas
- ESLint + Prettier configurados
- Testes com Jest (ao menos unitários das regras de negócio)
- Git com commits organizados e descritivos

### Diferenciais (não obrigatórios)

- NestJS com módulos bem separados
- Docker Compose para subir app + banco com um comando
- Documentação da API (Swagger ou README detalhado)
- Paginação nos endpoints de listagem
- Endpoint de health check (`GET /health`)
- Testes de integração
- GitHub Actions básico para rodar testes

### Critérios de avaliação

| Critério | Peso |
|----------|------|
| Funcionamento correto da API | 25% |
| Estrutura e organização do código | 25% |
| Modelagem do banco de dados e queries | 20% |
| Tratamento de erros e validações | 15% |
| Testes (Jest) | 10% |
| README e documentação | 5% |

---

## Fluxo do processo

1. Teste take-home: você recebe este documento, desenvolve a solução e envia o link do repositório GitHub em até 7 dias
2. Avaliação técnica: time da Namu avalia o código entregue com base nos critérios deste documento
3. Entrevista técnica com a Namu: baseada no projeto entregue, o time avalia raciocínio lógico, entendimento da solução e o que você sabe fazer de fato

---

## Instruções de entrega

Crie um repositório público no GitHub com um `README.md` que contenha: descrição do projeto e funcionalidades implementadas, tecnologias utilizadas e por que as escolheu, instruções de instalação e execução, decisões técnicas relevantes e o que faria diferente com mais tempo.

### Prazo

7 dias corridos a partir do recebimento do teste.

### O que valorizamos

Código limpo e organizado importa mais do que quantidade de features. Commits bem escritos mostram processo de pensamento. Um README bem feito mostra capacidade de comunicação técnica. Tratamento de erros, validações e separação de responsabilidades contam bastante. Testes mostram cuidado com qualidade. O projeto precisa rodar seguindo as instruções do README, sem ajustes.

### O que não valorizamos

Over-engineering para o escopo proposto. Código sem tratamento de erros. Repositório com um commit gigante. README genérico ou vazio. Projeto que não roda.

---

## Rubrica de avaliação

| Nota | Classificação | Descrição |
|------|--------------|-----------|
| 9-10 | Excelente | Atende todos os requisitos, implementa diferenciais, código exemplar |
| 7-8 | Bom | Atende os requisitos principais, código organizado, poucas falhas |
| 5-6 | Satisfatório | Funciona parcialmente, organização básica, precisa de melhorias |
| 3-4 | Insuficiente | Muitas falhas, código desorganizado, requisitos principais incompletos |
| 0-2 | Eliminatório | Não funciona, plágio evidente, ou entrega vazia |

Nota mínima para aprovação: 6.0

### Diferenciação Júnior vs Pleno

| Aspecto | Júnior (esperado) | Pleno (esperado) |
|---------|-------------------|------------------|
| Funcionalidades | Obrigatórias funcionando | Obrigatórias + diferenciais |
| Código | Organizado e legível | Bem estruturado, com patterns claros |
| Erros | Tratamento básico | Tratamento completo com mensagens claras |
| Testes | Unitários básicos | Unitários + integração |
| Banco de dados | Modelagem funcional | Modelagem otimizada, queries elaboradas |
| Infraestrutura | Roda localmente | Docker Compose completo, noções de CI/CD |
