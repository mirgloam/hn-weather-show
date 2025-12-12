// 直接导入JSON文件
import scenicData from './src/assets/data/A级景区.json' assert { type: 'json' };

console.log('直接导入JSON数据成功!');
console.log('数据结构类型:', typeof scenicData);
console.log('对象键:', Object.keys(scenicData));

// 检查是否包含预期的城市数据
if (scenicData['衡阳市']) {
  console.log('衡阳市景区数量:', scenicData['衡阳市'].length);
  console.log('衡阳市前3个景区:', scenicData['衡阳市'].slice(0, 3));
}

if (scenicData['张家界市']) {
  console.log('张家界市景区数量:', scenicData['张家界市'].length);
  console.log('张家界市前3个景区:', scenicData['张家界市'].slice(0, 3));
}
