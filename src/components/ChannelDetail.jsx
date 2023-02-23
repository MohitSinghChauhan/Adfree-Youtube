import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Box } from "@mui/material";
import { Videos, ChannelCard } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";

const ChannelDetail = () => {
	const [channelDetail, setChannelDetail] = useState(null);
	const [videos, setVideos] = useState([]);
	console.log(channelDetail, videos);
	const { id } = useParams();

	useEffect(() => {
		fetchFromAPI(`channels?part="snippet&id=${id}`).then((data) => {
			setChannelDetail(data?.items[0]);
		});
		fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`).then(
			(data) => {
				setVideos(data?.items);
			}
		);
	}, [id]);
	return (
		<Box minHeight={"95vh"}>
			<Box>
				<div
					style={{
						background: `linear-gradient(45deg, rgba(0,211,255,1) 0%, rgba(223,0,255,1) 69%, rgba(249,27,255,1) 100%)`,
						zIndex: 10,
						height: "300px",
					}}
				/>
				<ChannelCard
					channelDetail={channelDetail}
					marginTop="-160px"
					onChannelDetail="true"
				/>
			</Box>
			<Box display="flex" p={2}>
				<Box>
					<Videos videos={[...videos]} />
				</Box>
			</Box>
		</Box>
	);
};

export default ChannelDetail;
