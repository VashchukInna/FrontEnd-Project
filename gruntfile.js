var path = require('path');

module.exports = function(grunt) {
	'use strict';

	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-newer');
	grunt.loadNpmTasks('grunt-bumpup');
	grunt.loadNpmTasks('grunt-jslint');

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		less: {
			dev: {
				options: {
					paths: ['css'],
					compress: false,
					ieCompat: true,
				},
				files: {
					'css/styles.css': 'css/less/colors.less'
				}
			},
			prod: {
				options: {
					paths: ['css'],
					compress: true,
					ieCompat: true,
				},
				files: {
					'css/styles.min.css': 'css/less/styles.less'
				}
			}
		},
		jslint: {
	      server: {
	        src: [
	          'app/scripts.js'
	        ],
	        options: {
		        edition: 'latest',
		        errorsOnly: true,
		        failOnError: false
		    }
	      }
	    },
	    watch: {
	    	options: { livereload: true },
	      	less: {
	        	files: ['css/**/*.less'],
	        	tasks: ['newer:less:dev'],
	      	},
	      	scripts: {
	      		files: ['**/*.js', '*.html'],
	      		tasks: ['jslint']
	      	}
	    },
	    bumpup: {
	        file: 'package.json'
	    },
		connect: {
			server: {
				options: {
					port: 9005,
					base: '',
					hostname: '*',
					livereload:true
				}
			}
		}
	});

	grunt.task.registerTask('default', 'jslint');
	grunt.task.registerTask('default', ['connect','watch']);

};