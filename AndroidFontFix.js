import React from 'react';
import { Platform, StyleSheet, Text } from 'react-native';
import * as Device from 'expo-device';

export function enableAndroidFontFix() {
  if (Platform.OS !== 'android') {
    return;
  }

  let manufacturer = Device.manufacturer;
  console.log(manufacturer);

  let styles;

  switch (manufacturer) {
    case 'OnePlus':
      styles = StyleSheet.create({
        androidFontFixFontFamily: {
          fontFamily: 'Slate',
          // fontFamily: 'Roboto',
        },
      });
      break;

    case 'motorola':
      styles = StyleSheet.create({
        androidFontFixFontFamily: {
          // fontFamily: 'Oppo Sans', // not sure of the name of the font
          fontFamily: 'Roboto',
        },
      });
      break;

    case 'LG': // https://github.com/facebook/react-native/issues/15114#issuecomment-366066157
      styles = StyleSheet.create({
        androidFontFixFontFamily: {
          // We don't know the default fontFamily for the LG platform
          fontFamily: 'Roboto',
        },
      });
      break;

    default:
      return;
  }

  let __render = Text.render;
  Text.render = function (...args) {
    let origin = __render.call(this, ...args);
    return React.cloneElement(origin, {
      style: [styles.androidFontFixFontFamily, origin.props.style],
    });
  };
}
