import axios from "axios";
import prismaClient from "../../../../src/prisma";

// Limpeza do banco de dados antes de cada teste
beforeEach(async () => {
  await prismaClient.$transaction([prismaClient.user.deleteMany()]);
});

// Limpeza extra após cada teste (opcional)
afterEach(async () => {
  await prismaClient.$transaction([prismaClient.user.deleteMany()]);
});

// Fecha a conexão com o Prisma após todos os testes
afterAll(async () => {
  await prismaClient.$disconnect();
});

describe("POST /api/v1/users", () => {
  const baseURL = "http://localhost:3333/api/v1/users";
  test("deve retornar status 400 se o nome não for enviado", async () => {
    const response = await axios
      .post(baseURL, {
        email: "test@example.com",
        password: "123456",
      })
      .catch((err) => err.response);
    expect(response.status).toBe(400);
    expect(response.data).toHaveProperty("message", "name is required");
  });

  test("deve retornar status 400 se o email não for enviado", async () => {
    const response = await axios
      .post(baseURL, {
        name: "Jane Doe",
        password: "123456",
      })
      .catch((err) => err.response);

    expect(response.status).toBe(400);
    expect(response.data).toHaveProperty("message", "email is required");
  });

  test("deve retornar status 400 se a senha não for enviada", async () => {
    const response = await axios
      .post(baseURL, {
        name: "Jane Doe",
        email: "test@example.com",
      })
      .catch((err) => err.response);

    expect(response.status).toBe(400);
    expect(response.data).toHaveProperty("message", "password is required");
  });

  test("deve lançar erro se o email já está registrado", async () => {
    // Cria um usuário com o email previamente registrado
    const existingUser = await axios.post(baseURL, {
      name: "Nome Existente",
      email: "email@teste.com",
      password: "senha123",
    });

    // Tenta criar um novo usuário com o mesmo email
    const response = await axios
      .post(baseURL, {
        name: "Novo Nome",
        email: existingUser.data.email,
        password: "novaSenha123",
      })
      .catch((err) => err.response);

    expect(response.status).toBe(409);
    expect(response.data).toHaveProperty(
      "message",
      "Email is already registered.",
    );
  });

  test("deve criar um usuário com sucesso", async () => {
    // Gera um email aleatório para evitar conflitos
    const randomEmail = `user${Date.now()}@example.com`;

    const response = await axios.post(baseURL, {
      name: "Usuário Teste",
      email: randomEmail,
      password: "senhaSegura123",
    });

    // Verifica se o status é 201 (criado com sucesso)
    expect(response.status).toBe(201);

    // Verifica se as propriedades do usuário criado estão presentes na resposta
    expect(response.data).toHaveProperty("id");
    expect(response.data).toHaveProperty("name", "Usuário Teste");
    expect(response.data).toHaveProperty("email", randomEmail);
  });
});
