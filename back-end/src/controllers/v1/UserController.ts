import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import UserService from "../../services/v1/UserService";

class UserController {
  async findAll(_req: Request, res: Response) {
    const users = await UserService.findAll();
    return res.json(users);
  }

  async create(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const user = await UserService.create({ name, email, password });

    return res.status(StatusCodes.CREATED).json(user);
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const auth = await UserService.login({ email, password });
    return res.json(auth);
  }

  async getUserDetails(req: Request, res: Response) {
    const { id } = req.params;
    const userDetails = await UserService.getUserDetails(id);

    return res.json(userDetails);
  }
}

export default UserController;
