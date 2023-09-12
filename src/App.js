import { Grid } from "@mui/material";
import youtube from "./api/youtube";
import { SearchBar } from "./components/SearchBar";
import { VideoList } from "./components/VideoList";
import { VideoDetail } from "./components/VideoDetail";
import { useState } from "react";

function App() {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideos] = useState({ id: {}, snippet: {} });

  const handleSubmit = async (searchItem) => {
    const {
      data: { items: videos },
    } = await youtube.get("search", {
      params: {
        part: "snippet",
        maxResults: 5,
        key: "AIzaSyCYfOBo6d2nolRI9XcKSa-WhCZS-Njcs9c",
        q: searchItem,
      },
    });
    setVideos(videos);
    setSelectedVideos(videos[0]);
  };

  return (
    <Grid style={{ justifyContent: "center" }} container spacing={10}>
      <Grid item xs={11}>
        <Grid container spacing={10}>
          <Grid item xs={12}>
            <SearchBar onSubmit={handleSubmit} />
          </Grid>
          <Grid item xs={8}>
            <VideoDetail video={selectedVideo} />
          </Grid>
          <Grid item xs={4}>
            <VideoList videos={videos} onVideoSelect={setSelectedVideos} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default App;
