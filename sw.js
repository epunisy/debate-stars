/* 디베이트 스타즈 서비스 워커
   - 페이지(html)·소식(news.json): 인터넷 먼저, 안 되면 저장본
   - 음성·대본·그림: 한 번 받은 건 휴대폰에 저장해 두고 다음부턴 바로 재생 (오프라인에서도) */
const V = "dbs-v2";
const SHELL = ["./", "index.html", "stage.html", "stage/rig.js", "manifest.webmanifest", "icon.png", "logo.png", "logo-dark.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(V).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

async function networkFirst(req) {
  const c = await caches.open(V);
  try { const r = await fetch(req); if (r.ok) c.put(req, r.clone()); return r; }
  catch (e) { const hit = await c.match(req, { ignoreSearch: true }); if (hit) return hit; throw e; }
}
async function cacheFirst(req) {
  const c = await caches.open(V);
  const hit = await c.match(req);
  if (hit) return hit;
  const r = await fetch(req);
  if (r.ok && r.status === 200) c.put(req, r.clone());
  return r;
}

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;           // 글꼴·외부 링크는 브라우저에 맡김
  if (req.headers.has("range")) return;                  // 음성 구간 요청은 그대로 통과
  const p = url.pathname;
  if (req.mode === "navigate" || p.endsWith(".html") || p.endsWith("/news.json") || p.endsWith(".webmanifest")) {
    e.respondWith(networkFirst(req));
  } else {
    e.respondWith(cacheFirst(req));
  }
});
