import axios from "axios";

describe("DELETE /api/v1/category", () => {
  const baseURL = "http://localhost:3333/api/v1/category";
  let authToken;
  let createdCategory;
  const newCategory = {
    name: "Nova Categoria Teste",
  };

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
        baseURL,
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
        `Erro ao criar categoria para testar o update: ${e.message}`,
      );
    }
  });

  afterAll(async () => {
    try {
      const loginURL = "http://localhost:3333/api/v1/login";
      const credentials = {
        email: "email1@teste.com",
        password: "123456",
      };

      const response = await axios.post(loginURL, credentials);
      authToken = response.data.token;

      await axios.delete(`${baseURL}/${createdCategory.data.id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
    } catch (e) {
      console.error(
        `Erro ao deletar categoria criada para testar o update: ${e.message}`,
      );
    }
  });

  test("deve atualizar categoria pelo put com sucesso", async () => {
    const response = await axios
      .put(`${baseURL}/${createdCategory.data.id}`, newCategory, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .catch((err) => err.response);

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty("name", newCategory.name);
  });

  test("deve atualizar categoria pelo patch com sucesso", async () => {
    const response = await axios
      .patch(`${baseURL}/${createdCategory.data.id}`, newCategory, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .catch((err) => err.response);

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty("name", newCategory.name);
  });

  test("deve retornar status 404 para categoria não encontrada pelo put", async () => {
    const response = await axios
      .put(`${baseURL}/id-que-não-existe`, newCategory, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .catch((err) => err.response);

    expect(response.status).toBe(404);
  });

  test("deve retornar status 404 para categoria não encontrada pelo patch", async () => {
    const response = await axios
      .patch(`${baseURL}/id-que-não-existe`, newCategory, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .catch((err) => err.response);

    expect(response.status).toBe(404);
  });
});
