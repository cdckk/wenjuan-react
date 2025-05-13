import Component from './Component'
import { QuestionInputDefaultProps } from './interface'
import PropComponent from './PropComponent'

export * from './interface'

export default {
  title: '输入框',
  type: 'questionInput',
  Component, // 画布显示的
  PropComponent, // 修改属性的
  defaultProps: QuestionInputDefaultProps
}