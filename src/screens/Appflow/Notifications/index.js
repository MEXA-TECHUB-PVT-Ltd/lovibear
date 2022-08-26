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
const Notifications = props => {
  const [list, setList] = useState([
    {
      id: 1,
      content: 'Congratulations! You found a match',
      img: appImages.img2,
    },
    {
      id: 2,
      content:
        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diamnonumy',
      img: appImages.img3,
    },
    {
      id: 3,
      content:
        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diamnonumy',
      img: appImages.img4,
    },
    {
      id: 4,
      content:
        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diamnonumy',
      img: appImages.img5,
    },
    {
      id: 5,
      content:
        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diamnonumy',
      img: appImages.img6,
    },
    {
      id: 6,
      content:
        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diamnonumy',
      img: appImages.img7,
    },
    {
      id: 7,
      content:
        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diamnonumy',
      img: appImages.img8,
    },
    {
      id: 8,
      content:
        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diamnonumy',
      img: appImages.img9,
    },
    {
      id: 9,
      content:
        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diamnonumy',
      img: appImages.img10,
    },
  ]);
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        // onPress={() => props.navigation.navigate('Messaging')}
        onPress={() => {
          item.id == 1 ? props.navigation.navigate('Bingo') : null;
        }}
        activeOpacity={0.7}
        style={{
          marginBottom: responsiveHeight(2.5),
          flexDirection: 'row',

          alignItems: 'center',
        }}>
        <View
          style={{
            // backgroundColor: '#fff',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 8,
            },
            shadowOpacity: 0.44,
            shadowRadius: 10.32,

            elevation: 16,
            width: responsiveWidth(21),
            height: responsiveWidth(21),
            borderRadius: responsiveWidth(99),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            style={{
              width: responsiveWidth(21),
              height: responsiveWidth(21),
              borderRadius: responsiveWidth(100),
            }}
            source={item.img}
            resizeMode="cover"
          />
        </View>

        <Text style={styles.worktxt}>{item.content}</Text>
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
        }}>
        <View
          style={{
            marginTop: responsiveHeight(1.5),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: responsiveWidth(5),
          }}>
          <Text style={styles.txt1}>Notifications</Text>
          <TouchableOpacity activeOpacity={0.7}>
            <Text
              style={{
                color: appColor.appColorMain,
                fontFamily: fontFamily.Baskerville_Old_Face,
                fontSize: responsiveFontSize(1.8),
                opacity: 0.5,
              }}>
              Mark as read
            </Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={list}
          renderItem={renderItem}
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: responsiveWidth(5),
            paddingTop: responsiveHeight(1.9),
          }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  txt1: {
    fontFamily: fontFamily.Baskerville_Old_Face,
    color: appColor.appColorMain,
    fontSize: responsiveFontSize(3.2),
  },

  nametxt: {
    fontFamily: fontFamily.Baskerville_Old_Face,
    color: '#080808',
    fontSize: responsiveFontSize(2.4),
    marginTop: responsiveHeight(-0.4),
  },
  worktxt: {
    fontFamily: fontFamily.Baskerville_Old_Face,
    color: '#080808',
    marginLeft: responsiveWidth(2.5),
    fontSize: responsiveFontSize(1.8),
    width: responsiveWidth(65),
    lineHeight: responsiveHeight(2.7),
  },
  companytxt: {
    fontFamily: fontFamily.Baskerville_Old_Face,
    color: '#080808',
    opacity: 0.3,
    fontSize: responsiveFontSize(1.9),
  },
  timetxt: {
    textAlign: 'right',
    fontFamily: fontFamily.Baskerville_Old_Face,
    color: '#000',
    opacity: 0.55,
    fontSize: responsiveFontSize(1.8),
    marginTop: responsiveHeight(-0.3),
  },
  answertxt: {
    textAlign: 'right',
    fontFamily: fontFamily.Baskerville_Old_Face,
    color: '#000',
    opacity: 0.55,
    fontSize: responsiveFontSize(1.9),
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
});
