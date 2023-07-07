import { render } from '@testing-library/react';

import RichTextInput from './rich-text-input';

describe('ReactDraftWysiwygInput', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RichTextInput />);
    expect(baseElement).toBeTruthy();
  });
});
