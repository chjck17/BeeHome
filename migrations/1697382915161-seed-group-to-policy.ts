import { MigrationInterface, QueryRunner } from 'typeorm';

export class seedGroupToPolicy1667382915161 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.query(`
    //   INSERT INTO "group_policy" ("key", "name", "description","type","status","owner_id")
    //   VALUES ('super_admin', 'Super Admin', 'This is super admin','COMMON','ACTIVE',3)
    // `);
    await queryRunner.query(`
      INSERT INTO "group_to_policy" ("policy_id", "group_policy_id")
      VALUES (1, 4)
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.query(`
    //   DELETE FROM "group_policy" WHERE "key" = 'super_admin'
    // `);
    await queryRunner.query(`
      DELETE FROM "group_to_policy" WHERE "policy_id" = 1
    `);
  }
}
