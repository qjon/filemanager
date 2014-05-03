module.exports = function(grunt) {

    var SERVER_PORT = 3000;
    var path = require('path');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        bower: {
            install: {
                options: {
                    targetDir: '<%= pkg.options.client.src %>/components',
                    install: true,
                    verbose: true,
                    cleanTargetDir: true,
                    cleanBowerDir: false,
                    layout: 'byComponent'
                }
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            files: ['<%= pkg.options.client.src %>/js/app/**/*.js']
        },
        less: {
            dist: {
                options: {
                },
                files: {
                    "<%= pkg.options.client.dist %>/css/main.min.css": "<%= pkg.options.client.src %>/css/main.less"
                }
            }
        },
        express: {
            options: {
                // Override defaults here
                background: true,
                delay: 500
            },
            dev: {
                options: {
                    script: '<%= pkg.options.server.script %>'
                }
            }
        },
        reload: {
            port: 8001,
            liveReload: {},
            proxy: {
                host: 'localhost',
                port: SERVER_PORT // should match server.port config
            }
        },
        uglify: {
            options: {
                mangle: false
            },
            files: {
                src: ['<%= pkg.options.client.src %>/js/app/app.js', '<%= pkg.options.client.src %>/js/app/controllers.js'],
                dest: '<%= pkg.options.client.dist %>/js/app.min.js'
            }
        },
        watch: {
            options: {
                spawn: false
            },
            files: ['<%= pkg.options.client.src %>/js/src/app/**', '<%= pkg.options.client.src %>/css/**', '/index.html', '<%= pkg.options.client.src %>/data/**/*.json'],
            tasks: ['jshint', 'less', 'uglify', 'reload']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-reload');



    grunt.registerTask('install', ['bower:install']);
    // Default task(s).
    grunt.registerTask('default', ['jshint', 'less', 'express', 'uglify', 'reload', 'watch']);
};