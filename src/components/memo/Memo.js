import React, { useState, useEffect } from "react";
import axios from "axios";
import MemoForm from "./MemoForm";
import MemoList from "./MemoList";
import "./Memo.css";

const Memo = (props) => {
	const [memos, setMemos] = useState([]);
	const [updateStatus, setUpdateStatus] = useState(false);
	const [updateKeyword, setUpdateKeyword] = useState("");
	const [updateId, setUpdateId] = useState(null);

	const BASE_URL =
		"https://react-hooks-update-b21c6-default-rtdb.firebaseio.com//memos.json";

	useEffect(() => {
		axios
			.get(BASE_URL)
			.then((res) => {
				const newMemo = [];
				for (const key in res.data) {
					newMemo.push({
						id: key,
						memo: res.data[key].memo,
						date: res.data[key].date,
						done: res.data[key].done,
					});
				}
				setMemos(newMemo);
			})
			.catch((e) => console.log(e));
	}, []);
	const addMemoHandler = (memo) => {
		if (updateStatus) {
			updateMemo(memo);
		} else {
			const newMemo = {
				memo: memo,
				date: new Date().toString(),
				done: false,
			};
			axios.post(BASE_URL, newMemo).then((res) => {
				console.log(res.data.name);

				setMemos((prevState) => [
					...prevState,
					{
						id: res.data.name,
						memo: newMemo["memo"],
						date: newMemo["date"],
						done: newMemo["done"],
					},
				]);
			});
		}
	};

	const updateHandler = (id) => {
		let memo = memos.find((m) => m.id === id).memo;
		setUpdateKeyword(memo);
		setUpdateStatus(true);
		setUpdateId(id);
	};
	const updateMemo = (newMemo) => {
		let id = updateId;
		try {
			axios
				.patch(
					`https://react-hooks-update-b21c6-default-rtdb.firebaseio.com//memos/${id}.json`,
					{ memo: newMemo }
				)
				.then((res) => {
					setMemos((prevState) =>
						prevState.map((memo) => {
							return memo.id === id
								? Object.assign({}, memo, { memo: newMemo })
								: memo;
						})
					);
					setUpdateKeyword("");
					setUpdateStatus(false);
					setUpdateId(null);
				});
		} catch (e) {
			console.log(e);
		}
	};

	const cardClickedHandler = (id) => {
		try {
			axios
				.patch(
					`https://react-hooks-update-b21c6-default-rtdb.firebaseio.com//memos/${id}.json`,
					{ done: !memos.find((m) => m.id === id).done }
				)
				.then((res) => {
					setMemos((prevState) =>
						prevState.map((memo) => {
							return memo.id === id
								? Object.assign({}, memo, { done: !memo.done })
								: memo;
						})
					);
				});
		} catch (e) {
			console.log(e);
		}
	};
	const deleteHandler = (id) => {
		try {
			axios
				.delete(
					`https://react-hooks-update-b21c6-default-rtdb.firebaseio.com//memos/${id}.json`
				)
				.then((res) => {
					setMemos((prevState) => prevState.filter((memo) => memo.id !== id));
				});
		} catch (e) {
			console.log(`{e}`);
		}
	};

	return (
		<div className="Memo">
			<h2>React : CRUD with Realtime Firebase Database example with Axios</h2>
			<MemoForm
				add={addMemoHandler}
				keyword={updateKeyword}
				updateStatus={updateStatus}
			/>
			<br />
			<div>Please click if you want to make it done.</div>

			<MemoList
				memos={memos}
				cardClicked={cardClickedHandler}
				delete={deleteHandler}
				update={updateHandler}
			/>
		</div>
	);
};

export default Memo;
