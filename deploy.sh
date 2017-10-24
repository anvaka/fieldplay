#!/bin/sh
rm -rf ./dist
npm run build
cd ./dist
git init
git add .
git commit -m 'push to gh-pages'
git push --force git@github.com:anvaka/fieldplay.git master:gh-pages
