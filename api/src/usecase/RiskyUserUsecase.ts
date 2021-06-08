import { Service, Token } from "typedi";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Client } from "../entity/Client";
import { User } from "../entity/User";

export interface IRiskyUserUsecase {
  search(clientId: typeof Client.prototype.id, name: string): Promise<User[]>;
}
export const RiskyUserUsecaseToken = new Token<IRiskyUserUsecase>();

@Service(RiskyUserUsecaseToken)
export class RiskyUserUsecase implements IRiskyUserUsecase {
  @InjectRepository(User)
  private userRepository: Repository<User>;

  async search(clientId: typeof Client.prototype.id, name: string) {
    const users = await this.userRepository.query(
      `SELECT user.id as id,
      user.firstName as firstName,
      user.lastName as lastName,
      user.age as age,
      user.clientId as clientId,
      user.createdDateTime as createdDateTime,
      user.updatedDateTime as updatedDateTime,
      Client.companyName as 'clientCompanyName',
      Client.createdDateTime as 'clientCreatedDateTime',
      Client.updatedDateTime as 'clientUpdatedDateTime'
      FROM User INNER JOIN Client ON user.clientId = Client.id 
      WHERE clientId = ${clientId} AND (firstName like '%${name}%' OR lastName like '%${name}%')`
    );
    return users.map(
      (u): User => {
        return {
          id: u.id,
          firstName: u.firstName,
          lastName: u.lastName,
          age: u.age,
          clientId: u.clientId,
          client: {
            id: u.clientId,
            companyName: u.clientCompanyName,
            createdDateTime: u.clientCreatedDateTime,
            updatedDateTime: u.clientUpdatedDateTime,
          },
          createdDateTime: u.createdDateTime,
          updatedDateTime: u.updatedDateTime,
        };
      }
    );
  }

  // async save(user: User) {
  //   return await this.userRepository.save(user);
  // }

  // async update(id: number, user: User) {
  //   return await this.userRepository.update(id, user);
  // }

  // async remove(user: User) {
  //   return await this.userRepository.remove(user);
  // }
}
