import Mock from 'mockjs'
const Random = Mock.Random

Mock.mock('/api/test', 'get', () => {
  return {
    errno: 0,
    data: {
      name: `cdc${Date.now()}`
    }
  }
})
// 获取单个问卷信息
Mock.mock('/api/question/:id', 'get', () => {
  return {
    errno: 0,
    data: {
      id: Random.id(),
      title: Random.ctitle()
    }
  }
})
// 创建问卷
Mock.mock('/api/question', 'post', () => {
  return {
    errno: 0,
    data: {
      id: Random.id()
    }
  }
})