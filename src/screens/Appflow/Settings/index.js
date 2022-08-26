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
import {
  responsiveWidth,
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import Carousel from 'react-native-snap-carousel';
import {fontFamily} from '../../../constants/fonts';
import RBSheet from 'react-native-raw-bottom-sheet';

import {MyButton} from '../../../components/MyButton';
import {MyButton2} from '../../../components/MyButton2';
const Settings = props => {
  const refContainer = useRef();

  const [categorylist, setCategorylist] = useState([
    {
      id: 1,
      title: 'Change Account',
      image: appImages.changeaccount,
    },
    {
      id: 2,
      title: 'Delete Account',
      image: appImages.deleteaccount,
    },
  ]);
  const [list, setList] = useState([
    {
      id: 1,
      title: 'Account management',
      image: appImages.settinguser,
      onPress: () => props.navigation.navigate('EditProfile'),
    },
    // {
    //   id: 2,
    //   title: 'Notifications',
    //   image: appImages.settingnotifications,
    //   onPress: () => props.navigation.navigate('NotificationsScreens'),
    // },
    {
      id: 3,
      title: 'Privacy policy',
      image: appImages.settingprivacy,
    },
    {
      id: 4,
      title: 'Buy premium account ',
      image: appImages.premium,
    },
    {
      id: 5,
      title: 'Clear cache',
      image: appImages.settingcache,
    },
  ]);
  const renderItemCategory = ({item}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        style={{
          width: responsiveWidth(83),
          alignSelf: 'center',

          paddingVertical: responsiveHeight(3),
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
            fontFamily: fontFamily.Baskerville_Old_Face,
            fontSize: responsiveFontSize(2.3),
            marginLeft: responsiveWidth(4),
          }}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={item.onPress}
        activeOpacity={0.6}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: responsiveHeight(4),
        }}>
        <Image
          style={{width: responsiveWidth(5), height: responsiveWidth(5)}}
          resizeMode="contain"
          source={item.image}
        />
        <Text
          style={{
            color: '#080808',
            fontFamily: fontFamily.Baskerville_Old_Face,
            fontSize: responsiveFontSize(2),
            marginLeft: responsiveWidth(4),
          }}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={STYLES.containerJustify}>
      <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />

      <View style={STYLES.subcontainer}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: responsiveHeight(1),
            width: responsiveWidth(90),
            alignSelf: 'center',
            // justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => props.navigation.goBack()}
            style={{
              paddingLeft: responsiveWidth(2),
              marginLeft: responsiveWidth(-2),
              paddingRight: responsiveWidth(2),
              paddingVertical: responsiveHeight(1.5),
              marginVertical: responsiveHeight(0.5),
              //   marginTop: responsiveHeight(2),
            }}>
            <Image
              source={appImages.backicon2}
              resizeMode="contain"
              style={{
                width: responsiveWidth(4.5),
                height: responsiveWidth(4.5),
              }}
            />
          </TouchableOpacity>
          <Text style={styles.txt1}>Settings</Text>
        </View>
        <FlatList data={list} renderItem={renderItem} />
      </View>
      <MyButton
        onPress={() => props.navigation.navigate('Auth', {screen: 'Login'})}
        myStyles={{
          width: responsiveWidth(80),
          backgroundColor: appColor.appColorMain,
          marginBottom: responsiveHeight(4),
          height: responsiveHeight(7),
        }}
        title={'Logout'}
        itsTextstyle={{
          color: '#fff',
        }}
      />
      <RBSheet
        ref={refContainer}
        openDuration={250}
        animationType="slide"
        customStyles={{
          container: {
            // height: responsiveHeight(43),
            borderTopRightRadius: responsiveWidth(7),
            borderTopLeftRadius: responsiveWidth(7),
          },
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
            flexDirection: 'column',
            // backgroundColor: 'red',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: responsiveWidth(85),

              alignSelf: 'center',
              marginTop: responsiveHeight(5),
            }}>
            <Text style={styles.selectcategorytxt}>Account Management</Text>
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
          <View
            style={{
              marginTop: responsiveHeight(2),
              marginBottom: responsiveHeight(7),
            }}>
            <FlatList
              keyboardShouldPersistTaps={'handled'}
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

export default Settings;

const styles = StyleSheet.create({
  txt1: {
    fontFamily: fontFamily.Baskerville_Old_Face,
    color: appColor.appColorMain,
    fontSize: responsiveFontSize(3.2),
    marginLeft: responsiveWidth(2),
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
