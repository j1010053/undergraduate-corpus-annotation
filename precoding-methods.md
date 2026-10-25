# 來說句式：Pre-coding 標註網站

沿用原 GitHub Pages 的三欄介面：左側選語料，中間讀上下文，右側標註。基本欄位為檢閱狀態、可複選的自由標籤、備註與判斷依據；「自訂欄位」可新增／改名／停用文字欄或分類選單。欄位與標註起始皆留白，不預先判定語用功能。

網站入口：`precoding.html`。GitHub Pages 網址：
https://j1010053.github.io/undergraduate-corpus-annotation/precoding.html

## 本次抽樣

固定 seed：**20261024**。從目前提供的四組匯出檔，共 615 筆查詢命中中，分組取得 **35 筆**。

| 組別 | 來源檔 | 檔案實際筆數 | 本次收錄 |
|---|---|---:|---:|
| 書面・嚴格來說 | concordance (1).txt | 586 | 隨機抽 15 |
| 口語・嚴格來說 | shuo_s_strict_100.txt | 24 | 隨機抽 15 |
| 書面・一般來說 | shuo_w_general_100.txt | 3 | 全部 3 |
| 口語・一般來說 | shuo_s_general_100.txt | 2 | 全部 2 |

這是檔案的實際筆數，不是檔名中的數字，也不表示整個線上語料庫只有這些命中。`shuo_w_strict_10.txt`、`concordance (2).txt` 與原書面資料有相同的 586 筆命中識別（Text ID＋語料起訖位置＋查詢詞），屬於不同長度的匯出語境，不重複加入抽樣母體；使用語境最完整的 `concordance (1).txt`。

## 可重現的操作性規則

1. UTF-8（可含 BOM）、Tab 分隔，使用原匯出欄位；檢查欄位齊全、命中編號連續、命中識別不重複、目標表達符合該組。
2. 抽樣單位是「原始查詢命中」，不是文章或句子。同一 Text ID 的不同命中仍各自符合抽樣資格。不依語境內容、詞性、句位或預期功能篩選，也不按文章加權。
3. 每組按原始命中編號遞增排序。令 `seedMaterial = "20261024|" + groupId`，將其 UTF-8 位元組的 SHA-256 轉成十六進位整數，作為該組的 PRNG seed。組別代號是 `written_strict`、`spoken_strict`、`written_general`、`spoken_general`。
4. 若 N > 15，用 `random.Random(derived_seed).sample(rows, 15)` 無放回抽樣；若 N <= 15，全取。每組獨立使用自己的 seed，因此調整其他組別不會消耗本組的亂數序列。
5. 抽取順序及展示順序都存入 `sampling_manifest.json`；網站按組別及原始編號排序，方便核對。重開網頁、重新整理、篩選及重建 HTML 都不會重新抽樣。
6. Manifest 同時保留 Python 版本、來源檔 SHA-256、derived seed、樣本識別碼、原始編號、Text ID、語料位置。來源檔改動時應建立新樣本版本，避免將既有標註套到另一批樣本。

seed 與方法共同決定樣本，不能只記錄 seed 而省略母體、排序及演算法。本次樣本是 pre-coding 的分組小樣本，不是各組大小等比例的代表性抽樣；一般來說兩組不足 15 筆，應保留這個限制。

## 語境與標註依據

- 「完整語境」逐字保留來源的前文、查詢詞、後文及詞性欄位；這是匯出片段，不保證完整句子或全文。
- 前後 10／40 詞是按來源空白切分的斷詞單位截取，標點也占一單位，並非自動斷句。短預覽的詞性先按原詞精確對齊；不能對齊時建置停止，不重新斷詞或猜詞性。
- 自然閱讀只移除中文相鄰的斷詞空格；原始斷詞及詞性模式可核對來源。英文相鄰詞之間的空格保留。
- 口語資料未補標點、句界、停頓、說話者或時間資訊。書面資料中的排版雜訊也保留，供標註者記錄疑問。
- S01–S35 是本次樣本編號。「原始 #」屬於該組來源檔；不同組可能同為 #1，網站以含組別的穩定識別碼保存，不會混用。

## 使用與保存

1. 選擇組別，閱讀查詢詞前後文，必要時展開完整語境或切換詞性。
2. 選狀態、加標籤、寫備註；不確定時標為「待討論」。需要新判據時到「自訂欄位」新增文字欄或分類選單。選取語境文字可「摘錄至備註」。
3. 「完成並下一筆」在目前篩選清單內前進；可用左右鍵、0–3、F 與 /，輸入中不觸發快捷鍵。
4. 標註自動存於目前瀏覽器的 localStorage，不會自動傳回 GitHub，也不跨裝置或跨使用者同步。此資料集與原前十筆頁面有不同暫存鍵。
5. 工作結束匯出 JSON（包含標註、欄位設定及抽樣 manifest），建議在檔名加入標註者代號。CSV 供分析，不用來還原；離線 HTML 可以帶走樣本與標註。
6. 需要存到 GitHub 時，先下載備份，再由匯出視窗開啟上傳頁面。具有寫入權限的人可提交備份；公開庫中的備份可被公開讀取。換裝置下載 JSON 後，使用「匯入備份」。資料集識別不符的備份會被拒絕；同筆衝突可選保留本機或採用匯入值。

