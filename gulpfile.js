const gulp = require('gulp');
const gulpConnect = require('gulp-connect');
const gulpOpen = require('gulp-open');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const tsify = require('tsify');
const sourcemaps = require('gulp-sourcemaps');
const config = require('./config');

const bundle = () => {
    return browserify({
        basedir: '.',
        debug: true,
        entries: ['src/main.ts'],
        cache: {},
        packageCache: {}
    })
        .plugin(tsify)
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'))
        .pipe(gulpConnect.reload());;
};

const watch = () => {
    gulp.watch(['./src/**/*.ts'], bundle);
}

const connect = () => {
    gulpConnect.server({
        root: '.',
        port: config.port,
        livereload: config.livereload
    });
};

const open = () => {
    gulp.src('./index.html')
        .pipe(gulpOpen({
            uri: 'http://127.0.0.1:' + config.port,
            app: config.browser
        }));
};


exports.default = gulp.series(bundle, gulp.parallel(connect, watch, open));
