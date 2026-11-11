# SPA 详情页 SEO 静态化复用指导（qiankun 微前端 + Node/Puppeteer + nginx）

> 适用场景：qiankun 微前端子应用中的动态详情页（如 `/marketManagement/news/:id`、`/marketManagement/cases/:id`），
> 需要让**浏览器“查看源代码”（Ctrl+U）和搜索引擎爬虫**都能看到文章级 `title/keywords/description`，且正文可被收录。
> 本指导基于“悠闲装箱 saas”项目 `marketManagement` 子应用的线上落地经验总结，其他项目可直接套用。

## 0. 文档说明

- 本方案不改后端、不改前端业务代码（前端只需已有 `setSeoMeta` 在详情页写入 meta），只新增一个 Node 服务 + 改 nginx + 加定时预生成。
- 成品代码位置（本仓库）：
  - `dynamic-render-service/server.js`（服务主程序，部署时直接用）
  - `dynamic-render-service/prewarm.js`（定时预生成脚本）
  - `dynamic-render-service/ecosystem.config.js`（pm2 配置）
  - `dynamic-render-service/package.json`（依赖）
  - `main/nginx.conf`（线上 9045 server 块配置样例）
- 服务器部署目录：`/mnt/nginx/saasTestNew/dynamic-render-service/`（示例路径，可自定）。

## 1. 目标与验收标准

**目标**：任意浏览器/爬虫（不区分 UA、无需登录）访问详情 URL，`Ctrl+U` 查看源代码时
head 里的 `title/keywords/description` 是文章数据；新文章无需重新构建前端。

**验收标准**
1. `curl`（不带爬虫 UA）访问详情 URL → 返回 HTML 的 `<title>`、`keywords`、`description` 为该文章数据；
2. 浏览器打开同一 URL → 功能与现状完全一致（qiankun 正常挂载、交互正常）；`Ctrl+U` 与 F12 一致；
3. 任意新 id 可用：新发文章无需重新构建前端，首次访问自动生成；
4. 文章编辑/删除后，meta 在约定时间内同步（清理接口 + 定时预生成兜底）；
5. 爬虫 UA（Baiduspider/Googlebot）→ 与浏览器拿到同一份完整 HTML（正文 + meta）。

## 2. 总体架构

```
浏览器 / 爬虫（所有 UA 同路径）
  GET /marketManagement/news/123
    └─ nginx 详情正则 location
         ├─ 静态文件命中 market-seo/news/123/index.html → 直接返回（毫秒级，源码含 meta，正文完整）
         └─ 未命中 → location @generate → Node 服务(3000) /generate?path=...
              ├─ 1) Puppeteer 渲染完整页面（正文 + meta）→ 成功则写盘
              ├─ 2) 渲染未写入 meta → 详情接口 + 壳 meta 注入（确定性兜底，meta 一定正确）
              └─ 3) 都失败 → 返回主应用壳（SPA 自行渲染）
```

核心机制：
1. **静态化**：详情页预渲染/注入后写盘 `market-seo/{type}/{id}/index.html`，nginx 优先返回静态文件；
2. **防递归**：渲染器请求带 `X-Render-Internal: 1` 头，nginx 对该请求直接返回主应用壳，不再次进入 `@generate`；
3. **预生成**：`prewarm.js` 定时遍历 CMS 列表接口补齐缺失的静态文件，新文章无需等待首次访问。

## 3. 前置条件

- 前端详情页已实现运行时 meta 写入（本项目为 `marketManagement/src/pages/web-ops-console/{news,cases}/Detail.vue`
  中详情数据返回后调用 `setSeoMeta({ title, keywords, description })`；详见 §4.7）；
- 服务器 Node.js >= 14.14（本项目为 14.21.x；puppeteer 锁定 19.11.1，Node 14 兼容）；
- nginx 已配置该子应用的静态 location（本项目 `location /marketManagement`）；
- 后端详情接口、列表接口在**服务器本机**匿名可访问（本项目已验证：详情接口必须用**路径参数**形式，见 §8）。

## 4. 文件清单与实现内容

### 4.1 目录结构（新增 `dynamic-render-service/` 文件夹）

```
dynamic-render-service/
├── server.js            服务主程序（监听 3000；/generate 生成器 + 直连渲染调试分支）
├── prewarm.js           定时预生成脚本（遍历列表接口，补齐缺失静态文件）
├── ecosystem.config.js  pm2 启动配置（环境变量）
├── package.json         依赖（仅 puppeteer）
└── README.md            服务说明
```

### 4.2 package.json（新增，内容）

```json
{
    "name": "dynamic-render-service",
    "version": "1.0.0",
    "private": true,
    "description": "SEO 静态化渲染服务（Node + Puppeteer），监听 3000 端口",
    "main": "server.js",
    "engines": {
        "node": ">=14.14.0"
    },
    "scripts": {
        "start": "node server.js"
    },
    "dependencies": {
        "puppeteer": "19.11.1"
    }
}
```

> 说明：puppeteer 19.11.1 是最后一代支持 Node 14 的版本（自带 Chrome 116），安装时会自动下载 Chrome。
> 若服务器无法访问外网下载 Chrome，见 §8 常见问题（系统 Chrome + CHROME_PATH）。

### 4.3 ecosystem.config.js（新增，内容）

```js
module.exports = {
    apps: [
        {
            name: 'dynamic-render',
            script: 'server.js',
            cwd: __dirname,
            instances: 1,
            max_memory_restart: '800M',
            env: {
                NODE_ENV: 'production',
                PORT: '3000',
                TARGET_BASE: 'http://127.0.0.1:9045',
                SHELL_PATH: '/mnt/nginx/saasTestNew/saas/index.html',
                OUTPUT_ROOT: '/mnt/nginx/saasTestNew/market-seo',
                CMS_BASE: 'http://127.0.0.1:9045',
                MAX_CONCURRENCY: '5',
                META_WAIT_MS: '12000'
            }
        }
    ]
}
```

环境变量说明（其他项目按需修改）：

| 变量 | 默认值 | 说明 |
| --- | --- | --- |
| PORT | 3000 | 服务监听端口（与 nginx proxy_pass 对应） |
| TARGET_BASE | http://127.0.0.1:9045 | 渲染时打开的页面入口（与 nginx 同机用回环地址） |
| SHELL_PATH | /mnt/nginx/saasTestNew/saas/index.html | 主应用壳路径（生成失败降级/注入 meta 的基底） |
| OUTPUT_ROOT | /mnt/nginx/saasTestNew/market-seo | 静态文件输出根目录（nginx root 指向） |
| CMS_BASE | http://127.0.0.1:9045 | 详情/列表接口回环入口 |
| MAX_CONCURRENCY | 5 | 同时渲染的页面数上限，超出排队 |
| RENDER_TIMEOUT_MS | 20000 | 页面加载超时 |
| META_WAIT_MS | 12000 | 等待 meta 写入总超时的一部分 |
| META_APPLY_MS | 4000 | 等待 meta 写入总超时的另一部分（合计 META_WAIT_MS+META_APPLY_MS） |
| CHROME_PATH | 空 | 指定 Chrome/Chromium 路径（默认 puppeteer 自带 Chrome） |

