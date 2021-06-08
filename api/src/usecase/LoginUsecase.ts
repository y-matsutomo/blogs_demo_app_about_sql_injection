import { Service, Token } from "typedi";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Login } from "../entity/Login";

export interface ILoginUsecase {
  tryLogin(
    email: typeof Login.prototype.email,
    password: typeof Login.prototype.password
  ): Promise<Boolean>;
}
export const LoginUsecaseToken = new Token<ILoginUsecase>();

@Service(LoginUsecaseToken)
export class LoginUsecase implements ILoginUsecase {
  @InjectRepository(Login)
  private loginRepository: Repository<Login>;

  async tryLogin(
    email: typeof Login.prototype.email,
    password: typeof Login.prototype.password
  ) {
    const login = await this.loginRepository.findOne({
      email: email,
      password: password,
    });
    if (login === undefined) return false;
    else return true;
  }
}
