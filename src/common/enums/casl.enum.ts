export enum Action {
  MANAGE = 'manage',
  READ = 'read',
  WRITE = 'write',
}

export enum Resource {
  ALL = 'all',
  ADMIN = 'admin',
  LESSOR = 'lessor',
  CUSTOMER = 'customer',
  POLICY = 'policy',
  GIFT = 'gift',
  EVENT = 'event',
  PRODUCT = 'product',
}

export enum ActionAbility {
  CAN = 'can',
  CANNOT = 'cannot',
}
