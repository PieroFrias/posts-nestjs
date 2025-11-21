import * as fs from 'fs';
import * as path from 'path';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Post } from '../../modules/posts/entities';
import { parseString } from '../helpers';

export class PostSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    await dataSource.query('TRUNCATE TABLE "posts" RESTART IDENTITY CASCADE;');

    const dataPath = '../../../src/database/seeders/data/posts.data.json';
    const jsonFilePath = path.join(__dirname, dataPath);
    const data: Post[] = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));

    const values = data
      .map((post) => {
        const id = `'${post.id}'`;
        const authorId = `'${post.author}'`;
        const categoryId = `'${post.category}'`;
        const title = parseString(post.title);
        const content = parseString(post.content);
        const status = `'${post.status}'`;

        return `(${id}, ${authorId}, ${categoryId}, ${title}, ${content}, ${status})`;
      })
      .join(', ');

    await dataSource.query(
      `INSERT INTO "posts" 
      (id, author_id, category_id, title, content, status) 
      VALUES ${values};`,
    );
  }
}
