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
const ChatList = props => {
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
        onPress={() => props.navigation.navigate('Messaging')}
        activeOpacity={0.7}
        style={{
          marginTop: responsiveHeight(1.7),
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Image
          style={{
            width: responsiveWidth(17),
            height: responsiveWidth(17),
            borderRadius: responsiveWidth(100),
          }}
          source={appImages.girlimg}
          resizeMode="cover"
        />

        <View
          style={{
            // flexDirection: 'row',
            justifyContent: 'space-between',
            width: responsiveWidth(66),
            borderBottomColor: '#E3E3E3',
            borderBottomWidth: responsiveWidth(0.2),
            paddingBottom: responsiveHeight(3.2),
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={styles.nametxt}>Lorem ipsum</Text>
            <Text style={styles.timetxt}>3 hours</Text>
          </View>
          <View>
            <Text style={styles.worktxt}>Lorem ipsum dolor sit amet</Text>
          </View>
        </View>
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

            marginBottom: responsiveHeight(1.5),
          }}>
          <Text style={styles.txt1}>Chat</Text>
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

export default ChatList;

const styles = StyleSheet.create({
  txt1: {
    fontFamily: fontFamily.Touche_SemiBold,
    color: appColor.appColorMain,
    fontSize: responsiveFontSize(3.5),
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
    opacity: 0.3,
    fontSize: responsiveFontSize(1.7),
    marginBottom: responsiveHeight(0.7),
    marginTop: responsiveHeight(1),
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
    fontSize: responsiveFontSize(1.7),
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
