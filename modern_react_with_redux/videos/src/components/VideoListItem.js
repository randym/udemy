import React from "react";
import "./VideoListItem.css";

/*

// https://developers.google.com/youtube/v3/docs/search#resource
const fixture = {
  kind: "youtube#searchResult",
  etag: "U21Po-KMvdNZ7xiYZgqhPjinEps",
  id: {
    kind: "youtube#video",
    videoId: "ma67yOdMQfs",
  },
  snippet: {
    publishedAt: "2021-01-23T17:00:15Z",
    channelId: "UC--3c8RqSfAqYBdDjIG3UNA",
    title: "These Were The All-Time Surfing Moments Of The Year | Best Of 2020",
    description:
      "Well, that was a weird ride. Though it hasn't been easy, at least when we fixed our gaze on the ocean — or favorite place in the world – very little had changed.",
    thumbnails: {
      default: {
        url: "https://i.ytimg.com/vi/ma67yOdMQfs/default.jpg",
        width: 120,
        height: 90,
      },
      medium: {
        url: "https://i.ytimg.com/vi/ma67yOdMQfs/mqdefault.jpg",
        width: 320,
        height: 180,
      },
      high: {
        url: "https://i.ytimg.com/vi/ma67yOdMQfs/hqdefault.jpg",
        width: 480,
        height: 360,
      },
    },
    channelTitle: "Red Bull Surfing",
    liveBroadcastContent: "none",
    publishTime: "2021-01-23T17:00:15Z",
  },
};
*/
const VideoListItem = ({ selected, video, onClick }) => {
  const { snippet } = video;
  const { title, thumbnails, description } = snippet;

  return (
    <li
      className={`video-list-item item ${selected ? "selected" : ""}`}
      onClick={() => onClick(video)}
    >
      <img
        alt={`video item ${title}`}
        src={thumbnails.default.url}
        className="image ui"
      ></img>
      <div className="content">
        <div
          className="header"
          dangerouslySetInnerHTML={{ __html: title }}
        ></div>
        <div className="description">{description}</div>
      </div>
    </li>
  );
};

export default VideoListItem;
