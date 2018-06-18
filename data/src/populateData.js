import "babel-polyfill";
import fs from "fs";
import yaml from "js-yaml";

import CreateThreeOneOne from "./CreateThreeOneOne";
import CreateLocation from "./CreateLocation";
import CreateContact from "./CreateContact";
import CreateImage from "./CreateImage";
import CreateDepartment from "./CreateDepartment";
import CreateTheme from "./CreateTheme";
import CreateTopic from "./CreateTopic";
import CreateService from "./CreateService";

const gqlEndpoint =
  "http://localhost:60000/simple/v1/cjikpk1ht00040123yzs8ofzq";

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

  // Add Images
  let imagesWithIds;
  try {
    const images = yaml.safeLoad(
      fs.readFileSync("./data/fixtures/images.yaml", "utf8")
    );

    imagesWithIds = await Promise.all(
      images.images.map(image =>
        CreateImage(gqlEndpoint, image.filename, image.alt_text_en)
      )
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

        const imageId =
          department.image &&
          imagesWithIds.find(i => i.filename === department.image).id;

        return CreateDepartment(
          gqlEndpoint,
          department.name_en,
          department.mission_en,
          department.slug,
          contactId,
          imageId
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

  // Add Topics
  let topicsWithIds;
  try {
    const topics = yaml.safeLoad(
      fs.readFileSync("./data/fixtures/topics.yaml", "utf8")
    );

    topicsWithIds = await Promise.all(
      topics.topics.map(topic => {
        const themeId =
          topic.theme && themesWithIds.find(t => t.slug === topic.theme).id;

        return CreateTopic(
          gqlEndpoint,
          topic.text_en,
          topic.description_en || "",
          topic.call_to_action_en || "",
          topic.slug,
          themeId
        );
      })
    );
  } catch (e) {
    console.log(e);
  }

  // Add Services
  let servicesWithIds;
  try {
    fs.readdir("./data/fixtures/services/", async (err, servicePaths) => {
      servicesWithIds = await Promise.all(
        servicePaths.map(filename => {
          const service = yaml.safeLoad(
            fs.readFileSync(`./data/fixtures/services/${filename}`, "utf8")
          );

          const topicId =
            service.topic &&
            topicsWithIds.find(t => t.slug === service.topic).id;

          const imageId =
            service.image &&
            imagesWithIds.find(i => i.filename === service.image).id;

          const contactId =
            service.contact &&
            contactsWithIds.find(c => c.name === service.contact.toString()).id;

          return CreateService(
            gqlEndpoint,
            service.title_en,
            service.slug,
            topicId,
            service.steps_en,
            service.dynamic_content,
            service.additional_content_en,
            imageId,
            contactId
          );
        })
      );
    });
  } catch (e) {
    console.log(e);
  }
};

populateData();
