git fetch --all
git checkout master
git pull origin master

if [ "$1" = "-f" ]; then
yarn
fi

gulp build -p

if [ "$1" = "-s" ]; then
pm2 start processes.json
else
pm2 gracefulReload processes.json
fi
