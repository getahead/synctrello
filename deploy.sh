git fetch --all
git checkout master
git pull origin master

if [ "$1" = "-f" ]; then
yarn
fi

gulp iconfont
gulp build -p

if [ "$1" = "-s" ]; then
pm2 gracefulReload processes.json --env staging
else
pm2 gracefulReload processes.json
fi
