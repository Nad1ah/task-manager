
## Visão Geral

O Sistema de Gestão de Tarefas é uma aplicação web full stack que permite aos utilizadores gerir tarefas e projetos de forma eficiente. A aplicação foi desenvolvida utilizando Node.js, Express e MongoDB para o backend, e React com Tailwind CSS para o frontend.

## Tecnologias Utilizadas

### Backend
- **Node.js**: Ambiente de execução JavaScript
- **Express**: Framework web para Node.js
- **MongoDB**: Base de dados NoSQL
- **Mongoose**: ODM (Object Data Modeling) para MongoDB
- **JWT**: JSON Web Tokens para autenticação
- **bcryptjs**: Para encriptação de senhas
- **cors**: Middleware para habilitar CORS
- **dotenv**: Para gestão de variáveis de ambiente

### Frontend
- **React**: Biblioteca JavaScript para construção de interfaces
- **React Router**: Para navegação entre páginas
- **Tailwind CSS**: Framework CSS para design responsivo
- **Axios**: Cliente HTTP para comunicação com a API
- **Context API**: Para gestão de estado global

## Estrutura do Projeto

### Backend

```
server/
├── src/
│   ├── config/
│   │   └── db.js              # Configuração da conexão com MongoDB
│   ├── controllers/
│   │   ├── authController.js  # Controladores de autenticação
│   │   ├── taskController.js  # Controladores de tarefas
│   │   └── projectController.js # Controladores de projetos
│   ├── middleware/
│   │   └── authMiddleware.js  # Middleware de autenticação
│   ├── models/
│   │   ├── userModel.js       # Modelo de utilizador
│   │   ├── taskModel.js       # Modelo de tarefa
│   │   └── projectModel.js    # Modelo de projeto
│   ├── routes/
│   │   ├── authRoutes.js      # Rotas de autenticação
│   │   ├── taskRoutes.js      # Rotas de tarefas
│   │   └── projectRoutes.js   # Rotas de projetos
│   └── app.js                 # Ponto de entrada da aplicação
├── .env                       # Variáveis de ambiente
├── package.json               # Dependências e scripts
└── tests/                     # Testes da API
```

### Frontend

```
client/
├── public/                    # Arquivos públicos
├── src/
│   ├── components/            # Componentes reutilizáveis
│   │   ├── layout/            # Componentes de layout
│   │   ├── tasks/             # Componentes de tarefas
│   │   ├── projects/          # Componentes de projetos
│   │   └── ui/                # Componentes de UI
│   ├── context/
│   │   └── auth/              # Contexto de autenticação
│   ├── pages/
│   │   ├── auth/              # Páginas de autenticação
│   │   ├── tasks/             # Páginas de tarefas
│   │   ├── projects/          # Páginas de projetos
│   │   └── Dashboard.js       # Página principal
│   ├── services/
│   │   ├── auth/              # Serviços de autenticação
│   │   ├── tasks/             # Serviços de tarefas
│   │   └── projects/          # Serviços de projetos
│   ├── utils/                 # Funções utilitárias
│   ├── App.js                 # Componente principal
│   ├── index.js               # Ponto de entrada
│   └── index.css              # Estilos globais
└── package.json               # Dependências e scripts
```

## Funcionalidades

### Autenticação
- Registo de novos utilizadores
- Login com email e senha
- Proteção de rotas com JWT
- Gestão de perfil de utilizador

### Gestão de Tarefas
- Criação, leitura, atualização e exclusão de tarefas
- Filtros por status, prioridade e projeto
- Atribuição de tarefas a projetos
- Adição de tags às tarefas
- Definição de datas de vencimento

### Gestão de Projetos
- Criação, leitura, atualização e exclusão de projetos
- Visualização de tarefas por projeto
- Personalização de cores para projetos

### Dashboard
- Visão geral de tarefas e projetos
- Estatísticas de tarefas por status
- Acesso rápido a tarefas recentes

