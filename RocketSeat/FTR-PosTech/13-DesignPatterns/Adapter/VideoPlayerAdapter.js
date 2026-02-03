const AudioPlayer = require("./AudioPlayer");
const VideoPlayer = require("./VideoPlayer");

class VideoPlayerAdapter extends AudioPlayer {
  constructor() {
    super();
    this.videoPlayer = new VideoPlayer();
  }

  playAudio(fileName) {
    console.log("Adaptador em ação: usando o VidePlayer para reproduzir áudio");
    this.videoPlayer.playMedia(fileName);
  }
}

module.exports = VideoPlayerAdapter;
