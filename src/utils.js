import moment from 'moment';

const DEPRECATION_MESSAGE = 'isSameUser and isSameDay should be imported from the utils module instead of using the props functions';
const SYSTEM_MESSAGE_TYPES = ['Viewing', 'Property', 'Offers'];

export function isSameDay(currentMessage = {}, diffMessage = {}) {

  let currentCreatedAt = moment(currentMessage.createdAt);
  let diffCreatedAt = moment(diffMessage.createdAt);

  if (!currentCreatedAt.isValid() || !diffCreatedAt.isValid()) {
    return false;
  }

  return currentCreatedAt.isSame(diffCreatedAt, 'day');

}

export function isSameUser(currentMessage = {}, diffMessage = {}) {

  return !!(diffMessage.user && currentMessage.user && diffMessage.user._id === currentMessage.user._id);

}

export function isRecent(currentMessage = {}, diffMessage = {}) {

  let currentCreatedAt = moment(currentMessage.createdAt);
  let diffCreatedAt = moment(diffMessage.createdAt);

  if (!currentCreatedAt.isValid() || !diffCreatedAt.isValid()) {
    return false;
  }

  return currentCreatedAt.diff(diffCreatedAt, 'minutes', true) > - 2;

}

export function isSystemMessage(currentMessage = {}) {

  return SYSTEM_MESSAGE_TYPES.includes(currentMessage.type);

}

export function warnDeprecated(fn) {

  return (...args) => {
    console.warn(DEPRECATION_MESSAGE);
    return fn(...args);
  };

}
