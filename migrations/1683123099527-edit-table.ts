import { MigrationInterface, QueryRunner } from "typeorm";

export class editTable1683123099527 implements MigrationInterface {
    name = 'editTable1683123099527'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_b67970f5a995b6743a44b9d5d8"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_b67970f5a995b6743a44b9d5d8" ON "book" ("email") WHERE (deleted_at IS NULL)`);
    }

}
