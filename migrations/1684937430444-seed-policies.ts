import { MigrationInterface, QueryRunner } from 'typeorm';

export class seedPolicies1684937430444 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO "group_policy" ("key", "name", "description","type","status","owner_id")
      VALUES ('super_admin', 'Super Admin', 'This is super admin','COMMON','ACTIVE',1)
    `);
    await queryRunner.query(`
      INSERT INTO "group_to_policy" ("policy_id", "group_policy_id")
      VALUES (1, 1)
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM "group_policy" WHERE "key" = 'super_admin'
    `);
    await queryRunner.query(`
      DELETE FROM "group_to_policy" WHERE "policy_id" = 1
    `);
  }
}
