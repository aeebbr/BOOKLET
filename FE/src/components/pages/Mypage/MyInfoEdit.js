import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateMyImg, updateMyInfo } from "../../../apis/authApi";
import { getMyInfo } from "../../../apis/userApi";
import { setEmail, setId, setNickname } from "../../../reducer/join";
import { Container } from "../../../styles/common/ContainingsStyle";
import UploadProfileImage from "../../atoms/Mypage/UploadProfileImage";
import ActionsNavigationBar from "../../molecules/Bar/ActionsNavigationBar";
import JoinBasicForm from "../../organisms/Join/JoinBasicForm";

function MyInfoEdit(props) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const allValidRef = useRef();

	const uId = localStorage.getItem("userId");
	const uName = localStorage.getItem("userName");

	const { nickname, email } = useSelector((state) => state.join);
	const [imageFile, setImageFile] = useState("");
	const [curImg, setCurImg] = useState("");
	const [curNickname, setCurNickname] = useState("");
	const [curEmail, setCurEmail] = useState("");

	useEffect(() => {
		dispatch(setId(uId));

		(async () => {
			await getMyInfo(uName).then((res) => {
				dispatch(setNickname(res?.nickname));
				dispatch(setEmail(res?.email));

				setCurNickname(res?.nickname);
				setCurEmail(res?.email);

				setImageFile(res?.imgPath);
				setCurImg(res?.imgPath);
			});
		})();
	}, []);

	const handleClickPre = () => {
		navigate("/mypage");
	};

	const updateImgApiCall = () => {
		const formData = new FormData();

		formData.append("file", imageFile);

		(async () => {
			await updateMyImg(uName, formData).then((res) => {
				if (res === "success") {
					navigate("/mypage");
				}
			});
		})();
	};

	const handleClickNext = () => {
		if (allValidRef.current.allConfirmTest()) {
			const data = {
				username: uName,
				nickname: nickname,
				email: email,
				// 더미
				age: 26,
				sex: 1,
			};

			(async () => {
				await updateMyInfo(uName, data).then((res) => {
					if (res === "success") {
						// 이미지가 변경되었을 경우에만 수정 요청
						if (curImg !== imageFile) {
							updateImgApiCall();
						} else {
							navigate("/mypage");
						}
					}
				});
			})();
		}
	};

	return (
		<>
			<ActionsNavigationBar
				pre="취소"
				title="회원 정보 수정"
				next="확인"
				handleClickPre={handleClickPre}
				handleClickNext={handleClickNext}
			/>
			<Container paddingTop="86" paddingLeft="16" paddingRight="16">
				<UploadProfileImage imageFile={imageFile} setImageFile={setImageFile} />
				<JoinBasicForm
					ref={allValidRef}
					type="edit"
					curInfo={{ nickname: curNickname, email: curEmail }}
				/>
			</Container>
		</>
	);
}

export default MyInfoEdit;
