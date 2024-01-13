interface PaginateArgs {
	page: number;
	size: number;
	count: number;
}

export function paginate({page, size, count}: PaginateArgs) {
	const totalPages = Math.ceil(count / size);

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

	const nextPage = lastPage ? null : {value: page + 1};
	const prevPage = firstPage ? null : {value: page - 1};

	const start = size * (page - 1) + 1;
	const until = clamp(start - 1 + size, 1, count);

	const pageRange = {
		start,
		until,
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
