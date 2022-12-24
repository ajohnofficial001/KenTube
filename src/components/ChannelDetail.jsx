import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";

import { Videos, ChannelCard, Loader } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";

const ChannelDetail = () => {
  const [channelDetail, setChannelDetail] = useState();
  const [videos, setVideos] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchResults = async () => {
      const data = await fetchFromAPI(
        `channels?part=snippet,statistics&id=${id}`
      );

      setChannelDetail(data?.items[0]);

      const videosData = await fetchFromAPI(
        `search?channelId=${id}&part=snippet&order=date`
      );

      setVideos(videosData?.items);
    };

    fetchResults();
  }, [id]);

  if (!videos?.length) return <Loader />;
  return (
    <Box minHeight="95vh" style={{ marginTop: "4.6rem" }}>
      <Box>
        <div style={{ background: "1e31e3", zIndex: 10, height: "300px" }}>
          <ChannelCard channelDetail={channelDetail} marginTop="-110px" />
        </div>
      </Box>
      <Box display="flex" p="2">
        <Box sx={{ mr: { sm: "100px" } }} />
        <Videos videos={videos} />
      </Box>
    </Box>
  );
};

export default ChannelDetail;
