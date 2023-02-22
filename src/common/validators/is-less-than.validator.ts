import { ClassConstructor } from 'class-transformer';
import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions
} from 'class-validator';

export function IsLessThan(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: ClassConstructor<any>, propertyName: string) {
    registerDecorator({
      name: 'IsLessThan',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [propertyToCompare] = args.constraints;
          const valueToCompare = (args.object as any)[propertyToCompare];

          if (typeof value !== 'number' || typeof valueToCompare !== 'number')
            return false;

          return value < valueToCompare;
        },
      },
    });
  };
}

export function IsLessThanOrEqual(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsLessThan',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [propertyToCompare] = args.constraints;
          const valueToCompare = (args.object as any)[propertyToCompare];

          if (typeof value !== 'number' || typeof valueToCompare !== 'number')
            return false;

          return value <= valueToCompare;
        },
      },
    });
  };
}
