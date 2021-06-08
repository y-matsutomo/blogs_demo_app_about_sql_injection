import "reflect-metadata";
import { createConnection, useContainer as useContainerForOrm } from "typeorm";
import {
  createExpressServer,
  useContainer as useContainerForRouting,
} from "routing-controllers";
import { Container } from "typedi";
import { User } from "./entity/User";
import { UserController } from "./controller/UserController";
import { Login } from "./entity/Login";
import { LoginController } from "./controller/LoginController";
import { Product, ProductCategory } from "./entity/Product";
import { Purchase } from "./entity/Purchase";
import { ProductController } from "./controller/ProductController";
import { Client } from "./entity/Client";
import { RiskyUserController } from "./controller/RiskyUserController";

useContainerForOrm(Container);
useContainerForRouting(Container);

const init = async () => {
  const portNumber = 3001;
  const connection = await createConnection();

  console.log("Connected. ");

  const app = createExpressServer({
    cors: true,
    controllers: [
      UserController,
      RiskyUserController,
      LoginController,
      ProductController,
    ],
  });

  app.listen(portNumber);

  await seedTestDate(connection);

  console.log(
    `Express server has started on port ${portNumber}. Open http://localhost:${portNumber}/users?clientId=1 to see results`
  );
};

init();

const seedTestDate = async (connection) => {
  const client1 = await connection.manager.save(
    connection.manager.create(Client, {
      companyName: "North Logistics",
    })
  );

  const client2 = await connection.manager.save(
    connection.manager.create(Client, {
      companyName: "Western Computer Repair",
    })
  );

  const user1 = await connection.manager.save(
    connection.manager.create(User, {
      clientId: client1.id,
      client: client1,
      firstName: "Timber",
      lastName: "Saw",
      age: 27,
    })
  );
  await connection.manager.save(
    connection.manager.create(Login, {
      userId: user1.id,
      email: "timber@gmail.com",
      password: "timber27",
    })
  );

  const user2 = await connection.manager.save(
    connection.manager.create(User, {
      clientId: client1.id,
      client: client1,
      firstName: "Phantom",
      lastName: "Assassin",
      age: 24,
    })
  );
  await connection.manager.save(
    connection.manager.create(Login, {
      userId: user2.id,
      email: "phantom@gmail.com",
      password: "phantom24",
    })
  );

  const user3 = await connection.manager.save(
    connection.manager.create(User, {
      clientId: client2.id,
      client: client2,
      firstName: "Chris",
      lastName: "Smith",
      age: 32,
    })
  );
  await connection.manager.save(
    connection.manager.create(Login, {
      userId: user3.id,
      email: "chris@gmail.com",
      password: "chris32",
    })
  );

  const products = await connection.manager.save([
    connection.manager.create(Product, {
      name: "White Skirt",
      category: ProductCategory.WOMENS_WEAR,
      description: "",
      price: 800,
    }),
    connection.manager.create(Product, {
      name: "Swimwear",
      category: ProductCategory.MENS_WEAR,
      description: "size M",
      price: 1200,
    }),
    connection.manager.create(Product, {
      name: "Baseball Cap",
      category: ProductCategory.ACCESSORIES,
      description: "",
      price: 1000,
    }),
    connection.manager.create(Product, {
      name: "white T-shirt",
      category: ProductCategory.MENS_WEAR,
      description: "",
      price: 3000,
    }),
  ]);

  await connection.manager.save([
    connection.manager.create(Purchase, {
      userId: user1.id,
      productId: products[0].id,
      number: 10,
      discount: 0.0,
      purchasedDateTime: new Date(),
    }),
    connection.manager.create(Purchase, {
      userId: user1.id,
      productId: products[1].id,
      number: 1,
      discount: 0.0,
      purchasedDateTime: new Date(),
    }),
    connection.manager.create(Purchase, {
      userId: user1.id,
      productId: products[2].id,
      number: 3,
      discount: 0.0,
      purchasedDateTime: new Date(),
    }),
    connection.manager.create(Purchase, {
      userId: user1.id,
      productId: products[3].id,
      number: 5,
      discount: 0.15,
      purchasedDateTime: new Date(),
    }),
  ]);
};
