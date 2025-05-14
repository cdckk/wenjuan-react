/**
 * @description 问卷 - 段落
 */

import Component from "./Component"
import PropComponent from "./PropComponent"
import { QuestionParagraphDefaultProps } from './interface'

export * from './interface'

export default {
    title: '段落',
    type: 'questionParagraph',
    Component,
    PropComponent,
    defaultProps: QuestionParagraphDefaultProps,
}