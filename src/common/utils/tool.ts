/**
 * 对象数组去重
 * @param arr 对象数组
 */
export const objArrayRepeat = (arr) => {
  const unique = {};
  arr.forEach(function (item) {
    // 键名不会重复
    unique[JSON.stringify(item)] = item;
  });
  arr = Object.keys(unique).map(function (u) {
    // Object.keys()返回对象的所有键值组成的数组，map方法是一个遍历方法，返回遍历结果组成的数组.将unique对象的键名还原成对象数组
    return JSON.parse(u);
  });
  return arr;
};

/**
 * 把id和pid组合成树
 * @param {array} [arr] 需要组合的数组
 */
export const idPidToTree = (arr) => {
  // 使用reduce给数组定义一个方法
  const formatObj = arr.reduce((pre, cur) => {
    return { ...pre, [cur['id']]: cur };
  }, {});
  // 构造新的数据
  const formatArray = arr.reduce((arr, cur) => {
    const pid = cur.pid ? cur.pid : 0;
    const parent = formatObj[pid];
    if (parent) {
      parent.children ? parent.children.push(cur) : (parent.children = [cur]);
    } else {
      arr.push(cur);
    }
    return arr;
  }, []);
  return formatArray;
};
