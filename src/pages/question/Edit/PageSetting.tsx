import { Form, Input } from 'antd';
import React, { FC, useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { useGetPageInfo } from '@/hooks/useGetPageInfo';
import { resetPageInfo } from '@/store/pageInfoReducer';

const { TextArea } = Input;

const PageSetting: FC = () => {
  const pageInfo = useGetPageInfo();
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    form.setFieldsValue(pageInfo);
  }, [pageInfo]);

  function handleValuesChange() {
    dispatch(resetPageInfo(form.getFieldsValue()));
  }

  return (
    <Form layout="vertical" initialValues={pageInfo} onValuesChange={handleValuesChange} form={form}>
      <Form.Item label="问卷标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
        <Input placeholder="请输入标题"></Input>
      </Form.Item>
      <Form.Item label="问卷描述" name="desc">
        <TextArea placeholder="问卷描述..."></TextArea>
      </Form.Item>
      <Form.Item label="样式代码" name="css">
        <TextArea placeholder="输入 css 样式代码..."></TextArea>
      </Form.Item>
      <Form.Item label="脚本代码" name="js">
        <TextArea placeholder="输入 js 脚本代码..."></TextArea>
      </Form.Item>
    </Form>
  );
};

export default PageSetting;
