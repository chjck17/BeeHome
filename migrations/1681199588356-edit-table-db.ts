import { MigrationInterface, QueryRunner } from "typeorm";

export class editTableDb1681199588356 implements MigrationInterface {
    name = 'editTableDb1681199588356'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "room_to_category" DROP CONSTRAINT "FK_fca871a1402dce4942e6cf897b3"`);
        await queryRunner.query(`ALTER TABLE "room_to_category" RENAME COLUMN "category_id" TO "category_type_id"`);
        await queryRunner.query(`ALTER TABLE "floor" RENAME COLUMN "name" TO "floor_number"`);
        await queryRunner.query(`ALTER TABLE "floor" DROP COLUMN "floor_number"`);
        await queryRunner.query(`ALTER TABLE "floor" ADD "floor_number" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "room_to_category" ADD CONSTRAINT "FK_18cb570b09addab19967fe80977" FOREIGN KEY ("category_type_id") REFERENCES "category_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "room_to_category" DROP CONSTRAINT "FK_18cb570b09addab19967fe80977"`);
        await queryRunner.query(`ALTER TABLE "floor" DROP COLUMN "floor_number"`);
        await queryRunner.query(`ALTER TABLE "floor" ADD "floor_number" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "floor" RENAME COLUMN "floor_number" TO "name"`);
        await queryRunner.query(`ALTER TABLE "room_to_category" RENAME COLUMN "category_type_id" TO "category_id"`);
        await queryRunner.query(`ALTER TABLE "room_to_category" ADD CONSTRAINT "FK_fca871a1402dce4942e6cf897b3" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
