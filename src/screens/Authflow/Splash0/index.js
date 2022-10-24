import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
} from 'react-native';
import React from 'react';
import STYLES from '../../STYLES';
import {appImages} from '../../../assets/utilities';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect} from 'react';
import MyHeart from '../../../components/MyHeart';

const Splash0 = ({navigation}) => {
  useEffect(() => {
    Checking();
  }, []);

  const Checking = async () => {
    const userid = await AsyncStorage.getItem('userid');
    const signuptype = await AsyncStorage.getItem('signuptype');
    const password = await AsyncStorage.getItem('password');
    console.log(
      'USER INFORMATION ON SPLASH SCREEN',
      '\n\n\n' + userid + '\n' + signuptype + '\n' + password,
    );
    if (userid !== null) {
      setTimeout(() => {
        navigation.navigate('CheckUserImage');
      }, 1500);
    } else {
      setTimeout(() => {
        navigation.navigate('Splash');
      }, 1500);
    }
  };

  return (
    <SafeAreaView
      style={[
        STYLES.container,
        {alignItems: 'center', justifyContent: 'center'},
      ]}>
      <MyHeart
        type={'red'}
        myStyles={{
          top: responsiveHeight(12),
          left: responsiveWidth(4),
        }}
      />
      <MyHeart
        type={'red'}
        myStyles={{
          top: responsiveHeight(10),
          right: responsiveWidth(-4.7),
        }}
        shadow={false}
      />
      <MyHeart
        type={'red'}
        myStyles={{
          top: responsiveHeight(30),
          left: responsiveWidth(-3),
        }}
      />
      <MyHeart
        type={'red'}
        scaleX={1}
        shadow={false}
        myStyles={{
          top: responsiveHeight(50),
          left: responsiveWidth(4),
        }}
        width={responsiveWidth(4)}
        height={responsiveWidth(4)}
      />
      <MyHeart
        type={'red'}
        // scaleX={1}
        myStyles={{
          bottom: responsiveHeight(5),
          left: responsiveWidth(-1.4),
        }}
        shadow={false}
        width={responsiveWidth(4)}
        height={responsiveWidth(4)}
      />
      <MyHeart
        type={'red'}
        scaleX={1}
        myStyles={{
          bottom: responsiveHeight(3),
          right: responsiveWidth(-6),
        }}
        width={responsiveWidth(13)}
        height={responsiveWidth(13)}
      />
      <StatusBar hidden={true} />
      <Image
        source={appImages.splashicon}
        style={{
          width: responsiveWidth(20),
          height: responsiveWidth(20),
          resizeMode: 'contain',
        }}
      />
    </SafeAreaView>
  );
};

export default Splash0;

const styles = StyleSheet.create({});
