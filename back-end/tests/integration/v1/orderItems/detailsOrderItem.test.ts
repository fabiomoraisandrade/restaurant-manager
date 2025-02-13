import axios from "axios";

const baseURL = "http://localhost:3333/api/v1/orderItem";
let authToken: string;

beforeAll(async () => {
  try {
    const loginURL = "http://localhost:3333/api/v1/login";
    const credentials = { email: "email1@teste.com", password: "123456" };

    const response = await axios.post(loginURL, credentials);
    authToken = response.data.token;
  } catch (e) {
    console.error(
      `Erro ao fazer login no teste detailsOrderItem: ${e.message}`,
    );
  }
});

describe("GET /api/v1/orderItem", () => {
  test("deve retornar status 404 para orderItem não encontrado", async () => {
    const response = await axios
      .get(`${baseURL}/id-que-nao-existe`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .catch((err) => err.response);

    expect(response.status).toBe(404);
  });

  test("deve retornar status 200 para orderItem retornado com sucesso", async () => {
    const response = await axios
      .get(`${baseURL}/33a056bb-9cc0-48ff-a774-c57c963fc66b`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .catch((err) => err.response);

    expect(response.status).toBe(200);
  });
});

describe("GET /api/v1/orderItem/order/:orderId", () => {
  test("deve retornar status 200 para orderItem retornado com sucesso", async () => {
    const response = await axios
      .get(`${baseURL}/order/76b20b8a-3601-4bde-95e8-9b983479e72b`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .catch((err) => err.response);

    expect(response.status).toBe(200);
  });
});
