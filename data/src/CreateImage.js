import { request } from "graphql-request";

const CreateImage = async (endpoint, filename, title) => {
  const query = `
    mutation($filename: String!, $title: String!) {
      createImage(filename: $filename, title: $title) {
        id
        filename
      }
    }
  `;
  const variables = {
    filename,
    title
  };
  const data = await request(endpoint, query, variables);
  return data.createImage;
};

export default CreateImage;
