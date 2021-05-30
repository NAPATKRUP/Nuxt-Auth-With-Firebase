import { auth } from "@/services/firebase";
import Cookie from "js-cookie";

export const state = () => ({
  user: null
});

export const mutations = {
  SET_USER: (state, account) => {
    state.user = account;
  }
};

export const getters = {
  getUser: (state) => {
    return state.user
  }
};

export const actions = {
  async login({ commit }, account) {
    try {
      await auth.signInWithEmailAndPassword(account.email, account.password);

      const token = await auth.currentUser.getIdToken();
      Cookie.set("access_token", token, { expires: 7 });

      const { email, uid } = auth.currentUser;
      commit("SET_USER", { email, uid });
    } catch (error) {
      throw error;
    }
  },
  async logout({ commit }) {
    await auth.signOut();
    await Cookie.remove("access_token");
    commit("SET_USER", null);
  }
};
