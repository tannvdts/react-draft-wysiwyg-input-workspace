# react-draft-wysiwyg-input

This library was generated with [Nx](https://nx.dev).

Video Demo:  https://s11.gifyu.com/images/SW2R8.gif

# Usage
> `import {RichTextInput} from '@tonz/react-draft-wysiwyg-input'`
> 
> `import '@tonz/react-draft-wysiwyg-input/style.css';`

You can import css from `@tonz/react-draft-wysiwyg-input/style.css` or from `react-draft-wysiwyg/dist/react-draft-wysiwyg.css`

# Use Case
When you using `react-draft-wysiwyg` in your form, you cannot handle it as uncontrolled input.
With `react-hook-form`, you only using `react-draft-wysiwyg` with Controller because `react-draft-wysiwyg` have properties is difference primitive input props `{value, onChange, onBlur, name, ref}`

# About react-draft-wysiwyg-input
This libray port `react-draft-wysiwyg` to the interface similar with  primitive input with `{value, onChange, onBlur, name, ref}`
Therefore, **we can using it as uncontrolled input**

# Example with react-hook-form

> `import {RichTextInput} from '@tonz/react-draft-wysiwyg-input'`
> 
> `import '@tonz/react-draft-wysiwyg-input/style.css';`
> 
> `<RichTextInput disabled={disabled} {...register('desc')} />`


```
"use client";
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { useForm } from "react-hook-form";
import { RichTextInput } from '@tonz/react-draft-wysiwyg-input';
import '@tonz/react-draft-wysiwyg-input/style.css';
....

const resolver = classValidatorResolver(SignupFormModel);

export default function SignupForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormModel>({ resolver });

  const { data: successData, isFetching, callApi } = useCallApiLazy({
    fn: async (data: SignupFormModel) => {
      const response = await fetch('/api/user/register', {
        method: 'POST',
        body: JSON.stringify({
          username: data.username,
          password: data.password,
        })
      });
      return response;
    },
    onSuccess: () => {
      toast('Register success', {
        type: 'success', onClose: () => {
          router.push('/api/auth/signin');
        },
        autoClose: 2000,
      });
    },
    onError: (error) => {
      toast(error || 'Register fail', { type: 'error' });
    }
  })
  const submitForm = useCallback(async (data: SignupFormModel) => {
    console.log('>>>>>>> data:', data);
  }, []);

  const disabled = isFetching || !!successData;
  return (
    <div className="flex items-center justify-center w-full">
      <form
        onSubmit={handleSubmit(submitForm)}
        className="px-8 pt-6 pb-8 mb-4 bg-white rounded-md shadow-md w-96"
      >
        <div className="mb-4">
          <Label className="block mb-2 ">Username</Label>
          <Input disabled={disabled} className="w-full" placeholder="Username" {...register('username')} />
          {errors.username && <ErrorHint data-testid="usernameError">{errors.username.message}</ErrorHint>}
        </div>

        ...

        <div className="mb-6">
          <Label className="block mb-2 ">Desc</Label>
          <RichTextInput disabled={disabled} {...register('desc')} />
          {errors.desc && <ErrorHint data-testid="confirmPasswordError">{errors.desc.message}</ErrorHint>}
        </div>

        <div className="flex items-center space-x-2">
          <PrimaryButton disabled={disabled} loading={isFetching} type="submit">Signup</PrimaryButton>
          <SecondaryButton disabled={disabled}>Cancel</SecondaryButton>
        </div>
      </form>
    </div>
  );
}

```

# Some build-in validators with class-validator

> import {
> 
>   RichTextIsNotEmpty,
> 
>   ContentHtmlMinLength,
> 
>   ContentHtmlMaxLength,
> 
> } from '@tonz/react-draft-wysiwyg-input/validators';

##### RichTextIsNotEmpty()
Using for check should not empty value

##### ContentHtmlMinLength()
Using for check minLength of value (process include convert value to html string, then check min length of html string)

##### ContentHtmlMaxLength()
Using for check maxLength of value (process include convert value to html string, then check max length of html string)

```
import { Length, IsNotEmpty } from 'class-validator';
import { Match } from '../validator';
import {
  RichTextIsNotEmpty,
  ContentHtmlMinLength,
  ContentHtmlMaxLength,
} from '@tonz/react-draft-wysiwyg-input/validators';
class SignupFormModel {
  @Length(4, 30)
  @IsNotEmpty()
  username: string;

  @Length(6, 30)
  @IsNotEmpty()
  password: string;

  @Length(6, 30)
  @IsNotEmpty()
  @Match('password')
  confirmPassword: RawDraftContentState;

  @RichTextIsNotEmpty()
  @ContentHtmlMinLength(30)
  @ContentHtmlMaxLength(60)
  desc: RawDraftContentState;
}
```

# Some Utilities function
##### genEmptyContent()
Generate empty data for input with type RawDraftContentState (https://github.com/facebookarchive/draft-js/blob/main/src/model/encoding/RawDraftContentState.js)

> `import { genEmptyContent } from '@tonz/react-draft-wysiwyg-input/utils'`
>
> `const initContent = genEmptyContent()`

##### valueToHtml()
Convert value from RawDraftContentState to html string;
> `import { valueToHtml } from '@tonz/react-draft-wysiwyg-input/utils'`
> 
> `const htmlStr = valueToHtml()`


# Next step
You can read code in this library, and you can port any complex component in React-Select, Antd, MUI to uncontrolled component like primitive input.