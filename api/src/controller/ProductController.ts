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
  IProductUsecase,
  ProductUsecaseToken,
} from "../usecase/ProductUsecase";

@JsonController()
@Service()
export class ProductController {
  @Inject(ProductUsecaseToken)
  private productUsecase: IProductUsecase;

  @Get("/products")
  async getOne(@QueryParam("name") name: string) {
    try {
      return await this.productUsecase.getOne(name);
    } catch (error) {
      throw new NotFoundError("A product was not found.");
    }
  }
}
