import { EditorState, convertToRaw } from 'draft-js';

export const genEmptyContent = () => {
  return convertToRaw(EditorState.createEmpty().getCurrentContent());
};
