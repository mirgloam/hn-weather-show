import * as echarts from 'echarts'
import hnData from '@/assets/data/湖南省'
import mapBg from '@/assets/images/mapBg.png'
echarts.registerMap('hn', hnData as any)
// 获取地图配置
export const getMapOption = () => {
  // 渐变层颜色
  const colorList: string[] = [
    '#8b5e70',
    '#81596d',
    '#78556a',
    '#6e5068',
    '#644c65',
    '#5b4762',
    '#51435f',
    '#483e5c',
    '#3e3a59',
    '#343557',
    '#2b3154',
    '#212c51'
  ]
  // 生成渐变图层
  const geoList: any = []
  for (let i = 1; i <= colorList.length; i++) {
    const mapOption: any = {
      map: 'hn',
      aspectScale: 0.85,
      emphasis: {
        disabled: true
      },
      z: 12 - i,
      layoutCenter: ['50%', `${i * 0.3 + 50}%`], //地图位置
      layoutSize: '80%',
      itemStyle: {
        normal: {
          areaColor: colorList[i - 1],
          borderWidth: 0
        }
      }
    }
    if (i === colorList.length) {
      mapOption.itemStyle.normal.shadowColor = 'rgba(0, 0, 0, 0.71)'
      mapOption.itemStyle.normal.shadowBlur = 100
    }
    geoList.push(mapOption)
  }
  // 获取柱状图配置
  const lineSeriesData = getLineData()
  const option = {
    geo: [
      // 最外围发光边界
      {
        map: 'hn',
        aspectScale: 0.85,
        layoutCenter: ['50%', '50%'], //地图位置
        layoutSize: '80%',
        z: 12,
        emphasis: {
          disabled: true
        },
        itemStyle: {
          normal: {
            borderColor: 'rgb(180, 137, 81)',
            borderWidth: 8,
            shadowColor: 'rgba(218, 163, 88, 0.4)',
            shadowBlur: 20
          }
        }
      },
      // 最外层遮罩蒙版
      {
        map: 'hn',
        aspectScale: 0.85,
        layoutCenter: ['50%', '50%'], //地图位置
        layoutSize: '80%',
        z: 14,
        itemStyle: {
          normal: {
            areaColor: 'rgba(106, 125, 171, 0.45)',
            borderWidth: 0
          }
        },
        label: {
          show: true,
          color: '#fff',
          fontSize: 14
        },
        emphasis: {
          disabled: false,
          itemStyle: {
            areaColor: 'rgba(255, 215, 0, 0.5)',
            borderColor: '#ffd700',
            borderWidth: 2
          },
          label: {
            show: true,
            color: '#ffd700',
            fontSize: 16,
            fontWeight: 'bold'
          }
        },
        // 启用点击事件
        select: {
          itemStyle: {
            areaColor: 'rgba(255, 215, 0, 0.7)', // 选中时的颜色
            borderColor: '#ffd700',
            borderWidth: 3
          },
          label: {
            color: '#ffd700',
            fontSize: 18,
            fontWeight: 'bold'
          }
        }
      },
      // 内部蓝色边界
      {
        map: 'hn',
        aspectScale: 0.85,
        layoutCenter: ['50%', '50%'], //地图位置
        layoutSize: '80%',
        z: 12,
        emphasis: {
          disabled: true
        },
        itemStyle: {
          normal: {
            areaColor: {
              image: mapBg
            },
            borderColor: '#8aa5db',
            borderWidth: 1
          }
        }
      },
      ...geoList
    ],
    series: [
      // 地图数据柱子
      ...lineSeriesData,
      // 景区标注
      ...getScenicSpotData()
    ]
  }
  return option
}

