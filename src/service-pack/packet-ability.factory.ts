import { AbilityBuilder, AbilityClass, PureAbility } from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { User } from 'src/auth/entities/user.entity';
import { PackType, ResourcePack } from './enums/pack.enum';

export type AppAbility = PureAbility<[PackType, ResourcePack]>;

@Injectable()
export class PacketAbilityFactory {
  defineAbility(user: User) {
    const { can, cannot, build } = new AbilityBuilder(
      PureAbility as AbilityClass<AppAbility>,
    );

    //  Cannot will overwrite can so we just need loop through can
    //  And we loop through cannot to overwrite can

    if (user.packType === PackType.FREE) {
      can(user.packType, [ResourcePack.FREELIMITED]);
      cannot(user.packType, [
        ResourcePack.UNLIMITED,
        ResourcePack.DIAGRAM,
        ResourcePack.VIEWER,
      ]);
    }

    if (user.packType === PackType.MEDIUM) {
      can(user.packType, [ResourcePack.MEDIUMLIMITED, ResourcePack.DIAGRAM]);
      cannot(user.packType, [ResourcePack.UNLIMITED, ResourcePack.DIAGRAM]);
    }

    if (user.packType === PackType.PLATINUM) {
      can(user.packType, [
        ResourcePack.UNLIMITED,
        ResourcePack.DIAGRAM,
        ResourcePack.VIEWER,
      ]);
    }

    return build();
  }
}
