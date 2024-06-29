# 比特幣中文部落格網站 - 文檔

## 使用說明
1. 在寫 Markdown 要使用 HTML語法的 class的時候要使用 className
### 首頁
1. 
### 文章
1. 文章路徑為 `src/Articals/${name}/${mdx name}`
2. 文章元標頭為：
> title: "文章標題"
> description: "文章描述"
> date: "YYYY-MM-DD HH:MM"
> tags: ["標籤1", "標籤2", "標籤n"]
> type: ['News','Post'] （類別：文章為Post，新聞為 News）
> img: "/Author/JohnCarter/author.png"（必須放在本地，其位置於`public/Author/${name}/author.png`）
> image: "https://封面網址/圖片檔名.副檔名"

### 標籤
1. 
### 文章列表
1. 如想更改 More Posts 一次點擊出現多少文章，則需更改 `src/config/SiteConfig.json` 中的 `NewsListAllPerpage`。
### 文章內頁
1. 如果該文章只有 News 而沒有 Post 則跳轉到新聞頁面。
2. 如想更改 More Posts 一次點擊出現多少文章，則需更改 `src/config/SiteConfig.json` 中的 `ArticalPostListMorePostPerclick`。
3. 底部 More Posts 會根據標籤進行查詢，只要本文標籤有的，其他文章有的，都會被篩選出，另外排除掉重複的。
### 新聞列表
1. 如想更改 More Posts 一次點擊出現多少文章，則需更改 `src/config/SiteConfig.json` 中的 `NewsListAllPerpage`。
### 新聞內頁
1. 如果該文章只有 Post 而沒有 News 則跳轉到文章頁面
2. 如想更改一次點擊出現多少文章，則需更改 `src/config/SiteConfig.json` 中的 `ArticalNewsListMorePostPerclick`。
3. 底部 More Posts 會根據標籤進行查詢，只要本文標籤有的，其他文章有的，都會被篩選出，另外排除掉重複的。
### 更多資訊
1. 
### Sidebar
1. 
### Firebase
1. 
### 文章後端
1. 
### SEO
1. 
### 作者
1. `/src/config/Author.json` 的 `id` 務必與 `/src/Articals/${USERNAME}` 一致。

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