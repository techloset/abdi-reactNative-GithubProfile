import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import {COLOR, TEXT} from '../styles/GlobalStyles';
import Ratio from '../styles/Ratio';
import Header from '../components/Header';
import FollowIcon from '../assets/images/follow.svg';
import Markdown, {MarkdownIt} from 'react-native-markdown-display';

const {widthPixel, fontPixel, pixelSizeHorizontal} = Ratio;

const UserScreen = ({navigation, route}) => {
  const {userData} = route.params;

  return (
    <>
      <Header title={userData.name} />
      <SafeAreaView style={styles.container}>
        <Text style={TEXT.heading}>GitHub User Data</Text>
        <ScrollView>
          <View style={styles.userInfo_sContainer}>
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
          </View>

          {/* repos */}
          <Text style={styles.sectionHeader}>Repositories:</Text>
          {userData.repositories.edges.map((repo, index) => (
            <TouchableOpacity
              key={index}
              style={styles.repository}
              onPress={() =>
                navigation.navigate('Repo', {
                  userName: repo.node.owner,
                  repoName: repo.node.name,
                })
              }>
              <Text style={styles.text}>Name: {repo.node.name}</Text>
              <Text style={styles.text}>
                Description: {repo.node.description}
              </Text>
              <Text style={styles.text}>Stars: {repo.node.stargazerCount}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default UserScreen;

const styles = StyleSheet.create({
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
  },
  container: {
    paddingHorizontal: pixelSizeHorizontal(16),
    paddingVertical: pixelSizeHorizontal(16),
    backgroundColor: COLOR.bg,
    flex: 1,
  },
  text: {
    fontSize: 16,
    color: COLOR.white,
    marginBottom: 8,
  },
  sectionHeader: {
    fontSize: fontPixel(20),
    fontWeight: 'bold',
    marginTop: pixelSizeHorizontal(16),
    marginBottom: pixelSizeHorizontal(8),
    color: COLOR.white,
  },
  repository: {
    marginVertical: 8,
    borderRadius: pixelSizeHorizontal(10),
    borderWidth: widthPixel(1),
    borderColor: COLOR.icon_bg_clr,
    padding: pixelSizeHorizontal(16),
  },
  readme_conatiner: {
    backgroundColor: COLOR.white,
    paddingVertical: pixelSizeHorizontal(8),
    paddingHorizontal: pixelSizeHorizontal(16),
    marginTop: pixelSizeHorizontal(8),
    marginBottom: pixelSizeHorizontal(16),
    borderRadius: widthPixel(10),
    height: widthPixel(200),
    overflow: 'scroll',
  },
  readme_conatiner1: {
    backgroundColor: COLOR.white,
    paddingVertical: pixelSizeHorizontal(8),
    paddingHorizontal: pixelSizeHorizontal(16),
    marginTop: pixelSizeHorizontal(8),
    marginBottom: pixelSizeHorizontal(16),
    borderRadius: widthPixel(10),
    height: 'auto',
    overflow: 'scroll',
  },
});
