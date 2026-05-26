# 💰 Money — Gestão Financeira

Aplicativo mobile de gestão financeira desenvolvido com React Native (Expo) e uma API REST com Express + Prisma + PostgreSQL.

---

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

| Software | Versão mínima | Download |
|---|---|---|
| Node.js | 20.x LTS | [nodejs.org](https://nodejs.org) |
| Git | Qualquer | [git-scm.com](https://git-scm.com) |
| PostgreSQL | 16 ou 17 | [postgresql.org](https://www.postgresql.org/download/windows/) |
| pgAdmin 4 | Qualquer | Incluído na instalação do PostgreSQL |
| Android Studio | Qualquer | [developer.android.com](https://developer.android.com/studio) |

---

## 🗂️ Estrutura do Projeto

```
praticas/
├── gestao-financeira/        ← App React Native
└── gestao-financeira-api/    ← API REST
```

---

## ⚙️ Passo 1 — Clonar o Repositório

Abra o **PowerShell** ou **Terminal** e execute:

```bash
git clone https://github.com/yvos77/aulas_progdm.git
cd aulas_progdm/praticas/projeto_money
```

---

## 🗄️ Passo 2 — Configurar o Banco de Dados

### 2.1 — Abrir o pgAdmin 4

1. Abra o **pgAdmin 4** pelo menu Iniciar
2. Na barra lateral, expanda **Servers** → **PostgreSQL 16** (ou 17)
3. Clique com botão direito em **Databases** → **Create** → **Database**
4. No campo **Database**, digite: `gestao_financeira`
5. Clique em **Save**

### 2.2 — Criar um usuário do banco

Clique com botão direito em **Login/Group Roles** → **Create** → **Login/Group Role**:

- **Name:** `admin`
- Aba **Definition** → **Password:** `admin123`
- Aba **Privileges** → ative **Can login?** e **Create databases?**
- Clique em **Save**

### 2.3 — Dar permissões ao usuário

Clique com botão direito em **gestao_financeira** → **Query Tool** e execute:

```sql
GRANT ALL PRIVILEGES ON DATABASE gestao_financeira TO admin;
```

---

## 🖥️ Passo 3 — Configurar e Rodar a API

Abra um terminal na pasta `gestao-financeira-api`:

```bash
cd gestao-financeira-api
```

### 3.1 — Instalar dependências

```bash
npm install
```

### 3.2 — Criar o arquivo de variáveis de ambiente

Crie um arquivo chamado `.env` na raiz de `gestao-financeira-api` com o seguinte conteúdo:

```env
DATABASE_URL="postgresql://admin:admin123@localhost:5432/gestao_financeira"
PORT=3000
JWT_SECRET=gestao_financeira_secret_2026
```

> ⚠️ **Atenção:** Se durante a instalação do PostgreSQL você definiu um usuário e senha diferentes, ajuste o `DATABASE_URL` substituindo `admin` pelo seu usuário e `admin123` pela sua senha.

### 3.3 — Rodar as migrations

```bash
npx prisma migrate dev
```

> Se aparecer erro de versão do Node, instale o Node 18 ou 20 em [nodejs.org](https://nodejs.org).

### 3.4 — Popular o banco com as categorias iniciais

```bash
npm run prisma:seed
```

Deve aparecer: `Seed concluído.`

### 3.5 — Iniciar o servidor

```bash
npm run dev
```

Deve aparecer: `API rodando em http://localhost:3000`

### 3.6 — Verificar que está funcionando

Abra o navegador e acesse: `http://localhost:3000`

Deve aparecer:
```json
{ "ok": true, "name": "gestao-financeira-api" }
```

---

## 📱 Passo 4 — Configurar o Emulador Android

### 4.1 — Abrir o Android Studio

1. Abra o **Android Studio**
2. Clique em **More Actions** → **Virtual Device Manager**
3. Se não houver nenhum dispositivo, clique em **Create Device**
4. Escolha **Pixel 6** e clique em **Next**
5. Escolha a imagem **API 34** (Android 14) e clique em **Next** → **Finish**
6. Clique no botão ▶️ para iniciar o emulador

> ⚠️ O emulador precisa estar **aberto e rodando** antes de continuar.

---

## 📦 Passo 5 — Configurar e Rodar o App

Abra um **novo terminal** na pasta `gestao-financeira`:

```bash
cd gestao-financeira
```

### 5.1 — Instalar dependências

```bash
npm install
```

### 5.2 — Criar o arquivo de variáveis de ambiente

Crie um arquivo chamado `.env` na raiz de `gestao-financeira` com o seguinte conteúdo:

```env
EXPO_PUBLIC_API_URL=http://10.0.2.2:3000
```

> ℹ️ **Por que `10.0.2.2`?** No emulador Android, `localhost` aponta para o próprio emulador. O IP `10.0.2.2` é especial — ele mapeia automaticamente para o `localhost` da máquina host, onde a API está rodando.

### 5.3 — Iniciar o app

```bash
npx expo start
```

Se aparecer uma mensagem perguntando sobre a porta, digite `y` para aceitar.

### 5.4 — Abrir no emulador

Com o emulador aberto, aperte a tecla **`a`** no terminal para abrir o app no Android.

Aguarde o build — pode levar alguns minutos na primeira vez.

---

## 🚀 Passo 6 — Usar o App

1. Na tela de login, clique em **Cadastre-se**
2. Crie uma conta com nome, email e senha
3. Após o cadastro, você será redirecionado para a tela principal
4. Explore as funcionalidades:
   - **Transações** → adicione, edite e exclua transações
   - **Categorias** → crie categorias personalizadas
   - **Resumo** → veja o gráfico de pizza e o saldo por categoria
   - **Filtro** → filtre por mês e ano em cada tela

---

## 🔄 Como Rodar da Próxima Vez

Na próxima vez que quiser rodar o projeto, basta:

**Terminal 1 — API:**
```bash
cd aulas_progdm/praticas/projeto_money/gestao-financeira-api
npm run dev
```

**Terminal 2 — App:**
```bash
cd aulas_progdm/praticas/projeto_money/gestao-financeira
npx expo start
```

E apertar **`a`** para abrir no emulador.

---

## ❗ Problemas Comuns

### "Cannot find module" ou erro de dependências
```bash
npm install
```

### "Error: connect ECONNREFUSED" na API
- Verifique se o PostgreSQL está rodando no pgAdmin
- Confirme que o `.env` tem as credenciais corretas

### App não conecta na API
- Confirme que o `.env` do app tem `EXPO_PUBLIC_API_URL=http://10.0.2.2:3000`
- Pare o Expo com `Ctrl+C` e reinicie com `npx expo start` após qualquer mudança no `.env`

### Emulador não aparece
- Abra o Android Studio e inicie o emulador antes de rodar o Expo
- Verifique se o emulador está totalmente carregado antes de apertar `a`

### Erro de versão do Node
- Instale o Node 20 LTS em [nodejs.org](https://nodejs.org)
- Reinicie o terminal após a instalação

### Porta 3000 já em uso
```bash
# Windows PowerShell
netstat -ano | findstr :3000
taskkill /PID <PID_ENCONTRADO> /F
```

---

## 🛠️ Tecnologias Utilizadas

**Frontend:**
- React Native com Expo
- Expo Router (navegação)
- Context API (estado global)
- AsyncStorage → substituído por PostgreSQL via API
- expo-secure-store (armazenamento seguro do token)

**Backend:**
- Node.js com Express
- Prisma ORM
- PostgreSQL
- JWT (autenticação)
- bcrypt (hash de senhas)
- Zod (validação)

---

## 👨‍💻 Desenvolvido por

Yuri Victor — IESB, 2026