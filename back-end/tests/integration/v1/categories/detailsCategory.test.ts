import axios from "axios";

describe("GET /api/v1/category", () => {
  const baseURL = "http://localhost:3333/api/v1/category";
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

  test("deve retornar status 400 para categoria não encontrada", async () => {
    const response = await axios
      .get(`${baseURL}/id-que-nao-existe`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .catch((err) => err.response);

    expect(response.status).toBe(400);
  });

  test("deve retornar status 200 para categoria retornada com sucesso", async () => {
    const response = await axios
      .get(`${baseURL}/e36b4656-cc7f-4bb8-9d0e-828d6fda4c14`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .catch((err) => err.response);

    expect(response.status).toBe(200);
  });
});
