import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import moment from 'moment/min/moment-with-locales.min';

export default class Time extends React.Component {
  render() {
    let status;
    if (!this.props.currentMessage.posted) {
      status = "Sending…";
    } else if (this.props.user._id === this.props.currentMessage.user._id) {
      status = "Sent " + moment(this.props.currentMessage.createdAt).locale(this.context.getLocale()).format('h:mma');
    } else if (this.props.currentMessage.user._id) {
      status = "Received " + moment(this.props.currentMessage.createdAt).locale(this.context.getLocale()).format('h:mma');
    }
    return (
      <View style={[styles[this.props.position].container, this.props.containerStyle[this.props.position]]}>
        <Text style={[styles[this.props.position].text, this.props.textStyle[this.props.position]]}>
          {status}
        </Text>
      </View>
    );
  }
}

const containerStyle = {
  marginBottom: 5,
};

const textStyle = {
  fontSize: 10,
  backgroundColor: 'transparent',
  textAlign: 'right',
};

const styles = {
  left: StyleSheet.create({
    container: {
      ...containerStyle,
    },
    text: {
      color: '#aaa',
      ...textStyle,
    },
  }),
  right: StyleSheet.create({
    container: {
      ...containerStyle,
    },
    text: {
      color: '#fff',
      ...textStyle,
    },
  }),
};

Time.contextTypes = {
  getLocale: React.PropTypes.func,
};

Time.defaultProps = {
  position: 'left',
  currentMessage: {
    createdAt: null,
  },
  containerStyle: {},
  textStyle: {},
};

Time.propTypes = {
  position: React.PropTypes.oneOf(['left', 'right']),
  currentMessage: React.PropTypes.object,
  containerStyle: React.PropTypes.shape({
    left: View.propTypes.style,
    right: View.propTypes.style,
  }),
  textStyle: React.PropTypes.shape({
    left: Text.propTypes.style,
    right: Text.propTypes.style,
  }),
};
