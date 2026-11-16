import fs from "fs";

export function getMpesaConfig() {
  const config = JSON.parse(fs.readFileSync("./mpesaConfig.json", "utf8"));
  return config.mpesa;
}
