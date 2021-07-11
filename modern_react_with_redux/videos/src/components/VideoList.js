import React from "react";
import VideoListItem from "./VideoListItem";

class VideoList extends React.Component {
  state = { selection: null };
  onVideoListItemClick = (video) => {
    this.props.onSelected(video);
  };

  render() {
    const { videos, selection } = this.props;
    const { onVideoListItemClick } = this;

    const items = videos.map((video) => {
      return (
        <VideoListItem
          key={video.etag}
          onClick={onVideoListItemClick}
          selected={selection === video}
          video={video}
        />
      );
    });

    return <ul className="video-list ui relaxed divided list">{items}</ul>;
  }
}

export default VideoList;
