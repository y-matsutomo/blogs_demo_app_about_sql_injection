import { Service, Token } from "typedi";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Product } from "../entity/Product";

export interface IProductUsecase {
  getOne(name: typeof Product.prototype.name): Promise<Product>;
}
export const ProductUsecaseToken = new Token<IProductUsecase>();

@Service(ProductUsecaseToken)
export class ProductUsecase implements IProductUsecase {
  @InjectRepository(Product)
  private productRepository: Repository<Product>;

  async getOne(name: typeof Product.prototype.name) {
    const query = `SELECT * 
    FROM Product 
    WHERE name like '%${name}%' 
    ORDER BY name ASC`;
    return await this.productRepository.query(query);
  }
}
