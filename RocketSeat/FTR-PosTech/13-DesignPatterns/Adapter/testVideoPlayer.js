const VideoPlayerAdapter = require("./VideoPlayerAdapter");
const AudioPlayer = require("./AudioPlayer");

const audioPlayer = new VideoPlayerAdapter();

audioPlayer.playAudio("video.mp3");
