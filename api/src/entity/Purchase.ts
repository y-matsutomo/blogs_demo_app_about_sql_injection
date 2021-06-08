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
export class Purchase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("integer", { nullable: false })
  userId: number;

  @Column("integer", { nullable: false })
  productId: number;

  @Column("integer", { nullable: false })
  number: number;

  @Column("integer", { nullable: false })
  discount: number;

  @Column("date", {
    nullable: true,
  })
  purchasedDateTime: Date;

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
