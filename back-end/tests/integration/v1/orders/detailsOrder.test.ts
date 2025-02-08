import axios from "axios";

describe("GET /api/v1/order", () => {
  const baseURL = "http://localhost:3333/api/v1/order";
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

  test("deve retornar status 404 para order não encontrada", async () => {
    const response = await axios
      .get(`${baseURL}/id-que-nao-existe`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .catch((err) => err.response);

    expect(response.status).toBe(404);
  });

  test("deve retornar status 200 para order retornada com sucesso", async () => {
    const response = await axios
      .get(`${baseURL}/76b20b8a-3601-4bde-95e8-9b983479e72b`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .catch((err) => err.response);

    expect(response.status).toBe(200);
  });
});
