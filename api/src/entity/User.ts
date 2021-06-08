import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Client } from "./Client";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text", { nullable: false })
  firstName: string;

  @Column("text", { nullable: false })
  lastName: string;

  @Column("integer", { nullable: true })
  age: number;

  @Column("integer", { nullable: false })
  clientId: number;

  @ManyToOne(() => Client, {
    eager: true,
  })
  client: Client | undefined | null;

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
