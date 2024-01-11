import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {gql} from '@apollo/client';
import GithubIcon from '../assets/images/github.svg';
import FollowIcon from '../assets/images/follow.svg';
import {COLOR, TEXT} from '../styles/GlobalStyles';
import Ratio from '../styles/Ratio';
import _ from 'lodash';
import {client} from '../context/AppoloClient';
import SCREENS from '../libs/SCREENS';
const {widthPixel, pixelSizeHorizontal} = Ratio;

const debouncedHandleFetchData = _.debounce(async function (
  query,
  setLoading,
  setError,
  FETCH_USER_DATA,
  setUserData,
) {
  try {
    setLoading(true);
    setError(null);

    const result = await client.query({
      query: FETCH_USER_DATA,
      variables: {username: `user:${query}`},
    });

    if (result.data.search.edges[0]?.node) {
      setUserData(result.data.search.edges[0].node);
    }
    if (!result.data.search.edges[0]?.node.login) {
      setError('No search results found');
      setUserData(null);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    setError('An error occurred while fetching data');
    setUserData(null);
  } finally {
    setLoading(false);
  }
},
500);

const HomeScreen = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const FETCH_USER_DATA = gql`
    query SearchUser($username: String!) {
      search(query: $username, type: USER, first: 10) {
        edges {
          node {
            ... on User {
              login
              name
              company
              bio
              avatarUrl
              followers {
                totalCount
              }
              following {
                totalCount
              }
              repositories(first: 50) {
                totalCount
                edges {
                  node {
                    name
                    description
                    stargazerCount
                    owner {
                      ... on User {
                        login
                        name
                      }
                      ... on Organization {
                        login
                        name
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  useEffect(() => {
    debouncedHandleFetchData(
      searchQuery,
      setLoading,
      setError,
      FETCH_USER_DATA,
      setUserData,
    );
    if (!searchQuery) {
      setUserData(null);
    }
  }, [searchQuery]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="rgba(0,0,0,0)" />
      <View style={styles.header_container}>
        <GithubIcon />
      </View>
      <Text style={TEXT.heading}>GitHub User Data</Text>
      <TextInput
        placeholder="Enter GitHub username"
        style={styles.input}
        placeholderTextColor={COLOR.white}
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
      />

      {loading && <ActivityIndicator />}
      {error && searchQuery && <Text style={styles.errorText}>{error}</Text>}

      {/* Render data when available */}
      {userData?.login && (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(SCREENS.USER_INFO, {
              userData: userData,
            })
          }
          style={styles.userInfo_sContainer}>
          <View style={styles.userInfo_container}>
            <Image
              style={styles.image}
              source={{uri: `${userData.avatarUrl}`}}
            />
            <View>
              <Text style={[TEXT.title]}>{userData.name}</Text>
              <Text style={TEXT.cardText}>@{userData.login}</Text>
              <Text style={[TEXT.cardText, {width: widthPixel(200)}]}>
                {userData.bio}
              </Text>
            </View>
          </View>
          <View style={styles.userInfo_follow_container}>
            <FollowIcon />
            <Text style={TEXT.cardText}>
              Followers: {userData.followers.totalCount}
            </Text>
            <Text style={TEXT.cardText}>
              Following: {userData.following.totalCount}
            </Text>
          </View>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: widthPixel(60),
    height: pixelSizeHorizontal(60),
    borderRadius: widthPixel(60),
  },
  userInfo_follow_container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: pixelSizeHorizontal(15),
    marginTop: pixelSizeHorizontal(15),
  },
  userInfo_container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: pixelSizeHorizontal(15),
  },
  userInfo_sContainer: {
    backgroundColor: COLOR.black,
    padding: pixelSizeHorizontal(30),
    borderRadius: pixelSizeHorizontal(20),
    borderWidth: pixelSizeHorizontal(1),
    borderColor: COLOR.icon_bg_clr,
  },
  container: {
    paddingHorizontal: pixelSizeHorizontal(16),
    paddingVertical: pixelSizeHorizontal(16),
    backgroundColor: COLOR.bg,
    flex: 1,
  },
  header_container: {
    marginVertical: pixelSizeHorizontal(16),
    alignItems: 'center',
  },
  input: {
    marginTop: pixelSizeHorizontal(16),
    padding: pixelSizeHorizontal(8),
    borderWidth: widthPixel(1),
    backgroundColor: COLOR.icon_bg_clr,
    borderRadius: pixelSizeHorizontal(8),
    marginBottom: pixelSizeHorizontal(10),
    color: COLOR.white,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});

export default HomeScreen;
