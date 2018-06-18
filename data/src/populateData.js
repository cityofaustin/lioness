import "babel-polyfill";
import fs from "fs";
import yaml from "js-yaml";

import CreateThreeOneOne from "./CreateThreeOneOne";

const gqlEndpoint =
  "http://localhost:60000/simple/v1/cjijth3m700040192biiapqvu";

// Add 311
try {
  const threeOneOnes = yaml.safeLoad(
    fs.readFileSync("./data/fixtures/311.yaml", "utf8")
  );
  // console.log(threeOneOnes["311"]);
  threeOneOnes["311"].forEach(threeOneOne =>
    CreateThreeOneOne(gqlEndpoint, threeOneOne.title_en, threeOneOne.url)
  );
} catch (e) {
  console.log(e);
}
