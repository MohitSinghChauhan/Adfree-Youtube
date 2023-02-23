import React from "react";
import { Typography, Card, CardContent, CardMedia } from "@mui/material";
import { CheckCircle, Verified } from "@mui/icons-material";
import {
	demoThumbnailUrl,
	demoVideoUrl,
	demoVideoTitle,
	demoChannelUrl,
	demoChannelTitle,
} from "../utils/constants";
import { Link } from "react-router-dom";

const VideoCard = ({
	video: {
		id: { videoId },
		snippet,
	},
}) => {
	return (
		<Card
			sx={{
				width: { md: "350px", xs: `95vw` },
				boxShadow: "none",
				borderRadius: "10px",
			}}
		>
			<Link to={videoId ? `/video/${videoId}` : demoVideoUrl}>
				<CardMedia
					image={snippet?.thumbnails?.high?.url}
					alt={snippet?.title}
					sx={{
						width: {
							xs: "100%",
							md: "350px",
						},

						height: {
							xs: "280px",
							md: "180px",
						},
					}}
				/>
			</Link>
			<CardContent sx={{ backgroundColor: "#1e1e1e", height: "80px" }}>
				<Link to={videoId ? `/video/${videoId}` : demoVideoUrl}>
					<Typography variant="subtitle1" fontWeight="bold" color="#fff">
						{snippet?.title.slice(0, 60) || demoVideoUrl.slice(0, 60)}
					</Typography>
				</Link>
				<Link
					to={
						snippet?.channelId
							? `/channel/${snippet?.channelId}`
							: demoChannelUrl
					}
				>
					<Typography variant="subtitle1" fontWeight="bold" color="#fff">
						{snippet?.channelTitle || demoChannelTitle}
						<CheckCircle sx={{ fontSize: 12, color: "gray", ml: "5px" }} />
					</Typography>
				</Link>
			</CardContent>
		</Card>
	);
};

export default VideoCard;
