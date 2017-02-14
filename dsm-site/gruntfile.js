module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        appModules: grunt.file.readJSON('appModules.json'),
        concat: {
            vendors: {
                src: [
                    './node_modules/angular/angular.js',
                    './node_modules/angular-route/angular-route.js',
                    './node_modules/angular-animate/angular-animate.js'
                ],
                dest: './bin/vendors.js'
            },
            js: {
                src: ['<%= appModules %>', './source/**/*.js'],
                dest: './bin/dsm.app.js'
            },
            css: {
                src: ['./source/**/*.css'],
                dest: './bin/dsm.style.css'
            }
        },
        ngtemplates: {
            app: {
                options: {
                    module: 'dsmApp'
                },
                src: ['./source/**/*.html', './source/**/*.htm'],
                dest: './bin/dsm.templates.js'
            }
        },
        watch: {
            build: {
                files: ['./source/**/*.*'],
                tasks: ['build'],
                options: {
                    spawn: false
                }
            }
        },
        notify: {
            build: {
                options: {
                    title: 'DSM Site',
                    message: 'Build complete.'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-notify');

    grunt.registerTask('build', ['concat:js', 'concat:css', 'ngtemplates:app', 'notify:build']);
    grunt.registerTask('build:full', ['concat:vendors', 'build']);
    grunt.registerTask('build:watch', ['watch:build']);
};