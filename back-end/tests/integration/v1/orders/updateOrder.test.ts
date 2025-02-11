import axios from "axios";

const baseURL = "http://localhost:3333/api/v1/order";
let authToken: string;
let createdOrder: any;

beforeAll(async () => {
  try {
    const loginURL = "http://localhost:3333/api/v1/login";
    const credentials = { email: "email1@teste.com", password: "123456" };

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
    console.error(`Erro ao criar order para testar o update: ${e.message}`);
  }
});

afterAll(async () => {
  try {
    await axios.delete(`${baseURL}/${createdOrder.data.id}`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
  } catch (e) {
    console.error(
      `Erro ao deletar order criada para testar o update: ${e.message}`,
    );
  }
});

describe("PUT /api/v1/order", () => {
  const newOrder = {
    table: 1000,
    status: false,
    draft: true,
    name: "Novo Order Teste",
  };
  test("deve atualizar order pelo put com sucesso", async () => {
    const response = await axios
      .put(`${baseURL}/${createdOrder.data.id}`, newOrder, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .catch((err) => err.response);

    expect(response.status).toBe(200);
  });

  test("deve retornar status 404 para order não encontrada pelo put", async () => {
    const response = await axios
      .put(`${baseURL}/id-que-não-existe`, newOrder, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .catch((err) => err.response);

    expect(response.status).toBe(404);
  });
});

describe("PATCH /api/v1/order", () => {
  const newOrder = {
    table: 1000,
    name: "Novo Order Teste",
  };
  test("deve atualizar order pelo patch com sucesso", async () => {
    const response = await axios
      .patch(`${baseURL}/${createdOrder.data.id}`, newOrder, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .catch((err) => err.response);

    expect(response.status).toBe(200);
  });

  test("deve retornar status 404 para order não encontrada pelo patch", async () => {
    const response = await axios
      .patch(`${baseURL}/id-que-não-existe`, newOrder, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .catch((err) => err.response);

    expect(response.status).toBe(404);
  });

  test("deve retornar status 200 e draft false para order enviada", async () => {
    const response = await axios
      .patch(
        `${baseURL}/${createdOrder.data.id}/send`,
        {},
        {
          headers: { Authorization: `Bearer ${authToken}` },
        },
      )
      .catch((err) => err.response);

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty("draft", false);
  });

  test("deve retornar status 200 e status da order true para order enviada", async () => {
    const response = await axios
      .patch(
        `${baseURL}/${createdOrder.data.id}/finish`,
        {},
        {
          headers: { Authorization: `Bearer ${authToken}` },
        },
      )
      .catch((err) => err.response);

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty("status", true);
  });
});
