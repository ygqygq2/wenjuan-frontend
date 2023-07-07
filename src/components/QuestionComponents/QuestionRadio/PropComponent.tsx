import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Select, Space } from 'antd';
import { nanoid } from 'nanoid';
import React, { FC, useEffect } from 'react';

import { OptionType, QuestionRadioPropsType } from './interface';

const PropComponent: FC<QuestionRadioPropsType> = (props: QuestionRadioPropsType) => {
  const { title, isVertical, value, options = [], onChange, disabled } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ title, isVertical, value, options });
  }, [title, isVertical, value, options]);

  function handleValuesChange() {
    if (onChange == null) return;
    // 触发 onChange 函数
    const newValues = form.getFieldsValue() as QuestionRadioPropsType;

    // eslint-disable-next-line @typescript-eslint/no-shadow
    const { options = [] } = newValues;
    options.forEach((opt) => {
      if (opt.value) return;
      opt.value = nanoid(5); // 补齐 opt value
    });

    onChange(newValues);
  }

  return (
    <Form
      layout="vertical"
      initialValues={{ title, isVertical, value, options }}
      form={form}
      onValuesChange={handleValuesChange}
      disabled={disabled}
    >
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
        <Input></Input>
      </Form.Item>
      <Form.Item label="选项">
        <Form.List name="options">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name }, index) => {
                return (
                  <Space key={key} align="baseline">
                    <Form.Item
                      name={[name, 'text']}
                      rules={[
                        { required: true, message: '请输入选项文字' },
                        {
                          validator: (_, text) => {
                            // eslint-disable-next-line @typescript-eslint/no-shadow
                            const { options = [] } = form.getFieldsValue();
                            let num = 0;
                            options.forEach((opt: OptionType) => {
                              if (opt.text === text) num++; // 记录 text 相同的个数，预期只有 1 个（自己）
                            });
                            if (num === 1) return Promise.resolve();
                            return Promise.reject(new Error('和其他选项重复了'));
                          },
                        },
                      ]}
                    >
                      <Input
                        placeholder="输入选项文字..."
                        onBlur={(e) => {
                          const text = e.target.value;
                          // 如果输入为空，那么就删除这个选项
                          if (text === '' || text == null) {
                            remove(name);
                          }
                          return text;
                        }}
                      ></Input>
                    </Form.Item>
                    {index > 1 && (
                      <MinusCircleOutlined
                        onClick={() => {
                          remove(name);
                        }}
                      ></MinusCircleOutlined>
                    )}
                  </Space>
                );
              })}
              <Form.Item>
                <Button
                  type="link"
                  onClick={() => {
                    // eslint-disable-next-line @typescript-eslint/no-shadow
                    const values = form.getFieldsValue();
                    const { options = [] } = values;
                    // 如果存在空的选项，那么就不添加新的选项
                    if (!options.some((opt: OptionType) => opt.text === '')) {
                      add({
                        text: '',
                      });
                    }
                  }}
                  icon={<PlusOutlined></PlusOutlined>}
                  block
                >
                  添加选项
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>
      <Form.Item label="默认选中" name="value">
        {/* eslint-disable-next-line @typescript-eslint/no-shadow */}
        <Select value={value} options={options.map(({ text, value }) => ({ value, label: text || '' }))}></Select>
      </Form.Item>
      <Form.Item valuePropName="checked" name="isVertical">
        <Checkbox>竖向排列</Checkbox>
      </Form.Item>
    </Form>
  );
};

export default PropComponent;
