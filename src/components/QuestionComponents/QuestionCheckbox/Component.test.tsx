import { render, screen } from '@testing-library/react';
import React from 'react';

import Component from './Component';

test('默认属性', () => {
  render(<Component />);
  const title = screen.getByText('多选标题');
  expect(title).toBeInTheDocument();

  for (let i = 1; i <= 3; i++) {
    const checkbox = screen.getByDisplayValue(`item${i}`);
    expect(checkbox).toBeInTheDocument();
    const label = screen.getByText(`选项 ${i}`);
    expect(label).toBeInTheDocument();

    expect(checkbox.getAttribute('checked')).toBeNull();
  }
});

test('传入属性', () => {
  const list = [
    { value: 'v1', text: 't1', checked: false },
    { value: 'v2', text: 't2', checked: true },
    { value: 'v3', text: 't3', checked: true },
  ];
  render(<Component title="hello" options={list} />);

  const title = screen.getByText('hello');
  expect(title).toBeInTheDocument();

  // 遍历 list
  list.forEach((item) => {
    const { value, checked } = item;
    const checkbox = screen.getByDisplayValue(value);
    expect(checkbox).toBeInTheDocument();

    // 是否选中
    if (checked) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(checkbox.getAttribute('checked')).not.toBeNull();
    } else {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(checkbox.getAttribute('checked')).toBeNull();
    }
  });
});
