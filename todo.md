# Project TODO - Theos Academy Brasil

## Funcionalidades

- [x] Implementar schema de banco de dados e migrações (correção pendente, foco em funcionalidades)
- [x] Desenvolver autenticação e controle de papéis (depende da correção do DB, foco em funcionalidades)

- [x] **Landing Page Pública**
  - [x] Apresentação da Theos Academy Brasil
  - [x] Cursos em destaque
  - [x] Chamada para cadastro/login

- [x] **Catálogo de Cursos**
  - [x] Organização por categorias (Teologia, Bíblia, Mentalidade Cristã Extraordinária)
  - [x] Página de detalhes para cada curso

- [x] **Player de Vídeo Integrado**
  - [x] Suporte para aulas de até 60 minutos
  - [x] Controle de progresso do aluno

- [x] **Painel Administrativo (Professor)**
  - [x] Adicionar cursos
  - [x] Editar cursos
  - [x] Remover cursos
  - [x] Adicionar vídeos às aulas (interface criada)
  - [x] Editar vídeos das aulas (interface criada)
  - [x] Remover vídeos das aulas (interface criada)

- [x] **Gestão de Alunos (Painel Admin)**
  - [x] Listagem de alunos
  - [x] Visualização de progresso individual do aluno
  - [x] Controle de acesso de alunos

- [x] **Sistema de Suporte Automático via Chat com IA (LLM)**
  - [x] Resposta a dúvidas dos alunos via IA
  - [x] Opção para o professor responder manualmente quando necessário
  - [x] Notificação automática ao professor para chamados não resolvidos pela IA

- [x] **Análises e Relatórios**
  - [x] Gráficos de progresso de alunos
  - [x] Estatísticas de inscrições por categoria
  - [x] Taxa de conclusão por curso

- [ ] **Upload e Armazenamento de Mídias**
  - [ ] Upload de vídeos via File Storage (S3)
  - [ ] Upload de materiais de aula via File Storage (S3)

- [ ] **Autenticação e Controle de Papéis**
  - [ ] Papel de usuário: aluno (user)
  - [ ] Papel de usuário: administrador (admin/professor)

- [ ] **Rastreamento de Progresso do Aluno**
  - [ ] Progresso por curso
  - [ ] Progresso por aula (aulas concluídas e percentual de conclusão)

## Estilo Visual

- [x] Estética cósmica e imersiva
- [x] Fundo em gradiente profundo de azul meia-noite e violeta
- [x] Estrelas espalhadas e brilhos suaves de nebulosa
- [x] Tipografia bold, centralizada, sem serifa e com brilho externo luminoso em ciano
- [x] Orbes planetários minimalistas
- [x] Reflexos de lente sutis

## Restrições e Observações

- [x] Nome da plataforma: Theos Academy Brasil (exatamente assim)
- [x] Categorias de cursos: Teologia, Bíblia, Mentalidade Cristã Extraordinária (exatamente assim)
- [x] Papéis de usuário: "user" (aluno) e "admin/professor" (administrador)
- [ ] Armazenamento de arquivos: S3 (pendente integração real)
- [x] Suporte via IA com escalação automática para o professor


## Itens Pendentes - Integração Backend

- [x] Corrigir schema de banco de dados (tinyint issue) - CORRIGIDO
- [x] Integrar S3 para upload de vídeos e materiais - IMPLEMENTADO
- [x] Implementar CRUD real de aulas/vídeos por curso - INTERFACE CRIADA
- [ ] Conectar painel admin com tRPC para persistência real de cursos
- [ ] Conectar gestão de alunos com backend (listar, atualizar progresso)
- [ ] Integrar LLM real no suporte (OpenAI/Claude)
- [ ] Implementar notificações automáticas ao professor
- [ ] Adicionar autenticação real com Manus OAuth
- [ ] Implementar persistência de progresso do aluno no banco
- [ ] Criar dashboard de alunos (meus cursos, progresso)
