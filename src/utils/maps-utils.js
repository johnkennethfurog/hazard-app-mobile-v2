import Geolocation from '@react-native-community/geolocation';

export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => resolve(position),
      e => {
        reject(e);
        console.log('reject(e)', e);
      },
    );
  });
};
