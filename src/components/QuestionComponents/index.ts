import QuestionInputConf, { QuestionInputPropsType } from './QuestionInput'
import QuestionTitleConf, { QuestionTitlePropSType } from './QuestionTitle'
import type, { FC } from 'react'
import QuetionParagraphConf, { QuestionParagraphPropsType } from './QuestionParagraph'
import QuestionInfoConf, { QuestionInfoPropsType } from './QuestionInfo'
import QuestionTextareaConf, { QuestionTextareaPropsType } from './QuestionTextarea'
import QuestionRadioConf, { QuestionRadioPropsType } from './QuestionRadio'
import QuetionCheckboxConf, { QuestionCheckboxPropsType } from './QuestionCheckbox'
import { group } from 'console'

// 各个组件的prop type
export type ComponentPropsType = QuestionInputPropsType &
  QuestionTitlePropSType &
  QuestionParagraphPropsType &
  QuestionInfoPropsType &
  QuestionTextareaPropsType &
  QuestionRadioPropsType &
  QuestionCheckboxPropsType

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
  QuestionInfoConf,
  QuestionTextareaConf,
  QuestionRadioConf,
  QuetionCheckboxConf
]

// 组件分组
export const componentConfGroup = [
  {
    groupId: 'textGroup',
    groupName: '文本显示',
    components: [QuestionInfoConf, QuestionTitleConf, QuetionParagraphConf, QuestionTextareaConf]
  },
  {
    groupId: 'inputGroup',
    groupName: '用户输入',
    components: [QuestionInputConf]
  },
  {
    groupId: 'chooseGroup',
    groupName: '用户选择',
    components: [QuestionRadioConf, QuetionCheckboxConf]
  }
]

export function getComponentConfByType(type: string) {
  return componentConfList.find(c => c.type === type)
}