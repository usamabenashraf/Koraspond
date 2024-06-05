const { hasBuildJob } = require('../src/cicdUtils.js');

test('checks if CI/CD pipeline config has a build job', () => {
  // Mock CI/CD pipeline config
  const configWithBuildJob = {
    jobs: {
      build: { name: 'build' }
    }
  };

  // Test if config with build job returns true
  expect(hasBuildJob(configWithBuildJob)).toBe(true);
});
