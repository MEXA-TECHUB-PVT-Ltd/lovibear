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

const Subscribe = props => {
  const [list, setList] = useState([
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
    {
      id: 4,
    },
    {
      id: 5,
    },
  ]);
  const renderItem = ({item}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: responsiveWidth(85),
          alignSelf: 'center',

          marginTop: responsiveHeight(4.5),
        }}>
        <Image
          resizeMode="contain"
          source={appImages.tickpink}
          style={{width: responsiveWidth(5.2), height: responsiveWidth(5.2)}}
        />
        <Text
          style={{
            fontFamily: fontFamily.Touche_Regular,

            fontSize: responsiveFontSize(1.8),
            color: '#8D8D8D',
            marginLeft: responsiveWidth(4),
          }}>
          Lorem ipsum dolor sit amet, consetetur
        </Text>
      </View>
    );
  };
  return (
    <SafeAreaView style={STYLES.container}>
      <ScrollView
        contentContainerStyle={STYLES.scrollviewJustify}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={'always'}>
        <StatusBar
          hidden={false}
          backgroundColor={'#fff'}
          barStyle={'dark-content'}
        />
        <MyHeart
          type={'red'}
          myStyles={{
            top: responsiveHeight(2),
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
            left: responsiveWidth(2.5),
          }}
          width={responsiveWidth(3.4)}
          height={responsiveWidth(3.4)}
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
          shadow={false}
          myStyles={{
            bottom: responsiveHeight(3),
            right: responsiveWidth(10),
          }}
          width={responsiveWidth(13)}
          height={responsiveWidth(13)}
        />
        <View>
          <Text style={styles.maintxt}>Subscribe to Lovi Bear</Text>
          <View style={styles.packageview}>
            <Text style={styles.packagetxt}>Monthly</Text>
          </View>
          <Text style={styles.pricetxt}>250 $ Per Month</Text>
          <FlatList data={list} renderItem={renderItem} />
        </View>

        <View
          style={{
            marginBottom: responsiveHeight(11),
            //   marginTop: responsiveHeight(7),
            zIndex: 1,
          }}>
          <MyButton
            myStyles={styles.buttonstyle}
            onPress={() => props.navigation.navigate('Login')}
            title={'Subscribe'}
            itsTextstyle={{
              color: '#fff',
            }}
          />

          <MyButton
            title={'Start Free Trail'}
            onPress={() => props.navigation.navigate('Login')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Subscribe;

const styles = StyleSheet.create({
  maintxt: {
    color: appColor.appColorMain,
    fontSize: responsiveFontSize(3.5),
    // fontSize: 30,
    alignSelf: 'center',
    fontFamily: fontFamily.Touche_Bold,
    marginTop: responsiveHeight(6),
  },
  buttonstyle: {
    backgroundColor: '#FF0047',
    marginBottom: responsiveHeight(2),
    marginTop: responsiveHeight(2),
  },
  packageview: {
    alignSelf: 'center',
    marginTop: responsiveHeight(4),
    paddingHorizontal: responsiveWidth(6.5),
    paddingVertical: responsiveHeight(1.5),
    borderWidth: responsiveWidth(0.3),
    borderColor: appColor.appColorMain,
    borderRadius: responsiveWidth(4),
  },
  packagetxt: {
    fontFamily: fontFamily.Touche_Bold,

    fontWeight: 'bold',
    fontSize: responsiveFontSize(2.1),
    color: '#080808',
  },
  pricetxt: {
    fontFamily: fontFamily.Touche_Bold,
    fontSize: responsiveFontSize(3.3),
    color: '#000',
    alignSelf: 'center',
    marginTop: responsiveHeight(4),
    opacity: 0.42,
  },
});
