import { request } from "graphql-request";

const CreateService = async (
  endpoint,
  title,
  slug,
  topicId,
  steps,
  dynamicContent,
  additionalContent,
  imageId,
  contactId
) => {
  const query = `
    mutation createServicePage(
      $title: String!
      $slug: String!
      $topicId: ID
      $steps: Json!
      $dynamicContent: Json!
      $additionalContent: String!
      $imageId: ID
      $contactIds: [ID!]
    ) {
      createServicePage(
        title: $title
        slug: $slug
        topicId: $topicId
        steps: $steps
        dynamicContent: $dynamicContent
        additionalContent: $additionalContent
        imageId: $imageId
        contactsIds: $contactIds
      ) {
        id
        slug
      }
    }
  `;

  let contactIds;
  if (contactId) {
    contactIds = [contactId];
  }

  const variables = {
    title,
    slug,
    topicId,
    steps,
    dynamicContent,
    additionalContent,
    imageId,
    contactIds
  };
  const data = await request(endpoint, query, variables);
  return data.createServicePage;
};

export default CreateService;
