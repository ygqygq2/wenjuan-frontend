import { render, screen } from '@testing-library/react';
import React from 'react';

import Component from './Component';

test('默认属性', () => {
  render(<Component />);
  const title = screen.getByText('多行输入标题');
  expect(title).toBeInTheDocument();
});

test('传入属性', () => {
  render(<Component title="hello" placeholder="world" />);
  const title = screen.getByText('hello');
  expect(title).toBeInTheDocument();

  const textarea = screen.getByPlaceholderText('world');
  expect(textarea).toBeInTheDocument();
});
