/**
 * 將日期轉換為 UTC+8 (台北時間)
 * @param date - 日期字串或 Date 物件
 * @returns UTC+8 時區的 Date 物件
 */
export const toTaipeiTime = (date: string | Date): Date => {
	const d = typeof date === "string" ? new Date(date) : date;

	// 取得 UTC 時間的毫秒數
	const utcTime = d.getTime();

	// 取得本地時區與 UTC 的偏移量（分鐘），轉換為毫秒
	const localOffset = d.getTimezoneOffset() * 60000;

	// UTC+8 的偏移量（8 小時 = 8 * 60 * 60 * 1000 毫秒）
	const taipeiOffset = 8 * 60 * 60000;

	// 計算台北時間
	return new Date(utcTime + localOffset + taipeiOffset);
};
