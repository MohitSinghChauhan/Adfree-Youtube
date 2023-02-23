import React, { useState } from "react";
import { IconButton, Paper } from "@mui/material";
import { Search } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const navigate = useNavigate();
	const submitHandler = (e) => {
		e.preventDefault();
		if (searchTerm) {
			navigate(`/search/${searchTerm}`);
			setSearchTerm("");
		}
	};
	return (
		<Paper
			component="form"
			onSubmit={submitHandler}
			sx={{
				border: "1px solid #e3e3e3",
				borderRadius: 20,
				pl: 2,
				mr: { sm: 5 },
				boxShadow: "none",
			}}
		>
			<input
				type="text"
				className="search-bar"
				placeholder="Search..."
				value={searchTerm}
				onChange={(e) => {
					setSearchTerm(e.target.value);
				}}
			/>
			<IconButton
				type="submit"
				sx={{
					p: "10px",
					color: "red",
				}}
			>
				<Search />
			</IconButton>
		</Paper>
	);
};

export default SearchBar;
