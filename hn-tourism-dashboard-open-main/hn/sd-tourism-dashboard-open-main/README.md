# 🏛️ 湖南省智慧旅游数据监控平台

<div align="center">

![Vue](https://img.shields.io/badge/Vue-3.5.13-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.1.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![ECharts](https://img.shields.io/badge/ECharts-5.6.0-AA344D?style=for-the-badge&logo=apache-echarts&logoColor=white)

**🌊 三山四水，智慧旅游，数据驱动未来**

</div>

---

## 📦 项目来源

<div align="center" style="margin-bottom: 8px;">
  <img src="https://img.shields.io/badge/灵感来源-PDD-blueviolet?style=flat-square" alt="UI来源PDD" />
</div>

> 本项目为湖南省旅游数据可视化大屏展示，采用单页面设计，UI界面灵感与部分素材来源于 PDD。主要聚焦于 ECharts 图表的多样化应用与大屏交互体验的实现，适合学习和参考现代数据大屏的开发方式。

> 关于预览: 建议直接克隆项目到本地运行，以获得最佳体验。

## 📊 项目介绍

湖南省智慧旅游数据监控平台是一个基于 Vue 3 + TypeScript + ECharts 构建的数据可视化项目，旨在展示湖南省各地区的旅游相关数据，为旅游管理部门和相关企业提供直观的数据参考。

![大屏预览](/public/doc/大屏预览.png)

---

## ✨ 功能特色

### 🗺️ 地理信息展示

- **湖南省地图**：精确的地理边界和行政区划，支持区域点击交互
- **3D柱状图**：各城市旅游数据立体展示，直观对比不同地区数据
- **动态高亮**：循环高亮显示不同城市数据，增强视觉焦点
- **城市详情**：点击地图区域显示对应城市的A级景区信息

### 📈 数据可视化组件

#### 左侧面板

- **门票收入Top5**：3D立方体柱状图，展示湖南热门景区门票收入排名
- **各市旅游业总收入排名**：实时滚动排名，进度条可视化，显示各城市旅游收入情况
- **年度接待游客比**：双年度对比折线图，展示游客接待量变化趋势
- **旅游人数与收入关系**：散点图展示历年旅游人数与收入的相关性

#### 右侧面板

- **各行业收入**：渐变柱状图，展示旅游相关行业收入情况
- **湖南实时热词**：散点图展示热门旅游关键词，反映当前旅游热点
- **游客接待人数TOP10**：特殊形状柱状图，数值标签显示，突出排名前十的景区

### 🎨 界面特色

- **深色主题**：科技感十足的深色背景，适合大屏展示
- **动态效果**：流畅的动画和过渡效果，提升用户体验
- **响应式设计**：适配不同屏幕尺寸，确保在各种设备上都能正常显示
- **自定义字体**：独特的LED数字字体，增强数据展示的视觉效果
- **无缝滚动**：实现文字轮播等无缝滚动效果

---

## 🛠️ 技术栈

| 技术                     | 版本   | 用途           |
| ------------------------ | ------ | -------------- |
| **Vue**                  | 3.5.13 | 前端框架       |
| **TypeScript**           | 5.7.2  | 类型安全       |
| **Vite**                 | 6.1.0  | 构建工具       |
| **ECharts**              | 5.6.0  | 数据可视化     |
| **Sass**                 | 1.89.2 | CSS预处理器    |
| **Vue3-scroll-seamless** | 1.0.6  | 无缝滚动       |
| **autofit.js**           | 3.2.8  | 大屏自适应缩放 |
| **vue3-odometer**        | 0.1.3  | 数字翻牌效果   |

### 🎯 核心技术特性

- **Vue 3 Composition API**：现代化的组件开发方式，提高代码可维护性
- **TypeScript**：完整的类型定义和类型安全，减少运行时错误
- **ECharts 5**：强大的数据可视化能力，支持多种图表类型和交互方式
- **自定义图形**：3D立方体、特殊形状等自定义图表，满足个性化展示需求
- **动态高亮**：定时器控制的循环高亮效果，增强数据可读性
- **大屏自适应**：自动适配不同分辨率，保证大屏展示效果

---

## 🚀 快速开始

### 环境要求

- Node.js >= 16.0.0
- npm >= 7.0.0 或 pnpm >= 7.0.0

### 安装依赖

```bash
# 克隆项目
git clone https://github.com/your-username/hunan-tourism-dashboard.git

# 进入项目目录
cd hunan-tourism-dashboard

# 安装依赖
npm install
# 或使用 pnpm
pnpm install
```

### 开发运行

```bash
# 启动开发服务器
npm run dev
# 或使用 pnpm
pnpm dev

# 构建生产版本
npm run build
# 或使用 pnpm
pnpm build

# 预览生产版本
npm run preview
# 或使用 pnpm
pnpm preview
```

### 大屏自适应说明

本项目已集成 autofit.js 插件，自动适配各种分辨率，开箱即用，无需手动调整。默认基准分辨率为 1920×1080，适合主流大屏场景。

---

## 📁 项目结构

```
湖南省智慧旅游数据监控平台/
├── src/
│   ├── components/          # 组件目录
│   │   ├── common/         # 通用组件
│   │   ├── leftPanel/      # 左侧面板组件
│   │   ├── rightPanel/     # 右侧面板组件
│   │   ├── CHeader.vue     # 头部组件
│   │   ├── CMap.vue        # 地图组件
│   │   └── CityDetail.vue  # 城市详情组件
│   ├── assets/             # 静态资源
│   │   ├── data/           # 数据文件
│   │   └── images/         # 图片资源
│   ├── styles/             # 样式文件
│   ├── types/              # 类型定义
│   ├── modules/            # 模块文件
│   ├── page/               # 页面组件
│   └── router/             # 路由配置
├── public/                 # 公共资源
├── design/                 # 设计源文件（如 PSD，打包时不会包含）
└── package.json           # 项目配置
```

> 说明：design 文件夹用于存放设计稿（如 PSD 文件），不会被打包进生产环境

---

## 🎨 设计亮点

### 🔧 交互体验

- **循环高亮**：自动循环高亮不同数据项，引导用户关注关键信息
- **无缝滚动**：流畅的列表滚动效果，提升数据展示的连续性
- **响应式布局**：适配不同设备屏幕，确保在各种场景下都能正常显示
- **实时更新**：动态数据更新和展示，模拟实时监控效果
- **地图交互**：支持地图区域点击，显示详细信息

### 📱 组件设计

- **模块化组件**：将不同功能拆分为独立组件，提高代码复用性
- **可配置化**：图表和组件支持参数配置，方便定制不同的展示效果
- **类型安全**：使用 TypeScript 确保组件之间的数据传递类型正确

---

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 改进项目。

### 开发规范

- 使用 TypeScript 进行类型安全开发
- 遵循 Vue 3 Composition API 最佳实践
- 保持代码风格一致，使用 ESLint + Prettier
- 添加适当的注释和文档

### 提交规范

```bash
feat: 添加新功能
fix: 修复bug
docs: 更新文档
style: 代码格式调整
refactor: 代码重构
test: 添加测试
chore: 构建过程或辅助工具的变动
```

---

## 📄 许可证

本项目采用 [MIT License](LICENSE) 开源许可证。

---

## 🙏 致谢

感谢以下开源项目和技术社区的支持：

- [Vue.js](https://vuejs.org/) - 渐进式JavaScript框架
- [ECharts](https://echarts.apache.org/) - 数据可视化图表库
- [Vite](https://vitejs.dev/) - 下一代前端构建工具
- [TypeScript](https://www.typescriptlang.org/) - JavaScript的超集

---

<div align="center">

**🌟 如果这个项目对您有帮助，请给它一个 Star！**

Made with ❤️ for Hunan Tourism

</div>