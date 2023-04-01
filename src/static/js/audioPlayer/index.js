import { axios } from "./../axios.js";

console.log(axios);

/**
 * @description Audio Element
 * @type {HTMLAudioElement}
 */
export const audioElement = document.getElementById(
  "js.audioPlayer.useRef.audio"
);

/**
 * @description URL을 재생합니다.
 * @param {String} id 곡의 ID
 */
export const playFile = async (id) => {
  audioElement.pause();
  axios.get("/").then((v) => {
    console.log(v.data);
  });
};

playFile("");
