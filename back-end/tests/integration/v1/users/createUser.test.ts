import axios from "axios";
import UserService from "../../../../src/services/v1/UserService";
import UserRepository from "../../../../src/repositories/UserRepository";

jest.mock("../../../../src/repositories/UserRepository");

describe("POST /api/v1/users", () => {
  const baseURL = "http://localhost:3333/api/v1/users";
  it("deve retornar status 400 se o nome não for enviado", async () => {
    const response = await axios
      .post(baseURL, {
        email: "test@example.com",
        password: "123456",
      })
      .catch((err) => err.response);
    expect(response.status).toBe(400);
    expect(response.data).toHaveProperty("message", "name is required");
  });

  it("deve retornar status 400 se o email não for enviado", async () => {
    const response = await axios
      .post(baseURL, {
        name: "Jane Doe",
        password: "123456",
      })
      .catch((err) => err.response);

    expect(response.status).toBe(400);
    expect(response.data).toHaveProperty("message", "email is required");
  });

  it("deve retornar status 400 se a senha não for enviada", async () => {
    const response = await axios
      .post(baseURL, {
        name: "Jane Doe",
        email: "test@example.com",
      })
      .catch((err) => err.response);

    expect(response.status).toBe(400);
    expect(response.data).toHaveProperty("message", "password is required");
  });

  it("deve lançar erro se o email já está registrado", async () => {
    UserRepository.findByEmail = jest.fn().mockResolvedValue({
      id: "2",
      name: "Nome2",
      email: "email@teste2.com",
      password: "789456",
    });

    const userData = {
      name: "Nome3",
      email: "email@teste3.com",
      password: "134895",
    };

    await expect(UserService.create(userData)).rejects.toMatchObject({
      statusCode: 409,
      message: "Email is already registered.",
    });
  });

  it("deve criar um usuário com sucesso", async () => {
    UserRepository.findByEmail = jest.fn().mockResolvedValue(null);
    UserRepository.create = jest.fn().mockResolvedValue({
      id: 1,
      name: "Jane Doe",
      email: "test@example.com",
    });

    const userData = {
      name: "Jane Doe",
      email: "test@example.com",
      password: "123456",
    };

    const user = await UserService.create(userData);
    // console.log(`user: ${JSON.stringify(user, null, 2)}`);

    expect(user).toEqual({
      id: 1,
      name: "Jane Doe",
      email: "test@example.com",
    });
  });
});
