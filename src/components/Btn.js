import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import ratio from '../styles/Ratio';
import {COLOR, FONT_FAMILY} from '../styles/GlobalStyles';

const {widthPixel, fontPixel, pixelSizeHorizontal} = ratio;

const Btn = ({text, btnColor, color, onPress, disabled}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.btn,
        {
          backgroundColor: btnColor,
        },
      ]}>
      <Text style={[styles.btnText, {color: color}]}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Btn;

const styles = StyleSheet.create({
  btnText: {
    fontSize: fontPixel(16),
    fontFamily: FONT_FAMILY.montserratMedium,
  },
  btn: {
    width: widthPixel(150),
    height: widthPixel(35),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: widthPixel(26),
    borderColor: COLOR.green,
    borderWidth: widthPixel(1),
    alignSelf: 'center',
  },
});
