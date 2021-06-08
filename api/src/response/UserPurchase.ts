import { Product } from "../entity/Product";

export type UserPurchase = {
  id: number;
  userId: number;
  product: Product;
  number: number;
  discount: number;
  purchasedDateTime: Date;
};
