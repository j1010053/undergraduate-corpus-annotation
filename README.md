# 大專生計畫｜語料編碼方便

「嚴格來說」前十筆語料的閱讀、檢閱與標註工具。

這是可直接部署到 GitHub Pages 的純靜態頁面，只含原始 concordance 編號 1–10。無須安裝套件、編譯或設定後端服務。

## 檔案

- `index.html`：完整頁面、十筆語料與標註介面。
- `.nojekyll`：直接發布靜態檔案。

將此資料夾的內容放入目標儲存庫，再於 **Settings → Pages → Build and deployment** 選擇 **Deploy from a branch**，設定該分支的 **/(root)** 為來源。

若目標儲存庫已有網站，請先確認要發布到子路徑或另外建立儲存庫，以免覆蓋既有首頁。

## 功能與保存

可搜尋、篩選、檢閱短中長語境及詞性，並設定檢閱狀態、分類標籤、備註、自訂欄位。JSON 備份可以匯入，CSV 供試算表分析，也可匯出含標註的離線網頁。

標註自動存於目前瀏覽器，不會寫回 GitHub、不會跨裝置同步或彙整不同使用者的標註。工作結束時請匯出備份。

GitHub Free 支援公開儲存庫的 Pages；私有儲存庫需使用支援的付費方案。私有儲存庫所發布的 Pages 網站通常仍公開，網站本身的私人存取控制需符合 GitHub Enterprise Cloud 的組織條件。

官方說明：
- https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
- https://docs.github.com/en/enterprise-cloud@latest/pages/getting-started-with-github-pages/changing-the-visibility-of-your-github-pages-site
