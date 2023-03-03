/**
 * @author Eric Neves
 * @description Minify, optimize, copy and compile files.
*/
const { src, dest, series } = require('gulp')
const autoprefixer = require('gulp-autoprefixer')

const prefixerCSS = () => {
    return src('./src/assets/css/*.css')
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(dest('./dist/assets/css'))
}

const copyJS = () => {
    return src('./src/assets/js/*.js')
        .pipe(dest('dist/assets/js'))
}

const copyImages = () => {
    return src([
        'src/assets/images/*.jpg',
        'src/assets/images/*.jpeg',
        'src/assets/images/*.png',
        'src/assets/images/*.svg',
        'src/assets/images/*.gif',
        'src/assets/images/*.ico'
    ])
    .pipe(dest('dist/assets/images'))
}

const copyHTML = () => {
    return src('./src/*.html')
        .pipe(dest('./dist'))
}

exports.default = series(
    prefixerCSS, copyImages, copyJS, copyHTML
)