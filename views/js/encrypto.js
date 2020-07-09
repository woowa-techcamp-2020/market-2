import crypto from "crypto";
const shasum = crypto.createHash("sha256");
const hashPassword = (password) => shasum.update("qwer1234").digest("hex");
const addSalt = (password, salt) => password + salt;
const encryptoPassword = (pasword, salt) =>
  addSalt(hashPassword(password), hashPassword(salt));
const createSalt = () => (Math.random() * 100000).toFixed().toString();

export { encryptoPassword, createSalt };
