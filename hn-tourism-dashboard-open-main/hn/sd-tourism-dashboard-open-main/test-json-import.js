// 测试JSON文件导入
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// 获取当前文件路径
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 读取JSON文件
const jsonPath = join(__dirname, 'src/assets/data/A级景区.json');

async function testJsonImport() {
  try {
    // 读取文件内容
    const data = await readFile(jsonPath, 'utf8');
    
    // 解析JSON数据
    const scenicData = JSON.parse(data);
    console.log('JSON文件解析成功!');
    console.log('数据结构类型:', typeof scenicData);
    console.log('城市数量:', Object.keys(scenicData).length);
    
    // 输出前几个城市的名称
    const cities = Object.keys(scenicData).slice(0, 5);
    console.log('前5个城市:', cities);
    
    // 输出第一个城市的景区数量
    if (cities.length > 0) {
      const firstCity = cities[0];
      console.log(`${firstCity}的景区数量:`, scenicData[firstCity].length);
      console.log(`${firstCity}的前3个景区:`, scenicData[firstCity].slice(0, 3));
    }
  } catch (err) {
    console.error('处理JSON文件失败:', err);
  }
}

testJsonImport();