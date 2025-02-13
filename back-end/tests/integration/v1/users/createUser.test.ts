import axios from "axios";

const baseURL = "http://localhost:3333/api/v1/users";
let authToken: string;
let createdUser1: any;
let createdUser2: any;

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
    await axios.delete(`${baseURL}/${createdUser1.data.id}`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    await axios.delete(`${baseURL}/${createdUser2.data.id}`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
  } catch (e) {
    console.error(
      `Erro ao deletar usuários criados ao final do teste: ${e.message}`,
    );
  }
});

describe("POST /api/v1/users", () => {
  test("deve retornar status 400 se o nome não for enviado", async () => {
    const response = await axios
      .post(baseURL, {
        email: "teste@exemplo.com",
        password: "senha@teste",
      })
      .catch((err) => err.response);
    expect(response.status).toBe(400);
    expect(response.data).toHaveProperty("message", "name is required");
  });

  test("deve retornar status 400 se o email não for enviado", async () => {
    const response = await axios
      .post(baseURL, {
        name: "Usuario Teste",
        password: "senha@teste",
      })
      .catch((err) => err.response);

    expect(response.status).toBe(400);
    expect(response.data).toHaveProperty("message", "email is required");
  });

  test("deve retornar status 400 se a senha não for enviada", async () => {
    const response = await axios
      .post(baseURL, {
        name: "Usuario Teste",
        email: "teste@exemplo.com",
      })
      .catch((err) => err.response);

    expect(response.status).toBe(400);
    expect(response.data).toHaveProperty("message", "password is required");
  });

  test("deve lançar erro se o email já está registrado", async () => {
    createdUser1 = await axios.post(baseURL, {
      name: "Usuario Teste",
      email: "email@teste.com",
      password: "senha@teste",
    });

    const newUser = await axios
      .post(baseURL, {
        name: "Novo Usuario Teste",
        email: createdUser1.data.email,
        password: "novasenha@teste",
      })
      .catch((err) => err.response);

    expect(newUser.status).toBe(409);
    expect(newUser.data).toHaveProperty(
      "message",
      "Email is already registered.",
    );
  });

  test("deve criar um usuário com sucesso", async () => {
    const randomEmail = `user${Date.now()}@example.com`;

    createdUser2 = await axios.post(baseURL, {
      name: "Usuario Teste",
      email: randomEmail,
      password: "outrasenha@teste",
    });

    expect(createdUser2.status).toBe(201);

    expect(createdUser2.data).toHaveProperty("id");
    expect(createdUser2.data).toHaveProperty("name", "Usuario Teste");
    expect(createdUser2.data).toHaveProperty("email", randomEmail);
  });
});
