module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('sapling.jquery.json'),
		banner: '/*! \n\t<%= pkg.title %> <%= pkg.version %> - <%= pkg.homepage %>\n*/\n',
		usebanner: {
			dist: {
				options: {
					position: 'top',
					banner: '<%= banner %>',
					linebreak: false,
					process: function(filepath) {
						var content = grunt.file.read(filepath);
						return (content.indexOf(this.banner) > -1) ?
							'' : this.banner + '\n';
					}
				},
				files: {
					src: ['jquery.sapling.css']
				}
			}
		},
		uglify: {
			options: {
				banner: '<%= banner %>\n'
			},
			build: {
				files: {
					'jquery.sapling.min.js': ['jquery.sapling.js']
				}
			}
		},
		jshint: {
			all: [
				'jquery.sapling.js'
			]
		},
		watch: {
			scripts: {
				files: ['jquery.sapling.js'],
				tasks: ['jshint','uglify']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-banner');

	grunt.registerTask('default', ['jshint', 'uglify','usebanner']);

};