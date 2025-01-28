import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import UserService from "../../services/v1/UserService";

class UserController {
  async findAll(_req: Request, res: Response) {
    const users = await UserService.findAll();

    return res.status(StatusCodes.OK).json(users);
  }

  async getUserDetails(req: Request, res: Response) {
    const { id } = req.params;
    const userDetails = await UserService.getUserDetails(id);

    return res.status(StatusCodes.OK).json(userDetails);
  }

  async create(req: Request, res: Response) {
    const { name, email, password } = req.body;
    const user = await UserService.create({ name, email, password });

    return res.status(StatusCodes.CREATED).json(user);
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const auth = await UserService.login({ email, password });

    return res.status(StatusCodes.OK).json(auth);
  }
}

export default UserController;
