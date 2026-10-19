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

## 將標註備份存到 GitHub

1. 在標註頁按 **匯出 → JSON 備份**；若要用試算表分析，也可匯出 CSV。
2. 按匯出視窗內的 **開啟 GitHub 上傳頁面**，或[直接開啟上傳頁面](https://github.com/j1010053/undergraduate-corpus-annotation/upload/main)。
3. 選擇剛下載的 JSON／CSV，保留含日期時間的檔名，再按 **Commit changes** 儲存。多人合作時，可在檔名加上自己的代號。
4. 換裝置時，從 GitHub 下載 JSON，回標註頁按 **匯入備份**。CSV 只供分析，無法用來還原標註。

上傳需要登入 GitHub，並有此儲存庫的寫入權限；一般訪客可以使用標註頁並下載自己的備份，再交給擁有者彙整。公開儲存庫中的備份任何人都能讀取。上傳備份不會自動改變網站上的標註，仍需匯入 JSON。

GitHub Free 支援公開儲存庫的 Pages；私有儲存庫需使用支援的付費方案。私有儲存庫所發布的 Pages 網站通常仍公開，網站本身的私人存取控制需符合 GitHub Enterprise Cloud 的組織條件。

官方說明：
- https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
- https://docs.github.com/en/enterprise-cloud@latest/pages/getting-started-with-github-pages/changing-the-visibility-of-your-github-pages-site
