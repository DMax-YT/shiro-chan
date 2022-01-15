/**
 * @template T
 * @param {T[]} array
 * @returns {T}
 */
const getRandomItem = (array) =>
  array[Math.floor(Math.random() * array.length)];

module.exports = getRandomItem;
