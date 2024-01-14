interface PaginateArgs {
	page: number;
	size: number;
	count: number;
}

export function paginate({page, size, count}: PaginateArgs) {
	const totalPages = clamp(Math.ceil(count / size), 1, Infinity);
	const firstPage = page === 1;
	const lastPage = page === totalPages;
	const pages = Array.from({length: totalPages}).map((_, index) => {
		const value = index + 1;
		const selected = page === value;

		return {
			value,
			selected,
		};
	});

	const prevPage = firstPage ? null : {value: page - 1};
	const nextPage = lastPage ? null : {value: clamp(page + 1, 1, totalPages)};

	const pageRangeStart = size * (page - 1) + 1;
	const pageRangeUntil = clamp(pageRangeStart - 1 + size, 1, count);
	const pageRange = {
		start: pageRangeStart,
		until: pageRangeUntil,
	};

	return {
		totalPages,
		firstPage,
		lastPage,
		pages,
		pageRange,
		nextPage,
		prevPage,
	};
}

function clamp(value: number, min: number, max: number) {
	if (value > max) return max;
	if (value < min) return min;
	return value;
}
