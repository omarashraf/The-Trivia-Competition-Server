const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();
const runSequence = require('run-sequence');
const del = require('del');
const path = require('path');

const filesPath = {
    js: ['./**/*.js', '!dist/**', '!node_modules/**', '!frontend/**', '!gulpfile.js'],
    nonJs: ['./package.json', './.gitignore', './.env']
};

// clean up dist directory
gulp.task('clean', () =>
    del.sync(['dist/**', 'dist/.*', '!dist'])
);

// Copy non-js files to dist
gulp.task('copy', () =>
    gulp.src(filesPath.nonJs)
        .pipe(plugins.newer('dist'))
        .pipe(gulp.dest('dist'))
);

// Compile ES6 to ES5 and copy to dist
gulp.task('babel', () =>
    gulp.src(filesPath.js, { base: '.' })
        .pipe(plugins.newer('dist'))
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.babel())
        .pipe(plugins.sourcemaps.write('.', {
            includeContent: false,
            sourceRoot(file) {
                return path.relative(file.path, __dirname);
            }
        }))
        .pipe(gulp.dest('dist'))
);

// Start server with nodemon and restart on file changes
gulp.task('nodemon', ['copy', 'babel'], () =>
    plugins.nodemon({
        script: path.join('dist', 'express.js'),
        ext: 'js',
        ignore: ['node_modules/**/*.js', 'dist/**/*.js'],
        tasks: ['copy', 'babel']
    })
);

// gulp serve for development
gulp.task('serve', ['clean', 'nodemon'], () => { });