import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import Right from 'react-native-vector-icons/FontAwesome';
import FastImage from 'react-native-fast-image';
import STYLES from '../../STYLES';
import {appColor, appImages} from '../../../assets/utilities';
import {
  responsiveWidth,
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import ImageView from 'react-native-image-viewing';
import Dialog from 'react-native-dialog';
import Carousel from 'react-native-snap-carousel';
import {fontFamily} from '../../../constants/fonts';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useFocusEffect} from '@react-navigation/native';
import EyeIcon from 'react-native-vector-icons/Ionicons';
import {DateSelect} from '../../../components/dateTimePicker/dateTimePicker';

import {MyButton} from '../../../components/MyButton';
import {MyButton2} from '../../../components/MyButton2';
const EditProfile = props => {
  const [myfocus, setMyfocus] = useState('');
  const [securepassword, setSecurepassword] = useState(true);
  const passwordinputref = useRef();
  const emailinputref = useRef();
  const [softinput, setSoftinput] = useState(false);
  const [mydate, setMydate] = useState('');
  useFocusEffect(
    React.useCallback(() => {
      setSoftinput(true);
    }, []),
  );
  const [myimage, setMyimage] = useState('');
  const imageTakeFromGallery = () => {
    ImagePicker.openPicker({
      cropping: true,
      compressImageQuality: 1,
    }).then(image => {
      console.log(image.path);
      setMyimage(image.path);
    });
  };
  const images = [myimage == '' ? appImages.userimage : {uri: myimage}];
  const imageTakeFromCamera = () => {
    ImagePicker.openCamera({
      cropping: true,
      compressImageQuality: 1,
    }).then(image => {
      console.log(image.path);
      setMyimage(image.path);
    });
  };

  const [visible, setVisible] = useState(false);
  const showDialog = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };
  const [imagevisible, setImagevisible] = useState(false);

  return (
    <SafeAreaView style={STYLES.container}>
      <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />
      <ScrollView
        keyboardShouldPersistTaps={'always'}
        contentContainerStyle={STYLES.scrollviewJustify}>
        <View style={STYLES.subcontainer}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: responsiveHeight(1),
              width: responsiveWidth(90),
              alignSelf: 'center',
              // justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => props.navigation.goBack()}
              style={{
                paddingLeft: responsiveWidth(2),
                marginLeft: responsiveWidth(-2),
                paddingRight: responsiveWidth(2),
                paddingVertical: responsiveHeight(1.5),
                marginVertical: responsiveHeight(0.5),
                //   marginTop: responsiveHeight(2),
              }}>
              <Image
                source={appImages.backicon2}
                resizeMode="contain"
                style={{
                  width: responsiveWidth(5),
                  height: responsiveWidth(5),
                }}
              />
            </TouchableOpacity>
            <Text style={styles.txt1}>Edit Profile</Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => setImagevisible(true)}
            style={{
              width: responsiveWidth(47),
              height: responsiveWidth(47),
              alignSelf: 'center',
              marginTop: responsiveHeight(3),
            }}>
            <View
              style={{
                borderRadius: responsiveWidth(9.5),
                overflow: 'hidden',
                alignSelf: 'center',
                width: responsiveWidth(47),
                height: responsiveWidth(47),
              }}>
              <Image
                source={myimage == '' ? appImages.userimage : {uri: myimage}}
                style={{
                  width: responsiveWidth(47),
                  height: responsiveWidth(47),
                  resizeMode: 'cover',
                }}
              />
            </View>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => showDialog()}
              style={{
                position: 'absolute',
                bottom: responsiveWidth(-4),
                right: responsiveWidth(-4),
              }}>
              <Image
                source={appImages.imagepicker}
                resizeMode={'contain'}
                style={{
                  width: responsiveWidth(13),
                  height: responsiveWidth(13),
                }}
              />
            </TouchableOpacity>
          </TouchableOpacity>
          <View style={{marginTop: responsiveHeight(1.5)}}>
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
                placeholder="Username"
                style={styles.txtinputemail}
                onFocus={() => setMyfocus('username')}
                onBlur={() => setMyfocus('')}
                onSubmitEditing={() => emailinputref.current.focus()}
                blurOnSubmit={false}
                returnKeyType={'next'}
              />
            </View>
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
                  width: responsiveWidth(6.5),
                  height: responsiveWidth(6.5),
                  // backgroundColor: 'red',
                  marginLeft: responsiveWidth(5),
                }}
              />
              <TextInput
                placeholderTextColor={'#8D8D8D'}
                selectionColor={appColor.appColorMain}
                placeholder="Email Address / Phone No"
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
            <DateSelect getDate={date => setMydate(date)} value={mydate} />
          </View>
        </View>
        <MyButton
          // onPress={() => props.navigation.navigate('Auth', {screen: 'Login'})}
          myStyles={{
            width: responsiveWidth(80),
            backgroundColor: appColor.appColorMain,
            marginBottom: responsiveHeight(4),

            marginTop: responsiveHeight(4),
            height: responsiveHeight(7),
          }}
          title={'Update'}
          itsTextstyle={{
            color: '#fff',
          }}
        />
        <Dialog.Container
          visible={visible}
          verticalButtons={true}
          onRequestClose={() => handleCancel()}>
          <Dialog.Title
            style={{
              fontFamily: fontFamily.Touche_Bold,
              alignSelf: 'center',
              color: '#080808',
            }}>
            Upload Photos Or Videos
          </Dialog.Title>
          {/* <Dialog.Description>
            Take a photo or choose from your library
          </Dialog.Description> */}
          <Dialog.Button
            style={{
              fontFamily: fontFamily.Touche_SemiBold,
              alignSelf: 'center',
            }}
            label="Take a Photo"
            onPress={() => {
              imageTakeFromCamera();
              handleCancel();
            }}
            color={appColor.appColorMain}
          />
          <Dialog.Button
            style={{
              fontFamily: fontFamily.Touche_SemiBold,
              alignSelf: 'center',
            }}
            label="Choose from Gallery"
            onPress={() => {
              imageTakeFromGallery();
              handleCancel();
            }}
            color={appColor.appColorMain}
          />
          <Dialog.Button
            style={{
              fontFamily: fontFamily.Touche_SemiBold,

              alignSelf: 'center',
            }}
            label="Cancel"
            onPress={handleCancel}
            color={appColor.appColorMain}
          />
        </Dialog.Container>
        <ImageView
          images={images}
          imageIndex={0}
          visible={imagevisible}
          onRequestClose={() => setImagevisible(false)}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  txt1: {
    fontFamily: fontFamily.Touche_SemiBold,
    color: appColor.appColorMain,
    fontSize: responsiveFontSize(3.5),
    marginLeft: responsiveWidth(2),
  },
  selectcategorytxt: {
    color: '#080808',
    fontFamily: fontFamily.Touche_Bold,
    fontSize: responsiveFontSize(3.2),
  },
  sicon2: {
    width: responsiveWidth(5.5),
    height: responsiveWidth(5.5),
  },
  maintxt: {
    color: appColor.appColorMain,
    fontSize: responsiveFontSize(3.5),
    alignSelf: 'center',
    fontFamily: fontFamily.Touche_Bold,
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
    paddingLeft: responsiveWidth(3),
    color: '#080808',
    fontFamily: fontFamily.Touche_Regular,
    fontSize: responsiveFontSize(1.95),
  },
  txtinputpassword: {
    width: responsiveWidth(59.5),
    paddingLeft: responsiveWidth(3),
    color: '#080808',
    fontFamily: fontFamily.Touche_Regular,
    fontSize: responsiveFontSize(1.95),
  },
});
