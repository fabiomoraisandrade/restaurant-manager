import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import prismaClient from "../../../../src/prisma";

// Limpeza do banco de dados antes de cada teste
beforeEach(async () => {
  await prismaClient.$transaction([prismaClient.product.deleteMany()]);
});

// Limpeza extra após cada teste (opcional)
afterEach(async () => {
  await prismaClient.$transaction([prismaClient.product.deleteMany()]);
});

// Fecha a conexão com o Prisma após todos os testes
afterAll(async () => {
  await prismaClient.$disconnect();
});

describe("POST /api/v1/product", () => {
  const baseURL = "http://localhost:3333/api/v1/product";
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

  test("deve retornar status 400 se o file não for enviado", async () => {
    const formData = new FormData();
    formData.append("name", "Produto Teste");
    formData.append("price", "100");
    formData.append("description", "Descrição Produto Teste");
    formData.append("category_id", "e36b4656-cc7f-4bb8-9d0e-828d6fda4c14");

    const response = await axios
      .post("http://localhost:3333/api/v1/product", formData, {
        headers: {
          ...formData.getHeaders(),
          Authorization: `Bearer ${authToken}`,
        },
      })
      .catch((err) => err.response);
    expect(response.status).toBe(400);
    expect(response.data).toHaveProperty("message", "file is required");
  });

  test("deve retornar status 400 se o nome não for enviado", async () => {
    const formData = new FormData();
    formData.append("price", "100");
    formData.append("description", "Descrição Produto Teste");
    formData.append("file", fs.createReadStream("tmp/test-image.jpg"));
    formData.append("category_id", "e36b4656-cc7f-4bb8-9d0e-828d6fda4c14");

    const response = await axios
      .post("http://localhost:3333/api/v1/product", formData, {
        headers: {
          ...formData.getHeaders(),
          Authorization: `Bearer ${authToken}`,
        },
      })
      .catch((err) => err.response);
    expect(response.status).toBe(400);
    expect(response.data).toHaveProperty("message", "name is required");
  });

  test("deve retornar status 400 se o preço não for enviado", async () => {
    const formData = new FormData();
    formData.append("name", "Produto Teste");
    formData.append("description", "Descrição Produto Teste");
    formData.append("file", fs.createReadStream("tmp/test-image.jpg"));
    formData.append("category_id", "e36b4656-cc7f-4bb8-9d0e-828d6fda4c14");

    const response = await axios
      .post("http://localhost:3333/api/v1/product", formData, {
        headers: {
          ...formData.getHeaders(),
          Authorization: `Bearer ${authToken}`,
        },
      })
      .catch((err) => err.response);
    expect(response.status).toBe(400);
    expect(response.data).toHaveProperty("message", "price is required");
  });

  test("deve retornar status 400 se a descrição não for enviada", async () => {
    const formData = new FormData();
    formData.append("name", "Produto Teste");
    formData.append("price", "100");
    formData.append("file", fs.createReadStream("tmp/test-image.jpg"));
    formData.append("category_id", "e36b4656-cc7f-4bb8-9d0e-828d6fda4c14");

    const response = await axios
      .post("http://localhost:3333/api/v1/product", formData, {
        headers: {
          ...formData.getHeaders(),
          Authorization: `Bearer ${authToken}`,
        },
      })
      .catch((err) => err.response);
    expect(response.status).toBe(400);
    expect(response.data).toHaveProperty("message", "description is required");
  });

  test("deve retornar status 400 se o category_id não for enviado", async () => {
    const formData = new FormData();
    formData.append("name", "Produto Teste");
    formData.append("price", "100");
    formData.append("description", "Descrição Produto Teste");
    formData.append("file", fs.createReadStream("tmp/test-image.jpg"));

    const response = await axios
      .post("http://localhost:3333/api/v1/product", formData, {
        headers: {
          ...formData.getHeaders(),
          Authorization: `Bearer ${authToken}`,
        },
      })
      .catch((err) => err.response);
    expect(response.status).toBe(400);
    expect(response.data).toHaveProperty("message", "category_id is required");
  });

  test("deve criar um produto com sucesso", async () => {
    const formData = new FormData();
    formData.append("name", "Produto Teste");
    formData.append("price", "100");
    formData.append("description", "Descrição Produto Teste");
    formData.append("file", fs.createReadStream("tmp/test-image.jpg"));
    formData.append("category_id", "e36b4656-cc7f-4bb8-9d0e-828d6fda4c14");

    const response = await axios
      .post("http://localhost:3333/api/v1/product", formData, {
        headers: {
          ...formData.getHeaders(),
          Authorization: `Bearer ${authToken}`,
        },
      })
      .catch((err) => err.response);

    expect(response.status).toBe(201);
  });
});
