set -e

# git init

git add -A

git commit -m 'add postcss px2rem'

git push -f git@github.com:Oda-T/webpack4-multi-page.git master:master

cd -