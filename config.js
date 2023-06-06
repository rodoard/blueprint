require("dotenv/config");

const getConfigOrFail = (prop) => {
  const value = process.env[prop];
  if (value === undefined) {
    throw new Error(`Required env var: ${prop} is undefined`);
  }
  return value;
};

const config = {
  PORT: getConfigOrFail("PORT"),
  DATABASE_URL: getConfigOrFail("DATABASE_URL"),
  NODE_ENV: getConfigOrFail("NODE_ENV"),
  DEFAULT_PATIENT_ID: "12345",
  SAMPLE_QUESTION_DOMAIN: "sampleQueryDomain",
  SAMPLE_ASSESSMENT_CRITERIA: "sampleAssessmentCriteria"
};

module.exports = config;
