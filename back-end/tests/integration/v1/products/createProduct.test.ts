import axios from "axios";
import FormData from "form-data";
import fs from "fs";

const baseURL = "http://localhost:3333/api/v1/product";
const categoryBaseURL = "http://localhost:3333/api/v1/category";
let authToken: string;
let createdCategory: any;
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

    createdCategory = await axios.post(
      categoryBaseURL,
      {
        name: "Categoria Teste",
      },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      },
    );
  } catch (e) {
    console.error(
      `Erro ao criar categoria para testar criar o produto: ${e.message}`,
    );
  }
});

afterAll(async () => {
  try {
    await axios.delete(`${baseURL}/${createdProduct.data.id}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    await axios.delete(`${categoryBaseURL}/${createdCategory.data.id}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
  } catch (e) {
    console.error(
      `Erro ao deletar categoria/produto criados para testar criar o produto: ${e.message}`,
    );
  }
});

describe("POST /api/v1/product", () => {
  test("deve retornar status 400 se o file não for enviado", async () => {
    const formData = new FormData();
    formData.append("name", "Produto Teste");
    formData.append("price", "100");
    formData.append("description", "Descrição Produto Teste");
    formData.append("category_id", createdCategory.data.id);

    const response = await axios
      .post(`${baseURL}`, formData, {
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
    formData.append("category_id", createdCategory.data.id);

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
    formData.append("category_id", createdCategory.data.id);

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
    formData.append("category_id", createdCategory.data.id);

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

  test("deve retornar status 404 se a categoria não for encontrada", async () => {
    const formData = new FormData();
    formData.append("name", "Produto Teste");
    formData.append("price", "100");
    formData.append("description", "Descrição Produto Teste");
    formData.append("file", fs.createReadStream("tmp/test-image.jpg"));
    formData.append("category_id", "id-que-não-existe");

    const response = await axios
      .post("http://localhost:3333/api/v1/product", formData, {
        headers: {
          ...formData.getHeaders(),
          Authorization: `Bearer ${authToken}`,
        },
      })
      .catch((err) => err.response);
    expect(response.status).toBe(404);
  });

  test("deve criar um produto com sucesso", async () => {
    const formData = new FormData();
    formData.append("name", "Produto Teste");
    formData.append("price", "100");
    formData.append("description", "Descrição Produto Teste");
    formData.append("file", fs.createReadStream("tmp/test-image.jpg"));
    formData.append("category_id", createdCategory.data.id);

    createdProduct = await axios
      .post("http://localhost:3333/api/v1/product", formData, {
        headers: {
          ...formData.getHeaders(),
          Authorization: `Bearer ${authToken}`,
        },
      })
      .catch((err) => err.response);

    expect(createdProduct.status).toBe(201);
  });
});
