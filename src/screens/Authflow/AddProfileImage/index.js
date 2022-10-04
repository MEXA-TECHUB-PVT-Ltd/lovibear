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
import ImageView from 'react-native-image-viewing';
import Dialog from 'react-native-dialog';
import ImagePicker from 'react-native-image-crop-picker';

import React, {useEffect, useRef, useState} from 'react';
import STYLES from '../../STYLES';
import {appColor, appImages} from '../../../assets/utilities';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import MyHeart from '../../../components/MyHeart';
import {useFocusEffect} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {MyButton, MyButtonLoader} from '../../../components/MyButton';
import {fontFamily} from '../../../constants/fonts';
import {Base_URL} from '../../../Base_URL';

const AddProfileImage = ({route, navigation}) => {
  const [pfplink, setPfpLink] = useState('');
  const [myimage, setMyimage] = useState('');
  const {username, email, password, apiformatdate, signuptype, mylat, mylong} =
    route.params;
  console.log(username, email, password, apiformatdate, signuptype);
  const [selectedImage, setSelectedImage] = useState();
  const [loading, setLoading] = useState(false);
  const imageTakeFromGallery = () => {
    ImagePicker.openPicker({
      cropping: false,
      // compressImageQuality: 1,
    }).then(image => {
      console.log(image);
      setMyimage(image.path);
      const filename = image.path.substring(image.path.lastIndexOf('/') + 1);
      setSelectedImage({
        uri: image.path,
        type: image.mime,
        name: filename,
      });
    });
  };

  const images = [myimage == '' ? appImages.userimage : {uri: myimage}];
  const imageTakeFromCamera = () => {
    ImagePicker.openCamera({
      cropping: false,
    }).then(image => {
      console.log(image.path);
      setMyimage(image.path);
      const filename = image.path.substring(image.path.lastIndexOf('/') + 1);
      setSelectedImage({
        uri: image.path,
        type: image.mime,
        name: filename,
      });
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

  const UploadToCloudinary = image => {
    if (myimage !== '') {
      setLoading(true);

      const data = new FormData();
      data.append('file', selectedImage);
      data.append('upload_preset', 'lovibearApp');
      data.append('cloud_name', 'dzyxgcils');

      fetch('https://api.cloudinary.com/v1_1/dzyxgcils/image/upload', {
        method: 'post',
        body: data,
      })
        .then(res => res.json())
        .then(data => {
          console.log('THE DATA===========', data);
          SignUpApi(data.url);
        });
    }
  };
  const SignUpApi = async image => {
    var axios = require('axios');
    if (signuptype == 'phoneNumber') {
      var data = JSON.stringify({
        userName: username,
        password: password,
        phoneNumber: '+' + email,
        signupType: signuptype,
        dateOfBirth: apiformatdate,
        profileImage: image,
        location: {
          coordinates: [mylong, mylat],
        },
      });
    } else {
      var data = JSON.stringify({
        userName: username,
        password: password,
        signupType: signuptype,
        dateOfBirth: apiformatdate,
        profileImage: image,
        email: email,
        location: {
          coordinates: [mylong, mylat],
        },
      });
    }

    var config = {
      method: 'post',
      url: Base_URL + '/user/register',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    await axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error.response.data);
        setLoading(false);
      });
  };
  return (
    <SafeAreaView style={STYLES.containerJustify}>
      <StatusBar
        hidden={false}
        backgroundColor={'#fff'}
        barStyle={'dark-content'}
      />
      <MyHeart
        type={'red'}
        myStyles={{
          top: responsiveHeight(8),
          left: responsiveWidth(4),
        }}
      />
      <MyHeart
        type={'red'}
        myStyles={{
          top: responsiveHeight(2),
          right: responsiveWidth(10),
        }}
        shadow={false}
        width={responsiveWidth(5)}
        height={responsiveWidth(5)}
      />
      <MyHeart
        type={'red'}
        myStyles={{
          top: responsiveHeight(25),
          left: responsiveWidth(-3),
        }}
      />
      <MyHeart
        type={'red'}
        myStyles={{
          top: responsiveHeight(2),
          right: responsiveWidth(10),
        }}
        width={responsiveWidth(5)}
        height={responsiveWidth(5)}
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
        myStyles={{
          bottom: responsiveHeight(35),
          right: responsiveWidth(-3),
        }}
      />

      <MyHeart
        type={'red'}
        scaleX={1}
        myStyles={{
          bottom: responsiveHeight(5),
          left: responsiveWidth(10),
        }}
        width={responsiveWidth(4)}
        height={responsiveWidth(4)}
      />

      <MyHeart
        type={'red'}
        scaleX={1}
        myStyles={{
          bottom: responsiveHeight(3),
          right: responsiveWidth(10),
        }}
        shadow={false}
        width={responsiveWidth(13)}
        height={responsiveWidth(13)}
      />
      <View>
        <Text style={styles.maintxt}>Add Profile Image</Text>
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => setImagevisible(true)}
          style={{
            width: responsiveWidth(44),
            height: responsiveWidth(44),
            alignSelf: 'center',
            marginTop: responsiveHeight(15),
          }}>
          <View
            style={{
              borderRadius: responsiveWidth(9.5),
              overflow: 'hidden',
              alignSelf: 'center',
              width: responsiveWidth(44),
              height: responsiveWidth(44),
            }}>
            <Image
              source={myimage == '' ? appImages.userimage : {uri: myimage}}
              style={{
                width: responsiveWidth(44),
                height: responsiveWidth(44),
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
      </View>

      {loading ? (
        <MyButtonLoader myStyles={styles.buttonstyle} title={'Add'} />
      ) : (
        <MyButton
          myStyles={styles.buttonstyle}
          title={'Add'}
          onPress={() => {
            UploadToCloudinary();
            // props.navigation.navigate('Subscribe')
          }}
          itsTextstyle={{
            color: '#fff',
          }}
        />
      )}

      <Dialog.Container
        visible={visible}
        verticalButtons={true}
        onRequestClose={() => handleCancel()}>
        <Dialog.Title
          style={{
            fontFamily: fontFamily.Baskerville_Old_Face,
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
            fontFamily: fontFamily.Baskerville_Old_Face,
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
            fontFamily: fontFamily.Baskerville_Old_Face,
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
            fontFamily: fontFamily.Baskerville_Old_Face,

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
    </SafeAreaView>
  );
};

export default AddProfileImage;

const styles = StyleSheet.create({
  maintxt: {
    color: appColor.appColorMain,
    fontSize: responsiveFontSize(3.9),
    // fontSize: 30,
    alignSelf: 'center',
    fontWeight: 'bold',
    marginTop: responsiveHeight(6),
  },
  buttonstyle: {
    backgroundColor: '#FF0047',
    marginBottom: responsiveHeight(12),
  },
});
