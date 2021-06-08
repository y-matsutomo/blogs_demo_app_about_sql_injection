import { rest } from "../rest";
import { User } from "../@type/User";

export const getUsers = async (clientId: number): Promise<User[]> => {
  try {
    const { data } = await rest.get<User[]>("users", {
      params: {
        clientId: clientId,
      },
    });
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const searchUsers = async (
  clientId: number,
  name: string
): Promise<User[]> => {
  try {
    const { data } = await rest.get<User[]>("usersearch", {
      params: {
        clientId: clientId,
        name: name,
      },
    });
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const searchRiskyUsers = async (
  clientId: number,
  name: string
): Promise<User[]> => {
  try {
    const { data } = await rest.get<User[]>("riskyusersearch", {
      params: {
        clientId: clientId,
        name: name,
      },
    });
    return data;
  } catch (error) {
    throw new Error(error);
  }
};
