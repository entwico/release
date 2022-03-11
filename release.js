#!/usr/bin/env node

const isClean = require('git-is-clean')

isClean()
  .then(clean => {
    if (!clean) {
      console.error('The git repository is not clean. Please commit or stash all the changes');
      process.exit(1);
    }

    require('semantic-release')({
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
          message: "chore: generate CHANGELOG.md for release version ${nextRelease.version} [ci skip]"
        }
      ],
      publish: false,
      success: false,
      fail: false,
    });
  })

