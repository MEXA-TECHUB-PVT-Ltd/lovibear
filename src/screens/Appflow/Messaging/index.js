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
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  BackHandler,
  Alert,
} from 'react-native';
import Camera from 'react-native-vector-icons/FontAwesome5';
import React, {useState, useEffect, useRef, useCallback} from 'react';
import Right from 'react-native-vector-icons/FontAwesome';
import FastImage from 'react-native-fast-image';
import STYLES from '../../STYLES';
import {Emoji} from 'emoji-mart-native';
import {appColor, appImages} from '../../../assets/utilities';
import ImageView from 'react-native-image-viewing';
import Dialog from 'react-native-dialog';
import ImagePicker from 'react-native-image-crop-picker';
import {
  responsiveWidth,
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import Carousel from 'react-native-snap-carousel';
import RBSheet from 'react-native-raw-bottom-sheet';
import {Picker} from 'emoji-mart-native';
import {fontFamily} from '../../../constants/fonts';
import {
  GiftedChat,
  InputToolbar,
  Composer,
  Send,
  Bubble,
  Message,
  Actions,
} from 'react-native-gifted-chat';
import {useFocusEffect} from '@react-navigation/native';
const Messaging = props => {
  const [messageinput, setMessageinput] = useState('');
  const messagesRef = useRef();
  const imageTakeFromGallery = () => {
    ImagePicker.openPicker({
      mediaType: 'any',
      // cropping: true,
      compressImageQuality: 1,
    }).then(async image => {
      console.log(image.path);
      setMyimage(image.path);
      let myarr = [...messages];
      await myarr.push({
        user: 0,
        time: '12:31',
        media: image.path,
      });
      await setMessages(myarr);
    });
  };
  const imageTakeFromCamera = () => {
    ImagePicker.openCamera({
      compressImageQuality: 1,
      cropping: true,
    }).then(image => {
      console.log(image.path);
      setMyimage(image.path);
    });
  };
  const [visible, setVisible] = useState(false);
  const showDialog = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };
  const [imagevisible, setImagevisible] = useState(false);
  const [myfocus, setMyfocus] = useState('');
  const [myimage, setMyimage] = useState('');

  const [messages, setMessages] = useState([
    {
      user: 0,
      time: '12:13',
      content: 'Hey!',
    },
    {
      user: 1,
      time: '12:15',
      content: 'Hello! How are you?',
    },
    {
      user: 0,
      time: '12:15',
      content: 'Not bad, what about you?',
    },
    {
      user: 0,
      time: '12:13',
      content: 'Hello ???',
    },
  ]);
  const [selectedImage, setSelectedImage] = useState('');
  const images = [{uri: selectedImage}];
  const renderItemMessages = ({item, index}) => {
    return (
      <View style={item.user == 0 ? styles.rightmessage : styles.leftmessage}>
        {item.media == undefined ? (
          <Text style={item.user == 0 ? styles.righttxt : styles.lefttxt}>
            {item.content}
          </Text>
        ) : (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              setSelectedImage(item.media);
              setImagevisible(true);
              console.log(selectedImage);
            }}>
            <Image
              source={{uri: item.media}}
              style={{
                width: responsiveWidth(40),
                height: responsiveWidth(40),
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity>
        )}
      </View>
    );
  };
  const [inputText, setinputText] = useState('');
  const [stateemoji, setStateemoji] = useState(false);
  const [check, setCheck] = useState(true);
  const [currentposition, setCurrentposition] = useState(0);
  useFocusEffect(
    React.useCallback(() => {
      if (stateemoji == true) {
        const backAction = () => {
          setStateemoji(false);
          return true;
        };
        const backHandler = BackHandler.addEventListener(
          'hardwareBackPress',
          backAction,
        );
        return () => backHandler.remove();
      } else {
        BackHandler.removeEventListener();
      }
    }, [stateemoji]),
  );
  return (
    <SafeAreaView style={STYLES.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: responsiveHeight(1),
          borderBottomColor: '#D3D3D3',
          borderBottomWidth: responsiveWidth(0.2),
          paddingBottom: responsiveHeight(2.8),
          //   paddingHorizontal: responsiveWidth(5),
          width: responsiveWidth(90),
          alignSelf: 'center',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
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
              style={{width: responsiveWidth(6), height: responsiveWidth(6)}}
            />
          </TouchableOpacity>
          <View
            style={{
              marginLeft: responsiveWidth(1),
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <Image
              source={appImages.girlimg}
              resizeMode="contain"
              style={{
                width: responsiveWidth(16),
                height: responsiveWidth(16),
                borderRadius: responsiveWidth(100),
              }}
            />
            <View style={{marginLeft: responsiveWidth(2.5)}}>
              <Text style={styles.txt1}>Marlene</Text>
              <Text style={styles.txt2}>Art. Director, 21</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            width: responsiveWidth(12),
            height: responsiveWidth(12),
            backgroundColor: '#FFC6D6',
            borderRadius: responsiveWidth(100),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={appImages.callicon}
            resizeMode="contain"
            style={{
              width: responsiveWidth(6),
              height: responsiveWidth(6),
            }}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        ref={messagesRef}
        keyboardShouldPersistTaps={'always'}
        data={messages}
        onContentSizeChange={() =>
          messagesRef.current?.scrollToEnd({animated: false})
        }
        renderItem={renderItemMessages}
        contentContainerStyle={{
          width: responsiveWidth(90),
          // flex: 1,
          alignSelf: 'center',
          marginTop: responsiveHeight(2),

          // backgroundColor: 'red',
        }}
        ListFooterComponent={() => {
          return <View style={{paddingBottom: responsiveHeight(2)}}></View>;
        }}
      />
      <View style={styles.txtinputview}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.emojicontainer}
          onPress={async () => {
            await Keyboard.dismiss();
            await setStateemoji(!stateemoji);
          }}>
          <Image source={appImages.emojiicon} style={styles.emojistyle} />
        </TouchableOpacity>
        <TextInput
          onFocus={() => {
            // messagesRef.current?.scrollToIndex({
            //   index: messages.length - 1,
            // });
            setStateemoji(false);
          }}
          multiline={true}
          onSelectionChange={event => {
            console.log(
              'SELECTION CHANGE============',
              event.nativeEvent.selection,
              setCurrentposition(event.nativeEvent.selection.end),
            );
          }}
          style={styles.txtinputstyle}
          placeholder={'Message ...'}
          placeholderTextColor={'#fff'}
          value={messageinput}
          onChangeText={text => setMessageinput(text)}
        />

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.sendcontainer}
          onPress={async () => {
            showDialog();
          }}>
          <Image source={appImages.camerawhite} style={styles.emojistyle} />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.sendcontainer}
          onPress={async () => {
            if (messageinput == null || messageinput == '') {
              null;
            } else {
              setMessageinput('');
              let myarr = [...messages];
              await myarr.push({
                user: 0,
                time: '12:31',
                content: messageinput,
              });
              await setMessages(myarr);
            }
          }}>
          <Image source={appImages.sendicon} style={styles.sendiconstyle} />
        </TouchableOpacity>
      </View>
      {stateemoji == true ? (
        <View
          style={{
            backgroundColor: appColor.appColorMain,
          }}>
          <Picker
            color={appColor.appColorMain}
            emojiSize={responsiveFontSize(5)}
            onSelect={item => {
              setMessageinput(
                [
                  messageinput.slice(0, currentposition),
                  item.native,
                  messageinput.slice(currentposition),
                ].join(''),
              );
              //   messagesRef.current?.scrollToIndex({
              //     index: messages.length - 1,
              //   });
            }}
          />
        </View>
      ) : null}
      <Dialog.Container
        visible={visible}
        verticalButtons={true}
        onRequestClose={() => handleCancel()}>
        <Dialog.Title
          style={{
            fontFamily: fontFamily.Touche_Bold,
            alignSelf: 'center',
            color: '#080808',
          }}>
          Upload Photos Or Videos
        </Dialog.Title>
        {/* <Dialog.Description>
            Take a photo or choose from your library
          </Dialog.Description> */}
        <Dialog.Button
          style={{
            fontFamily: fontFamily.Touche_SemiBold,
            alignSelf: 'center',
          }}
          label="Take a Photo"
          onPress={() => {
            imageTakeFromCamera();
            handleCancel();
          }}
          color={appColor.appColorMain}
        />
        <Dialog.Button
          style={{
            fontFamily: fontFamily.Touche_SemiBold,
            alignSelf: 'center',
          }}
          label="Choose from Gallery"
          onPress={() => {
            imageTakeFromGallery();
            handleCancel();
          }}
          color={appColor.appColorMain}
        />
        <Dialog.Button
          style={{
            fontFamily: fontFamily.Touche_SemiBold,

            alignSelf: 'center',
          }}
          label="Cancel"
          onPress={handleCancel}
          color={appColor.appColorMain}
        />
      </Dialog.Container>
      <ImageView
        images={images}
        imageIndex={0}
        visible={imagevisible}
        onRequestClose={() => setImagevisible(false)}
      />
    </SafeAreaView>
  );
};

