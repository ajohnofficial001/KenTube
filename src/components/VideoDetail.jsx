import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography, Box, Stack, CardMedia } from "@mui/material";
import { Videos, Loader } from "./";
import { demoProfilePicture } from "../utils/constant";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import { CheckCircle } from "@mui/icons-material";

const VideoDetail = () => {
  const [videoDetail, setVideoDetail] = useState(null);
  {
    /* const [channelDetail, setChannelDetail] useState(null); */
  }
  const [videos, setVideos] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    {
      /*fetchFromAPI(`channels?part=snippet,statistics&id=${id}`).then((data) =>
      setChannelDetail(data?.items[0])
  ); */
    }
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`).then((data) =>
      setVideoDetail(data.items[0])
    );

    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}`).then((data) =>
      setVideos(data.items)
    );
  }, [id]);

  if (!videoDetail?.snippet) return <Loader />;

  const {
    snippet: { title, channelId, channelTitle },
    statistics: { viewCount, likeCount },
  } = videoDetail;

  return (
    <Box minHeight="95vh" style={{ marginTop: "6.5rem" }}>
      <Stack direction={{ xs: "column", md: "row" }}>
        <Box flex={1}>
          <Box sx={{ width: "100%", position: "sticky", top: "86px" }}>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              className="react-player"
              controls
            />
            <Typography color="#ffffff" variant="h5" fontWeight="bold" p={2}>
              {title}
            </Typography>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ color: "#fff" }}
              py={1}
              px={2}
            >
              <Link to={`/channel/${channelId}`} style={{ display: "flex" }}>
                {/* <CardMedia
                  image={
                    channelDetail?.snippet?.thumbnails?.high?.url ||
                    demoProfilePicture
                  }
                  alt={channelDetail?.snippet?.title}
                  sx={{
                    borderRadius: "50%",
                    height: "40px",
                    width: "40px",
                    border: "1px solid #e2e2e2",
                  }}
                /> */}
                <Typography
                  variant={{
                    sm: "subtitle",
                    md: "h4",
                  }}
                  style={{
                    fontFamily: "Inter",
                    marginTop: "14px",
                    marginLeft: "5px",
                  }}
                  color="#fff"
                >
                  {channelTitle}
                  <CheckCircle
                    sx={{ fontSize: "12px", color: "gray", ml: "5px" }}
                  />
                </Typography>
              </Link>
              <Stack>
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(viewCount).toLocaleString()} views
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(likeCount).toLocaleString()} likes
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
        <Box px={2} py={{ md: 1, xs: 5 }} justifyContent="center">
          <Videos videos={videos} direction="column" />
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetail;
