import _ from 'lodash';

const getIndent = (depth, spacesCount = 4) => ' '.repeat(depth * spacesCount - 2);

const stringify = (data, depth) => {
  if (!_.isObject(data)) {
    return String(data);
  }

  const lines = Object
    .entries(data)
    .map(([key, value]) => `${getIndent(depth + 1)}  ${key}: ${stringify(value, depth + 1)}`);

  return `{\n${lines.join('\n')}\n  ${getIndent(depth)}}`;
};

const iter = (nodes, depth) => nodes.map((node) => {
  switch (node.type) {
    case 'added':
      return `${getIndent(depth)}+ ${node.key}: ${stringify(node.value, depth)}`;
    case 'deleted':
      return `${getIndent(depth)}- ${node.key}: ${stringify(node.value, depth)}`;
    case 'changed': {
      const line1 = `${getIndent(depth)}- ${node.key}: ${stringify(node.value1, depth)}`;
      const line2 = `${getIndent(depth)}+ ${node.key}: ${stringify(node.value2, depth)}`;
      return `${line1}\n${line2}`;
    }
    case 'unchanged':
      return `${getIndent(depth)}  ${node.key}: ${stringify(node.value, depth)}`;
    case 'nested': {
      const lines = iter(node.children, depth + 1);
      return `${getIndent(depth)}  ${node.key}: {\n${lines.join('\n')}\n${getIndent(depth)}  }`;
    }
    default:
      throw new Error(`Unknown type: ${node.type}`);
  }
});

const formatStylish = (tree) => `{\n${iter(tree, 1).join('\n')}\n}`;

export default formatStylish;
