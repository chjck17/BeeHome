import { DefaultNamingStrategy } from 'typeorm';
import { camelToSnakeCase } from '../utils';

export class NamingStrategy extends DefaultNamingStrategy {
  tableName(targetName: string, userSpecifiedName: string): string {
    return userSpecifiedName || camelToSnakeCase(targetName);
  }

  columnName(
    propertyName: string,
    customName: string,
    embeddedPrefixes: string[],
  ): string {
    return customName || camelToSnakeCase(propertyName);
  }

  joinColumnName(relationName: string, referencedColumnName: string) {
    return `${camelToSnakeCase(relationName)}_id`;
  }
}