### 4.4 server.js（新增，服务主程序，核心逻辑说明）

文件位置：`dynamic-render-service/server.js`（约 440 行，部署时整文件拷贝，无需改动）。

`server.js`完整代码：
```js
'use strict'

// 动态渲染服务（方案B 合并版）：Node + Puppeteer + 全量静态化生成器
// 所有 UA 的 /marketManagement/(news|cases)/* 详情页由 nginx 优先读静态文件（market-seo），
// 未命中时回源 /generate：用 headless Chrome 渲染完整页面（正文 + 文章 meta）并写盘，
// 浏览器 Ctrl+U 与爬虫拿到同一份完整 HTML；另配 prewarm.js 定时预生成。
// 配置项见 README.md。

const http = require('http')
const fs = require('fs')
const path = require('path')
const puppeteer = require('puppeteer')

// 服务监听端口（对应 nginx 中 proxy_pass http://127.0.0.1:3000）
const PORT = Number(process.env.PORT || 3000)
// 渲染页面时的内部入口：与 nginx 同机用回环地址，避免公网回环
const TARGET_BASE = (process.env.TARGET_BASE || 'http://127.0.0.1:9045').replace(/\/+$/, '')
// 同时渲染的最大页面数（超过则排队）
const MAX_CONCURRENCY = Number(process.env.MAX_CONCURRENCY || 5)
// 单次渲染页面加载超时
const RENDER_TIMEOUT_MS = Number(process.env.RENDER_TIMEOUT_MS || 20000)
// 等待子应用 render-event 的总超时（事件在 Vue mounted 后 5s 派发）
const META_WAIT_MS = Number(process.env.META_WAIT_MS || 12000)
// render-event 触发后，等待文章级 meta 写入的时长
const META_APPLY_MS = Number(process.env.META_APPLY_MS || 4000)
// 轮询间隔
const POLL_INTERVAL_MS = Number(process.env.POLL_INTERVAL_MS || 200)
// 指定 Chrome/Chromium 可执行文件路径（默认使用 puppeteer 自带 Chrome）
const CHROME_PATH = process.env.CHROME_PATH || undefined

// 子应用守卫注入的详情页静态 meta（数据渲染成功后会被 setSeoMeta 覆盖）
const STATIC_DETAIL_TITLES = ['文章详情-悠闲装箱', '案例详情-悠闲装箱']
const STATIC_DETAIL_KEYWORDS = ['装箱学院-悠闲装箱-文章详情', '客户案例-悠闲装箱-案例详情']
const STATIC_DETAIL_DESCRIPTIONS = ['装箱学院-悠闲装箱-文章详情', '客户案例-悠闲装箱-案例详情']

let browserPromise = null
let active = 0

async function getBrowser() {
    if (!browserPromise) {
        browserPromise = puppeteer
            .launch({
                executablePath: CHROME_PATH,
                headless: true,
                args: [
                    '--no-sandbox', // 服务器常以 root 运行，需关闭沙箱
                    '--disable-setuid-sandbox',
                    '--disable-dev-shm-usage',
                    '--disable-gpu',
                    '--no-first-run',
                    '--disable-extensions'
                ]
            })
            .catch(err => {
                browserPromise = null
                throw err
            })
    }
    return browserPromise
}

// 轮询等待条件成立；超时或页面异常时返回 false（按当前内容降级返回）
async function waitForCondition(page, fn, timeoutMs, args = []) {
    const deadline = Date.now() + timeoutMs
    while (Date.now() < deadline) {
        try {
            if (await page.evaluate(fn, ...args)) return true
        } catch (err) {
            return true // 页面异常，放弃等待
        }
        await new Promise(resolve => setTimeout(resolve, POLL_INTERVAL_MS))
    }
    return false
}

async function renderPage(url) {
    const browser = await getBrowser()
    const page = await browser.newPage()
    try {
        await page.setViewport({ width: 1366, height: 768 })
        // 渲染器标识：nginx 据此跳过 @generate 链直接返回子应用 SPA 壳，避免“渲染→未命中→再渲染”递归
        await page.setExtraHTTPHeaders({ 'X-Render-Internal': '1' })

        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: RENDER_TIMEOUT_MS })

        // 记录初始 head 状态（index.html 默认 title/meta）
        const initial = await page.evaluate(() => ({
            title: document.title || '',
            kw: (document.querySelector('meta[name="keywords"]') || {}).content || '',
            desc: (document.querySelector('meta[name="description"]') || {}).content || ''
        }))

        // 等待文章级 meta 写入：任一字段变为“非初始值且非静态默认值”即视为就绪。
        // 注意不能用“非静态默认值”作唯一条件：裸壳的默认 title 也不在静态列表里，会提前返回抓成默认 meta。
        const metaApplied = await waitForCondition(
            page,
            (prev) => {
                const title = document.title || ''
                const kw = (document.querySelector('meta[name="keywords"]') || {}).content || ''
                const desc = (document.querySelector('meta[name="description"]') || {}).content || ''
                const titleReady = !!title && title !== prev.title && !STATIC_DETAIL_TITLES.includes(title)
                const kwReady = !!kw && kw !== prev.kw && !STATIC_DETAIL_KEYWORDS.includes(kw)
                const descReady = !!desc && desc !== prev.desc && !STATIC_DETAIL_DESCRIPTIONS.includes(desc)
                return titleReady || kwReady || descReady
            },
            META_WAIT_MS + META_APPLY_MS,
            [initial]
        )

        if (!metaApplied) {
            const head = await page.evaluate(() => ({
                title: document.title || '',
                kw: (document.querySelector('meta[name="keywords"]') || {}).content || '',
                desc: (document.querySelector('meta[name="description"]') || {}).content || ''
            }))
            console.log(`[render] meta 未就绪，head=${JSON.stringify(head)} url=${url}`)
        }

        const html = await page.content()
        return { html, metaApplied }
    } finally {
        await page.close().catch(() => {})
    }
}

async function withConcurrency(fn) {
    while (active >= MAX_CONCURRENCY) {
        await new Promise(resolve => setTimeout(resolve, 100))
    }
    active += 1
    try {
        return await fn()
    } finally {
        active -= 1
    }
}

// ==================== 方案B：壳 + meta 静态化生成器 ====================

// 主应用壳路径（浏览器访问详情页实际拿到的是主应用 index.html）
const SHELL_PATH = process.env.SHELL_PATH || '/mnt/nginx/saasTestNew/saas/index.html'
// 生成文件输出根目录（nginx 该 location 的 root 指向此目录）
const OUTPUT_ROOT = process.env.OUTPUT_ROOT || '/mnt/nginx/saasTestNew/market-seo'
// 详情接口回环入口（与 TARGET_BASE 一致）
const CMS_BASE = (process.env.CMS_BASE || 'http://127.0.0.1:9045').replace(/\/+$/, '')
// 只允许 news/cases + 数字 id（白名单，防路径穿越）
const DETAIL_PATH_RE = /^\/marketManagement\/(news|cases)\/([0-9]+)$/

// 壳缓存：按 mtime 失效，前端发版后自动重新读取
let shellCache = { mtimeMs: -1, content: '' }

function httpGetText(targetUrl, timeoutMs = 15000) {
    return new Promise((resolve, reject) => {
        const req = http.get(targetUrl, res => {
            let data = ''
            res.setEncoding('utf8')
            res.on('data', chunk => { data += chunk })
            res.on('end', () => resolve({ statusCode: res.statusCode, body: data }))
        })
        req.setTimeout(timeoutMs, () => req.destroy(new Error('timeout')))
        req.on('error', reject)
    })
}

// 读取主应用壳：优先读本地文件（带 mtime 缓存），文件缺失时回退拉取 CMS_BASE 首页
async function readShell() {
    try {
        const stat = fs.statSync(SHELL_PATH)
        if (shellCache.content && stat.mtimeMs === shellCache.mtimeMs) return shellCache.content
        const content = fs.readFileSync(SHELL_PATH, 'utf8')
        shellCache = { mtimeMs: stat.mtimeMs, content }
        return content
    } catch (err) {
        const { statusCode, body } = await httpGetText(CMS_BASE + '/')
        if (statusCode !== 200) throw err
        return body
    }
}

// ==================== meta 注入兜底（API 取详情 + 壳注入，确定性保证 meta 正确） ====================

// 与前端 src/pages/web-ops-console/utils.js 的 stripHtml / excerpt 保持一致
function stripHtml(html) {
    return String(html || '')
        .replace(/<style[\s\S]*?<\/style>/gi, '')
        .replace(/<script[\s\S]*?<\/script>/gi, '')
        .replace(/<[^>]+>/g, ' ')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/\s+/g, ' ')
        .trim()
}

function excerpt(html, maxLength = 150) {
    const text = stripHtml(html)
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text
}

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
}

// 组装 meta，规则与前端两个 Detail.vue 的 setSeoMeta 调用保持一致
function buildMeta(type, data) {
    const source = data || {}
    const title = String(source.title || source.name || '').trim()
    if (!title) throw new Error('详情数据缺少 title')
    let keywords = ''
    if (type === 'news') {
        keywords = String(source.searchKeyword || source.keyword || '').trim()
    } else {
        const industry = String(source.caseTypeTranslate || source.caseType || source.industry || '').trim() || '其他行业'
        keywords = `${industry},${title}`
    }
    return {
        title: `${title}-悠闲装箱`,
        keywords,
        description: excerpt(source.content, 150)
    }
}

async function fetchDetail(type, id) {
    const apiPath = type === 'news'
        ? `${CMS_BASE}/api/load-points-cms/cmsArticle/details/${encodeURIComponent(id)}`
        : `${CMS_BASE}/api/load-points-cms/cmsCustomerCase/details/${encodeURIComponent(id)}`
    const { statusCode, body } = await httpGetText(apiPath)
    if (statusCode !== 200) throw new Error(`详情接口 HTTP ${statusCode}`)
    let json = null
    try {
        json = JSON.parse(body)
    } catch (err) {
        throw new Error('详情接口返回非 JSON')
    }
    if (String(json.code) !== '200' || !json.data) throw new Error(`详情接口 code=${json.code}`)
    return json.data
}

// 注入 meta：替换 title；keywords/description 存在则更新 content，不存在则统一插到 </title> 之后
function injectMeta(html, meta) {
    let out = html
    out = out.replace(/<title[^>]*>[\s\S]*?<\/title>/i, () => `<title>${escapeHtml(meta.title)}</title>`)
    const missing = []
    const ensureMetaTag = (name, content) => {
        if (!content) return
        const re = new RegExp(`<meta[^>]*name=["']${name}["'][^>]*>`, 'i')
        if (re.test(out)) {
            out = out.replace(re, m => {
                if (/content=(["'])[^"']*\1/i.test(m)) {
                    return m.replace(/content=(["'])[^"']*\1/i, () => `content="${escapeHtml(content)}"`)
                }
                return m.replace(/(<meta[^>]*?)(\/?>)/i, `$1 content="${escapeHtml(content)}"$2`)
            })
        } else {
            missing.push([name, content])
        }
    }
    ensureMetaTag('keywords', meta.keywords)
    ensureMetaTag('description', meta.description)
    if (missing.length) {
        const insert = missing
            .map(([name, content]) => `<meta name="${name}" content="${escapeHtml(content)}">`)
            .join('\n')
        out = out.replace(/<\/title>/i, () => `</title>\n${insert}\n`)
    }
    return out
}

// 原子写盘：临时文件 + rename，避免并发写坏文件
function writeStatic(type, id, html) {
    const dir = path.join(OUTPUT_ROOT, type, id)
    fs.mkdirSync(dir, { recursive: true })
    const file = path.join(dir, 'index.html')
    const tmp = path.join(dir, `.index.${process.pid}.${Date.now()}.tmp`)
    fs.writeFileSync(tmp, html, 'utf8')
    fs.renameSync(tmp, file)
    return file
}

function deleteStatic(type, id) {
    const file = path.join(OUTPUT_ROOT, type, id, 'index.html')
    if (fs.existsSync(file)) {
        fs.unlinkSync(file)
        try { fs.rmdirSync(path.dirname(file)) } catch (err) {}
        return true
    }
    return false
}

// 全量清理（前端发版 / 定时兜底用）
function purgeStatic() {
    for (const type of ['news', 'cases']) {
        const dir = path.join(OUTPUT_ROOT, type)
        if (fs.existsSync(dir)) {
            fs.rmSync(dir, { recursive: true, force: true })
        }
    }
}

async function handleGenerate(res, url) {
    const rawPath = url.searchParams.get('path') || ''
    const match = DETAIL_PATH_RE.exec(rawPath)
    if (!match) {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
        res.end('Not Found')
        return
    }
    const type = match[1]
    const id = match[2]
    const start = Date.now()
    try {
        // 1) 优先：Puppeteer 全量渲染（正文 + 文章 meta）
        const { html: renderedHtml, metaApplied } = await withConcurrency(() => renderPage(TARGET_BASE + rawPath))
        if (metaApplied) {
            const file = writeStatic(type, id, renderedHtml)
            console.log(`[generate] ${rawPath} -> 200 全量渲染 (${Date.now() - start}ms, ${file})`)
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
            res.end(renderedHtml)
            return
        }
        // 2) 渲染未写入文章 meta：降级为“壳 + 接口 meta 注入”（确定性方案，保证 meta 正确）
        const data = await fetchDetail(type, id)
        const meta = buildMeta(type, data)
        const shell = await readShell()
        const html = injectMeta(shell, meta)
        const file = writeStatic(type, id, html)
        console.log(`[generate] ${rawPath} -> 200 meta注入兜底 (${Date.now() - start}ms, ${file})`)
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
        res.end(html)
    } catch (err) {
        console.error(`[generate] ${rawPath} -> error: ${err && err.message}`)
        // 3) 兜底：返回主应用壳（不含文章 meta），SPA 自行渲染，不产生 5xx
        try {
            const shell = await readShell()
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
            res.end(shell)
        } catch (shellErr) {
            res.writeHead(502, { 'Content-Type': 'text/plain; charset=utf-8' })
            res.end('Generate failed')
        }
    }
}

function handleGenerateDelete(res, url) {
    const rawPath = url.searchParams.get('path') || ''
    const match = DETAIL_PATH_RE.exec(rawPath)
    if (!match) {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
        res.end('Not Found')
        return
    }
    const removed = deleteStatic(match[1], match[2])
    console.log(`[generate] DELETE ${rawPath} -> removed=${removed}`)
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
    res.end(JSON.stringify({ ok: true, removed }))
}

function handleGeneratePurge(res) {
    purgeStatic()
    console.log('[generate] purge market-seo news/cases')
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
    res.end(JSON.stringify({ ok: true }))
}

const server = http.createServer(async (req, res) => {
    const start = Date.now()
    const url = new URL(req.url, TARGET_BASE)

    // 方案B：静态化生成器接口
    if (url.pathname === '/generate') {
        if (req.method === 'GET') {
            await handleGenerate(res, url)
        } else if (req.method === 'DELETE') {
            handleGenerateDelete(res, url)
        } else {
            res.writeHead(405, { 'Content-Type': 'text/plain; charset=utf-8' })
            res.end('Method Not Allowed')
        }
        return
    }
    if (req.method === 'POST' && url.pathname === '/generate/purge') {
        handleGeneratePurge(res)
        return
    }

    if (req.method !== 'GET') {
        res.writeHead(405, { 'Content-Type': 'text/plain; charset=utf-8' })
        res.end('Method Not Allowed')
        return
    }
    if (url.pathname === '/health') {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
        res.end(JSON.stringify({ ok: true, active, max: MAX_CONCURRENCY, outputRoot: OUTPUT_ROOT }))
        return
    }
    // 详情页直连渲染（调试用；线上由 nginx 统一走静态化，本分支保留便于 curl 直测）
    if (!/^\/marketManagement\/(news|cases)\//.test(url.pathname)) {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
        res.end('Not Found')
        return
    }
    const targetUrl = TARGET_BASE + url.pathname + url.search
    try {
        const { html } = await withConcurrency(() => renderPage(targetUrl))
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
        res.end(html)
        console.log(`[render] ${url.pathname} -> 200 (${Date.now() - start}ms)`)
    } catch (err) {
        console.error(`[render] ${url.pathname} -> error: ${err && err.message}`)
        res.writeHead(502, { 'Content-Type': 'text/plain; charset=utf-8' })
        res.end('Dynamic render failed')
    }
})

server.listen(PORT, () => {
    console.log(`dynamic-render-service listening on :${PORT}`)
    console.log(`target base: ${TARGET_BASE}`)
    console.log(`output root: ${OUTPUT_ROOT}`)
})

async function shutdown() {
    if (browserPromise) {
        try {
            const browser = await browserPromise
            await browser.close()
        } catch (err) {
            console.error('close browser error:', err && err.message)
        }
    }
    server.close(() => process.exit(0))
}
process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)

```
服务职责：监听 3000 端口，提供 `/generate` 静态化生成接口、`/health` 健康检查、直连渲染调试分支。

**4.4.1 启动与配置**
- 全部配置来自环境变量（见 §4.3），代码内无硬编码业务路径；
- puppeteer 惰性单例启动，参数含 `--no-sandbox`、`--disable-dev-shm-usage` 等（服务器以 root 运行必需）；
- `withConcurrency()` 限流：同时渲染页面数 ≤ `MAX_CONCURRENCY`，超出排队等待。

**4.4.2 renderPage()：Puppeteer 渲染完整页面（核心）**
流程：
1. `page.setExtraHTTPHeaders({ 'X-Render-Internal': '1' })`——防递归关键（见 §4.6）；
2. `page.goto(TARGET_BASE + 详情路径, { waitUntil: 'domcontentloaded' })`，打开主应用壳（qiankun 引导子应用）；
3. 记录加载完成后的**初始 head**（title/keywords/description）；
4. 轮询等待（总超时 `META_WAIT_MS + META_APPLY_MS`）：任一字段变为“**非初始值且非静态默认值**”即认为文章 meta 已写入；
5. 超时未就绪 → 输出 `[render] meta 未就绪，head=...` 日志（排查用）；
6. 返回 `{ html: page.content(), metaApplied }`。

要点：
- 判断条件不能只用“非静态默认值”：裸壳的默认 title 也不在静态默认列表里，会提前返回抓成默认 meta（详见 §8）；
- 静态默认列表在文件顶部（`STATIC_DETAIL_TITLES` / `STATIC_DETAIL_KEYWORDS` / `STATIC_DETAIL_DESCRIPTIONS`），
  其他项目改成自己详情页的静态默认值。

等待 meta 写入的核心代码：

```js
const metaApplied = await waitForCondition(
    page,
    (prev) => {
        const title = document.title || ''
        const kw = (document.querySelector('meta[name="keywords"]') || {}).content || ''
        const desc = (document.querySelector('meta[name="description"]') || {}).content || ''
        const titleReady = !!title && title !== prev.title && !STATIC_DETAIL_TITLES.includes(title)
        const kwReady = !!kw && kw !== prev.kw && !STATIC_DETAIL_KEYWORDS.includes(kw)
        const descReady = !!desc && desc !== prev.desc && !STATIC_DETAIL_DESCRIPTIONS.includes(desc)
        return titleReady || kwReady || descReady
    },
    META_WAIT_MS + META_APPLY_MS,
    [initial]
)
```

**4.4.3 详情接口兜底（fetchDetail / buildMeta / injectMeta）**
- `fetchDetail(type, id)`：GET `CMS_BASE + /api/load-points-cms/cmsArticle/details/{id}`（news）或
  `/api/load-points-cms/cmsCustomerCase/details/{id}`（cases）；**必须路径参数形式**（`?id=` 会被网关判 401，见 §8）；
- `buildMeta(type, data)`：规则与前端两个 Detail.vue 的 `setSeoMeta` 调用保持一致：
  - title = `{文章title}-悠闲装箱`
  - news keywords = `searchKeyword || keyword`；cases keywords = `caseTypeTranslate || caseType || industry`，空则“其他行业”，再加 `,标题`
  - description = 正文 `stripHtml` 后截 150 字（超长加 `...`）
- `injectMeta(html, meta)`：替换 `<title>`；keywords/description 已存在则更新 content，缺失则统一插到 `</title>` 之后；
- 其他项目需改：接口路径、字段映射、标题后缀。

**4.4.4 写盘与清理（writeStatic / deleteStatic / purgeStatic）**
- 写盘：`OUTPUT_ROOT/{type}/{id}/index.html`，临时文件 + rename 原子替换，并发安全；
- `DELETE /generate?path=...` → 删除单个静态文件（文章编辑/删除后调用）；
- `POST /generate/purge` → 清空 news/cases 全部静态文件（前端发版 / 全量重建用）。

**4.4.5 handleGenerate()：两级生成策略（核心）**
- 白名单正则 `DETAIL_PATH_RE = /^\/marketManagement\/(news|cases)\/([0-9]+)$/`，只允许 news/cases + 数字 id，防路径穿越；
- 策略（代码摘录）：

```js
// 1) 优先：Puppeteer 全量渲染（正文 + 文章 meta）
const { html: renderedHtml, metaApplied } = await withConcurrency(() => renderPage(TARGET_BASE + rawPath))
if (metaApplied) {
    const file = writeStatic(type, id, renderedHtml)
    console.log(`[generate] ${rawPath} -> 200 全量渲染 (${Date.now() - start}ms, ${file})`)
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
    res.end(renderedHtml)
    return
}
// 2) 渲染未写入文章 meta：降级为“壳 + 接口 meta 注入”（确定性方案，保证 meta 正确）
const data = await fetchDetail(type, id)
const meta = buildMeta(type, data)
const shell = await readShell()
const html = injectMeta(shell, meta)
const file = writeStatic(type, id, html)
console.log(`[generate] ${rawPath} -> 200 meta注入兜底 (${Date.now() - start}ms, ${file})`)
res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
res.end(html)
// 3) catch：返回主应用壳（SPA 自行渲染），不产生 5xx
```

效果：无论 Puppeteer 渲染是否成功，落盘文件的 meta 一定正确；渲染成功时额外获得完整正文（利于正文收录）。

**4.4.6 路由一览**

| 方法 | 路径 | 说明 |
| --- | --- | --- |
| GET | `/generate?path=/marketManagement/news/123` | 全量渲染/兜底注入并写盘，返回完整 HTML |
| DELETE | `/generate?path=...` | 删除单个静态文件 |
| POST | `/generate/purge` | 清空全部静态文件 |
| GET | `/health` | 健康检查（ok/active/max/outputRoot） |
| GET | `/marketManagement/(news|cases)/...` | 直连渲染（调试用，线上不走此分支） |

### 4.5 prewarm.js（新增，定时预生成脚本，要点）

文件位置：`dynamic-render-service/prewarm.js`（约 170 行）。
职责：遍历 CMS 已发布文章/案例列表接口，对**缺失**的静态文件逐个调用 `/generate`，增量幂等，新文章无需等待首次访问。

`prewarm.js`完整代码：
```js
'use strict'

// 定时预生成脚本（方案B 合并版）
// 遍历 CMS 已发布文章/案例列表，对尚未生成静态文件的详情页调用 /generate 全量渲染写盘。
// 用法：
//   node prewarm.js                 # 增量：只生成缺失的静态文件
//   node prewarm.js --force         # 全量：重新生成所有详情页
//   node prewarm.js --types news    # 只处理指定类型（news / cases / news,cases）
// 定时（每小时）：
//   0 * * * * cd /mnt/nginx/saasTestNew/dynamic-render-service && node prewarm.js >> /root/.pm2/logs/prewarm.log 2>&1
//
// 环境变量：CMS_BASE / GENERATE_BASE / OUTPUT_ROOT / CMS_TOKEN / PREWARM_PAGE_SIZE / PREWARM_MAX_PAGES / PREWARM_CONCURRENCY

const http = require('http')
const fs = require('fs')
const path = require('path')

const CMS_BASE = (process.env.CMS_BASE || 'http://127.0.0.1:9045').replace(/\/+$/, '')
const GENERATE_BASE = (process.env.GENERATE_BASE || 'http://127.0.0.1:3000').replace(/\/+$/, '')
const OUTPUT_ROOT = process.env.OUTPUT_ROOT || '/mnt/nginx/saasTestNew/market-seo'
const CMS_TOKEN = process.env.CMS_TOKEN || ''
const PAGE_SIZE = Number(process.env.PREWARM_PAGE_SIZE || 100)
const MAX_PAGES = Number(process.env.PREWARM_MAX_PAGES || 100)
const CONCURRENCY = Number(process.env.PREWARM_CONCURRENCY || 2)

const args = process.argv.slice(2)
const FORCE = args.includes('--force')
const typesIndex = args.indexOf('--types')
const typesValue = typesIndex >= 0 ? args[typesIndex + 1] : (args.find(a => a.startsWith('--types=')) || '').split('=')[1]
const ONLY_TYPES = typesValue ? typesValue.split(',').map(s => s.trim()).filter(Boolean) : null

// 与前端 web-ops-console/utils.js 的 getFirstValue 保持一致
function getFirstValue(source, keys, fallback = []) {
    for (const key of keys) {
        const value = source && source[key]
        if (value !== undefined && value !== null && value !== '') return value
    }
    return fallback
}

// 与门户列表页（web-ops-console news/cases Index.vue）相同的分页参数
const SOURCES = [
    {
        type: 'news',
        apiPath: '/api/load-points-cms/cmsArticle/pageList',
        body: { articleStatus: '1', content: '', page: 1, size: PAGE_SIZE, searchKeyword: '', title: '' },
        idKeys: ['id', 'articleId']
    },
    {
        type: 'cases',
        apiPath: '/api/load-points-cms/cmsCustomerCase/pageList',
        body: { caseStatus: '1', caseType: '', content: '', coreData: '', direction: 'DESC', metricData: '', page: 1, properties: 'publishTime', size: PAGE_SIZE, title: '' },
        idKeys: ['id', 'caseId']
    }
]

function requestText(targetUrl, { method = 'GET', body = null, timeoutMs = 20000 } = {}) {
    return new Promise((resolve, reject) => {
        const headers = { 'Accept': '*/*' }
        if (CMS_TOKEN) headers['Authorization'] = CMS_TOKEN
        let payload = null
        if (body !== null) {
            payload = JSON.stringify(body)
            headers['Content-Type'] = 'application/json;charset=UTF-8'
            headers['Content-Length'] = Buffer.byteLength(payload)
        }
        const req = http.request(targetUrl, { method, headers }, res => {
            let data = ''
            res.setEncoding('utf8')
            res.on('data', chunk => { data += chunk })
            res.on('end', () => resolve({ statusCode: res.statusCode, body: data }))
        })
        req.setTimeout(timeoutMs, () => req.destroy(new Error('timeout')))
        req.on('error', reject)
        if (payload) req.end(payload)
        else req.end()
    })
}

async function fetchIds(source) {
    const ids = []
    const seen = new Set()
    for (let page = 1; page <= MAX_PAGES; page += 1) {
        const body = Object.assign({}, source.body, { page, size: PAGE_SIZE })
        const { statusCode, body: text } = await requestText(CMS_BASE + source.apiPath, { method: 'POST', body, timeoutMs: 30000 })
        if (statusCode !== 200) throw new Error(`${source.type} pageList HTTP ${statusCode}`)
        let json = null
        try {
            json = JSON.parse(text)
        } catch (err) {
            throw new Error(`${source.type} pageList 返回非 JSON`)
        }
        if (String(json.code) !== '200' || !json.data) throw new Error(`${source.type} pageList code=${json.code}`)
        // 分页结构兼容：与前端 unwrapPage 一致，支持 data 直接是数组或 data.content/records/list
        const pageData = json.data
        const list = Array.isArray(pageData)
            ? pageData
            : getFirstValue(pageData, ['content', 'records', 'list'], [])
        for (const item of list) {
            for (const key of source.idKeys) {
                if (item && item[key] != null && !seen.has(String(item[key]))) {
                    seen.add(String(item[key]))
                    ids.push(String(item[key]))
                    break
                }
            }
        }
        if (list.length < PAGE_SIZE) break
    }
    return ids
}

async function generateOne(sourceType, id) {
    const file = path.join(OUTPUT_ROOT, sourceType, id, 'index.html')
    if (!FORCE && fs.existsSync(file)) return 'skip'
    const targetUrl = `${GENERATE_BASE}/generate?path=/marketManagement/${sourceType}/${id}`
    const { statusCode } = await requestText(targetUrl, { timeoutMs: 180000 })
    if (statusCode !== 200) throw new Error(`generate HTTP ${statusCode}`)
    return 'ok'
}

async function run() {
    const startedAt = Date.now()
    const sources = SOURCES.filter(s => !ONLY_TYPES || ONLY_TYPES.includes(s.type))
    for (const source of sources) {
        const ids = await fetchIds(source)
        console.log(`[prewarm] ${source.type}: ${ids.length} 个详情页`)
        const stats = { ok: 0, skip: 0, fail: 0 }
        let index = 0
        const worker = async () => {
            while (index < ids.length) {
                const id = ids[index++]
                try {
                    const result = await generateOne(source.type, id)
                    if (result === 'ok') stats.ok += 1
                    else stats.skip += 1
                } catch (err) {
                    stats.fail += 1
                    console.log(`[prewarm] ${source.type}/${id} 失败: ${err && err.message}`)
                }
            }
        }
        const workers = Array.from({ length: Math.min(CONCURRENCY, ids.length || 1) }, worker)
        await Promise.all(workers)
        console.log(`[prewarm] ${source.type} 完成: 生成=${stats.ok} 已存在跳过=${stats.skip} 失败=${stats.fail}`)
    }
    console.log(`[prewarm] 全部完成，耗时 ${Date.now() - startedAt}ms`)
}

run().catch(err => {
    console.error('[prewarm] 异常终止:', err && err.message)
    process.exit(1)
})
```

关键内容：
- `SOURCES`：与门户列表页（news/cases Index.vue）**同参数的列表接口**：
  - news：POST `/api/load-points-cms/cmsArticle/pageList`，body `{ articleStatus:'1', content:'', page, size, searchKeyword:'', title:'' }`，id 取 `id` 或 `articleId`；
  - cases：POST `/api/load-points-cms/cmsCustomerCase/pageList`，body `{ caseStatus:'1', ..., properties:'publishTime', direction:'DESC' }`，id 取 `id` 或 `caseId`；
- `fetchIds()`：分页遍历（`list.length < size` 即停止），按 id 去重；分页结构兼容 `data` 直接是数组或
  `data.content / records / list`（与前端 unwrapPage 一致）；
- `generateOne()`：本地 `OUTPUT_ROOT/{type}/{id}/index.html` 已存在且未 `--force` 则跳过；调用 `/generate` 单次超时 180s；
- 并发 `PREWARM_CONCURRENCY`（默认 2），避免瞬时打满渲染服务；
- 用法：`node prewarm.js`（增量）/ `node prewarm.js --force`（全量重生成）/ `node prewarm.js --types news,cases`；
- 环境变量：`CMS_BASE` / `GENERATE_BASE` / `OUTPUT_ROOT` / `CMS_TOKEN`（可选）/ `PREWARM_PAGE_SIZE`（100）/
  `PREWARM_MAX_PAGES`（100）/ `PREWARM_CONCURRENCY`（2）。

> 适配要点：其他项目改 `SOURCES` 里的列表接口、请求体、idKeys；详情接口路径在 server.js 的 `fetchDetail`。

### 4.6 nginx 配置修改（main/nginx.conf，9045 server 块内）

在 9045 server 块内、`location /marketManagement` 之前新增两个 location（线上已落地，位置在
`location /backendSystem` 与 `location /marketManagement` 之间；正则 location 本来就优先于前缀匹配，
放前面只是便于阅读）。新增内容：

```nginx
# SEO（方案B 合并）：所有 UA 统一优先命中静态化文件（market-seo），未命中转 @generate 全量渲染写盘
location ~* ^/marketManagement/(news|cases)/([0-9]+)$ {
    root /mnt/nginx/saasTestNew/market-seo;
    # 渲染器内部请求（X-Render-Internal: 1）：直接返回主应用壳（qiankun 引导子应用，已验证可渲染），避免命中 @generate 递归
    if ($http_x_render_internal = "1") {
        rewrite ^ /index.html last;
    }
    try_files /$1/$2/index.html @generate;
}
# 生成器（方案B 合并）：Puppeteer 全量渲染（正文 + meta）写盘，返回完整 HTML
location @generate {
    proxy_pass http://127.0.0.1:3000/generate?path=$uri;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_connect_timeout 5s;
    proxy_read_timeout 120s;
}
```

工作原理（务必理解，别乱改）：
1. 正则只匹配 `news|cases + 纯数字 id` 的详情 URL，`/marketManagement/index.html`、列表页等其它路径不受影响；
2. **所有 UA（浏览器、爬虫、无 UA）同一路径、同一份内容，无 cloaking**；
3. `try_files /$1/$2/index.html @generate`：`$1`=news/cases、`$2`=id；命中静态文件直接返回（毫秒级），
   未命中转内部 location `@generate`；
4. **防递归**：Puppeteer 渲染器的页面请求带 `X-Render-Internal: 1` 头 → nginx `if` 判断后
   `rewrite ^ /index.html last;` 直接返回主应用壳（9045 的 `location /`，root=saas，qiankun 引导子应用），
   **不再进 @generate**，杜绝“渲染→未命中→再渲染”死循环；
5. `proxy_pass ...?path=$uri`：把原始详情路径传给生成器；`proxy_read_timeout 120s` 必须 ≥ 渲染耗时
   （实测 6~17s，留足余量），否则首次访问会 504；
6. `root /mnt/nginx/saasTestNew/market-seo` 必须与服务的 `OUTPUT_ROOT` 一致。

> 注意：本方案的 nginx 修改**不新增 server、不按 UA 分流、不用 map 变量**。之前踩过的坑：
> `proxy_set_header` 不能写在 `if` 块内；`map` 变量（is_spider）在目标服务器缺失会报 unknown variable。

### 4.7 前端必要修改（seo.js + 详情页 setSeoMeta，其它项目必须已有）

这三个前端文件的修改**不是可选项**：它是方案 B“全量渲染路径成立的前提”（§4.4.2 的 `metaApplied`
等待条件只有前端运行时把文章 meta 写入 head 才会成立）。删除后静态文件只能走“壳 + meta 注入”兜底，
meta 正确但**正文缺失**（正文无法收录），且浏览器 F12 与 Ctrl+U 不一致。

**4.7.1 seo.js（新增，完整内容）**

文件位置：`marketManagement/src/untils/seo.js`（注意目录名是 `untils`，历史遗留命名，非 `utils`）。

`seo.js`完整代码：
```js
export const setSeoMeta = ({ title = '', keywords = '', description = '' } = {}) => {
    if (title) {
        document.title = title
    }
    const ensureMeta = (name, content) => {
        if (!content) return
        let el = document.querySelector(`meta[name='${name}']`)
        if (!el) {
            el = document.createElement('meta')
            el.name = name
            document.head.appendChild(el)
        }
        el.content = content
    }
    ensureMeta('keywords', keywords)
    ensureMeta('description', description)
}
```

作用：写入 `document.title`；keywords/description 标签已存在则更新 content，不存在则创建。
其他项目：原样复制即可（放在自己子应用的 utils 目录，路径随意）。

**4.7.2 news/Detail.vue、cases/Detail.vue（修改，调用点）**

详情接口返回成功后调用 `setSeoMeta`，**取值字段/标题后缀/描述截取规则必须与服务端 `buildMeta`（§4.4.3）保持一致**：

news（`news/Detail.vue`）：
```js
import { setSeoMeta } from '@/untils/seo'

setSeoMeta({
    title: `${this.article.title}-悠闲装箱`,
    keywords: this.article.keyword,
    description: excerpt(this.article.content, 150)
})
```

cases（`cases/Detail.vue`）：
```js
import { setSeoMeta } from '@/untils/seo'

setSeoMeta({
    title: `${this.caseItem.title}-悠闲装箱`,
    keywords: `${this.caseItem.industry},${this.caseItem.title}`,
    description: excerpt(this.caseItem.content, 150)
})
```

**4.7.3 同步维护约定（关键）**
- 前端 `setSeoMeta` 与后端 `buildMeta` 是“同款映射”的两个实现，字段/后缀/截取规则改动时必须两处同步；
- 前端详情页壳里的静态默认 meta 变化时，服务端 `STATIC_DETAIL_*` 列表（§4.4.2）同步改，
  否则 `renderPage` 的等待条件会误判（把静态默认 meta 当文章 meta）。

## 5. 部署步骤（服务器，一次性）

前置：Node.js >= 14.14（推荐 14.21.x；puppeteer 19.11.1 是最后一代支持 Node 14 的版本）。

1. 上传 `dynamic-render-service/` 目录到服务器（本项目 `/mnt/nginx/saasTestNew/dynamic-render-service/`）；
2. 安装依赖：`cd /mnt/nginx/saasTestNew/dynamic-render-service && npm install`
   （自动下载 puppeteer 自带 Chrome；内网无法下载见 §8）；
3. 创建输出目录：`mkdir -p /mnt/nginx/saasTestNew/market-seo`；
4. 启动服务：`npm i -g pm2 && pm2 start ecosystem.config.js && pm2 save`；
5. 健康检查：`curl http://127.0.0.1:3000/health` → `{"ok":true,...}`；
6. 修改 nginx（§4.6）后：`nginx -t && nginx -s reload`；
7. 首次预生成：`node prewarm.js --force`（首次全量；日常增量用 `node prewarm.js`）；
8. 配置 crontab 定时预生成（§6）；
9. 验证（§7）。

运维注意：
- 3000 端口被占用：`ss -lntp | grep :3000` 查 PID，先 `pm2 stop dynamic-render && pm2 delete dynamic-render`，
  再 `kill -9 <PID>`，最后重启（见 §8）；
- 渲染服务只监听 127.0.0.1:3000，由 nginx 转发，**不要直接暴露公网**；
- pm2 已设 `max_memory_restart 800M`；详情页多/服务器内存小可调低 `MAX_CONCURRENCY`；
- 端口若与业务冲突，改 `PORT` 环境变量时同步改 nginx `proxy_pass`。

## 6. 失效机制与定时预生成

| 场景 | 操作 |
| --- | --- |
| 新发文章 | cron 每天凌晨 0 点 `node prewarm.js` 增量补齐（只生成缺失的） |
| 文章编辑 | `curl -X DELETE "http://127.0.0.1:3000/generate?path=/marketManagement/news/<id>"` 删单个文件后自动重建；或 `node prewarm.js --force` 全量 |
| 文章删除 | 同上 DELETE（残留文件不影响线上，但建议清理） |
| 前端发版（壳变化） | `curl -X POST http://127.0.0.1:3000/generate/purge` 清空 → `node prewarm.js --force` 全量重建 |

crontab（每天凌晨 0 点，服务器执行 `crontab -e`）：
执行步骤：
* 打开服务器终端，执行 `crontab -e` 进入 crontab 编辑模式。
* `Shift + i`进入编辑模式，输入以下内容：
```
0 0 * * * cd /mnt/nginx/saasTestNew/dynamic-render-service && node prewarm.js >> /root/.pm2/logs/prewarm.log 2>&1
```
上面内容可能会不生效，因为`crontab`环境里找不到`node`命令。
所以保险起见，建议加上`node`的路径：
```
which node
```
比如输出的路径为：`/root/.nvm/versions/node/v14.21.3/bin/node` 将输出的路径替换到`crontab` 里：
```
0 0 * * * cd /mnt/nginx/saasTestNew/dynamic-render-service && /root/.nvm/versions/node/v14.21.3/bin/node prewarm.js >> /root/.pm2/logs/prewarm.log 2>&1
```
* 编辑完成，`esc`进入退出编辑模式，`:wq`保存退出。
* 验证 crontab 是否生效：`crontab -l` 查看所有定时任务。

> 说明：编辑场景下增量 prewarm 会因文件已存在而跳过，所以文章内容变更后要 DELETE 该 id 或跑一次 `--force`，
> 否则旧 meta/正文会一直命中静态文件。也可由后端在文章状态变更时回调 DELETE 接口（本项目未做，靠 cron 兜底）。

## 7. 验证清单

**服务层**
- `curl http://127.0.0.1:3000/health` → `{"ok":true,"active":0,"max":5,...}`；
- `pm2 status` → dynamic-render online；`pm2 logs dynamic-render --lines 30 --nostream` 查错误。

**生成层（手动触发单个）**
- `curl -s -m 60 "http://127.0.0.1:3000/generate?path=/marketManagement/news/<真实id>" | head -c 500`；
- 检查落盘 meta：`grep -o "<title>[^<]*</title>" /mnt/nginx/saasTestNew/market-seo/news/<真实id>/index.html`
  → 应为文章标题；
- 检查落盘正文：`grep -c "文章正文关键词" /mnt/nginx/saasTestNew/market-seo/news/<真实id>/index.html` > 0
  （全量渲染成功时才有正文）。

**端到端（经 nginx，9045）**
- 无 UA：`curl -s "http://<IP>:9045/marketManagement/news/<真实id>" | grep -o "<title>[^<]*</title>"`；
- 爬虫 UA：`curl -s -A Baiduspider "http://<IP>:9045/marketManagement/news/<真实id>" | grep -o "<title>[^<]*</title>"`；
- 浏览器：F12 Elements 与 Ctrl+U 的 title/keywords/description 一致且为文章数据；页面交互与发版前一致；
- 二次访问：响应时间回到毫秒级（命中静态文件，不再有 6~17s 渲染耗时）；
- 新 id 动态性：发布新文章（或手动 DELETE 后）首次访问自动生成，无需重新构建前端。

**回归检查**
- `/marketManagement` 首页、列表页、其余页面正常（正则 location 只命中详情）；
- purge + `--force` 重建后文件 meta 正确（旧错误文件已被清掉）。

## 8. 常见问题与排障（线上踩过的坑汇总）

1. **Chrome 启动失败/缺系统库**
   日志：`error while loading shared libraries: libatk-bridge-2.0.so.0: cannot open shared object file`。
   服务器执行：
   `yum install -y nss atk at-spi2-atk cups-libs libXcomposite libXdamage libXrandr libXfixes libXext libXrender libX11 libxkbcommon alsa-lib mesa-libgbm`
   或设置 `CHROME_PATH` 指向系统 Chrome。

2. **端口被占用 EADDRINUSE**
   现象：`Error: bind EADDRINUSE null:3000`，但 `/health` 能通（是旧进程在应答）。
   处理：`ss -lntp | grep :3000` 拿 PID → `pm2 stop dynamic-render && pm2 delete dynamic-render` →
   `kill -9 <PID>` → 确认释放 → `pm2 start ecosystem.config.js && pm2 save`。

3. **详情接口 401：必须用路径参数**
   实测：`/api/load-points-cms/cmsArticle/details/<id>` → 200；
   `/api/load-points-cms/cmsArticle/details?id=<id>` → 401。
   server.js 的 `fetchDetail` 已是路径参数形式，不要改回 query 形式。

4. **“渲染→未命中→再渲染”递归死循环**
   现象：生成日志反复 `Navigation timeout` / `meta 未就绪`，页面一直打不开。
   根因：渲染器打开的页面又被 nginx 转进 `@generate`。
   修复（已内置）：渲染器请求带 `X-Render-Internal: 1`，nginx 对该请求 `rewrite ^ /index.html last;`
   直接返回主应用壳。若改过壳路径，需确认 nginx 的 `location /` 能服务 `/index.html`。

5. **生成文件 meta 是默认值（日志 `meta 未就绪`）**
   现象：`[render] meta 未就绪，head={"title":"集装箱装箱计算软件..."}`，落盘 title 是站点默认值。
   根因（两个，都已修复）：
   - 等待条件缺陷：只判“非静态默认值”会提前返回（裸壳默认 title 也不在静态列表里）→ 改为“非初始值且非静态默认值”；
   - 渲染器被 rewrite 到子应用独立壳（market/index.html）时 SPA 渲染失败 → 改为 rewrite 到主应用壳 `/index.html`。
   修复后必须 `purge` 清掉旧错误文件再重建，否则旧文件一直命中。

6. **prewarm 报 0 个详情页**
   原因：列表接口路径/参数不对，或接口需要鉴权而没配 `CMS_TOKEN`。
   排查：先 curl 列表接口确认返回结构（`data.content/records/list`），再比对 `SOURCES` 的 body 参数与前端列表页是否一致。

7. **爬虫首次访问慢/504**
   渲染耗时 6~17s（等待子应用写 meta），nginx `proxy_read_timeout` 必须 ≥120s（本项目 120s），
   prewarm 单次生成超时 180s。第二次访问命中静态文件（毫秒级）。

8. **Node 版本与 puppeteer 兼容**
   puppeteer 19.11.1 是最后一代支持 Node 14.14+ 的版本（自带 Chrome 116）；Node 18+ 也可用但建议保持版本锁定。
   服务器无外网时：内网装好 Chrome 后设置 `CHROME_PATH`，并把 `npm install` 改为 `npm install --ignore-scripts`
   （跳过自动下载 Chrome）。

9. **pm2 集群模式误配**
   `instances` 必须为 1（渲染服务自带并发上限，多实例无意义且会互相抢端口/内存）。若误用 cluster 模式，
   多个 worker 绑同一端口会报 EADDRINUSE。

10. **前端发版后静态文件与壳不一致**
    发版后壳变了，旧静态文件还是旧壳。处理：`POST /generate/purge` + `node prewarm.js --force`。
    `readShell` 按 mtime 缓存自动失效，壳更新后无需重启服务。

## 9. 其他项目适配清单（复用检查表）

| 项 | 本项目值 | 其他项目改成 |
| --- | --- | --- |
| 路径前缀 | `/marketManagement` | 自己的子应用前缀（nginx 正则、prewarm 的 `/generate?path=`、server.js 的 `DETAIL_PATH_RE` 同步改） |
| 详情类型 | `news` / `cases` | 自己的详情路由段（nginx 正则 `(news|cases)`、prewarm `SOURCES`、`fetchDetail`） |
| TARGET_BASE | `http://127.0.0.1:9045` | 自己线上 nginx 端口/域名（回环地址） |
| SHELL_PATH | `/mnt/nginx/saasTestNew/saas/index.html` | 主应用壳路径（渲染器 rewrite 目标） |
| OUTPUT_ROOT | `/mnt/nginx/saasTestNew/market-seo` | 输出目录（与 nginx root 一致） |
| CMS_BASE | `http://127.0.0.1:9045` | 后端接口入口（回环地址） |
| 详情接口 | `/api/load-points-cms/cmsArticle/details/{id}` | 自己的详情接口（保持路径参数形式） |
| 列表接口 | `/api/load-points-cms/cmsArticle/pageList` | 自己的列表接口（prewarm `SOURCES`） |
| meta 字段映射 | `buildMeta` | 与前端 `setSeoMeta` 同款映射（title 后缀、keywords 来源、description 截取） |
| 静态默认 meta | `STATIC_DETAIL_*` | 自己详情页壳的静态默认 title/keywords/description |
| 标题后缀 | `-悠闲装箱` | 自己的品牌后缀 |
| 主应用壳 location | `location /`（root saas） | 确保内部 rewrite 到 `/index.html` 能命中主应用壳 |

前端侧前提（详见 §4.7，其它项目必须已有，否则全量渲染路径不成立、正文无法收录）：
- `seo.js` + 详情页 `setSeoMeta` 调用（见 §4.7.1 / §4.7.2）；
- 详情接口、列表接口在**服务器本机匿名可访问**（若需鉴权，用 `CMS_TOKEN` 环境变量）。

## 10. 与现有文档的关系

| 文档 | 说明 |
| --- | --- |
| `dynamic-render-service/README.md` | 服务自身说明（配置、接口、部署、验证），本指导的简版 |
| `dynamic-render-service/实施与排障记录.md` | 完整排障时间线（401 假象、递归、meta 未就绪等），§8 的详细版 |
| `marketManagement/浏览器源码Meta实现方案.md` | 前端 meta 实现方案（setSeoMeta、预渲染），本方案的前提 |
| `marketManagement/SEO源码Meta解决方案.md` | 早期方案对比与演进（方案一/方案二 → 本方案 B 合并版） |
| `main/nginx.conf` | 线上 nginx 配置样例（9045 server 块） |

建议：新项目先读本指导，再对照 `dynamic-render-service/` 源码直接复制改造。
