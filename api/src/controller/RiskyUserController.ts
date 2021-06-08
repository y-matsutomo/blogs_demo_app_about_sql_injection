/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */
import {
  Get,
  JsonController,
  NotFoundError,
  QueryParam,
} from "routing-controllers";
import { Inject, Service } from "typedi";
import {
  IRiskyUserUsecase,
  RiskyUserUsecaseToken,
} from "../usecase/RiskyUserUsecase";

@JsonController()
@Service()
export class RiskyUserController {
  @Inject(RiskyUserUsecaseToken)
  private userUsecase: IRiskyUserUsecase;

  @Get("/riskyusersearch")
  async riskySearch(
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