## 程式與重建

### PWA 安裝與離線保存

1. 先連網開啟網站，按「離線使用」，確認顯示「離線已就緒」。第一次會一次快取整批 35 筆的完整語境與標註工具，不需逐筆瀏覽。不安裝也可使用離線快取。
2. Chrome／Edge 可按網站的安裝按鈕（瀏覽器提供時出現），或使用瀏覽器的安裝選單。iPhone／iPad 請用 Safari 的「分享 → 加入主畫面」。內嵌瀏覽器若無法安裝，請改用一般瀏覽器。
3. 標註繼續使用原本的 `concordance-review:v1:precoding-20261024-dfe238954000aed5` localStorage；這次更新不改樣本、seed、識別碼或 JSON 備份格式，不重設既有標註。
4. 「請求持續儲存」使用瀏覽器的 StorageManager API；顯示實際是否獲准，不承諾一定獲准。手動清除網站資料、無痕模式、瀏覽器儲存政策等仍可能影響保存，定期匯出 JSON 才能另存備份。不同瀏覽器／裝置的標註不互通；安裝後若使用不同儲存空間，請匯入原 JSON。
5. 離線可閱讀、搜尋、標註、自訂欄位及匯入／匯出本機檔案。GitHub 上傳、原始語料庫、下載網站原始檔須連網，網站不自動上傳標註。
6. 連網重開時會檢查新版本。已開啟的頁面不強制重載；「離線使用 → 檢查快取與更新 → 套用更新並重新開啟」會先保存標註。也可關閉此站的所有分頁／App 視窗，下次再開。更新只更換本站的程式快取，不刪標註。
7. 下載的含標註 HTML 仍是單一離線檔案；用 `file://` 開啟時不註冊 Service Worker。PWA 安裝需要 HTTPS 或 localhost。

快取機制：Service Worker 預先完整下載 HTML（內含樣本）、manifest 與三個圖示。全部成功且該頁受 worker 控制後，才顯示離線就緒。版本以建置輸入內容的 SHA-256 產生；資源採 cache-first，更新在新 worker 的 install 階段完成全部快取後等待套用。只攔截五個明列的本站資源；不攔截原 `index.html`、GitHub 備份、原始語料庫或其他站點。activate 只刪自己的舊 `concordance-precoding-shell:` 快取，不操作 localStorage。

參考：[MDN：PWA 安裝條件](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable)、[Service Worker 生命週期與快取](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers)、[持續儲存請求](https://developer.mozilla.org/en-US/docs/Web/API/StorageManager/persist)。

### 原始檔

- `sample_corpora.py`：檢核來源與執行分組抽樣。
- `sampling_config.json`：seed、抽樣上限、四組來源、預期筆數。
- `source_alignment.py`：原詞與原詞性欄位的精確對齊；不執行語言學分類。
- `verify_sample.py`：獨立從原始檔驗證 seed 重現、組別筆數、來源 hash、識別碼及原文。
- `build.py`：將已凍結的 `corpus.json` 嵌入 HTML；不重新抽樣。
- `reviewer.template.html`：網站介面、標註、匯入匯出邏輯。
- `pwa.js`：離線狀態、安裝入口、持續儲存請求、由使用者套用更新；建置時內嵌到 HTML。
- `precoding-sw.template.js`：快取白名單、安裝／更新／訊息處理；建置成 `dist/precoding-sw.js`。
- `precoding.webmanifest`、`precoding-icon-*.png`：安裝入口與圖示；`make_icons.py` 可重建圖示，不依賴第三方套件。

只重建同一網站（不需要原始匯出檔）：

```powershell
python build.py
```

要從原始匯出檔重現樣本，先把本專案資料夾放在四組原始檔的下一層；原始檔與本專案資料夾位於同一父資料夾，然後：

```powershell
python sample_corpora.py
python verify_sample.py
python build.py
```

重新抽樣須先明確修改 config；記錄原檔與 Python 版本，以 manifest 的已保存清單為核對基準。這個版本的 `verify_sample.py` 固定檢查本次 35 筆需求，更換母體時也應相應檢查並更新驗證期望。

把 `dist` 中的十個檔案一起上傳到既有 GitHub Pages 儲存庫根目錄即可更新 `precoding.html` 與 PWA，不需替換原本的 `index.html`。`precoding-source.zip` 只含這 35 筆樣本、程式與方法文件，不含未抽中的完整語料，也不含使用者標註。`build_report.json` 保存版本、HTML hash 與部署檔案清單。
