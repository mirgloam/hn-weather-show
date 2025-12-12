// 预测工具类 - 实现简单的线性回归算法

/**
 * 线性回归模型
 * 用于预测旅游人数和旅游收入之间的关系
 */
export class LinearRegression {
  private slope: number = 0
  private intercept: number = 0
  private correlation: number = 0
  
  /**
   * 训练模型
   * @param x 自变量数组
   * @param y 因变量数组
   */
  public train(x: number[], y: number[]): void {
    if (x.length !== y.length) {
      throw new Error('x and y must have the same length')
    }
    
    const n = x.length
    let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0, sumY2 = 0
    
    for (let i = 0; i < n; i++) {
      sumX += x[i]
      sumY += y[i]
      sumXY += x[i] * y[i]
      sumX2 += x[i] * x[i]
      sumY2 += y[i] * y[i]
    }
    
    // 计算斜率和截距
    this.slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX)
    this.intercept = (sumY - this.slope * sumX) / n
    
    // 计算相关系数
    const numerator = n * sumXY - sumX * sumY
    const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY))
    this.correlation = numerator / denominator
  }
  
  /**
   * 预测单个值
   * @param x 自变量值
   * @returns 预测的因变量值
   */
  public predict(x: number): number {
    return this.slope * x + this.intercept
  }
  
  /**
   * 预测多个值
   * @param x 自变量数组
   * @returns 预测的因变量数组
   */
  public predictMultiple(x: number[]): number[] {
    return x.map(val => this.predict(val))
  }
  
  /**
   * 获取相关系数
   * @returns 相关系数
   */
  public getCorrelation(): number {
    return this.correlation
  }
  
  /**
   * 获取斜率
   * @returns 斜率
   */
  public getSlope(): number {
    return this.slope
  }
  
  /**
   * 获取截距
   * @returns 截距
   */
  public getIntercept(): number {
    return this.intercept
  }
}

/**
 * 移动平均算法
 * @param data 数据数组
 * @param windowSize 窗口大小
 * @returns 移动平均值数组
 */
export function movingAverage(data: number[], windowSize: number): number[] {
  if (windowSize > data.length) {
    throw new Error('Window size must be less than or equal to data length')
  }
  
  const result: number[] = []
  for (let i = 0; i <= data.length - windowSize; i++) {
    const window = data.slice(i, i + windowSize)
    const average = window.reduce((sum, val) => sum + val, 0) / windowSize
    result.push(average)
  }
  
  return result
}

/**
 * 指数平滑算法
 * @param data 数据数组
 * @param alpha 平滑系数 (0 < alpha < 1)
 * @returns 平滑后的数据数组
 */
export function exponentialSmoothing(data: number[], alpha: number): number[] {
  if (alpha <= 0 || alpha >= 1) {
    throw new Error('Alpha must be between 0 and 1')
  }
  
  const result: number[] = [data[0]]
  
  for (let i = 1; i < data.length; i++) {
    const forecast = alpha * data[i] + (1 - alpha) * result[i - 1]
    result.push(forecast)
  }
  
  return result
}

/**
 * 预测未来值
 * @param data 历史数据数组
 * @param count 预测数量
 * @param method 预测方法 ('linear' | 'movingAverage' | 'exponentialSmoothing')
 * @param params 方法参数
 * @returns 预测值数组
 */
export function forecastFutureValues(
  data: number[],
  count: number,
  method: 'linear' | 'movingAverage' | 'exponentialSmoothing' = 'linear',
  params: any = {}
): number[] {
  const predictions: number[] = []
  
  switch (method) {
    case 'linear': {
      // 使用线性回归预测
      const x = data.map((_, index) => index)
      const lr = new LinearRegression()
      lr.train(x, data)
      
      for (let i = 0; i < count; i++) {
        predictions.push(lr.predict(data.length + i))
      }
      break
    }
    
    case 'movingAverage': {
      // 使用移动平均预测
      const windowSize = params.windowSize || 3
      if (windowSize > data.length) {
        throw new Error('Window size must be less than or equal to data length')
      }
      
      for (let i = 0; i < count; i++) {
        const window = data.slice(-windowSize)
        const average = window.reduce((sum, val) => sum + val, 0) / windowSize
        predictions.push(average)
        data.push(average) // 用于下一次预测
      }
      break
    }
    
    case 'exponentialSmoothing': {
      // 使用指数平滑预测
      const alpha = params.alpha || 0.5
      
      // 首先计算历史数据的指数平滑值
      const smoothedData = [data[0]]
      for (let i = 1; i < data.length; i++) {
        smoothedData.push(alpha * data[i] + (1 - alpha) * smoothedData[i - 1])
      }
      
      // 然后预测未来值
      let lastActual = data[data.length - 1]
      let lastSmoothed = smoothedData[smoothedData.length - 1]
      
      for (let i = 0; i < count; i++) {
        const forecast = alpha * lastActual + (1 - alpha) * lastSmoothed
        predictions.push(forecast)
        lastActual = forecast
        lastSmoothed = forecast
      }
      break
    }
    
    default:
      throw new Error(`Unknown forecast method: ${method}`)
  }
  
  return predictions
}

/**
 * 分析数据趋势
 * @param data 数据数组
 * @returns 趋势分析结果
 */
export function analyzeTrend(data: number[]): {
  trend: 'increasing' | 'decreasing' | 'stable'
  rate: number
} {
  if (data.length < 2) {
    return { trend: 'stable', rate: 0 }
  }
  
  // 使用线性回归计算趋势
  const x = data.map((_, index) => index)
  const lr = new LinearRegression()
  lr.train(x, data)
  
  const slope = lr.getSlope()
  const average = data.reduce((sum, val) => sum + val, 0) / data.length
  const rate = (slope / average) * 100
  
  let trend: 'increasing' | 'decreasing' | 'stable' = 'stable'
  if (slope > 0) {
    trend = 'increasing'
  } else if (slope < 0) {
    trend = 'decreasing'
  }
  
  return { trend, rate: Math.abs(rate) }
}