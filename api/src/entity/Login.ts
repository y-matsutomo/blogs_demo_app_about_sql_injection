import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Login {
  @PrimaryColumn()
  userId: number;

  @Column("text", { nullable: false })
  email: string;

  @Column("text", { nullable: false })
  password: string;

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
