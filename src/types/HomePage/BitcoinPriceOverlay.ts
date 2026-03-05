export interface BitcoinPriceOverlayProps {
	open: boolean;
	onClose: () => void;
}

export interface BitcoinStats {
	market_price_usd: number;
	hashrate_24h: string;
	best_block_height: number;
	market_dominance_percentage: number;
}
