import React, { useState } from "react";
import { Input, Button } from "@material-ui/core";
import "./MemoForm.css";

const MemoForm = (props) => {
	const [memo, setMemo] = useState("");

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
				Save
			</Button>
		</div>
	);
};

export default MemoForm;
