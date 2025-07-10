# AI 開發備忘錄

## MDX 語法錯誤修復規則

在 Docusaurus 專案中，MDX 檔案可能會遇到以下語法錯誤，需要進行修復：

### 1. `//` 註解問題

**錯誤訊息**: `Could not parse expression with acorn`

**問題**: 在 MDX 中，`//` 會被解析為 JSX 表達式

**解決方案**: 將 `//` 改為 `（）` 括號

**範例**:

```markdown
❌ 錯誤: • CardType: INT //目標遊戲為番攤
✅ 正確: • CardType: INT （目標遊戲為番攤）
```

### 2. 泛型語法問題

**錯誤訊息**: `Unexpected character in name`

**問題**: `map<string, string>` 等泛型語法會被解析為 JSX 標籤

**解決方案**: 使用 HTML 實體編碼 `&lt;` 和 `&gt;`

**範例**:

```markdown
❌ 錯誤: | tags | map<string, string> | 標籤 |
✅ 正確: | tags | map&lt;string, string&gt; | 標籤 |
```

### 3. 標籤語法問題

**錯誤訊息**: `Unexpected character in name`

**問題**: `proto[Github]` 缺少空格會被解析為 JSX 標籤

**解決方案**: 改為 `proto [Github]`

**範例**:

```markdown
❌ 錯誤: * proto[Github](https://...)
✅ 正確: * proto [Github](https://...)
```

### 4. 大括號語法問題

**錯誤訊息**: `Could not parse expression with acorn`

**問題**: `[{Code: xxx}]` 會被解析為 JSX 表達式

**解決方案**: 使用 HTML 實體編碼 `&#123;` 和 `&#125;`

**範例**:

```markdown
❌ 錯誤: • List: [{Code: 149}] （開149點數）
✅ 正確: • List: [&#123;Code: 149&#125;] （開149點數）
```

### 5. 程式碼區塊（```）上下需有空行（MD031）

**錯誤訊息**:
MD031/blanks-around-fences: Fenced code blocks should be surrounded by blank lines

**問題**:
程式碼區塊（```）上下未加空行，會被 markdownlint 視為格式錯誤。

**解決方案**:
在每個程式碼區塊的前後都加上一行空行。

**範例**:

錯誤寫法：

```markdown
**範例**:

```js
console.log('hello')
```

正確寫法：

```markdown
**範例**:

```js
console.log('hello')
```

## 常見錯誤位置

這些錯誤通常出現在以下檔案中：

- `docs/api/games/*.md` - 遊戲 API 文檔
- `docs/api/proto.md` - Protocol Buffer 文檔

## 修復步驟

1. 檢查錯誤訊息中的檔案路徑和行號
2. 根據錯誤類型選擇對應的修復方案
3. 使用 `search_replace` 工具進行修復
4. 重新啟動開發伺服器確認修復成功

## 注意事項

- 修復後需要重新啟動 `pnpm run start` 來清除快取
- 某些錯誤可能需要多次修復，因為檔案中可能有多個相同問題
- 建議在修復前先備份檔案

## 6. 最後要留一行
