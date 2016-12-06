module.exports = function(grunt) {
  grunt.initConfig({
    jshint: {
      files: ['../app/**/*.js'],
      options: {
        predef: ["document", "console", "$", "event", "alert", "module", "require", "angular", "firebase" ],
        esnext: true,
        globalstrict: true,
        globals: {"app": true, "$scope": true}
      }
    },
    sass: {
      dist: {
        files: {
// target: source
          '../css/styles.css': '../sass/styles.sass'
        }
      }
    },
    watch: {
      javascripts: {
        files: ['../app/**/*.js'],
        tasks: ['jshint']
      },
      sass: {
        files: ['../sass/**/*.sass'],
        tasks: ['sass']
      },
   }
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.registerTask('default', ['jshint', 'sass', 'watch']);
};