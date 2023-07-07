import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { RawDraftContentState } from 'draft-js';
import { valueToHtml } from '../utils/value-to-html';

export function ContentHtmlMinLength(
  minLength: number,
  validationOptions?: ValidationOptions
) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [minLength],
      validator: ContentHtmlMinLengthConstraint,
    });
  };
}

@ValidatorConstraint({ name: 'ContentHtmlMinLength' })
export class ContentHtmlMinLengthConstraint
  implements ValidatorConstraintInterface
{
  validate(value: RawDraftContentState, args: ValidationArguments) {
    const [minLength] = args.constraints;

    const htmlContent = valueToHtml(value);
    return htmlContent.length >= minLength;
  }
  defaultMessage(args: ValidationArguments) {
    const [minLength]: (() => any)[] = args.constraints;
    return `${args.property} must more than or equal ${minLength} characters`;
  }
}
