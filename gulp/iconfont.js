import gulp from 'gulp';
import path from 'path';

import iconfont from 'gulp-iconfont';
import iconfontCss from 'gulp-iconfont-css';

gulp.task('iconfont', () => {
  const fontName = 'Icons';
  const iconPath = 'src/client/components/icon/';

  gulp.src([iconPath + '**/*.svg'])
    .pipe(iconfontCss({
      fontName: fontName,
      path: iconPath + '_icons.css',
      targetPath: '../icons.styl',
      fontPath: path.join(iconPath, 'fonts/')
    }))
    .pipe(iconfont({
      fontName: fontName,
      prependUnicode: true,
      formats: ['ttf', 'eot', 'woff', 'svg'],
      centerHorizontally: true,
      normalize: true,
      fontHeight: 1001
    }))
    .pipe(gulp.dest(path.join(iconPath, 'fonts/')));
});
