"use client";

import { RawDraftContentState } from "draft-js";
import React, { ForwardedRef, SyntheticEvent, useImperativeHandle, useRef } from "react";
import { Editor, EditorProps } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export type DraftEditorRefObject = {
  focus: () => void;
};

interface DraftEditorProps extends Omit<EditorProps, 'onChange' | 'onBlur' | 'editorState' | 'initialContentState' | 'onContentStateChange'> {
  value: RawDraftContentState,
  refreshId?: number;
  onChange?: (value: RawDraftContentState) => void;
  onBlur?: () => void;
}

const toolbarDefault = {
  list: {
    indent: {
      className: '!hidden'
    },
    outdent: {
      className: '!hidden'
    }
  }
}

const DraftEditor = ({ value, onChange, toolbar, onBlur, refreshId, editorClassName, ...otherProps }: DraftEditorProps, ref: ForwardedRef<DraftEditorRefObject>) => {
  const editorRef = useRef<object>();

  const handleChange = (drawDraftContentState: RawDraftContentState) => {
    onChange?.(drawDraftContentState);
  }

  const handleBlur = (_event: SyntheticEvent) => {
    _event.stopPropagation();
    onBlur?.()
  }

  useImperativeHandle(ref, () => {
    return {
      focus: () => {
        (editorRef.current as any)?.focus?.();
      },
    }
  }, []);
  return (
    <Editor
      editorClassName={`${editorClassName || ''} refreshId_${refreshId}`}
      editorRef={(editorInputRef) => { editorRef.current = editorInputRef }}
      contentState={value}
      onContentStateChange={handleChange}
      toolbar={toolbar || toolbarDefault}
      onBlur={handleBlur}
      {...otherProps}
    />
  )
}

export default React.memo(React.forwardRef<DraftEditorRefObject, DraftEditorProps>(DraftEditor));