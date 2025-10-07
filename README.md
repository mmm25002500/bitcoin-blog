# 比特幣中文部落格網站 - 文檔

## Resources
- **Framework**: Next.js 14 (Pages Router)
- **Language**: TypeScript
- **CSS**: Tailwind CSS, Material Tailwind
- **MD**: MDX (next-mdx-remote)
- **DB**: Supabase
- **Deploy**: Vercel
- **Data**: Blockchair (BTC Data)

## 開發環境設定

### Installation

#### pnpm（Recommanded）
```bash
pnpm install
```

#### or npm
```bash
npm install
```

### env var
建立 `.env.local` 檔案並設定以下變數：

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Hot-Reloading

```bash
pnpm dev
# or
npm run dev
```
開發伺服器將在 `http://localhost:3000` 啟動。

### Build
```bash
pnpm build
# or
npm run build
```

### Production

```bash
pnpm start
# or
npm start
```

## 內容管理
### 文章與新聞（棄用）
注意：本段已棄用，目前已更改為 DB 的方式擷取資料，也以使用 MD 而非 MDX。

文章與新聞透過 Supabase 資料庫管理，並使用管理後台 (bitcoin-blog-admin) 進行上傳與編輯。

文章元資料格式：
```yaml
---
title: "文章標題"
description: "文章描述"
date: "YYYY-MM-DD HH:MM"
tags: ["標籤1", "標籤2"]
type: "Post" 或 "News"
img: "/Author/作者ID/author.png"
image: "https://圖片網址/圖片.jpg"
---
```

### 作者設定（棄用）
注意：本段已棄用，目前已更改為 DB 的方式擷取資料。

編輯 `src/config/Author.json` 來新增或修改作者資訊：

```json
{
  "authorID": {
    "fullname": "作者全名",
    "name": "作者簡稱",
    "img": "/Author/authorID/author.png",
    "description": "作者簡介"
  }
}
```

### 網站設定
在 `src/config/SiteConfig.json` 中設定分頁與顯示數量：

```json
{
  "ArticlePostListMorePostPerclick": 3,
  "ArticleNewsListMorePostPerclick": 3,
  "HomePageNewsListPerpage": 3,
  "NewsListAllPerpage": 6,
  "PostListAllPerpage": 6
}
```

### SEO 設定

編輯 `src/config/SEO.json` 來設定 SEO 相關資訊。

## API 端點

### 內部 API 路由

所有 API 端點位於 `/api/` 路徑下，使用查詢參數傳遞資料。

#### 文章相關 (Post)

| API 端點 | 方法 | 查詢參數 | 說明 |
|---------|------|---------|------|
| `/api/Post/getPosts` | GET | - | 取得所有文章列表 |
| `/api/Post/getPostByID` | GET | `id: string` | 根據 ID 取得單篇文章 |
| `/api/Post/getPostsByUID` | GET | `uid: string` | 根據作者 UID 取得該作者的所有文章 |

#### 新聞相關 (News)

| API 端點 | 方法 | 查詢參數 | 說明 |
|---------|------|---------|------|
| `/api/News/getPosts` | GET | - | 取得所有新聞列表 |
| `/api/News/getPostByID` | GET | `id: string` | 根據 ID 取得單則新聞 |
| `/api/News/getPostsByUID` | GET | `uid: string` | 根據作者 UID 取得該作者的所有新聞 |

#### 通用文章 API

| API 端點 | 方法 | 查詢參數 | 說明 |
|---------|------|---------|------|
| `/api/getArticleByFilename` | GET | `filename: string` | 根據檔案名取得文章資訊與連結 |
| `/api/getArticleMarkdown` | GET | `userID: string, postID: string` | 從 Supabase 取得文章的 Markdown 內容 |
| `/api/getPostsByFilter` | GET | `type: string, author: string, tag: string, mode: string` | 根據類型、作者、標籤篩選文章 |
| `/api/getRelatedPosts` | GET | `tag: string, exclude: string, mode: string` | 取得相關文章（根據標籤） |
| `/api/getMoreInfo` | GET | - | 取得首頁「更多資訊」區塊的文章列表 |

