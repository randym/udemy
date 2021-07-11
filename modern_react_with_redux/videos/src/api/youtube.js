import axios from "axios";
const KEY = "AIzaSyBK7GGMLjBAmQGVxBP5uN-635g07YrWttI";

const youtube = {
  resource: axios.create({ baseURL: "https://www.googleapis.com/youtube/v3" }),

  async search(q) {
    return this.resource.get("/search", {
      params: {
        key: KEY,
        part: "snippet",
        q,
        type: "video",
        regionCode: "US",
      },
    });
  },
};

export default youtube;
