"use client";

import { RawDraftContentState } from "draft-js";
import { ForwardedRef, useCallback, useImperativeHandle, useRef, useState } from "react";
import React from "react";
import DraftEditor, { DraftEditorRefObject } from "./draft-editor";
import { genEmptyContent } from "./utils/gen-empty-content";

type RichTextInputTarget = {
  value: RawDraftContentState,
  name?: string;
  focus?: () => void;
}

type RichTextInputEvent = {
  target: RichTextInputTarget

}
export type RichTextInputProps = {
  defaultValue?: RawDraftContentState,
  onChange?: (e: RichTextInputEvent) => void;
  onBlur?: (e: RichTextInputEvent) => void;
  name?: string;
}

const Component = ({ defaultValue, onChange, onBlur, name, ...otherProps }: RichTextInputProps, ref: ForwardedRef<RichTextInputTarget>) => {
  const draftEditorRef = useRef<DraftEditorRefObject>(null);
  const [refreshId, setRrefreshId] = useState(new Date().getTime());
  const createRefObjectProxy = useCallback((obj: RichTextInputTarget) => {
    return new Proxy(obj, {
      set(obj, field: keyof RichTextInputTarget, newVal) {
        if (field === 'value') {
          obj[field] = newVal;
          setRrefreshId(new Date().getTime());
        }
        return true;
      }
    })
  }, []);

  const refObjectProxy = useRef<RichTextInputTarget>(createRefObjectProxy({
    value: defaultValue || genEmptyContent(),
    name,
    focus: draftEditorRef.current?.focus
  }));

  const handleChange = useCallback((rawContent: RawDraftContentState) => {
    // Renew RefObject Proxy
    const inputTarget: RichTextInputTarget = {
      value: rawContent,
      name,
      focus: draftEditorRef.current?.focus
    }
    //
    refObjectProxy.current = createRefObjectProxy(inputTarget);
    onChange?.({
      target: inputTarget
    });
  }, [onChange, name]);

  const handleBlur = useCallback(() => {
    const inputTarget: RichTextInputTarget = {
      value: refObjectProxy.current.value,
      name,
      focus: draftEditorRef.current?.focus
    }
    //
    refObjectProxy.current = createRefObjectProxy(inputTarget);
    onBlur?.({
      target: inputTarget
    })
  }, [onBlur, name]);

  useImperativeHandle(ref, () => {
    return refObjectProxy.current;
  }, []);

  return (
    <DraftEditor refreshId={refreshId} ref={draftEditorRef} value={refObjectProxy.current.value} onChange={handleChange} onBlur={handleBlur} {...otherProps} />
  )
}

export const RichTextInput = React.memo(
  React.forwardRef<RichTextInputTarget, RichTextInputProps>(Component)
);

export default RichTextInput;