export interface BitcoinPriceOverlayProps {
	open: boolean;
	onClose: () => void;
	enterProgress: number; // 0 = 完全隱藏在上方, 1 = 完全顯示
}

export interface BitcoinStats {
	market_price_usd: number;
	hashrate_24h: string;
	best_block_height: number;
	market_dominance_percentage: number;
}
