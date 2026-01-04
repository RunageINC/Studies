import OrderBusiness from "./business/orderBusiness.js";
import Order from "./entities/order.js";

const order = new Order({
  customerId: 123,
  amount: 200000,
  products: [{ description: "Shampoo" }],
});

const orderBusiness = new OrderBusiness();

console.log("orderBusiness.create", orderBusiness.create(order));
