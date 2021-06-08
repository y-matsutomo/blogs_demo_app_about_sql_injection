/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */
import { Body, JsonController, Post } from "routing-controllers";
import { Inject, Service } from "typedi";
import { Login } from "../entity/Login";
import { ILoginUsecase, LoginUsecaseToken } from "../usecase/LoginUsecase";

@JsonController()
@Service()
export class LoginController {
  @Inject(LoginUsecaseToken)
  private userUsecase: ILoginUsecase;

  @Post("/login")
  async tryLogin(@Body() login: Login) {
    try {
      return await this.userUsecase.tryLogin(login.email, login.password);
    } catch (error) {
      throw new Error("Login was failed.");
    }
  }
}
