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
  PermissionsAndroid,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';

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
import {DateSelect} from '../../../components/dateTimePicker/dateTimePicker';
import {fontFamily} from '../../../constants/fonts';
import Geolocation from 'react-native-geolocation-service';

import moment from 'moment';
const SignUp = props => {
  const refContainer = useRef();
  const [myfocus, setMyfocus] = useState('');
  const [securepassword, setSecurepassword] = useState(true);
  const passwordinputref = useRef();
  const emailinputref = useRef();
  const [softinput, setSoftinput] = useState(false);
  const [mydate, setMydate] = useState('');
  const [isVisible, setisVisible] = useState(false);
  const [checkemail, setCheckemail] = useState(false);
  const [checkpassword, setCheckpassword] = useState(false);
  const [checkusername, setCheckusername] = useState(false);
  const [emailerror, setEmailerror] = useState('');
  const [passworderror, setPassworderror] = useState('');
  const [usernameerror, setUsernameerror] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [firstchar, setFirstChar] = useState('');
  const [apiformatdate, setApiFormatDate] = useState('');
  const [mylat, setMylat] = useState();
  const [mylong, setMylong] = useState();
  let regchecknumber = /^[0-9]*$/;
  let reg = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w\w+)+$/;
  let regphone =
    /\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$/;
  console.log('MYDATE==================', mydate);
  useFocusEffect(
    React.useCallback(() => {
      setSoftinput(true);
    }, []),
  );

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    if (Platform.OS === 'ios') {
      Geolocation.requestAuthorization();
      Geolocation.setRNConfiguration({
        skipPermissionRequests: false,
        authorizationLevel: 'whenInUse',
      });
    }

    if (Platform.OS === 'android') {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
    }

    await Geolocation.getCurrentPosition(
      position => {
        console.log(position);
        setMylat(position.coords.latitude);
        setMylong(position.coords.longitude);
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
        getLocation();
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  const Validations = () => {
    if (username == '') {
      setCheckusername(true);
      setUsernameerror('Enter Username');
      return false;
    }
    if (email == '') {
      setCheckemail(true);
      setEmailerror('Enter Valid Email');
      return false;
    }

    if (regphone.test(firstchar + email) == false) {
      console.log('IN FIRST');
      if (regchecknumber.test(email)) {
        console.log(' IN NUMBER CHECK ');
        console.log(firstchar + email);
        setCheckemail(true);
        setEmailerror('Enter Valid Phone Number');
        return false;
      } else if (reg.test(email) == false) {
        setCheckemail(true);
        setEmailerror('Enter Valid Email');
        return false;
      }
    }

    if (password == '') {
      setCheckpassword(true);
      setPassworderror('Enter Valid Password');
      return false;
    }
    if (moment().diff(moment(mydate, 'DD-MM-YYYY'), 'years') < 18) {
      refContainer.current.open();
      return false;
    }
    if (mydate == '') {
      refContainer.current.open();
      return false;
    }

    if (
      checkpassword == false &&
      checkemail == false &&
      checkusername == false &&
      mydate !== '' &&
      moment().diff(moment(mydate, 'DD-MM-YYYY'), 'years') > 18
    ) {
      let signuptype;
      if (regchecknumber.test(email)) {
        signuptype = 'phoneNumber';
      } else {
        signuptype = 'email';
      }
      props.navigation.navigate('AddProfileImage', {
        username: username,
        email: email,
        password: password,
        apiformatdate: apiformatdate,
        signuptype: signuptype,
        mylat: mylat,
        mylong: mylong,
      });
    }
  };

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
          <Text style={styles.maintxt}>Create Account</Text>
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
                  myfocus == 'username' ? appColor.appColorMain : '#D7D7D7',
              },
            ]}>
            <Image
              source={appImages.user}
              resizeMode="contain"
              style={{
                width: responsiveWidth(5.5),
                height: responsiveWidth(5.5),
                // backgroundColor: 'red',
                marginLeft: responsiveWidth(5),
              }}
            />
            <TextInput
              placeholderTextColor={'#8D8D8D'}
              showSoftInputOnFocus={softinput}
              autoFocus
              value={username}
              onChangeText={text => {
                setUsername(text);
                setCheckusername(false);
              }}
              selectionColor={appColor.appColorMain}
              placeholder="Username"
              style={styles.txtinputusername}
              onFocus={() => setMyfocus('username')}
              onBlur={() => setMyfocus('')}
              onSubmitEditing={() => emailinputref.current.focus()}
              blurOnSubmit={false}
              returnKeyType={'next'}
            />
          </View>
          {checkusername ? (
            <Text style={styles.errortxt}>{usernameerror}</Text>
          ) : null}
          <View
            style={[
              styles.emailparent,
              {
                borderColor:
                  myfocus == 'email' ? appColor.appColorMain : '#D7D7D7',
                marginTop: responsiveHeight(2.8),
              },
            ]}>
            <Image
              source={appImages.email}
              resizeMode="contain"
              style={{
                width: responsiveWidth(5.5),
                height: responsiveWidth(5.5),
                // backgroundColor: 'red',
                marginLeft: responsiveWidth(5),
              }}
            />
            <Text
              style={{
                paddingLeft: responsiveWidth(3),
                color: '#080808',
                fontFamily: fontFamily.Baskerville_Old_Face,
                fontSize: responsiveFontSize(2),
              }}>
              {firstchar}
            </Text>

            <TextInput
              value={email}
              onChangeText={text => {
                setEmail(text);
                setCheckemail(false);
                if (text !== '' && regchecknumber.test(text)) {
                  setFirstChar('+');
                } else {
                  setFirstChar('');
                }
              }}
              placeholderTextColor={'#8D8D8D'}
              selectionColor={appColor.appColorMain}
              placeholder="Email Address / Phone No With CC"
              style={styles.txtinputemail}
              onFocus={() => setMyfocus('email')}
              onBlur={() => setMyfocus('')}
              keyboardType={'email-address'}
              onSubmitEditing={() => passwordinputref.current.focus()}
              blurOnSubmit={false}
              returnKeyType={'next'}
              ref={emailinputref}
            />
          </View>
          {checkemail ? (
            <Text style={styles.errortxt}>{emailerror}</Text>
          ) : null}
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
                width: responsiveWidth(5.5),
                height: responsiveWidth(5.5),
                // backgroundColor: 'red',
                marginLeft: responsiveWidth(5),
              }}
            />
            <TextInput
              value={password}
              onChangeText={text => {
                setPassword(text);
                setCheckpassword(false);
              }}
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
          {checkpassword ? (
            <Text style={styles.errortxt}>{passworderror}</Text>
          ) : null}
          <DateSelect
            getDate={date => setMydate(date)}
            getApiDate={date => setApiFormatDate(date)}
            value={mydate}
          />
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
            // marginTop: responsiveHeight(8),
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
            title={'SIGN UP'}
            onPress={() => {
              Validations();
            }}
          />
          <View style={{flexDirection: 'row', marginTop: responsiveHeight(4)}}>
            <Text style={styles.txt4}>Already Have an Account ? </Text>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => props.navigation.navigate('Login')}>
              <Text style={styles.txt4}>Login</Text>
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
      <RBSheet
        ref={refContainer}
        openDuration={250}
        animationType="fade"
        customStyles={{
          container: {
            // height: responsiveHeight(50),
            borderTopRightRadius: responsiveWidth(7),
            borderTopLeftRadius: responsiveWidth(7),
          },
        }}>
        <ScrollView
          contentContainerStyle={{
            flex: 1,
            justifyContent: 'space-between',
          }}>
          <Image
            source={appImages.alert}
            style={{
              width: responsiveWidth(18),
              height: responsiveWidth(18),
              alignSelf: 'center',
              marginTop: responsiveHeight(2.8),
            }}
          />
          <Text
            style={{
              alignSelf: 'center',
              color: appColor.appColorMain,
              fontFamily: fontFamily.Baskerville_Old_Face,
              fontSize: responsiveFontSize(2.3),
              textAlign: 'center',
              width: responsiveWidth(90),
              marginBottom: responsiveHeight(2),
            }}>
            You Should Be 18+ To Use this App
          </Text>
          <MyButton
            myStyles={{
              backgroundColor: appColor.appColorMain,
              marginBottom: responsiveHeight(2.8),
            }}
            title={'OK'}
            itsTextstyle={{
              color: '#fff',
            }}
            onPress={() => refContainer.current.close()}
          />
        </ScrollView>
      </RBSheet>
    </SafeAreaView>
  );
};

export default SignUp;

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
    marginTop: responsiveHeight(3),
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
    color: '#080808',
    fontFamily: fontFamily.Baskerville_Old_Face,
    fontSize: responsiveFontSize(2),
  },
  txtinputusername: {
    width: responsiveWidth(70),
    paddingLeft: responsiveWidth(3),
    color: '#080808',
    fontFamily: fontFamily.Baskerville_Old_Face,
    fontSize: responsiveFontSize(2),
  },
  errortxt: {
    width: responsiveWidth(83),
    alignSelf: 'center',
    color: 'red',
    fontFamily: fontFamily.Baskerville_Old_Face,
    fontSize: responsiveFontSize(2),
    marginTop: responsiveHeight(1),
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
  forgetview: {
    marginTop: responsiveHeight(2.5),
    width: responsiveWidth(85),
    alignItems: 'flex-end',
    alignSelf: 'center',
  },
  forgettxt: {
    color: '#000000',
  },
});
