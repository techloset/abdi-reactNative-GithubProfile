import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider as BaseApolloProvider,
} from '@apollo/client';
import {API_TOKEN} from '@env';

const apiUrl = 'https://api.github.com/graphql';

const client = new ApolloClient({
  uri: apiUrl,
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
  },
});

export {client, BaseApolloProvider as ApolloProvider};
