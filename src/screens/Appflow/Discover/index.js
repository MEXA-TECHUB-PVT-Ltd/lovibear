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
  PermissionsAndroid,
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
import Geolocation from 'react-native-geolocation-service';
import {useDispatch, useSelector} from 'react-redux';
import {setFromRoute, setRouteCard} from '../../../redux/actions';

const Discover = props => {
  const dispatch = useDispatch();
  useEffect(() => {
    getLocation();
  }, []);
  const getLocation = async () => {
    if (Platform.OS === 'ios') {
      Geolocation.requestAuthorization();
      Geolocation.setRNConfiguration({
        skipPermissionRequests: false,
        authorizationLevel: 'whenInUse',
      });
    }
    if (Platform.OS === 'android') {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
    }
    await Geolocation.getCurrentPosition(
      position => {
        console.log(position);
        // setMylat(position.coords.latitude);
        // setMylong(position.coords.longitude);
        setTimeout(() => {
          GetAllUsers(position.coords.latitude, position.coords.longitude);
        }, 500);
      },
      error => {
        console.log(error.code, error.message);
        Alert.alert('Enable Location', 'Your location is required to proceed', [
          {
            text: 'OK',
            onPress: () => {
              getLocation();
            },
          },
        ]);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };
  const GetAllUsers = async (mylat, mylong) => {
    var axios = require('axios');
    var data = JSON.stringify({
      long: mylong,
      lat: mylat,
      radiusInKm: '50000',
    });

    var config = {
      method: 'post',
      url:
        Base_URL + '/user/usersInRadius/?page=1&limit=30&min_age=1&max_age=100',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    await axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setList(response.data.users);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const [list, setList] = useState([]);
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          dispatch(setFromRoute('discover'));
          dispatch(setRouteCard(item));
          props.navigation.navigate('PlayScreen');
        }}
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
          source={
            item.document.profileImage == undefined
              ? appImages.noimg
              : {uri: item.document.profileImage.userPicUrl}
          }
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
          <Text style={styles.info1}>
            {item.document.userName}, {parseInt(item.Age)}
          </Text>
          <Text style={styles.info2}>
            {item.document.dist.distance_km.toFixed(2)} km,{' '}
            {item.document.profession}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={STYLES.container}>
      <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />
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
      <View
        style={{
          flex: 1,
          backgroundColor: 'transparent',
          // paddingHorizontal: responsiveWidth(5),
          width: responsiveWidth(90),
          alignSelf: 'center',
          zIndex: 1,
        }}>
        <View
          style={{
            marginTop: responsiveHeight(1.5),

            marginBottom: responsiveHeight(1.5),
          }}>
          <Text style={styles.txt1}>Discover</Text>
        </View>

        <FlatList
          data={list}
          renderItem={renderItem}
          contentContainerStyle={{}}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={{
            justifyContent: 'space-between',
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Discover;

const styles = StyleSheet.create({
  txt1: {
    fontFamily: fontFamily.Baskerville_Old_Face,
    color: appColor.appColorMain,
    fontSize: responsiveFontSize(3.2),
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
    fontSize: responsiveFontSize(1.6),
    fontFamily: fontFamily.Baskerville_Old_Face,
  },
});
