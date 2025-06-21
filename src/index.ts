import { Team, Contributor } from "@honeycomb-app/hexacore"
import { Developer } from "./developer"
import { ProductOwner } from "./po"

import dotenv from "dotenv"
dotenv.config()

const changeRequest = "Add login feature with secure authentication."

const productOwner: Contributor = new ProductOwner(changeRequest)
const developer: Contributor = new Developer()

Team.addContributor(productOwner)
Team.addContributor(developer)

async function run() {
  const result = await productOwner.execute(changeRequest)
  console.log("Refined Task:", result.refinedTask)
  console.log("Implementation Plan:", result.implementation)
}

run()