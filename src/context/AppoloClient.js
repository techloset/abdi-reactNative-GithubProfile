import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider as BaseApolloProvider,
} from '@apollo/client';

const apiUrl = 'https://api.github.com/graphql';
const githubToken = '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';

const client = new ApolloClient({
  uri: apiUrl,
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Bearer ${githubToken}`,
  },
});

export {client, BaseApolloProvider as ApolloProvider};
