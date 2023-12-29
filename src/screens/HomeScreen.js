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
import {useQuery, gql} from '@apollo/client';
import GithubIcon from '../assets/images/github.svg';
import FollowIcon from '../assets/images/follow.svg';
import {COLOR, TEXT} from '../styles/GlobalStyles';
import Ratio from '../styles/Ratio';
import {client} from '../context/AppoloClient';
import Btn from '../components/Btn';

const {widthPixel, pixelSizeHorizontal} = Ratio;

const HomeScreen = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [userData, setUserData] = useState(null);
  const [userError, setUserError] = useState(null);

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
                    object(expression: "main:README.md") {
                      ... on Blob {
                        text
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

  const {loading, error, data} = useQuery(FETCH_USER_DATA, {
    variables: {username: `user:${searchQuery}`},
    skip: true,
  });

  // Update the state with the fetched data when data changes
  useEffect(() => {
    if (data) {
      setUserData(data.search.edges[0]?.node);
    }
    if (!data) {
      setUserData(null);
    }
  }, [data]);

  const handleFetchData = async () => {
    try {
      // Clear the previous error
      setUserError(null);

      const result = await client.query({
        query: FETCH_USER_DATA,
        variables: {username: `user:${searchQuery}`},
      });

      if (result.data.search.edges[0]?.node) {
        setUserData(result.data.search.edges[0].node);
      } else {
        setUserError('No search results found');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setUserError('An error occurred while fetching data');
      setUserData(null);
    }
  };

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
      {userError && <Text style={styles.errorText}>{userError}</Text>}

      <Btn
        onPress={handleFetchData}
        text="Fetch User Data"
        disabled={loading}
        color={COLOR.white}
        btnColor={COLOR.blue}
      />

      {/* Render data when available */}
      {userData && (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('User', {
              userData: userData,
            })
          }
          style={styles.userInfo_sContainer}>
          <View style={styles.userInfo_container}>
            <Image
              style={styles.image}
              source={{uri: `${userData.avatarUrl}`}}
            />
            <View style={styles.userInfo_Text_container}>
              <Text style={TEXT.title}>Name: {userData.name}</Text>
              <Text style={TEXT.title}>Username: {userData.login}</Text>
              <Text style={TEXT.title}>{userData.bio}</Text>
            </View>
          </View>
          <View style={styles.userInfo_follow_container}>
            <FollowIcon />
            <Text style={TEXT.title}>
              Followers: {userData.followers.totalCount}
            </Text>
            <Text style={TEXT.title}>
              Following: {userData.following.totalCount}
            </Text>
          </View>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: pixelSizeHorizontal(10),
    padding: pixelSizeHorizontal(8),
    backgroundColor: COLOR.primary,
    borderRadius: pixelSizeHorizontal(8),
    color: COLOR.white,
    textAlign: 'center',
  },
  image: {
    width: widthPixel(50),
    height: pixelSizeHorizontal(50),
    borderRadius: widthPixel(50),
  },
  userInfo_Text_container: {
    width: '50%',
  },
  userInfo_follow_container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: pixelSizeHorizontal(15),
    marginTop: pixelSizeHorizontal(15),
  },
  userInfo_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfo_sContainer: {
    backgroundColor: COLOR.black,
    padding: pixelSizeHorizontal(30),
    borderRadius: pixelSizeHorizontal(20),
    borderWidth: pixelSizeHorizontal(1),
    borderColor: COLOR.icon_bg_clr,
    marginBottom: pixelSizeHorizontal(10),
    marginTop: pixelSizeHorizontal(10),
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
