# PREPARING
Firstly install [node.js](nodejs.org) or update it to v7
 
```sh
$ npm cache clean -f
$ npm install -g n
$ n stable
```

[gulp](http://gulpjs.com/) intall globally
```sh
$ npm install -g gulp
```

and [yarn](yarnpkg.com)
```sh
$ brew update
$ brew install yarn
```
Run yarn in project directory. Yarn is a better alternative to npm
```sh
$ yarn
```

# **Start Development**

- run **`gulp`**
- point your browser to [localhost:3000](http://localhost:3000)

For the development you probably will need **flow-typed**
```sh
$ npm install -g flow-typed
```
and run in the project directory
```sh
$ flow-typed install
```
### Dev Tasks

- `gulp` run web app in development mode
- `gulp -p` run web app in production mode
- `gulp jest` run jest tests
- `gulp jest-watch` continuous test running for TDD
- `gulp eslint` eslint
- `gulp eslint --fix` fix fixable eslint issues
- `gulp flow` validate the project for type assertion errors

## Production Tasks

You can simply run the deployment by
```sh
$ sh deploy.sh (-f|-s)
```

or using following commands
- `gulp build -p` build app for production
- `npm test` run all checks and tests
- `node src/server` start app, remember to set NODE_ENV
- `pm2 start processes.json ` run node through pm2
 

Have a nice day