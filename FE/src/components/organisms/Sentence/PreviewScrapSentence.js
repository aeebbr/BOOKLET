import React, { useEffect, useState } from "react";

import MoreBar from "../../molecules/Bar/MoreBar";
import PreviewSwiperSentence from "../../molecules/Sentence/PreviewSwiperSentence";

import { Container } from "../../../styles/common/ContainingsStyle";

import { initScrappedList, initSentenceList } from "../../../apis/init/initSentence";
import { getScrappedPost } from "../../../apis/sentenceApi";
import useArr from "../../../hooks/useArr";
import Empty from "../../molecules/Empty";

function PreviewScrapSentence(props) {
	// 더미 데이터
	// const sentences = [
	// {
	// 	paragraphId: 1,
	// 	paragraphColor: "#9FA3D0",
	// 	content:
	// 		"이제는 안다. 우리가 계속 지는 한이 있더라도 선택해야만 하는 건 이토록 평범한 미래라는 것을. 그리고 포기하지 않는 한 그 미래가 다가올 확률은 100퍼센트에 수렴한다는 것을.",
	// },
	// {
	// 	paragraphId: 2,
	// 	paragraphColor: "#543466",
	// 	content:
	// 		"이제는 안다. 우리가 계속 지는 한이 있더라도 선택해야만 하는 건 이토록 평범한 미래라는 것을. 그리고 포기하지 않는 한 그 미래가 다가올 확률은 100퍼센트에 수렴한다는 것을.",
	// },
	// {
	// 	paragraphId: 3,
	// 	paragraphColor: "#B88962",
	// 	content:
	// 		"이제는 안다. 우리가 계속 지는 한이 있더라도 선택해야만 하는 건 이토록 평범한 미래라는 것을. 그리고 포기하지 않는 한 그 미래가 다가올 확률은 100퍼센트에 수렴한다는 것을.",
	// },
	// ];

	const [sentences, setSentences] = useState();

	const isArrEmpty = useArr();

	const id = localStorage.getItem("userId");

	const emptyInfo = {
		title: "스크랩한 문장이 없어요",
		subTitle: (
			<>
				다른 분들의 문장을 스크랩해서
				<br />
				수집해보세요!
			</>
		),
		buttonLabel: "추천 문장 보러 가기",
		path: "/sentence/recommand",
	};

	useEffect(() => {
		(async () => {
			await getScrappedPost(1, 0, 2)
				.then(initScrappedList)
				.then((res) => setSentences(res));
		})();
	}, []);

	return (
		<div>
			<Container marginBottom="40">
				<MoreBar title="스크랩한 문장" path="/sentence/scrap" />
				{isArrEmpty(sentences) ? (
					<Empty
						title={emptyInfo.title}
						subTitle={emptyInfo.subTitle}
						buttonLabel={emptyInfo.buttonLabel}
						path={emptyInfo.path}
						top="24"
					/>
				) : (
					<PreviewSwiperSentence sentences={sentences} />
				)}
			</Container>
		</div>
	);
}

export default PreviewScrapSentence;
