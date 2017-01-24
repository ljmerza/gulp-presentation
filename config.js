'use strict'

module.exports = {
	css: {
		sassSrc: './src/styles/sass/**/*.sass',
		cssSrc: './src/styles/css/**/*.css',
		destFolder: './dist',
		destFile: 'style.css',
		sourceMap: './',
		notifyMessage: 'CSS build done.',
		autoprefixer: 'last 2 versions',
		watchDir: './src/styles/**/*.*'
	},

	html: {
		sources: ['./dist/*.js', './dist/*.css'],
		target: './src/*.html',
		injectIgnore: 'dist/',
		destFolder: './dist',
		notifyMessage: 'HTML build done.',
		watchDir: './src/*.html'
	},

	javascript: {
		sources: [
        './bower_components/jquery/dist/jquery.min.js',
        './src/scripts/**/*.js'
        ],
        babelPresets: ['es2015'],
        destFile: 'script.js',
        destFolder: './dist',
        sourceMap: './',
		notifyMessage: 'JavaScript build done.',
		watchDir: './src/javascript/**/*.js'
	},

	images: {
		sources: [
        './bower_components/jquery/dist/jquery.min.js',
        './src/scripts/**/*.js'
        ],
        destFile: 'script.js',
        destFolder: './dist',
        sourceMap: './',
		notifyMessage: 'JavaScript build done.',
		watchDir: './src/images/**/*.*'
	},

	clean: {
		delFolders: ['./dist/**']
	},

	browserSync: {
		baseDir: './dist'
	},

	notify: {
		errorMessage: 'Error: <%= error.message %>'
	},

	rsync: {
		srcFolder: './dist/**',
		rootFolder: './dist',
		hostname: '192.168.0.1',
		destFolder: '/var/www/website,',
		notifyMessage: `rSync complete with remote host ${this.hostname}`
	}
}