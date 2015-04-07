module.exports = function(grunt) {
    

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        libsdir: 'bower_components',
        watch: {
            scripts: {
                files: ['**/*.js', '**/*.css'],
                tasks: ['concat'],
                options: {
                    livereload: true
                }
            },
            livereload: {
                options: {
                  livereload: '<%= connect.options.livereload %>'
                },
                files: '<%= pkg.files%>'
            }
        },
        connect: {
            useAvailablePort: true,
          options: {
            port: 9000,
            // Change this to '0.0.0.0' to access the server from outside.
            hostname: '127.0.0.1',
            livereload: 35729
          },
          livereload: {
            options: {
              open: true,
              base: [
                'app'
              ]
            }
          },
          dist: {
            options: {
              base: 'app'
            }
          }
        },
        concat: {
            options: {
                separator: ';'
            },
            distJS: {
                //src: ['src/**/*.js'],
                src: '<%= pkg.files%>',
                dest: 'dist/js/<%= pkg.name %>.js'
            },
            distCSS: {
                src: ['css/*.css'],
                dest: 'dist/css/<%= pkg.name %>.css'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            distJS: {
                files: {
                    'dist/js/<%= pkg.name %>.min.js': ['<%= concat.distJS.dest %>']
                }
            }
        },
        copy: {
            main: {
                files: [
                    // includes files within path
                    {
                        expand: true, 
                        src: ['index.html'], 
                        dest: 'dist'
                    },
                    {
                        src: '<%=  libsdir %>/angular/angular.min.js',
                        dest : 'dist/libs/angular.js'
                    },
                    {
                        src: '<%=  libsdir %>/angular/angular.min.js.map',
                        dest : 'dist/libs/angular.min.js.map'
                    },
                    {
                        src: '<%=  libsdir %>/jquery-2.1.0.min/index.js',
                        dest : 'dist/libs/jquery.js'
                    },
                    {
                        src: '<%=  libsdir %>/ol3css/index.css',
                        dest : 'dist/libs/ol.css'
                    },
                    {
                        src: '<%=  libsdir %>/ol3js/index.js',
                        dest : 'dist/libs/ol.js'
                    },
                    {
                        src: '<%=  libsdir %>/bootstrap/dist/css/bootstrap.min.css',
                        dest : 'dist/libs/bootstrap.css'
                    },
                    {
                        src: '<%=  libsdir %>/bootstrap/dist/js/bootstrap.min.js',
                        dest : 'dist/libs/bootstrap.js'
                    },
                    {
                        expand: true, 
                        cwd: '<%=  libsdir %>/bootstrap/dist/fonts/',
                        src    : ['**'],
                        dest : 'dist/libs/fonts'
                    },
                    {   
                        expand: true, 
                        src: ['views/*'], 
                        dest: 'dist/', 
                        filter: 'isFile'
                    }
                ]
            }
        },
        /*shell: {
            multiple: {
                command: [
                    'cd bower_components/ol3',
                    'sudo npm install',
                    //'sudo pip install -r requirements.txt'
                    'cat requirements.txt | sudo xargs easy_install' //MAC OS
                ].join('&&')
            }
        }*/
  });

  //grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  //grunt.loadNpmTasks('grunt-shell');
  //grunt.registerTask('default', ['concat', 'uglify', 'copy', 'shell']);
  grunt.registerTask('default', ['concat', 'copy']);
  
};