console.log(12);
const { randomBytes } = require("crypto");
const buffer = randomBytes(32);
console.log(buffer.toString());
