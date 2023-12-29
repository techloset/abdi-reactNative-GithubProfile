import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import BackIcon from '../assets/images/back.svg';
import GithubIcon from '../assets/images/github.svg';
import {COLOR, TEXT} from '../styles/GlobalStyles';
import {useNavigation} from '@react-navigation/native';
import Ratio from '../styles/Ratio';
const {widthPixel, fontPixel, pixelSizeHorizontal} = Ratio;

const Header = ({title}) => {
  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={goBack}>
        <BackIcon />
      </Pressable>
      <Text style={TEXT.heading_2}>{title}</Text>
      <Pressable onPress={() => navigation.navigate('Home')}>
        <GithubIcon />
      </Pressable>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: COLOR.black,
    paddingTop: pixelSizeHorizontal(30),
  },
  icon: {
    width: 24,
    height: 24,
  },
});
