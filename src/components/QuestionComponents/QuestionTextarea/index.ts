import Component from './Component'
import { QuestionTextareaDefaultProps } from './interface'
import PropComponent from './PropComponent'

export * from './interface'

export default {
  title: '多行输入',
  type: 'questionTextarea',
  Component, // 画布显示的
  PropComponent, // 修改属性的
  defaultProps: QuestionTextareaDefaultProps
}