// 生成景区标注数据
const getScenicSpotData = () => {
  // 湖南省5A级景区数据
  const scenicSpotData: {
    name: string
    city: string
    value: number
    point: number[]
  }[] = [
    { name: '南岳衡山旅游区', city: '衡阳市', value: 5, point: [112.7385, 27.2183] },
    { name: '张家界武陵源-天门山旅游区(武陵源)', city: '张家界市', value: 5, point: [110.4841, 29.1364] },
    { name: '张家界武陵源-天门山旅游区(天门山)', city: '张家界市', value: 5, point: [110.4717, 29.1262] },
    { name: '湘潭市韶山旅游区', city: '湘潭市', value: 5, point: [112.5555, 27.9089] },
    { name: '岳阳楼-君山岛旅游区', city: '岳阳市', value: 5, point: [113.0810, 29.3531] },
    { name: '长沙市岳麓山-橘子洲旅游区', city: '长沙市', value: 5, point: [112.9469, 28.2322] },
    { name: '长沙市花明楼景区', city: '长沙市', value: 5, point: [112.5688, 28.1026] },
    { name: '郴州市东江湖旅游区', city: '郴州市', value: 5, point: [113.3312, 25.7892] },
    { name: '新宁崀山旅游区', city: '邵阳市', value: 5, point: [110.8528, 26.3075] },
    { name: '常德市桃花源旅游区', city: '常德市', value: 5, point: [111.3960, 28.8113] },
    { name: '湘西州矮寨·十八洞·德夯大峡谷景区', city: '湘西自治州', value: 5, point: [109.6090, 28.3186] },
    { name: '湘西土家族苗族自治区凤凰古城旅游区', city: '湘西自治州', value: 5, point: [109.5981, 27.9105] }
  ]
  
  const scenicSpotSeries: any = []
  
  scenicSpotData.forEach((item: any, index: number) => {
    // 景区标注点
    const spotMarker = {
      type: 'scatter',
      coordinateSystem: 'geo',
      geoIndex: 0,
      zlevel: 10,
      label: {
        show: true,
        position: 'right',
        formatter: item.name,
        color: '#fff',
        fontSize: 10,
        distance: 15,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: [3, 6],
        borderRadius: 3,
        overflow: 'break'
      },
      symbol: 'pin',
      symbolSize: 15,
      itemStyle: {
        color: '#ff4d4f',
        borderColor: '#fff',
        borderWidth: 2
      },
      data: [
        {
          name: item.name,
          value: item.point.concat(item.value),
          city: item.city
        }
      ]
    }
    
    // 标注点动画效果
    const spotEffect = {
      type: 'effectScatter',
      coordinateSystem: 'geo',
      geoIndex: 0,
      zlevel: 9,
      rippleEffect: {
        scale: 4,
        brushType: 'stroke',
        period: 3
      },
      label: {
        show: false
      },
      symbol: 'circle',
      symbolSize: 12,
      itemStyle: {
        color: '#ff4d4f',
        opacity: 0.6
      },
      data: [
        {
          name: item.name,
          value: item.point.concat(item.value)
        }
      ]
    }
    
    scenicSpotSeries.push(spotEffect)
    scenicSpotSeries.push(spotMarker)
  })
  
  return scenicSpotSeries
}

