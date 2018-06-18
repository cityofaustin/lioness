import { request } from "graphql-request";

const CreateThreeOneOne = async (endpoint, title, url) => {
  const query = `
    mutation($title:String!, $url:String!) {
      createThreeOneOne(title:$title, url:$url) {
        id
        title
      }
    }
  `;
  const variables = {
    title,
    url
  };
  const data = await request(endpoint, query, variables);
  return data;
};

export default CreateThreeOneOne;
