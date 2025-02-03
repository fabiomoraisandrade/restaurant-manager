import axios from "axios";

let authToken;
const baseURL = "http://localhost:3333/api/v1/product";

beforeAll(async () => {
  const loginURL = "http://localhost:3333/api/v1/login";
  const credentials = {
    email: "email1@teste.com",
    password: "123456",
  };

  const response = await axios.post(loginURL, credentials);
  authToken = response.data.token;
});

describe("GET /api/v1/product/category", () => {
  test("deve retornar status 200 para produto retornado com sucesso", async () => {
    const response = await axios
      .get(
        `${baseURL}/category?category_id=caa4864c-aa54-4da7-9323-62cdf0fea628`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      )
      .catch((err) => err.response);

    expect(response.status).toBe(200);
  });
});

describe("GET /api/v1/product", () => {
  test("deve retornar status 404 para produto não encontrado", async () => {
    const response = await axios
      .get(`${baseURL}/id-que-nao-existe`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .catch((err) => err.response);

    expect(response.status).toBe(404);
  });

  test("deve retornar status 200 para produto retornado com sucesso", async () => {
    const response = await axios
      .get(`${baseURL}/cd5bf143-026c-4320-821f-3077291d4ea7`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .catch((err) => err.response);

    expect(response.status).toBe(200);
  });
});
