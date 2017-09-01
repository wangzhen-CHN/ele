/**
 * 使用mockjs来mock数据, 提供mock数据API接口
 */
import Mock from 'mockjs'
import data from './data.json'

//注册接口
Mock.mock('/api/goods', {
  code: 0,
  data: data.goods
})
Mock.mock('/api/ratings', {
  code: 0,
  data: data.rating
})
Mock.mock('/api/seller', {
  code: 0,
  data: data.seller
})

// 不用export