/**
 * Product ID: should be between 2 and 20 characters
 * Name: should be only words
 * Price: should be a number from 0 to 1000
 * Category: should be electronic or organic
 */

function productValidator(product) {
  const errors = [];

  if (!(product.id.length >= 2 && product.id.length <= 20)) {
    errors.push(
      `Id: invalid length. Current [${product.id}] expected to be between 2 and 20 characters.`
    );
  }

  if (/(\W|\d)/.test(product.name)) {
    errors.push(
      `Name: invalid name. Current [${product.name}] expected to be only words.`
    );
  }

  if (!(product.price >= 0 && product.price <= 1000)) {
    errors.push(
      `Price: invalid price. Current [${product.price}] expected to be between 0 and 1000.`
    );
  }

  if (!["electronic", "organic"].includes(product.category)) {
    errors.push(
      `Category: invalid category. Current [${product.category}] expected to be electronic or organic.`
    );
  }

  const isValid = errors.length === 0;

  return {
    result: isValid,
    errors,
  };
}

module.exports = { productValidator };
