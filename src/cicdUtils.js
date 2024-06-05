function hasBuildJob(config) {
  const jobs = config.jobs;
  return jobs && jobs.build;
}

module.exports = { hasBuildJob };
