import { RawDraftContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

export const valueToHtml = (
  rawDraftContentState: RawDraftContentState
): string => {
  try {
    return draftToHtml(rawDraftContentState);
  } catch (e) {
    console.error('rich-text-to-html.error');
    return '';
  }
};
