const random = (min, max) => Math.floor(Math.random() * (max + 1 - min) + min);
const randomFloat = (min, max) => Math.random() * (max + 1 - min) + min;

module.exports = {
  random,
  randomFloat,
};
