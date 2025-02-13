import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import UserService from "../../services/v1/UserService";
import UserRepository from "../../repositories/UserRepository";
import { ApiError } from "../../errors/apiError";

class UserController {
  async findAll(_req: Request, res: Response) {
    const users = await UserService.findAll();

    return res.status(StatusCodes.OK).json(users);
  }

  async getUserById(req: Request, res: Response) {
    const { id } = req.params;
    const userDetails = await UserService.getUserById(id);

    return res.status(StatusCodes.OK).json(userDetails);
  }

  async create(req: Request, res: Response) {
    const { name, email, password } = req.body;
    const user = await UserService.create({ name, email, password });

    return res.status(StatusCodes.CREATED).json(user);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    await UserService.delete(id);

    return res.status(StatusCodes.NO_CONTENT).end();
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const updatedUser = await UserService.update(id, req.body);

    return res.status(StatusCodes.OK).json(updatedUser);
  }

  async partialUpdate(req: Request, res: Response) {
    const { id } = req.params;
    const updatedUser = await UserService.partialUpdate(id, req.body);

    return res.status(StatusCodes.OK).json(updatedUser);
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const auth = await UserService.login({ email, password });

    return res.status(StatusCodes.OK).json(auth);
  }
}

export default UserController;
