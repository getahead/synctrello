import args from './support/args';
import gulp from 'gulp';
import { execSync } from 'child_process';

gulp.task('env', () => {
  process.env.NODE_ENV = args.production ? 'production' : 'development';
});
