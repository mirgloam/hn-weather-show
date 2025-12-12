const fs = require('fs');
const path = require('path');

// 读取JSON文件
const jsonPath = path.join(__dirname, 'src', 'assets', 'data', 'A级景区.json');

fs.readFile(jsonPath, 'utf8', (err, data) => {
    if (err) {
        console.error('读取文件失败:', err);
        return;
    }

    try {
        // 解析JSON
        const scenicData = JSON.parse(data);
        console.log('JSON数据读取成功');
        console.log('数据类型:', typeof scenicData);
        console.log('包含的城市数量:', Object.keys(scenicData).length);
        console.log('所有城市:', Object.keys(scenicData));

        // 检查邵阳市数据
        if (scenicData['邵阳市']) {
            console.log('\n邵阳市景区数据:');
            console.log('景区数量:', scenicData['邵阳市'].length);
            console.log('前5个景区:', scenicData['邵阳市'].slice(0, 5));
        } else {
            console.log('\n未找到邵阳市数据');
        }

        // 测试不同格式的城市名
        const testCities = ['邵阳', '邵阳市', '衡阳市', '衡阳'];
        testCities.forEach(city => {
            const data = scenicData[city] || scenicData[`${city}市`] || scenicData[city.replace('市', '')];
            if (data) {
                console.log(`\n${city}的数据:`, data.length, '个景区');
            } else {
                console.log(`\n未找到${city}的数据`);
            }
        });

    } catch (parseErr) {
        console.error('解析JSON失败:', parseErr);
    }
});