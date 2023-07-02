export const SET_FEED = 'grams/SET_FEED';
export const DELETE_FEED = 'grams/DELETE_FEED';
export const UPDATE_CONTENT = 'grams/UPDATE_CONTENT';

export const getdata = (payload) => {
  return {
    type: SET_FEED,
    payload
  };
};

export const updateContent = (id, content) => ({
  type: UPDATE_CONTENT,
  payload: { id, content }
});

//초기 상태값
const initialState = [];

const grams = (state = initialState, action) => {
  switch (action.type) {
    case SET_FEED:
      return action.payload;
    case DELETE_FEED:
      return state.filter((item) => item.feed_id !== action.payload);
    case UPDATE_CONTENT:
      return state.map((gram) => {
        return gram.id === action.payload.id ? { ...gram, contents: action.payload.content } : gram;
      });
    default:
      return state;
  }
};

// 모듈파일에서는 리듀서를 export default 한다.
export default grams;
