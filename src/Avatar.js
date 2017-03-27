import React from 'react';
import {
  Image,
  StyleSheet,
  View,
} from 'react-native';

import GiftedAvatar from './GiftedAvatar';

import { isSameUser, isSameDay, isSystemMessage, warnDeprecated } from './utils';

export default class Avatar extends React.Component {
  renderAvatar() {
    if (this.props.renderAvatar) {
      const {renderAvatar, ...avatarProps} = this.props;
      return this.props.renderAvatar(avatarProps);
    }
    return (
      <GiftedAvatar
        avatarStyle={StyleSheet.flatten([styles[this.props.position].image, this.props.imageStyle[this.props.position]])}
        user={this.props.currentMessage.user}
      />
    );
  }

  render() {
    if (isSameUser(this.props.currentMessage, this.props.nextMessage) && isSameDay(this.props.currentMessage, this.props.nextMessage) && !isSystemMessage(this.props.currentMessage)) {
      return (
        <View style={[styles[this.props.position].container, this.props.containerStyle[this.props.position]]}/>
      );
    }
    return (
      <View style={[styles[this.props.position].container, this.props.containerStyle[this.props.position]]}>
        {this.renderAvatar()}
      </View>
    );
  }
}

const styles = {
  left: StyleSheet.create({
    container: {
      marginRight: 8,
      width: 36,
    },
    image: {
      height: 36,
      width: 36,
      borderRadius: 18,
    },
  }),
  right: StyleSheet.create({
    container: {
      marginLeft: 8,
    },
    image: {
      height: 36,
      width: 36,
      borderRadius: 18,
    },
  }),
};

Avatar.defaultProps = {
  position: 'left',
  currentMessage: {
    user: null,
  },
  nextMessage: {},
  containerStyle: {},
  imageStyle: {},
  //TODO: remove in next major release
  isSameDay: warnDeprecated(isSameDay),
  isSameUser: warnDeprecated(isSameUser)
};

Avatar.propTypes = {
  position: React.PropTypes.oneOf(['left', 'right']),
  currentMessage: React.PropTypes.object,
  nextMessage: React.PropTypes.object,
  containerStyle: View.propTypes.style,
  imageStyle: React.PropTypes.oneOfType([View.propTypes.style, Image.propTypes.style]),
  //TODO: remove in next major release
  isSameDay: React.PropTypes.func,
  isSameUser: React.PropTypes.func
};
