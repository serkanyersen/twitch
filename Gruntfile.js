module.exports = function(grunt) {


    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        sass: {
            development: {
                files: {
                    'app/build/style.css': 'app/style/main.sass'
                }
            }
        },

        concat: {
            development: {
                files: [{
                    dest: 'app/build/app.js',
                    src: [
                        'app/js/**/!(main).js',
                        'app/js/main.js'
                    ]
                }]
            }
        },

        watch: {
            js: {
                files: [
                    'app/js/*.js'
                ],
                tasks: ['concat:development'],
                options: {
                    spawn: false,
                    interrupt: true
                }
            },
            sass: {
                files: [
                    'app/**/*.sass'
                ],
                tasks: ['sass:development'],
                options: {
                    spawn: false
                }
            },
            livereload: {
                files: [
                    'app/style/*.sass',
                    'app/*.html',
                    'app/js/*.js'
                ],
                options: {
                    spawn: false,
                    interrupt: true,
                    livereload: true
                }
            }
        },

        connect: {
            development: {
                options: {
                    port: 8000,
                    hostname: 'localhost',
                    livereload: true,
                    base: 'app/'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('server', function (spec) {

        grunt.task.run(['connect:development', 'sass:development', 'concat:development', 'watch']);

    });

    grunt.registerTask('build', function (spec) {

        grunt.task.run(['sass:development', 'concat:development']);

    });

};

