const API = process.env.VUE_APP_BACKEND_ENDPOINT;

const config = {
  API: {
    AUTH: `${API}/authentication`,
    WORKS_TAG: `${API}/works-tag`,
  }
};

module.exports = config;