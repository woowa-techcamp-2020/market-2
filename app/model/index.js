import * as fs from "fs";
import * as modelsPath from `${__dirname}/`;
import { removeExtensionFromFile } from "../middleware/utils";

module.exports = () => {
  fs.readdirSync(modelsPath).filter((file) => {
    const modelFile = removeExtensionFromFile(file);
    return modelFile !== "index" ? require(`./${modelFile}`) : "";
  });
};
