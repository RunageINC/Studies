'use strict';
    const { cars: CARS_DB } = require("../utils/dbConstants");

const BaseRepository = require("../repository/base/baseRepository");
const Tax = require("../entities/tax");
const Transaction = require("../entities/transaction");

const FORMATTED_DATE_OPTIONS = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

class CarService {
  constructor({ cars } = { cars: undefined }) {
    this.carRepository = new BaseRepository({ file: cars ?? CARS_DB });
    this.taxesBasedOnAge = Tax.taxesBasedOnAge;
    this.currencyFormat = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  getRandomPositionFromArray(array) {
    const arrayLength = array.length;
    return Math.floor(Math.random() * arrayLength);
  }

  chooseRandomCar(carCategory) {
    const carIdIndex = this.getRandomPositionFromArray(carCategory.carIds);
    const carId = carCategory.carIds[carIdIndex];

    return carId;
  }

  calculateFinalPrice(customer, carCategory, numberOfDays) {
    const { age } = customer;
    const { price } = carCategory;
    const { then: tax } = this.taxesBasedOnAge.find(
      (tax) => age >= tax.from && age <= tax.to
    );

    const finalPrice = tax * price * numberOfDays;
    const formattedPrice = this.currencyFormat.format(finalPrice);

    return formattedPrice;
  }

  async getAvailableCar(carCategory) {
    const carId = this.chooseRandomCar(carCategory);
    const car = await this.carRepository.find(carId);

    return car;
  }

  async rent(customer, carCategory, numberOfDays) {
    const car = await this.getAvailableCar(carCategory);
    const finalPrice = await this.calculateFinalPrice(
      customer,
      carCategory,
      numberOfDays
    );

    const today = new Date();
    today.setDate(today.getDate() + numberOfDays);
    const dueDate = today.toLocaleDateString("pt-br", FORMATTED_DATE_OPTIONS);

    const transaction = new Transaction({
      customer,
      car,
      dueDate,
      amount: finalPrice,
    });

    return transaction;
  }
}

module.exports = CarService;
