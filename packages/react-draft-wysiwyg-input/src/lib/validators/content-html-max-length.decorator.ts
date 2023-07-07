import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { RawDraftContentState } from 'draft-js';
import { valueToHtml } from '../utils/value-to-html';

export function ContentHtmlMaxLength(
  maxLength: number,
  validationOptions?: ValidationOptions
) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [maxLength],
      validator: ContentHtmlMaxLengthConstraint,
    });
  };
}

@ValidatorConstraint({ name: 'ContentHtmlMaxLength' })
export class ContentHtmlMaxLengthConstraint
  implements ValidatorConstraintInterface
{
  validate(value: RawDraftContentState, args: ValidationArguments) {
    const [maxLength] = args.constraints;

    const htmlContent = valueToHtml(value);
    return htmlContent.length <= maxLength;
  }
  defaultMessage(args: ValidationArguments) {
    const [maxLength]: (() => any)[] = args.constraints;
    return `${args.property} must less than or equal ${maxLength} characters`;
  }
}
