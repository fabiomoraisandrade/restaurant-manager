import axios from "axios";
import prismaClient from "../../../../src/prisma";

// Limpeza do banco de dados antes de cada teste
beforeEach(async () => {
  await prismaClient.$transaction([prismaClient.order.deleteMany()]);
});

// Limpeza extra após cada teste (opcional)
afterEach(async () => {
  await prismaClient.$transaction([prismaClient.order.deleteMany()]);
});

// Fecha a conexão com o Prisma após todos os testes
afterAll(async () => {
  await prismaClient.$disconnect();
});

describe("POST /api/v1/order", () => {
  const baseURL = "http://localhost:3333/api/v1/order";
  let authToken;

  beforeAll(async () => {
    const loginURL = "http://localhost:3333/api/v1/login";
    const credentials = {
      email: "email1@teste.com",
      password: "123456",
    };

    const response = await axios.post(loginURL, credentials);
    authToken = response.data.token;
  });

  test("deve retornar status 400 se o número da mesa não for enviado", async () => {
    const response = await axios
      .post(
        baseURL,
        null, // Sem corpo na requisição
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      )
      .catch((err) => err.response);
    expect(response.status).toBe(400);
    expect(response.data).toHaveProperty("message", "table is required");
  });

  test("deve criar uma order com sucesso", async () => {
    const response = await axios
      .post(
        baseURL,
        {
          table: 100,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      )
      .catch((err) => err.response);

    // Verifica se o status é 201 (criado com sucesso)
    expect(response.status).toBe(201);

    // Verifica se as propriedades do usuário criado estão presentes na resposta
    expect(response.data).toHaveProperty("id");
    expect(response.data).toHaveProperty("table");
  });
});
