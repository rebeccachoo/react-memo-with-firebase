import React, { useState, useEffect } from "react";
import { Input, Button } from "@material-ui/core";
import "./MemoForm.css";

const MemoForm = (props) => {
	const [memo, setMemo] = useState("");

	useEffect(() => {
		if (props.updateStatus) {
			setMemo(props.keyword);
		}
	}, [props]);

	return (
		<div className="InputForm">
			<Input
				className="InputFormInput"
				type="text"
				value={memo}
				onChange={(event) => setMemo(event.target.value)}
			/>
			<Button
				onClick={(event) => props.add(memo)}
				className="InputButton"
				variant="outlined"
				color="secondary"
			>
				{props.updateStatus ? "Update" : "Save"}
			</Button>
		</div>
	);
};

export default MemoForm;
