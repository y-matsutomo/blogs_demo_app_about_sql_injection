/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */
import {
  Get,
  JsonController,
  NotFoundError,
  QueryParam,
} from "routing-controllers";
import { Inject, Service } from "typedi";
import { IUserUsecase, UserUsecaseToken } from "../usecase/UserUsecase";

@JsonController()
@Service()
export class UserController {
  @Inject(UserUsecaseToken)
  private userUsecase: IUserUsecase;

  @Get("/users")
  async getAll(@QueryParam("clientId") clientId: number) {
    return await this.userUsecase.getAll(clientId);
  }

  @Get("/usersearch")
  async search(
    @QueryParam("clientId") clientId: number,
    @QueryParam("name") name: string
  ) {
    try {
      return await this.userUsecase.search(clientId, name);
    } catch (error) {
      throw new NotFoundError("User was not found.");
    }
  }
}
