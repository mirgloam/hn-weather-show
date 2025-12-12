<!--  中间地图部分 -->
<template>
  <div class="map" id="map">
    <div class="map-content">
      <CEcharts :option="mapOption" @eclick="handleMapClick" />
      <CityDetail 
        :visible="showCityDetail" 
        :cityName="selectedCity"
        @close="closeCityDetail"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getMapOption } from '@/modules/echartMap'
import CEcharts from './common/CEcharts.vue'
import CityDetail from './CityDetail.vue'

const mapOption = ref(getMapOption())

// 城市详情面板状态
const showCityDetail = ref(false)
const selectedCity = ref('')

// 景区官方网站映射
const scenicSpotUrls: Record<string, string> = {
  '郴州市东江湖旅游区': 'https://www.xn--xhqs09c3ued3bie.net/',
  '南岳衡山旅游区': 'https://mp.weixin.qq.com/s/C_I2m4oVDBtWgiYwsfe69w',
  '张家界武陵源-天门山旅游区(武陵源)': 'http://www.hnzjj.com/',
  '张家界武陵源-天门山旅游区(天门山)': 'http://www.hnzjj.com/index.php/Ticket/show/6.html',
  '湘潭市韶山旅游区': 'https://mp.weixin.qq.com/s/7msc4nxxgMDp3VfTeE4lCA',
  '岳阳楼-君山岛旅游区': 'http://www.yyljsd.com/',
  '长沙市岳麓山-橘子洲旅游区': 'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzI4NDQzNTc5NA==&subscene=0#wechat_redirect',
  '长沙市花明楼景区': 'https://wwj.hunan.gov.cn/wwj/c100359/201407/t20140702_10493407.html',
  '新宁崀山旅游区': 'https://www.langshanhong.com/',
  '常德市桃花源旅游区': 'http://www.cnthy.com.cn/',
  '湘西州矮寨·十八洞·德夯大峡谷景区': 'https://mp.weixin.qq.com/s/1KhkBxNMJKNYYXXEE4tPNA',
  '湘西土家族苗族自治区凤凰古城旅游区': 'https://fhatt.cn/'
}

// 处理地图点击事件
const handleMapClick = (params: any) => {
  // 调试：打印点击事件参数
  console.log('地图点击事件参数:', params)
  
  // 确保点击的是有效元素
  if (params) {
    // 获取点击元素的名称
    let name = ''
    if (params.name) {
      name = params.name
    } else if (params.data && params.data.name) {
      name = params.data.name
    }
    
    // 检查是否点击的是景区标注
    if (scenicSpotUrls[name]) {
      console.log('点击的是景区标注:', name)
      console.log('跳转链接:', scenicSpotUrls[name])
      // 打开景区官方网站
      window.open(scenicSpotUrls[name], '_blank')
    } 
    // 否则处理城市区域点击
    else if (name) {
      console.log('获取到的城市名称:', name)
      selectedCity.value = name
      showCityDetail.value = true
    }
  }
}

// 关闭城市详情面板
const closeCityDetail = () => {
  showCityDetail.value = false
  selectedCity.value = ''
}
</script>

<style scoped>
.map {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.map .map-content {
  position: relative;
  width: 1920px;
  height: 1080px;
}
</style>
