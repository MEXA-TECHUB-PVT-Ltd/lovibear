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
import ImagePicker from 'react-native-image-crop-picker';

import STYLES from '../../STYLES';
import {appColor, appImages} from '../../../assets/utilities';
import RBSheet from 'react-native-raw-bottom-sheet';
import {
  responsiveWidth,
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import Carousel from 'react-native-snap-carousel';
import {fontFamily} from '../../../constants/fonts';

const AddPhoto = props => {
  const imageTakeFromCamera = () => {
    ImagePicker.openCamera({
      cropping: true,
      compressImageQuality: 1,
    }).then(image => {
      console.log(image.path);
      setMyimage(image.path);
    });
  };

  const refContainer = useRef();
  const [categorylist, setCategorylist] = useState([
    {
      id: 1,
      title: 'Upload From Camera',
      image: appImages.uploadcamera,
      onPress: () => imageTakeFromCamera(),
    },
    {
      id: 2,
      title: 'Upload From Gallery',
      image: appImages.uploadgallery,
      onPress: () => imageTakeFromGallery(),
    },
  ]);
  const renderItemCategory = ({item}) => {
    return (
      <TouchableOpacity
        onPress={item.onPress}
        activeOpacity={0.6}
        style={{
          width: responsiveWidth(83),
          alignSelf: 'center',

          paddingVertical: responsiveHeight(2),
          borderBottomWidth: responsiveWidth(0.2),
          borderColor: '#EBEBEB',
          flexDirection: 'row',
        }}>
        <Image
          source={item.image}
          resizeMode="contain"
          style={{width: responsiveWidth(6), height: responsiveWidth(6)}}
        />
        <Text
          style={{
            color: '#9D9D9D',
            fontFamily: fontFamily.Touche_Regular,
            fontSize: responsiveFontSize(2),
            marginLeft: responsiveWidth(4),
          }}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };
  const [mylist, setMylist] = useState([
    {
      flag: true,
    },
  ]);
  const [myimage, setMyimage] = useState('');
  const imageTakeFromGallery = () => {
    ImagePicker.openPicker({
      cropping: true,
      compressImageQuality: 1,
    }).then(async image => {
      let arr = mylist;
      await arr.unshift({
        image: image.path,
      });
      await setMylist([...arr]);
      await console.log('MY LIST==============', mylist);
      await refContainer.current.close();
      console.log('ARR LENGTH', arr.length);
      if (arr.length > 9) {
        console.log('FOR POP===========');
        let arr = mylist;
        await arr.pop();
        setMylist([...arr]);
      }
    });
  };

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => refContainer.current.open()}
        activeOpacity={0.7}
        disabled={item.flag ? false : true}
        style={{
          borderWidth: responsiveWidth(0.2),
          borderColor: '#E75073',
          width: responsiveWidth(28),
          height: responsiveWidth(34),
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: responsiveWidth(4),
          overflow: 'hidden',
          marginBottom: responsiveHeight(2),
          marginRight: responsiveWidth(2.8),
        }}>
        <Image
          source={item.flag ? appImages.addphoto : {uri: item.image}}
          style={{
            width: item.flag ? responsiveWidth(8) : responsiveWidth(28),
            height: item.flag ? responsiveWidth(8) : responsiveWidth(34),
            //   backgroundColor: 'red',
          }}
        />
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={STYLES.container}>
      <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          paddingHorizontal: responsiveWidth(5),
        }}>
        <View
          style={{
            marginTop: responsiveHeight(1.5),
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: responsiveHeight(1.9),
            justifyContent: 'space-between',
          }}>
          <Text style={styles.txt1}>Add Photo</Text>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => props.navigation.goBack()}>
            <Image
              source={appImages.crossphoto}
              style={{
                width: responsiveWidth(5.3),
                height: responsiveWidth(5.3),
              }}
            />
          </TouchableOpacity>
        </View>
        <Image
          source={appImages.photoheader}
          style={{
            height: responsiveWidth(35),
            width: responsiveWidth(65),
            resizeMode: 'contain',
            // backgroundColor: 'red',
            alignSelf: 'center',
          }}
        />

        <Text
          style={{
            marginTop: responsiveHeight(3),
            width: responsiveWidth(85),
            alignSelf: 'center',
            alignItems: 'center',
            color: '#707070',
            fontSize: responsiveFontSize(1.8),
            textAlign: 'center',
            fontFamily: fontFamily.Touche_SemiBold,
            lineHeight: responsiveHeight(3),
          }}>
          Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr, Sed Diam
          Nonumy
        </Text>
        <FlatList
          data={mylist}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          numColumns={3}
          //   columnWrapperStyle={{justifyContent: 'space-between'}}
          contentContainerStyle={{
            marginTop: responsiveHeight(4),
            paddingBottom: responsiveHeight(9),
          }}
        />
      </View>
      <RBSheet
        ref={refContainer}
        openDuration={250}
        animationType="slide"
        customStyles={{
          container: {
            // height: responsiveHeight(50),
            borderTopRightRadius: responsiveWidth(7),
            borderTopLeftRadius: responsiveWidth(7),
          },
        }}>
        <View style={{flex: 1}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: responsiveWidth(85),
              alignSelf: 'center',
              marginTop: responsiveHeight(3),
            }}>
            <Text style={styles.selectcategorytxt}>Upload Image</Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => refContainer.current.close()}>
              <Image
                source={appImages.closerbsheet}
                resizeMode="contain"
                style={styles.sicon2}
              />
            </TouchableOpacity>
          </View>
          <View style={{flex: 1, marginTop: responsiveHeight(2)}}>
            <FlatList
              data={categorylist}
              renderItem={renderItemCategory}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      </RBSheet>
    </SafeAreaView>
  );
};

export default AddPhoto;

const styles = StyleSheet.create({
  txt1: {
    fontFamily: fontFamily.Touche_SemiBold,
    color: appColor.appColorMain,
    fontSize: responsiveFontSize(3.2),
  },
  nametxt: {
    fontFamily: fontFamily.Touche_SemiBold,
    color: '#080808',
    fontSize: responsiveFontSize(2.3),
    marginTop: responsiveHeight(-0.4),
  },
  worktxt: {
    fontFamily: fontFamily.Touche_Regular,
    color: '#080808',
    marginLeft: responsiveWidth(2.5),
    fontSize: responsiveFontSize(1.7),
    width: responsiveWidth(65),
    lineHeight: responsiveHeight(2.7),
  },
  companytxt: {
    fontFamily: fontFamily.Touche_Regular,
    color: '#080808',
    opacity: 0.3,
    fontSize: responsiveFontSize(1.8),
  },
  timetxt: {
    textAlign: 'right',
    fontFamily: fontFamily.Touche_SemiBold,
    color: '#000',
    opacity: 0.55,
    fontSize: responsiveFontSize(1.7),
    marginTop: responsiveHeight(-0.3),
  },
  answertxt: {
    textAlign: 'right',
    fontFamily: fontFamily.Touche_SemiBold,
    color: '#000',
    opacity: 0.55,
    fontSize: responsiveFontSize(1.8),
    marginTop: responsiveHeight(0.4),
  },
  selectcategorytxt: {
    color: appColor.appColorMain,
    fontFamily: fontFamily.Touche_SemiBold,
    fontSize: responsiveFontSize(2.7),
  },
  sicon2: {
    width: responsiveWidth(6),
    height: responsiveWidth(6),
  },
});
