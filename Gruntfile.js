/**
@toc
2. load grunt plugins
3. init
4. setup variables
5. grunt.initConfig
6. register grunt tasks

*/

'use strict';

module.exports = function(grunt) {

	/**
	Load grunt plugins
	@toc 2.
	*/
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-contrib-connect');

	/**
	Function that wraps everything to allow dynamically setting/changing grunt options and config later by grunt task. This init function is called once immediately (for using the default grunt options, config, and setup) and then may be called again AFTER updating grunt (command line) options.
	@toc 3.
	@method init
	*/
	function init(params) {
		/**
		Project configuration.
		@toc 5.
		*/
		grunt.initConfig({
			concat: {
				devCss: {
					src:    [],
					dest:   []
				}
			},
			jshint: {
				options: {
					//force:          true,
					globalstrict:   true,
					//sub:            true,
					node: true,
					loopfunc: true,
					browser:        true,
					devel:          true,
					globals: {
						angular:    false,
						$:          false,
						moment:		false,
						Pikaday: false,
						module: false,
						forge: false
					}
				},
				beforeconcat:   {
					options: {
						force:	false,
						ignores: ['**.min.js']
					},
					files: {
						src: []
					}
				},
				//quick version - will not fail entire grunt process if there are lint errors
				beforeconcatQ:   {
					options: {
						force:	true,
						ignores: ['**.min.js']
					},
					files: {
						src: ['**.js']
					}
				}
			},
			uglify: {
				options: {
					mangle: false
				},
				build: {
					files:  {},
					src:    'el-scroll.js',
					dest:   'el-scroll.min.js'
				}
			},
			less: {
				development: {
					options: {
					},
					files: {
						"main.css": "_base.less",
						"el-scroll.css": "_el-scroll.less"
					}
				}
			},
			cssmin: {
				dev: {
					src: ['el-scroll.css'],
					dest: 'el-scroll.min.css'
				}
			},
	        connect: {
	            server: {
	                options: {
	                    port: 9001,
	                    base: '',
	                    keepalive:true,
	                    livereload:true
	                }
	            }
	        }/*,
			karma: {
				unit: {
					configFile: publicPathRelativeRoot+'config/karma.conf.js',
					singleRun: true,
					browsers: ['PhantomJS']
				}
			}*/
		});
		
		
		/**
		register/define grunt tasks
		@toc 6.
		*/
		// Default task(s).
		// grunt.registerTask('default', ['jshint:beforeconcat', 'less:development', 'concat:devJs', 'concat:devCss']);
		grunt.registerTask('default', ['jshint:beforeconcatQ', 'less:development', 'cssmin', 'uglify:build']);
	
	}
	init({});		//initialize here for defaults (init may be called again later within a task)

};