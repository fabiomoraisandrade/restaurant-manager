import { Request, Response } from "express";
import UserService from "../../services/v1/UserService";

class UserController {
  async findAll(_req: Request, res: Response) {
    const users = await UserService.findAll();
    return res.json(users);
  }

  async create(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const user = await UserService.create({ name, email, password });

    return res.json(user);
  }
}

export default UserController;
