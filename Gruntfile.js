module.exports = function(grunt) {


    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        sass: {
            development: {
                files: {
                    'app/build/style.css': 'app/style/style.sass'
                }
            }
        },

        watch: {
            configFiles: {
                files: [ 'Gruntfile.js' ],
                options: {
                    reload: true
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
            }
        },

        connect: {
            server: {
                options: {
                    port: 8000,
                    hostname: 'localhost',
                    base: 'app/'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('server', function (spec) {

        grunt.task.run(['connect:server', 'sass:development', 'watch']);

    });

};

