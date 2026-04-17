#!/usr/bin/env node

import isClean from 'git-is-clean';
import findGitRoot from 'find-git-root';
import path from 'path';
import semanticRelease from 'semantic-release';

const clean = await isClean();

if (!clean) {
  console.error('The git repository is not clean. Please commit or stash all the changes');
  process.exit(1);
}

const root = findGitRoot(process.cwd());

if (!root) {
  console.error('Could not find git root');
  process.exit(1);
}

process.chdir(path.join(root, '..'));

await semanticRelease({
  ci: false,
  branches: [
    "master",
    "main",
  ],
  verifyConditions: [
    "@semantic-release/changelog",
    "@semantic-release/git",
  ],
  prepare: [
    "@semantic-release/changelog",
    {
      path: "@semantic-release/git",
      assets: [
        "CHANGELOG.md"
      ],
      message: "chore: generate CHANGELOG.md for release version ${nextRelease.version}"
    }
  ],
  publish: false,
  success: false,
  fail: false,
});
