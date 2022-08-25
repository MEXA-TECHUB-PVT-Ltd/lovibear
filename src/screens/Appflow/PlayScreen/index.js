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
  FlatList,
  Animated,
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
import Swiper from 'react-native-deck-swiper';
import LinearGradient from 'react-native-linear-gradient';
import {fontFamily} from '../../../constants/fonts';
import RBSheet from 'react-native-raw-bottom-sheet';

const PlayScreen = props => {
  const refContainer = useRef();
  const [categorylist, setCategorylist] = useState([
    {
      id: 1,
      title: 'Posts',
      image: appImages.postsoption,
      onPress: () => refContainer.current.close(),
    },
    {
      id: 2,
      title: 'Bio',
      image: appImages.biooption,
      onPress: () => refContainer.current.close(),
    },
    {
      id: 3,
      title: 'Location',
      image: appImages.locationoption,
      onPress: () => refContainer.current.close(),
    },
    {
      id: 4,
      title: 'Age',
      image: appImages.ageoption,
      onPress: () => refContainer.current.close(),
    },
    {
      id: 5,
      title: 'Profile Photo',
      image: appImages.photooption,
      onPress: () => refContainer.current.close(),
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
  const [mysize, setMysize] = useState(3);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [myvalue, setMyvalue] = useState(0);
  const [buttondirection, setButtonDirection] = useState('');
  const fadeInRight = async () => {
    setButtonDirection('right');
    await Animated.timing(fadeAnim, {
      useNativeDriver: false,
      toValue: 1,
      duration: 300,
    }).start();
    await setTimeout(() => {
      console.log('HERE');
      Animated.timing(fadeAnim, {
        useNativeDriver: false,
        toValue: 0,
        duration: 80,
      }).start();
      swiperRef.current.swipeRight();
    }, 300);
  };
  const fadeInLeft = async () => {
    setButtonDirection('left');

    await Animated.timing(fadeAnim, {
      useNativeDriver: false,
      toValue: 1,
      duration: 300,
    }).start();
    await setTimeout(() => {
      console.log('HERE');
      Animated.timing(fadeAnim, {
        useNativeDriver: false,
        toValue: 0,
        duration: 80,
      }).start();
      swiperRef.current.swipeLeft();
    }, 300);
  };
  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
  };

  const myswiper = () => {
    if (buttondirection == 'right') {
      swiperRef.current.swipeRight();
    } else if (buttondirection == 'left') {
      swiperRef.current.swipeLeft();
    } else if (buttondirection == 'top') {
      swiperRef.current.swipeTop();
    }
  };
  const swiperRef = useRef();
  const Card = item => {
    return (
      <View style={styles.mycard}>
        <Image source={appImages.girlimg} style={styles.cardimage} />

        <LinearGradient
          colors={['rgba(80, 80, 80,0.01)', 'rgba(234, 51, 77, 0.9)']}
          style={{
            alignItems: 'center',
            position: 'absolute',
            bottom: responsiveWidth(-0.1),
            width: responsiveWidth(100),
            paddingBottom: responsiveHeight(5),
            paddingTop: responsiveHeight(12),
          }}>
          <Text style={styles.txt1}>Emma, 22</Text>
          <Text style={styles.txt2}>72 km, Lawyer</Text>
        </LinearGradient>
      </View>
    );
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        // alignItems: 'center',

        backgroundColor: '#fff',
      }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        <StatusBar
          hidden={false}
          // translucent={true}
          backgroundColor={'#fff'}
          barStyle={'dark-content'}
        />

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
        <View style={styles.header}>
          <Text style={styles.headertxt}>Play</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => props.navigation.navigate('Search')}>
              <FastImage
                source={appImages.searchicon}
                resizeMode="contain"
                style={{
                  width: responsiveWidth(6),
                  height: responsiveWidth(6),
                  marginRight: responsiveWidth(8),
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => refContainer.current.open()}>
              <FastImage
                source={appImages.filtericon}
                resizeMode="contain"
                style={{
                  width: responsiveWidth(7),
                  height: responsiveWidth(7),
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.swipercontainer}>
          <View
            pointerEvents="none"
            style={{
              position: 'absolute',
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 2,
            }}>
            {buttondirection == 'right' ? (
              <Animated.View style={{opacity: myvalue == 0 ? fadeAnim : null}}>
                <Image
                  source={appImages.yeplabel}
                  style={{
                    width: responsiveWidth(40),
                    height: responsiveWidth(40),
                    resizeMode: 'contain',
                  }}
                />
              </Animated.View>
            ) : buttondirection == 'left' ? (
              <Animated.View style={{opacity: fadeAnim}}>
                <Image
                  source={appImages.nopelabel}
                  style={{
                    width: responsiveWidth(40),
                    height: responsiveWidth(40),
                    resizeMode: 'contain',
                  }}
                />
              </Animated.View>
            ) : buttondirection == 'top' ? (
              <Animated.View style={{opacity: fadeAnim}}>
                <Image
                  source={appImages.superlabel}
                  style={{
                    width: responsiveWidth(90),
                    height: responsiveWidth(90),
                    resizeMode: 'contain',
                  }}
                />
              </Animated.View>
            ) : null}
          </View>
          <Swiper
            animateOverlayLabelsOpacity
            stackSize={3}
            stackScale={6}
            stackSeparation={24}
            showSecondCard={true}
            infinite
            disableBottomSwipe={true}
            overlayLabels={{
              right: {
                element: (
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'transparent',
                    }}>
                    <Image
                      source={appImages.yeplabel}
                      style={{
                        width: responsiveWidth(40),
                        height: responsiveWidth(40),
                        resizeMode: 'contain',
                      }}
                    />
                  </View>
                ),
              },
              left: {
                element: (
                  <View
                    style={{
                      backgroundColor: 'transparent',
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Image
                      source={appImages.nopelabel}
                      style={{
                        width: responsiveWidth(40),
                        height: responsiveWidth(40),
                        resizeMode: 'contain',
                      }}
                    />
                  </View>
                ),
              },
              top: {
                element: (
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'transparent',
                    }}>
                    <Image
                      source={appImages.superlabel}
                      style={{
                        width: responsiveWidth(90),
                        height: responsiveWidth(90),
                        resizeMode: 'contain',
                      }}
                    />
                  </View>
                ),
              },
            }}
            containerStyle={{
              height: responsiveHeight(62),
            }}
            cardVerticalMargin={0}
            // infinite={true}
            backgroundColor="transparent"
            cardStyle={{height: responsiveHeight(62)}}
            cards={['DO', 'MORE', 'OF', 'WHAT', 'MAKES', 'YOU', 'HAPPY']}
            cardIndex={0}
            horizontalSwipe={true}
            swipeAnimationDuration={300}
            onSwiped={cardIndex => {
              console.log('Swiped');
              swiperRef.current.state.pan.setOffset({x: 0, y: 0});
            }}
            renderCard={item => Card(item)}
            ref={swiperRef}
          />
        </View>
        <View style={styles.buttonsparent}>
          <TouchableOpacity style={styles.buttonview1} activeOpacity={0.7}>
            <Image
              style={styles.cardicon}
              resizeMode="contain"
              source={appImages.reloadcard}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              fadeInRight();
            }}
            style={styles.buttonview2}
            activeOpacity={0.7}>
            <Image
              style={styles.cardicon}
              resizeMode="contain"
              source={appImages.rightcard}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              fadeInLeft();
            }}
            style={styles.buttonview3}
            activeOpacity={0.7}>
            <Image
              style={styles.cardicon}
              resizeMode="contain"
              source={appImages.leftcard}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
      <RBSheet
        ref={refContainer}
        openDuration={250}
        animationType="slide"
        customStyles={{
          container: {
            height: responsiveHeight(45),
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
            <Text style={styles.selectcategorytxt}>
              View Profiles Of Matches
            </Text>
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

export default PlayScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    width: responsiveWidth(90),
    alignSelf: 'center',
    marginTop: responsiveHeight(1.5),
    marginBottom: responsiveHeight(1.5),
  },
  headertxt: {
    fontFamily: fontFamily.Touche_SemiBold,
    color: appColor.appColorMain,
    fontSize: responsiveFontSize(3.5),
  },
  mycard: {
    height: responsiveHeight(62),
    overflow: 'hidden',
    width: responsiveWidth(90),
    borderRadius: responsiveWidth(6),
    justifyContent: 'center',
    backgroundColor: 'white',
    alignItems: 'center',
    marginTop: responsiveHeight(1),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,

    elevation: 16,
  },
  swipercontainer: {
    height: responsiveHeight(65),
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardimage: {
    width: responsiveWidth(90),
    height: responsiveHeight(62),
  },
  txt1: {
    color: '#fff',
    fontSize: responsiveFontSize(4),
    fontFamily: fontFamily.Touche_Bold,
  },
  txt2: {
    color: '#fff',
    fontSize: responsiveFontSize(2.3),
    fontFamily: fontFamily.Touche_Bold,
  },
  buttonsparent: {
    width: responsiveWidth(90),
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: responsiveWidth(12),
    marginBottom: responsiveHeight(2),
    marginTop: responsiveHeight(4.5),
  },
  buttonview1: {
    width: responsiveWidth(15),
    height: responsiveWidth(15),
    backgroundColor: '#FFD0DD',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: responsiveWidth(100),
  },
  buttonview2: {
    width: responsiveWidth(15),
    height: responsiveWidth(15),
    backgroundColor: appColor.appColorMain,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: responsiveWidth(100),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  buttonview3: {
    width: responsiveWidth(15),
    height: responsiveWidth(15),
    backgroundColor: '#FFD0DD',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: responsiveWidth(100),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  cardicon: {
    width: responsiveWidth(6),
    height: responsiveWidth(6),
  },
  selectcategorytxt: {
    color: appColor.appColorMain,
    fontFamily: fontFamily.Touche_SemiBold,
    fontSize: responsiveFontSize(2.4),
  },
  sicon2: {
    width: responsiveWidth(6),
    height: responsiveWidth(6),
  },
});
