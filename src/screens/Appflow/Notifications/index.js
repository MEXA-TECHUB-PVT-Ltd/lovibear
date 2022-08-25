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
    {
      id: 6,
    },
    {
      id: 7,
    },
    {
      id: 8,
    },
    {
      id: 9,
    },
  ]);
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        // onPress={() => props.navigation.navigate('Messaging')}
        activeOpacity={0.7}
        style={{
          marginBottom: responsiveHeight(2.5),
          flexDirection: 'row',

          alignItems: 'center',
        }}>
        <Image
          style={{
            width: responsiveWidth(21),
            height: responsiveWidth(21),
            borderRadius: responsiveWidth(100),
          }}
          source={appImages.girlimg}
          resizeMode="cover"
        />

        <Text style={styles.worktxt}>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut
        </Text>
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
          <Text style={styles.txt1}>Notifications</Text>
          <TouchableOpacity activeOpacity={0.7}>
            <Text
              style={{
                color: appColor.appColorMain,
                fontFamily: fontFamily.Touche_Regular,
                fontSize: responsiveFontSize(1.65),
                opacity: 0.5,
              }}>
              Mark all as read
            </Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={list}
          renderItem={renderItem}
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default Notifications;

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
    color: '#080808',
    fontFamily: fontFamily.Touche_SemiBold,
    fontSize: responsiveFontSize(3.2),
  },
  sicon2: {
    width: responsiveWidth(5.5),
    height: responsiveWidth(5.5),
  },
});
