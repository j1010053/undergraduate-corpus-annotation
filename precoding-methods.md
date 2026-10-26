# 來說句式：Pre-coding 標註網站

沿用原 GitHub Pages 的三欄介面：左側選語料，中間讀上下文，右側標註。基本欄位為檢閱狀態、可複選的自由標籤、備註與判斷依據；「自訂欄位」可新增／改名／停用文字欄或分類選單。欄位與標註起始皆留白，不預先判定語用功能。

網站入口：`precoding.html`。GitHub Pages 網址：
https://j1010053.github.io/undergraduate-corpus-annotation/precoding.html

## 本次抽樣

固定 seed：**20261024**。四組母體合計 5,225 筆查詢命中，網站收錄 **60 筆（各組 15 筆）**。2026-10-26 加入兩份 nonsep 匯出；保留首版全部 35 筆，補抽 25 筆。

| 組別 | 來源檔 | 檔案實際筆數 | 本次收錄 |
|---|---|---:|---:|
| 書面・嚴格來說 | concordance (1).txt | 586 | 保留原抽樣 15 |
| 口語・嚴格來說 | shuo_s_strict_100.txt | 24 | 保留原抽樣 15 |
| 書面・一般來說 | shuo_w_general_100.txt + shuo_w_general_100_nonsep.txt | 3 + 3,994 = 3,997 | 保留 3，再抽 12 |
| 口語・一般來說 | shuo_s_general_100.txt + shuo_s_general_100_nonsep.txt | 2 + 616 = 618 | 保留 2，再抽 13 |

這是檔案的實際筆數，不是檔名中的數字，也不表示整個線上語料庫只有這些命中。`shuo_w_strict_10.txt`、`concordance (2).txt` 與原書面資料有相同的 586 筆命中識別（Text ID＋語料起訖位置＋查詢詞），屬於不同長度的匯出語境，不重複加入抽樣母體；使用語境最完整的 `concordance (1).txt`。

## 可重現的操作性規則

1. UTF-8（可含 BOM）、Tab 分隔，使用原匯出欄位；檢查欄位齊全、命中編號連續、命中識別不重複、目標表達符合該組。
2. 抽樣單位是「原始查詢命中」，不是文章或句子。同一 Text ID 的不同命中仍各自符合抽樣資格。不依語境內容、詞性、句位或預期功能篩選，也不按文章加權。
3. 每組先按 config 來源檔順序，再按各來源原始命中編號遞增排序。令 `seedMaterial = "20261024|" + groupId`，將其 UTF-8 位元組的 SHA-256 轉成十六進位整數，作為該組的 PRNG seed。組別代號是 `written_strict`、`spoken_strict`、`written_general`、`spoken_general`。
4. 首版先前各組抽最多 15 筆、不足全取。本次固定保留首版樣本；新舊檔案依 config 的來源順序及原始編號組成母體，按 `TextID + begin + end + 去空白目標字串` 去重（本次跨檔無重複），排除已入選者後，以 `random.Random(derived_seed).sample(candidates, 15 - retained_count)` 補抽。書面一般來說補 12 筆、口語補 13 筆；嚴格來說兩組不再抽樣。這是保留樣本的延伸設計，不是對合併母體重新做各 15 筆簡單隨機抽樣。
5. 補抽順序、來源檔、原始命中編號及展示順序都存入 `sampling_manifest.json`；網站按組別、來源順序及原始編號排序，方便核對。重開網頁、重新整理、篩選及重建 HTML 都不會重新抽樣。
6. Manifest 同時保留 Python 版本、來源檔 SHA-256、derived seed、樣本識別碼、原始編號、Text ID、語料位置。來源檔改動時應建立新樣本版本，避免將既有標註套到另一批樣本。

seed 與方法共同決定樣本，不能只記錄 seed 而省略母體、排序及演算法。本次樣本是 pre-coding 的分組小樣本，不是各組大小等比例的代表性抽樣；補樣保留先前少數拆詞形式，兩種斷詞形式的入選機率不同，不能用這 60 筆直接估計母體比例。完整統計另使用全部 3,997／618 筆。

## 語境與標註依據

- 「完整語境」逐字保留來源的前文、查詢詞、後文及詞性欄位；這是匯出片段，不保證完整句子或全文。
- 前後 10／40 詞是按來源空白切分的斷詞單位截取，標點也占一單位，並非自動斷句。短預覽的詞性先按原詞精確對齊；不能對齊時建置停止，不重新斷詞或猜詞性。
- 自然閱讀只移除中文相鄰的斷詞空格；原始斷詞及詞性模式可核對來源。英文相鄰詞之間的空格保留。
- 口語資料未補標點、句界、停頓、說話者或時間資訊。書面資料中的排版雜訊也保留，供標註者記錄疑問。
- S01–S60 是本次樣本編號。「原始 #」屬於該組來源檔；不同組可能同為 #1，網站以含組別的穩定識別碼保存，不會混用。

## 使用與保存

