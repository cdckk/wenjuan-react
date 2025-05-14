import QuestionInputConf, { QuestionInputPropsType } from './QuestionInput'
import QuestionTitleConf, { QuestionTitlePropSType } from './QuestionTitle'
import type, { FC } from 'react'
import QuetionParagraphConf, { QuestionParagraphPropsType } from './QuestionParagraph'
import QuestionInfoConf, { QuestionInfoPropsType } from './QuestionInfo'

// 各个组件的prop type
export type ComponentPropsType = QuestionInputPropsType & QuestionTitlePropSType & QuestionParagraphPropsType & QuestionInfoPropsType

// 组件的配置
export type ComponentConfType = {
  title: string,
  type: string,
  Component: FC<ComponentPropsType>,
  PropComponent: FC<ComponentPropsType>,
  defaultProps: ComponentPropsType
}

// 全部组件配置列表
const componentConfList: ComponentConfType[] = [
  QuestionInputConf,
  QuestionTitleConf,
  QuetionParagraphConf,
  QuestionInfoConf
]

// 组件分组
export const componentConfGroup = [
  {
    groupName: '文本显示',
    components: [QuestionInfoConf, QuestionTitleConf, QuetionParagraphConf]
  },
  {
    groupName: '用户输入',
    components: [QuestionInputConf]
  }
]

export function getComponentConfByType(type: string) {
  return componentConfList.find(c => c.type === type)
}