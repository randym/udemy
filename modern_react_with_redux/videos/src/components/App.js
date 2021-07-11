import React from "react";
import youtube from "../api/youtube";
import SearchBar from "./SearchBar";
import VideoDetail from "./VideoDetail";
import VideoList from "./VideoList";
import Spinner from "./Spinner";

class App extends React.Component {
  state = { videos: [], currentVideo: null, loading: false };

  onSearchSubmit = async (term) => {
    this.setState({ loading: true });
    const { data } = await youtube.search(term);
    this.setState({
      videos: data.items,
      loading: false,
      currentVideo: data.items[0],
    });
  };

  onVideoClick = (video) => {
    this.setState({ currentVideo: video });
  };

  render() {
    const { onSearchSubmit, onVideoClick, state } = this;
    const { loading, videos, currentVideo } = state;

    return (
      <div className="app ui">
        <SearchBar
          onSubmit={onSearchSubmit}
          className="search-bar ui segment"
        ></SearchBar>

        <div className="ui grid" style={{ margin: "1em" }}>
          {loading && <Spinner />}
          <div className="ui row">
            <div className="eleven wide column">
              {currentVideo && <VideoDetail video={currentVideo} />}
            </div>

            <div className="five wide column">
              <VideoList
                videos={videos}
                onSelected={onVideoClick}
                selection={currentVideo}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
