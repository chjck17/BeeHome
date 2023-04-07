import { MigrationInterface, QueryRunner } from "typeorm";

export class editTableCategoryType1680780763009 implements MigrationInterface {
    name = 'editTableCategoryType1680780763009'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category_type_detail" DROP CONSTRAINT "FK_ac2ebad62eba521b012d3943872"`);
        await queryRunner.query(`ALTER TABLE "category_type_detail" RENAME COLUMN "user_id" TO "category_type_id"`);
        await queryRunner.query(`ALTER TABLE "category_type_detail" ADD CONSTRAINT "FK_8e3479e626484b58b3963cb4dca" FOREIGN KEY ("category_type_id") REFERENCES "category_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category_type_detail" DROP CONSTRAINT "FK_8e3479e626484b58b3963cb4dca"`);
        await queryRunner.query(`ALTER TABLE "category_type_detail" RENAME COLUMN "category_type_id" TO "user_id"`);
        await queryRunner.query(`ALTER TABLE "category_type_detail" ADD CONSTRAINT "FK_ac2ebad62eba521b012d3943872" FOREIGN KEY ("user_id") REFERENCES "category_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
