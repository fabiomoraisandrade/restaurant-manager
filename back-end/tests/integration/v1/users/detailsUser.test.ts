import axios from "axios";

describe("POST /api/v1/users", () => {
  const baseURL = "http://localhost:3333/api/v1/users";
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

  test("deve retornar status 400 para usuário não encontrado", async () => {
    const response = await axios
      .get(`${baseURL}/id-que-nao-existe`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .catch((err) => err.response);

    expect(response.status).toBe(400);
  });

  test("deve retornar status 200 para usuário retornado com sucesso", async () => {
    const response = await axios
      .get(`${baseURL}/32461d61-abdf-4de2-bdf0-eaecea5040b8`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .catch((err) => err.response);

    expect(response.status).toBe(200);
  });
});
