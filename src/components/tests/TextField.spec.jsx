import { screen, cleanup } from '@testing-library/react';
import React from 'react';

import TextField from '@/components/TextField';
import render from '@/utils/test/render';

const PLACEHOLDER_TEXT = '텍스트를 입력해 주세요.';
const PLACEHOLDER_PRODUCT = '상품명을 입력해주세요.';

afterEach(cleanup);

const setup = async (props = {}) => {
  const utils = await render(<TextField {...props} />);
  const textInput = screen.getByPlaceholderText(
    props.placeholder || PLACEHOLDER_TEXT,
  );
  return {
    ...utils,
    textInput,
  };
};

describe('TextField', () => {
  it('className을 props로 설정한 css class가 적용된다.', async () => {
    const { textInput } = await setup({ className: 'my-class' });
    expect(textInput).toHaveClass('my-class');
  });

  it('기본 placeholder "텍스트를 입력해 주세요." 가 노출된다.', async () => {
    const { textInput } = await setup();
    expect(textInput).toBeInTheDocument();
  });

  it('placeholder props에 따라 placeholder가 변경된다.', async () => {
    const { textInput } = await setup({
      placeholder: PLACEHOLDER_PRODUCT,
    });
    expect(textInput).toBeInTheDocument();
  });

  it('텍스트를 입력하면 onChange props로 등록한 이벤트가 발생한다.', async () => {
    const spy = vi.fn();
    const { user, textInput } = await setup({ onChange: spy });
    await user.type(textInput, '테스트');
    expect(spy).toHaveBeenCalledWith('테스트');
  });

  it('엔터키를 입력하면 onEnter props로 등록한 이벤트가 발생한다.', async () => {
    const spy = vi.fn();
    const { user, textInput } = await setup({ onEnter: spy });
    await user.type(textInput, 'test{Enter}');
    expect(spy).toHaveBeenCalledWith('test');
  });

  it('포커스가 활성화되면 onFocus props로 등록한 함수가 호출된다.', async () => {
    const spy = vi.fn();
    const { user, textInput } = await setup({ onFocus: spy });
    await user.click(textInput);
    expect(spy).toHaveBeenCalled();
  });

  it('포커스가 활성화되면 border 스타일이 추가된다.', async () => {
    const { user, textInput } = await setup();
    await user.click(textInput);
    expect(textInput).toHaveStyle({
      borderWidth: 2,
      borderColor: 'rgb(25, 118, 210)',
    });
  });
});
