// Como cada streaming identifica um título na URL. A chave serve para lembrar
// o enquadramento por filme/série. Sites sem adaptador usam só o padrão do site.
var ZM_ADAPTERS = [
  { host: /disneyplus\.com$/, title: u => u.pathname.match(/\/(?:play|video)\/([\w-]+)/)?.[1] },
  { host: /netflix\.com$/, title: u => u.pathname.match(/\/watch\/(\d+)/)?.[1] },
  { host: /primevideo\.com$|amazon\./, title: u => u.pathname.match(/\/detail\/([\w.-]+)/)?.[1] || u.searchParams.get("gti") },
  { host: /(^|\.)max\.com$|hbomax\.com$/, title: u => u.pathname.match(/\/video\/watch\/([\w-]+)/)?.[1] },
  { host: /youtube\.com$/, title: u => u.searchParams.get("v") || u.pathname.match(/\/shorts\/([\w-]+)/)?.[1] },
  { host: /crunchyroll\.com$/, title: u => u.pathname.match(/\/watch\/(\w+)/)?.[1] },
  { host: /globoplay\.globo\.com$/, title: u => u.pathname.match(/\/v\/(\d+)/)?.[1] },
  { host: /tv\.apple\.com$/, title: u => u.pathname.split("/").filter(Boolean).pop() },
  { host: /paramountplus\.com$/, title: u => u.pathname.match(/\/video\/([\w-]+)/)?.[1] },
];

function zmSite(hostname) {
  return hostname.replace(/^www\./, "");
}

function zmTitleKey(href) {
  const u = new URL(href);
  const a = ZM_ADAPTERS.find(a => a.host.test(u.hostname));
  const id = a ? a.title(u) : null;
  return id ? zmSite(u.hostname) + "|" + id : null;
}
