import axios from "axios";

const baseURL = "http://localhost:3333/api/v1/users";
let authToken: string;
let createdUser: any;

beforeAll(async () => {
  try {
    const loginURL = "http://localhost:3333/api/v1/login";
    const credentials = {
      email: "email1@teste.com",
      password: "123456",
    };

    const response = await axios.post(loginURL, credentials);
    authToken = response.data.token;

    createdUser = await axios.post(
      baseURL,
      {
        name: "Usuario Teste",
        email: "teste@teste.com",
        password: "teste@teste",
      },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      },
    );
  } catch (e) {
    console.error(`Erro ao criar usuário para testar o delete: ${e.message}`);
  }
});

describe("DELETE /api/v1/users", () => {
  test("deve retornar status 204 para usuário deletado", async () => {
    const response = await axios
      .delete(`${baseURL}/${createdUser.data.id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .catch((err) => err.response);

    expect(response.status).toBe(204);
  });

  test("deve retornar status 404 para usuário não encontrado", async () => {
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
