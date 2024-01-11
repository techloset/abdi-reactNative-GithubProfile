import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import {useQuery, gql} from '@apollo/client';
import Markdown from 'react-native-markdown-display';
import {COLOR, TEXT} from '../styles/GlobalStyles';
import Header from '../components/Header';
import StarIcon from '../assets/images/star.svg';
import Ratio from '../styles/Ratio';
const {widthPixel, pixelSizeHorizontal} = Ratio;

const RepoScreen = ({navigation, route}) => {
  const {userName, repoName} = route.params;

  const [repo, setRepo] = useState(null);
  const [error, setError] = useState(null);

  const FETCH_REPO_DATA = gql`
    query GetRepository($owner: String!, $name: String!) {
      repository(owner: $owner, name: $name) {
        name
        description
        stargazerCount
        object(expression: "main:README.md") {
          ... on Blob {
            text
          }
        }
      }
    }
  `;

  const {data, loading} = useQuery(FETCH_REPO_DATA, {
    variables: {owner: userName.login, name: repoName},
    fetchPolicy: 'cache-and-network',
    onError: err => {
      setError('An error occurred while fetching data. Please try again.');
    },
  });

  useEffect(() => {
    if (data) {
      setRepo(data.repository);
    }
  }, [data]);

  return (
    <>
      <Header title={repoName} />
      <ScrollView style={styles.container}>
        {loading && <ActivityIndicator />}
        {error && <Text style={styles.errorText}>{error}</Text>}
        <View style={styles.repo_container}>
          <Text style={[TEXT.title, {alignSelf: 'center'}]}>{repo?.name}</Text>
          {repo?.description && (
            <Text style={TEXT.cardText}>Description: {repo?.description}</Text>
          )}
          <View style={styles.star_container}>
            <StarIcon />
            <Text style={TEXT.cardText}>: {repo?.stargazerCount}</Text>
          </View>
          <Text style={TEXT.cardText}>Owned By: {userName.__typename}</Text>
          <Text style={TEXT.cardText}>ID: {userName.login}</Text>
          <Text style={TEXT.cardText}>Name: {userName.name}</Text>
          {repo?.object?.text && (
            <ScrollView>
              {repo && <Markdown style={styles}>{repo?.object?.text}</Markdown>}
            </ScrollView>
          )}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  star_container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  repo_container: {
    borderColor: COLOR.icon_bg_clr,
    borderWidth: widthPixel(1),
    borderRadius: widthPixel(10),
    padding: pixelSizeHorizontal(16),
    gap: pixelSizeHorizontal(8),
  },

  heading1: {
    fontSize: 24,
    color: COLOR.white,
  },
  heading2: {
    fontSize: 24,
    color: COLOR.white,
  },
  heading3: {
    fontSize: 18,
    color: COLOR.bg,
  },
  heading4: {
    fontSize: 16,
    color: COLOR.white,
  },
  heading5: {
    fontSize: 13,
    color: COLOR.white,
  },
  heading6: {
    fontSize: 11,
    color: COLOR.white,
  },
  text: {
    fontSize: 14,
    color: COLOR.white,
  },
  link: {color: 'red', textDecorationLine: 'underline'},
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: COLOR.bg,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});

export default RepoScreen;
