import axios from "axios";

const baseURL = "http://localhost:3333/api/v1/login";

describe("POST /api/v1/login", () => {
  test("deve retornar status 400 se o email não for enviado", async () => {
    const response = await axios
      .post(baseURL, {
        password: "senha@teste",
      })
      .catch((err) => err.response);

    expect(response.status).toBe(400);
    expect(response.data).toHaveProperty("message", "email is required");
  });

  test("deve retornar status 400 se a senha não for enviada", async () => {
    const response = await axios
      .post(baseURL, {
        email: "teste@login.com",
      })
      .catch((err) => err.response);

    expect(response.status).toBe(400);
    expect(response.data).toHaveProperty("message", "password is required");
  });

  test("deve retornar status 401 para usuário que não existe ou que não foi autenticado", async () => {
    const response = await axios
      .post(baseURL, {
        email: "teste@login.com",
        password: "senha@teste",
      })
      .catch((err) => err.response);

    expect(response.status).toBe(401);
  });

  test("deve fazer login com sucesso", async () => {
    const response = await axios
      .post(baseURL, {
        email: "email1@teste.com",
        password: "123456",
      })
      .catch((err) => err.response);

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty("id");
    expect(response.data).toHaveProperty("name");
    expect(response.data).toHaveProperty("email");
    expect(response.data).toHaveProperty("token");
  });
});
