import { request } from "graphql-request";

const CreateDepartment = async (endpoint, name, mission, slug, contactId) => {
  const query = `
    mutation($name: String!, $mission: String!, $slug: String!, $contactIds: [ID!]) {
      createDepartment(
        name: $name
        mission: $mission
        slug: $slug
        contactsIds: $contactIds
      ) {
        id
      }
    }
  `;

  let contactIds;
  if (contactId) {
    contactIds = [contactId];
  }

  const variables = {
    name,
    mission,
    slug,
    contactIds
  };
  const data = await request(endpoint, query, variables);
  return data;
};

export default CreateDepartment;
