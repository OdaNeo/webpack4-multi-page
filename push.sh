set -e

# git init

git add -A

git commit -m 'babel polyfill eslint prettier'

git push git@github.com:Oda-T/webpack4-multi-page.git master:master

cd -