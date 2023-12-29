import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider as BaseApolloProvider,
} from '@apollo/client';

const apiUrl = 'https://api.github.com/graphql';
const githubToken = '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';
// const githubToken = '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';

const client = new ApolloClient({
  uri: apiUrl,
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Bearer ${githubToken}`,
  },
});

export {client, BaseApolloProvider as ApolloProvider};
