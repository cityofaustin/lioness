import { request } from "graphql-request";

const CreateLocation = async (
  endpoint,
  name,
  street,
  city,
  state,
  country,
  zip
) => {
  const query = `
    mutation(
      $name: String!
      $street: String!
      $city: String!
      $state: LocationState,
      $country: LocationCountry,
      $zip: String!
    ) {
      createLocation(
        name: $name,
        street: $street,
        city: $city,
        state: $state,
        country: $country,
        zip: $zip
      ) {
        id
        name
      }
    }
  `;
  const variables = {
    name,
    street,
    city,
    state,
    country,
    zip
  };
  const data = await request(endpoint, query, variables);
  return data.createLocation;
};

export default CreateLocation;
