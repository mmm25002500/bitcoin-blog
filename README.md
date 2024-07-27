# 比特幣中文部落格網站 - 文檔
## 使用說明
1. 在寫 Markdown 要使用 HTML 語法的 class的時候要使用 className。
### 首頁
1. 按鈕部分與 Sidebar 是分開的，如果要設定，要兩個都設定。
### 文章
1. 文章路徑為 `Article/${name}/${mdx name}`
2. 文章元標頭為：
> title: "文章標題" <br>
> description: "文章描述" <br>
> date: "YYYY-MM-DD HH:MM" <br>
> tags: ["標籤1", "標籤2", "標籤n"] <br>
> type: ['News','Post'] （類別：文章為Post，新聞為 News） <br>
> img: "/Author/JohnCarter/author.png"（必須放在本地，其位置於`public/Author/${name}/author.png`） <br>
> image: "https://網址/圖片檔名.副檔名" <br>

### 搜尋頁面
1. Creators 以純文字搜索。
2. Posters 及 News 以標籤方式搜索。
### 文章列表
1. 如想更改 More Posts 一次點擊出現多少文章，則需更改 `src/config/SiteConfig.json` 中的 `PostListAllPerpage`。
### 文章內頁
1. 如果該文章只有 News 而沒有 Post 則跳轉到新聞頁面。
2. 如想更改 More Posts 一次點擊出現多少文章，則需更改 `src/config/SiteConfig.json` 中的 `ArticlePostListMorePostPerclick`。
3. 底部 More Posts 會根據標籤進行查詢，只要本文標籤有的，其他文章有的，都會被篩選出，另外排除掉重複的。
### 新聞列表
1. 如想更改 More Posts 一次點擊出現多少文章，則需更改 `src/config/SiteConfig.json` 中的 `NewsListAllPerpage`。
### 新聞內頁
1. 如果該文章只有 Post 而沒有 News 則跳轉到文章頁面
2. 如想更改一次點擊出現多少文章，則需更改 `src/config/SiteConfig.json` 中的 `ArticleNewsListMorePostPerclick`。
3. 底部 More Posts 會根據標籤進行查詢，只要本文標籤有的，其他文章有的，都會被篩選出，另外排除掉重複的。
### Sidebar
1. 跟 Navbar 是獨立的按鈕，需分開設定。
### Firebase
1. 採用 Firebase Storage 存放，並在後端抓下來。
### 文章後端
1. 透過 API 從 Firebase 抓文章下來。
### SEO
1. 設定檔放在 `/src/config/SEO.json`。
### 作者
1. `/src/config/Author.json` 的 `id` 務必與 `/src/Articles/${USERNAME}` 一致。

## 網站架構
### 內部API
#### ADDR
路徑：`/api/{name}?lebel_1=val_1&label2=val_2&...`
#### 功能表
| API | Input | Output | 簡介 |
| --- | --- | --- | --- |
| getArticleLinkByFilename | req.query: { filename: string } | res: { title: string, authorData: { fullname?: string, name?: string, img?: string, description?: string, id: string }, date: string, description: string, link: string } | 根據文件名獲取文章的相關鏈接和信息 |
| getMoreInfo | NONE | res: { category: string, post: { title: string, filename: string, description?: string, link: string, authorData: { fullname: string, name: string, img: string, description: string, id: string }, date: string }[] }[] | 根據 MoreInfo.json 中的信息獲取更多文章的元數據 |
| getPostsByFilter | req.query: { type: string, author: string, tag: string, mode: string } | res: { title: string, authorData: { fullname?: string, name?: string, img?: string, description?: string, id: string }, date: string, description: string, link: string }[] | 根據篩選條件獲取符合條件的文章 |
| getRelatedPosts | req.query: { tag: string, exclude: string, mode: string } | res: { title: string, authorData: { id: string }, date: string, description: string, link: string }[] | 根據標籤和排除的文章 ID 獲取相關文章 |
| getAuthorPostCount | req.query: { author: string<> } | res: { author: string, postCount: number } | 根據作者ID返回該作者的文章數量 |
| getAuthorsByDescription | req.query: { text: string } | res: { fullname: string, name: string, description: string, image: string, id: string }[] | 根據描述字段中的文本篩選作者 |
| getBitcoinStats | NONE | JSON 格式的比特幣統計數據 | 使用 Blockchair API 獲取比特幣統計數據並返回 |
| getAuthorConfig | NONE | res: { [authorID: string]: { fullname: string, name: string, img: string, description: string } } | 獲取所有作者的配置信息 |
| getArticleMarkdown | req.query: { userID: string, postID: string } | res: { content: string, data: { [key: string]: any } } | 根據用戶ID和文章ID獲取文章的Markdown內容 |

### 外部API
| Hash Rate | Block Height | Price |
| -------- | -------- | -------- |
| BlockChair | BlockChair | BlockChair |

### 使用資源
| 內容 | 服務 |
| ---- | ---- |
| Post Backend | Firebase |
| Backend Server | Vercel |
| Frontend Server | Vercel |
| BTC info Provider | BlockChair |

## Hot Reloading & Deployment
### pnpm (recommendation)
```bash
# install necessary pkg
pnpm i
# hot reloading dev
pnpm dev
# deploy & compile
pnpm build
```
### npm (Not recommended)
```bash
# install necessary pkg
npm i
# hot reloading dev
npm run dev
# deploy & compile
npm run build
```
### yarn (Not recommended)
```bash
# install necessary pkg
yarn
# hot reloading dev
yarn dev
# deploy & compile
yarn build
```