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
const Post = props => {
  const [list, setList] = useState([
    {
      id: 1,
      img: appImages.img2,
    },
    {
      id: 2,
      img: appImages.img3,
    },
    {
      id: 3,
      img: appImages.img4,
    },
    {
      id: 4,
      img: appImages.img5,
    },
    {
      id: 5,
      img: appImages.img6,
    },
    {
      id: 6,
      img: appImages.img7,
    },
    {
      id: 7,
      img: appImages.img8,
    },
    {
      id: 8,
      img: appImages.img9,
    },
    {
      id: 9,
      img: appImages.img10,
    },
  ]);
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
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
          source={item.img}
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
          <Text style={styles.info1}>Emma</Text>
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
              source={appImages.girlimg}
            />
          </View>
          <View
            style={{
              alignSelf: 'center',
              paddingRight: responsiveWidth(13),
              paddingTop: responsiveHeight(1.1),
              alignItems: 'flex-end',
            }}>
            <Text
              style={{
                color: '#fff',
                fontFamily: fontFamily.Baskerville_Old_Face,
                fontSize: responsiveFontSize(2.5),
                marginBottom: responsiveHeight(0.5),
              }}>
              Lorem Ipsum
            </Text>
            <Text
              style={{
                color: '#fff',
                fontFamily: fontFamily.Baskerville_Old_Face,
                fontSize: responsiveFontSize(2),
              }}>
              25.15 miles
            </Text>
          </View>
        </View>
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
