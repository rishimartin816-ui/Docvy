param([string]$BaseUrl = 'http://localhost:3219')
$ErrorActionPreference = 'Stop'
$canonicalOrigin = 'https://www.docvy.in'
$seen = [Collections.Generic.HashSet[string]]::new()
function Read-Xml([string]$Path, [string]$Schema) {
  $response = Invoke-WebRequest ($BaseUrl + $Path) -MaximumRedirection 0
  if ($response.StatusCode -ne 200 -or $response.Headers['Content-Type'] -notmatch 'application/xml') { throw "Invalid XML response: $Path" }
  $schemaResponse = Invoke-WebRequest "https://www.sitemaps.org/schemas/sitemap/0.9/$Schema.xsd"
  $settings = [Xml.XmlReaderSettings]::new()
  $settings.DtdProcessing = [Xml.DtdProcessing]::Prohibit
  $schemaReader = [Xml.XmlReader]::Create([IO.StringReader]::new([string]$schemaResponse.Content))
  $null = $settings.Schemas.Add('http://www.sitemaps.org/schemas/sitemap/0.9', $schemaReader)
  $settings.ValidationType = [Xml.ValidationType]::Schema
  $settings.add_ValidationEventHandler({ param($sender,$event) throw $event.Message })
  $reader = [Xml.XmlReader]::Create([IO.StringReader]::new([string]$response.Content), $settings)
  while ($reader.Read()) {}
  $reader.Dispose()
  return [xml]$response.Content
}
$robots = (Invoke-WebRequest ($BaseUrl + '/robots.txt')).Content
if ($robots -notmatch 'Sitemap: https://www.docvy.in/sitemap.xml') { throw 'Missing canonical root in robots.txt' }
if ($robots -notmatch 'Disallow: /api/') { throw 'API robots exclusion missing' }
$index = Read-Xml '/sitemap.xml' 'siteindex'
foreach ($sitemap in $index.sitemapindex.sitemap) {
  $childUri = [uri][string]$sitemap.loc
  if ($childUri.GetLeftPart([UriPartial]::Authority) -ne $canonicalOrigin) { throw 'Noncanonical child' }
  $child = Read-Xml $childUri.AbsolutePath 'sitemap'
  $entries = @($child.urlset.url)
  if ($entries.Count -lt 1 -or $entries.Count -gt 10000) { throw 'Invalid child size' }
  foreach ($entry in $entries) {
    $url = [string]$entry.loc
    $uri = [uri]$url
    if ($uri.GetLeftPart([UriPartial]::Authority) -ne $canonicalOrigin -or $uri.Query -or $uri.Fragment) { throw "Noncanonical URL: $url" }
    if (!$seen.Add($url)) { throw "Duplicate URL: $url" }
    $page = Invoke-WebRequest ($BaseUrl + $uri.AbsolutePath) -MaximumRedirection 0
    if ($page.StatusCode -ne 200) { throw "Invalid page status: $url" }
    if ($page.Headers['X-Robots-Tag'] -match 'noindex|none') { throw "Blocked response: $url" }
    if ($page.Content -match '<meta[^>]+name="(?:robots|googlebot)"[^>]+content="[^"]*(?:noindex|none)') { throw "Noindex page: $url" }
    $match = [regex]::Match($page.Content, '<link[^>]+rel="canonical"[^>]+href="([^"]+)"')
    if (!$match.Success -or $match.Groups[1].Value.TrimEnd('/') -ne $url.TrimEnd('/')) { throw "Canonical mismatch: $url" }
  }
  Write-Output "$($childUri.AbsolutePath): $($entries.Count) URLs validated with XSD, HTTP, canonical and indexability checks"
}
foreach ($path in @('/sitemaps/unknown.xml','/sitemaps/doctors-1.xml','/sitemaps/doctors-2.xml','/sitemaps/__proto__.xml','/sitemaps/doctors')) {
  $response = Invoke-WebRequest ($BaseUrl + $path) -SkipHttpErrorCheck
  if ($response.StatusCode -ne 404) { throw "Expected 404: $path" }
}
Write-Output "PASS: $($seen.Count) unique canonical URLs; robots and unknown child checks passed"
