set -e

# git init

git add -A

git commit -m '压缩js代码'

git push -f git@github.com:Oda-T/webpack4-multi-page.git master:master

cd -