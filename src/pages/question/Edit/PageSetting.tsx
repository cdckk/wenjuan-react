import React, { FC, useEffect } from 'react'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import { Form, Input } from 'antd'
import { resetPageInfo } from '../../../store/pageInfoReducer'
import { useDispatch} from 'react-redux'

const { TextArea } = Input

const PageSetting: FC = () => {
    const pageInfo = useGetPageInfo()
    // const { title, desc, js, css } = pageInfo
    const [form] = Form.useForm()
    const dispatch = useDispatch()

    // 实时更新表单内容
    useEffect(() => {
        form.setFieldsValue(pageInfo)
    }, [pageInfo])

    function handleValuesChange() {
        dispatch(resetPageInfo(form.getFieldsValue()))
    }

    return <Form
        layout='vertical'
        initialValues={pageInfo}
        onValuesChange={handleValuesChange}
        form={form}
    >
        <Form.Item
            label="问卷标题"
            name="title"
            rules={[{ required: true, message: '请输入标题' }]}
        >
            <Input placeholder="请输入标题" />
        </Form.Item>
        <Form.Item
            label="问卷描述"
            name="desc"
        >
            <TextArea placeholder="请输入问卷描述..." />
        </Form.Item>
        <Form.Item
            label="样式代码"
            name="js"
        >
            <TextArea placeholder="请输入 JS 脚本代码..." />
        </Form.Item>
    </Form>
}

export default PageSetting