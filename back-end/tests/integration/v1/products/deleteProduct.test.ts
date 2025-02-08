import axios from "axios";
import FormData from "form-data";
import fs from "fs";

describe("DELETE /api/v1/product", () => {
  const baseURL = "http://localhost:3333/api/v1/product";
  let authToken;
  let createdProduct;

  beforeAll(async () => {
    try {
      const loginURL = "http://localhost:3333/api/v1/login";
      const credentials = {
        email: "email1@teste.com",
        password: "123456",
      };

      const response = await axios.post(loginURL, credentials);
      authToken = response.data.token;

      const formData = new FormData();
      formData.append("name", "Produto Teste");
      formData.append("price", "100");
      formData.append("description", "Descrição Produto Teste");
      formData.append("file", fs.createReadStream("tmp/test-image.jpg"));
      formData.append("category_id", "b78f3dcc-fae7-4f5e-bc28-3059c67f4cc0");

      createdProduct = await axios.post(
        "http://localhost:3333/api/v1/product",
        formData,
        {
          headers: {
            ...formData.getHeaders(),
            Authorization: `Bearer ${authToken}`,
          },
        },
      );
    } catch (e) {
      console.error(`Erro ao criar produto para testar o delete: ${e.message}`);
    }
  });

  test("deve retornar status 204 para produto deletado", async () => {
    const response = await axios
      .delete(`${baseURL}/${createdProduct.data.id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .catch((err) => err.response);

    expect(response.status).toBe(204);
  });

  test("deve retornar status 404 para produto não encontrado", async () => {
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
