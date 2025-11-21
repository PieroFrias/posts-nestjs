import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeIsPublishedToStatusColumnInPosts1763690989245 implements MigrationInterface {
    name = 'ChangeIsPublishedToStatusColumnInPosts1763690989245'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" RENAME COLUMN "is_published" TO "status"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "status"`);
        await queryRunner.query(`CREATE TYPE "public"."posts_status_enum" AS ENUM('DRAFT', 'PUBLISHED')`);
        await queryRunner.query(`ALTER TABLE "posts" ADD "status" "public"."posts_status_enum" NOT NULL DEFAULT 'DRAFT'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."posts_status_enum"`);
        await queryRunner.query(`ALTER TABLE "posts" ADD "status" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "posts" RENAME COLUMN "status" TO "is_published"`);
    }

}
