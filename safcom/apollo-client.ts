
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000', // Replace with your GraphQL server endpoint
});

const authLink = setContext((_, { headers }) => {
  // If you need to add authorization headers, do it here
  return {
    headers: {
      ...headers,
      // Add headers if needed
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
