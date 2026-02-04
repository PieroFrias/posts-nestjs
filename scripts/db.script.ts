#!/usr/bin/env node

import 'reflect-metadata';
import { join } from 'path';
import { execSync } from 'child_process';
import { DataSource } from 'typeorm';
import { runSeeders } from 'typeorm-extension';
import { source } from '../src/config';

type Action =
  | 'migration:generate'
  | 'migration:run'
  | 'migration:show'
  | 'migration:revert'
  | 'seed';

const DATA_SOURCE = 'src/config/migrations.config.ts';
const [, , action, name, ...extraArgs] = process.argv;

async function run() {
  if (!action) {
    console.error('❌ Missing action');
    process.exit(1);
  }

  if (action === 'migration:generate') {
    if (!name) {
      console.error('❌ Migration name is required');
      console.error('👉 pnpm run db migration:generate <MigrationName>');
      process.exit(1);
    }

    const migrationPath = join('src', 'database', 'migrations', name);

    const command = [
      'pnpm',
      'typeorm',
      'migration:generate',
      '-d',
      DATA_SOURCE,
      migrationPath,
      ...extraArgs,
    ].join(' ');

    execSync(command, { stdio: 'inherit' });
    return;
  }

  if (action.startsWith('migration:')) {
    const command = [
      'pnpm',
      'typeorm',
      action,
      '-d',
      DATA_SOURCE,
      ...extraArgs,
    ].join(' ');

    execSync(command, { stdio: 'inherit' });
    return;
  }

  if (action === 'seed') {
    console.log('🌱 Running seeders');

    const ds: DataSource = await source.initialize();
    await runSeeders(ds);
    await ds.destroy();

    console.log('🌱 Seeders run successfully');

    return;
  }

  console.error(`❌ Unknown action: ${action}`);
  process.exit(1);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
