import { MigrationInterface, QueryRunner } from "typeorm";

export class addTableDb1680834693954 implements MigrationInterface {
    name = 'addTableDb1680834693954'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tag" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL DEFAULT '1', "id" SERIAL NOT NULL, "name" character varying NOT NULL, "slug" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "floor" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL DEFAULT '1', "id" SERIAL NOT NULL, "name" character varying NOT NULL, "boarding_house_id" integer NOT NULL, CONSTRAINT "PK_16a0823530c5b0dd226b8a96ee1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."room_attribute_term_detail_lang_enum" AS ENUM('VN', 'EN')`);
        await queryRunner.query(`CREATE TABLE "room_attribute_term_detail" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL DEFAULT '1', "id" SERIAL NOT NULL, "lang" "public"."room_attribute_term_detail_lang_enum" NOT NULL, "value" character varying NOT NULL, "slug" character varying NOT NULL, "room_attribute_term_id" integer NOT NULL, CONSTRAINT "PK_8e3cae98ca3ad2b3a64a9b1e94f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."room_attribute_detail_lang_enum" AS ENUM('VN', 'EN')`);
        await queryRunner.query(`CREATE TABLE "room_attribute_detail" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL DEFAULT '1', "id" SERIAL NOT NULL, "lang" "public"."room_attribute_detail_lang_enum" NOT NULL, "name" character varying NOT NULL, "slug" character varying NOT NULL, "desc" character varying NOT NULL, "room_attribute_id" integer NOT NULL, CONSTRAINT "PK_d09de1c6f64bf1e7fe0f941833b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "room_attribute" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL DEFAULT '1', "id" SERIAL NOT NULL, "room_attribute_term_id" integer NOT NULL, CONSTRAINT "PK_772401d1feb9b0a032d1ae77498" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "room_attribute_term" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL DEFAULT '1', "id" SERIAL NOT NULL, CONSTRAINT "PK_a713d106be1404a45a70c0649a1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "room_to_attribute" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL DEFAULT '1', "id" SERIAL NOT NULL, "room_id" integer NOT NULL, "room_attribute_term_id" integer NOT NULL, CONSTRAINT "PK_9804fdb10c6fbcd4f00869da947" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "room" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL DEFAULT '1', "id" SERIAL NOT NULL, "name" character varying NOT NULL, "price" character varying NOT NULL, "acreage" character varying NOT NULL, "status" character varying NOT NULL, "floor_id" integer NOT NULL, CONSTRAINT "PK_c6d46db005d623e691b2fbcba23" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "room_to_category" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL DEFAULT '1', "id" SERIAL NOT NULL, "room_id" integer NOT NULL, "category_id" integer NOT NULL, CONSTRAINT "PK_53c30753a4fba8b29170973cf7c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "boarding_house" ("id" SERIAL NOT NULL, "user_id" integer NOT NULL, CONSTRAINT "PK_80b545eab00217232f19f98a90e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "boarding_house_to_tag" ("id" SERIAL NOT NULL, "tag_id" integer NOT NULL, "boarding_house_id" integer NOT NULL, CONSTRAINT "PK_bc3eed3a8f0ce0f71aff995a947" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "room_image" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL DEFAULT '1', "id" SERIAL NOT NULL, "file_id" integer NOT NULL, "room_id" integer NOT NULL, CONSTRAINT "PK_8c32b9db82405a0661e805694fd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "floor" ADD CONSTRAINT "FK_03c13353052ea7ec9103ea12c5c" FOREIGN KEY ("boarding_house_id") REFERENCES "boarding_house"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "room_attribute_term_detail" ADD CONSTRAINT "FK_fb5a6c41a8ddd47c5a120306ad2" FOREIGN KEY ("room_attribute_term_id") REFERENCES "room_attribute_term"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "room_attribute_detail" ADD CONSTRAINT "FK_c7b4bafcfa6d1bf2dd29e909c0c" FOREIGN KEY ("room_attribute_id") REFERENCES "room_attribute"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "room_attribute" ADD CONSTRAINT "FK_ba0c55c7b39aa4a5d94a464afdd" FOREIGN KEY ("room_attribute_term_id") REFERENCES "room_attribute_term"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "room_to_attribute" ADD CONSTRAINT "FK_93de404895f3e7bf4e033dfadd7" FOREIGN KEY ("room_id") REFERENCES "room"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "room_to_attribute" ADD CONSTRAINT "FK_4d1012d7a2b85a41b7c3a1cd5ed" FOREIGN KEY ("room_attribute_term_id") REFERENCES "room_attribute_term"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "room" ADD CONSTRAINT "FK_ec6d3c6699ef6067c96e47d9de7" FOREIGN KEY ("floor_id") REFERENCES "floor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "room_to_category" ADD CONSTRAINT "FK_acc9687ea21ad8db3f8a7875441" FOREIGN KEY ("room_id") REFERENCES "room"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "room_to_category" ADD CONSTRAINT "FK_fca871a1402dce4942e6cf897b3" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "boarding_house" ADD CONSTRAINT "FK_99a76d3fdab90d99de24bf0f4c1" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "boarding_house_to_tag" ADD CONSTRAINT "FK_0b35e5079e24bacf3fff740c2aa" FOREIGN KEY ("tag_id") REFERENCES "tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "boarding_house_to_tag" ADD CONSTRAINT "FK_2311c44b75b49338254bf9e3a6f" FOREIGN KEY ("boarding_house_id") REFERENCES "boarding_house"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "boarding_house_to_tag" DROP CONSTRAINT "FK_2311c44b75b49338254bf9e3a6f"`);
        await queryRunner.query(`ALTER TABLE "boarding_house_to_tag" DROP CONSTRAINT "FK_0b35e5079e24bacf3fff740c2aa"`);
        await queryRunner.query(`ALTER TABLE "boarding_house" DROP CONSTRAINT "FK_99a76d3fdab90d99de24bf0f4c1"`);
        await queryRunner.query(`ALTER TABLE "room_to_category" DROP CONSTRAINT "FK_fca871a1402dce4942e6cf897b3"`);
        await queryRunner.query(`ALTER TABLE "room_to_category" DROP CONSTRAINT "FK_acc9687ea21ad8db3f8a7875441"`);
        await queryRunner.query(`ALTER TABLE "room" DROP CONSTRAINT "FK_ec6d3c6699ef6067c96e47d9de7"`);
        await queryRunner.query(`ALTER TABLE "room_to_attribute" DROP CONSTRAINT "FK_4d1012d7a2b85a41b7c3a1cd5ed"`);
        await queryRunner.query(`ALTER TABLE "room_to_attribute" DROP CONSTRAINT "FK_93de404895f3e7bf4e033dfadd7"`);
        await queryRunner.query(`ALTER TABLE "room_attribute" DROP CONSTRAINT "FK_ba0c55c7b39aa4a5d94a464afdd"`);
        await queryRunner.query(`ALTER TABLE "room_attribute_detail" DROP CONSTRAINT "FK_c7b4bafcfa6d1bf2dd29e909c0c"`);
        await queryRunner.query(`ALTER TABLE "room_attribute_term_detail" DROP CONSTRAINT "FK_fb5a6c41a8ddd47c5a120306ad2"`);
        await queryRunner.query(`ALTER TABLE "floor" DROP CONSTRAINT "FK_03c13353052ea7ec9103ea12c5c"`);
        await queryRunner.query(`DROP TABLE "room_image"`);
        await queryRunner.query(`DROP TABLE "boarding_house_to_tag"`);
        await queryRunner.query(`DROP TABLE "boarding_house"`);
        await queryRunner.query(`DROP TABLE "room_to_category"`);
        await queryRunner.query(`DROP TABLE "room"`);
        await queryRunner.query(`DROP TABLE "room_to_attribute"`);
        await queryRunner.query(`DROP TABLE "room_attribute_term"`);
        await queryRunner.query(`DROP TABLE "room_attribute"`);
        await queryRunner.query(`DROP TABLE "room_attribute_detail"`);
        await queryRunner.query(`DROP TYPE "public"."room_attribute_detail_lang_enum"`);
        await queryRunner.query(`DROP TABLE "room_attribute_term_detail"`);
        await queryRunner.query(`DROP TYPE "public"."room_attribute_term_detail_lang_enum"`);
        await queryRunner.query(`DROP TABLE "floor"`);
        await queryRunner.query(`DROP TABLE "tag"`);
    }

}
