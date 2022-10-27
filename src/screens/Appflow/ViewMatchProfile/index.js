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
import RBSheet from 'react-native-raw-bottom-sheet';
import {
  responsiveWidth,
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import Carousel from 'react-native-snap-carousel';
import {fontFamily} from '../../../constants/fonts';
import MyHeart from '../../../components/MyHeart';
import LinearGradient from 'react-native-linear-gradient';
import {Base_URL} from '../../../Base_URL';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImageView from 'react-native-image-viewing';
import {useFocusEffect} from '@react-navigation/native';
const ViewMatchProfile = ({route, navigation}) => {
  const {userid, name} = route.params;
  useFocusEffect(
    React.useCallback(() => {
      GetUser();
      GetPosts();
    }, []),
  );
  const [visible, setIsVisible] = useState(false);
  const [viewimages, setViewImages] = useState([]);
  const images = viewimages;
  const [empty, setEmpty] = useState(false);
  const GetUser = async () => {
    var axios = require('axios');

    var config = {
      method: 'get',
      url: Base_URL + '/user/specificUser/' + userid,
      headers: {},
    };

    await axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setUserDetails(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const GetPosts = async () => {
    var axios = require('axios');
    var config = {
      method: 'get',
      url: Base_URL + '/posts/getPostsOfUser/' + userid,
      headers: {},
    };
    await axios(config)
      .then(function (response) {
        console.log('THIS ONE=========', JSON.stringify(response.data));
        if (response.data.result.length != 0) {
          setList(response.data.result);
          setEmpty(false);
        } else {
          setEmpty(true);
        }
      })
      .catch(function (error) {
        console.log(error);
        setEmpty(true);
      });
  };

  const [userDetails, setUserDetails] = useState();
  const [list, setList] = useState([]);
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          let myarr = item.postImages.map(item => {
            return {uri: item.image_url};
          });
          setViewImages(myarr);

          console.log('MY ARR==========', myarr);
          setTimeout(() => {
            setIsVisible(true);
          }, 200);
        }}
        // onPress={() => props.navigation.navigate('Messaging')}
        activeOpacity={0.85}
        style={{
          borderRadius: responsiveWidth(5),
          overflow: 'hidden',
          marginBottom: responsiveHeight(2.2),
          borderWidth: responsiveWidth(0.3),
          borderColor: '#FA6B5B',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={{uri: item.postImages[0].image_url}}
          style={{
            width: responsiveWidth(42),
            height: responsiveWidth(50),
          }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={STYLES.container}>
      {/* <TouchableOpacity
        onPress={() => navigation.navigate('AddPhoto')}
        activeOpacity={0.7}
        style={{
          flexDirection: 'row',
          position: 'absolute',
          alignSelf: 'center',
          backgroundColor: appColor.appColorMain,
          alignItems: 'center',
          width: responsiveWidth(40),
          justifyContent: 'space-between',
          paddingHorizontal: responsiveWidth(5),
          borderRadius: responsiveWidth(100),
          bottom: responsiveHeight(4),
          paddingVertical: responsiveHeight(0.4),
          zIndex: 1,
        }}>
        <Text
          style={{
            fontFamily: fontFamily.Calibri_Bold,
            fontSize: responsiveFontSize(3.8),
            color: '#fff',
            marginTop: responsiveHeight(-0.6),
          }}>
          +
        </Text>
        <Text
          style={{
            fontFamily: fontFamily.Baskerville_Old_Face,
            fontSize: responsiveFontSize(2.6),
            color: '#fff',
          }}>
          Add Photo
        </Text>
      </TouchableOpacity> */}

      <StatusBar
        hidden={false}
        backgroundColor={appColor.appColorMain}
        barStyle={'light-content'}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          backgroundColor: 'transparent',
          // paddingHorizontal: responsiveWidth(5),
          alignSelf: 'center',

          flexGrow: 1,
        }}>
        <View
          style={{
            width: responsiveWidth(100),
            alignSelf: 'center',
            marginBottom: responsiveHeight(2),
            backgroundColor: 'transparent',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: responsiveWidth(6.5),
              marginTop: responsiveHeight(1.3),
            }}>
            <Text
              style={{
                color: appColor.appColorMain,
                fontFamily: fontFamily.Baskerville_Old_Face,
                fontSize: responsiveFontSize(2.8),
              }}>
              {name}
              {"'s"} Profile
            </Text>

            {/* <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate('Settings')}>
              <Image
                source={appImages.settingsicon}
                style={{
                  width: responsiveWidth(6.5),
                  height: responsiveWidth(6.5),
                  tintColor: appColor.appColorMain,
                }}
              />
            </TouchableOpacity> */}
          </View>
          <View
            style={{
              width: responsiveWidth(33.5),
              height: responsiveWidth(33.5),
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: responsiveWidth(100),
              backgroundColor: appColor.appColorMain,
              alignSelf: 'center',
              marginTop: responsiveHeight(1),
              overflow: 'hidden',
            }}>
            <Image
              style={{
                width: responsiveWidth(30.5),
                height: responsiveWidth(30.5),
                borderRadius: responsiveWidth(100),
              }}
              source={
                userDetails == undefined
                  ? appImages.noimg
                  : userDetails[0].profileImage == undefined
                  ? appImages.noimg
                  : {uri: userDetails[0].profileImage.userPicUrl}
              }
            />
          </View>
          <View
            style={{
              alignSelf: 'center',
              // paddingRight: responsiveWidth(13),
              paddingTop: responsiveHeight(1.5),
              alignItems: 'flex-end',
            }}>
            <Text
              style={{
                color: appColor.appColorMain,
                fontFamily: fontFamily.Baskerville_Old_Face,
                fontSize: responsiveFontSize(2.8),
                marginBottom: responsiveHeight(0.5),
                textAlign: 'center',
              }}>
              {userDetails == undefined ? '' : userDetails[0].userName}
            </Text>
            {/* <Text
                style={{
                  color: '#fff',
                  fontFamily: fontFamily.Baskerville_Old_Face,
                  fontSize: responsiveFontSize(2),
                }}>
                25.15 miles
              </Text> */}
          </View>
        </View>
        {empty ? (
          <View
            style={{
              width: responsiveWidth(80),
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
              // marginBottom: responsiveHeight(5),
              marginTop: responsiveHeight(16),
            }}>
            <Text
              style={{
                fontFamily: fontFamily.Baskerville_Old_Face,
                color: appColor.appColorMain,
                fontSize: responsiveFontSize(3.2),
              }}>
              {name} has no posts
            </Text>
          </View>
        ) : (
          <FlatList
            data={list}
            renderItem={renderItem}
            contentContainerStyle={{marginBottom: responsiveHeight(10)}}
            numColumns={2}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={{
              justifyContent: 'space-between',
              width: responsiveWidth(90),
              alignSelf: 'center',
            }}
          />
        )}
        <ImageView
          images={images}
          imageIndex={0}
          visible={visible}
          onRequestClose={() => setIsVisible(false)}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ViewMatchProfile;

const styles = StyleSheet.create({
  txt1: {
    fontFamily: fontFamily.Baskerville_Old_Face,
    color: appColor.appColorMain,
    fontSize: responsiveFontSize(3.5),
  },

  nametxt: {
    fontFamily: fontFamily.Baskerville_Old_Face,
    color: '#080808',
    fontSize: responsiveFontSize(2.3),
    marginTop: responsiveHeight(-0.4),
  },
  worktxt: {
    fontFamily: fontFamily.Baskerville_Old_Face,
    color: '#080808',
    opacity: 0.3,
    fontSize: responsiveFontSize(1.7),
    marginBottom: responsiveHeight(0.7),
    marginTop: responsiveHeight(1),
  },
  companytxt: {
    fontFamily: fontFamily.Baskerville_Old_Face,
    color: '#080808',
    opacity: 0.3,
    fontSize: responsiveFontSize(1.8),
  },
  timetxt: {
    textAlign: 'right',
    fontFamily: fontFamily.Baskerville_Old_Face,
    color: '#000',
    opacity: 0.55,
    fontSize: responsiveFontSize(1.7),
    marginTop: responsiveHeight(-0.3),
  },
  answertxt: {
    textAlign: 'right',
    fontFamily: fontFamily.Baskerville_Old_Face,
    color: '#000',
    opacity: 0.55,
    fontSize: responsiveFontSize(1.7),
    marginTop: responsiveHeight(0.4),
  },
  selectcategorytxt: {
    color: '#080808',
    fontFamily: fontFamily.Baskerville_Old_Face,
    fontSize: responsiveFontSize(3.2),
  },
  sicon2: {
    width: responsiveWidth(5.5),
    height: responsiveWidth(5.5),
  },
  info1: {
    color: '#fff',
    fontSize: responsiveFontSize(2.7),
    fontFamily: fontFamily.Baskerville_Old_Face,
  },
  info2: {
    color: '#fff',
    fontSize: responsiveFontSize(1.45),
    fontFamily: fontFamily.Baskerville_Old_Face,
  },
});
