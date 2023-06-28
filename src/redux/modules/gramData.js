// export const SET_FEED = 'grams/SET_FEED';

// export const getdata = (payload) => {
//   return {
//     type: SET_FEED,
//     payload
//   };
// };

//초기 상태값
const initialState = [
  {
    contents: 'a',
    time: 1351385,
    name: 'a',
    user_img: 'a',
    id: 1,
    posts_img:
      'https://firebasestorage.googleapis.com/v0/b/gardengram-b2bb2.appspot.com/o/56da4645aaa%2F1309ec5e-d1b0-4de4-82bc-fc88731cc956?alt=media&token=0b7723c1-ea1f-46d5-b858-d1f00de8a67e',
    like_count: 4
  },
  { contents: 'b', time: 1351385, name: 'b', user_img: 'b', id: 2, posts_img: 'b', like_count: 3 },
  { contents: 'c', time: 1351385, name: 'c', user_img: 'c', id: 3, posts_img: 'c', like_count: 5 }
];

const grams = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

// 모듈파일에서는 리듀서를 export default 한다.
export default grams;
