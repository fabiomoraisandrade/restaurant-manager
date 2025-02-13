import axios from "axios";

const baseURL = "http://localhost:3333/api/v1/users";
let authToken: string;
let createdUser: any;

beforeAll(async () => {
  try {
    const loginURL = "http://localhost:3333/api/v1/login";
    const credentials = { email: "email1@teste.com", password: "123456" };

    const response = await axios.post(loginURL, credentials);
    authToken = response.data.token;

    createdUser = await axios.post(
      baseURL,
      {
        name: "Usuario Teste",
        email: "teste@teste.com",
        password: "senha@teste",
      },
      { headers: { Authorization: `Bearer ${authToken}` } },
    );
  } catch (e) {
    console.error(`Erro ao criar usuário para testar o update: ${e.message}`);
  }
});

afterAll(async () => {
  try {
    await axios.delete(`${baseURL}/${createdUser.data.id}`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
  } catch (e) {
    console.error(
      `Erro ao deletar usuário criado para testar o update: ${e.message}`,
    );
  }
});

describe("PUT /api/v1/users", () => {
  const newUser = {
    name: "Novo Usuario Teste",
    email: "novoemail@teste.com",
    password: "nova@senha",
  };
  test("deve atualizar usuário pelo put com sucesso", async () => {
    const response = await axios
      .put(`${baseURL}/${createdUser.data.id}`, newUser, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .catch((err) => err.response);

    expect(response.status).toBe(200);
  });

  test("deve retornar status 404 para usuário não encontrado pelo put", async () => {
    const response = await axios
      .put(`${baseURL}/id-que-não-existe`, newUser, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .catch((err) => err.response);

    expect(response.status).toBe(404);
  });
});

describe("PATCH /api/v1/users", () => {
  const newUser = {
    email: "novoemail@teste.com",
  };
  test("deve atualizar usuário pelo patch com sucesso", async () => {
    const response = await axios
      .patch(`${baseURL}/${createdUser.data.id}`, newUser, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .catch((err) => err.response);

    expect(response.status).toBe(200);
  });

  test("deve retornar status 404 para usuário não encontrado pelo patch", async () => {
    const response = await axios
      .patch(`${baseURL}/id-que-não-existe`, newUser, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .catch((err) => err.response);

    expect(response.status).toBe(404);
  });
});
