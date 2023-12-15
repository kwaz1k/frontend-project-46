import path from 'node:path';
import { readFileSync } from 'node:fs';
import _ from 'lodash';

const resolvePath = (filePath) => (filePath.includes('__fixtures__')
  ? path.resolve(process.cwd(), filePath)
  : path.resolve(process.cwd(), `__fixtures__/${filePath}`));

const readFileAndParseJSON = (filePath) => {
  const fileContent = readFileSync(filePath, 'utf-8');
  return JSON.parse(fileContent);
};

const buildDiff = (data1, data2) => {
  const keys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));

  const result = ['{'];
  for (const key of keys) {
    const value1 = data1[key];
    const value2 = data2[key];

    if (!Object.hasOwn(data1, key)) {
      result.push(` + ${key}: ${value2}`);
    } else if (!Object.hasOwn(data2, key)) {
      result.push(` - ${key}: ${value1}`);
    } else if (value1 === value2) {
      result.push(`   ${key}: ${value1}`);
    } else {
      result.push(` - ${key}: ${value1}`);
      result.push(` + ${key}: ${value2}`);
    }
  }
  result.push('}');
  return result.join('\n');
};

const gendiff = (filePath1, filePath2) => {
  const path1 = resolvePath(filePath1);
  const path2 = resolvePath(filePath2);

  const data1 = readFileAndParseJSON(path1);
  const data2 = readFileAndParseJSON(path2);

  return buildDiff(data1, data2);
};

export default gendiff;
