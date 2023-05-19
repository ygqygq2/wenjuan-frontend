import { render, screen } from '@testing-library/react';
import React from 'react';

import Component from './Component';

test('默认属性', () => {
  render(<Component />);
  const title = screen.getByText('单选标题');
  expect(title).toBeInTheDocument();

  for (let i = 1; i <= 3; i++) {
    const radio = screen.getByDisplayValue(`item${i}`);
    expect(radio).toBeInTheDocument();
    const label = screen.getByText(`选项 ${i}`);
    expect(label).toBeInTheDocument();
  }
});

test('传入属性', () => {
  const opts = [
    { value: 'v1', text: 't1' },
    { value: 'v2', text: 't2' },
    { value: 'v3', text: 't3' },
  ];
  const value = 'v1';
  render(<Component title="hello" options={opts} value={value}></Component>);

  const p = screen.getByText('hello');
  expect(p).toBeInTheDocument();

  for (let i = 1; i <= 3; i++) {
    const curVal = `v${i}`;
    const radio = screen.getByDisplayValue(curVal);
    expect(radio).toBeInTheDocument();
    const label = screen.getByText(`t${i}`);
    expect(label).toBeInTheDocument();

    if (curVal === value) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(radio.getAttribute('checked')).not.toBeNull();
    }
  }
});
