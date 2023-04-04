export enum Action {
  MANAGE = 'manage',
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete',
}

export enum Resource {
  ALL = 'all',
  ADMIN = 'admin',
  LESSOR = 'lessor',
  CUSTOMER = 'customer',
  POLICY = 'policy',
  GROUP_POLICY = 'group_policy',
}

export enum ActionAbility {
  CAN = 'can',
  CANNOT = 'cannot',
}
