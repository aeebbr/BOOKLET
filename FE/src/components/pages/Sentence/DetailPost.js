import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { initComment, initSentence } from "../../../apis/init/initSentence";
import { getComment, getPost } from "../../../apis/sentenceApi";

import ReturnNavigationBar from "../../molecules/Bar/ReturnNavigationBar";
import DetailComment from "../../organisms/Sentence/DetailComment";
import DetailPostOverview from "../../organisms/Sentence/DetailPostOverview";

import { SeparationBar } from "../../../styles/common/BarsStyle";

function DetailPost() {
	// const comments = [
	// 	{
	// 		commentId: 1,
	// 		nickname: "루피는 행복해",
	// 		commentContent: "좋은 문장 감사합니다.",
	// 		createdDate: "2023.03.19",
	// 		updatedDate: "",
	// 		commentDepth: 0,
	// 		commentGroup: 1,
	// 		img: LoopyImg,
	// 	},
	// 	{
	// 		commentId: 4,
	// 		nickname: "루피는 책이 좋습니다요",
	// 		commentContent: "좋은 문장 감사합니다.",
	// 		createdDate: "2023.03.19",
	// 		updatedDate: "",
	// 		commentDepth: 1,
	// 		commentGroup: 1,
	// 		img: LoopyImg,
	// 	},
	// 	{
	// 		commentId: 2,
	// 		nickname: "안녕 나는 루피야",
	// 		commentContent: "",
	// 		createdDate: "2023.03.19",
	// 		updatedDate: "",
	// 		commentDepth: 0,
	// 		commentGroup: 2,
	// 		img: LoopyImg,
	// 	},
	// 	{
	// 		commentId: 3,
	// 		nickname: "루피는 책이 좋습니다요",
	// 		commentContent: "좋은 문장 감사합니다.",
	// 		createdDate: "2023.03.19",
	// 		updatedDate: "",
	// 		commentDepth: 1,
	// 		commentGroup: 2,
	// 		img: LoopyImg,
	// 	},
	// ];

	const uId = localStorage.getItem("userId");
	const { sId } = useParams();

	const [post, setPost] = useState();
	const [comments, setComments] = useState([]);

	const [isFollowed, setIsFollowed] = useState(false);

	const getPostApiCall = () => {
		(async () => {
			await getPost(sId, uId)
				.then(initSentence)
				.then((res) => {
					setPost(res);
				});
		})();
	};

	const getCommentApiCall = () => {
		(async () => {
			await getComment(sId)
				.then((res) => {
					if (res.comments) {
						return initComment(res.comments);
					}
				})
				.then((res) => {
					setComments(res);
				});
		})();
	};

	useEffect(() => {
		getPostApiCall();
		getCommentApiCall();
	}, []);

	return (
		<>
			<ReturnNavigationBar title={post?.title} />
			<DetailPostOverview
				uId={post?.uId}
				nickname={post?.nickname}
				profileImg={post?.profileImg}
				date={post?.date}
				isScraped={post?.isScraped}
				scrapImgs={post?.scrapImgs}
				scrapCount={post?.scrapCount}
				isFollowed={isFollowed}
				setIsFollowed={setIsFollowed}
				isbn={post?.isbn}
				title={post?.title}
				author={post?.author}
				cover={post?.cover}
				sId={post?.sId}
				content={post?.content}
				page={post?.page}
				color={post?.color}
			/>
			<SeparationBar />
			<DetailComment comments={comments} getCommentApiCall={getCommentApiCall} />
		</>
	);
}

export default DetailPost;
