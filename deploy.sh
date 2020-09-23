set -e

npm run build:gh

cd dist

git init

git add -A

git commit -m 'deploy'

git push -f git@github.com:Oda-T/webpack4-multi-page.git master:gh-pages

cd..
