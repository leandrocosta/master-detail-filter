module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            all: ['**/*.js', '!node_modules/**', '!app/vendor/**', '!spec/helpers/**'],
        },

        csslint: {
            all: {
                src: ['**/*.css', '!node_modules/**', '!app/vendor/**'],
            }
        },

        jsvalidate: {
            options: {
                verbose: false,
            },
            all: {
                files: {
                    src: ['<%= jshint.all %>'],
                }
            }
        },

        connect: {
            main: {
                options: {
                    port: 8888,
                    base: 'app',
                }
            },
            test: {
                options: {
                    port: 8889,
                }
            }
        },

        jasmine: {
            all: {
                src: ['app/**/*.js', '!app/vendor/**'],
                options: {
                    host: 'http://127.0.0.1:8889/',
                    specs: ['spec/**/*.js', '!spec/helpers/**'],
                    helpers: 'spec/helpers/**/*.js',
                    keepRunner: true,
                    template: require('grunt-template-jasmine-requirejs'),
                    templateOptions: {
                        requireConfigFile: 'app/main.js',
                        requireConfig: {
                            baseUrl: './app/',
                        }
                    }
                }
            }
        },

        watch: {
            options: {
                livereload: true,
            },
            all: {
                files: ['Gruntfile.js', 'spec/**/*.js', 'app/**/*', '!app/vendor/**'],
                tasks: ['jshint', 'jsvalidate', 'jasmine'],
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-jsvalidate');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-jasmine');

    // Default task.
    grunt.registerTask('default', ['connect', 'watch']);

    // Travis CI task.
    grunt.registerTask('travis', ['jshint', 'jsvalidate', 'connect', 'jasmine']);
};
