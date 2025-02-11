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
  } catch (e) {
    console.error(`Erro ao fazer login: ${e.message}`);
  }
});

afterAll(async () => {
  try {
    await axios.delete(`${baseURL}/${createdOrder.data.id}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
  } catch (e) {
    console.error(
      `Erro ao deletar order criada ao final do teste: ${e.message}`,
    );
  }
});

describe("POST /api/v1/order", () => {
  test("deve retornar status 400 se o número da mesa não for enviado", async () => {
    const response = await axios
      .post(baseURL, null, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .catch((err) => err.response);
    expect(response.status).toBe(400);
    expect(response.data).toHaveProperty("message", "table is required");
  });

  test("deve criar uma order com sucesso", async () => {
    createdOrder = await axios
      .post(
        baseURL,
        {
          table: 100,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      )
      .catch((err) => err.response);

    expect(createdOrder.status).toBe(201);
    expect(createdOrder.data).toHaveProperty("id");
    expect(createdOrder.data).toHaveProperty("table");
  });
});
