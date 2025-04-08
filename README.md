# 🍽️ Sistema de Gestão de Pedidos para Restaurante/Bar

Este projeto foi desenvolvido para gerenciar os pedidos em um restaurante/bar, integrando diferentes plataformas (mobile, web e backend) para facilitar o trabalho dos garçons e da equipe da cozinha.

---

## 📱💻 Visão Geral do Projeto

O sistema permite que garçons utilizem um aplicativo mobile para registrar os pedidos feitos nas mesas do restaurante/bar. Esses pedidos, ao serem finalizados, ficam disponíveis para visualização em uma interface web por parte da equipe da cozinha, que poderá prepará-los. A interface web também oferece funcionalidades de cadastro e gerenciamento de usuários, produtos e categorias.

---

## 🚀 Funcionalidades

### 📱 Aplicativo Mobile (Garçom)

- Login para acesso ao sistema
- Abertura de mesa
- Registro de pedidos (com seleção de categoria e produto)
- Exclusão de pedidos
- Exclusão de mesa (caso não haja pedidos)
- Finalização dos pedidos (envio para cozinha)

### 💻 Sistema Web (Cozinha/Administração)

- Login e logout de usuários
- Cadastro de novos usuários (garçons e administradores)
- Visualização de pedidos finalizados por mesa
- Visualização detalhada dos pedidos
- Cadastro de categorias e produtos
  - Imagem, nome, descrição, preço e categoria do produto
- Encerramento de mesa (fechamento da conta)

---

## 🛠️ Tecnologias Utilizadas

### 🔙 Back-end

- **Node.js** com **Express.js**
- **Prisma ORM**
- **PostgreSQL**
- **Docker** (para ambiente de desenvolvimento)
- **JWT** para autenticação
- **Joi** para validação de dados
- **Prettier**, **Jest**, **TypeScript**

### 🌐 Front-end

- **Next.js**
- **React**
- **Sass** para estilos
- **Lucide React**, **Sonner** e outras libs para UI/UX

### 📱 Mobile

- **React Native** com **Expo**
- **Expo Router**
- **React Navigation**
- **Axios**
- **Async Storage**
- **Expo Go** (execução via QRCode)

---

## 📁 Arquitetura do Projeto

O projeto está dividido em três diretórios principais:

```
.
├── back-end/
│   ├── src/
│   ├── prisma/
│   └── infra/ (scripts Docker para banco)
├── front-end/
│   ├── app/
│   ├── components/
│   └── services/
├── mobile/
│   ├── app/
│   ├── components/
│   └── scripts/
```

Cada parte do sistema é modularizada para garantir a escalabilidade e manutenção da aplicação.

---

## ☁️ Hospedagem

- 🔗 **Frontend (Vercel):** [https://restaurant-manager-front.vercel.app/](https://restaurant-manager-front.vercel.app/)
- 🔗 **Backend (Vercel):** [https://restaurant-manager-dun.vercel.app/](https://restaurant-manager-dun.vercel.app/)
- 🛢️ **Banco de dados (Produção):** [NEON - PostgreSQL Cloud](https://neon.tech)
- 📱 **Mobile:** Executado localmente via **Expo Go**

---

## ▶️ Como Rodar o Projeto Localmente

### 1. Clone o Repositório

```bash
git clone https://github.com/fabiomoraisandrade/restaurant-manager.git
cd restaurant-manager
```

### 2. Instale as Dependências

```bash
cd back-end
npm install
cd ../front-end
npm install
cd ../mobile
npm install
```

### 3. Executando o Backend

```bash
# Suba os serviços (PostgreSQL, etc.)
npm run services:up

# Execute o servidor
npm run dev
```

### 4. Executando o Frontend

```bash
cd front-end
npm run dev
```

### 5. Executando o Mobile

```bash
cd mobile
npx expo start
```

Você pode usar um emulador ou escanear o QRCode com o app **Expo Go** no seu dispositivo para abrir o app.

---

## 🧩 Próximos Passos

- Adicionar telas de **edição de produtos** e **edição de categorias** (endpoints já implementados)
- **Integração com serviços financeiros** (Cartão de Crédito, Boleto, Pix)
- Desenvolvimento de **testes automatizados** para o mobile e o frontend
