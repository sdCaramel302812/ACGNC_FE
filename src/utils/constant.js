const API = process.env.VUE_APP_BACKEND_ENDPOINT;

const config = {
  API: {
    AUTH: `${API}/authentication`,
    WORKS_TAG: `${API}/works-tag`,
    IMG: `${API}/image`,
    WORKS_INFO: `${API}/works-info`,
    WORKS_CHAPTER: `${API}/works-chapter`,
  }
};

module.exports = config;