# Hanzi Glider

Game Three.js tĩnh luyện từ giản thể HSK 3.0 cấp 1–3. Mỗi lượt có 20 câu, ba làn và ba cổng chữ; không cần backend.

## Trạng thái nội dung

- Nhãn trong game: `HSK 3.0 · 2026`.
- Dataset: `hsk3-2026-08-16`; HSK 1: 500, HSK 2: 772, HSK 3: 973; tổng 2.245 mục.
- Nguồn ghim: [đề cương thi chính thức HSK 3.0 năm 2026](https://hsk.cn-bj.ufileos.com/3.0/%E6%96%B0%E7%89%88HSK%E8%80%83%E8%AF%95%E5%A4%A7%E7%BA%B21219.pdf), SHA-256 `ec74ce0439e837bbb15154be13e747ae798903b2fd3a331629df6c3b45504941`.
- Nghĩa tiếng Việt hiện là bản nháp AI: `reviewStatus: "draft"`, `reviewedCount: 0`, `draftCount: 2245`, `releaseReady: false`.

`npm run content:verify` phải thoát mã 1 với thông báo chính xác `Content release blocked: 2245 draft entries require human review`. Đây là release gate cố ý; không sửa hoặc bỏ qua trước khi con người duyệt đủ 2.245 mục.

## Chạy và kiểm thử

Yêu cầu Node.js 22, npm và Chromium của Playwright:

```bash
npm ci
npx playwright install chromium
npm run dev
```

Các gate local:

```bash
npm test
npm run content:verify  # expected: exit 1 cho tới khi duyệt xong nội dung
npm run build
npm run test:e2e
```

`test:e2e` build production rồi phục vụ dưới `/hanzi-glider/`, nên kiểm tra luôn asset tương đối của GitHub Pages. Hai project Chromium cover desktop và Pixel 7: HSK 1–3, keyboard/pointer/touch, pause, reload + countdown 3 giây, session isolation, đủ 20 câu, review sai, resize, reduced motion, WebGL và fallback.

## Lưu trạng thái

- `sessionStorage`: lượt đang chơi; reload giữ nguyên seed, danh sách câu, vị trí, điểm và câu hiện tại, sau đó countdown 3 giây.
- `localStorage`: mastery, high score, cấp đã chọn và tùy chọn giảm chuyển động.
- Tab/browser context mới không kế thừa lượt của context cũ. Tuy nhiên trình duyệt có thể tự khôi phục `sessionStorage` khi phục hồi cả phiên; frontend tĩnh không phân biệt chắc chắn việc đóng rồi mở lại trình duyệt.
- Dữ liệu hỏng hoặc sai phiên bản bị loại bỏ. Nếu storage bị chặn, lượt hiện tại vẫn chơi được nhưng không lưu tiến trình.

## Bằng chứng hiệu năng local

Đo ngày 2026-08-17 bằng production build, Chrome for Testing 151 headless trên MacBook Pro Apple M3 Pro 18 GB, macOS 26.6.1. Hook chỉ tăng tốc thao tác trả lời; renderer, reducer và storage vẫn là đường chạy thật. Cửa sổ đo bắt đầu sau screenshot khởi động và chạy đủ 20 câu.

| Ngữ cảnh | Samples | Median frame | Worst frame | Max draw calls | Max geometries | Max textures | Frame >50 ms |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Desktop Chrome, 1280×720 | 257 | 8.5 ms | 34.8 ms | 13 | 4 | 4 | 0 |
| Pixel 7 emulation | 258 | 16.5 ms | 41.9 ms | 13 | 4 | 4 | 0 |

Đây là bằng chứng trên một máy, không phải cam kết FPS chung. Frame trên 50 ms lặp lại hoặc input/render lag kéo dài là blocker cần điều tra lại.

## Deploy thủ công lên GitHub Pages

Chuỗi thao tác operator chính xác:

```bash
npm ci
npm test
npm run test:e2e
npm run deploy
```

`npm run deploy` chạy `predeploy`: unit tests → content release gate → production build, rồi mới push `dist/` bằng `gh-pages`. Hiện deploy bị chặn đúng thiết kế vì 2.245 nghĩa tiếng Việt chưa được human review. Chỉ chạy sau khi release gate pass, repository có remote đúng và máy có quyền Git push.

Trên GitHub: **Settings → Pages → Deploy from a branch → `gh-pages` / root**, sau đó lưu cấu hình. Workflow không dùng GitHub Actions.
