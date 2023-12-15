import formatStylish from './stylish.js';
import formatPlain from './plain.js';

const formatData = (data, format) => {
  switch (format) {
    case 'stylish':
      return formatStylish(data);
    case 'plain':
      return formatPlain(data);
    case 'json':
      return JSON.stringify(data, null, 2);
    default:
      throw new Error(`Unknown format: ${format}`);
  }
};
export default formatData;
