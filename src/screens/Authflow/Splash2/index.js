import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import STYLES from '../../STYLES';
import {appColor, appImages} from '../../../assets/utilities';
import {SvgXml} from 'react-native-svg';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import FastImage from 'react-native-fast-image';
import MyHeart from '../../../components/MyHeart';
import {fontFamily} from '../../../constants/fonts';
const Splash2 = props => {
  return (
    <SafeAreaView style={STYLES.containerJustify}>
      <StatusBar
        hidden={false}
        backgroundColor={appColor.appColorMain}
        barStyle={'light-content'}
      />
      <MyHeart
        scaleX={1}
        type={'red'}
        myStyles={{
          left: responsiveWidth(-1),
          bottom: responsiveHeight(2.7),
        }}
      />
      <MyHeart
        type={'red'}
        myStyles={{
          right: responsiveWidth(-2.5),
          bottom: responsiveHeight(33),
        }}
      />
      <ScrollView
        contentContainerStyle={{flexGrow: 1, justifyContent: 'space-between'}}>
        <View
          style={{
            // top: responsiveHeight(-12),
            alignSelf: 'center',
            height: responsiveHeight(54),
            overflow: 'hidden',
            justifyContent: 'flex-end',
            alignItems: 'center',
            width: responsiveWidth(100),
            // transform: [{rotate: '2deg'}],
            // backgroundColor: appColor.appColorMain,
          }}>
          <MyHeart
            myStyles={{
              left: responsiveWidth(4),
              top: responsiveHeight(8),
            }}
          />
          <MyHeart
            type={'red'}
            myStyles={{
              left: responsiveWidth(-2),
              top: responsiveHeight(25),
            }}
          />
          <MyHeart
            myStyles={{
              right: responsiveWidth(10),
              top: responsiveHeight(8),
            }}
            width={responsiveWidth(4)}
            height={responsiveWidth(4)}
            shadow={false}
          />
          <MyHeart
            scaleX={1}
            myStyles={{
              left: responsiveWidth(5),
              bottom: responsiveHeight(9),
            }}
            width={responsiveWidth(3)}
            height={responsiveWidth(3)}
            shadow={false}
          />
          <Image
            source={appImages.first}
            style={{
              transform: [{rotate: '2deg'}],

              height: responsiveHeight(70),
              width: responsiveWidth(110),
              resizeMode: 'stretch',
              alignSelf: 'center',
              transform: [{rotate: '2deg'}],
              //   right: responsiveWidth(-3),
              // backgroundColor: 'blue',
            }}
          />
        </View>
        <View
          style={{
            alignSelf: 'center',
            height: responsiveHeight(55),
            alignItems: 'center',
            position: 'absolute',
            width: responsiveWidth(100),
            justifyContent: 'center',
          }}>
          <Text style={styles.headertxt}>LoviBear</Text>
        </View>
        <View
          style={{
            marginBottom: responsiveHeight(2),
            marginTop: responsiveHeight(3.2),
          }}>
          <TouchableOpacity
            style={styles.button1}
            activeOpacity={0.8}
            onPress={() => props.navigation.navigate('SignUp')}>
            <FastImage
              source={appImages.signupphone}
              resizeMode="contain"
              style={{
                width: responsiveWidth(7),
                height: responsiveWidth(7),
                marginLeft: responsiveWidth(3),
                marginRight: responsiveWidth(3),
              }}
            />
            <Text style={styles.txt1}>Signup with phone number</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={styles.button1}
            activeOpacity={0.8}
            onPress={() => props.navigation.navigate('SignUp')}>
            <FastImage
              source={appImages.facebook}
              resizeMode="contain"
              style={{
                width: responsiveWidth(7),
                height: responsiveWidth(7),
                marginLeft: responsiveWidth(3),
                marginRight: responsiveWidth(3),
              }}
            />
            <Text style={styles.txt1}>Signup with Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button2}
            activeOpacity={0.8}
            onPress={() => props.navigation.navigate('SignUp')}>
            <FastImage
              source={appImages.google}
              resizeMode="contain"
              style={{
                width: responsiveWidth(7),
                height: responsiveWidth(7),
                marginLeft: responsiveWidth(3),
                marginRight: responsiveWidth(3),
              }}
            />
            <Text style={styles.txt2}>Signup with Google</Text>
          </TouchableOpacity> */}
          <View
            style={{
              flexDirection: 'row',
              width: responsiveWidth(85),
              alignSelf: 'center',
              flexWrap: 'wrap',
              // backgroundColor: 'red',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: responsiveHeight(3.5),
            }}>
            <Text style={styles.txt4}>
              By tapping Log In, you agree with our{' '}
            </Text>
            <TouchableOpacity>
              <Text style={styles.txt5}>Terms of Service</Text>
            </TouchableOpacity>
            <Text style={styles.txt4}> and </Text>
            <TouchableOpacity>
              <Text style={styles.txt5}>Privacy Policy</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginTop: responsiveHeight(2),
              flexDirection: 'row',
              alignSelf: 'center',
            }}>
            <Text style={[styles.txt4]}>Already Have an Account ?</Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Login')}>
              <Text
                style={{
                  color: '#000000',
                  fontSize: responsiveFontSize(1.8),

                  fontFamily: fontFamily.Baskerville_Old_Face,
                }}>
                {' '}
                Login Now
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Splash2;

const styles = StyleSheet.create({
  txt1: {
    color: '#fff',
    fontSize: responsiveFontSize(2.35),
    fontFamily: fontFamily.Baskerville_Old_Face,
  },
  button1: {
    backgroundColor: '#0093FF',
    width: responsiveWidth(80),
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    // paddingHorizontal: responsiveWidth(1),
    paddingVertical: responsiveHeight(1.4),
    borderRadius: responsiveWidth(100),
    marginBottom: responsiveHeight(8),
    overflow: 'hidden',
  },
  txt2: {
    color: '#909090',
    fontSize: responsiveFontSize(2.35),

    fontFamily: fontFamily.Baskerville_Old_Face,
  },
  button2: {
    borderColor: '#0093FF',
    width: responsiveWidth(80),
    overflow: 'hidden',

    flexDirection: 'row',

    alignItems: 'center',
    alignSelf: 'center',
    // paddingHorizontal: responsiveWidth(1),
    paddingVertical: responsiveHeight(1.4),
    borderRadius: responsiveWidth(100),
    marginBottom: responsiveHeight(2),
    borderWidth: responsiveWidth(0.2),
  },

  txt4: {
    fontSize: responsiveFontSize(1.8),
    textAlign: 'center',
    color: '#000000',
    fontFamily: fontFamily.Baskerville_Old_Face,
  },
  txt5: {
    fontSize: responsiveFontSize(1.8),
    color: '#000000',
    textDecorationLine: 'underline',
    textAlign: 'center',
    fontFamily: fontFamily.Baskerville_Old_Face,
  },
  headertxt: {
    fontSize: responsiveFontSize(6),
    color: '#fff',
    fontFamily: fontFamily.Baskerville_Old_Face,
  },
});
