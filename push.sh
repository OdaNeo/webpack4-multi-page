set -e

# git init

git add -A

git commit -m '去掉html-loader，与HtmlWebpackPlugin冲突'

git push -f git@github.com:Oda-T/webpack4-multi-page.git master:master

cd -