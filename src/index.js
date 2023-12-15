import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import buildTree from './buildTree.js';
import formatData from './formatters/index.js';

const buildAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);
const getFormat = (filepath) => path.extname(filepath).slice(1);
const getData = (filepath) => parse(fs.readFileSync(filepath, 'utf-8'), getFormat(filepath));

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
    const data1 = getData(buildAbsolutePath(filepath1));
    const data2 = getData(buildAbsolutePath(filepath2));
    const tree = buildTree(data1, data2);

    return formatData(tree, formatName);
};

export default genDiff;