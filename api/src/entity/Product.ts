import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

export enum ProductCategory {
  UNKNOWN,
  WOMENS_WEAR,
  MENS_WEAR,
  ACCESSORIES,
}

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text", { nullable: false })
  name: string;

  @Column("integer", { nullable: false })
  category: ProductCategory;

  @Column("text")
  description: string;

  @Column("integer", { nullable: false })
  price: number;

  @CreateDateColumn({
    precision: 3,
    default: () => "datetime('now')",
  })
  createdDateTime: Date;

  @UpdateDateColumn({
    precision: 3,
    default: () => "datetime('now')",
  })
  updatedDateTime: Date;
}
