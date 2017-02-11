module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            vendors: {
                src: [
                    './node_modules/angular/angular.min.js'
                ],
                dest: './bin/vendors.js'
            },
            app: {
                src: ['./source/**/*.js'],
                dest: './bin/dsm.app.js'
            }
        },
        ngtemplates: {
            app: {
                options: {
                    module: 'dsm.app'
                },
                src: ['./source/**/*.html', './source/**/*.htm'],
                dest: './bin/dsm.templates.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-angular-templates');

    grunt.registerTask('build', ['concat:app', 'ngtemplates:app']);
    grunt.registerTask('build:full', ['concat:vendors', 'build']);
};