import { request } from "graphql-request";

const CreateTopic = async (
  endpoint,
  text,
  description,
  callToAction,
  slug,
  themeId
) => {
  const query = `
    mutation(
      $text: String!
      $description: String!
      $slug: String!
      $callToAction: String!
      $themeId: ID
    ) {
      createTopic(
        text: $text
        description: $description
        slug: $slug
        callToAction: $callToAction
        themeId: $themeId
      ) {
        id
        slug
      }
    }
  `;
  const variables = {
    text,
    description,
    callToAction,
    slug,
    themeId
  };
  const data = await request(endpoint, query, variables);
  return data.createTopic;
};

export default CreateTopic;
