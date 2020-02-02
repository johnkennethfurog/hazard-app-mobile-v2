export const getImageSource = image => {
  switch (image) {
    case 'riverside':
      return require('../images/riverside.png');
    case 'earthquake':
      return require('../images/earthquake.png');
    case 'erosion':
      return require('../images/erosion.png');
    case 'fire':
      return require('../images/fire.png');
    case 'flood':
      return require('../images/flood.png');
    case 'landslide':
      return require('../images/landslide.png');
    case 'storm':
      return require('../images/storm.png');
    case 'tsunami':
      return require('../images/tsunami.png');
    case 'volcano':
      return require('../images/volcano.png');
    default:
      return require('../images/wildfire.png');
  }
};
