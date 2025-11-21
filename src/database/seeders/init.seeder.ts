import { DataSource } from 'typeorm';
import { runSeeders, Seeder } from 'typeorm-extension';
import { TagSeeder } from './tags.seeder';
import { UserSeeder } from './users.seeder';
import { CategorySeeder } from './categories.seeder';
import { PostSeeder } from './posts.seeder';
import { PostTagSeeder } from './post-tags.seeder';

export default class InitSeeder implements Seeder {
  public async run(dataSource: DataSource) {
    await runSeeders(dataSource, {
      seeds: [UserSeeder, TagSeeder, CategorySeeder, PostSeeder, PostTagSeeder],
    });
  }
}
