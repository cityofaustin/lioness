import { request } from "graphql-request";

const CreateDepartment = async (
  endpoint,
  name,
  mission,
  slug,
  contactId,
  imageId
) => {
  const query = `
    mutation($name: String!, $mission: String!, $slug: String!, $contactIds: [ID!], $imageId:ID) {
      createDepartment(
        name: $name
        mission: $mission
        slug: $slug
        contactsIds: $contactIds
        imageId: $imageId
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
    contactIds,
    imageId
  };
  const data = await request(endpoint, query, variables);
  return data;
};

export default CreateDepartment;
