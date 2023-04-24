import { MigrationInterface, QueryRunner } from "typeorm";

export class addTableComment1682240267536 implements MigrationInterface {
    name = 'addTableComment1682240267536'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "comment_to_boarding_house" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL DEFAULT '1', "id" SERIAL NOT NULL, "boarding_house_id" integer NOT NULL, "comment_id" integer NOT NULL, CONSTRAINT "PK_754b8c91d56d871b20857f9d4f0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comment" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL DEFAULT '1', "id" SERIAL NOT NULL, "content" character varying NOT NULL, "star" character varying NOT NULL, "user_id" integer NOT NULL, CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "comment_to_boarding_house" ADD CONSTRAINT "FK_457f0879b553af4e3c0507196f9" FOREIGN KEY ("boarding_house_id") REFERENCES "boarding_house"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment_to_boarding_house" ADD CONSTRAINT "FK_68821a7e880d7d5f78fd2970021" FOREIGN KEY ("comment_id") REFERENCES "comment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_bbfe153fa60aa06483ed35ff4a7" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_bbfe153fa60aa06483ed35ff4a7"`);
        await queryRunner.query(`ALTER TABLE "comment_to_boarding_house" DROP CONSTRAINT "FK_68821a7e880d7d5f78fd2970021"`);
        await queryRunner.query(`ALTER TABLE "comment_to_boarding_house" DROP CONSTRAINT "FK_457f0879b553af4e3c0507196f9"`);
        await queryRunner.query(`DROP TABLE "comment"`);
        await queryRunner.query(`DROP TABLE "comment_to_boarding_house"`);
    }

}
