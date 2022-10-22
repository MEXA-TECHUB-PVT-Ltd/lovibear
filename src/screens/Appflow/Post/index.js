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
const Post = props => {
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
    const userid = await AsyncStorage.getItem('userid');
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
    const userid = await AsyncStorage.getItem('userid');
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

        <LinearGradient
          colors={['rgba(80, 80, 80,0.01)', 'rgba(234, 51, 77, 1)']}
          style={{
            // alignItems: 'center',
            paddingLeft: responsiveWidth(3),
            position: 'absolute',
            bottom: responsiveWidth(-0.1),
            width: responsiveWidth(42),

            paddingBottom: responsiveHeight(2),
            paddingTop: responsiveHeight(3),
          }}>
          {/* <Text style={styles.info1}>Emma</Text> */}
          {/* <Text style={styles.info2}>72 km, Lawyer</Text> */}
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={STYLES.container}>
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
          zIndex: 1,
          flexGrow: 1,
        }}>
        <View
          style={{
            width: responsiveWidth(100),
            height: responsiveHeight(40),
            justifyContent: 'flex-end',
            alignSelf: 'center',
            marginBottom: responsiveHeight(2),
          }}>
          <Image
            source={appImages.third}
            style={{
              width: responsiveWidth(125),
              height: responsiveHeight(70),
              right: responsiveWidth(-3),
              alignSelf: 'flex-end',
            }}
            resizeMode={'stretch'}
          />
        </View>
        <View
          style={{
            width: responsiveWidth(100),
            height: responsiveHeight(70),
            alignSelf: 'center',
            marginBottom: responsiveHeight(2),
            position: 'absolute',
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
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => props.navigation.navigate('AddPhoto')}>
              <Image
                source={appImages.addpost}
                style={{
                  width: responsiveWidth(6.8),
                  height: responsiveWidth(6.8),
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => props.navigation.navigate('Settings')}>
              <Image
                source={appImages.settingsicon}
                style={{
                  width: responsiveWidth(6.5),
                  height: responsiveWidth(6.5),
                }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: responsiveWidth(33.5),
              height: responsiveWidth(33.5),
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: responsiveWidth(100),
              backgroundColor: '#fff',
              alignSelf: 'center',
              marginTop: responsiveHeight(-2.6),
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
              paddingTop: responsiveHeight(1.1),
              alignItems: 'flex-end',
            }}>
            <Text
              style={{
                color: '#fff',
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
              marginTop: responsiveHeight(8),
            }}>
            <Text
              style={{
                fontFamily: fontFamily.Baskerville_Old_Face,
                color: appColor.appColorMain,
                fontSize: responsiveFontSize(3.2),
              }}>
              You have no posts
            </Text>
          </View>
        ) : (
          <FlatList
            data={list}
            renderItem={renderItem}
            contentContainerStyle={{}}
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

export default Post;

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
