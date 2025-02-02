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
        `${baseURL}/category?category_id=e36b4656-cc7f-4bb8-9d0e-828d6fda4c14`,
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
  test("deve retornar status 400 para produto não encontrado", async () => {
    const response = await axios
      .get(`${baseURL}/id-que-nao-existe`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .catch((err) => err.response);

    expect(response.status).toBe(400);
  });

  test("deve retornar status 200 para produto retornado com sucesso", async () => {
    const response = await axios
      .get(`${baseURL}/a231a8f9-07c8-4b40-a832-fe81e5ea3cb2`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .catch((err) => err.response);

    expect(response.status).toBe(200);
  });
});
