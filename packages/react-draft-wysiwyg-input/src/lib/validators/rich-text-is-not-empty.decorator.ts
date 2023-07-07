import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { RawDraftContentState } from 'draft-js';

export function RichTextIsNotEmpty(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: RichTextIsNotEmptyConstraint,
    });
  };
}

@ValidatorConstraint({ name: 'RichTextIsNotEmpty' })
export class RichTextIsNotEmptyConstraint
  implements ValidatorConstraintInterface
{
  validate(value: RawDraftContentState) {
    if (!value) return false;
    if (!value.blocks.length) return false;
    if (value.blocks.length === 1 && !value.blocks[0].text) return false;
    return true;
  }
  defaultMessage(args: ValidationArguments) {
    return `${args.property} should not be empty`;
  }
}
