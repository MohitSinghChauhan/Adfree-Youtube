import { CheckCircle } from "@mui/icons-material";
import { Box, CardMedia, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import { Videos } from "./";
import ReactPlayer from "react-player";
import { Link, useParams } from "react-router-dom";
import { demoProfilePicture } from "../utils/constants";
import { fetchFromAPI } from "../utils/fetchFromAPI";
let chanId;

const VideoDetail = () => {
	const [videoDetail, setVideoDetail] = useState(null);
	const [channelDetail, setChannelDetail] = useState(null);
	const [videos, setVideos] = useState([]);
	const [comments, setComments] = useState([]);
	const [isDescripShown, setIsDescripShown] = useState(false);
	const [isCommentsShown, setIsCommentsShown] = useState(false);
	const { id } = useParams();
	useEffect(() => {
		fetchFromAPI(`videos?part=snippet,statistics&id=${id}`).then((data) => {
			setVideoDetail(data.items[0]);
			chanId = data.items[0].snippet.channelId;
		});
		fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`).then(
			(data) => {
				setVideos(data.items);
			}
		);
		fetchFromAPI(
			`commentThreads?part="snippet&videoId=${id}&maxResults=100`
		).then((data) => {
			setComments(data?.items);
		});
	}, [id]);
	useEffect(() => {
		fetchFromAPI(`channels?part="snippet,statistics&id=${chanId}`).then(
			(data) => {
				setChannelDetail(data?.items[0]);
			}
		);
	}, [chanId]);
	if (!videoDetail?.snippet) return "Loading";

	const {
		snippet: { title, channelId, channelTitle, description },
		statistics: { viewCount, likeCount },
	} = videoDetail;
	console.log(comments);

	return (
		<Box minHeight={"95vh"}>
			<Stack
				direction={{ xs: "column", md: "row" }}
				sx={{
					alignItems: { xs: "center", md: "flex-start" },
					justifyContent: "center",
				}}
			>
				<Box
					flex={1}
					sx={{
						width: { xs: "95%", md: "75%" },
						maxWidth: "960px",
						position: "relative",
						// top: "5vh",
						paddingX: { xs: "2vw", md: "4vw" },
					}}
				>
					<Box>
						<ReactPlayer
							url={`https://www.youtube.com/watch?v=${id}`}
							style={{
								position: "sticky",
								aspectRatio: "16/9",
							}}
							className="react-player"
							controls
						/>

						<Typography p={2} color="#fff" variant="h5" fontWeight="bold">
							{title}
						</Typography>
						<Stack
							direction="row"
							justifyContent="space-between"
							alignItems="center"
							sx={{ color: "#fff" }}
							py={1}
							px={2}
						>
							<Link
								to={`/channel/${channelId}`}
								sx={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								<CardMedia
									image={
										channelDetail?.snippet?.thumbnails?.default?.url ||
										demoProfilePicture
									}
									alt={channelDetail?.snippet?.title}
									sx={{
										borderRadius: "50%",
										width: "64px",
										height: "64px",
										border: "2px solid #e3e3e3",
										display: "inline-block",
									}}
								/>
								<Typography
									variant={{ sm: "subtitle1", md: "h6" }}
									color="#fff"
									fontFamily="monospace"
									display="inline-block"
								>
									{channelTitle}
									<CheckCircle
										sx={{
											fontSize: "14px",
											color: "gray",
											ml: "5px",
											position: "relative",
											top: "4px",
										}}
									/>
								</Typography>
							</Link>
							<Typography
								variant={{ sm: "subtitle1", md: "h6" }}
								color="#fff"
								fontFamily="monospace"
								textAlign="right"
							>
								{parseInt(viewCount).toLocaleString()} :views <br /> <br />
								{parseInt(likeCount).toLocaleString()} :likes
							</Typography>
						</Stack>
						<Stack className="description-stack">
							<Typography
								variant={{ sm: "subtitle1", md: "h6" }}
								color="#fff"
								fontFamily="monospace"
								height="auto"
								sx={{
									backgroundColor: "#272727",
									borderRadius: "10px",
									padding: { xs: "4px", md: "8px" },
								}}
							>
								{`Description: ${
									!isDescripShown
										? description.slice(0, 50) + "..."
										: description
								}`}
							</Typography>
							{!isDescripShown && (
								<Typography
									sx={{ cursor: "pointer", mb: "4px" }}
									variant={{ sm: "subtitle1", md: "h6" }}
									color="#fff"
									fontFamily="monospace"
									height="14px"
									textAlign="right"
									onClick={() => {
										setIsDescripShown(true);
									}}
								>
									⬆ show more
								</Typography>
							)}
							{isDescripShown && (
								<Typography
									sx={{ cursor: "pointer", mb: "4px" }}
									variant={{ sm: "subtitle1", md: "h6" }}
									color="#fff"
									fontFamily="monospace"
									height="14px"
									textAlign="right"
									onClick={() => {
										setIsDescripShown(false);
									}}
								>
									⬆ show less
								</Typography>
							)}
							{/* // <Typography>show less</Typography> */}
						</Stack>
						<Stack className="comment-stack">
							<Typography
								variant={{ sm: "subtitle1", md: "h6" }}
								color="#fff"
								fontFamily="monospace"
								height="auto"
								sx={{
									backgroundColor: "#272727",
									borderRadius: "10px",
									padding: { xs: "4px", md: "8px" },
								}}
							>
								{!isCommentsShown
									? `Comments...`
									: comments.map((item) => (
											<Stack>
												<Box display="flex" padding="4px">
													<Stack>
														<Box marginRight="6px">
															<Link
																to={`/channel/${channelId}`}
																sx={{
																	display: "flex",
																	justifyContent: "center",
																	alignItems: "center",
																}}
															>
																<CardMedia
																	image={
																		item?.snippet?.topLevelComment?.snippet
																			?.authorProfileImageUrl ||
																		demoProfilePicture
																	}
																	alt={channelDetail?.snippet?.title}
																	sx={{
																		borderRadius: "50%",
																		width: "64px",
																		height: "64px",
																		border: "2px solid #e3e3e3",
																		display: "inline-block",
																	}}
																/>
															</Link>
														</Box>
													</Stack>
													<Stack
														display="flex"
														direction="column"
														justifyContent="space-between"
													>
														<Box>
															{
																item?.snippet?.topLevelComment?.snippet
																	?.authorDisplayName
															}
														</Box>
														<Box>
															{
																item?.snippet?.topLevelComment?.snippet
																	?.textDisplay
															}
														</Box>
														<Stack
															display="flex"
															justifySelf="flex-end"
															direction="row"
														>
															<Typography>👍 </Typography>
															<Typography>
																{
																	item?.snippet?.topLevelComment?.snippet
																		?.likeCount
																}
															</Typography>
															<Typography> 👎 </Typography>
															<Typography>reply</Typography>
														</Stack>
													</Stack>
												</Box>
											</Stack>
									  ))}
							</Typography>
							{!isCommentsShown && (
								<Typography
									sx={{ cursor: "pointer", mb: "4px" }}
									variant={{ sm: "subtitle1", md: "h6" }}
									color="#fff"
									fontFamily="monospace"
									height="14px"
									textAlign="right"
									onClick={() => {
										setIsCommentsShown(true);
									}}
								>
									⬆ show comments
								</Typography>
							)}
							{isCommentsShown && (
								<Typography
									sx={{ cursor: "pointer", mb: "4px" }}
									variant={{ sm: "subtitle1", md: "h6" }}
									color="#fff"
									fontFamily="monospace"
									height="14px"
									textAlign="right"
									onClick={() => {
										setIsCommentsShown(false);
									}}
								>
									⬆ hide comments
								</Typography>
							)}
							{/* // <Typography>show less</Typography> */}
						</Stack>
					</Box>
				</Box>
				<Box sx={{ width: "25%", paddingX: { xs: "2vw", md: "4vw" } }}>
					<Videos videos={[...videos]} />
				</Box>
			</Stack>
		</Box>
	);
};

export default VideoDetail;
