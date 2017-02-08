module.exports = function(grunt) {
	grunt.initConfig({
		jshint: {
		 	main: ['src/**/*.js']
		},
		uglify: {
			/* options: {
				mangle: false,
				beautify: true
			},
			*/main: {
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
						except: ['jQuery']
					}
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('default', ['jshint', 'uglify']);
};