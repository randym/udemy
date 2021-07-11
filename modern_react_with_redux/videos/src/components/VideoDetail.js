import React from "react";

const VideoDetail = ({ video }) => {
  return (
    <div className="video-detail">
      <div className="ui embed">
        <iframe
          title="video player"
          src={`https://www.youtube.com/embed/${video?.id?.videoId}`}
        />
      </div>
      <div className="ui segment">
        <h4
          className="ui header"
          dangerouslySetInnerHTML={{ __html: video?.snippet?.title }}
        ></h4>
        <p className="ui content">{video?.snippet?.description}</p>
      </div>
    </div>
  );
};

export default VideoDetail;
