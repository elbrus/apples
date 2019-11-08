module.exports = function(grunt) {
	grunt.initConfig({
		jshint: {
			main: ['src/**/*.js']
		},
		uglify: {
			main: {
				files: {
					'applesForum.js': [
						'src/namespace.js',
						'src/staff/*.js',
						'src/market/*.js',
						'src/qualies/*.js',
						'src/race/*.js',
						'src/forum.js',
						'src/addon.js'
					]
				},
				options: {
					mangle: {
						reserved: ['jQuery']
					}
				}
			}
		},
		concat: {
			options: {},
			main: {
				src: ['applesAddon.js', 'applesForum.js'],
				dest: 'apples.js'
			}
		},
		clean: {
			before: ['apples.js'],
			after: ['applesForum.js']
		}
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('default', ['clean:before', 'jshint', 'uglify', 'concat', 'clean:after']);
};
