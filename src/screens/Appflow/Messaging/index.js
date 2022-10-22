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
import {io} from 'socket.io-client';

import {MyButton} from '../../../components/MyButton';

import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Base_URL} from '../../../Base_URL';
const Messaging = ({route, navigation}) => {
  const [myidstate, setMyIdState] = useState('');
  const [receiveridstate, setReceiverIdState] = useState('');
  const [myindex, setMyindex] = useState();
  const [mychatid, setMyChatId] = useState();
  const [messageinput, setMessageinput] = useState('');
  const {userids} = route.params;
  const messagesRef = useRef();
  const socket = useRef();
  const [trigger, setTrigger] = useState(false);

  const [messages, setMessages] = useState([]);
  useEffect(() => {
    InitiateChat();
  }, []);

  const SetMessagesFunctions = () => {
    socket.current = io('http://192.168.10.8:3000');
    console.log('GETTING MESSAGE');
    socket.current.on('recieve-message', msg => {
      console.log('recieve-message', msg);
      let myvar = msg;
      console.log('MY VAR===', myvar);
      setTheName(msg.text);
      msg && setMessages(prev => [...prev, msg]);
    });
  };
  useEffect(() => {
    SetMessagesFunctions();

    return () => socket.current.close();
  }, []);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     SetMessagesFunctions();
  //   }, []),
  // );

  const InitiateChat = async () => {
    console.log('INITIATING THE CHAT');
    const userid = await AsyncStorage.getItem('userid');
    const filterreceiver = userids.filter(item => {
      return item != userid;
    });
    const receiverid = filterreceiver[0];
    console.log('THE USER ID=======', userid);
    console.log('THE RECEIVER ID=====', receiverid);
    socket.current.emit('new-user-add', userid);
    socket.current.emit('chat-start', {
      senderId: userid,
      receiverId: receiverid,
    });
    socket.current.on('get-users', data => {
      console.log('ALL USERS============', data);
    });
    socket.current.on('chatId-receive', chatId => {
      console.log('CHAT ID============', chatId);
      setMyChatId(chatId);
    });
    setMyIdState(userid);
    setReceiverIdState(receiverid);
  };
  const imageTakeFromGallery = () => {
    ImagePicker.openPicker({
      mediaType: 'any',
    }).then(async image => {
      if (image.duration == undefined) {
        console.log('CHECKING DURATION', image);
        console.log(image.path);
        setMyimage(image.path);
        let myarr = [...messages];
        await myarr.push({
          user: 0,
          time: '12:31',
          media: image.path,
        });
        await setMessages(myarr);
      } else {
        console.log('CHECKING DURATION', image);
        console.log(image.path);
        setMyimage(image.path);
        let myarr = [...messages];
        await myarr.push({
          user: 0,
          time: '12:31',
          media: image.path,
          duration: image.duration,
        });
        await setMessages(myarr);
      }
    });
  };
  const imageTakeFromCamera = () => {
    ImagePicker.openCamera({
      cropping: false,
      width: 300,
      height: 400,
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
  const [thename, setTheName] = useState('Kyo');
  const refContainer = useRef();

  const handleSendMsg = async () => {
    const userid = await AsyncStorage.getItem('Userid');
    console.log('here', user, predata._id);
    socket.current.emit('send-msg', {
      to: predata._id,
      from: user,
      message,
    });

    const msgs = [...messages.reverse()];
    msgs.push({fromSelf: true, message: message});
    setMessages(msgs.reverse());
  };

  const [selectedImage, setSelectedImage] = useState('');
  const images = [{uri: selectedImage}];
  const renderItemMessages = ({item, index}) => {
    return (
      <>
        {item.media == undefined ? (
          <TouchableOpacity
            activeOpacity={0.7}
            onLongPress={() => {
              if (item.senderId == myidstate) {
                setMyindex(index);
                refContainer.current.open();
              } else {
                null;
              }
            }}
            style={
              item.senderId == myidstate
                ? styles.rightmessage
                : styles.leftmessage
            }>
            <Text
              style={
                item.senderId == myidstate ? styles.righttxt : styles.lefttxt
              }>
              {item.text}
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onLongPress={() => {
              if (item.senderId == myidstate) {
                setMyindex(index);
                refContainer.current.open();
              } else {
                null;
              }
            }}
            activeOpacity={0.7}
            style={
              item.senderId == myidstate
                ? styles.rightcontent
                : styles.leftcontent
            }
            onPress={() => {
              if (item.duration == undefined) {
                setSelectedImage(item.media);
                setImagevisible(true);
                console.log(selectedImage);
              } else {
                props.navigation.navigate('VideoScreen', {
                  mysource: item.media,
                });
              }
            }}>
            <Image
              source={{uri: item.media}}
              style={{
                resizeMode: 'cover',
                width: responsiveWidth(59),
                height: responsiveWidth(71),
              }}
              borderRadius={responsiveWidth(2)}
            />
            {item.duration == undefined ? null : (
              <View
                style={{
                  width: responsiveWidth(60.5),
                  height: responsiveWidth(72.5),
                  position: 'absolute',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    width: responsiveWidth(10),
                    height: responsiveWidth(10),
                    backgroundColor: appColor.appColorMain,
                    borderRadius: responsiveWidth(100),
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={appImages.musicplay}
                    style={{
                      width: responsiveWidth(13),
                      height: responsiveWidth(13),
                    }}
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        )}
      </>
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
              style={{width: responsiveWidth(5), height: responsiveWidth(5)}}
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
              <Text style={styles.txt1}>{thename}</Text>
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
              // let thearr = [...messages];
              // thearr.push({
              //   senderId: myidstate,
              //   receiverId: receiveridstate,
              //   text: messageinput,
              //   chatId: mychatid,
              // });
              // setMessages(thearr);

              socket.current.emit('send-message', {
                senderId: myidstate,
                receiverId: receiveridstate,
                text: messageinput,
                chatId: mychatid,
              });

              setMessageinput('');
              setTrigger(!trigger);
              // let myarr = [...messages];
              // await myarr.push({
              //   user: 0,
              //   time: '12:31',
              //   content: messageinput,
              // });
              // await setMessages(myarr);
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
            fontFamily: fontFamily.Baskerville_Old_Face,
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
            fontFamily: fontFamily.Baskerville_Old_Face,
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
            fontFamily: fontFamily.Baskerville_Old_Face,
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
            fontFamily: fontFamily.Baskerville_Old_Face,

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
      <RBSheet
        ref={refContainer}
        openDuration={250}
        animationType="fade"
        customStyles={{
          container: {
            // height: responsiveHeight(50),
            borderTopRightRadius: responsiveWidth(7),
            borderTopLeftRadius: responsiveWidth(7),
          },
        }}>
        <ScrollView
          contentContainerStyle={{
            flex: 1,
            justifyContent: 'space-between',
          }}>
          <Image
            source={appImages.alert}
            style={{
              width: responsiveWidth(18),
              height: responsiveWidth(18),
              alignSelf: 'center',
              marginTop: responsiveHeight(2.8),
            }}
          />
          <View>
            <Text
              style={{
                alignSelf: 'center',
                color: appColor.appColorMain,
                fontFamily: fontFamily.Baskerville_Old_Face,
                fontSize: responsiveFontSize(2.3),
                textAlign: 'center',
                width: responsiveWidth(90),
                marginBottom: responsiveHeight(1.5),
              }}>
              Delete message
            </Text>
            <Text
              style={{
                alignSelf: 'center',
                color: appColor.appColorMain,
                fontFamily: fontFamily.Baskerville_Old_Face,
                fontSize: responsiveFontSize(1.8),
                textAlign: 'center',
                width: responsiveWidth(90),
                marginBottom: responsiveHeight(2),
              }}>
              Are you Sure you wanna Delete this sms?
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginBottom: responsiveHeight(2.8),
              justifyContent: 'space-between',
              width: responsiveWidth(82),
              alignSelf: 'center',
            }}>
            <MyButton
              myStyles={{
                width: responsiveWidth(39),
                backgroundColor: appColor.appColorMain,
              }}
              title={'Yes'}
              itsTextstyle={{
                color: '#fff',
              }}
              onPress={() => {
                let arr = [...messages];
                arr.splice(myindex, 1);
                console.log(arr);
                setMessages([...arr]);
                refContainer.current.close();
              }}
            />
            <MyButton
              myStyles={{
                width: responsiveWidth(39),
                backgroundColor: appColor.appColorMain,
              }}
              title={'No'}
              itsTextstyle={{
                color: '#fff',
              }}
              onPress={() => refContainer.current.close()}
            />
          </View>
        </ScrollView>
      </RBSheet>
    </SafeAreaView>
  );
};

export default Messaging;

const styles = StyleSheet.create({
  txt1: {
    fontFamily: fontFamily.Baskerville_Old_Face,
    color: appColor.appColorMain,
    fontSize: responsiveFontSize(2.6),
  },
  txt2: {
    fontFamily: fontFamily.Baskerville_Old_Face,
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
    // fontFamily: fontFamily.Baskerville_Old_Face,
  },
  rightmessage: {
    backgroundColor: appColor.appColorMain,
    paddingHorizontal: responsiveWidth(4),
    borderRadius: responsiveWidth(3),
    borderBottomRightRadius: responsiveWidth(3),
    borderTopRightRadius: responsiveWidth(3),
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
    alignSelf: 'flex-start',
    marginBottom: responsiveHeight(1.5),
  },
  rightcontent: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: responsiveHeight(1.5),
    width: responsiveWidth(60.5),
    height: responsiveWidth(72.5),
    borderRadius: responsiveWidth(3),
    backgroundColor: appColor.appColorMain,
    overflow: 'hidden',
  },
  leftcontent: {
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: responsiveHeight(1.5),
    width: responsiveWidth(55),
    height: responsiveWidth(70),
  },
  righttxt: {
    color: '#fff',
    fontFamily: fontFamily.Baskerville_Old_Face,
    fontSize: responsiveFontSize(2),
  },
  lefttxt: {
    color: '#000',
    opacity: 0.6,
    fontFamily: fontFamily.Baskerville_Old_Face,
    fontSize: responsiveFontSize(2),
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
    fontFamily: fontFamily.Baskerville_Old_Face,
    color: '#fff',
    fontSize: responsiveFontSize(2),
    maxHeight: responsiveHeight(20),
  },
});
