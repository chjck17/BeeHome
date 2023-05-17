import { MigrationInterface, QueryRunner } from "typeorm";

export class editTable1684253145363 implements MigrationInterface {
    name = 'editTable1684253145363'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "room" ADD "room_simple" character varying NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "room" ADD "toilet" character varying NOT NULL DEFAULT '1'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "room" DROP COLUMN "toilet"`);
        await queryRunner.query(`ALTER TABLE "room" DROP COLUMN "room_simple"`);
    }

}
