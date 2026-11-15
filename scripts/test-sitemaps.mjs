import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import ts from "typescript";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const cache = new Map();
// Load actual TypeScript modules without adding a test runtime dependency.
function load(file) {
  file = path.resolve(file);
  if (cache.has(file)) return cache.get(file).exports;
  const loadedModule = { exports: {} };
  cache.set(file, loadedModule);
  const code = ts.transpileModule(fs.readFileSync(file, "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
  const requireLocal = id => id.startsWith("@/") ? load(id.slice(2) + ".ts") : require(id);
  vm.runInThisContext("(function(require,module,exports){" + code + "\n})", { filename: file })(requireLocal, loadedModule, loadedModule.exports);
  return loadedModule.exports;
}
const { paginateGroups, sitemapPages, renderUrlset, renderIndex, escapeXml } = load("lib/seo/segmented-sitemaps.ts");
assert.equal(escapeXml("<>&\"'"), "&lt;&gt;&amp;&quot;&apos;");
const inputs = Array.from({length: 20001}, (_, i) => "/item/" + String(i).padStart(5, "0"));
const pages = paginateGroups({ doctors: [...inputs].reverse(), empty: [] });
assert.deepEqual(Object.values(pages).map(p => p.length), [10000,10000,1]);
assert.deepEqual(Object.values(pages).flat(), inputs);
assert.deepEqual(paginateGroups({ doctors: inputs }), pages);
assert.throws(() => paginateGroups({a:["/about"], b:["/about"]}));
for (const invalid of ["https://evil.test", "//evil.test", "/a?b=c", "/a#b", "/a/../b", "/a b", "/a\\b"]) assert.throws(() => paginateGroups({a:[invalid]}));
assert.throws(() => renderUrlset([]));
assert.throws(() => renderUrlset(inputs));
assert.equal(paginateGroups({a:["/about","/about"]}).a.length, 1);
const all = Object.values(sitemapPages).flat();
assert.equal(new Set(all).size, all.length);
for (const excluded of ["/request", "/status", "/for-students", "/for-employees"]) assert(!all.includes(excluded));
assert(!fs.existsSync("app/sitemap.ts"));
assert(!fs.existsSync("public/sitemap.xml"));
assert(renderIndex(Object.keys(sitemapPages)).includes("<sitemapindex"));
for (const [name, paths] of Object.entries(sitemapPages)) {
  assert(renderUrlset(paths).includes("<urlset"));
  console.log(name + ": " + paths.length);
}
const child = load("app/sitemaps/[segment]/route.ts");
for (const name of ["unknown.xml", "__proto__.xml", "doctors", "doctors-1.xml", "doctors-2.xml", "doctors-02.xml"]) assert.equal(child.GET(new Request("https://www.docvy.in/sitemaps/" + name), {params:{segment:name}}).status,404);
assert.equal(child.GET(new Request("https://www.docvy.in/sitemaps/static.xml"), {params:{segment:"static.xml"}}).status,200);
console.log("Sitemap regression checks passed");
