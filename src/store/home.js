

const home = {
  namespaced: true,
  state: {
    navbarClosed: true,
  },
  mutations: {
    setNavbarClosed(state, val) {
      state.navbarClosed = val;
    }
  },
};

export default home;
