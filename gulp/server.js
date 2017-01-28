import args from './support/args';
import gulp from 'gulp';
import runSequence from 'run-sequence';

gulp.task('server', ['env'], (done) => {
  if (args.production) {
    runSequence('clean', 'iconfont', 'build', 'server-node', done);
  } else {
    runSequence('server-hot', 'iconfont', 'server-nodemon', done);
  }
});
