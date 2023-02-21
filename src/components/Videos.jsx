import { Box } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";

const Videos = ({ videos }) => {
	console.log(videos);
	return (
		<Stack
			direction="row"
			flexWrap="wra
  "
			justifyContent="star
  "
			gap={2}
		>
			{videos.map((item, idx) => (
				<Box key={idx}></Box>
			))}
		</Stack>
	);
};

export default Videos;
