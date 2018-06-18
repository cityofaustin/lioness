import "babel-polyfill";
import fs from "fs";
import yaml from "js-yaml";

import CreateThreeOneOne from "./CreateThreeOneOne";
import CreateLocation from "./CreateLocation";

const gqlEndpoint =
  "http://localhost:60000/simple/v1/cjijth3m700040192biiapqvu";

// Add 311s
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

// Add Locations
try {
  const locations = yaml.safeLoad(
    fs.readFileSync("./data/fixtures/locations.yaml", "utf8")
  );
  locations.locations.forEach(location =>
    CreateLocation(
      gqlEndpoint,
      location.name,
      location.street,
      location.city,
      location.state,
      "UNITED_STATES",
      location.zip.toString()
    )
  );
} catch (e) {
  console.log(e);
}
