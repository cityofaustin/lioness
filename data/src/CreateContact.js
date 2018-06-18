import { request } from "graphql-request";

const CreateContact = async (
  endpoint,
  name,
  phone,
  email,
  locationId,
  hours
) => {
  const query = `
    mutation(
      $name: String!
      $phone: Json!
      $email: String!
      $locationId: ID
      $hours: [ContacthoursContactDayAndDuration!]
    ) {
      createContact(
        name: $name
        phone: $phone
        email: $email
        locationId: $locationId
        hours: $hours
      ) {
        id
        name
      }
    }
  `;
  const variables = {
    name,
    phone,
    email,
    locationId,
    hours
  };
  const data = await request(endpoint, query, variables);
  return data.createContact;
};

export default CreateContact;
