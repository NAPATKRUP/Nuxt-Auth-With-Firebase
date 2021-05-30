import cookieparser from "cookieparser";
import JWTDecode from "jwt-decode";

export const actions = {
  nuxtServerInit({ commit }, { req }) {
    if (process.server && process.static) return;
    if (!req.headers.cookie) return;

    const parsed = cookieparser.parse(req.headers.cookie);
    const accessTokenCookie = parsed.access_token;

    if (!accessTokenCookie) return;

    const decodeToken = JWTDecode(accessTokenCookie);

    if (decodeToken) {
      commit("users/SET_USER", {
        uid: decodeToken.user_id,
        email: decodeToken.email
      });
    }
  }
};
