import React, { FC, useEffect } from 'react'
import { Form, Input, Checkbox, Select } from 'antd'
import { QuestionTitlePropSType } from './interface'

const PropComponent: FC<QuestionTitlePropSType> = (props: QuestionTitlePropSType) => {
  const { text, level, isCenter, onChange, disabled } = props
  const [form] = Form.useForm()

  useEffect(()=> {
    form.setFieldsValue({ text, level, isCenter })
  }, [text, level, isCenter])

  function handleValueChange() {
    if (onChange) {
      onChange(form.getFieldsValue())
    }
  }

  return <Form
    layout='vertical'
    onValuesChange={handleValueChange}
    initialValues={{ text, level, isCenter }}
    form={form}
    disabled={disabled}
  >
    <Form.Item label="标题内容" name="text" rules={[{ required: true, message: '请输入标题内容' }]}>
      <Input />
    </Form.Item>
    <Form.Item label="层级" name="level" rules={[{ required: true, message: '请输入标题' }]}>
      <Select options={[
        { value: 1, text: 1 },
        { value: 2, text: 2 },
        { value: 3, text: 3 },
      ]}></Select>
    </Form.Item>
    <Form.Item valuePropName='checked' name="isCenter" rules={[{ required: true, message: '请输入标题内容' }]}>
      <Checkbox>居中显示</Checkbox>
    </Form.Item>
  </Form>
}

export default PropComponent