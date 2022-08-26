import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import STYLES from '../../STYLES';
import {appColor, appImages} from '../../../assets/utilities';
import {SvgXml} from 'react-native-svg';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import EyeIcon from 'react-native-vector-icons/Ionicons';
import MyHeart from '../../../components/MyHeart';
import {useFocusEffect} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {MyButton} from '../../../components/MyButton';
import {fontFamily} from '../../../constants/fonts';
const Login = props => {
  const [myfocus, setMyfocus] = useState('');
  const [securepassword, setSecurepassword] = useState(true);
  const passwordinputref = useRef();
  const emailinputref = useRef();
  const [softinput, setSoftinput] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setSoftinput(true);
    }, []),
  );
  return (
    <SafeAreaView style={STYLES.container}>
      <StatusBar
        hidden={false}
        backgroundColor={appColor.appColorMain}
        barStyle={'light-content'}
      />
      <ScrollView
        keyboardShouldPersistTaps={'always'}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1, justifyContent: 'space-between'}}>
        <View>
          <View
            style={{
              height: responsiveHeight(22),
              overflow: 'hidden',
              justifyContent: 'flex-end',

              // alignSelf: 'center',
            }}>
            <Image
              source={appImages.first}
              style={{
                transform: [{rotate: '2deg'}],

                width: responsiveWidth(110),
                height: responsiveHeight(70),

                resizeMode: 'stretch',
                alignSelf: 'center',

                //   backgroundColor: 'red',
                //   top: responsiveHeight(-50),
              }}
            />
          </View>
          <Text style={styles.maintxt}>LOGIN</Text>
          <MyHeart
            myStyles={{
              left: responsiveWidth(-3.6),
              top: responsiveHeight(24),
            }}
            type={'red'}
            // scaleX={1}
          />
          <MyHeart
            myStyles={{
              right: responsiveWidth(-2.5),
              bottom: responsiveHeight(-7),
            }}
            type={'red'}
            // scaleX={1}
          />
          <View
            style={[
              styles.emailparent,
              {
                borderColor:
                  myfocus == 'email' ? appColor.appColorMain : '#D7D7D7',
              },
            ]}>
            <Image
              source={appImages.email}
              resizeMode="contain"
              style={{
                width: responsiveWidth(6.5),
                height: responsiveWidth(6.5),
                // backgroundColor: 'red',
                marginLeft: responsiveWidth(5),
              }}
            />
            <TextInput
              placeholderTextColor={'#8D8D8D'}
              showSoftInputOnFocus={softinput}
              autoFocus
              selectionColor={appColor.appColorMain}
              placeholder="Email Address / Phone No"
              style={styles.txtinputemail}
              onFocus={() => setMyfocus('email')}
              onBlur={() => setMyfocus('')}
              keyboardType={'email-address'}
              onSubmitEditing={() => passwordinputref.current.focus()}
              blurOnSubmit={false}
              returnKeyType={'next'}
            />
          </View>
          <View
            style={[
              styles.passwordparent,
              {
                borderColor:
                  myfocus == 'password' ? appColor.appColorMain : '#D7D7D7',
              },
            ]}>
            <Image
              source={appImages.password}
              resizeMode="contain"
              style={{
                width: responsiveWidth(6.5),
                height: responsiveWidth(6.5),
                // backgroundColor: 'red',
                marginLeft: responsiveWidth(5),
              }}
            />
            <TextInput
              placeholderTextColor={'#8D8D8D'}
              selectionColor={appColor.appColorMain}
              placeholder="Password"
              style={styles.txtinputpassword}
              onFocus={() => setMyfocus('password')}
              onBlur={() => setMyfocus('')}
              secureTextEntry={securepassword}
              ref={passwordinputref}
            />
            <EyeIcon
              style={{fontSize: responsiveFontSize(3.7), color: 'lightgray'}}
              name={securepassword ? 'eye-off' : 'eye'}
              onPress={() => setSecurepassword(!securepassword)}
            />
          </View>
          <TouchableOpacity
            style={styles.forgetview}
            activeOpacity={0.6}
            onPress={() => props.navigation.navigate('ForgotPassword')}>
            <Text style={styles.forgettxt}>Forgot Password?{'  '}</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            position: 'absolute',
            //   top: responsiveHeight(1),
            alignSelf: 'center',
            height: responsiveHeight(17),
            alignItems: 'center',
            // backgroundColor: 'blue',
            justifyContent: 'center',
            width: responsiveWidth(100),
          }}>
          <Text style={styles.headertxt}>LoviBear</Text>
          <MyHeart
            myStyles={{
              left: responsiveWidth(4.5),
              bottom: responsiveHeight(4.5),
            }}
          />
          <MyHeart
            myStyles={{
              right: responsiveWidth(7),
              top: responsiveHeight(4.5),
            }}
            width={responsiveWidth(5)}
            height={responsiveWidth(5)}
            shadow={false}
          />
        </View>
        <View
          style={{
            height: responsiveHeight(28),
            overflow: 'hidden',
            marginTop: responsiveHeight(8),
            // justifyContent: 'flex-end',
            // alignSelf: 'flex-end',
          }}>
          <Image
            source={appImages.second}
            style={{
              width: responsiveWidth(107),
              height: responsiveHeight(85),
              resizeMode: 'stretch',
              //   backgroundColor: 'red',
              //   top: responsiveHeight(-50),
            }}
          />
        </View>
        <View
          style={{
            height: responsiveHeight(20),
            position: 'absolute',

            width: responsiveWidth(100),
            bottom: responsiveWidth(0.001),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <MyButton
            title={'LOGIN'}
            onPress={() =>
              props.navigation.navigate('App', {screen: 'PlayScreenScreens'})
            }
          />
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              alignItems: 'center',
              // justifyContent: 'center',
              marginTop: responsiveHeight(4),
            }}>
            <Text style={styles.txt4}>Don't have an account ? </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => props.navigation.navigate('SignUp')}>
              <Text style={styles.txt4}>Sign up</Text>
            </TouchableOpacity>
          </View>
          <MyHeart
            myStyles={{
              right: responsiveWidth(2),
              top: responsiveHeight(1),
            }}
            width={responsiveWidth(13)}
            height={responsiveWidth(13)}
            scaleX={1}
          />
          <MyHeart
            myStyles={{
              left: responsiveWidth(7),
              bottom: responsiveHeight(6),
            }}
            width={responsiveWidth(3.5)}
            height={responsiveWidth(3.5)}
            scaleX={1}
            shadow={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  txt4: {
    textAlign: 'center',
    color: '#fff',
    fontFamily: fontFamily.Baskerville_Old_Face,
    fontSize: responsiveFontSize(1.8),
  },
  headertxt: {
    fontSize: responsiveFontSize(4.5),
    color: '#fff',
    fontFamily: fontFamily.Baskerville_Old_Face,
  },
  maintxt: {
    color: appColor.appColorMain,
    fontSize: responsiveFontSize(3.2),

    alignSelf: 'center',
    fontFamily: fontFamily.Baskerville_Old_Face,
    marginTop: responsiveHeight(-0.8),
  },
  emailparent: {
    borderRadius: responsiveWidth(3),
    borderWidth: responsiveWidth(0.3),
    borderColor: '#D7D7D7',
    marginTop: responsiveHeight(5),
    paddingVertical: responsiveHeight(0.9),
    width: responsiveWidth(85),
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordparent: {
    borderRadius: responsiveWidth(3),
    borderWidth: responsiveWidth(0.3),
    borderColor: '#D7D7D7',
    marginTop: responsiveHeight(2),
    paddingVertical: responsiveHeight(0.9),
    flexDirection: 'row',
    alignItems: 'center',
    width: responsiveWidth(85),
    alignSelf: 'center',
  },
  txtinputemail: {
    width: responsiveWidth(70),
    paddingLeft: responsiveWidth(3),
    color: '#080808',
    fontFamily: fontFamily.Baskerville_Old_Face,
    fontSize: responsiveFontSize(2),
  },
  txtinputpassword: {
    width: responsiveWidth(59.5),
    paddingLeft: responsiveWidth(3),
    color: '#080808',
    fontFamily: fontFamily.Baskerville_Old_Face,
    fontSize: responsiveFontSize(2),
  },
  forgetview: {
    marginTop: responsiveHeight(2.5),
    width: responsiveWidth(85),
    alignItems: 'flex-end',
    alignSelf: 'center',
  },
  forgettxt: {
    color: '#000000',
    fontFamily: fontFamily.Baskerville_Old_Face,
    fontSize: responsiveFontSize(1.8),
  },
});
