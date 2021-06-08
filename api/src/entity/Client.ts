import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text", { nullable: false })
  companyName: string;

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
