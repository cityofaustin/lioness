import "babel-polyfill";
import fs from "fs";
import yaml from "js-yaml";

import CreateThreeOneOne from "./CreateThreeOneOne";
import CreateLocation from "./CreateLocation";
import CreateContact from "./CreateContact";
import CreateDepartment from "./CreateDepartment";
import CreateTheme from "./CreateTheme";

const gqlEndpoint =
  "http://localhost:60000/simple/v1/cjik1jqri000401381bkzsrti";

const populateData = async () => {
  // Add 311s
  let threeOneOnesWithIds;
  try {
    const threeOneOnes = yaml.safeLoad(
      fs.readFileSync("./data/fixtures/311.yaml", "utf8")
    );

    threeOneOnesWithIds = await Promise.all(
      threeOneOnes["311"].map(threeOneOne =>
        CreateThreeOneOne(gqlEndpoint, threeOneOne.title_en, threeOneOne.url)
      )
    );
  } catch (e) {
    console.log(e);
  }

  // Add Locations
  let locationsWithIds;
  try {
    const locations = yaml.safeLoad(
      fs.readFileSync("./data/fixtures/locations.yaml", "utf8")
    );

    locationsWithIds = await Promise.all(
      locations.locations.map(location =>
        CreateLocation(
          gqlEndpoint,
          location.name,
          location.street,
          location.city,
          location.state,
          "UNITED_STATES",
          location.zip.toString()
        )
      )
    );
  } catch (e) {
    console.log(e);
  }

  // Add Contacts
  let contactsWithIds;
  try {
    const contacts = yaml.safeLoad(
      fs.readFileSync("./data/fixtures/contacts.yaml", "utf8")
    );

    contactsWithIds = await Promise.all(
      contacts.contacts.map(contact => {
        const locationId = locationsWithIds.find(
          l => l.name === contact.location
        ).id;

        const formattedHours = Object.entries(contact.hours).map(h => ({
          dayOfWeek: h[0].toUpperCase(),
          startTime: `T${h[1].start}`,
          endTime: `T${h[1].end}`
        }));

        return CreateContact(
          gqlEndpoint,
          contact.name.toString(),
          contact.phone,
          contact.email,
          locationId,
          formattedHours
        );
      })
    );
  } catch (e) {
    console.log(e);
  }

  // Add Departments
  let departmentsWithIds;
  try {
    const departments = yaml.safeLoad(
      fs.readFileSync("./data/fixtures/departments.yaml", "utf8")
    );

    departmentsWithIds = await Promise.all(
      departments.departments.map(department => {
        const contactId =
          department.contact &&
          contactsWithIds.find(c => c.name === department.contact.toString())
            .id;
        return CreateDepartment(
          gqlEndpoint,
          department.name_en,
          department.mission_en,
          department.slug,
          contactId
        );
      })
    );
  } catch (e) {
    console.log(e);
  }

  // Add Themes
  let themesWithIds;
  try {
    const themes = yaml.safeLoad(
      fs.readFileSync("./data/fixtures/themes.yaml", "utf8")
    );

    themesWithIds = await Promise.all(
      themes.themes.map(theme =>
        CreateTheme(
          gqlEndpoint,
          theme.text_en,
          theme.description_en || "",
          theme.slug
        )
      )
    );
  } catch (e) {
    console.log(e);
  }
};

populateData();
