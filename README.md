# 比特幣中文部落格網站 - 文檔

## 使用說明
1. 在寫 Markdown 要使用 HTML語法的 class的時候要使用 className
### 作者
`/src/config/Author.json` 的 `id` 務必與 `/src/Articals/${USERNAME}` 一致。

## 網站架構

### 框架
| 採用語言 | TS 框架 | CSS 框架 | 其他 pkg |
| ------- | ------- | ------- | ------- |
| TypeScript | React | Tailwind | MDX |
|  | Next | Bootstrap(如有) | eslint |
|  |  | fontawesome(如有) | next-themes |
|  |  |  | gasp(如有) |
|  |  |  | firebase(如有) |
|  |  |  | supabase(如有) |

### API
| Price | Hash Rate | Block High |
| -------- | -------- | -------- |
| CoinMarketCap(暫定) | Blockchain.com(暫定) | Blockchain.com(暫定) |


## 開發階段
### 第一階段 (預計 01/13至01/15 開始動工)
> 著重完成 Component 和架構建立。

### 第二階段(尚未決定日期)
> 著重完成 首頁、作者頁面、關於我們、免責聲明、隱私權政策、暗色模式

### 第三階段(尚未決定日期)
> 著重完成 標籤、文章、新聞、更多資訊、暗色模式

如果有另外新功能再開會談

## 開發位置
Github 位置: [mmm25002500/bitcoin-blog](https://github.com/mmm25002500/bitcoin-blog)