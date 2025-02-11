import axios from "axios";

const baseURL = "http://localhost:3333/api/v1/category";
let authToken: string;
let createdCategory: any;

beforeAll(async () => {
  try {
    const loginURL = "http://localhost:3333/api/v1/login";
    const credentials = {
      email: "email1@teste.com",
      password: "123456",
    };

    const response = await axios.post(loginURL, credentials);
    authToken = response.data.token;
  } catch (e) {
    console.error(`Erro ao fazer login: ${e.message}`);
  }
});

afterAll(async () => {
  try {
    await axios.delete(`${baseURL}/${createdCategory.data.id}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
  } catch (e) {
    console.error(
      `Erro ao deletar order criada ao final do teste: ${e.message}`,
    );
  }
});

describe("POST /api/v1/category", () => {
  test("deve retornar status 400 se o nome não for enviado", async () => {
    const response = await axios
      .post(baseURL, null, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .catch((err) => err.response);
    expect(response.status).toBe(400);
    expect(response.data).toHaveProperty("message", "name is required");
  });

  test("deve criar uma categoria com sucesso", async () => {
    createdCategory = await axios
      .post(
        baseURL,
        {
          name: "Categoria Teste",
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      )
      .catch((err) => err.response);

    expect(createdCategory.status).toBe(201);
    expect(createdCategory.data).toHaveProperty("id");
    expect(createdCategory.data).toHaveProperty("name", "Categoria Teste");
  });
});
