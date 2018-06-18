import { request } from "graphql-request";

const CreateTheme = async (endpoint, text, description, slug) => {
  const query = `
    mutation($text: String!, $description: String!, $slug: String!) {
      createTheme(text: $text, description: $description, slug: $slug) {
        id
      }
    }
  `;
  const variables = {
    text,
    description,
    slug
  };
  const data = await request(endpoint, query, variables);
  return data;
};

export default CreateTheme;
