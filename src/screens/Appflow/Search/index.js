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
const Search = props => {
  useEffect(() => {
    setFilteredlist(list);
  }, []);
  const [filteredlist, setFilteredlist] = useState([]);
  const [list, setList] = useState([
    {
      id: 1,
      name: 'Emma',
    },
    {
      id: 2,
      name: 'Jennifer',
    },
    {
      id: 3,
      name: 'John Doe',
    },
    {
      id: 4,
      name: 'Mike',
    },
    {
      id: 5,
      name: 'Ryu',
    },
    {
      id: 6,
      name: 'Ken',
    },
    {
      id: 7,
      name: 'Tobey Maguire',
    },
    {
      id: 8,
      name: 'Jacob',
    },
    {
      id: 9,
      name: 'Mickey',
    },
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const search = searchText => {
    console.log('okiuhh');
    console.log(searchText);
    setSearchQuery(searchText);
    let filteredData = list.filter(function (item) {
      var searchIdNameLowerCase = searchText.toLowerCase();
      var itemNameLowerCase = item.name.toLowerCase();
      console.log(item);
      var a = itemNameLowerCase.includes(searchIdNameLowerCase);

      return a;
    });
    console.log('SEARCH', search);
    setFilteredlist(filteredData);
  };
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        // onPress={() => props.navigation.navigate('Messaging')}
        onPress={() => props.navigation.navigate('PlayScreen')}
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
          source={appImages.girlimg}
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
          <Text style={styles.info1}>{item.name}, 22</Text>
          <Text style={styles.info2}>72 km, Lawyer</Text>
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
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: responsiveHeight(1),
            width: responsiveWidth(90),
            alignSelf: 'center',
            justifyContent: 'space-between',
            marginBottom: responsiveHeight(2.5),
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
              source={appImages.backicon}
              resizeMode="contain"
              style={{
                width: responsiveWidth(5.5),
                height: responsiveWidth(5.5),
              }}
            />
          </TouchableOpacity>
          <View style={styles.inputview}>
            <TextInput
              style={styles.inputstyle}
              placeholder={'Search'}
              placeholderTextColor={'#8D8D8D'}
              onChangeText={text => {
                search(text);
              }}
              value={searchQuery}
              autoFocus
            />
            <Image
              source={appImages.searchicon}
              style={{width: responsiveWidth(5), height: responsiveWidth(5)}}
            />
          </View>
        </View>

        <FlatList
          keyboardShouldPersistTaps={'always'}
          data={filteredlist}
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

export default Search;

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
  info1: {
    color: '#fff',
    fontSize: responsiveFontSize(2.6),
    fontFamily: fontFamily.Touche_Bold,
  },
  info2: {
    color: '#fff',
    fontSize: responsiveFontSize(1.45),
    fontFamily: fontFamily.Touche_Bold,
  },
  inputview: {
    width: responsiveWidth(80),
    borderWidth: responsiveWidth(0.2),
    borderColor: '#C7C7C7',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: responsiveWidth(3),
    // paddingVertical: responsiveWidth(0.1),
    borderRadius: responsiveWidth(4),
  },
  inputstyle: {
    fontFamily: fontFamily.Touche_Regular,
    color: '#000',
    fontSize: responsiveFontSize(2),
    width: responsiveWidth(65),
    paddingVertical: responsiveHeight(1),
  },
});
