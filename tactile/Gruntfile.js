module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                // define a string to put between each file in the concatenated output
                separator: ';'
            },
            base: {
                src: [
                    'www/js/dev/components/*.js',
                    'www/js/dev/base.js'
                ],
                dest: 'www/js/live/<%= pkg.name %>.js'
            },
            libs: {
                src: [
                    ['www/js/dev/lib/jquery-1.11.2.min.js', 'www/js/dev/lib/bootstrap.min.js', 'www/js/dev/lib/*.js']
                ],
                dest: 'www/js/live/lib.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dddd, mmmm dS, yyyy, h:MM:ss TT") %> */\n'
            },
            dist: {
                files: {
                    'www/js/live/<%= pkg.name %>.min.js': [''+'<%= concat.base.dest %>']
                }
            },
            lib: {
                files: {
                    'www/js/live/lib.min.js': ['www/js/live/lib.js']
                }
            }
        },
        compass: {
            config: 'config.rb'
        },
        bless: {
            css: {
                options: {
                    'imports':'false'
                },
                files: {
                    'www/css/base.css': 'www/css/base.css'
                }
            }
        },
        watch: {
            scripts: {
                files: [
                    'www/js/dev/lib/**/*.js',
                    'www/js/dev/components/*.js',
                    'www/js/dev/base/*.js',
                    'www/js/dev/base.js'
                ],
                tasks: ['concat', 'uglify']
            },
            css : {
                files: ['www/scss/**/*.scss'],
                tasks: ['compass','bless'],
                options: {
                    debounceDelay: 500
                }
            }
        }
    });

    //Load NPM Tasks
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-bless');

    // Default task(s).
    grunt.registerTask('default', ['concat', 'uglify', 'compass', 'bless']);

    //JS Only
    grunt.registerTask('js', ['concat', 'uglify']);

    //CSS Only
    grunt.registerTask('css', ['compass', 'bless']);

    //Watcher Task
    grunt.registerTask('watcher', ['watch']);

};
