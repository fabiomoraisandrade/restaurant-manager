import axios from "axios";
import FormData from "form-data";
import fs from "fs";

const baseURL = "http://localhost:3333/api/v1/product";
const categoryBaseURL = "http://localhost:3333/api/v1/category";
let authToken: string;
let createdCategory1: any;
let createdCategory2: any;
let createdProduct: any;

beforeAll(async () => {
  try {
    const loginURL = "http://localhost:3333/api/v1/login";
    const credentials = {
      email: "email1@teste.com",
      password: "123456",
    };

    const response = await axios.post(loginURL, credentials);
    authToken = response.data.token;

    createdCategory1 = await axios.post(
      categoryBaseURL,
      { name: "Categoria Teste" },
      { headers: { Authorization: `Bearer ${authToken}` } },
    );

    createdCategory2 = await axios.post(
      categoryBaseURL,
      { name: "Categoria Teste 2" },
      { headers: { Authorization: `Bearer ${authToken}` } },
    );

    const formData = new FormData();
    formData.append("name", "Produto Teste");
    formData.append("price", "100");
    formData.append("description", "Descrição Produto Teste");
    formData.append("file", fs.createReadStream("tmp/test-image.jpg"));
    formData.append("category_id", createdCategory1.data.id);

    createdProduct = await axios.post(`${baseURL}`, formData, {
      headers: {
        ...formData.getHeaders(),
        Authorization: `Bearer ${authToken}`,
      },
    });
  } catch (e) {
    console.error(
      `Erro ao criar categoria/produto para testar o update: ${e.message}`,
    );
  }
});

afterAll(async () => {
  try {
    await axios.delete(`${baseURL}/${createdProduct.data.id}`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    await axios.delete(`${categoryBaseURL}/${createdCategory1.data.id}`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    await axios.delete(`${categoryBaseURL}/${createdCategory2.data.id}`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
  } catch (e) {
    console.error(
      `Erro ao deletar categoria/produto criados para testar o update: ${e.message}`,
    );
  }
});

describe("PUT /api/v1/product", () => {
  test("deve atualizar produto pelo put com sucesso", async () => {
    const newProduct = new FormData();
    newProduct.append("name", "Novo Produto Teste");
    newProduct.append("price", "200");
    newProduct.append("description", "Nova Descrição Produto Teste");
    newProduct.append("file", fs.createReadStream("tmp/test-image.jpg"));
    newProduct.append("category_id", createdCategory2.data.id);

    const response = await axios
      .put(`${baseURL}/${createdProduct.data.id}`, newProduct, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .catch((err) => err.response);

    expect(response.status).toBe(200);
  });

  test("deve retornar status 404 para produto não encontrado pelo put", async () => {
    const newProduct = new FormData();
    newProduct.append("name", "Novo Produto Teste");
    newProduct.append("price", "200");
    newProduct.append("description", "Nova Descrição Produto Teste");
    newProduct.append("file", fs.createReadStream("tmp/test-image.jpg"));
    newProduct.append("category_id", createdCategory2.data.id);

    const response = await axios
      .put(`${baseURL}/id-que-não-existe`, newProduct, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .catch((err) => err.response);

    expect(response.status).toBe(404);
  });

  test("deve retornar status 404 para categoria não encontrada pelo put", async () => {
    const newProduct = new FormData();
    newProduct.append("name", "Novo Produto Teste");
    newProduct.append("price", "200");
    newProduct.append("description", "Nova Descrição Produto Teste");
    newProduct.append("file", fs.createReadStream("tmp/test-image.jpg"));
    newProduct.append("category_id", "id-que-não-existe");

    const response = await axios
      .put(`${baseURL}/${createdProduct.data.id}`, newProduct, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .catch((err) => err.response);

    expect(response.status).toBe(404);
  });
});

describe("PATCH /api/v1/product", () => {
  test("deve atualizar produto pelo patch com sucesso", async () => {
    const newProduct = new FormData();
    newProduct.append("name", "Novo Produto Teste");

    const response = await axios
      .patch(`${baseURL}/${createdProduct.data.id}`, newProduct, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .catch((err) => err.response);

    expect(response.status).toBe(200);
  });

  test("deve retornar status 404 para produto não encontrado pelo patch", async () => {
    const newProduct = new FormData();
    newProduct.append("name", "Novo Produto Teste");

    const response = await axios
      .patch(`${baseURL}/id-que-não-existe`, newProduct, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .catch((err) => err.response);

    expect(response.status).toBe(404);
  });

  test("deve retornar status 404 para categoria não encontrado pelo patch", async () => {
    const newProduct = new FormData();
    newProduct.append("category_id", "id-que-não-existe");

    const response = await axios
      .patch(`${baseURL}/${createdProduct.data.id}`, newProduct, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .catch((err) => err.response);

    expect(response.status).toBe(404);
  });
});
