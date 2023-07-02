export const SET_USER = 'users/SET_USER';
export const UPDATE_USER_NAME = 'users/UPDATE_USER_NAME';
export const UPDATE_USER_PHOTO_URL = 'users/UPDATE_USER_PHOTO_URL';

export const getUserData = (payload) => {
  return {
    type: SET_USER,
    payload
  };
};

export const updateUserImg = (payload) => {
  return {
    type: UPDATE_USER_PHOTO_URL,
    payload
  };
};

export const updateUserName = (payload) => {
  return {
    type: UPDATE_USER_NAME,
    payload
  };
};

//초기 상태값
const initialState = [{}];

const users = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return action.payload;
    case UPDATE_USER_PHOTO_URL:
      return { ...state, photoURL: action.payload };
    case UPDATE_USER_NAME:
      return { ...state, displayName: action.payload };
    default:
      return state;
  }
};

// 모듈파일에서는 리듀서를 export default 한다.
export default users;
