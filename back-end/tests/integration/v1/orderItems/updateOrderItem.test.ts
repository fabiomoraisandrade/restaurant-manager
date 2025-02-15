import axios from "axios";
import FormData from "form-data";
import fs from "fs";

const baseURL = "http://localhost:3333/api/v1/orderItem";
const categoryBaseURL = "http://localhost:3333/api/v1/category";
const productBaseURL = "http://localhost:3333/api/v1/product";
const orderBaseURL = "http://localhost:3333/api/v1/order";
let authToken: string;
let createdCategory: any;
let createdProduct1: any;
let createdOrder1: any;
let createdProduct2: any;
let createdOrder2: any;
let createdOrderItem: any;

beforeAll(async () => {
  try {
    const loginURL = "http://localhost:3333/api/v1/login";
    const credentials = {
      email: "email1@teste.com",
      password: "123456",
    };

    const response = await axios.post(loginURL, credentials);
    authToken = response.data.token;

    createdCategory = await axios.post(
      categoryBaseURL,
      { name: "Categoria Teste" },
      { headers: { Authorization: `Bearer ${authToken}` } },
    );

    const formData1 = new FormData();
    formData1.append("name", "Produto Teste 1");
    formData1.append("price", "100");
    formData1.append("description", "Descrição Produto Teste 1");
    formData1.append("file", fs.createReadStream("tmp/test-image.jpg"));
    formData1.append("category_id", createdCategory.data.id);

    createdProduct1 = await axios.post(`${productBaseURL}`, formData1, {
      headers: {
        ...formData1.getHeaders(),
        Authorization: `Bearer ${authToken}`,
      },
    });

    const formData2 = new FormData();
    formData2.append("name", "Produto Teste 2");
    formData2.append("price", "105");
    formData2.append("description", "Descrição Produto Teste 2");
    formData2.append("file", fs.createReadStream("tmp/test-image.jpg"));
    formData2.append("category_id", createdCategory.data.id);

    createdProduct2 = await axios.post(`${productBaseURL}`, formData2, {
      headers: {
        ...formData2.getHeaders(),
        Authorization: `Bearer ${authToken}`,
      },
    });

    createdOrder1 = await axios.post(
      orderBaseURL,
      {
        table: 900,
        name: "Order Teste 1",
      },
      { headers: { Authorization: `Bearer ${authToken}` } },
    );

    createdOrder2 = await axios.post(
      orderBaseURL,
      {
        table: 950,
        name: "Order Teste 2",
      },
      { headers: { Authorization: `Bearer ${authToken}` } },
    );

    createdOrderItem = await axios.post(
      baseURL,
      {
        order_id: `${createdOrder1.data.id}`,
        product_id: `${createdProduct1.data.id}`,
        amount: 1,
      },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      },
    );
  } catch (e) {
    console.error(
      `Erro ao criar categoria, produto, order e orderItem para teste de atualizar orderItem: ${e.message}`,
    );
  }
});

afterAll(async () => {
  try {
    await axios.delete(`${baseURL}/${createdOrderItem.data.id}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    await axios.delete(`${productBaseURL}/${createdProduct1.data.id}`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    await axios.delete(`${productBaseURL}/${createdProduct2.data.id}`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    await axios.delete(`${categoryBaseURL}/${createdCategory.data.id}`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    await axios.delete(`${orderBaseURL}/${createdOrder1.data.id}`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    await axios.delete(`${orderBaseURL}/${createdOrder2.data.id}`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
  } catch (e) {
    console.error(
      `Erro ao deletar produto, categoria, order e orderItem ao final do teste de atualizar orderItem: ${e.message}`,
    );
  }
});

describe("PUT /api/v1/orderItem", () => {
  test("deve atualizar orderItem pelo put com sucesso", async () => {
    const newOrderItem = {
      order_id: createdOrder2.data.id,
      product_id: createdProduct2.data.id,
      amount: 2,
    };
    const response = await axios
      .put(`${baseURL}/${createdOrderItem.data.id}`, newOrderItem, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .catch((err) => err.response);

    expect(response.status).toBe(200);
  });

  test("deve retornar status 404 para orderItem não encontrado pelo put", async () => {
    const newOrderItem = {
      order_id: createdOrder2.data.id,
      product_id: createdProduct2.data.id,
      amount: 2,
    };
    const response = await axios
      .put(`${baseURL}/id-que-não-existe`, newOrderItem, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .catch((err) => err.response);

    expect(response.status).toBe(404);
  });

  test("deve retornar status 404 para order não encontrada pelo put", async () => {
    const newOrderItem = {
      order_id: "id-que-não-existe",
      product_id: createdProduct2.data.id,
      amount: 2,
    };
    const response = await axios
      .put(`${baseURL}/${createdOrderItem.data.id}`, newOrderItem, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .catch((err) => err.response);

    expect(response.status).toBe(404);
  });

  test("deve retornar status 404 para product não encontrado pelo put", async () => {
    const newOrderItem = {
      order_id: createdOrder2.data.id,
      product_id: "id-que-não-existe",
      amount: 2,
    };
    const response = await axios
      .put(`${baseURL}/${createdOrderItem.data.id}`, newOrderItem, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .catch((err) => err.response);

    expect(response.status).toBe(404);
  });
});

describe("PATCH /api/v1/orderItem", () => {
  test("deve atualizar orderItem pelo patch com sucesso", async () => {
    const newOrderItem = {
      order_id: createdOrder2.data.id,
      amount: 2,
    };
    const response = await axios
      .patch(`${baseURL}/${createdOrderItem.data.id}`, newOrderItem, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .catch((err) => err.response);

    expect(response.status).toBe(200);
  });

  test("deve retornar status 404 para orderItem não encontrado pelo patch", async () => {
    const newOrderItem = {
      order_id: createdOrder2.data.id,
      amount: 2,
    };
    const response = await axios
      .patch(`${baseURL}/id-que-não-existe`, newOrderItem, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .catch((err) => err.response);

    expect(response.status).toBe(404);
  });

  test("deve retornar status 404 para order não encontrada pelo patch", async () => {
    const newOrderItem = {
      order_id: "id-que-não-existe",
      amount: 2,
    };
    const response = await axios
      .patch(`${baseURL}/${createdOrderItem.data.id}`, newOrderItem, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .catch((err) => err.response);

    expect(response.status).toBe(404);
  });

  test("deve retornar status 404 para product não encontrado pelo patch", async () => {
    const newOrderItem = {
      product_id: "id-que-não-existe",
      amount: 2,
    };
    const response = await axios
      .patch(`${baseURL}/${createdOrderItem.data.id}`, newOrderItem, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .catch((err) => err.response);

    expect(response.status).toBe(404);
  });
});
