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
import {useFocusEffect} from '@react-navigation/native';
import {Base_URL} from '../../../Base_URL';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator} from 'react-native-paper';
const Notifications = props => {
  const [loading, setLoading] = useState(false);
  const [empty, setEmpty] = useState(false);
  useFocusEffect(
    React.useCallback(() => {
      GetNotifications();
    }, []),
  );

  //   const ChangeStatus = ({itemSelected,index}) =>{
  // const newData = list.map((item)=>{
  //   if(itemSelected == item)
  //   {
  //     return

  //   }
  // })

  //   }

  const GetNotifications = async () => {
    setLoading(true);
    const userid = await AsyncStorage.getItem('userid');
    console.log('THE USER ID ON NOTIFICATIONS========', userid);
    var axios = require('axios');
    var data = JSON.stringify({
      userId: userid,
      type: 'user',
    });
    var config = {
      method: 'post',
      url: Base_URL + '/notification/getNotificationsByType',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    await axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        if (response.data.data.length == 0) {
          setEmpty(true);
          setLoading(false);
        } else {
          setList(response.data.data);
          setEmpty(false);
          setLoading(false);
        }
      })
      .catch(function (error) {
        console.log(error.data);
        console.log(error);
      });
  };

  const [list, setList] = useState([]);
  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        // onPress={() => props.navigation.navigate('Messaging')}

        onPress={() => {
          ChangeStatus(item, index);
          // item.id == 1 ? props.navigation.navigate('Bingo') : null;
        }}
        activeOpacity={0.7}
        style={{
          backgroundColor: item.readStatus == false ? '#F1F1F1' : '#fff',
          marginBottom: responsiveHeight(2.5),
          borderRadius: responsiveWidth(1),
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View
          style={{
            backgroundColor: 'gray',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 8,
            },
            shadowOpacity: 0.44,
            shadowRadius: 10.32,
            elevation: 6,
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
            source={{uri: item.image}}
            resizeMode="cover"
          />
        </View>

        <Text style={styles.worktxt}>
          {item.body} {item.name}
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
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {loading ? (
              <ActivityIndicator
                color={appColor.appColorMain}
                size={'small'}
                style={{marginRight: responsiveWidth(3)}}
              />
            ) : null}

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
        </View>

        {empty ? (
          <View
            style={{
              flexGrow: 1,
              width: responsiveWidth(80),
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
              marginBottom: responsiveHeight(5),
            }}>
            <Text
              style={{
                fontFamily: fontFamily.Baskerville_Old_Face,
                color: appColor.appColorMain,
                fontSize: responsiveFontSize(3.2),
              }}>
              No Notifications Yet
            </Text>
          </View>
        ) : (
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
        )}
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
