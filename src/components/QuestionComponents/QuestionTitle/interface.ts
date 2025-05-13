export type QuestionTitlePropSType = {
  text?: string,
  level?: 1 | 2 | 3 | 4 | 5,
  isCenter?: boolean,

  onChange?: (newprops: QuestionTitlePropSType) => void
  disabled?: boolean
}

export const QuestionTitleDefaultProps: QuestionTitlePropSType = {
  text: '一行标题',
  level: 1,
  isCenter: false
}