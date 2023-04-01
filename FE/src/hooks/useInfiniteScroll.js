import { useCallback, useEffect, useState } from "react";

export default function useInfiniteScroll(id, api, size, init, isStart) {
	const [page, setPage] = useState(0);
	const [data, setData] = useState([]);
	const [isFetching, setFetching] = useState(false);
	const [hasNextPage, setNextPage] = useState(true);

	const apiCall = useCallback(async () => {
		return (async () => {
			const result = await api(id, size, isStart ? 0 : page)
				.then(init)
				.then((res) => {
					isStart ? setData(res?.contents) : setData(data.concat(res?.contents));
					setNextPage(res?.hasNextPage);
					setFetching(false);

					return isStart ? res?.contents : data.concat(res?.contents);
				});

			isStart ? setPage(1) : setPage(page + 1);

			return result;
		})();
	}, [page]);

	useEffect(() => {
		const handleScroll = () => {
			const { scrollTop, offsetHeight } = document.documentElement;
			if (window.innerHeight + scrollTop + 0.5 >= offsetHeight) {
				setFetching(true);
			}
		};

		setFetching(true);
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	useEffect(() => {
		if (isFetching && hasNextPage) apiCall();
		else if (!hasNextPage) setFetching(false);
	}, [isFetching]);

	return { page, data, isFetching, hasNextPage, apiCall };
}
