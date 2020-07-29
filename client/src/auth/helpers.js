import cookie from 'js-cookie';

// save in cookie
export const setCookie = (key, value) => {
  if (window !== 'undefined') {
    cookie.set(key, value, { expires: 1 });
  }
};
//remove from cookie
export const removeCookie = (key) => {
  if (window !== 'undefined') {
    cookie.remove(key, { expires: 1 });
  }
};

//get from cookie
export const getCookie = (key) => {
  if (window !== 'undefined') {
    return cookie.get(key);
  }
};
//set in localstorage
export const setLocalStorage = (key, value) => {
  if (window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

//remove from localstorage
export const removeLocalStorage = (key) => {
  if (window !== 'undefined') {
    localStorage.removeItem(key);
  }
};

// authenticate user  by passing data to cookie/local storage
export const authenticate = (response, next) => {
  setCookie('token', response.data.token);
  setLocalStorage('user', response.data.user);
  next();
};
//access user info from localstorage
export const isAuth = () => {
  if (window !== 'undefined') {
    const cookieChecked = getCookie('token');
    if (cookieChecked) {
      if (localStorage.getItem('user')) {
        return JSON.parse(localStorage.getItem('user'));
      } else {
        return false;
      }
    }
  }
};

//loads WBS to localstorage
export const isWBS = () => {
  if (window !== 'undefined') {
    const cookieChecked = getCookie('token');
    if (cookieChecked) {
      if (localStorage.getItem('wbs')) {
        return JSON.parse(localStorage.getItem('wbs'));
      } else {
        return false;
      }
    }
  }
};

//clears cookies and localstorage
export const signout = (next) => {
  removeCookie('token');
  removeLocalStorage('user');
  next();
};

// update user in localstorage
export const updateUser = (response, next) => {
  console.log('UPDATE USER LOCALSTORAGE', response);
  if (typeof window !== 'undefined') {
    let auth = JSON.parse(localStorage.getItem('user'));
    auth = response.data;
    localStorage.setItem('user', JSON.stringify(auth));
  }
  next();
};
