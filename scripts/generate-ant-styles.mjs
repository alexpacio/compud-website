import { writeFile } from 'node:fs/promises';
import { createElement, Fragment } from 'react';
import { ConfigProvider, Input } from 'antd';
import { extractStyle } from '@ant-design/static-style-extract';
import { compudTheme } from '../src/lib/design-theme.ts';

const css = extractStyle({
  customTheme: (node) =>
    createElement(ConfigProvider, { theme: compudTheme }, createElement(Fragment, null, node, createElement(Input), createElement(Input.TextArea))),
  includes: [
    'Alert',
    'Badge',
    'Button',
    'Card',
    'Collapse',
    'Radio',
    'Select',
    'Steps',
    'Tabs',
    'Tag',
  ],
});
await writeFile(
  new URL('../src/styles/ant-design.generated.css', import.meta.url),
  css,
);
console.log('Ant Design styles generated for the Compud theme.');
