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
import {appImages} from '../../../assets/utilities';
import RBSheet from 'react-native-raw-bottom-sheet';

import {
  responsiveWidth,
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import Carousel from 'react-native-snap-carousel';
import {fontFamily} from '../../../constants/fonts';
import {MyButton} from '../../../components/MyButton';
import LinearGradient from 'react-native-linear-gradient';
import MyHeart from '../../../components/MyHeart';
const Bingo = ({route, navigation}) => {
  const {userdata} = route.params;
  console.log('MY USER DATA==============', userdata);
  return (
    <SafeAreaView style={[STYLES.container]}>
      <StatusBar
        backgroundColor={'rgba(234, 51, 77, 1)'}
        barStyle={'light-content'}
        hidden={false}
        translucent={false}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        <LinearGradient
          style={{
            flexGrow: 1,
            justifyContent: 'space-between',
          }}
          colors={['rgba(234, 51, 77, 1)', 'rgba(234, 51, 77, 0.75)']}>
          <View>
            <View
              style={{
                width: responsiveWidth(90),
                alignSelf: 'center',
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: responsiveHeight(8),
              }}>
              <View
                style={{
                  width: responsiveWidth(54),
                  height: responsiveHeight(32),
                  borderRadius: responsiveWidth(8),
                  transform: [{rotate: '-15deg'}],
                  backgroundColor: '#FC2252',
                  alignItems: 'center',
                  justifyContent: 'center',

                  borderRadius: responsiveWidth(8),
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 6,
                  },
                  shadowOpacity: 0.37,
                  shadowRadius: 7.49,

                  elevation: 12,
                }}>
                <MyHeart
                  // scaleX={1}
                  rotate={'25deg'}
                  myStyles={{
                    right: responsiveWidth(-14),
                    top: responsiveHeight(9),
                  }}
                />
                <MyHeart
                  scaleX={1}
                  rotate={'-10deg'}
                  myStyles={{
                    left: responsiveWidth(-6),
                    top: responsiveHeight(11),
                  }}
                  width={responsiveWidth(4)}
                  height={responsiveWidth(4)}
                />
                <MyHeart
                  rotate={'25deg'}
                  myStyles={{
                    left: responsiveWidth(-6),
                    bottom: responsiveHeight(-5),
                  }}
                  width={responsiveWidth(5)}
                  height={responsiveWidth(5)}
                />

                <Image
                  source={appImages.img10}
                  style={{
                    width: responsiveWidth(54),
                    height: responsiveHeight(32),
                    resizeMode: 'cover',
                    borderRadius: responsiveWidth(8),
                    // backgroundColor: 'red',
                  }}
                />
              </View>
              <View
                style={{
                  width: responsiveWidth(54),
                  height: responsiveHeight(32),
                  transform: [{rotate: '15deg'}],
                  marginTop: responsiveHeight(13.5),
                  marginLeft: responsiveWidth(-33),
                  backgroundColor: '#FC2252',

                  borderRadius: responsiveWidth(8),
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 6,
                  },
                  shadowOpacity: 0.37,
                  shadowRadius: 7.49,

                  elevation: 12,
                }}>
                <MyHeart
                  scaleX={1}
                  rotate={'-17deg'}
                  myStyles={{
                    left: responsiveWidth(-4),
                    bottom: responsiveHeight(5),
                  }}
                  width={responsiveWidth(17)}
                  height={responsiveWidth(17)}
                />
                <MyHeart
                  rotate={'1deg'}
                  myStyles={{
                    right: responsiveWidth(-3),
                    top: responsiveHeight(6),
                  }}
                  // width={responsiveWidth(17)}
                  // height={responsiveWidth(17)}
                />
                <MyHeart
                  scaleX={1}
                  rotate={'-17deg'}
                  myStyles={{
                    right: responsiveWidth(0.01),
                    bottom: responsiveHeight(6),
                  }}
                  width={responsiveWidth(5)}
                  height={responsiveWidth(5)}
                />
                <Image
                  source={appImages.img7}
                  style={{
                    width: responsiveWidth(54),
                    height: responsiveHeight(32),
                    resizeMode: 'cover',
                    borderRadius: responsiveWidth(8),
                    // backgroundColor: 'red',
                  }}
                />
              </View>
            </View>
            <View
              style={{
                alignSelf: 'center',
                alignItems: 'center',

                // backgroundColor: 'red',
              }}>
              <View
                style={{
                  alignItems: 'center',
                }}>
                <Text style={styles.txt2}>Bingo</Text>
                <Text style={styles.txt1}>,</Text>
                <Text style={styles.txt1}>you score a match</Text>
              </View>
            </View>
            <View
              style={{
                alignItems: 'center',
                marginTop: responsiveHeight(2),
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={appImages.heartwhite}
                style={{
                  width: responsiveWidth(3),
                  height: responsiveWidth(3),
                  resizeMode: 'contain',
                  marginBottom: responsiveHeight(2),
                  marginRight: responsiveWidth(1),
                }}
              />
              <Image
                source={appImages.heartwhite}
                style={{
                  width: responsiveWidth(11),
                  height: responsiveWidth(11),
                  resizeMode: 'contain',
                }}
              />
              <Image
                source={appImages.heartwhite}
                style={{
                  width: responsiveWidth(3),
                  height: responsiveWidth(3),
                  resizeMode: 'contain',
                  marginTop: responsiveHeight(2),
                  marginLeft: responsiveWidth(1),
                  transform: [{rotate: '45deg'}],
                }}
              />
            </View>
          </View>

          <View style={styles.fixedfooter}>
            <MyButton
              myStyles={styles.button1}
              title={'Send Message'}
              itsTextstyle={styles.txt3}
              onPress={() => navigation.navigate('Messaging')}
            />
            <TouchableOpacity
              onPress={() => navigation.navigate('PlayScreen')}
              activeOpacity={0.6}
              style={{
                borderRadius: responsiveWidth(100),

                width: responsiveWidth(70),
                height: responsiveHeight(7.5),
                alignSelf: 'center',
                alignItems: 'center',
                //   marginTop: responsiveHeight(1),
                //   backgroundColor: 'red',
                justifyContent: 'center',
              }}>
              <Text style={styles.txt4}>Continue to Play</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Bingo;

const styles = StyleSheet.create({
  txt1: {
    color: '#fff',
    fontFamily: fontFamily.Baskerville_Old_Face,
    fontSize: responsiveFontSize(2.5),
    // marginBottom: responsiveHeight(1),
    textAlign: 'center',
    marginTop: responsiveHeight(0.5),
  },
  txt2: {
    color: '#fff',
    fontFamily: fontFamily.Baskerville_Old_Face,

    fontSize: responsiveFontSize(5),
    marginTop: responsiveHeight(3.5),

    // marginBottom: responsiveHeight(3),
  },
  button1: {
    backgroundColor: '#fff',
    borderRadius: responsiveWidth(100),

    width: responsiveWidth(70),
    height: responsiveHeight(7.5),
  },

  txt3: {
    fontFamily: fontFamily.Baskerville_Old_Face,

    color: '#FB3F71',
    fontSize: responsiveFontSize(2),
  },
  txt4: {
    fontFamily: fontFamily.Baskerville_Old_Face,
    color: '#fff',
    fontSize: responsiveFontSize(2),
  },
  fixedfooter: {
    marginBottom: responsiveHeight(2),
  },
});
