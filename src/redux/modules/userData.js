export const SET_USER = 'users/SET_user';

export const getUserData = (payload) => {
  return {
    type: SET_USER,
    payload
  };
};

//초기 상태값
const initialState = [{}];

const users = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return action.payload;
    default:
      return state;
  }
};

// 모듈파일에서는 리듀서를 export default 한다.
export default users;
