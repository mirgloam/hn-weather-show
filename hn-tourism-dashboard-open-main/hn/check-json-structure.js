// 直接导入JSON文件
import scenicData from './src/assets/data/A级景区.json' assert { type: 'json' };

console.log('JSON文件结构:');
console.log('类型:', typeof scenicData);
console.log('键:', Object.keys(scenicData));

// 如果有features字段（GeoJSON格式）
if (scenicData.features) {
    console.log('\n这是GeoJSON格式:');
    console.log('features数量:', scenicData.features.length);
    if (scenicData.features.length > 0) {
        console.log('第一个feature结构:', scenicData.features[0]);
    }
}

// 如果是城市为键的结构
else {
    console.log('\n这是城市为键的结构:');
    console.log('城市数量:', Object.keys(scenicData).length);
    console.log('所有城市:', Object.keys(scenicData));
}

// 尝试查找包含'邵阳'的任何数据
console.log('\n查找包含邵阳的数据:');
for (const [key, value] of Object.entries(scenicData)) {
    if (key.includes('邵阳')) {
        console.log('找到键:', key);
        console.log('值:', value);
    }
}
