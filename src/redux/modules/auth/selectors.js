

/**
 * @function
 * @name accessTokenSelector
 * @param {Object} state redux state
 * @return {string} accessToken
 * */
export const accessTokenSelector = ({auth}) => auth.login?.accessToken;

/**
 * @function
 * @name isLoginSelector
 * @param {Object} state redux state
 * @return {boolean} isLogin
 * */
export const isLoginSelector = ({auth}) => auth.login?.isLogin;

/**
 * @function
 * @name loginErrorMessageSelector
 * @param {Object} state redux state
 * @return {Object} errorMessage
 * */
export const loginErrorMessageSelector = ({auth}) => auth.login?.errorMessage
