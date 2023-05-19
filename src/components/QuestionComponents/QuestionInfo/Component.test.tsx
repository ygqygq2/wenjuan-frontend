import { render, screen } from '@testing-library/react';
import React from 'react';

import Component from './Component';

test('默认属性', () => {
  render(<Component></Component>);
  const h = screen.getByText('问卷标题');
  expect(h).toBeInTheDocument();
});
