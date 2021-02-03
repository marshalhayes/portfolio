import { registerAs } from '@nestjs/config';

export interface PrismicConfig {
  apiEndpoint: string;
  graphqlUri: string;
  accessToken: string;
}

export default registerAs('prismic', () => ({
  apiEndpoint: process.env.PRISMIC_API_ENDPOINT,
  graphqlUri: process.env.PRISMIC_GRAPHQL_URI,
  accessToken: process.env.PRISMIC_ACCESS_TOKEN,
}));
