const API = process.env.VUE_APP_BACKEND_ENDPOINT;

const config = {
  API: {
    AUTH: `${API}/authentication`,
    WORKS_TAG: `${API}/works-tag`,
    IMG: `${API}/image`,
    WORKS_INFO: `${API}/works-info`,
    WORKS_CHAPTER: `${API}/works-chapter`,
  },
  GITHUB: {
    AUTH_URL: `${API}/oauth/github`,
    SCOPE: 'read:user, read:org, user:email',
    LOGIN_STATE: 'login',
  },
};

module.exports = config;