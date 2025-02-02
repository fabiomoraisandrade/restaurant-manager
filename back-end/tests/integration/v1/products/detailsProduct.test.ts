import axios from "axios";

describe("POST /api/v1/product", () => {
  const baseURL = "http://localhost:3333/api/v1/product";
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

  test("deve retornar status 400 para produto não encontrado", async () => {
    const response = await axios
      .get(`${baseURL}/id-que-nao-existe`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .catch((err) => err.response);

    expect(response.status).toBe(400);
  });

  test("deve retornar status 200 para produto retornado com sucesso", async () => {
    const response = await axios
      .get(`${baseURL}/a231a8f9-07c8-4b40-a832-fe81e5ea3cb2`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .catch((err) => err.response);

    expect(response.status).toBe(200);
  });
});
