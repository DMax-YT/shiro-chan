/**
 * Sleep
 * @param {number} ms Time to sleep in milliseconds
 */
const sleep = (ms) => new Promise((resolve) => setTimeout(() => resolve(), ms));

module.exports = sleep;