// 生成地图数据柱数据
const getLineData = () => {
  const districtData: {
    name: string
    value: number
    point: number[]
  }[] = [
    {
      name: '长沙市',
      value: 21501.85,
      point: [112.938800, 28.228000]
    },
    {
      name: '株洲市',
      value: 6420.5,
      point: [113.168200, 27.823100]
    },
    {
      name: '湘潭市',
      value: 5301.15,
      point: [112.918500, 27.875700]
    },
    {
      name: '衡阳市',
      value: 7476.36,
      point: [112.562400, 26.900200]
    },
    {
      name: '邵阳市',
      value: 5663.9,
      point: [111.469000, 27.234600]
    },
    {
      name: '岳阳市',
      value: 6074.83,
      point: [113.113200, 29.364400]
    },
    {
      name: '常德市',
      value: 5645.4,
      point: [111.699200, 29.044800]
    },
    {
      name: '张家界市',
      value: 3915.9,
      point: [110.479600, 29.126000]
    },
    {
      name: '益阳市',
      value: 5028.10,
      point: [112.346100, 28.569500]
    },
    {
      name: '郴州市',
      value: 7652.57,
      point: [113.029700, 25.788200]
    },
    {
      name: '永州市',
      value: 1830,
      point: [111.618900, 26.410700]
    },
    {
      name: '怀化市',
      value: 6442.8,
      point: [109.986500, 27.551200]
    },
    {
      name: '娄底市',
      value: 4494.7,
      point: [111.993400, 27.720600]
    },
    {
      name: '湘西土家族苗族自治州',
      value: 6170.2,
      point: [109.726500, 28.314100]
    }
  ]
  const lineSeriesData: any = []
  const maxValue: number = Math.max(...districtData.map(item => item.value))
  districtData.forEach((item: any, index: number) => {
    // 柱子
    const lineData = {
      type: 'lines',
      zlevel: 5,
      effect: {
        show: false,
        symbolSize: 5
      },
      lineStyle: {
        width: 10,
        color: {
          type: 'linear',
          x: 1,
          y: 0,
          x2: 0,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: 'rgba(232, 204, 149, 1)'
            },
            {
              offset: 1,
              color: 'rgba(170, 144, 91, 1)'
            }
          ],
          global: false
        },
        opacity: 1,
        curveness: 0
      },
      label: {
        show: 0,
        position: 'end',
        formatter: '245'
      },
      silent: true,
      data: [
        {
          ...item,
          coords: [item.point, [item.point[0], item.point[1] + item.value / maxValue]]
        }
      ]
    }
    // 柱子顶部
    const lineTop: any = {
      type: 'scatter',
      coordinateSystem: 'geo',
      geoIndex: 0,
      zlevel: 5,
      label: {
        show: false
      },
      symbol: 'circle',
      symbolSize: [10, 5],
      itemStyle: {
        color: 'rgba(255, 255, 179, 1)'
      },
      silent: true,
      data: [
        [item.point[0], item.point[1] + item.value / maxValue],
        [item.point[0], item.point[1] + item.value / maxValue]
      ]
    }
    // 柱子底部
    const lineBottom: any = {
      type: 'scatter',
      coordinateSystem: 'geo',
      geoIndex: 0,
      zlevel: 4,
      label: {
        show: false
      },
      symbol: 'circle',
      symbolSize: [10, 5],
      itemStyle: {
        color: {
          type: 'linear',
          x: 1,
          y: 0,
          x2: 0,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: 'rgba(232, 204, 149, 1)'
            },
            {
              offset: 1,
              color: 'rgba(170, 144, 91, 1)'
            }
          ],
          global: false
        }
      },
      silent: true,
      data: [item.point]
    }
    // 底部光圈
    const lineBottomCircle: any = {
      name: 'Top 5',
      type: 'effectScatter',
      coordinateSystem: 'geo',
      data: [
        {
          name: item['name'],
          value: [item.point[0], item.point[1], item['value']]
        }
      ],
      showEffectOn: 'render',
      rippleEffect: {
        scale: 5,
        brushType: 'stroke'
      },
      label: {
        normal: {
          formatter: '{b}',
          position: 'bottom',
          show: false,
          color: '#fff',
          distance: 10
        }
      },
      symbol: 'circle',
      symbolSize: [20, 10],
      itemStyle: {
        normal: {
          color: 'rgba(232, 204, 149, 1)',
          shadowBlur: 10,
          shadowColor: 'rgba(232, 204, 149, 1)'
        },
        opacity: 1
      },
      zlevel: 4
    }
    // 顶部数值标签（移除排名图标但保留数值显示）
    const lineTopIcon = {
      type: 'scatter',
      coordinateSystem: 'geo',
      geoIndex: 0,
      zlevel: 5,
      label: {
        normal: {
          show: true,
          formatter: function (params: any) {
            return `{cityName|${params.name}}\n {value|${params.data.data}} {unit|万人}`
          },
          rich: {
            cityName: {
              color: 'rgba(201, 211, 234, 1)',
              fontSize: 14,
              padding: [0, 0, 0, 0]
            },
            value: {
              color: 'rgba(255, 187, 94, 1)',
              fontSize: 18,
              fontWeight: 800,
              padding: [0, 0, 0, 0]
            },
            unit: {
              color: 'rgba(255, 187, 94, 1)',
              fontSize: 14
            }
          }
        },
        emphasis: {
          show: true
        }
      },
      // 使用一个小的透明圆点作为标签的参考点
      symbol: 'circle',
      symbolSize: [1, 1],
      itemStyle: {
        color: 'transparent'
      },
      symbolOffset: [0, 0],
      z: 999,
      data: [
        {
          name: item.name,
          data: item.value,
          value: [item.point[0], item.point[1] + item.value / maxValue + 0.2]
        }
      ]
    }
    lineSeriesData.push(lineData)
    lineSeriesData.push(lineTop)
    lineSeriesData.push(lineBottom)
    lineSeriesData.push(lineBottomCircle)
    lineSeriesData.push(lineTopIcon)
  })
  return lineSeriesData
}
