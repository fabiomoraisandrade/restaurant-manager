import axios from "axios";

const baseURL = "http://localhost:3333/api/v1/category";
let authToken: string;

beforeAll(async () => {
  const loginURL = "http://localhost:3333/api/v1/login";
  const credentials = {
    email: "email1@teste.com",
    password: "123456",
  };

  const response = await axios.post(loginURL, credentials);
  authToken = response.data.token;
});

describe("GET /api/v1/category", () => {
  test("deve retornar status 404 para categoria não encontrada", async () => {
    const response = await axios
      .get(`${baseURL}/id-que-nao-existe`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .catch((err) => err.response);

    expect(response.status).toBe(404);
  });

  test("deve retornar status 200 para categoria retornada com sucesso", async () => {
    const response = await axios
      .get(`${baseURL}/b78f3dcc-fae7-4f5e-bc28-3059c67f4cc0`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .catch((err) => err.response);

    expect(response.status).toBe(200);
  });
});
