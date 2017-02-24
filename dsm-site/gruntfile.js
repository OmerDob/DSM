module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        appModules: grunt.file.readJSON('appModules.json'),
        concat: {
            vendors: {
                src: [
                    './node_modules/angular/angular.js',
                    './node_modules/angular-route/angular-route.js',
                    './node_modules/angular-animate/angular-animate.js',
                    './node_modules/angular-messages/angular-messages.js'
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
                src: ['./source/**/*.html', './source/**/*.htm', '!./source/index.html'],
                dest: './bin/dsm.templates.js'
            }
        },
        watch: {
            build: {
                files: ['source/**/*.*'],
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
        },
        browserify: {
            app: {
                files: {
                    './bin/dsm.app.js': ['./bin/dsm.app.js']
                }
            }
        },
        copy: {
            index: {
                src: ['./source/index.html'],
                dest: './bin/index.html'
            },
            resources: {
                expand: true,
                cwd: 'resources',
                src: '**',
                dest: 'bin/'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-notify');
    grunt.loadNpmTasks('grunt-browserify');

    grunt.registerTask('build', ['concat:js', 'browserify:app', 'concat:css', 'ngtemplates:app', 'notify:build']);
    grunt.registerTask('build:full', ['concat:vendors', 'build', 'copy:index', 'copy:resources']);
    grunt.registerTask('build:watch', ['watch:build']);
};