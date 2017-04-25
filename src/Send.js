import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default class Send extends React.Component {
  // shouldComponentUpdate(nextProps, nextState) {
  //   if (this.props.text.trim().length === 0 && nextProps.text.trim().length > 0 || this.props.text.trim().length > 0 && nextProps.text.trim().length === 0) {
  //     return true;
  //   }
  //   return false;
  // } .
  render() {
    if (this.props.text.trim().length > 0) {
      return (
        <TouchableOpacity
          style={[styles.container, this.props.containerStyle]}
          onPress={() => {
            this.props.onSend({text: this.props.text.trim()}, true);
          }}
          accessibilityTraits="button"
        >
          <Text style={[styles.text, this.props.textStyle]}>{this.props.label}</Text>
        </TouchableOpacity>
      );
    }
    return <View style={[styles.container, this.props.containerStyle, this.props.disabledStyle]}>
      <Text style={[styles.text, this.props.textStyle]}>{this.props.label}</Text>
    </View>;
  }
}

const styles = StyleSheet.create({
  container: {
    height: 49,
    justifyContent: 'flex-end',
  },
  text: {
    color: '#0084ff',
    fontWeight: '600',
    fontSize: 17,
    backgroundColor: 'transparent'
  },
});

Send.defaultProps = {
  text: '',
  onSend: () => {},
  label: 'Send',
  containerStyle: {},
  textStyle: {},
  backgroundStyle: {enabled: null, disabled: null }
};

Send.propTypes = {
  text: React.PropTypes.string,
  onSend: React.PropTypes.func,
  label: React.PropTypes.string,
  containerStyle: View.propTypes.style,
  textStyle: Text.propTypes.style,
};
