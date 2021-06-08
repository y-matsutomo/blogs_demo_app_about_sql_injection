import { Client } from "./Client";

export type User = {
  id: number;
  clientId: number;
  client: Client;
  firstName: string;
  lastName: string;
  age: number;
  createdDateTime: Date;
  updatedDateTime: Date;
};