export default Messaging;

const styles = StyleSheet.create({
  txt1: {
    fontFamily: fontFamily.Touche_SemiBold,
    color: appColor.appColorMain,
    fontSize: responsiveFontSize(2.6),
  },
  txt2: {
    fontFamily: fontFamily.Touche_SemiBold,
    color: appColor.appColorMain,
    fontSize: responsiveFontSize(2.1),
    marginTop: responsiveHeight(0.4),
  },
  sendcontainer: {
    backgroundColor: '#fff',
    width: responsiveWidth(12),
    height: responsiveWidth(12),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: responsiveWidth(100),
  },
  sendiconstyle: {
    width: responsiveWidth(6),
    height: responsiveWidth(6),
    marginRight: responsiveWidth(1),
    resizeMode: 'contain',
  },
  emojicontainer: {
    backgroundColor: '#FF2461',
    width: responsiveWidth(12),
    height: responsiveWidth(12),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: responsiveWidth(100),
  },
  emojistyle: {
    width: responsiveWidth(6),
    height: responsiveWidth(6),
    // marginRight: responsiveWidth(0.7),
    resizeMode: 'contain',
  },
  emojipickerview: {},
  txtemoji: {
    fontSize: responsiveFontSize(2.9),
    color: '#fff',
    // fontFamily: fontFamily.Touche_Regular,
  },
  rightmessage: {
    backgroundColor: appColor.appColorMain,
    paddingHorizontal: responsiveWidth(4),
    borderRadius: responsiveWidth(3),
    borderBottomRightRadius: responsiveWidth(3),
    borderTopRightRadius: responsiveWidth(3),
    marginBottom: responsiveHeight(1),
    alignSelf: 'flex-end',
    paddingVertical: responsiveHeight(1.6),
    marginBottom: responsiveHeight(1.5),
  },
  leftmessage: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(1.6),
    borderRadius: responsiveWidth(3),
    borderBottomRightRadius: responsiveWidth(3),
    borderTopRightRadius: responsiveWidth(3),
    marginBottom: responsiveHeight(1),
    alignSelf: 'flex-start',
    marginBottom: responsiveHeight(1.5),
  },
  righttxt: {
    color: '#fff',
    fontFamily: fontFamily.Touche_Regular,
    fontSize: responsiveFontSize(1.85),
  },
  lefttxt: {
    color: '#000',
    opacity: 0.6,
    fontFamily: fontFamily.Touche_Regular,
    fontSize: responsiveFontSize(1.85),
  },
  txtinputview: {
    backgroundColor: appColor.appColorMain,
    alignItems: 'center',
    width: responsiveWidth(100),
    paddingVertical: responsiveHeight(1.3),
    alignSelf: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: responsiveWidth(2.5),
  },
  txtinputstyle: {
    // backgroundColor: 'red',
    width: responsiveWidth(53),
    fontFamily: fontFamily.Touche_Regular,
    color: '#fff',
    fontSize: responsiveFontSize(2),
    maxHeight: responsiveHeight(20),
  },
});
