module.exports = function(grunt) {
  grunt.initConfig({
    yamllint: {
      all: ['**/*.yml', '**/*.yaml']
    }
  });

  grunt.loadNpmTasks('grunt-yamllint');

  grunt.registerTask('lint', ['yamllint']);
};
