import axios from "axios";

let authToken: string;
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
        `${baseURL}/category?category_id=b78f3dcc-fae7-4f5e-bc28-3059c67f4cc0`,
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
      .get(`${baseURL}/1ddc9a6e-3ae5-44c4-bca0-ca2918fbc8fe`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .catch((err) => err.response);

    expect(response.status).toBe(200);
  });
});
