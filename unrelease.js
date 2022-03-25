#!/usr/bin/env node

console.log(`----------------
# semi-manual process

git pull
LATEST_TAG=$(git describe --tags $(git rev-list --tags --max-count=1))
echo $LATEST_TAG # check the latest tag
echo $(git log -1 --format=%ai $LATEST_TAG | cat) # check git creation date
git tag -d $LATEST_TAG # clear local tag
git push origin :$LATEST_TAG # clear remote tag
git log -n 3 | cat # check whether there is a commit a-la \`release: ...[ci skip]\` to remove
git reset --hard HEAD~1 && git push --force # if yes remove this commit
----------------`);
