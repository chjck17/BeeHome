export enum PackType {
  FREE = 'FREE',
  BASIC = 'BASIC',
  PREMIUM = 'PREMIUM',
}

export enum ResourcePack {
  UNLIMITED = 'UNLIMITED',
  DIAGRAM = 'DIAGRAM',
  MEDIUMLIMITED = 'MEDIUMLIMITED',
  FREELIMITED = 'FREELIMITED',
  VIEWER = 'VIEWER',
}

export type MyEnumOrString = ResourcePack | string;
