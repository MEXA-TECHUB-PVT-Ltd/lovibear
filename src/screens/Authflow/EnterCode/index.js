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
} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import React, {useEffect, useRef, useState} from 'react';
import STYLES from '../../STYLES';
import {appColor, appImages} from '../../../assets/utilities';
import {SvgXml} from 'react-native-svg';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import EyeIcon from 'react-native-vector-icons/Ionicons';
import MyHeart from '../../../components/MyHeart';
import {useFocusEffect} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {MyButton} from '../../../components/MyButton';
import {fontFamily} from '../../../constants/fonts';
const CELL_COUNT = 4;

const EnterCode = props => {
  const [myfocus, setMyfocus] = useState('');
  const [securepassword, setSecurepassword] = useState(true);
  const passwordinputref = useRef();
  const emailinputref = useRef();
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props2, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  return (
    <SafeAreaView style={STYLES.container}>
      <StatusBar
        hidden={false}
        backgroundColor={appColor.appColorMain}
        barStyle={'light-content'}
      />
      <ScrollView
        keyboardShouldPersistTaps={'always'}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1, justifyContent: 'space-between'}}>
        <View>
          <View
            style={{
              height: responsiveHeight(22),
              overflow: 'hidden',
              justifyContent: 'flex-end',

              // alignSelf: 'center',
            }}>
            <Image
              source={appImages.first}
              style={{
                transform: [{rotate: '2deg'}],

                width: responsiveWidth(110),
                height: responsiveHeight(70),

                resizeMode: 'stretch',
                alignSelf: 'center',

                //   backgroundColor: 'red',
                //   top: responsiveHeight(-50),
              }}
            />
          </View>
          <Text style={styles.maintxt}>Enter Code Below</Text>
          <Text
            style={{
              marginTop: responsiveHeight(3),
              width: responsiveWidth(85),
              alignSelf: 'center',
              alignItems: 'center',
              color: '#8D8D8D',
              fontSize: responsiveFontSize(1.8),

              textAlign: 'center',
              fontFamily: fontFamily.Touche_Regular,
              lineHeight: responsiveHeight(3),
            }}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy
          </Text>
          <CodeField
            ref={ref}
            {...props2}
            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({index, symbol, isFocused}) => (
              <View
                style={[styles.cell, isFocused && styles.focusCell]}
                onLayout={getCellOnLayoutHandler(index)}>
                <Text style={styles.textstyle} key={index}>
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              </View>
            )}
          />

          <MyHeart
            myStyles={{
              left: responsiveWidth(-3.6),
              top: responsiveHeight(24),
            }}
            type={'red'}
            // scaleX={1}
          />
          <MyHeart
            myStyles={{
              right: responsiveWidth(-2.5),
              bottom: responsiveHeight(-7),
            }}
            type={'red'}
            // scaleX={1}
          />
        </View>

        <View
          style={{
            position: 'absolute',
            //   top: responsiveHeight(1),
            alignSelf: 'center',
            height: responsiveHeight(17),
            alignItems: 'center',
            // backgroundColor: 'blue',
            justifyContent: 'center',
            width: responsiveWidth(100),
          }}>
          <Text style={styles.headertxt}>LoviBear</Text>
          <MyHeart
            myStyles={{
              left: responsiveWidth(4.5),
              bottom: responsiveHeight(4.5),
            }}
          />
          <MyHeart
            myStyles={{
              right: responsiveWidth(7),
              top: responsiveHeight(4.5),
            }}
            width={responsiveWidth(5)}
            height={responsiveWidth(5)}
            shadow={false}
          />
        </View>
        <View
          style={{
            height: responsiveHeight(28),
            overflow: 'hidden',
            marginTop: responsiveHeight(21),
            // justifyContent: 'flex-end',
            // alignSelf: 'flex-end',
          }}>
          <Image
            source={appImages.second}
            style={{
              width: responsiveWidth(107),
              height: responsiveHeight(85),
              resizeMode: 'stretch',
              //   backgroundColor: 'red',
              //   top: responsiveHeight(-50),
            }}
          />
        </View>
        <View
          style={{
            height: responsiveHeight(20),
            position: 'absolute',

            width: responsiveWidth(100),
            bottom: responsiveWidth(0.001),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <MyButton
            title={'VERIFY CODE'}
            onPress={() => props.navigation.navigate('UpdatePassword')}
          />

          <MyHeart
            myStyles={{
              left: responsiveWidth(7),
              bottom: responsiveHeight(6),
            }}
            width={responsiveWidth(3.5)}
            height={responsiveWidth(3.5)}
            scaleX={1}
            shadow={false}
          />
        </View>
        <MyHeart
          myStyles={{
            left: responsiveWidth(4.5),
            top: responsiveHeight(65),
          }}
          type={'red'}
          scaleX={1}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default EnterCode;

const styles = StyleSheet.create({
  txt4: {
    textAlign: 'center',
    color: '#fff',
    fontFamily: fontFamily.Touche_SemiBold,
    fontSize: responsiveFontSize(1.75),
  },
  headertxt: {
    fontSize: responsiveFontSize(4.5),
    color: '#fff',
    fontFamily: fontFamily.Touche_Regular,
  },
  maintxt: {
    color: appColor.appColorMain,
    fontSize: responsiveFontSize(3.5),
    alignSelf: 'center',
    fontFamily: fontFamily.Touche_Bold,
    marginTop: responsiveHeight(-0.8),
  },
  emailparent: {
    borderRadius: responsiveWidth(3),
    borderWidth: responsiveWidth(0.3),
    borderColor: '#D7D7D7',
    marginTop: responsiveHeight(3),
    paddingVertical: responsiveHeight(0.9),
    width: responsiveWidth(85),
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordparent: {
    borderRadius: responsiveWidth(3),
    borderWidth: responsiveWidth(0.3),
    borderColor: '#D7D7D7',
    marginTop: responsiveHeight(2),
    paddingVertical: responsiveHeight(0.9),
    flexDirection: 'row',
    alignItems: 'center',
    width: responsiveWidth(85),
    alignSelf: 'center',
  },
  txtinputemail: {
    width: responsiveWidth(70),
    paddingLeft: responsiveWidth(3),
    color: '#080808',
    fontFamily: fontFamily.Touche_Regular,
    fontSize: responsiveFontSize(1.95),
  },
  txtinputpassword: {
    width: responsiveWidth(59.5),
    paddingLeft: responsiveWidth(3),
    color: '#080808',
    fontFamily: fontFamily.Touche_Regular,
    fontSize: responsiveFontSize(1.95),
  },

  codeFieldRoot: {
    marginTop: responsiveHeight(4),
    width: responsiveWidth(74),
    alignSelf: 'center',
  },
  cell: {
    width: responsiveWidth(14),
    height: responsiveWidth(17.5),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: responsiveWidth(0.3),
    borderColor: '#00000030',
    textAlign: 'center',
    borderRadius: responsiveWidth(3),
    // backgroundColor: 'red',
  },
  textstyle: {
    fontSize: responsiveFontSize(3.5),
    fontFamily: fontFamily.Touche_Regular,
  },
  focusCell: {
    borderColor: appColor.appColorMain,
  },
});