#### 作者相關

| API 端點 | 方法 | 查詢參數 | 說明 |
|---------|------|---------|------|
| `/api/author/getAuthor` | GET | - | 取得所有作者列表 |
| `/api/author/getAuthorByUID` | GET | `uid: string` | 根據 UID 取得特定作者資訊 |
| `/api/getAuthorPostCount` | GET | `author: string` | 取得特定作者的文章數量 |
| `/api/getAuthorsByDescription` | GET | `text: string` | 根據描述搜尋作者 |

#### 標籤相關 (Tags)

| API 端點 | 方法 | 查詢參數 | 說明 |
|---------|------|---------|------|
| `/api/tags/getAllTags` | GET | - | 取得所有標籤（Post + News） |
| `/api/tags/Posts/getTags` | GET | - | 取得文章標籤列表 |
| `/api/tags/News/getTags` | GET | - | 取得新聞標籤列表 |

#### 類型相關 (Types)

| API 端點 | 方法 | 查詢參數 | 說明 |
|---------|------|---------|------|
| `/api/types/getAllTypes` | GET | - | 取得所有類型 |
| `/api/types/Posts/getTypes` | GET | - | 取得文章類型列表 |
| `/api/types/News/getTypes` | GET | - | 取得新聞類型列表 |

#### 其他

| API 端點 | 方法 | 查詢參數 | 說明 |
|---------|------|---------|------|
| `/api/getBitcoinStats` | GET | - | 從 Blockchair API 取得比特幣統計資料 |

### 外部 API

專案使用 [Blockchair API](https://blockchair.com/) 取得比特幣即時資料：
- 雜湊率 (Hash Rate)
- 區塊高度 (Block Height)
- 價格 (Price)

## 主要功能

### 頁面路由

| 路由 | 說明 |
|-----|------|
| `/` | 首頁 |
| `/Post/[id]` | 文章內頁 |
| `/News/[id]` | 新聞內頁 |
| `/Author/[userID]` | 作者頁面 |
| `/Search` | 搜尋頁面 |
| `/Search/[tab]/[items]` | 搜尋結果頁面 |
| `/Tag/[tab]/[items]` | 標籤篩選頁面 |
| `/aboutus` | 關於我們 |
| `/PrivacyPolicy` | 隱私權政策 |
| `/Disclaimer` | 免責聲明 |
| `/supporter` | 支持者頁面 |

### 搜尋功能

- **作者搜尋 (Creators)**: 使用純文字搜尋作者描述
- **文章搜尋 (Posts)**: 使用標籤篩選文章
- **新聞搜尋 (News)**: 使用標籤篩選新聞

### 側邊欄與導航欄

- 側邊欄 (Sidebar) 與導航欄 (Navbar) 的按鈕是獨立設定的
- 修改時需要分別調整兩者的設定

### 文章自動跳轉

- 如果文章只有 News 類型，訪問 Post 頁面時會自動跳轉到 News 頁面
- 如果文章只有 Post 類型，訪問 News 頁面時會自動跳轉到 Post 頁面

## 部署

### 使用 Vercel 部署

1. 將專案推送到 GitHub
2. 在 Vercel 建立新專案並連結 GitHub 儲存庫
3. 設定環境變數（SUPABASE_URL, SUPABASE_ANON_KEY）
4. 部署

### 環境變數設定

在 Vercel 或本地環境中設定以下變數：

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 開發注意事項

### Markdown 語法

在 MDX 檔案中使用 HTML 標籤時，class 屬性必須改用 `className`。

### 時區設定

文章列表的時間顯示使用 UTC+8 時區。

### 工具指令

擷取所有文章標籤（用於產生標籤列表）：

```bash
grep -r 'tags' . | sed -n 's/.*tags: \(.*\)/\1/p' | tr -d '[]' | tr ',' '\n' | sed 's/^ *//;s/ *$//' | tr -d '"' | tr -d "'" | sort -u | uniq | sed 's/^/"/;s/$/"/' | sed 's/$/,/'
```

## 授權

本專案為私有專案。