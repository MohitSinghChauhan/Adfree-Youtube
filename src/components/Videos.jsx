import { Box } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import { VideoCard, ChannelCard } from "./";

const Videos = ({ videos }) => {
	return (
		<Stack
			direction="row"
			flexWrap="wrap"
			justifyContent="space-evenly"
			gap={2}
		>
			{videos.map((item, idx) => (
				<Box key={idx}>
					{item?.id.videoId && <VideoCard video={item} />}
					{item?.id.channelId && <ChannelCard channelDetail={item} />}
				</Box>
			))}
		</Stack>
	);
};

export default Videos;