1. 選擇組別，閱讀查詢詞前後文，必要時展開完整語境或切換詞性。
2. 選狀態、加標籤、寫備註；不確定時標為「待討論」。需要新判據時到「自訂欄位」新增文字欄或分類選單。選取語境文字可「摘錄至備註」。
3. 「完成並下一筆」在目前篩選清單內前進；可用左右鍵、0–3、F 與 /，輸入中不觸發快捷鍵。
4. 標註自動存於目前瀏覽器的 localStorage，不會自動傳回 GitHub，也不跨裝置或跨使用者同步。此資料集與原前十筆頁面有不同暫存鍵。
5. 工作結束匯出 JSON（包含標註、欄位設定及抽樣 manifest），建議在檔名加入標註者代號。CSV 供分析，不用來還原；離線 HTML 可以帶走樣本與標註。
6. 需要存到 GitHub 時，先下載備份，再由匯出視窗開啟上傳頁面。具有寫入權限的人可提交備份；公開庫中的備份可被公開讀取。換裝置下載 JSON 後，使用「匯入備份」。資料集識別不符的備份會被拒絕；同筆衝突可選保留本機或採用匯入值。

## 程式與重建

### PWA 安裝與離線保存

1. 先連網開啟網站，按「離線使用」，確認顯示「離線已就緒」。第一次會一次快取整批 60 筆的完整語境與標註工具，不需逐筆瀏覽。不安裝也可使用離線快取。
2. Chrome／Edge 可按網站的安裝按鈕（瀏覽器提供時出現），或使用瀏覽器的安裝選單。iPhone／iPad 請用 Safari 的「分享 → 加入主畫面」。內嵌瀏覽器若無法安裝，請改用一般瀏覽器。
3. 新版有獨立資料集鍵；首次開啟會從首版 `concordance-review:v1:precoding-20261024-dfe238954000aed5` 依穩定語料識別碼帶入標註、欄位及閱讀位置，原暫存不刪除。所有 35 筆舊語料原文及識別碼不變；S 展示編號可能移動。舊版 JSON 也能匯入新版；新增 25 筆保持空白。不支援把新版備份反向匯入舊版。
4. 「請求持續儲存」使用瀏覽器的 StorageManager API；顯示實際是否獲准，不承諾一定獲准。手動清除網站資料、無痕模式、瀏覽器儲存政策等仍可能影響保存，定期匯出 JSON 才能另存備份。不同瀏覽器／裝置的標註不互通；安裝後若使用不同儲存空間，請匯入原 JSON。
5. 離線可閱讀、搜尋、標註、自訂欄位及匯入／匯出本機檔案。GitHub 上傳、原始語料庫、下載網站原始檔須連網，網站不自動上傳標註。
6. 連網重開時會檢查新版本。已開啟的頁面不強制重載；「離線使用 → 檢查快取與更新 → 套用更新並重新開啟」會先保存標註。也可關閉此站的所有分頁／App 視窗，下次再開。更新只更換本站的程式快取，不刪標註。
7. 下載的含標註 HTML 仍是單一離線檔案；用 `file://` 開啟時不註冊 Service Worker。PWA 安裝需要 HTTPS 或 localhost。

快取機制：Service Worker 預先完整下載 HTML（內含樣本）、manifest 與三個圖示。全部成功且該頁受 worker 控制後，才顯示離線就緒。版本以建置輸入內容的 SHA-256 產生；資源採 cache-first，更新在新 worker 的 install 階段完成全部快取後等待套用。只攔截五個明列的本站資源；不攔截原 `index.html`、GitHub 備份、原始語料庫或其他站點。activate 只刪自己的舊 `concordance-precoding-shell:` 快取，不操作 localStorage。

參考：[MDN：PWA 安裝條件](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable)、[Service Worker 生命週期與快取](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers)、[持續儲存請求](https://developer.mozilla.org/en-US/docs/Web/API/StorageManager/persist)。

### 原始檔

- `sample_corpora.py`：依 config 呼叫首版抽樣或補抽。
- `extend_sample.py`：保留凍結首版 35 筆，以相同 seed 分組補抽。`history/` 保存首版樣本及設定。
- `verify_extension.py`：獨立重現補抽並檢查舊語料原文不變。
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

要從原始匯出檔重現樣本，先把本專案資料夾放在四組、六個原始檔的下一層；原始檔與本專案資料夾位於同一父資料夾，然後：

```powershell
python sample_corpora.py
python verify_sample.py
python build.py
```

重新抽樣須先明確修改 config；記錄原檔與 Python 版本，以 manifest 的已保存清單為核對基準。這個版本的 `verify_sample.py` 固定檢查本次 60 筆需求，更換母體時也應相應檢查並更新驗證期望。

把 `dist` 中的十個檔案一起上傳到既有 GitHub Pages 儲存庫根目錄即可更新 `precoding.html` 與 PWA，不需替換原本的 `index.html`。`precoding-source.zip` 只含這 60 筆樣本、程式與方法文件，不含未抽中的完整語料，也不含使用者標註。`build_report.json` 保存版本、HTML hash 與部署檔案清單。

公開的來源核對檔及 ZIP 中的 `source_audit.json` 僅保留檔名、SHA-256、筆數及對齊事件計數；完整逐筆對齊診斷留在本機。ZIP 的 `history/` 為本次 60 筆之中原有的 35 筆凍結樣本，供重現補抽與識別碼核對。
