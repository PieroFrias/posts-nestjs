import * as fs from 'fs';
import * as path from 'path';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { PostTag } from '../../modules/post-tags/entities';

export class PostTagSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    await dataSource.query('TRUNCATE TABLE "post_tags" RESTART IDENTITY CASCADE;');

    const dataPath = '../../../src/database/seeders/data/post-tags.data.json';
    const jsonFilePath = path.join(__dirname, dataPath);
    const data: PostTag[] = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));

    const values = data
      .map((post) => {
        const id = `'${post.id}'`;
        const postId = `'${post.post}'`;
        const tagId = `'${post.tag}'`;

        return `(${id}, ${postId}, ${tagId})`;
      })
      .join(', ');

    await dataSource.query(
      `INSERT INTO "post_tags" 
      (id, post_id, tag_id) 
      VALUES ${values};`,
    );
  }
}
