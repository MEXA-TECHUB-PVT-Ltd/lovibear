import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import VideoPlayer from 'react-native-video-player';
import Video from 'react-native-video';
import STYLES from '../../STYLES';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
const VideoScreen = props => {
  const {mysource} = props.route.params;
  return (
    <View style={[STYLES.container, {backgroundColor: 'rgba(0,0,0,0.9)'}]}>
      <StatusBar hidden={true} />

      <VideoPlayer
        style={{
          alignSelf: 'center',
          alignItems: 'center',
        }}
        showDuration
        resizeMode="contain"
        disableControlsAutoHide
        autoplay
        source={{uri: mysource}}
        video={{uri: mysource}}
        // resizeMode="cover"
        customStyles={{
          videoWrapper: {
            alignItems: 'center',
            alignSelf: 'center',
            // flex: 1,
          },
          video: {
            alignItems: 'center',
            alignSelf: 'center',
            flex: 1,
          },
        }}

        // controls
      />
    </View>
  );
};

export default VideoScreen;

const styles = StyleSheet.create({});
