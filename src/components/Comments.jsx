import { Stack } from "@mui/material";
import React from "react";

const Comments = ({
	textDisplay,
	authorDisplayName,
	authorProfileImageUrl,
	authorChannelUrl,
}) => {
	console.log(textDisplay);
	return (
		<Stack display="flex" direction="column">
			Hello
			{/* {comments.map((item) => { 
      return()
     })} */}
		</Stack>
	);
};

export default Comments;