## API Endpoints

### Autenticação

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | /api/auth/register | Registar novo utilizador |
| POST | /api/auth/login | Login de utilizador |
| GET | /api/auth/me | Obter perfil do utilizador atual |
| PATCH | /api/auth/me | Atualizar perfil do utilizador |

### Tarefas

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | /api/tasks | Obter todas as tarefas do utilizador |
| POST | /api/tasks | Criar nova tarefa |
| GET | /api/tasks/:id | Obter tarefa específica |
| PATCH | /api/tasks/:id | Atualizar tarefa |
| DELETE | /api/tasks/:id | Excluir tarefa |

### Projetos

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | /api/projects | Obter todos os projetos do utilizador |
| POST | /api/projects | Criar novo projeto |
| GET | /api/projects/:id | Obter projeto específico |
| PATCH | /api/projects/:id | Atualizar projeto |
| DELETE | /api/projects/:id | Excluir projeto |
| GET | /api/projects/:id/tasks | Obter tarefas de um projeto específico |

## Modelos de Dados

### Utilizador (User)
```javascript
{
  name: String,
  email: String,
  password: String,
  avatar: String,
  createdAt: Date
}
```

### Tarefa (Task)
```javascript
{
  title: String,
  description: String,
  status: String, // 'pending', 'in_progress', 'completed'
  priority: String, // 'low', 'medium', 'high'
  dueDate: Date,
  project: ObjectId, // Referência ao Projeto
  tags: [String],
  owner: ObjectId, // Referência ao Utilizador
  createdAt: Date
}
```

### Projeto (Project)
```javascript
{
  name: String,
  description: String,
  color: String,
  owner: ObjectId, // Referência ao Utilizador
  createdAt: Date
}
```

## Instalação e Execução

### Requisitos
- Node.js (v14 ou superior)
- MongoDB

### Backend
1. Navegue até a pasta do servidor:
   ```
   cd task-manager/server
   ```

2. Instale as dependências:
   ```
   npm install
   ```

3. Configure as variáveis de ambiente:
   Crie um arquivo `.env` na raiz do servidor com o seguinte conteúdo:
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/task-manager
   JWT_SECRET=seu_segredo_jwt
   JWT_EXPIRES_IN=90d
   ```

4. Inicie o servidor:
   ```
   npm start
   ```
   Para desenvolvimento:
   ```
   npm run dev
   ```

### Frontend
1. Navegue até a pasta do cliente:
   ```
   cd task-manager/client
   ```

2. Instale as dependências:
   ```
   npm install
   ```

3. Inicie a aplicação:
   ```
   npm start
   ```

## Deployment

### Backend
1. Configure as variáveis de ambiente para produção
2. Execute `npm run build` para otimizar o código
3. Deploy em um serviço como Heroku, AWS, ou similar

### Frontend
1. Execute `npm run build` para criar a versão de produção
2. Deploy em um serviço como Netlify, Vercel, ou similar

## Segurança
- Senhas encriptadas com bcrypt
- Autenticação com JWT
- Proteção contra CSRF e XSS
- Validação de dados em todas as requisições

## Responsividade
A aplicação é totalmente responsiva, adaptando-se a diferentes tamanhos de tela:
- Desktop: Layout completo com sidebar fixa
- Tablet: Layout adaptativo com sidebar recolhível
- Mobile: Layout otimizado com menu hambúrguer

## Acessibilidade
- Contraste adequado para leitura
- Navegação por teclado
- Atributos ARIA para leitores de tela
- Foco visual para elementos interativos

## Melhorias Futuras
- Implementação de notificações
- Compartilhamento de tarefas e projetos
- Integração com calendário
- Modo offline
- Temas personalizáveis
- Integração com serviços externos (Google Calendar, Slack, etc.)

## Licença
Este projeto está licenciado sob a licença MIT.
