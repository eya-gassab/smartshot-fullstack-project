import dotenv from "dotenv";
dotenv.config();

import { classifyText } from "./services/aiClassification.js";

async function test() {
  const result = await classifyText("invoice total $250 payment due March 30");
  console.log("Category:", result);
}

test();