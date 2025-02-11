import axios from "axios";

const baseURL = "http://localhost:3333/api/v1/order";
let authToken: string;
let createdOrder: any;

beforeAll(async () => {
  try {
    const loginURL = "http://localhost:3333/api/v1/login";
    const credentials = {
      email: "email1@teste.com",
      password: "123456",
    };

    const response = await axios.post(loginURL, credentials);
    authToken = response.data.token;

    createdOrder = await axios.post(
      baseURL,
      {
        table: 900,
        name: "Order Teste",
      },
      { headers: { Authorization: `Bearer ${authToken}` } },
    );
  } catch (e) {
    console.error(`Erro ao criar categoria para testar o delete: ${e.message}`);
  }
});

describe("DELETE /api/v1/order", () => {
  test("deve retornar status 204 para order deletada", async () => {
    const response = await axios
      .delete(`${baseURL}/${createdOrder.data.id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .catch((err) => err.response);

    expect(response.status).toBe(204);
  });

  test("deve retornar status 404 para order não encontrada", async () => {
    const response = await axios
      .delete(`${baseURL}/id-que-não-existe`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .catch((err) => err.response);

    expect(response.status).toBe(404);
  });
});
