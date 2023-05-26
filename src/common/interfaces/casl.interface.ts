import { PackType, ResourcePack } from 'src/service-pack/enums/pack.enum';
import { Action, Resource, ActionAbility } from '../enums/casl.enum';

export interface IPolicies {
  action: Action;
  resource: Resource;
  actionAbility: ActionAbility;
}

export interface RequiredRule {
  action: Action;
  resource: Resource;
}

export interface PacketRequiredRule {
  packType: PackType;
  resourcePack: ResourcePack;
}
