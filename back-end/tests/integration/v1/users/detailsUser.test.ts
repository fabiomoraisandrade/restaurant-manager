import axios from "axios";

const baseURL = "http://localhost:3333/api/v1/users";
let authToken: any;

beforeAll(async () => {
  const loginURL = "http://localhost:3333/api/v1/login";
  const credentials = {
    email: "email1@teste.com",
    password: "123456",
  };

  const response = await axios.post(loginURL, credentials);
  authToken = response.data.token;
});

describe("GET /api/v1/users", () => {
  test("deve retornar status 404 para usuário não encontrado", async () => {
    const response = await axios
      .get(`${baseURL}/id-que-nao-existe`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .catch((err) => err.response);

    expect(response.status).toBe(404);
  });

  test("deve retornar status 200 para usuário retornado com sucesso", async () => {
    const response = await axios
      .get(`${baseURL}/4b2d9ce6-3883-44d6-a12f-688c8bab4c26`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .catch((err) => err.response);

    expect(response.status).toBe(200);
  });
});
