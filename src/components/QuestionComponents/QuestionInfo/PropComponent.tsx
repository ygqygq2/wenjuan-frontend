import { Form, Input } from 'antd';
import React, { FC, useEffect } from 'react';

import { QuestionInfoPropsType } from './interface';

const { TextArea } = Input;
const PropComponent: FC<QuestionInfoPropsType> = (props: QuestionInfoPropsType) => {
  const { title, description, onChange, disabled } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ title, description });
  }, [title, description]);

  function handleValuesChange() {
    if (onChange) {
      onChange(form.getFieldsValue());
    }
  }

  return (
    <Form
      layout="vertical"
      initialValues={{ title, description }}
      onValuesChange={handleValuesChange}
      disabled={disabled}
      form={form}
    >
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入问卷标题' }]}>
        <Input></Input>
      </Form.Item>
      <Form.Item label="描述" name="description">
        <TextArea />
      </Form.Item>
    </Form>
  );
};

export default PropComponent;
