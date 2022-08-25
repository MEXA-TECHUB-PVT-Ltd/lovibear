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
import {MyButton} from '../../../components/MyButton';
import {fontFamily} from '../../../constants/fonts';

const AddProfileImage = props => {
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
            width: responsiveWidth(47),
            height: responsiveWidth(47),
            alignSelf: 'center',
            marginTop: responsiveHeight(15),
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
      </View>

      <MyButton
        myStyles={styles.buttonstyle}
        title={'Add'}
        onPress={() => props.navigation.navigate('Subscribe')}
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
