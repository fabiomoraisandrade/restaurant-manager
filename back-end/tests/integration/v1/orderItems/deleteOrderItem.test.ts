import axios from "axios";
import FormData from "form-data";
import fs from "fs";

const baseURL = "http://localhost:3333/api/v1/orderItem";
const categoryBaseURL = "http://localhost:3333/api/v1/category";
const productBaseURL = "http://localhost:3333/api/v1/product";
const orderBaseURL = "http://localhost:3333/api/v1/order";
let authToken: string;
let createdCategory: any;
let createdProduct: any;
let createdOrder: any;
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

    const formData = new FormData();
    formData.append("name", "Produto Teste");
    formData.append("price", "100");
    formData.append("description", "Descrição Produto Teste");
    formData.append("file", fs.createReadStream("tmp/test-image.jpg"));
    formData.append("category_id", createdCategory.data.id);

    createdProduct = await axios.post(`${productBaseURL}`, formData, {
      headers: {
        ...formData.getHeaders(),
        Authorization: `Bearer ${authToken}`,
      },
    });

    createdOrder = await axios.post(
      orderBaseURL,
      {
        table: 900,
        name: "Order Teste",
      },
      { headers: { Authorization: `Bearer ${authToken}` } },
    );

    createdOrderItem = await axios
      .post(
        baseURL,
        {
          order_id: `${createdOrder.data.id}`,
          product_id: `${createdProduct.data.id}`,
          amount: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      )
      .catch((err) => err.response);
  } catch (e) {
    console.error(
      `Erro ao criar categoria, produto e order para teste de deletar orderItem: ${e.message}`,
    );
  }
});

afterAll(async () => {
  try {
    await axios.delete(`${productBaseURL}/${createdProduct.data.id}`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    await axios.delete(`${categoryBaseURL}/${createdCategory.data.id}`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    await axios.delete(`${orderBaseURL}/${createdOrder.data.id}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
  } catch (e) {
    console.error(
      `Erro ao deletar produto, categoria e order ao final do teste de criar orderItem: ${e.message}`,
    );
  }
});

describe("DELETE /api/v1/orderItem", () => {
  test("deve retornar status 204 para orderItem deletado", async () => {
    const response = await axios
      .delete(`${baseURL}/${createdOrderItem.data.id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .catch((err) => err.response);

    expect(response.status).toBe(204);
  });

  test("deve retornar status 404 para orderItem não encontrado", async () => {
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
