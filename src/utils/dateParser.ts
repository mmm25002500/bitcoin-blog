import { parse, isValid } from "date-fns";

// 解析日期字串
export const parseDate = (dateString: string): Date => {
	if (typeof dateString !== "string") {
		console.error(`Invalid date format: ${dateString}`);
		return new Date(); // 回傳當前日期作為預設值
	}

	// 嘗試直接解析 ISO 8601 格式或標準日期字符串
	let date = new Date(dateString);

	// 如果直接解析失敗,嘗試使用 date-fns 解析 yyyy-MM-dd HH:mm 格式
	if (!isValid(date)) {
		date = parse(dateString, "yyyy-MM-dd HH:mm", new Date());
	}

	if (!isValid(date)) {
		console.error(`Invalid date format: ${dateString}`);
		return new Date(); // 回傳當前日期作為預設值
	}
	return date;
};
