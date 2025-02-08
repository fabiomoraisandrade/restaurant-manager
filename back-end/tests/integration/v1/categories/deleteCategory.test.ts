import axios from "axios";

describe("DELETE /api/v1/category", () => {
  const baseURL = "http://localhost:3333/api/v1/category";
  let authToken;
  let createdCategory;

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
        `Erro ao criar categoria para testar o delete: ${e.message}`,
      );
    }
  });

  test("deve retornar status 204 para categoria deletada", async () => {
    const response = await axios
      .delete(`${baseURL}/${createdCategory.data.id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .catch((err) => err.response);

    expect(response.status).toBe(204);
  });

  test("deve retornar status 404 para categoria não encontrada", async () => {
    const response = await axios
      .delete(`${baseURL}/id-que-não-existe`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .catch((err) => err.response);

    expect(response.status).toBe(404);
  });
});
