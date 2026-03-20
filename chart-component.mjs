var pn = Object.defineProperty;
var mn = (i, t, e) => t in i ? pn(i, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : i[t] = e;
var S = (i, t, e) => mn(i, typeof t != "symbol" ? t + "" : t, e);
/*!
 * @kurkle/color v0.3.4
 * https://github.com/kurkle/color#readme
 * (c) 2024 Jukka Kurkela
 * Released under the MIT License
 */
function Zt(i) {
  return i + 0.5 | 0;
}
const rt = (i, t, e) => Math.max(Math.min(i, e), t);
function Bt(i) {
  return rt(Zt(i * 2.55), 0, 255);
}
function ct(i) {
  return rt(Zt(i * 255), 0, 255);
}
function nt(i) {
  return rt(Zt(i / 2.55) / 100, 0, 1);
}
function pi(i) {
  return rt(Zt(i * 100), 0, 100);
}
const $ = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, a: 10, b: 11, c: 12, d: 13, e: 14, f: 15 }, Ye = [..."0123456789ABCDEF"], bn = (i) => Ye[i & 15], _n = (i) => Ye[(i & 240) >> 4] + Ye[i & 15], ie = (i) => (i & 240) >> 4 === (i & 15), xn = (i) => ie(i.r) && ie(i.g) && ie(i.b) && ie(i.a);
function yn(i) {
  var t = i.length, e;
  return i[0] === "#" && (t === 4 || t === 5 ? e = {
    r: 255 & $[i[1]] * 17,
    g: 255 & $[i[2]] * 17,
    b: 255 & $[i[3]] * 17,
    a: t === 5 ? $[i[4]] * 17 : 255
  } : (t === 7 || t === 9) && (e = {
    r: $[i[1]] << 4 | $[i[2]],
    g: $[i[3]] << 4 | $[i[4]],
    b: $[i[5]] << 4 | $[i[6]],
    a: t === 9 ? $[i[7]] << 4 | $[i[8]] : 255
  })), e;
}
const vn = (i, t) => i < 255 ? t(i) : "";
function wn(i) {
  var t = xn(i) ? bn : _n;
  return i ? "#" + t(i.r) + t(i.g) + t(i.b) + vn(i.a, t) : void 0;
}
const kn = /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
function Ts(i, t, e) {
  const s = t * Math.min(e, 1 - e), n = (o, r = (o + i / 30) % 12) => e - s * Math.max(Math.min(r - 3, 9 - r, 1), -1);
  return [n(0), n(8), n(4)];
}
function Mn(i, t, e) {
  const s = (n, o = (n + i / 60) % 6) => e - e * t * Math.max(Math.min(o, 4 - o, 1), 0);
  return [s(5), s(3), s(1)];
}
function Sn(i, t, e) {
  const s = Ts(i, 1, 0.5);
  let n;
  for (t + e > 1 && (n = 1 / (t + e), t *= n, e *= n), n = 0; n < 3; n++)
    s[n] *= 1 - t - e, s[n] += t;
  return s;
}
function Dn(i, t, e, s, n) {
  return i === n ? (t - e) / s + (t < e ? 6 : 0) : t === n ? (e - i) / s + 2 : (i - t) / s + 4;
}
function ei(i) {
  const e = i.r / 255, s = i.g / 255, n = i.b / 255, o = Math.max(e, s, n), r = Math.min(e, s, n), a = (o + r) / 2;
  let l, c, h;
  return o !== r && (h = o - r, c = a > 0.5 ? h / (2 - o - r) : h / (o + r), l = Dn(e, s, n, h, o), l = l * 60 + 0.5), [l | 0, c || 0, a];
}
function ii(i, t, e, s) {
  return (Array.isArray(t) ? i(t[0], t[1], t[2]) : i(t, e, s)).map(ct);
}
function si(i, t, e) {
  return ii(Ts, i, t, e);
}
function Pn(i, t, e) {
  return ii(Sn, i, t, e);
}
function On(i, t, e) {
  return ii(Mn, i, t, e);
}
function As(i) {
  return (i % 360 + 360) % 360;
}
function Cn(i) {
  const t = kn.exec(i);
  let e = 255, s;
  if (!t)
    return;
  t[5] !== s && (e = t[6] ? Bt(+t[5]) : ct(+t[5]));
  const n = As(+t[2]), o = +t[3] / 100, r = +t[4] / 100;
  return t[1] === "hwb" ? s = Pn(n, o, r) : t[1] === "hsv" ? s = On(n, o, r) : s = si(n, o, r), {
    r: s[0],
    g: s[1],
    b: s[2],
    a: e
  };
}
function Tn(i, t) {
  var e = ei(i);
  e[0] = As(e[0] + t), e = si(e), i.r = e[0], i.g = e[1], i.b = e[2];
}
function An(i) {
  if (!i)
    return;
  const t = ei(i), e = t[0], s = pi(t[1]), n = pi(t[2]);
  return i.a < 255 ? `hsla(${e}, ${s}%, ${n}%, ${nt(i.a)})` : `hsl(${e}, ${s}%, ${n}%)`;
}
const mi = {
  x: "dark",
  Z: "light",
  Y: "re",
  X: "blu",
  W: "gr",
  V: "medium",
  U: "slate",
  A: "ee",
  T: "ol",
  S: "or",
  B: "ra",
  C: "lateg",
  D: "ights",
  R: "in",
  Q: "turquois",
  E: "hi",
  P: "ro",
  O: "al",
  N: "le",
  M: "de",
  L: "yello",
  F: "en",
  K: "ch",
  G: "arks",
  H: "ea",
  I: "ightg",
  J: "wh"
}, bi = {
  OiceXe: "f0f8ff",
  antiquewEte: "faebd7",
  aqua: "ffff",
  aquamarRe: "7fffd4",
  azuY: "f0ffff",
  beige: "f5f5dc",
  bisque: "ffe4c4",
  black: "0",
  blanKedOmond: "ffebcd",
  Xe: "ff",
  XeviTet: "8a2be2",
  bPwn: "a52a2a",
  burlywood: "deb887",
  caMtXe: "5f9ea0",
  KartYuse: "7fff00",
  KocTate: "d2691e",
  cSO: "ff7f50",
  cSnflowerXe: "6495ed",
  cSnsilk: "fff8dc",
  crimson: "dc143c",
  cyan: "ffff",
  xXe: "8b",
  xcyan: "8b8b",
  xgTMnPd: "b8860b",
  xWay: "a9a9a9",
  xgYF: "6400",
  xgYy: "a9a9a9",
  xkhaki: "bdb76b",
  xmagFta: "8b008b",
  xTivegYF: "556b2f",
  xSange: "ff8c00",
  xScEd: "9932cc",
  xYd: "8b0000",
  xsOmon: "e9967a",
  xsHgYF: "8fbc8f",
  xUXe: "483d8b",
  xUWay: "2f4f4f",
  xUgYy: "2f4f4f",
  xQe: "ced1",
  xviTet: "9400d3",
  dAppRk: "ff1493",
  dApskyXe: "bfff",
  dimWay: "696969",
  dimgYy: "696969",
  dodgerXe: "1e90ff",
  fiYbrick: "b22222",
  flSOwEte: "fffaf0",
  foYstWAn: "228b22",
  fuKsia: "ff00ff",
  gaRsbSo: "dcdcdc",
  ghostwEte: "f8f8ff",
  gTd: "ffd700",
  gTMnPd: "daa520",
  Way: "808080",
  gYF: "8000",
  gYFLw: "adff2f",
  gYy: "808080",
  honeyMw: "f0fff0",
  hotpRk: "ff69b4",
  RdianYd: "cd5c5c",
  Rdigo: "4b0082",
  ivSy: "fffff0",
  khaki: "f0e68c",
  lavFMr: "e6e6fa",
  lavFMrXsh: "fff0f5",
  lawngYF: "7cfc00",
  NmoncEffon: "fffacd",
  ZXe: "add8e6",
  ZcSO: "f08080",
  Zcyan: "e0ffff",
  ZgTMnPdLw: "fafad2",
  ZWay: "d3d3d3",
  ZgYF: "90ee90",
  ZgYy: "d3d3d3",
  ZpRk: "ffb6c1",
  ZsOmon: "ffa07a",
  ZsHgYF: "20b2aa",
  ZskyXe: "87cefa",
  ZUWay: "778899",
  ZUgYy: "778899",
  ZstAlXe: "b0c4de",
  ZLw: "ffffe0",
  lime: "ff00",
  limegYF: "32cd32",
  lRF: "faf0e6",
  magFta: "ff00ff",
  maPon: "800000",
  VaquamarRe: "66cdaa",
  VXe: "cd",
  VScEd: "ba55d3",
  VpurpN: "9370db",
  VsHgYF: "3cb371",
  VUXe: "7b68ee",
  VsprRggYF: "fa9a",
  VQe: "48d1cc",
  VviTetYd: "c71585",
  midnightXe: "191970",
  mRtcYam: "f5fffa",
  mistyPse: "ffe4e1",
  moccasR: "ffe4b5",
  navajowEte: "ffdead",
  navy: "80",
  Tdlace: "fdf5e6",
  Tive: "808000",
  TivedBb: "6b8e23",
  Sange: "ffa500",
  SangeYd: "ff4500",
  ScEd: "da70d6",
  pOegTMnPd: "eee8aa",
  pOegYF: "98fb98",
  pOeQe: "afeeee",
  pOeviTetYd: "db7093",
  papayawEp: "ffefd5",
  pHKpuff: "ffdab9",
  peru: "cd853f",
  pRk: "ffc0cb",
  plum: "dda0dd",
  powMrXe: "b0e0e6",
  purpN: "800080",
  YbeccapurpN: "663399",
  Yd: "ff0000",
  Psybrown: "bc8f8f",
  PyOXe: "4169e1",
  saddNbPwn: "8b4513",
  sOmon: "fa8072",
  sandybPwn: "f4a460",
  sHgYF: "2e8b57",
  sHshell: "fff5ee",
  siFna: "a0522d",
  silver: "c0c0c0",
  skyXe: "87ceeb",
  UXe: "6a5acd",
  UWay: "708090",
  UgYy: "708090",
  snow: "fffafa",
  sprRggYF: "ff7f",
  stAlXe: "4682b4",
  tan: "d2b48c",
  teO: "8080",
  tEstN: "d8bfd8",
  tomato: "ff6347",
  Qe: "40e0d0",
  viTet: "ee82ee",
  JHt: "f5deb3",
  wEte: "ffffff",
  wEtesmoke: "f5f5f5",
  Lw: "ffff00",
  LwgYF: "9acd32"
};
function In() {
  const i = {}, t = Object.keys(bi), e = Object.keys(mi);
  let s, n, o, r, a;
  for (s = 0; s < t.length; s++) {
    for (r = a = t[s], n = 0; n < e.length; n++)
      o = e[n], a = a.replace(o, mi[o]);
    o = parseInt(bi[r], 16), i[a] = [o >> 16 & 255, o >> 8 & 255, o & 255];
  }
  return i;
}
let se;
function Ln(i) {
  se || (se = In(), se.transparent = [0, 0, 0, 0]);
  const t = se[i.toLowerCase()];
  return t && {
    r: t[0],
    g: t[1],
    b: t[2],
    a: t.length === 4 ? t[3] : 255
  };
}
const Fn = /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;
function En(i) {
  const t = Fn.exec(i);
  let e = 255, s, n, o;
  if (t) {
    if (t[7] !== s) {
      const r = +t[7];
      e = t[8] ? Bt(r) : rt(r * 255, 0, 255);
    }
    return s = +t[1], n = +t[3], o = +t[5], s = 255 & (t[2] ? Bt(s) : rt(s, 0, 255)), n = 255 & (t[4] ? Bt(n) : rt(n, 0, 255)), o = 255 & (t[6] ? Bt(o) : rt(o, 0, 255)), {
      r: s,
      g: n,
      b: o,
      a: e
    };
  }
}
function Rn(i) {
  return i && (i.a < 255 ? `rgba(${i.r}, ${i.g}, ${i.b}, ${nt(i.a)})` : `rgb(${i.r}, ${i.g}, ${i.b})`);
}
const Le = (i) => i <= 31308e-7 ? i * 12.92 : Math.pow(i, 1 / 2.4) * 1.055 - 0.055, Pt = (i) => i <= 0.04045 ? i / 12.92 : Math.pow((i + 0.055) / 1.055, 2.4);
function zn(i, t, e) {
  const s = Pt(nt(i.r)), n = Pt(nt(i.g)), o = Pt(nt(i.b));
  return {
    r: ct(Le(s + e * (Pt(nt(t.r)) - s))),
    g: ct(Le(n + e * (Pt(nt(t.g)) - n))),
    b: ct(Le(o + e * (Pt(nt(t.b)) - o))),
    a: i.a + e * (t.a - i.a)
  };
}
function ne(i, t, e) {
  if (i) {
    let s = ei(i);
    s[t] = Math.max(0, Math.min(s[t] + s[t] * e, t === 0 ? 360 : 1)), s = si(s), i.r = s[0], i.g = s[1], i.b = s[2];
  }
}
function Is(i, t) {
  return i && Object.assign(t || {}, i);
}
function _i(i) {
  var t = { r: 0, g: 0, b: 0, a: 255 };
  return Array.isArray(i) ? i.length >= 3 && (t = { r: i[0], g: i[1], b: i[2], a: 255 }, i.length > 3 && (t.a = ct(i[3]))) : (t = Is(i, { r: 0, g: 0, b: 0, a: 1 }), t.a = ct(t.a)), t;
}
function Bn(i) {
  return i.charAt(0) === "r" ? En(i) : Cn(i);
}
class Ut {
  constructor(t) {
    if (t instanceof Ut)
      return t;
    const e = typeof t;
    let s;
    e === "object" ? s = _i(t) : e === "string" && (s = yn(t) || Ln(t) || Bn(t)), this._rgb = s, this._valid = !!s;
  }
  get valid() {
    return this._valid;
  }
  get rgb() {
    var t = Is(this._rgb);
    return t && (t.a = nt(t.a)), t;
  }
  set rgb(t) {
    this._rgb = _i(t);
  }
  rgbString() {
    return this._valid ? Rn(this._rgb) : void 0;
  }
  hexString() {
    return this._valid ? wn(this._rgb) : void 0;
  }
  hslString() {
    return this._valid ? An(this._rgb) : void 0;
  }
  mix(t, e) {
    if (t) {
      const s = this.rgb, n = t.rgb;
      let o;
      const r = e === o ? 0.5 : e, a = 2 * r - 1, l = s.a - n.a, c = ((a * l === -1 ? a : (a + l) / (1 + a * l)) + 1) / 2;
      o = 1 - c, s.r = 255 & c * s.r + o * n.r + 0.5, s.g = 255 & c * s.g + o * n.g + 0.5, s.b = 255 & c * s.b + o * n.b + 0.5, s.a = r * s.a + (1 - r) * n.a, this.rgb = s;
    }
    return this;
  }
  interpolate(t, e) {
    return t && (this._rgb = zn(this._rgb, t._rgb, e)), this;
  }
  clone() {
    return new Ut(this.rgb);
  }
  alpha(t) {
    return this._rgb.a = ct(t), this;
  }
  clearer(t) {
    const e = this._rgb;
    return e.a *= 1 - t, this;
  }
  greyscale() {
    const t = this._rgb, e = Zt(t.r * 0.3 + t.g * 0.59 + t.b * 0.11);
    return t.r = t.g = t.b = e, this;
  }
  opaquer(t) {
    const e = this._rgb;
    return e.a *= 1 + t, this;
  }
  negate() {
    const t = this._rgb;
    return t.r = 255 - t.r, t.g = 255 - t.g, t.b = 255 - t.b, this;
  }
  lighten(t) {
    return ne(this._rgb, 2, t), this;
  }
  darken(t) {
    return ne(this._rgb, 2, -t), this;
  }
  saturate(t) {
    return ne(this._rgb, 1, t), this;
  }
  desaturate(t) {
    return ne(this._rgb, 1, -t), this;
  }
  rotate(t) {
    return Tn(this._rgb, t), this;
  }
}
/*!
 * Chart.js v4.5.1
 * https://www.chartjs.org
 * (c) 2025 Chart.js Contributors
 * Released under the MIT License
 */
function et() {
}
const Nn = /* @__PURE__ */ (() => {
  let i = 0;
  return () => i++;
})();
function T(i) {
  return i == null;
}
function z(i) {
  if (Array.isArray && Array.isArray(i))
    return !0;
  const t = Object.prototype.toString.call(i);
  return t.slice(0, 7) === "[object" && t.slice(-6) === "Array]";
}
function P(i) {
  return i !== null && Object.prototype.toString.call(i) === "[object Object]";
}
function H(i) {
  return (typeof i == "number" || i instanceof Number) && isFinite(+i);
}
function K(i, t) {
  return H(i) ? i : t;
}
function C(i, t) {
  return typeof i > "u" ? t : i;
}
const Hn = (i, t) => typeof i == "string" && i.endsWith("%") ? parseFloat(i) / 100 * t : +i;
function F(i, t, e) {
  if (i && typeof i.call == "function")
    return i.apply(e, t);
}
function O(i, t, e, s) {
  let n, o, r;
  if (z(i))
    for (o = i.length, n = 0; n < o; n++)
      t.call(e, i[n], n);
  else if (P(i))
    for (r = Object.keys(i), o = r.length, n = 0; n < o; n++)
      t.call(e, i[r[n]], r[n]);
}
function ve(i, t) {
  let e, s, n, o;
  if (!i || !t || i.length !== t.length)
    return !1;
  for (e = 0, s = i.length; e < s; ++e)
    if (n = i[e], o = t[e], n.datasetIndex !== o.datasetIndex || n.index !== o.index)
      return !1;
  return !0;
}
function we(i) {
  if (z(i))
    return i.map(we);
  if (P(i)) {
    const t = /* @__PURE__ */ Object.create(null), e = Object.keys(i), s = e.length;
    let n = 0;
    for (; n < s; ++n)
      t[e[n]] = we(i[e[n]]);
    return t;
  }
  return i;
}
function Ls(i) {
  return [
    "__proto__",
    "prototype",
    "constructor"
  ].indexOf(i) === -1;
}
function Vn(i, t, e, s) {
  if (!Ls(i))
    return;
  const n = t[i], o = e[i];
  P(n) && P(o) ? Xt(n, o, s) : t[i] = we(o);
}
function Xt(i, t, e) {
  const s = z(t) ? t : [
    t
  ], n = s.length;
  if (!P(i))
    return i;
  e = e || {};
  const o = e.merger || Vn;
  let r;
  for (let a = 0; a < n; ++a) {
    if (r = s[a], !P(r))
      continue;
    const l = Object.keys(r);
    for (let c = 0, h = l.length; c < h; ++c)
      o(l[c], i, r, e);
  }
  return i;
}
function Vt(i, t) {
  return Xt(i, t, {
    merger: Wn
  });
}
function Wn(i, t, e) {
  if (!Ls(i))
    return;
  const s = t[i], n = e[i];
  P(s) && P(n) ? Vt(s, n) : Object.prototype.hasOwnProperty.call(t, i) || (t[i] = we(n));
}
const xi = {
  // Chart.helpers.core resolveObjectKey should resolve empty key to root object
  "": (i) => i,
  // default resolvers
  x: (i) => i.x,
  y: (i) => i.y
};
function jn(i) {
  const t = i.split("."), e = [];
  let s = "";
  for (const n of t)
    s += n, s.endsWith("\\") ? s = s.slice(0, -1) + "." : (e.push(s), s = "");
  return e;
}
function $n(i) {
  const t = jn(i);
  return (e) => {
    for (const s of t) {
      if (s === "")
        break;
      e = e && e[s];
    }
    return e;
  };
}
function ke(i, t) {
  return (xi[t] || (xi[t] = $n(t)))(i);
}
function ni(i) {
  return i.charAt(0).toUpperCase() + i.slice(1);
}
const Me = (i) => typeof i < "u", ht = (i) => typeof i == "function", yi = (i, t) => {
  if (i.size !== t.size)
    return !1;
  for (const e of i)
    if (!t.has(e))
      return !1;
  return !0;
};
function Yn(i) {
  return i.type === "mouseup" || i.type === "click" || i.type === "contextmenu";
}
const N = Math.PI, tt = 2 * N, Un = tt + N, Se = Number.POSITIVE_INFINITY, Xn = N / 180, Y = N / 2, gt = N / 4, vi = N * 2 / 3, Fs = Math.log10, Ot = Math.sign;
function Wt(i, t, e) {
  return Math.abs(i - t) < e;
}
function wi(i) {
  const t = Math.round(i);
  i = Wt(i, t, i / 1e3) ? t : i;
  const e = Math.pow(10, Math.floor(Fs(i))), s = i / e;
  return (s <= 1 ? 1 : s <= 2 ? 2 : s <= 5 ? 5 : 10) * e;
}
function Kn(i) {
  const t = [], e = Math.sqrt(i);
  let s;
  for (s = 1; s < e; s++)
    i % s === 0 && (t.push(s), t.push(i / s));
  return e === (e | 0) && t.push(e), t.sort((n, o) => n - o).pop(), t;
}
function qn(i) {
  return typeof i == "symbol" || typeof i == "object" && i !== null && !(Symbol.toPrimitive in i || "toString" in i || "valueOf" in i);
}
function Kt(i) {
  return !qn(i) && !isNaN(parseFloat(i)) && isFinite(i);
}
function Gn(i, t) {
  const e = Math.round(i);
  return e - t <= i && e + t >= i;
}
function Zn(i, t, e) {
  let s, n, o;
  for (s = 0, n = i.length; s < n; s++)
    o = i[s][e], isNaN(o) || (t.min = Math.min(t.min, o), t.max = Math.max(t.max, o));
}
function xt(i) {
  return i * (N / 180);
}
function Qn(i) {
  return i * (180 / N);
}
function ki(i) {
  if (!H(i))
    return;
  let t = 1, e = 0;
  for (; Math.round(i * t) / t !== i; )
    t *= 10, e++;
  return e;
}
function Jn(i, t) {
  const e = t.x - i.x, s = t.y - i.y, n = Math.sqrt(e * e + s * s);
  let o = Math.atan2(s, e);
  return o < -0.5 * N && (o += tt), {
    angle: o,
    distance: n
  };
}
function Ue(i, t) {
  return Math.sqrt(Math.pow(t.x - i.x, 2) + Math.pow(t.y - i.y, 2));
}
function to(i, t) {
  return (i - t + Un) % tt - N;
}
function Z(i) {
  return (i % tt + tt) % tt;
}
function Es(i, t, e, s) {
  const n = Z(i), o = Z(t), r = Z(e), a = Z(o - n), l = Z(r - n), c = Z(n - o), h = Z(n - r);
  return n === o || n === r || s && o === r || a > l && c < h;
}
function U(i, t, e) {
  return Math.max(t, Math.min(e, i));
}
function eo(i) {
  return U(i, -32768, 32767);
}
function Rs(i, t, e, s = 1e-6) {
  return i >= Math.min(t, e) - s && i <= Math.max(t, e) + s;
}
function oi(i, t, e) {
  e = e || ((r) => i[r] < t);
  let s = i.length - 1, n = 0, o;
  for (; s - n > 1; )
    o = n + s >> 1, e(o) ? n = o : s = o;
  return {
    lo: n,
    hi: s
  };
}
const yt = (i, t, e, s) => oi(i, e, s ? (n) => {
  const o = i[n][t];
  return o < e || o === e && i[n + 1][t] === e;
} : (n) => i[n][t] < e), io = (i, t, e) => oi(i, e, (s) => i[s][t] >= e);
function so(i, t, e) {
  let s = 0, n = i.length;
  for (; s < n && i[s] < t; )
    s++;
  for (; n > s && i[n - 1] > e; )
    n--;
  return s > 0 || n < i.length ? i.slice(s, n) : i;
}
const zs = [
  "push",
  "pop",
  "shift",
  "splice",
  "unshift"
];
function no(i, t) {
  if (i._chartjs) {
    i._chartjs.listeners.push(t);
    return;
  }
  Object.defineProperty(i, "_chartjs", {
    configurable: !0,
    enumerable: !1,
    value: {
      listeners: [
        t
      ]
    }
  }), zs.forEach((e) => {
    const s = "_onData" + ni(e), n = i[e];
    Object.defineProperty(i, e, {
      configurable: !0,
      enumerable: !1,
      value(...o) {
        const r = n.apply(this, o);
        return i._chartjs.listeners.forEach((a) => {
          typeof a[s] == "function" && a[s](...o);
        }), r;
      }
    });
  });
}
function Mi(i, t) {
  const e = i._chartjs;
  if (!e)
    return;
  const s = e.listeners, n = s.indexOf(t);
  n !== -1 && s.splice(n, 1), !(s.length > 0) && (zs.forEach((o) => {
    delete i[o];
  }), delete i._chartjs);
}
function oo(i) {
  const t = new Set(i);
  return t.size === i.length ? i : Array.from(t);
}
const Bs = function() {
  return typeof window > "u" ? function(i) {
    return i();
  } : window.requestAnimationFrame;
}();
function Ns(i, t) {
  let e = [], s = !1;
  return function(...n) {
    e = n, s || (s = !0, Bs.call(window, () => {
      s = !1, i.apply(t, e);
    }));
  };
}
function ro(i, t) {
  let e;
  return function(...s) {
    return t ? (clearTimeout(e), e = setTimeout(i, t, s)) : i.apply(this, s), t;
  };
}
const ao = (i) => i === "start" ? "left" : i === "end" ? "right" : "center", Si = (i, t, e) => i === "start" ? t : i === "end" ? e : (t + e) / 2;
function lo(i, t, e) {
  const s = t.length;
  let n = 0, o = s;
  if (i._sorted) {
    const { iScale: r, vScale: a, _parsed: l } = i, c = i.dataset && i.dataset.options ? i.dataset.options.spanGaps : null, h = r.axis, { min: f, max: d, minDefined: u, maxDefined: m } = r.getUserBounds();
    if (u) {
      if (n = Math.min(
        // @ts-expect-error Need to type _parsed
        yt(l, h, f).lo,
        // @ts-expect-error Need to fix types on _lookupByKey
        e ? s : yt(t, h, r.getPixelForValue(f)).lo
      ), c) {
        const p = l.slice(0, n + 1).reverse().findIndex((g) => !T(g[a.axis]));
        n -= Math.max(0, p);
      }
      n = U(n, 0, s - 1);
    }
    if (m) {
      let p = Math.max(
        // @ts-expect-error Need to type _parsed
        yt(l, r.axis, d, !0).hi + 1,
        // @ts-expect-error Need to fix types on _lookupByKey
        e ? 0 : yt(t, h, r.getPixelForValue(d), !0).hi + 1
      );
      if (c) {
        const g = l.slice(p - 1).findIndex((b) => !T(b[a.axis]));
        p += Math.max(0, g);
      }
      o = U(p, n, s) - n;
    } else
      o = s - n;
  }
  return {
    start: n,
    count: o
  };
}
function co(i) {
  const { xScale: t, yScale: e, _scaleRanges: s } = i, n = {
    xmin: t.min,
    xmax: t.max,
    ymin: e.min,
    ymax: e.max
  };
  if (!s)
    return i._scaleRanges = n, !0;
  const o = s.xmin !== t.min || s.xmax !== t.max || s.ymin !== e.min || s.ymax !== e.max;
  return Object.assign(s, n), o;
}
const oe = (i) => i === 0 || i === 1, Di = (i, t, e) => -(Math.pow(2, 10 * (i -= 1)) * Math.sin((i - t) * tt / e)), Pi = (i, t, e) => Math.pow(2, -10 * i) * Math.sin((i - t) * tt / e) + 1, jt = {
  linear: (i) => i,
  easeInQuad: (i) => i * i,
  easeOutQuad: (i) => -i * (i - 2),
  easeInOutQuad: (i) => (i /= 0.5) < 1 ? 0.5 * i * i : -0.5 * (--i * (i - 2) - 1),
  easeInCubic: (i) => i * i * i,
  easeOutCubic: (i) => (i -= 1) * i * i + 1,
  easeInOutCubic: (i) => (i /= 0.5) < 1 ? 0.5 * i * i * i : 0.5 * ((i -= 2) * i * i + 2),
  easeInQuart: (i) => i * i * i * i,
  easeOutQuart: (i) => -((i -= 1) * i * i * i - 1),
  easeInOutQuart: (i) => (i /= 0.5) < 1 ? 0.5 * i * i * i * i : -0.5 * ((i -= 2) * i * i * i - 2),
  easeInQuint: (i) => i * i * i * i * i,
  easeOutQuint: (i) => (i -= 1) * i * i * i * i + 1,
  easeInOutQuint: (i) => (i /= 0.5) < 1 ? 0.5 * i * i * i * i * i : 0.5 * ((i -= 2) * i * i * i * i + 2),
  easeInSine: (i) => -Math.cos(i * Y) + 1,
  easeOutSine: (i) => Math.sin(i * Y),
  easeInOutSine: (i) => -0.5 * (Math.cos(N * i) - 1),
  easeInExpo: (i) => i === 0 ? 0 : Math.pow(2, 10 * (i - 1)),
  easeOutExpo: (i) => i === 1 ? 1 : -Math.pow(2, -10 * i) + 1,
  easeInOutExpo: (i) => oe(i) ? i : i < 0.5 ? 0.5 * Math.pow(2, 10 * (i * 2 - 1)) : 0.5 * (-Math.pow(2, -10 * (i * 2 - 1)) + 2),
  easeInCirc: (i) => i >= 1 ? i : -(Math.sqrt(1 - i * i) - 1),
  easeOutCirc: (i) => Math.sqrt(1 - (i -= 1) * i),
  easeInOutCirc: (i) => (i /= 0.5) < 1 ? -0.5 * (Math.sqrt(1 - i * i) - 1) : 0.5 * (Math.sqrt(1 - (i -= 2) * i) + 1),
  easeInElastic: (i) => oe(i) ? i : Di(i, 0.075, 0.3),
  easeOutElastic: (i) => oe(i) ? i : Pi(i, 0.075, 0.3),
  easeInOutElastic(i) {
    return oe(i) ? i : i < 0.5 ? 0.5 * Di(i * 2, 0.1125, 0.45) : 0.5 + 0.5 * Pi(i * 2 - 1, 0.1125, 0.45);
  },
  easeInBack(i) {
    return i * i * ((1.70158 + 1) * i - 1.70158);
  },
  easeOutBack(i) {
    return (i -= 1) * i * ((1.70158 + 1) * i + 1.70158) + 1;
  },
  easeInOutBack(i) {
    let t = 1.70158;
    return (i /= 0.5) < 1 ? 0.5 * (i * i * (((t *= 1.525) + 1) * i - t)) : 0.5 * ((i -= 2) * i * (((t *= 1.525) + 1) * i + t) + 2);
  },
  easeInBounce: (i) => 1 - jt.easeOutBounce(1 - i),
  easeOutBounce(i) {
    return i < 1 / 2.75 ? 7.5625 * i * i : i < 2 / 2.75 ? 7.5625 * (i -= 1.5 / 2.75) * i + 0.75 : i < 2.5 / 2.75 ? 7.5625 * (i -= 2.25 / 2.75) * i + 0.9375 : 7.5625 * (i -= 2.625 / 2.75) * i + 0.984375;
  },
  easeInOutBounce: (i) => i < 0.5 ? jt.easeInBounce(i * 2) * 0.5 : jt.easeOutBounce(i * 2 - 1) * 0.5 + 0.5
};
function ri(i) {
  if (i && typeof i == "object") {
    const t = i.toString();
    return t === "[object CanvasPattern]" || t === "[object CanvasGradient]";
  }
  return !1;
}
function Oi(i) {
  return ri(i) ? i : new Ut(i);
}
function Fe(i) {
  return ri(i) ? i : new Ut(i).saturate(0.5).darken(0.1).hexString();
}
const ho = [
  "x",
  "y",
  "borderWidth",
  "radius",
  "tension"
], fo = [
  "color",
  "borderColor",
  "backgroundColor"
];
function uo(i) {
  i.set("animation", {
    delay: void 0,
    duration: 1e3,
    easing: "easeOutQuart",
    fn: void 0,
    from: void 0,
    loop: void 0,
    to: void 0,
    type: void 0
  }), i.describe("animation", {
    _fallback: !1,
    _indexable: !1,
    _scriptable: (t) => t !== "onProgress" && t !== "onComplete" && t !== "fn"
  }), i.set("animations", {
    colors: {
      type: "color",
      properties: fo
    },
    numbers: {
      type: "number",
      properties: ho
    }
  }), i.describe("animations", {
    _fallback: "animation"
  }), i.set("transitions", {
    active: {
      animation: {
        duration: 400
      }
    },
    resize: {
      animation: {
        duration: 0
      }
    },
    show: {
      animations: {
        colors: {
          from: "transparent"
        },
        visible: {
          type: "boolean",
          duration: 0
        }
      }
    },
    hide: {
      animations: {
        colors: {
          to: "transparent"
        },
        visible: {
          type: "boolean",
          easing: "linear",
          fn: (t) => t | 0
        }
      }
    }
  });
}
function go(i) {
  i.set("layout", {
    autoPadding: !0,
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }
  });
}
const Ci = /* @__PURE__ */ new Map();
function po(i, t) {
  t = t || {};
  const e = i + JSON.stringify(t);
  let s = Ci.get(e);
  return s || (s = new Intl.NumberFormat(i, t), Ci.set(e, s)), s;
}
function Hs(i, t, e) {
  return po(t, e).format(i);
}
const mo = {
  values(i) {
    return z(i) ? i : "" + i;
  },
  numeric(i, t, e) {
    if (i === 0)
      return "0";
    const s = this.chart.options.locale;
    let n, o = i;
    if (e.length > 1) {
      const c = Math.max(Math.abs(e[0].value), Math.abs(e[e.length - 1].value));
      (c < 1e-4 || c > 1e15) && (n = "scientific"), o = bo(i, e);
    }
    const r = Fs(Math.abs(o)), a = isNaN(r) ? 1 : Math.max(Math.min(-1 * Math.floor(r), 20), 0), l = {
      notation: n,
      minimumFractionDigits: a,
      maximumFractionDigits: a
    };
    return Object.assign(l, this.options.ticks.format), Hs(i, s, l);
  }
};
function bo(i, t) {
  let e = t.length > 3 ? t[2].value - t[1].value : t[1].value - t[0].value;
  return Math.abs(e) >= 1 && i !== Math.floor(i) && (e = i - Math.floor(i)), e;
}
var Vs = {
  formatters: mo
};
function _o(i) {
  i.set("scale", {
    display: !0,
    offset: !1,
    reverse: !1,
    beginAtZero: !1,
    bounds: "ticks",
    clip: !0,
    grace: 0,
    grid: {
      display: !0,
      lineWidth: 1,
      drawOnChartArea: !0,
      drawTicks: !0,
      tickLength: 8,
      tickWidth: (t, e) => e.lineWidth,
      tickColor: (t, e) => e.color,
      offset: !1
    },
    border: {
      display: !0,
      dash: [],
      dashOffset: 0,
      width: 1
    },
    title: {
      display: !1,
      text: "",
      padding: {
        top: 4,
        bottom: 4
      }
    },
    ticks: {
      minRotation: 0,
      maxRotation: 50,
      mirror: !1,
      textStrokeWidth: 0,
      textStrokeColor: "",
      padding: 3,
      display: !0,
      autoSkip: !0,
      autoSkipPadding: 3,
      labelOffset: 0,
      callback: Vs.formatters.values,
      minor: {},
      major: {},
      align: "center",
      crossAlign: "near",
      showLabelBackdrop: !1,
      backdropColor: "rgba(255, 255, 255, 0.75)",
      backdropPadding: 2
    }
  }), i.route("scale.ticks", "color", "", "color"), i.route("scale.grid", "color", "", "borderColor"), i.route("scale.border", "color", "", "borderColor"), i.route("scale.title", "color", "", "color"), i.describe("scale", {
    _fallback: !1,
    _scriptable: (t) => !t.startsWith("before") && !t.startsWith("after") && t !== "callback" && t !== "parser",
    _indexable: (t) => t !== "borderDash" && t !== "tickBorderDash" && t !== "dash"
  }), i.describe("scales", {
    _fallback: "scale"
  }), i.describe("scale.ticks", {
    _scriptable: (t) => t !== "backdropPadding" && t !== "callback",
    _indexable: (t) => t !== "backdropPadding"
  });
}
const wt = /* @__PURE__ */ Object.create(null), Xe = /* @__PURE__ */ Object.create(null);
function $t(i, t) {
  if (!t)
    return i;
  const e = t.split(".");
  for (let s = 0, n = e.length; s < n; ++s) {
    const o = e[s];
    i = i[o] || (i[o] = /* @__PURE__ */ Object.create(null));
  }
  return i;
}
function Ee(i, t, e) {
  return typeof t == "string" ? Xt($t(i, t), e) : Xt($t(i, ""), t);
}
class xo {
  constructor(t, e) {
    this.animation = void 0, this.backgroundColor = "rgba(0,0,0,0.1)", this.borderColor = "rgba(0,0,0,0.1)", this.color = "#666", this.datasets = {}, this.devicePixelRatio = (s) => s.chart.platform.getDevicePixelRatio(), this.elements = {}, this.events = [
      "mousemove",
      "mouseout",
      "click",
      "touchstart",
      "touchmove"
    ], this.font = {
      family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
      size: 12,
      style: "normal",
      lineHeight: 1.2,
      weight: null
    }, this.hover = {}, this.hoverBackgroundColor = (s, n) => Fe(n.backgroundColor), this.hoverBorderColor = (s, n) => Fe(n.borderColor), this.hoverColor = (s, n) => Fe(n.color), this.indexAxis = "x", this.interaction = {
      mode: "nearest",
      intersect: !0,
      includeInvisible: !1
    }, this.maintainAspectRatio = !0, this.onHover = null, this.onClick = null, this.parsing = !0, this.plugins = {}, this.responsive = !0, this.scale = void 0, this.scales = {}, this.showLine = !0, this.drawActiveElementsOnTop = !0, this.describe(t), this.apply(e);
  }
  set(t, e) {
    return Ee(this, t, e);
  }
  get(t) {
    return $t(this, t);
  }
  describe(t, e) {
    return Ee(Xe, t, e);
  }
  override(t, e) {
    return Ee(wt, t, e);
  }
  route(t, e, s, n) {
    const o = $t(this, t), r = $t(this, s), a = "_" + e;
    Object.defineProperties(o, {
      [a]: {
        value: o[e],
        writable: !0
      },
      [e]: {
        enumerable: !0,
        get() {
          const l = this[a], c = r[n];
          return P(l) ? Object.assign({}, c, l) : C(l, c);
        },
        set(l) {
          this[a] = l;
        }
      }
    });
  }
  apply(t) {
    t.forEach((e) => e(this));
  }
}
var E = /* @__PURE__ */ new xo({
  _scriptable: (i) => !i.startsWith("on"),
  _indexable: (i) => i !== "events",
  hover: {
    _fallback: "interaction"
  },
  interaction: {
    _scriptable: !1,
    _indexable: !1
  }
}, [
  uo,
  go,
  _o
]);
function yo(i) {
  return !i || T(i.size) || T(i.family) ? null : (i.style ? i.style + " " : "") + (i.weight ? i.weight + " " : "") + i.size + "px " + i.family;
}
function Ti(i, t, e, s, n) {
  let o = t[n];
  return o || (o = t[n] = i.measureText(n).width, e.push(n)), o > s && (s = o), s;
}
function pt(i, t, e) {
  const s = i.currentDevicePixelRatio, n = e !== 0 ? Math.max(e / 2, 0.5) : 0;
  return Math.round((t - n) * s) / s + n;
}
function Ai(i, t) {
  !t && !i || (t = t || i.getContext("2d"), t.save(), t.resetTransform(), t.clearRect(0, 0, i.width, i.height), t.restore());
}
function Ke(i, t, e, s) {
  vo(i, t, e, s);
}
function vo(i, t, e, s, n) {
  let o, r, a, l, c, h, f, d;
  const u = t.pointStyle, m = t.rotation, p = t.radius;
  let g = (m || 0) * Xn;
  if (u && typeof u == "object" && (o = u.toString(), o === "[object HTMLImageElement]" || o === "[object HTMLCanvasElement]")) {
    i.save(), i.translate(e, s), i.rotate(g), i.drawImage(u, -u.width / 2, -u.height / 2, u.width, u.height), i.restore();
    return;
  }
  if (!(isNaN(p) || p <= 0)) {
    switch (i.beginPath(), u) {
      default:
        i.arc(e, s, p, 0, tt), i.closePath();
        break;
      case "triangle":
        h = p, i.moveTo(e + Math.sin(g) * h, s - Math.cos(g) * p), g += vi, i.lineTo(e + Math.sin(g) * h, s - Math.cos(g) * p), g += vi, i.lineTo(e + Math.sin(g) * h, s - Math.cos(g) * p), i.closePath();
        break;
      case "rectRounded":
        c = p * 0.516, l = p - c, r = Math.cos(g + gt) * l, f = Math.cos(g + gt) * l, a = Math.sin(g + gt) * l, d = Math.sin(g + gt) * l, i.arc(e - f, s - a, c, g - N, g - Y), i.arc(e + d, s - r, c, g - Y, g), i.arc(e + f, s + a, c, g, g + Y), i.arc(e - d, s + r, c, g + Y, g + N), i.closePath();
        break;
      case "rect":
        if (!m) {
          l = Math.SQRT1_2 * p, h = l, i.rect(e - h, s - l, 2 * h, 2 * l);
          break;
        }
        g += gt;
      case "rectRot":
        f = Math.cos(g) * p, r = Math.cos(g) * p, a = Math.sin(g) * p, d = Math.sin(g) * p, i.moveTo(e - f, s - a), i.lineTo(e + d, s - r), i.lineTo(e + f, s + a), i.lineTo(e - d, s + r), i.closePath();
        break;
      case "crossRot":
        g += gt;
      case "cross":
        f = Math.cos(g) * p, r = Math.cos(g) * p, a = Math.sin(g) * p, d = Math.sin(g) * p, i.moveTo(e - f, s - a), i.lineTo(e + f, s + a), i.moveTo(e + d, s - r), i.lineTo(e - d, s + r);
        break;
      case "star":
        f = Math.cos(g) * p, r = Math.cos(g) * p, a = Math.sin(g) * p, d = Math.sin(g) * p, i.moveTo(e - f, s - a), i.lineTo(e + f, s + a), i.moveTo(e + d, s - r), i.lineTo(e - d, s + r), g += gt, f = Math.cos(g) * p, r = Math.cos(g) * p, a = Math.sin(g) * p, d = Math.sin(g) * p, i.moveTo(e - f, s - a), i.lineTo(e + f, s + a), i.moveTo(e + d, s - r), i.lineTo(e - d, s + r);
        break;
      case "line":
        r = Math.cos(g) * p, a = Math.sin(g) * p, i.moveTo(e - r, s - a), i.lineTo(e + r, s + a);
        break;
      case "dash":
        i.moveTo(e, s), i.lineTo(e + Math.cos(g) * p, s + Math.sin(g) * p);
        break;
      case !1:
        i.closePath();
        break;
    }
    i.fill(), t.borderWidth > 0 && i.stroke();
  }
}
function qt(i, t, e) {
  return e = e || 0.5, !t || i && i.x > t.left - e && i.x < t.right + e && i.y > t.top - e && i.y < t.bottom + e;
}
function ai(i, t) {
  i.save(), i.beginPath(), i.rect(t.left, t.top, t.right - t.left, t.bottom - t.top), i.clip();
}
function li(i) {
  i.restore();
}
function wo(i, t, e, s, n) {
  if (!t)
    return i.lineTo(e.x, e.y);
  if (n === "middle") {
    const o = (t.x + e.x) / 2;
    i.lineTo(o, t.y), i.lineTo(o, e.y);
  } else n === "after" != !!s ? i.lineTo(t.x, e.y) : i.lineTo(e.x, t.y);
  i.lineTo(e.x, e.y);
}
function ko(i, t, e, s) {
  if (!t)
    return i.lineTo(e.x, e.y);
  i.bezierCurveTo(s ? t.cp1x : t.cp2x, s ? t.cp1y : t.cp2y, s ? e.cp2x : e.cp1x, s ? e.cp2y : e.cp1y, e.x, e.y);
}
function Mo(i, t) {
  t.translation && i.translate(t.translation[0], t.translation[1]), T(t.rotation) || i.rotate(t.rotation), t.color && (i.fillStyle = t.color), t.textAlign && (i.textAlign = t.textAlign), t.textBaseline && (i.textBaseline = t.textBaseline);
}
function So(i, t, e, s, n) {
  if (n.strikethrough || n.underline) {
    const o = i.measureText(s), r = t - o.actualBoundingBoxLeft, a = t + o.actualBoundingBoxRight, l = e - o.actualBoundingBoxAscent, c = e + o.actualBoundingBoxDescent, h = n.strikethrough ? (l + c) / 2 : c;
    i.strokeStyle = i.fillStyle, i.beginPath(), i.lineWidth = n.decorationWidth || 2, i.moveTo(r, h), i.lineTo(a, h), i.stroke();
  }
}
function Do(i, t) {
  const e = i.fillStyle;
  i.fillStyle = t.color, i.fillRect(t.left, t.top, t.width, t.height), i.fillStyle = e;
}
function Ii(i, t, e, s, n, o = {}) {
  const r = z(t) ? t : [
    t
  ], a = o.strokeWidth > 0 && o.strokeColor !== "";
  let l, c;
  for (i.save(), i.font = n.string, Mo(i, o), l = 0; l < r.length; ++l)
    c = r[l], o.backdrop && Do(i, o.backdrop), a && (o.strokeColor && (i.strokeStyle = o.strokeColor), T(o.strokeWidth) || (i.lineWidth = o.strokeWidth), i.strokeText(c, e, s, o.maxWidth)), i.fillText(c, e, s, o.maxWidth), So(i, e, s, c, o), s += Number(n.lineHeight);
  i.restore();
}
function Li(i, t) {
  const { x: e, y: s, w: n, h: o, radius: r } = t;
  i.arc(e + r.topLeft, s + r.topLeft, r.topLeft, 1.5 * N, N, !0), i.lineTo(e, s + o - r.bottomLeft), i.arc(e + r.bottomLeft, s + o - r.bottomLeft, r.bottomLeft, N, Y, !0), i.lineTo(e + n - r.bottomRight, s + o), i.arc(e + n - r.bottomRight, s + o - r.bottomRight, r.bottomRight, Y, 0, !0), i.lineTo(e + n, s + r.topRight), i.arc(e + n - r.topRight, s + r.topRight, r.topRight, 0, -Y, !0), i.lineTo(e + r.topLeft, s);
}
const Po = /^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/, Oo = /^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;
function Co(i, t) {
  const e = ("" + i).match(Po);
  if (!e || e[1] === "normal")
    return t * 1.2;
  switch (i = +e[2], e[3]) {
    case "px":
      return i;
    case "%":
      i /= 100;
      break;
  }
  return t * i;
}
const To = (i) => +i || 0;
function Ws(i, t) {
  const e = {}, s = P(t), n = s ? Object.keys(t) : t, o = P(i) ? s ? (r) => C(i[r], i[t[r]]) : (r) => i[r] : () => i;
  for (const r of n)
    e[r] = To(o(r));
  return e;
}
function Ao(i) {
  return Ws(i, {
    top: "y",
    right: "x",
    bottom: "y",
    left: "x"
  });
}
function me(i) {
  return Ws(i, [
    "topLeft",
    "topRight",
    "bottomLeft",
    "bottomRight"
  ]);
}
function ft(i) {
  const t = Ao(i);
  return t.width = t.left + t.right, t.height = t.top + t.bottom, t;
}
function J(i, t) {
  i = i || {}, t = t || E.font;
  let e = C(i.size, t.size);
  typeof e == "string" && (e = parseInt(e, 10));
  let s = C(i.style, t.style);
  s && !("" + s).match(Oo) && (console.warn('Invalid font style specified: "' + s + '"'), s = void 0);
  const n = {
    family: C(i.family, t.family),
    lineHeight: Co(C(i.lineHeight, t.lineHeight), e),
    size: e,
    style: s,
    weight: C(i.weight, t.weight),
    string: ""
  };
  return n.string = yo(n), n;
}
function re(i, t, e, s) {
  let n, o, r;
  for (n = 0, o = i.length; n < o; ++n)
    if (r = i[n], r !== void 0 && r !== void 0)
      return r;
}
function Io(i, t, e) {
  const { min: s, max: n } = i, o = Hn(t, (n - s) / 2), r = (a, l) => e && a === 0 ? 0 : a + l;
  return {
    min: r(s, -Math.abs(o)),
    max: r(n, o)
  };
}
function Mt(i, t) {
  return Object.assign(Object.create(i), t);
}
function ci(i, t = [
  ""
], e, s, n = () => i[0]) {
  const o = e || i;
  typeof s > "u" && (s = Us("_fallback", i));
  const r = {
    [Symbol.toStringTag]: "Object",
    _cacheable: !0,
    _scopes: i,
    _rootScopes: o,
    _fallback: s,
    _getTarget: n,
    override: (a) => ci([
      a,
      ...i
    ], t, o, s)
  };
  return new Proxy(r, {
    /**
    * A trap for the delete operator.
    */
    deleteProperty(a, l) {
      return delete a[l], delete a._keys, delete i[0][l], !0;
    },
    /**
    * A trap for getting property values.
    */
    get(a, l) {
      return $s(a, l, () => Ho(l, t, i, a));
    },
    /**
    * A trap for Object.getOwnPropertyDescriptor.
    * Also used by Object.hasOwnProperty.
    */
    getOwnPropertyDescriptor(a, l) {
      return Reflect.getOwnPropertyDescriptor(a._scopes[0], l);
    },
    /**
    * A trap for Object.getPrototypeOf.
    */
    getPrototypeOf() {
      return Reflect.getPrototypeOf(i[0]);
    },
    /**
    * A trap for the in operator.
    */
    has(a, l) {
      return Ei(a).includes(l);
    },
    /**
    * A trap for Object.getOwnPropertyNames and Object.getOwnPropertySymbols.
    */
    ownKeys(a) {
      return Ei(a);
    },
    /**
    * A trap for setting property values.
    */
    set(a, l, c) {
      const h = a._storage || (a._storage = n());
      return a[l] = h[l] = c, delete a._keys, !0;
    }
  });
}
function Ct(i, t, e, s) {
  const n = {
    _cacheable: !1,
    _proxy: i,
    _context: t,
    _subProxy: e,
    _stack: /* @__PURE__ */ new Set(),
    _descriptors: js(i, s),
    setContext: (o) => Ct(i, o, e, s),
    override: (o) => Ct(i.override(o), t, e, s)
  };
  return new Proxy(n, {
    /**
    * A trap for the delete operator.
    */
    deleteProperty(o, r) {
      return delete o[r], delete i[r], !0;
    },
    /**
    * A trap for getting property values.
    */
    get(o, r, a) {
      return $s(o, r, () => Fo(o, r, a));
    },
    /**
    * A trap for Object.getOwnPropertyDescriptor.
    * Also used by Object.hasOwnProperty.
    */
    getOwnPropertyDescriptor(o, r) {
      return o._descriptors.allKeys ? Reflect.has(i, r) ? {
        enumerable: !0,
        configurable: !0
      } : void 0 : Reflect.getOwnPropertyDescriptor(i, r);
    },
    /**
    * A trap for Object.getPrototypeOf.
    */
    getPrototypeOf() {
      return Reflect.getPrototypeOf(i);
    },
    /**
    * A trap for the in operator.
    */
    has(o, r) {
      return Reflect.has(i, r);
    },
    /**
    * A trap for Object.getOwnPropertyNames and Object.getOwnPropertySymbols.
    */
    ownKeys() {
      return Reflect.ownKeys(i);
    },
    /**
    * A trap for setting property values.
    */
    set(o, r, a) {
      return i[r] = a, delete o[r], !0;
    }
  });
}
function js(i, t = {
  scriptable: !0,
  indexable: !0
}) {
  const { _scriptable: e = t.scriptable, _indexable: s = t.indexable, _allKeys: n = t.allKeys } = i;
  return {
    allKeys: n,
    scriptable: e,
    indexable: s,
    isScriptable: ht(e) ? e : () => e,
    isIndexable: ht(s) ? s : () => s
  };
}
const Lo = (i, t) => i ? i + ni(t) : t, hi = (i, t) => P(t) && i !== "adapters" && (Object.getPrototypeOf(t) === null || t.constructor === Object);
function $s(i, t, e) {
  if (Object.prototype.hasOwnProperty.call(i, t) || t === "constructor")
    return i[t];
  const s = e();
  return i[t] = s, s;
}
function Fo(i, t, e) {
  const { _proxy: s, _context: n, _subProxy: o, _descriptors: r } = i;
  let a = s[t];
  return ht(a) && r.isScriptable(t) && (a = Eo(t, a, i, e)), z(a) && a.length && (a = Ro(t, a, i, r.isIndexable)), hi(t, a) && (a = Ct(a, n, o && o[t], r)), a;
}
function Eo(i, t, e, s) {
  const { _proxy: n, _context: o, _subProxy: r, _stack: a } = e;
  if (a.has(i))
    throw new Error("Recursion detected: " + Array.from(a).join("->") + "->" + i);
  a.add(i);
  let l = t(o, r || s);
  return a.delete(i), hi(i, l) && (l = fi(n._scopes, n, i, l)), l;
}
function Ro(i, t, e, s) {
  const { _proxy: n, _context: o, _subProxy: r, _descriptors: a } = e;
  if (typeof o.index < "u" && s(i))
    return t[o.index % t.length];
  if (P(t[0])) {
    const l = t, c = n._scopes.filter((h) => h !== l);
    t = [];
    for (const h of l) {
      const f = fi(c, n, i, h);
      t.push(Ct(f, o, r && r[i], a));
    }
  }
  return t;
}
function Ys(i, t, e) {
  return ht(i) ? i(t, e) : i;
}
const zo = (i, t) => i === !0 ? t : typeof i == "string" ? ke(t, i) : void 0;
function Bo(i, t, e, s, n) {
  for (const o of t) {
    const r = zo(e, o);
    if (r) {
      i.add(r);
      const a = Ys(r._fallback, e, n);
      if (typeof a < "u" && a !== e && a !== s)
        return a;
    } else if (r === !1 && typeof s < "u" && e !== s)
      return null;
  }
  return !1;
}
function fi(i, t, e, s) {
  const n = t._rootScopes, o = Ys(t._fallback, e, s), r = [
    ...i,
    ...n
  ], a = /* @__PURE__ */ new Set();
  a.add(s);
  let l = Fi(a, r, e, o || e, s);
  return l === null || typeof o < "u" && o !== e && (l = Fi(a, r, o, l, s), l === null) ? !1 : ci(Array.from(a), [
    ""
  ], n, o, () => No(t, e, s));
}
function Fi(i, t, e, s, n) {
  for (; e; )
    e = Bo(i, t, e, s, n);
  return e;
}
function No(i, t, e) {
  const s = i._getTarget();
  t in s || (s[t] = {});
  const n = s[t];
  return z(n) && P(e) ? e : n || {};
}
function Ho(i, t, e, s) {
  let n;
  for (const o of t)
    if (n = Us(Lo(o, i), e), typeof n < "u")
      return hi(i, n) ? fi(e, s, i, n) : n;
}
function Us(i, t) {
  for (const e of t) {
    if (!e)
      continue;
    const s = e[i];
    if (typeof s < "u")
      return s;
  }
}
function Ei(i) {
  let t = i._keys;
  return t || (t = i._keys = Vo(i._scopes)), t;
}
function Vo(i) {
  const t = /* @__PURE__ */ new Set();
  for (const e of i)
    for (const s of Object.keys(e).filter((n) => !n.startsWith("_")))
      t.add(s);
  return Array.from(t);
}
const Wo = Number.EPSILON || 1e-14, Tt = (i, t) => t < i.length && !i[t].skip && i[t], Xs = (i) => i === "x" ? "y" : "x";
function jo(i, t, e, s) {
  const n = i.skip ? t : i, o = t, r = e.skip ? t : e, a = Ue(o, n), l = Ue(r, o);
  let c = a / (a + l), h = l / (a + l);
  c = isNaN(c) ? 0 : c, h = isNaN(h) ? 0 : h;
  const f = s * c, d = s * h;
  return {
    previous: {
      x: o.x - f * (r.x - n.x),
      y: o.y - f * (r.y - n.y)
    },
    next: {
      x: o.x + d * (r.x - n.x),
      y: o.y + d * (r.y - n.y)
    }
  };
}
function $o(i, t, e) {
  const s = i.length;
  let n, o, r, a, l, c = Tt(i, 0);
  for (let h = 0; h < s - 1; ++h)
    if (l = c, c = Tt(i, h + 1), !(!l || !c)) {
      if (Wt(t[h], 0, Wo)) {
        e[h] = e[h + 1] = 0;
        continue;
      }
      n = e[h] / t[h], o = e[h + 1] / t[h], a = Math.pow(n, 2) + Math.pow(o, 2), !(a <= 9) && (r = 3 / Math.sqrt(a), e[h] = n * r * t[h], e[h + 1] = o * r * t[h]);
    }
}
function Yo(i, t, e = "x") {
  const s = Xs(e), n = i.length;
  let o, r, a, l = Tt(i, 0);
  for (let c = 0; c < n; ++c) {
    if (r = a, a = l, l = Tt(i, c + 1), !a)
      continue;
    const h = a[e], f = a[s];
    r && (o = (h - r[e]) / 3, a[`cp1${e}`] = h - o, a[`cp1${s}`] = f - o * t[c]), l && (o = (l[e] - h) / 3, a[`cp2${e}`] = h + o, a[`cp2${s}`] = f + o * t[c]);
  }
}
function Uo(i, t = "x") {
  const e = Xs(t), s = i.length, n = Array(s).fill(0), o = Array(s);
  let r, a, l, c = Tt(i, 0);
  for (r = 0; r < s; ++r)
    if (a = l, l = c, c = Tt(i, r + 1), !!l) {
      if (c) {
        const h = c[t] - l[t];
        n[r] = h !== 0 ? (c[e] - l[e]) / h : 0;
      }
      o[r] = a ? c ? Ot(n[r - 1]) !== Ot(n[r]) ? 0 : (n[r - 1] + n[r]) / 2 : n[r - 1] : n[r];
    }
  $o(i, n, o), Yo(i, o, t);
}
function ae(i, t, e) {
  return Math.max(Math.min(i, e), t);
}
function Xo(i, t) {
  let e, s, n, o, r, a = qt(i[0], t);
  for (e = 0, s = i.length; e < s; ++e)
    r = o, o = a, a = e < s - 1 && qt(i[e + 1], t), o && (n = i[e], r && (n.cp1x = ae(n.cp1x, t.left, t.right), n.cp1y = ae(n.cp1y, t.top, t.bottom)), a && (n.cp2x = ae(n.cp2x, t.left, t.right), n.cp2y = ae(n.cp2y, t.top, t.bottom)));
}
function Ko(i, t, e, s, n) {
  let o, r, a, l;
  if (t.spanGaps && (i = i.filter((c) => !c.skip)), t.cubicInterpolationMode === "monotone")
    Uo(i, n);
  else {
    let c = s ? i[i.length - 1] : i[0];
    for (o = 0, r = i.length; o < r; ++o)
      a = i[o], l = jo(c, a, i[Math.min(o + 1, r - (s ? 0 : 1)) % r], t.tension), a.cp1x = l.previous.x, a.cp1y = l.previous.y, a.cp2x = l.next.x, a.cp2y = l.next.y, c = a;
  }
  t.capBezierPoints && Xo(i, e);
}
function di() {
  return typeof window < "u" && typeof document < "u";
}
function ui(i) {
  let t = i.parentNode;
  return t && t.toString() === "[object ShadowRoot]" && (t = t.host), t;
}
function De(i, t, e) {
  let s;
  return typeof i == "string" ? (s = parseInt(i, 10), i.indexOf("%") !== -1 && (s = s / 100 * t.parentNode[e])) : s = i, s;
}
const Ce = (i) => i.ownerDocument.defaultView.getComputedStyle(i, null);
function qo(i, t) {
  return Ce(i).getPropertyValue(t);
}
const Go = [
  "top",
  "right",
  "bottom",
  "left"
];
function vt(i, t, e) {
  const s = {};
  e = e ? "-" + e : "";
  for (let n = 0; n < 4; n++) {
    const o = Go[n];
    s[o] = parseFloat(i[t + "-" + o + e]) || 0;
  }
  return s.width = s.left + s.right, s.height = s.top + s.bottom, s;
}
const Zo = (i, t, e) => (i > 0 || t > 0) && (!e || !e.shadowRoot);
function Qo(i, t) {
  const e = i.touches, s = e && e.length ? e[0] : i, { offsetX: n, offsetY: o } = s;
  let r = !1, a, l;
  if (Zo(n, o, i.target))
    a = n, l = o;
  else {
    const c = t.getBoundingClientRect();
    a = s.clientX - c.left, l = s.clientY - c.top, r = !0;
  }
  return {
    x: a,
    y: l,
    box: r
  };
}
function bt(i, t) {
  if ("native" in i)
    return i;
  const { canvas: e, currentDevicePixelRatio: s } = t, n = Ce(e), o = n.boxSizing === "border-box", r = vt(n, "padding"), a = vt(n, "border", "width"), { x: l, y: c, box: h } = Qo(i, e), f = r.left + (h && a.left), d = r.top + (h && a.top);
  let { width: u, height: m } = t;
  return o && (u -= r.width + a.width, m -= r.height + a.height), {
    x: Math.round((l - f) / u * e.width / s),
    y: Math.round((c - d) / m * e.height / s)
  };
}
function Jo(i, t, e) {
  let s, n;
  if (t === void 0 || e === void 0) {
    const o = i && ui(i);
    if (!o)
      t = i.clientWidth, e = i.clientHeight;
    else {
      const r = o.getBoundingClientRect(), a = Ce(o), l = vt(a, "border", "width"), c = vt(a, "padding");
      t = r.width - c.width - l.width, e = r.height - c.height - l.height, s = De(a.maxWidth, o, "clientWidth"), n = De(a.maxHeight, o, "clientHeight");
    }
  }
  return {
    width: t,
    height: e,
    maxWidth: s || Se,
    maxHeight: n || Se
  };
}
const at = (i) => Math.round(i * 10) / 10;
function tr(i, t, e, s) {
  const n = Ce(i), o = vt(n, "margin"), r = De(n.maxWidth, i, "clientWidth") || Se, a = De(n.maxHeight, i, "clientHeight") || Se, l = Jo(i, t, e);
  let { width: c, height: h } = l;
  if (n.boxSizing === "content-box") {
    const d = vt(n, "border", "width"), u = vt(n, "padding");
    c -= u.width + d.width, h -= u.height + d.height;
  }
  return c = Math.max(0, c - o.width), h = Math.max(0, s ? c / s : h - o.height), c = at(Math.min(c, r, l.maxWidth)), h = at(Math.min(h, a, l.maxHeight)), c && !h && (h = at(c / 2)), (t !== void 0 || e !== void 0) && s && l.height && h > l.height && (h = l.height, c = at(Math.floor(h * s))), {
    width: c,
    height: h
  };
}
function Ri(i, t, e) {
  const s = t || 1, n = at(i.height * s), o = at(i.width * s);
  i.height = at(i.height), i.width = at(i.width);
  const r = i.canvas;
  return r.style && (e || !r.style.height && !r.style.width) && (r.style.height = `${i.height}px`, r.style.width = `${i.width}px`), i.currentDevicePixelRatio !== s || r.height !== n || r.width !== o ? (i.currentDevicePixelRatio = s, r.height = n, r.width = o, i.ctx.setTransform(s, 0, 0, s, 0, 0), !0) : !1;
}
const er = function() {
  let i = !1;
  try {
    const t = {
      get passive() {
        return i = !0, !1;
      }
    };
    di() && (window.addEventListener("test", null, t), window.removeEventListener("test", null, t));
  } catch {
  }
  return i;
}();
function zi(i, t) {
  const e = qo(i, t), s = e && e.match(/^(\d+)(\.\d+)?px$/);
  return s ? +s[1] : void 0;
}
function _t(i, t, e, s) {
  return {
    x: i.x + e * (t.x - i.x),
    y: i.y + e * (t.y - i.y)
  };
}
function ir(i, t, e, s) {
  return {
    x: i.x + e * (t.x - i.x),
    y: s === "middle" ? e < 0.5 ? i.y : t.y : s === "after" ? e < 1 ? i.y : t.y : e > 0 ? t.y : i.y
  };
}
function sr(i, t, e, s) {
  const n = {
    x: i.cp2x,
    y: i.cp2y
  }, o = {
    x: t.cp1x,
    y: t.cp1y
  }, r = _t(i, n, e), a = _t(n, o, e), l = _t(o, t, e), c = _t(r, a, e), h = _t(a, l, e);
  return _t(c, h, e);
}
const nr = function(i, t) {
  return {
    x(e) {
      return i + i + t - e;
    },
    setWidth(e) {
      t = e;
    },
    textAlign(e) {
      return e === "center" ? e : e === "right" ? "left" : "right";
    },
    xPlus(e, s) {
      return e - s;
    },
    leftForLtr(e, s) {
      return e - s;
    }
  };
}, or = function() {
  return {
    x(i) {
      return i;
    },
    setWidth(i) {
    },
    textAlign(i) {
      return i;
    },
    xPlus(i, t) {
      return i + t;
    },
    leftForLtr(i, t) {
      return i;
    }
  };
};
function Re(i, t, e) {
  return i ? nr(t, e) : or();
}
function rr(i, t) {
  let e, s;
  (t === "ltr" || t === "rtl") && (e = i.canvas.style, s = [
    e.getPropertyValue("direction"),
    e.getPropertyPriority("direction")
  ], e.setProperty("direction", t, "important"), i.prevTextDirection = s);
}
function ar(i, t) {
  t !== void 0 && (delete i.prevTextDirection, i.canvas.style.setProperty("direction", t[0], t[1]));
}
function Ks(i) {
  return i === "angle" ? {
    between: Es,
    compare: to,
    normalize: Z
  } : {
    between: Rs,
    compare: (t, e) => t - e,
    normalize: (t) => t
  };
}
function Bi({ start: i, end: t, count: e, loop: s, style: n }) {
  return {
    start: i % e,
    end: t % e,
    loop: s && (t - i + 1) % e === 0,
    style: n
  };
}
function lr(i, t, e) {
  const { property: s, start: n, end: o } = e, { between: r, normalize: a } = Ks(s), l = t.length;
  let { start: c, end: h, loop: f } = i, d, u;
  if (f) {
    for (c += l, h += l, d = 0, u = l; d < u && r(a(t[c % l][s]), n, o); ++d)
      c--, h--;
    c %= l, h %= l;
  }
  return h < c && (h += l), {
    start: c,
    end: h,
    loop: f,
    style: i.style
  };
}
function qs(i, t, e) {
  if (!e)
    return [
      i
    ];
  const { property: s, start: n, end: o } = e, r = t.length, { compare: a, between: l, normalize: c } = Ks(s), { start: h, end: f, loop: d, style: u } = lr(i, t, e), m = [];
  let p = !1, g = null, b, x, v;
  const y = () => l(n, v, b) && a(n, v) !== 0, _ = () => a(o, b) === 0 || l(o, v, b), M = () => p || y(), w = () => !p || _();
  for (let k = h, D = h; k <= f; ++k)
    x = t[k % r], !x.skip && (b = c(x[s]), b !== v && (p = l(b, n, o), g === null && M() && (g = a(b, n) === 0 ? k : D), g !== null && w() && (m.push(Bi({
      start: g,
      end: k,
      loop: d,
      count: r,
      style: u
    })), g = null), D = k, v = b));
  return g !== null && m.push(Bi({
    start: g,
    end: f,
    loop: d,
    count: r,
    style: u
  })), m;
}
function Gs(i, t) {
  const e = [], s = i.segments;
  for (let n = 0; n < s.length; n++) {
    const o = qs(s[n], i.points, t);
    o.length && e.push(...o);
  }
  return e;
}
function cr(i, t, e, s) {
  let n = 0, o = t - 1;
  if (e && !s)
    for (; n < t && !i[n].skip; )
      n++;
  for (; n < t && i[n].skip; )
    n++;
  for (n %= t, e && (o += n); o > n && i[o % t].skip; )
    o--;
  return o %= t, {
    start: n,
    end: o
  };
}
function hr(i, t, e, s) {
  const n = i.length, o = [];
  let r = t, a = i[t], l;
  for (l = t + 1; l <= e; ++l) {
    const c = i[l % n];
    c.skip || c.stop ? a.skip || (s = !1, o.push({
      start: t % n,
      end: (l - 1) % n,
      loop: s
    }), t = r = c.stop ? l : null) : (r = l, a.skip && (t = l)), a = c;
  }
  return r !== null && o.push({
    start: t % n,
    end: r % n,
    loop: s
  }), o;
}
function fr(i, t) {
  const e = i.points, s = i.options.spanGaps, n = e.length;
  if (!n)
    return [];
  const o = !!i._loop, { start: r, end: a } = cr(e, n, o, s);
  if (s === !0)
    return Ni(i, [
      {
        start: r,
        end: a,
        loop: o
      }
    ], e, t);
  const l = a < r ? a + n : a, c = !!i._fullLoop && r === 0 && a === n - 1;
  return Ni(i, hr(e, r, l, c), e, t);
}
function Ni(i, t, e, s) {
  return !s || !s.setContext || !e ? t : dr(i, t, e, s);
}
function dr(i, t, e, s) {
  const n = i._chart.getContext(), o = Hi(i.options), { _datasetIndex: r, options: { spanGaps: a } } = i, l = e.length, c = [];
  let h = o, f = t[0].start, d = f;
  function u(m, p, g, b) {
    const x = a ? -1 : 1;
    if (m !== p) {
      for (m += l; e[m % l].skip; )
        m -= x;
      for (; e[p % l].skip; )
        p += x;
      m % l !== p % l && (c.push({
        start: m % l,
        end: p % l,
        loop: g,
        style: b
      }), h = b, f = p % l);
    }
  }
  for (const m of t) {
    f = a ? f : m.start;
    let p = e[f % l], g;
    for (d = f + 1; d <= m.end; d++) {
      const b = e[d % l];
      g = Hi(s.setContext(Mt(n, {
        type: "segment",
        p0: p,
        p1: b,
        p0DataIndex: (d - 1) % l,
        p1DataIndex: d % l,
        datasetIndex: r
      }))), ur(g, h) && u(f, d - 1, m.loop, h), p = b, h = g;
    }
    f < d - 1 && u(f, d - 1, m.loop, h);
  }
  return c;
}
function Hi(i) {
  return {
    backgroundColor: i.backgroundColor,
    borderCapStyle: i.borderCapStyle,
    borderDash: i.borderDash,
    borderDashOffset: i.borderDashOffset,
    borderJoinStyle: i.borderJoinStyle,
    borderWidth: i.borderWidth,
    borderColor: i.borderColor
  };
}
function ur(i, t) {
  if (!t)
    return !1;
  const e = [], s = function(n, o) {
    return ri(o) ? (e.includes(o) || e.push(o), e.indexOf(o)) : o;
  };
  return JSON.stringify(i, s) !== JSON.stringify(t, s);
}
function le(i, t, e) {
  return i.options.clip ? i[e] : t[e];
}
function gr(i, t) {
  const { xScale: e, yScale: s } = i;
  return e && s ? {
    left: le(e, t, "left"),
    right: le(e, t, "right"),
    top: le(s, t, "top"),
    bottom: le(s, t, "bottom")
  } : t;
}
function Zs(i, t) {
  const e = t._clip;
  if (e.disabled)
    return !1;
  const s = gr(t, i.chartArea);
  return {
    left: e.left === !1 ? 0 : s.left - (e.left === !0 ? 0 : e.left),
    right: e.right === !1 ? i.width : s.right + (e.right === !0 ? 0 : e.right),
    top: e.top === !1 ? 0 : s.top - (e.top === !0 ? 0 : e.top),
    bottom: e.bottom === !1 ? i.height : s.bottom + (e.bottom === !0 ? 0 : e.bottom)
  };
}
/*!
 * Chart.js v4.5.1
 * https://www.chartjs.org
 * (c) 2025 Chart.js Contributors
 * Released under the MIT License
 */
class pr {
  constructor() {
    this._request = null, this._charts = /* @__PURE__ */ new Map(), this._running = !1, this._lastDate = void 0;
  }
  _notify(t, e, s, n) {
    const o = e.listeners[n], r = e.duration;
    o.forEach((a) => a({
      chart: t,
      initial: e.initial,
      numSteps: r,
      currentStep: Math.min(s - e.start, r)
    }));
  }
  _refresh() {
    this._request || (this._running = !0, this._request = Bs.call(window, () => {
      this._update(), this._request = null, this._running && this._refresh();
    }));
  }
  _update(t = Date.now()) {
    let e = 0;
    this._charts.forEach((s, n) => {
      if (!s.running || !s.items.length)
        return;
      const o = s.items;
      let r = o.length - 1, a = !1, l;
      for (; r >= 0; --r)
        l = o[r], l._active ? (l._total > s.duration && (s.duration = l._total), l.tick(t), a = !0) : (o[r] = o[o.length - 1], o.pop());
      a && (n.draw(), this._notify(n, s, t, "progress")), o.length || (s.running = !1, this._notify(n, s, t, "complete"), s.initial = !1), e += o.length;
    }), this._lastDate = t, e === 0 && (this._running = !1);
  }
  _getAnims(t) {
    const e = this._charts;
    let s = e.get(t);
    return s || (s = {
      running: !1,
      initial: !0,
      items: [],
      listeners: {
        complete: [],
        progress: []
      }
    }, e.set(t, s)), s;
  }
  listen(t, e, s) {
    this._getAnims(t).listeners[e].push(s);
  }
  add(t, e) {
    !e || !e.length || this._getAnims(t).items.push(...e);
  }
  has(t) {
    return this._getAnims(t).items.length > 0;
  }
  start(t) {
    const e = this._charts.get(t);
    e && (e.running = !0, e.start = Date.now(), e.duration = e.items.reduce((s, n) => Math.max(s, n._duration), 0), this._refresh());
  }
  running(t) {
    if (!this._running)
      return !1;
    const e = this._charts.get(t);
    return !(!e || !e.running || !e.items.length);
  }
  stop(t) {
    const e = this._charts.get(t);
    if (!e || !e.items.length)
      return;
    const s = e.items;
    let n = s.length - 1;
    for (; n >= 0; --n)
      s[n].cancel();
    e.items = [], this._notify(t, e, Date.now(), "complete");
  }
  remove(t) {
    return this._charts.delete(t);
  }
}
var it = /* @__PURE__ */ new pr();
const Vi = "transparent", mr = {
  boolean(i, t, e) {
    return e > 0.5 ? t : i;
  },
  color(i, t, e) {
    const s = Oi(i || Vi), n = s.valid && Oi(t || Vi);
    return n && n.valid ? n.mix(s, e).hexString() : t;
  },
  number(i, t, e) {
    return i + (t - i) * e;
  }
};
class br {
  constructor(t, e, s, n) {
    const o = e[s];
    n = re([
      t.to,
      n,
      o,
      t.from
    ]);
    const r = re([
      t.from,
      o,
      n
    ]);
    this._active = !0, this._fn = t.fn || mr[t.type || typeof r], this._easing = jt[t.easing] || jt.linear, this._start = Math.floor(Date.now() + (t.delay || 0)), this._duration = this._total = Math.floor(t.duration), this._loop = !!t.loop, this._target = e, this._prop = s, this._from = r, this._to = n, this._promises = void 0;
  }
  active() {
    return this._active;
  }
  update(t, e, s) {
    if (this._active) {
      this._notify(!1);
      const n = this._target[this._prop], o = s - this._start, r = this._duration - o;
      this._start = s, this._duration = Math.floor(Math.max(r, t.duration)), this._total += o, this._loop = !!t.loop, this._to = re([
        t.to,
        e,
        n,
        t.from
      ]), this._from = re([
        t.from,
        n,
        e
      ]);
    }
  }
  cancel() {
    this._active && (this.tick(Date.now()), this._active = !1, this._notify(!1));
  }
  tick(t) {
    const e = t - this._start, s = this._duration, n = this._prop, o = this._from, r = this._loop, a = this._to;
    let l;
    if (this._active = o !== a && (r || e < s), !this._active) {
      this._target[n] = a, this._notify(!0);
      return;
    }
    if (e < 0) {
      this._target[n] = o;
      return;
    }
    l = e / s % 2, l = r && l > 1 ? 2 - l : l, l = this._easing(Math.min(1, Math.max(0, l))), this._target[n] = this._fn(o, a, l);
  }
  wait() {
    const t = this._promises || (this._promises = []);
    return new Promise((e, s) => {
      t.push({
        res: e,
        rej: s
      });
    });
  }
  _notify(t) {
    const e = t ? "res" : "rej", s = this._promises || [];
    for (let n = 0; n < s.length; n++)
      s[n][e]();
  }
}
class Qs {
  constructor(t, e) {
    this._chart = t, this._properties = /* @__PURE__ */ new Map(), this.configure(e);
  }
  configure(t) {
    if (!P(t))
      return;
    const e = Object.keys(E.animation), s = this._properties;
    Object.getOwnPropertyNames(t).forEach((n) => {
      const o = t[n];
      if (!P(o))
        return;
      const r = {};
      for (const a of e)
        r[a] = o[a];
      (z(o.properties) && o.properties || [
        n
      ]).forEach((a) => {
        (a === n || !s.has(a)) && s.set(a, r);
      });
    });
  }
  _animateOptions(t, e) {
    const s = e.options, n = xr(t, s);
    if (!n)
      return [];
    const o = this._createAnimations(n, s);
    return s.$shared && _r(t.options.$animations, s).then(() => {
      t.options = s;
    }, () => {
    }), o;
  }
  _createAnimations(t, e) {
    const s = this._properties, n = [], o = t.$animations || (t.$animations = {}), r = Object.keys(e), a = Date.now();
    let l;
    for (l = r.length - 1; l >= 0; --l) {
      const c = r[l];
      if (c.charAt(0) === "$")
        continue;
      if (c === "options") {
        n.push(...this._animateOptions(t, e));
        continue;
      }
      const h = e[c];
      let f = o[c];
      const d = s.get(c);
      if (f)
        if (d && f.active()) {
          f.update(d, h, a);
          continue;
        } else
          f.cancel();
      if (!d || !d.duration) {
        t[c] = h;
        continue;
      }
      o[c] = f = new br(d, t, c, h), n.push(f);
    }
    return n;
  }
  update(t, e) {
    if (this._properties.size === 0) {
      Object.assign(t, e);
      return;
    }
    const s = this._createAnimations(t, e);
    if (s.length)
      return it.add(this._chart, s), !0;
  }
}
function _r(i, t) {
  const e = [], s = Object.keys(t);
  for (let n = 0; n < s.length; n++) {
    const o = i[s[n]];
    o && o.active() && e.push(o.wait());
  }
  return Promise.all(e);
}
function xr(i, t) {
  if (!t)
    return;
  let e = i.options;
  if (!e) {
    i.options = t;
    return;
  }
  return e.$shared && (i.options = e = Object.assign({}, e, {
    $shared: !1,
    $animations: {}
  })), e;
}
function Wi(i, t) {
  const e = i && i.options || {}, s = e.reverse, n = e.min === void 0 ? t : 0, o = e.max === void 0 ? t : 0;
  return {
    start: s ? o : n,
    end: s ? n : o
  };
}
function yr(i, t, e) {
  if (e === !1)
    return !1;
  const s = Wi(i, e), n = Wi(t, e);
  return {
    top: n.end,
    right: s.end,
    bottom: n.start,
    left: s.start
  };
}
function vr(i) {
  let t, e, s, n;
  return P(i) ? (t = i.top, e = i.right, s = i.bottom, n = i.left) : t = e = s = n = i, {
    top: t,
    right: e,
    bottom: s,
    left: n,
    disabled: i === !1
  };
}
function Js(i, t) {
  const e = [], s = i._getSortedDatasetMetas(t);
  let n, o;
  for (n = 0, o = s.length; n < o; ++n)
    e.push(s[n].index);
  return e;
}
function ji(i, t, e, s = {}) {
  const n = i.keys, o = s.mode === "single";
  let r, a, l, c;
  if (t === null)
    return;
  let h = !1;
  for (r = 0, a = n.length; r < a; ++r) {
    if (l = +n[r], l === e) {
      if (h = !0, s.all)
        continue;
      break;
    }
    c = i.values[l], H(c) && (o || t === 0 || Ot(t) === Ot(c)) && (t += c);
  }
  return !h && !s.all ? 0 : t;
}
function wr(i, t) {
  const { iScale: e, vScale: s } = t, n = e.axis === "x" ? "x" : "y", o = s.axis === "x" ? "x" : "y", r = Object.keys(i), a = new Array(r.length);
  let l, c, h;
  for (l = 0, c = r.length; l < c; ++l)
    h = r[l], a[l] = {
      [n]: h,
      [o]: i[h]
    };
  return a;
}
function ze(i, t) {
  const e = i && i.options.stacked;
  return e || e === void 0 && t.stack !== void 0;
}
function kr(i, t, e) {
  return `${i.id}.${t.id}.${e.stack || e.type}`;
}
function Mr(i) {
  const { min: t, max: e, minDefined: s, maxDefined: n } = i.getUserBounds();
  return {
    min: s ? t : Number.NEGATIVE_INFINITY,
    max: n ? e : Number.POSITIVE_INFINITY
  };
}
function Sr(i, t, e) {
  const s = i[t] || (i[t] = {});
  return s[e] || (s[e] = {});
}
function $i(i, t, e, s) {
  for (const n of t.getMatchingVisibleMetas(s).reverse()) {
    const o = i[n.index];
    if (e && o > 0 || !e && o < 0)
      return n.index;
  }
  return null;
}
function Yi(i, t) {
  const { chart: e, _cachedMeta: s } = i, n = e._stacks || (e._stacks = {}), { iScale: o, vScale: r, index: a } = s, l = o.axis, c = r.axis, h = kr(o, r, s), f = t.length;
  let d;
  for (let u = 0; u < f; ++u) {
    const m = t[u], { [l]: p, [c]: g } = m, b = m._stacks || (m._stacks = {});
    d = b[c] = Sr(n, h, p), d[a] = g, d._top = $i(d, r, !0, s.type), d._bottom = $i(d, r, !1, s.type);
    const x = d._visualValues || (d._visualValues = {});
    x[a] = g;
  }
}
function Be(i, t) {
  const e = i.scales;
  return Object.keys(e).filter((s) => e[s].axis === t).shift();
}
function Dr(i, t) {
  return Mt(i, {
    active: !1,
    dataset: void 0,
    datasetIndex: t,
    index: t,
    mode: "default",
    type: "dataset"
  });
}
function Pr(i, t, e) {
  return Mt(i, {
    active: !1,
    dataIndex: t,
    parsed: void 0,
    raw: void 0,
    element: e,
    index: t,
    mode: "default",
    type: "data"
  });
}
function Lt(i, t) {
  const e = i.controller.index, s = i.vScale && i.vScale.axis;
  if (s) {
    t = t || i._parsed;
    for (const n of t) {
      const o = n._stacks;
      if (!o || o[s] === void 0 || o[s][e] === void 0)
        return;
      delete o[s][e], o[s]._visualValues !== void 0 && o[s]._visualValues[e] !== void 0 && delete o[s]._visualValues[e];
    }
  }
}
const Ne = (i) => i === "reset" || i === "none", Ui = (i, t) => t ? i : Object.assign({}, i), Or = (i, t, e) => i && !t.hidden && t._stacked && {
  keys: Js(e, !0),
  values: null
};
class Yt {
  constructor(t, e) {
    this.chart = t, this._ctx = t.ctx, this.index = e, this._cachedDataOpts = {}, this._cachedMeta = this.getMeta(), this._type = this._cachedMeta.type, this.options = void 0, this._parsing = !1, this._data = void 0, this._objectData = void 0, this._sharedOptions = void 0, this._drawStart = void 0, this._drawCount = void 0, this.enableOptionSharing = !1, this.supportsDecimation = !1, this.$context = void 0, this._syncList = [], this.datasetElementType = new.target.datasetElementType, this.dataElementType = new.target.dataElementType, this.initialize();
  }
  initialize() {
    const t = this._cachedMeta;
    this.configure(), this.linkScales(), t._stacked = ze(t.vScale, t), this.addElements(), this.options.fill && !this.chart.isPluginEnabled("filler") && console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options");
  }
  updateIndex(t) {
    this.index !== t && Lt(this._cachedMeta), this.index = t;
  }
  linkScales() {
    const t = this.chart, e = this._cachedMeta, s = this.getDataset(), n = (f, d, u, m) => f === "x" ? d : f === "r" ? m : u, o = e.xAxisID = C(s.xAxisID, Be(t, "x")), r = e.yAxisID = C(s.yAxisID, Be(t, "y")), a = e.rAxisID = C(s.rAxisID, Be(t, "r")), l = e.indexAxis, c = e.iAxisID = n(l, o, r, a), h = e.vAxisID = n(l, r, o, a);
    e.xScale = this.getScaleForId(o), e.yScale = this.getScaleForId(r), e.rScale = this.getScaleForId(a), e.iScale = this.getScaleForId(c), e.vScale = this.getScaleForId(h);
  }
  getDataset() {
    return this.chart.data.datasets[this.index];
  }
  getMeta() {
    return this.chart.getDatasetMeta(this.index);
  }
  getScaleForId(t) {
    return this.chart.scales[t];
  }
  _getOtherScale(t) {
    const e = this._cachedMeta;
    return t === e.iScale ? e.vScale : e.iScale;
  }
  reset() {
    this._update("reset");
  }
  _destroy() {
    const t = this._cachedMeta;
    this._data && Mi(this._data, this), t._stacked && Lt(t);
  }
  _dataCheck() {
    const t = this.getDataset(), e = t.data || (t.data = []), s = this._data;
    if (P(e)) {
      const n = this._cachedMeta;
      this._data = wr(e, n);
    } else if (s !== e) {
      if (s) {
        Mi(s, this);
        const n = this._cachedMeta;
        Lt(n), n._parsed = [];
      }
      e && Object.isExtensible(e) && no(e, this), this._syncList = [], this._data = e;
    }
  }
  addElements() {
    const t = this._cachedMeta;
    this._dataCheck(), this.datasetElementType && (t.dataset = new this.datasetElementType());
  }
  buildOrUpdateElements(t) {
    const e = this._cachedMeta, s = this.getDataset();
    let n = !1;
    this._dataCheck();
    const o = e._stacked;
    e._stacked = ze(e.vScale, e), e.stack !== s.stack && (n = !0, Lt(e), e.stack = s.stack), this._resyncElements(t), (n || o !== e._stacked) && (Yi(this, e._parsed), e._stacked = ze(e.vScale, e));
  }
  configure() {
    const t = this.chart.config, e = t.datasetScopeKeys(this._type), s = t.getOptionScopes(this.getDataset(), e, !0);
    this.options = t.createResolver(s, this.getContext()), this._parsing = this.options.parsing, this._cachedDataOpts = {};
  }
  parse(t, e) {
    const { _cachedMeta: s, _data: n } = this, { iScale: o, _stacked: r } = s, a = o.axis;
    let l = t === 0 && e === n.length ? !0 : s._sorted, c = t > 0 && s._parsed[t - 1], h, f, d;
    if (this._parsing === !1)
      s._parsed = n, s._sorted = !0, d = n;
    else {
      z(n[t]) ? d = this.parseArrayData(s, n, t, e) : P(n[t]) ? d = this.parseObjectData(s, n, t, e) : d = this.parsePrimitiveData(s, n, t, e);
      const u = () => f[a] === null || c && f[a] < c[a];
      for (h = 0; h < e; ++h)
        s._parsed[h + t] = f = d[h], l && (u() && (l = !1), c = f);
      s._sorted = l;
    }
    r && Yi(this, d);
  }
  parsePrimitiveData(t, e, s, n) {
    const { iScale: o, vScale: r } = t, a = o.axis, l = r.axis, c = o.getLabels(), h = o === r, f = new Array(n);
    let d, u, m;
    for (d = 0, u = n; d < u; ++d)
      m = d + s, f[d] = {
        [a]: h || o.parse(c[m], m),
        [l]: r.parse(e[m], m)
      };
    return f;
  }
  parseArrayData(t, e, s, n) {
    const { xScale: o, yScale: r } = t, a = new Array(n);
    let l, c, h, f;
    for (l = 0, c = n; l < c; ++l)
      h = l + s, f = e[h], a[l] = {
        x: o.parse(f[0], h),
        y: r.parse(f[1], h)
      };
    return a;
  }
  parseObjectData(t, e, s, n) {
    const { xScale: o, yScale: r } = t, { xAxisKey: a = "x", yAxisKey: l = "y" } = this._parsing, c = new Array(n);
    let h, f, d, u;
    for (h = 0, f = n; h < f; ++h)
      d = h + s, u = e[d], c[h] = {
        x: o.parse(ke(u, a), d),
        y: r.parse(ke(u, l), d)
      };
    return c;
  }
  getParsed(t) {
    return this._cachedMeta._parsed[t];
  }
  getDataElement(t) {
    return this._cachedMeta.data[t];
  }
  applyStack(t, e, s) {
    const n = this.chart, o = this._cachedMeta, r = e[t.axis], a = {
      keys: Js(n, !0),
      values: e._stacks[t.axis]._visualValues
    };
    return ji(a, r, o.index, {
      mode: s
    });
  }
  updateRangeFromParsed(t, e, s, n) {
    const o = s[e.axis];
    let r = o === null ? NaN : o;
    const a = n && s._stacks[e.axis];
    n && a && (n.values = a, r = ji(n, o, this._cachedMeta.index)), t.min = Math.min(t.min, r), t.max = Math.max(t.max, r);
  }
  getMinMax(t, e) {
    const s = this._cachedMeta, n = s._parsed, o = s._sorted && t === s.iScale, r = n.length, a = this._getOtherScale(t), l = Or(e, s, this.chart), c = {
      min: Number.POSITIVE_INFINITY,
      max: Number.NEGATIVE_INFINITY
    }, { min: h, max: f } = Mr(a);
    let d, u;
    function m() {
      u = n[d];
      const p = u[a.axis];
      return !H(u[t.axis]) || h > p || f < p;
    }
    for (d = 0; d < r && !(!m() && (this.updateRangeFromParsed(c, t, u, l), o)); ++d)
      ;
    if (o) {
      for (d = r - 1; d >= 0; --d)
        if (!m()) {
          this.updateRangeFromParsed(c, t, u, l);
          break;
        }
    }
    return c;
  }
  getAllParsedValues(t) {
    const e = this._cachedMeta._parsed, s = [];
    let n, o, r;
    for (n = 0, o = e.length; n < o; ++n)
      r = e[n][t.axis], H(r) && s.push(r);
    return s;
  }
  getMaxOverflow() {
    return !1;
  }
  getLabelAndValue(t) {
    const e = this._cachedMeta, s = e.iScale, n = e.vScale, o = this.getParsed(t);
    return {
      label: s ? "" + s.getLabelForValue(o[s.axis]) : "",
      value: n ? "" + n.getLabelForValue(o[n.axis]) : ""
    };
  }
  _update(t) {
    const e = this._cachedMeta;
    this.update(t || "default"), e._clip = vr(C(this.options.clip, yr(e.xScale, e.yScale, this.getMaxOverflow())));
  }
  update(t) {
  }
  draw() {
    const t = this._ctx, e = this.chart, s = this._cachedMeta, n = s.data || [], o = e.chartArea, r = [], a = this._drawStart || 0, l = this._drawCount || n.length - a, c = this.options.drawActiveElementsOnTop;
    let h;
    for (s.dataset && s.dataset.draw(t, o, a, l), h = a; h < a + l; ++h) {
      const f = n[h];
      f.hidden || (f.active && c ? r.push(f) : f.draw(t, o));
    }
    for (h = 0; h < r.length; ++h)
      r[h].draw(t, o);
  }
  getStyle(t, e) {
    const s = e ? "active" : "default";
    return t === void 0 && this._cachedMeta.dataset ? this.resolveDatasetElementOptions(s) : this.resolveDataElementOptions(t || 0, s);
  }
  getContext(t, e, s) {
    const n = this.getDataset();
    let o;
    if (t >= 0 && t < this._cachedMeta.data.length) {
      const r = this._cachedMeta.data[t];
      o = r.$context || (r.$context = Pr(this.getContext(), t, r)), o.parsed = this.getParsed(t), o.raw = n.data[t], o.index = o.dataIndex = t;
    } else
      o = this.$context || (this.$context = Dr(this.chart.getContext(), this.index)), o.dataset = n, o.index = o.datasetIndex = this.index;
    return o.active = !!e, o.mode = s, o;
  }
  resolveDatasetElementOptions(t) {
    return this._resolveElementOptions(this.datasetElementType.id, t);
  }
  resolveDataElementOptions(t, e) {
    return this._resolveElementOptions(this.dataElementType.id, e, t);
  }
  _resolveElementOptions(t, e = "default", s) {
    const n = e === "active", o = this._cachedDataOpts, r = t + "-" + e, a = o[r], l = this.enableOptionSharing && Me(s);
    if (a)
      return Ui(a, l);
    const c = this.chart.config, h = c.datasetElementScopeKeys(this._type, t), f = n ? [
      `${t}Hover`,
      "hover",
      t,
      ""
    ] : [
      t,
      ""
    ], d = c.getOptionScopes(this.getDataset(), h), u = Object.keys(E.elements[t]), m = () => this.getContext(s, n, e), p = c.resolveNamedOptions(d, u, m, f);
    return p.$shared && (p.$shared = l, o[r] = Object.freeze(Ui(p, l))), p;
  }
  _resolveAnimations(t, e, s) {
    const n = this.chart, o = this._cachedDataOpts, r = `animation-${e}`, a = o[r];
    if (a)
      return a;
    let l;
    if (n.options.animation !== !1) {
      const h = this.chart.config, f = h.datasetAnimationScopeKeys(this._type, e), d = h.getOptionScopes(this.getDataset(), f);
      l = h.createResolver(d, this.getContext(t, s, e));
    }
    const c = new Qs(n, l && l.animations);
    return l && l._cacheable && (o[r] = Object.freeze(c)), c;
  }
  getSharedOptions(t) {
    if (t.$shared)
      return this._sharedOptions || (this._sharedOptions = Object.assign({}, t));
  }
  includeOptions(t, e) {
    return !e || Ne(t) || this.chart._animationsDisabled;
  }
  _getSharedOptions(t, e) {
    const s = this.resolveDataElementOptions(t, e), n = this._sharedOptions, o = this.getSharedOptions(s), r = this.includeOptions(e, o) || o !== n;
    return this.updateSharedOptions(o, e, s), {
      sharedOptions: o,
      includeOptions: r
    };
  }
  updateElement(t, e, s, n) {
    Ne(n) ? Object.assign(t, s) : this._resolveAnimations(e, n).update(t, s);
  }
  updateSharedOptions(t, e, s) {
    t && !Ne(e) && this._resolveAnimations(void 0, e).update(t, s);
  }
  _setStyle(t, e, s, n) {
    t.active = n;
    const o = this.getStyle(e, n);
    this._resolveAnimations(e, s, n).update(t, {
      options: !n && this.getSharedOptions(o) || o
    });
  }
  removeHoverStyle(t, e, s) {
    this._setStyle(t, s, "active", !1);
  }
  setHoverStyle(t, e, s) {
    this._setStyle(t, s, "active", !0);
  }
  _removeDatasetHoverStyle() {
    const t = this._cachedMeta.dataset;
    t && this._setStyle(t, void 0, "active", !1);
  }
  _setDatasetHoverStyle() {
    const t = this._cachedMeta.dataset;
    t && this._setStyle(t, void 0, "active", !0);
  }
  _resyncElements(t) {
    const e = this._data, s = this._cachedMeta.data;
    for (const [a, l, c] of this._syncList)
      this[a](l, c);
    this._syncList = [];
    const n = s.length, o = e.length, r = Math.min(o, n);
    r && this.parse(0, r), o > n ? this._insertElements(n, o - n, t) : o < n && this._removeElements(o, n - o);
  }
  _insertElements(t, e, s = !0) {
    const n = this._cachedMeta, o = n.data, r = t + e;
    let a;
    const l = (c) => {
      for (c.length += e, a = c.length - 1; a >= r; a--)
        c[a] = c[a - e];
    };
    for (l(o), a = t; a < r; ++a)
      o[a] = new this.dataElementType();
    this._parsing && l(n._parsed), this.parse(t, e), s && this.updateElements(o, t, e, "reset");
  }
  updateElements(t, e, s, n) {
  }
  _removeElements(t, e) {
    const s = this._cachedMeta;
    if (this._parsing) {
      const n = s._parsed.splice(t, e);
      s._stacked && Lt(s, n);
    }
    s.data.splice(t, e);
  }
  _sync(t) {
    if (this._parsing)
      this._syncList.push(t);
    else {
      const [e, s, n] = t;
      this[e](s, n);
    }
    this.chart._dataChanges.push([
      this.index,
      ...t
    ]);
  }
  _onDataPush() {
    const t = arguments.length;
    this._sync([
      "_insertElements",
      this.getDataset().data.length - t,
      t
    ]);
  }
  _onDataPop() {
    this._sync([
      "_removeElements",
      this._cachedMeta.data.length - 1,
      1
    ]);
  }
  _onDataShift() {
    this._sync([
      "_removeElements",
      0,
      1
    ]);
  }
  _onDataSplice(t, e) {
    e && this._sync([
      "_removeElements",
      t,
      e
    ]);
    const s = arguments.length - 2;
    s && this._sync([
      "_insertElements",
      t,
      s
    ]);
  }
  _onDataUnshift() {
    this._sync([
      "_insertElements",
      0,
      arguments.length
    ]);
  }
}
S(Yt, "defaults", {}), S(Yt, "datasetElementType", null), S(Yt, "dataElementType", null);
class be extends Yt {
  initialize() {
    this.enableOptionSharing = !0, this.supportsDecimation = !0, super.initialize();
  }
  update(t) {
    const e = this._cachedMeta, { dataset: s, data: n = [], _dataset: o } = e, r = this.chart._animationsDisabled;
    let { start: a, count: l } = lo(e, n, r);
    this._drawStart = a, this._drawCount = l, co(e) && (a = 0, l = n.length), s._chart = this.chart, s._datasetIndex = this.index, s._decimated = !!o._decimated, s.points = n;
    const c = this.resolveDatasetElementOptions(t);
    this.options.showLine || (c.borderWidth = 0), c.segment = this.options.segment, this.updateElement(s, void 0, {
      animated: !r,
      options: c
    }, t), this.updateElements(n, a, l, t);
  }
  updateElements(t, e, s, n) {
    const o = n === "reset", { iScale: r, vScale: a, _stacked: l, _dataset: c } = this._cachedMeta, { sharedOptions: h, includeOptions: f } = this._getSharedOptions(e, n), d = r.axis, u = a.axis, { spanGaps: m, segment: p } = this.options, g = Kt(m) ? m : Number.POSITIVE_INFINITY, b = this.chart._animationsDisabled || o || n === "none", x = e + s, v = t.length;
    let y = e > 0 && this.getParsed(e - 1);
    for (let _ = 0; _ < v; ++_) {
      const M = t[_], w = b ? M : {};
      if (_ < e || _ >= x) {
        w.skip = !0;
        continue;
      }
      const k = this.getParsed(_), D = T(k[u]), A = w[d] = r.getPixelForValue(k[d], _), I = w[u] = o || D ? a.getBasePixel() : a.getPixelForValue(l ? this.applyStack(a, k, l) : k[u], _);
      w.skip = isNaN(A) || isNaN(I) || D, w.stop = _ > 0 && Math.abs(k[d] - y[d]) > g, p && (w.parsed = k, w.raw = c.data[_]), f && (w.options = h || this.resolveDataElementOptions(_, M.active ? "active" : n)), b || this.updateElement(M, _, w, n), y = k;
    }
  }
  getMaxOverflow() {
    const t = this._cachedMeta, e = t.dataset, s = e.options && e.options.borderWidth || 0, n = t.data || [];
    if (!n.length)
      return s;
    const o = n[0].size(this.resolveDataElementOptions(0)), r = n[n.length - 1].size(this.resolveDataElementOptions(n.length - 1));
    return Math.max(s, o, r) / 2;
  }
  draw() {
    const t = this._cachedMeta;
    t.dataset.updateControlPoints(this.chart.chartArea, t.iScale.axis), super.draw();
  }
}
S(be, "id", "line"), S(be, "defaults", {
  datasetElementType: "line",
  dataElementType: "point",
  showLine: !0,
  spanGaps: !1
}), S(be, "overrides", {
  scales: {
    _index_: {
      type: "category"
    },
    _value_: {
      type: "linear"
    }
  }
});
function mt() {
  throw new Error("This method is not implemented: Check that a complete date adapter is provided.");
}
class gi {
  constructor(t) {
    S(this, "options");
    this.options = t || {};
  }
  /**
  * Override default date adapter methods.
  * Accepts type parameter to define options type.
  * @example
  * Chart._adapters._date.override<{myAdapterOption: string}>({
  *   init() {
  *     console.log(this.options.myAdapterOption);
  *   }
  * })
  */
  static override(t) {
    Object.assign(gi.prototype, t);
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  init() {
  }
  formats() {
    return mt();
  }
  parse() {
    return mt();
  }
  format() {
    return mt();
  }
  add() {
    return mt();
  }
  diff() {
    return mt();
  }
  startOf() {
    return mt();
  }
  endOf() {
    return mt();
  }
}
var Cr = {
  _date: gi
};
function Tr(i, t, e, s) {
  const { controller: n, data: o, _sorted: r } = i, a = n._cachedMeta.iScale, l = i.dataset && i.dataset.options ? i.dataset.options.spanGaps : null;
  if (a && t === a.axis && t !== "r" && r && o.length) {
    const c = a._reversePixels ? io : yt;
    if (s) {
      if (n._sharedOptions) {
        const h = o[0], f = typeof h.getRange == "function" && h.getRange(t);
        if (f) {
          const d = c(o, t, e - f), u = c(o, t, e + f);
          return {
            lo: d.lo,
            hi: u.hi
          };
        }
      }
    } else {
      const h = c(o, t, e);
      if (l) {
        const { vScale: f } = n._cachedMeta, { _parsed: d } = i, u = d.slice(0, h.lo + 1).reverse().findIndex((p) => !T(p[f.axis]));
        h.lo -= Math.max(0, u);
        const m = d.slice(h.hi).findIndex((p) => !T(p[f.axis]));
        h.hi += Math.max(0, m);
      }
      return h;
    }
  }
  return {
    lo: 0,
    hi: o.length - 1
  };
}
function Te(i, t, e, s, n) {
  const o = i.getSortedVisibleDatasetMetas(), r = e[t];
  for (let a = 0, l = o.length; a < l; ++a) {
    const { index: c, data: h } = o[a], { lo: f, hi: d } = Tr(o[a], t, r, n);
    for (let u = f; u <= d; ++u) {
      const m = h[u];
      m.skip || s(m, c, u);
    }
  }
}
function Ar(i) {
  const t = i.indexOf("x") !== -1, e = i.indexOf("y") !== -1;
  return function(s, n) {
    const o = t ? Math.abs(s.x - n.x) : 0, r = e ? Math.abs(s.y - n.y) : 0;
    return Math.sqrt(Math.pow(o, 2) + Math.pow(r, 2));
  };
}
function He(i, t, e, s, n) {
  const o = [];
  return !n && !i.isPointInArea(t) || Te(i, e, t, function(a, l, c) {
    !n && !qt(a, i.chartArea, 0) || a.inRange(t.x, t.y, s) && o.push({
      element: a,
      datasetIndex: l,
      index: c
    });
  }, !0), o;
}
function Ir(i, t, e, s) {
  let n = [];
  function o(r, a, l) {
    const { startAngle: c, endAngle: h } = r.getProps([
      "startAngle",
      "endAngle"
    ], s), { angle: f } = Jn(r, {
      x: t.x,
      y: t.y
    });
    Es(f, c, h) && n.push({
      element: r,
      datasetIndex: a,
      index: l
    });
  }
  return Te(i, e, t, o), n;
}
function Lr(i, t, e, s, n, o) {
  let r = [];
  const a = Ar(e);
  let l = Number.POSITIVE_INFINITY;
  function c(h, f, d) {
    const u = h.inRange(t.x, t.y, n);
    if (s && !u)
      return;
    const m = h.getCenterPoint(n);
    if (!(!!o || i.isPointInArea(m)) && !u)
      return;
    const g = a(t, m);
    g < l ? (r = [
      {
        element: h,
        datasetIndex: f,
        index: d
      }
    ], l = g) : g === l && r.push({
      element: h,
      datasetIndex: f,
      index: d
    });
  }
  return Te(i, e, t, c), r;
}
function Ve(i, t, e, s, n, o) {
  return !o && !i.isPointInArea(t) ? [] : e === "r" && !s ? Ir(i, t, e, n) : Lr(i, t, e, s, n, o);
}
function Xi(i, t, e, s, n) {
  const o = [], r = e === "x" ? "inXRange" : "inYRange";
  let a = !1;
  return Te(i, e, t, (l, c, h) => {
    l[r] && l[r](t[e], n) && (o.push({
      element: l,
      datasetIndex: c,
      index: h
    }), a = a || l.inRange(t.x, t.y, n));
  }), s && !a ? [] : o;
}
var Fr = {
  modes: {
    index(i, t, e, s) {
      const n = bt(t, i), o = e.axis || "x", r = e.includeInvisible || !1, a = e.intersect ? He(i, n, o, s, r) : Ve(i, n, o, !1, s, r), l = [];
      return a.length ? (i.getSortedVisibleDatasetMetas().forEach((c) => {
        const h = a[0].index, f = c.data[h];
        f && !f.skip && l.push({
          element: f,
          datasetIndex: c.index,
          index: h
        });
      }), l) : [];
    },
    dataset(i, t, e, s) {
      const n = bt(t, i), o = e.axis || "xy", r = e.includeInvisible || !1;
      let a = e.intersect ? He(i, n, o, s, r) : Ve(i, n, o, !1, s, r);
      if (a.length > 0) {
        const l = a[0].datasetIndex, c = i.getDatasetMeta(l).data;
        a = [];
        for (let h = 0; h < c.length; ++h)
          a.push({
            element: c[h],
            datasetIndex: l,
            index: h
          });
      }
      return a;
    },
    point(i, t, e, s) {
      const n = bt(t, i), o = e.axis || "xy", r = e.includeInvisible || !1;
      return He(i, n, o, s, r);
    },
    nearest(i, t, e, s) {
      const n = bt(t, i), o = e.axis || "xy", r = e.includeInvisible || !1;
      return Ve(i, n, o, e.intersect, s, r);
    },
    x(i, t, e, s) {
      const n = bt(t, i);
      return Xi(i, n, "x", e.intersect, s);
    },
    y(i, t, e, s) {
      const n = bt(t, i);
      return Xi(i, n, "y", e.intersect, s);
    }
  }
};
const tn = [
  "left",
  "top",
  "right",
  "bottom"
];
function Ft(i, t) {
  return i.filter((e) => e.pos === t);
}
function Ki(i, t) {
  return i.filter((e) => tn.indexOf(e.pos) === -1 && e.box.axis === t);
}
function Et(i, t) {
  return i.sort((e, s) => {
    const n = t ? s : e, o = t ? e : s;
    return n.weight === o.weight ? n.index - o.index : n.weight - o.weight;
  });
}
function Er(i) {
  const t = [];
  let e, s, n, o, r, a;
  for (e = 0, s = (i || []).length; e < s; ++e)
    n = i[e], { position: o, options: { stack: r, stackWeight: a = 1 } } = n, t.push({
      index: e,
      box: n,
      pos: o,
      horizontal: n.isHorizontal(),
      weight: n.weight,
      stack: r && o + r,
      stackWeight: a
    });
  return t;
}
function Rr(i) {
  const t = {};
  for (const e of i) {
    const { stack: s, pos: n, stackWeight: o } = e;
    if (!s || !tn.includes(n))
      continue;
    const r = t[s] || (t[s] = {
      count: 0,
      placed: 0,
      weight: 0,
      size: 0
    });
    r.count++, r.weight += o;
  }
  return t;
}
function zr(i, t) {
  const e = Rr(i), { vBoxMaxWidth: s, hBoxMaxHeight: n } = t;
  let o, r, a;
  for (o = 0, r = i.length; o < r; ++o) {
    a = i[o];
    const { fullSize: l } = a.box, c = e[a.stack], h = c && a.stackWeight / c.weight;
    a.horizontal ? (a.width = h ? h * s : l && t.availableWidth, a.height = n) : (a.width = s, a.height = h ? h * n : l && t.availableHeight);
  }
  return e;
}
function Br(i) {
  const t = Er(i), e = Et(t.filter((c) => c.box.fullSize), !0), s = Et(Ft(t, "left"), !0), n = Et(Ft(t, "right")), o = Et(Ft(t, "top"), !0), r = Et(Ft(t, "bottom")), a = Ki(t, "x"), l = Ki(t, "y");
  return {
    fullSize: e,
    leftAndTop: s.concat(o),
    rightAndBottom: n.concat(l).concat(r).concat(a),
    chartArea: Ft(t, "chartArea"),
    vertical: s.concat(n).concat(l),
    horizontal: o.concat(r).concat(a)
  };
}
function qi(i, t, e, s) {
  return Math.max(i[e], t[e]) + Math.max(i[s], t[s]);
}
function en(i, t) {
  i.top = Math.max(i.top, t.top), i.left = Math.max(i.left, t.left), i.bottom = Math.max(i.bottom, t.bottom), i.right = Math.max(i.right, t.right);
}
function Nr(i, t, e, s) {
  const { pos: n, box: o } = e, r = i.maxPadding;
  if (!P(n)) {
    e.size && (i[n] -= e.size);
    const f = s[e.stack] || {
      size: 0,
      count: 1
    };
    f.size = Math.max(f.size, e.horizontal ? o.height : o.width), e.size = f.size / f.count, i[n] += e.size;
  }
  o.getPadding && en(r, o.getPadding());
  const a = Math.max(0, t.outerWidth - qi(r, i, "left", "right")), l = Math.max(0, t.outerHeight - qi(r, i, "top", "bottom")), c = a !== i.w, h = l !== i.h;
  return i.w = a, i.h = l, e.horizontal ? {
    same: c,
    other: h
  } : {
    same: h,
    other: c
  };
}
function Hr(i) {
  const t = i.maxPadding;
  function e(s) {
    const n = Math.max(t[s] - i[s], 0);
    return i[s] += n, n;
  }
  i.y += e("top"), i.x += e("left"), e("right"), e("bottom");
}
function Vr(i, t) {
  const e = t.maxPadding;
  function s(n) {
    const o = {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0
    };
    return n.forEach((r) => {
      o[r] = Math.max(t[r], e[r]);
    }), o;
  }
  return s(i ? [
    "left",
    "right"
  ] : [
    "top",
    "bottom"
  ]);
}
function Nt(i, t, e, s) {
  const n = [];
  let o, r, a, l, c, h;
  for (o = 0, r = i.length, c = 0; o < r; ++o) {
    a = i[o], l = a.box, l.update(a.width || t.w, a.height || t.h, Vr(a.horizontal, t));
    const { same: f, other: d } = Nr(t, e, a, s);
    c |= f && n.length, h = h || d, l.fullSize || n.push(a);
  }
  return c && Nt(n, t, e, s) || h;
}
function ce(i, t, e, s, n) {
  i.top = e, i.left = t, i.right = t + s, i.bottom = e + n, i.width = s, i.height = n;
}
function Gi(i, t, e, s) {
  const n = e.padding;
  let { x: o, y: r } = t;
  for (const a of i) {
    const l = a.box, c = s[a.stack] || {
      placed: 0,
      weight: 1
    }, h = a.stackWeight / c.weight || 1;
    if (a.horizontal) {
      const f = t.w * h, d = c.size || l.height;
      Me(c.start) && (r = c.start), l.fullSize ? ce(l, n.left, r, e.outerWidth - n.right - n.left, d) : ce(l, t.left + c.placed, r, f, d), c.start = r, c.placed += f, r = l.bottom;
    } else {
      const f = t.h * h, d = c.size || l.width;
      Me(c.start) && (o = c.start), l.fullSize ? ce(l, o, n.top, d, e.outerHeight - n.bottom - n.top) : ce(l, o, t.top + c.placed, d, f), c.start = o, c.placed += f, o = l.right;
    }
  }
  t.x = o, t.y = r;
}
var he = {
  addBox(i, t) {
    i.boxes || (i.boxes = []), t.fullSize = t.fullSize || !1, t.position = t.position || "top", t.weight = t.weight || 0, t._layers = t._layers || function() {
      return [
        {
          z: 0,
          draw(e) {
            t.draw(e);
          }
        }
      ];
    }, i.boxes.push(t);
  },
  removeBox(i, t) {
    const e = i.boxes ? i.boxes.indexOf(t) : -1;
    e !== -1 && i.boxes.splice(e, 1);
  },
  configure(i, t, e) {
    t.fullSize = e.fullSize, t.position = e.position, t.weight = e.weight;
  },
  update(i, t, e, s) {
    if (!i)
      return;
    const n = ft(i.options.layout.padding), o = Math.max(t - n.width, 0), r = Math.max(e - n.height, 0), a = Br(i.boxes), l = a.vertical, c = a.horizontal;
    O(i.boxes, (p) => {
      typeof p.beforeLayout == "function" && p.beforeLayout();
    });
    const h = l.reduce((p, g) => g.box.options && g.box.options.display === !1 ? p : p + 1, 0) || 1, f = Object.freeze({
      outerWidth: t,
      outerHeight: e,
      padding: n,
      availableWidth: o,
      availableHeight: r,
      vBoxMaxWidth: o / 2 / h,
      hBoxMaxHeight: r / 2
    }), d = Object.assign({}, n);
    en(d, ft(s));
    const u = Object.assign({
      maxPadding: d,
      w: o,
      h: r,
      x: n.left,
      y: n.top
    }, n), m = zr(l.concat(c), f);
    Nt(a.fullSize, u, f, m), Nt(l, u, f, m), Nt(c, u, f, m) && Nt(l, u, f, m), Hr(u), Gi(a.leftAndTop, u, f, m), u.x += u.w, u.y += u.h, Gi(a.rightAndBottom, u, f, m), i.chartArea = {
      left: u.left,
      top: u.top,
      right: u.left + u.w,
      bottom: u.top + u.h,
      height: u.h,
      width: u.w
    }, O(a.chartArea, (p) => {
      const g = p.box;
      Object.assign(g, i.chartArea), g.update(u.w, u.h, {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      });
    });
  }
};
class sn {
  acquireContext(t, e) {
  }
  releaseContext(t) {
    return !1;
  }
  addEventListener(t, e, s) {
  }
  removeEventListener(t, e, s) {
  }
  getDevicePixelRatio() {
    return 1;
  }
  getMaximumSize(t, e, s, n) {
    return e = Math.max(0, e || t.width), s = s || t.height, {
      width: e,
      height: Math.max(0, n ? Math.floor(e / n) : s)
    };
  }
  isAttached(t) {
    return !0;
  }
  updateConfig(t) {
  }
}
class Wr extends sn {
  acquireContext(t) {
    return t && t.getContext && t.getContext("2d") || null;
  }
  updateConfig(t) {
    t.options.animation = !1;
  }
}
const _e = "$chartjs", jr = {
  touchstart: "mousedown",
  touchmove: "mousemove",
  touchend: "mouseup",
  pointerenter: "mouseenter",
  pointerdown: "mousedown",
  pointermove: "mousemove",
  pointerup: "mouseup",
  pointerleave: "mouseout",
  pointerout: "mouseout"
}, Zi = (i) => i === null || i === "";
function $r(i, t) {
  const e = i.style, s = i.getAttribute("height"), n = i.getAttribute("width");
  if (i[_e] = {
    initial: {
      height: s,
      width: n,
      style: {
        display: e.display,
        height: e.height,
        width: e.width
      }
    }
  }, e.display = e.display || "block", e.boxSizing = e.boxSizing || "border-box", Zi(n)) {
    const o = zi(i, "width");
    o !== void 0 && (i.width = o);
  }
  if (Zi(s))
    if (i.style.height === "")
      i.height = i.width / (t || 2);
    else {
      const o = zi(i, "height");
      o !== void 0 && (i.height = o);
    }
  return i;
}
const nn = er ? {
  passive: !0
} : !1;
function Yr(i, t, e) {
  i && i.addEventListener(t, e, nn);
}
function Ur(i, t, e) {
  i && i.canvas && i.canvas.removeEventListener(t, e, nn);
}
function Xr(i, t) {
  const e = jr[i.type] || i.type, { x: s, y: n } = bt(i, t);
  return {
    type: e,
    chart: t,
    native: i,
    x: s !== void 0 ? s : null,
    y: n !== void 0 ? n : null
  };
}
function Pe(i, t) {
  for (const e of i)
    if (e === t || e.contains(t))
      return !0;
}
function Kr(i, t, e) {
  const s = i.canvas, n = new MutationObserver((o) => {
    let r = !1;
    for (const a of o)
      r = r || Pe(a.addedNodes, s), r = r && !Pe(a.removedNodes, s);
    r && e();
  });
  return n.observe(document, {
    childList: !0,
    subtree: !0
  }), n;
}
function qr(i, t, e) {
  const s = i.canvas, n = new MutationObserver((o) => {
    let r = !1;
    for (const a of o)
      r = r || Pe(a.removedNodes, s), r = r && !Pe(a.addedNodes, s);
    r && e();
  });
  return n.observe(document, {
    childList: !0,
    subtree: !0
  }), n;
}
const Gt = /* @__PURE__ */ new Map();
let Qi = 0;
function on() {
  const i = window.devicePixelRatio;
  i !== Qi && (Qi = i, Gt.forEach((t, e) => {
    e.currentDevicePixelRatio !== i && t();
  }));
}
function Gr(i, t) {
  Gt.size || window.addEventListener("resize", on), Gt.set(i, t);
}
function Zr(i) {
  Gt.delete(i), Gt.size || window.removeEventListener("resize", on);
}
function Qr(i, t, e) {
  const s = i.canvas, n = s && ui(s);
  if (!n)
    return;
  const o = Ns((a, l) => {
    const c = n.clientWidth;
    e(a, l), c < n.clientWidth && e();
  }, window), r = new ResizeObserver((a) => {
    const l = a[0], c = l.contentRect.width, h = l.contentRect.height;
    c === 0 && h === 0 || o(c, h);
  });
  return r.observe(n), Gr(i, o), r;
}
function We(i, t, e) {
  e && e.disconnect(), t === "resize" && Zr(i);
}
function Jr(i, t, e) {
  const s = i.canvas, n = Ns((o) => {
    i.ctx !== null && e(Xr(o, i));
  }, i);
  return Yr(s, t, n), n;
}
class ta extends sn {
  acquireContext(t, e) {
    const s = t && t.getContext && t.getContext("2d");
    return s && s.canvas === t ? ($r(t, e), s) : null;
  }
  releaseContext(t) {
    const e = t.canvas;
    if (!e[_e])
      return !1;
    const s = e[_e].initial;
    [
      "height",
      "width"
    ].forEach((o) => {
      const r = s[o];
      T(r) ? e.removeAttribute(o) : e.setAttribute(o, r);
    });
    const n = s.style || {};
    return Object.keys(n).forEach((o) => {
      e.style[o] = n[o];
    }), e.width = e.width, delete e[_e], !0;
  }
  addEventListener(t, e, s) {
    this.removeEventListener(t, e);
    const n = t.$proxies || (t.$proxies = {}), r = {
      attach: Kr,
      detach: qr,
      resize: Qr
    }[e] || Jr;
    n[e] = r(t, e, s);
  }
  removeEventListener(t, e) {
    const s = t.$proxies || (t.$proxies = {}), n = s[e];
    if (!n)
      return;
    ({
      attach: We,
      detach: We,
      resize: We
    }[e] || Ur)(t, e, n), s[e] = void 0;
  }
  getDevicePixelRatio() {
    return window.devicePixelRatio;
  }
  getMaximumSize(t, e, s, n) {
    return tr(t, e, s, n);
  }
  isAttached(t) {
    const e = t && ui(t);
    return !!(e && e.isConnected);
  }
}
function ea(i) {
  return !di() || typeof OffscreenCanvas < "u" && i instanceof OffscreenCanvas ? Wr : ta;
}
class kt {
  constructor() {
    S(this, "x");
    S(this, "y");
    S(this, "active", !1);
    S(this, "options");
    S(this, "$animations");
  }
  tooltipPosition(t) {
    const { x: e, y: s } = this.getProps([
      "x",
      "y"
    ], t);
    return {
      x: e,
      y: s
    };
  }
  hasValue() {
    return Kt(this.x) && Kt(this.y);
  }
  getProps(t, e) {
    const s = this.$animations;
    if (!e || !s)
      return this;
    const n = {};
    return t.forEach((o) => {
      n[o] = s[o] && s[o].active() ? s[o]._to : this[o];
    }), n;
  }
}
S(kt, "defaults", {}), S(kt, "defaultRoutes");
function ia(i, t) {
  const e = i.options.ticks, s = sa(i), n = Math.min(e.maxTicksLimit || s, s), o = e.major.enabled ? oa(t) : [], r = o.length, a = o[0], l = o[r - 1], c = [];
  if (r > n)
    return ra(t, c, o, r / n), c;
  const h = na(o, t, n);
  if (r > 0) {
    let f, d;
    const u = r > 1 ? Math.round((l - a) / (r - 1)) : null;
    for (fe(t, c, h, T(u) ? 0 : a - u, a), f = 0, d = r - 1; f < d; f++)
      fe(t, c, h, o[f], o[f + 1]);
    return fe(t, c, h, l, T(u) ? t.length : l + u), c;
  }
  return fe(t, c, h), c;
}
function sa(i) {
  const t = i.options.offset, e = i._tickSize(), s = i._length / e + (t ? 0 : 1), n = i._maxLength / e;
  return Math.floor(Math.min(s, n));
}
function na(i, t, e) {
  const s = aa(i), n = t.length / e;
  if (!s)
    return Math.max(n, 1);
  const o = Kn(s);
  for (let r = 0, a = o.length - 1; r < a; r++) {
    const l = o[r];
    if (l > n)
      return l;
  }
  return Math.max(n, 1);
}
function oa(i) {
  const t = [];
  let e, s;
  for (e = 0, s = i.length; e < s; e++)
    i[e].major && t.push(e);
  return t;
}
function ra(i, t, e, s) {
  let n = 0, o = e[0], r;
  for (s = Math.ceil(s), r = 0; r < i.length; r++)
    r === o && (t.push(i[r]), n++, o = e[n * s]);
}
function fe(i, t, e, s, n) {
  const o = C(s, 0), r = Math.min(C(n, i.length), i.length);
  let a = 0, l, c, h;
  for (e = Math.ceil(e), n && (l = n - s, e = l / Math.floor(l / e)), h = o; h < 0; )
    a++, h = Math.round(o + a * e);
  for (c = Math.max(o, 0); c < r; c++)
    c === h && (t.push(i[c]), a++, h = Math.round(o + a * e));
}
function aa(i) {
  const t = i.length;
  let e, s;
  if (t < 2)
    return !1;
  for (s = i[0], e = 1; e < t; ++e)
    if (i[e] - i[e - 1] !== s)
      return !1;
  return s;
}
const la = (i) => i === "left" ? "right" : i === "right" ? "left" : i, Ji = (i, t, e) => t === "top" || t === "left" ? i[t] + e : i[t] - e, ts = (i, t) => Math.min(t || i, i);
function es(i, t) {
  const e = [], s = i.length / t, n = i.length;
  let o = 0;
  for (; o < n; o += s)
    e.push(i[Math.floor(o)]);
  return e;
}
function ca(i, t, e) {
  const s = i.ticks.length, n = Math.min(t, s - 1), o = i._startPixel, r = i._endPixel, a = 1e-6;
  let l = i.getPixelForTick(n), c;
  if (!(e && (s === 1 ? c = Math.max(l - o, r - l) : t === 0 ? c = (i.getPixelForTick(1) - l) / 2 : c = (l - i.getPixelForTick(n - 1)) / 2, l += n < t ? c : -c, l < o - a || l > r + a)))
    return l;
}
function ha(i, t) {
  O(i, (e) => {
    const s = e.gc, n = s.length / 2;
    let o;
    if (n > t) {
      for (o = 0; o < n; ++o)
        delete e.data[s[o]];
      s.splice(0, n);
    }
  });
}
function Rt(i) {
  return i.drawTicks ? i.tickLength : 0;
}
function is(i, t) {
  if (!i.display)
    return 0;
  const e = J(i.font, t), s = ft(i.padding);
  return (z(i.text) ? i.text.length : 1) * e.lineHeight + s.height;
}
function fa(i, t) {
  return Mt(i, {
    scale: t,
    type: "scale"
  });
}
function da(i, t, e) {
  return Mt(i, {
    tick: e,
    index: t,
    type: "tick"
  });
}
function ua(i, t, e) {
  let s = ao(i);
  return (e && t !== "right" || !e && t === "right") && (s = la(s)), s;
}
function ga(i, t, e, s) {
  const { top: n, left: o, bottom: r, right: a, chart: l } = i, { chartArea: c, scales: h } = l;
  let f = 0, d, u, m;
  const p = r - n, g = a - o;
  if (i.isHorizontal()) {
    if (u = Si(s, o, a), P(e)) {
      const b = Object.keys(e)[0], x = e[b];
      m = h[b].getPixelForValue(x) + p - t;
    } else e === "center" ? m = (c.bottom + c.top) / 2 + p - t : m = Ji(i, e, t);
    d = a - o;
  } else {
    if (P(e)) {
      const b = Object.keys(e)[0], x = e[b];
      u = h[b].getPixelForValue(x) - g + t;
    } else e === "center" ? u = (c.left + c.right) / 2 - g + t : u = Ji(i, e, t);
    m = Si(s, r, n), f = e === "left" ? -Y : Y;
  }
  return {
    titleX: u,
    titleY: m,
    maxWidth: d,
    rotation: f
  };
}
class Qt extends kt {
  constructor(t) {
    super(), this.id = t.id, this.type = t.type, this.options = void 0, this.ctx = t.ctx, this.chart = t.chart, this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.width = void 0, this.height = void 0, this._margins = {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }, this.maxWidth = void 0, this.maxHeight = void 0, this.paddingTop = void 0, this.paddingBottom = void 0, this.paddingLeft = void 0, this.paddingRight = void 0, this.axis = void 0, this.labelRotation = void 0, this.min = void 0, this.max = void 0, this._range = void 0, this.ticks = [], this._gridLineItems = null, this._labelItems = null, this._labelSizes = null, this._length = 0, this._maxLength = 0, this._longestTextCache = {}, this._startPixel = void 0, this._endPixel = void 0, this._reversePixels = !1, this._userMax = void 0, this._userMin = void 0, this._suggestedMax = void 0, this._suggestedMin = void 0, this._ticksLength = 0, this._borderValue = 0, this._cache = {}, this._dataLimitsCached = !1, this.$context = void 0;
  }
  init(t) {
    this.options = t.setContext(this.getContext()), this.axis = t.axis, this._userMin = this.parse(t.min), this._userMax = this.parse(t.max), this._suggestedMin = this.parse(t.suggestedMin), this._suggestedMax = this.parse(t.suggestedMax);
  }
  parse(t, e) {
    return t;
  }
  getUserBounds() {
    let { _userMin: t, _userMax: e, _suggestedMin: s, _suggestedMax: n } = this;
    return t = K(t, Number.POSITIVE_INFINITY), e = K(e, Number.NEGATIVE_INFINITY), s = K(s, Number.POSITIVE_INFINITY), n = K(n, Number.NEGATIVE_INFINITY), {
      min: K(t, s),
      max: K(e, n),
      minDefined: H(t),
      maxDefined: H(e)
    };
  }
  getMinMax(t) {
    let { min: e, max: s, minDefined: n, maxDefined: o } = this.getUserBounds(), r;
    if (n && o)
      return {
        min: e,
        max: s
      };
    const a = this.getMatchingVisibleMetas();
    for (let l = 0, c = a.length; l < c; ++l)
      r = a[l].controller.getMinMax(this, t), n || (e = Math.min(e, r.min)), o || (s = Math.max(s, r.max));
    return e = o && e > s ? s : e, s = n && e > s ? e : s, {
      min: K(e, K(s, e)),
      max: K(s, K(e, s))
    };
  }
  getPadding() {
    return {
      left: this.paddingLeft || 0,
      top: this.paddingTop || 0,
      right: this.paddingRight || 0,
      bottom: this.paddingBottom || 0
    };
  }
  getTicks() {
    return this.ticks;
  }
  getLabels() {
    const t = this.chart.data;
    return this.options.labels || (this.isHorizontal() ? t.xLabels : t.yLabels) || t.labels || [];
  }
  getLabelItems(t = this.chart.chartArea) {
    return this._labelItems || (this._labelItems = this._computeLabelItems(t));
  }
  beforeLayout() {
    this._cache = {}, this._dataLimitsCached = !1;
  }
  beforeUpdate() {
    F(this.options.beforeUpdate, [
      this
    ]);
  }
  update(t, e, s) {
    const { beginAtZero: n, grace: o, ticks: r } = this.options, a = r.sampleSize;
    this.beforeUpdate(), this.maxWidth = t, this.maxHeight = e, this._margins = s = Object.assign({
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }, s), this.ticks = null, this._labelSizes = null, this._gridLineItems = null, this._labelItems = null, this.beforeSetDimensions(), this.setDimensions(), this.afterSetDimensions(), this._maxLength = this.isHorizontal() ? this.width + s.left + s.right : this.height + s.top + s.bottom, this._dataLimitsCached || (this.beforeDataLimits(), this.determineDataLimits(), this.afterDataLimits(), this._range = Io(this, o, n), this._dataLimitsCached = !0), this.beforeBuildTicks(), this.ticks = this.buildTicks() || [], this.afterBuildTicks();
    const l = a < this.ticks.length;
    this._convertTicksToLabels(l ? es(this.ticks, a) : this.ticks), this.configure(), this.beforeCalculateLabelRotation(), this.calculateLabelRotation(), this.afterCalculateLabelRotation(), r.display && (r.autoSkip || r.source === "auto") && (this.ticks = ia(this, this.ticks), this._labelSizes = null, this.afterAutoSkip()), l && this._convertTicksToLabels(this.ticks), this.beforeFit(), this.fit(), this.afterFit(), this.afterUpdate();
  }
  configure() {
    let t = this.options.reverse, e, s;
    this.isHorizontal() ? (e = this.left, s = this.right) : (e = this.top, s = this.bottom, t = !t), this._startPixel = e, this._endPixel = s, this._reversePixels = t, this._length = s - e, this._alignToPixels = this.options.alignToPixels;
  }
  afterUpdate() {
    F(this.options.afterUpdate, [
      this
    ]);
  }
  beforeSetDimensions() {
    F(this.options.beforeSetDimensions, [
      this
    ]);
  }
  setDimensions() {
    this.isHorizontal() ? (this.width = this.maxWidth, this.left = 0, this.right = this.width) : (this.height = this.maxHeight, this.top = 0, this.bottom = this.height), this.paddingLeft = 0, this.paddingTop = 0, this.paddingRight = 0, this.paddingBottom = 0;
  }
  afterSetDimensions() {
    F(this.options.afterSetDimensions, [
      this
    ]);
  }
  _callHooks(t) {
    this.chart.notifyPlugins(t, this.getContext()), F(this.options[t], [
      this
    ]);
  }
  beforeDataLimits() {
    this._callHooks("beforeDataLimits");
  }
  determineDataLimits() {
  }
  afterDataLimits() {
    this._callHooks("afterDataLimits");
  }
  beforeBuildTicks() {
    this._callHooks("beforeBuildTicks");
  }
  buildTicks() {
    return [];
  }
  afterBuildTicks() {
    this._callHooks("afterBuildTicks");
  }
  beforeTickToLabelConversion() {
    F(this.options.beforeTickToLabelConversion, [
      this
    ]);
  }
  generateTickLabels(t) {
    const e = this.options.ticks;
    let s, n, o;
    for (s = 0, n = t.length; s < n; s++)
      o = t[s], o.label = F(e.callback, [
        o.value,
        s,
        t
      ], this);
  }
  afterTickToLabelConversion() {
    F(this.options.afterTickToLabelConversion, [
      this
    ]);
  }
  beforeCalculateLabelRotation() {
    F(this.options.beforeCalculateLabelRotation, [
      this
    ]);
  }
  calculateLabelRotation() {
    const t = this.options, e = t.ticks, s = ts(this.ticks.length, t.ticks.maxTicksLimit), n = e.minRotation || 0, o = e.maxRotation;
    let r = n, a, l, c;
    if (!this._isVisible() || !e.display || n >= o || s <= 1 || !this.isHorizontal()) {
      this.labelRotation = n;
      return;
    }
    const h = this._getLabelSizes(), f = h.widest.width, d = h.highest.height, u = U(this.chart.width - f, 0, this.maxWidth);
    a = t.offset ? this.maxWidth / s : u / (s - 1), f + 6 > a && (a = u / (s - (t.offset ? 0.5 : 1)), l = this.maxHeight - Rt(t.grid) - e.padding - is(t.title, this.chart.options.font), c = Math.sqrt(f * f + d * d), r = Qn(Math.min(Math.asin(U((h.highest.height + 6) / a, -1, 1)), Math.asin(U(l / c, -1, 1)) - Math.asin(U(d / c, -1, 1)))), r = Math.max(n, Math.min(o, r))), this.labelRotation = r;
  }
  afterCalculateLabelRotation() {
    F(this.options.afterCalculateLabelRotation, [
      this
    ]);
  }
  afterAutoSkip() {
  }
  beforeFit() {
    F(this.options.beforeFit, [
      this
    ]);
  }
  fit() {
    const t = {
      width: 0,
      height: 0
    }, { chart: e, options: { ticks: s, title: n, grid: o } } = this, r = this._isVisible(), a = this.isHorizontal();
    if (r) {
      const l = is(n, e.options.font);
      if (a ? (t.width = this.maxWidth, t.height = Rt(o) + l) : (t.height = this.maxHeight, t.width = Rt(o) + l), s.display && this.ticks.length) {
        const { first: c, last: h, widest: f, highest: d } = this._getLabelSizes(), u = s.padding * 2, m = xt(this.labelRotation), p = Math.cos(m), g = Math.sin(m);
        if (a) {
          const b = s.mirror ? 0 : g * f.width + p * d.height;
          t.height = Math.min(this.maxHeight, t.height + b + u);
        } else {
          const b = s.mirror ? 0 : p * f.width + g * d.height;
          t.width = Math.min(this.maxWidth, t.width + b + u);
        }
        this._calculatePadding(c, h, g, p);
      }
    }
    this._handleMargins(), a ? (this.width = this._length = e.width - this._margins.left - this._margins.right, this.height = t.height) : (this.width = t.width, this.height = this._length = e.height - this._margins.top - this._margins.bottom);
  }
  _calculatePadding(t, e, s, n) {
    const { ticks: { align: o, padding: r }, position: a } = this.options, l = this.labelRotation !== 0, c = a !== "top" && this.axis === "x";
    if (this.isHorizontal()) {
      const h = this.getPixelForTick(0) - this.left, f = this.right - this.getPixelForTick(this.ticks.length - 1);
      let d = 0, u = 0;
      l ? c ? (d = n * t.width, u = s * e.height) : (d = s * t.height, u = n * e.width) : o === "start" ? u = e.width : o === "end" ? d = t.width : o !== "inner" && (d = t.width / 2, u = e.width / 2), this.paddingLeft = Math.max((d - h + r) * this.width / (this.width - h), 0), this.paddingRight = Math.max((u - f + r) * this.width / (this.width - f), 0);
    } else {
      let h = e.height / 2, f = t.height / 2;
      o === "start" ? (h = 0, f = t.height) : o === "end" && (h = e.height, f = 0), this.paddingTop = h + r, this.paddingBottom = f + r;
    }
  }
  _handleMargins() {
    this._margins && (this._margins.left = Math.max(this.paddingLeft, this._margins.left), this._margins.top = Math.max(this.paddingTop, this._margins.top), this._margins.right = Math.max(this.paddingRight, this._margins.right), this._margins.bottom = Math.max(this.paddingBottom, this._margins.bottom));
  }
  afterFit() {
    F(this.options.afterFit, [
      this
    ]);
  }
  isHorizontal() {
    const { axis: t, position: e } = this.options;
    return e === "top" || e === "bottom" || t === "x";
  }
  isFullSize() {
    return this.options.fullSize;
  }
  _convertTicksToLabels(t) {
    this.beforeTickToLabelConversion(), this.generateTickLabels(t);
    let e, s;
    for (e = 0, s = t.length; e < s; e++)
      T(t[e].label) && (t.splice(e, 1), s--, e--);
    this.afterTickToLabelConversion();
  }
  _getLabelSizes() {
    let t = this._labelSizes;
    if (!t) {
      const e = this.options.ticks.sampleSize;
      let s = this.ticks;
      e < s.length && (s = es(s, e)), this._labelSizes = t = this._computeLabelSizes(s, s.length, this.options.ticks.maxTicksLimit);
    }
    return t;
  }
  _computeLabelSizes(t, e, s) {
    const { ctx: n, _longestTextCache: o } = this, r = [], a = [], l = Math.floor(e / ts(e, s));
    let c = 0, h = 0, f, d, u, m, p, g, b, x, v, y, _;
    for (f = 0; f < e; f += l) {
      if (m = t[f].label, p = this._resolveTickFontOptions(f), n.font = g = p.string, b = o[g] = o[g] || {
        data: {},
        gc: []
      }, x = p.lineHeight, v = y = 0, !T(m) && !z(m))
        v = Ti(n, b.data, b.gc, v, m), y = x;
      else if (z(m))
        for (d = 0, u = m.length; d < u; ++d)
          _ = m[d], !T(_) && !z(_) && (v = Ti(n, b.data, b.gc, v, _), y += x);
      r.push(v), a.push(y), c = Math.max(v, c), h = Math.max(y, h);
    }
    ha(o, e);
    const M = r.indexOf(c), w = a.indexOf(h), k = (D) => ({
      width: r[D] || 0,
      height: a[D] || 0
    });
    return {
      first: k(0),
      last: k(e - 1),
      widest: k(M),
      highest: k(w),
      widths: r,
      heights: a
    };
  }
  getLabelForValue(t) {
    return t;
  }
  getPixelForValue(t, e) {
    return NaN;
  }
  getValueForPixel(t) {
  }
  getPixelForTick(t) {
    const e = this.ticks;
    return t < 0 || t > e.length - 1 ? null : this.getPixelForValue(e[t].value);
  }
  getPixelForDecimal(t) {
    this._reversePixels && (t = 1 - t);
    const e = this._startPixel + t * this._length;
    return eo(this._alignToPixels ? pt(this.chart, e, 0) : e);
  }
  getDecimalForPixel(t) {
    const e = (t - this._startPixel) / this._length;
    return this._reversePixels ? 1 - e : e;
  }
  getBasePixel() {
    return this.getPixelForValue(this.getBaseValue());
  }
  getBaseValue() {
    const { min: t, max: e } = this;
    return t < 0 && e < 0 ? e : t > 0 && e > 0 ? t : 0;
  }
  getContext(t) {
    const e = this.ticks || [];
    if (t >= 0 && t < e.length) {
      const s = e[t];
      return s.$context || (s.$context = da(this.getContext(), t, s));
    }
    return this.$context || (this.$context = fa(this.chart.getContext(), this));
  }
  _tickSize() {
    const t = this.options.ticks, e = xt(this.labelRotation), s = Math.abs(Math.cos(e)), n = Math.abs(Math.sin(e)), o = this._getLabelSizes(), r = t.autoSkipPadding || 0, a = o ? o.widest.width + r : 0, l = o ? o.highest.height + r : 0;
    return this.isHorizontal() ? l * s > a * n ? a / s : l / n : l * n < a * s ? l / s : a / n;
  }
  _isVisible() {
    const t = this.options.display;
    return t !== "auto" ? !!t : this.getMatchingVisibleMetas().length > 0;
  }
  _computeGridLineItems(t) {
    const e = this.axis, s = this.chart, n = this.options, { grid: o, position: r, border: a } = n, l = o.offset, c = this.isHorizontal(), f = this.ticks.length + (l ? 1 : 0), d = Rt(o), u = [], m = a.setContext(this.getContext()), p = m.display ? m.width : 0, g = p / 2, b = function(B) {
      return pt(s, B, p);
    };
    let x, v, y, _, M, w, k, D, A, I, R, X;
    if (r === "top")
      x = b(this.bottom), w = this.bottom - d, D = x - g, I = b(t.top) + g, X = t.bottom;
    else if (r === "bottom")
      x = b(this.top), I = t.top, X = b(t.bottom) - g, w = x + g, D = this.top + d;
    else if (r === "left")
      x = b(this.right), M = this.right - d, k = x - g, A = b(t.left) + g, R = t.right;
    else if (r === "right")
      x = b(this.left), A = t.left, R = b(t.right) - g, M = x + g, k = this.left + d;
    else if (e === "x") {
      if (r === "center")
        x = b((t.top + t.bottom) / 2 + 0.5);
      else if (P(r)) {
        const B = Object.keys(r)[0], j = r[B];
        x = b(this.chart.scales[B].getPixelForValue(j));
      }
      I = t.top, X = t.bottom, w = x + g, D = w + d;
    } else if (e === "y") {
      if (r === "center")
        x = b((t.left + t.right) / 2);
      else if (P(r)) {
        const B = Object.keys(r)[0], j = r[B];
        x = b(this.chart.scales[B].getPixelForValue(j));
      }
      M = x - g, k = M - d, A = t.left, R = t.right;
    }
    const ot = C(n.ticks.maxTicksLimit, f), L = Math.max(1, Math.ceil(f / ot));
    for (v = 0; v < f; v += L) {
      const B = this.getContext(v), j = o.setContext(B), Jt = a.setContext(B), te = j.lineWidth, St = j.color, ee = Jt.dash || [], Dt = Jt.dashOffset, At = j.tickWidth, dt = j.tickColor, It = j.tickBorderDash || [], ut = j.tickBorderDashOffset;
      y = ca(this, v, l), y !== void 0 && (_ = pt(s, y, te), c ? M = k = A = R = _ : w = D = I = X = _, u.push({
        tx1: M,
        ty1: w,
        tx2: k,
        ty2: D,
        x1: A,
        y1: I,
        x2: R,
        y2: X,
        width: te,
        color: St,
        borderDash: ee,
        borderDashOffset: Dt,
        tickWidth: At,
        tickColor: dt,
        tickBorderDash: It,
        tickBorderDashOffset: ut
      }));
    }
    return this._ticksLength = f, this._borderValue = x, u;
  }
  _computeLabelItems(t) {
    const e = this.axis, s = this.options, { position: n, ticks: o } = s, r = this.isHorizontal(), a = this.ticks, { align: l, crossAlign: c, padding: h, mirror: f } = o, d = Rt(s.grid), u = d + h, m = f ? -h : u, p = -xt(this.labelRotation), g = [];
    let b, x, v, y, _, M, w, k, D, A, I, R, X = "middle";
    if (n === "top")
      M = this.bottom - m, w = this._getXAxisLabelAlignment();
    else if (n === "bottom")
      M = this.top + m, w = this._getXAxisLabelAlignment();
    else if (n === "left") {
      const L = this._getYAxisLabelAlignment(d);
      w = L.textAlign, _ = L.x;
    } else if (n === "right") {
      const L = this._getYAxisLabelAlignment(d);
      w = L.textAlign, _ = L.x;
    } else if (e === "x") {
      if (n === "center")
        M = (t.top + t.bottom) / 2 + u;
      else if (P(n)) {
        const L = Object.keys(n)[0], B = n[L];
        M = this.chart.scales[L].getPixelForValue(B) + u;
      }
      w = this._getXAxisLabelAlignment();
    } else if (e === "y") {
      if (n === "center")
        _ = (t.left + t.right) / 2 - u;
      else if (P(n)) {
        const L = Object.keys(n)[0], B = n[L];
        _ = this.chart.scales[L].getPixelForValue(B);
      }
      w = this._getYAxisLabelAlignment(d).textAlign;
    }
    e === "y" && (l === "start" ? X = "top" : l === "end" && (X = "bottom"));
    const ot = this._getLabelSizes();
    for (b = 0, x = a.length; b < x; ++b) {
      v = a[b], y = v.label;
      const L = o.setContext(this.getContext(b));
      k = this.getPixelForTick(b) + o.labelOffset, D = this._resolveTickFontOptions(b), A = D.lineHeight, I = z(y) ? y.length : 1;
      const B = I / 2, j = L.color, Jt = L.textStrokeColor, te = L.textStrokeWidth;
      let St = w;
      r ? (_ = k, w === "inner" && (b === x - 1 ? St = this.options.reverse ? "left" : "right" : b === 0 ? St = this.options.reverse ? "right" : "left" : St = "center"), n === "top" ? c === "near" || p !== 0 ? R = -I * A + A / 2 : c === "center" ? R = -ot.highest.height / 2 - B * A + A : R = -ot.highest.height + A / 2 : c === "near" || p !== 0 ? R = A / 2 : c === "center" ? R = ot.highest.height / 2 - B * A : R = ot.highest.height - I * A, f && (R *= -1), p !== 0 && !L.showLabelBackdrop && (_ += A / 2 * Math.sin(p))) : (M = k, R = (1 - I) * A / 2);
      let ee;
      if (L.showLabelBackdrop) {
        const Dt = ft(L.backdropPadding), At = ot.heights[b], dt = ot.widths[b];
        let It = R - Dt.top, ut = 0 - Dt.left;
        switch (X) {
          case "middle":
            It -= At / 2;
            break;
          case "bottom":
            It -= At;
            break;
        }
        switch (w) {
          case "center":
            ut -= dt / 2;
            break;
          case "right":
            ut -= dt;
            break;
          case "inner":
            b === x - 1 ? ut -= dt : b > 0 && (ut -= dt / 2);
            break;
        }
        ee = {
          left: ut,
          top: It,
          width: dt + Dt.width,
          height: At + Dt.height,
          color: L.backdropColor
        };
      }
      g.push({
        label: y,
        font: D,
        textOffset: R,
        options: {
          rotation: p,
          color: j,
          strokeColor: Jt,
          strokeWidth: te,
          textAlign: St,
          textBaseline: X,
          translation: [
            _,
            M
          ],
          backdrop: ee
        }
      });
    }
    return g;
  }
  _getXAxisLabelAlignment() {
    const { position: t, ticks: e } = this.options;
    if (-xt(this.labelRotation))
      return t === "top" ? "left" : "right";
    let n = "center";
    return e.align === "start" ? n = "left" : e.align === "end" ? n = "right" : e.align === "inner" && (n = "inner"), n;
  }
  _getYAxisLabelAlignment(t) {
    const { position: e, ticks: { crossAlign: s, mirror: n, padding: o } } = this.options, r = this._getLabelSizes(), a = t + o, l = r.widest.width;
    let c, h;
    return e === "left" ? n ? (h = this.right + o, s === "near" ? c = "left" : s === "center" ? (c = "center", h += l / 2) : (c = "right", h += l)) : (h = this.right - a, s === "near" ? c = "right" : s === "center" ? (c = "center", h -= l / 2) : (c = "left", h = this.left)) : e === "right" ? n ? (h = this.left + o, s === "near" ? c = "right" : s === "center" ? (c = "center", h -= l / 2) : (c = "left", h -= l)) : (h = this.left + a, s === "near" ? c = "left" : s === "center" ? (c = "center", h += l / 2) : (c = "right", h = this.right)) : c = "right", {
      textAlign: c,
      x: h
    };
  }
  _computeLabelArea() {
    if (this.options.ticks.mirror)
      return;
    const t = this.chart, e = this.options.position;
    if (e === "left" || e === "right")
      return {
        top: 0,
        left: this.left,
        bottom: t.height,
        right: this.right
      };
    if (e === "top" || e === "bottom")
      return {
        top: this.top,
        left: 0,
        bottom: this.bottom,
        right: t.width
      };
  }
  drawBackground() {
    const { ctx: t, options: { backgroundColor: e }, left: s, top: n, width: o, height: r } = this;
    e && (t.save(), t.fillStyle = e, t.fillRect(s, n, o, r), t.restore());
  }
  getLineWidthForValue(t) {
    const e = this.options.grid;
    if (!this._isVisible() || !e.display)
      return 0;
    const n = this.ticks.findIndex((o) => o.value === t);
    return n >= 0 ? e.setContext(this.getContext(n)).lineWidth : 0;
  }
  drawGrid(t) {
    const e = this.options.grid, s = this.ctx, n = this._gridLineItems || (this._gridLineItems = this._computeGridLineItems(t));
    let o, r;
    const a = (l, c, h) => {
      !h.width || !h.color || (s.save(), s.lineWidth = h.width, s.strokeStyle = h.color, s.setLineDash(h.borderDash || []), s.lineDashOffset = h.borderDashOffset, s.beginPath(), s.moveTo(l.x, l.y), s.lineTo(c.x, c.y), s.stroke(), s.restore());
    };
    if (e.display)
      for (o = 0, r = n.length; o < r; ++o) {
        const l = n[o];
        e.drawOnChartArea && a({
          x: l.x1,
          y: l.y1
        }, {
          x: l.x2,
          y: l.y2
        }, l), e.drawTicks && a({
          x: l.tx1,
          y: l.ty1
        }, {
          x: l.tx2,
          y: l.ty2
        }, {
          color: l.tickColor,
          width: l.tickWidth,
          borderDash: l.tickBorderDash,
          borderDashOffset: l.tickBorderDashOffset
        });
      }
  }
  drawBorder() {
    const { chart: t, ctx: e, options: { border: s, grid: n } } = this, o = s.setContext(this.getContext()), r = s.display ? o.width : 0;
    if (!r)
      return;
    const a = n.setContext(this.getContext(0)).lineWidth, l = this._borderValue;
    let c, h, f, d;
    this.isHorizontal() ? (c = pt(t, this.left, r) - r / 2, h = pt(t, this.right, a) + a / 2, f = d = l) : (f = pt(t, this.top, r) - r / 2, d = pt(t, this.bottom, a) + a / 2, c = h = l), e.save(), e.lineWidth = o.width, e.strokeStyle = o.color, e.beginPath(), e.moveTo(c, f), e.lineTo(h, d), e.stroke(), e.restore();
  }
  drawLabels(t) {
    if (!this.options.ticks.display)
      return;
    const s = this.ctx, n = this._computeLabelArea();
    n && ai(s, n);
    const o = this.getLabelItems(t);
    for (const r of o) {
      const a = r.options, l = r.font, c = r.label, h = r.textOffset;
      Ii(s, c, 0, h, l, a);
    }
    n && li(s);
  }
  drawTitle() {
    const { ctx: t, options: { position: e, title: s, reverse: n } } = this;
    if (!s.display)
      return;
    const o = J(s.font), r = ft(s.padding), a = s.align;
    let l = o.lineHeight / 2;
    e === "bottom" || e === "center" || P(e) ? (l += r.bottom, z(s.text) && (l += o.lineHeight * (s.text.length - 1))) : l += r.top;
    const { titleX: c, titleY: h, maxWidth: f, rotation: d } = ga(this, l, e, a);
    Ii(t, s.text, 0, 0, o, {
      color: s.color,
      maxWidth: f,
      rotation: d,
      textAlign: ua(a, e, n),
      textBaseline: "middle",
      translation: [
        c,
        h
      ]
    });
  }
  draw(t) {
    this._isVisible() && (this.drawBackground(), this.drawGrid(t), this.drawBorder(), this.drawTitle(), this.drawLabels(t));
  }
  _layers() {
    const t = this.options, e = t.ticks && t.ticks.z || 0, s = C(t.grid && t.grid.z, -1), n = C(t.border && t.border.z, 0);
    return !this._isVisible() || this.draw !== Qt.prototype.draw ? [
      {
        z: e,
        draw: (o) => {
          this.draw(o);
        }
      }
    ] : [
      {
        z: s,
        draw: (o) => {
          this.drawBackground(), this.drawGrid(o), this.drawTitle();
        }
      },
      {
        z: n,
        draw: () => {
          this.drawBorder();
        }
      },
      {
        z: e,
        draw: (o) => {
          this.drawLabels(o);
        }
      }
    ];
  }
  getMatchingVisibleMetas(t) {
    const e = this.chart.getSortedVisibleDatasetMetas(), s = this.axis + "AxisID", n = [];
    let o, r;
    for (o = 0, r = e.length; o < r; ++o) {
      const a = e[o];
      a[s] === this.id && (!t || a.type === t) && n.push(a);
    }
    return n;
  }
  _resolveTickFontOptions(t) {
    const e = this.options.ticks.setContext(this.getContext(t));
    return J(e.font);
  }
  _maxDigits() {
    const t = this._resolveTickFontOptions(0).lineHeight;
    return (this.isHorizontal() ? this.width : this.height) / t;
  }
}
class de {
  constructor(t, e, s) {
    this.type = t, this.scope = e, this.override = s, this.items = /* @__PURE__ */ Object.create(null);
  }
  isForType(t) {
    return Object.prototype.isPrototypeOf.call(this.type.prototype, t.prototype);
  }
  register(t) {
    const e = Object.getPrototypeOf(t);
    let s;
    ba(e) && (s = this.register(e));
    const n = this.items, o = t.id, r = this.scope + "." + o;
    if (!o)
      throw new Error("class does not have id: " + t);
    return o in n || (n[o] = t, pa(t, r, s), this.override && E.override(t.id, t.overrides)), r;
  }
  get(t) {
    return this.items[t];
  }
  unregister(t) {
    const e = this.items, s = t.id, n = this.scope;
    s in e && delete e[s], n && s in E[n] && (delete E[n][s], this.override && delete wt[s]);
  }
}
function pa(i, t, e) {
  const s = Xt(/* @__PURE__ */ Object.create(null), [
    e ? E.get(e) : {},
    E.get(t),
    i.defaults
  ]);
  E.set(t, s), i.defaultRoutes && ma(t, i.defaultRoutes), i.descriptors && E.describe(t, i.descriptors);
}
function ma(i, t) {
  Object.keys(t).forEach((e) => {
    const s = e.split("."), n = s.pop(), o = [
      i
    ].concat(s).join("."), r = t[e].split("."), a = r.pop(), l = r.join(".");
    E.route(o, n, l, a);
  });
}
function ba(i) {
  return "id" in i && "defaults" in i;
}
class _a {
  constructor() {
    this.controllers = new de(Yt, "datasets", !0), this.elements = new de(kt, "elements"), this.plugins = new de(Object, "plugins"), this.scales = new de(Qt, "scales"), this._typedRegistries = [
      this.controllers,
      this.scales,
      this.elements
    ];
  }
  add(...t) {
    this._each("register", t);
  }
  remove(...t) {
    this._each("unregister", t);
  }
  addControllers(...t) {
    this._each("register", t, this.controllers);
  }
  addElements(...t) {
    this._each("register", t, this.elements);
  }
  addPlugins(...t) {
    this._each("register", t, this.plugins);
  }
  addScales(...t) {
    this._each("register", t, this.scales);
  }
  getController(t) {
    return this._get(t, this.controllers, "controller");
  }
  getElement(t) {
    return this._get(t, this.elements, "element");
  }
  getPlugin(t) {
    return this._get(t, this.plugins, "plugin");
  }
  getScale(t) {
    return this._get(t, this.scales, "scale");
  }
  removeControllers(...t) {
    this._each("unregister", t, this.controllers);
  }
  removeElements(...t) {
    this._each("unregister", t, this.elements);
  }
  removePlugins(...t) {
    this._each("unregister", t, this.plugins);
  }
  removeScales(...t) {
    this._each("unregister", t, this.scales);
  }
  _each(t, e, s) {
    [
      ...e
    ].forEach((n) => {
      const o = s || this._getRegistryForType(n);
      s || o.isForType(n) || o === this.plugins && n.id ? this._exec(t, o, n) : O(n, (r) => {
        const a = s || this._getRegistryForType(r);
        this._exec(t, a, r);
      });
    });
  }
  _exec(t, e, s) {
    const n = ni(t);
    F(s["before" + n], [], s), e[t](s), F(s["after" + n], [], s);
  }
  _getRegistryForType(t) {
    for (let e = 0; e < this._typedRegistries.length; e++) {
      const s = this._typedRegistries[e];
      if (s.isForType(t))
        return s;
    }
    return this.plugins;
  }
  _get(t, e, s) {
    const n = e.get(t);
    if (n === void 0)
      throw new Error('"' + t + '" is not a registered ' + s + ".");
    return n;
  }
}
var G = /* @__PURE__ */ new _a();
class xa {
  constructor() {
    this._init = void 0;
  }
  notify(t, e, s, n) {
    if (e === "beforeInit" && (this._init = this._createDescriptors(t, !0), this._notify(this._init, t, "install")), this._init === void 0)
      return;
    const o = n ? this._descriptors(t).filter(n) : this._descriptors(t), r = this._notify(o, t, e, s);
    return e === "afterDestroy" && (this._notify(o, t, "stop"), this._notify(this._init, t, "uninstall"), this._init = void 0), r;
  }
  _notify(t, e, s, n) {
    n = n || {};
    for (const o of t) {
      const r = o.plugin, a = r[s], l = [
        e,
        n,
        o.options
      ];
      if (F(a, l, r) === !1 && n.cancelable)
        return !1;
    }
    return !0;
  }
  invalidate() {
    T(this._cache) || (this._oldCache = this._cache, this._cache = void 0);
  }
  _descriptors(t) {
    if (this._cache)
      return this._cache;
    const e = this._cache = this._createDescriptors(t);
    return this._notifyStateChanges(t), e;
  }
  _createDescriptors(t, e) {
    const s = t && t.config, n = C(s.options && s.options.plugins, {}), o = ya(s);
    return n === !1 && !e ? [] : wa(t, o, n, e);
  }
  _notifyStateChanges(t) {
    const e = this._oldCache || [], s = this._cache, n = (o, r) => o.filter((a) => !r.some((l) => a.plugin.id === l.plugin.id));
    this._notify(n(e, s), t, "stop"), this._notify(n(s, e), t, "start");
  }
}
function ya(i) {
  const t = {}, e = [], s = Object.keys(G.plugins.items);
  for (let o = 0; o < s.length; o++)
    e.push(G.getPlugin(s[o]));
  const n = i.plugins || [];
  for (let o = 0; o < n.length; o++) {
    const r = n[o];
    e.indexOf(r) === -1 && (e.push(r), t[r.id] = !0);
  }
  return {
    plugins: e,
    localIds: t
  };
}
function va(i, t) {
  return !t && i === !1 ? null : i === !0 ? {} : i;
}
function wa(i, { plugins: t, localIds: e }, s, n) {
  const o = [], r = i.getContext();
  for (const a of t) {
    const l = a.id, c = va(s[l], n);
    c !== null && o.push({
      plugin: a,
      options: ka(i.config, {
        plugin: a,
        local: e[l]
      }, c, r)
    });
  }
  return o;
}
function ka(i, { plugin: t, local: e }, s, n) {
  const o = i.pluginScopeKeys(t), r = i.getOptionScopes(s, o);
  return e && t.defaults && r.push(t.defaults), i.createResolver(r, n, [
    ""
  ], {
    scriptable: !1,
    indexable: !1,
    allKeys: !0
  });
}
function qe(i, t) {
  const e = E.datasets[i] || {};
  return ((t.datasets || {})[i] || {}).indexAxis || t.indexAxis || e.indexAxis || "x";
}
function Ma(i, t) {
  let e = i;
  return i === "_index_" ? e = t : i === "_value_" && (e = t === "x" ? "y" : "x"), e;
}
function Sa(i, t) {
  return i === t ? "_index_" : "_value_";
}
function ss(i) {
  if (i === "x" || i === "y" || i === "r")
    return i;
}
function Da(i) {
  if (i === "top" || i === "bottom")
    return "x";
  if (i === "left" || i === "right")
    return "y";
}
function Ge(i, ...t) {
  if (ss(i))
    return i;
  for (const e of t) {
    const s = e.axis || Da(e.position) || i.length > 1 && ss(i[0].toLowerCase());
    if (s)
      return s;
  }
  throw new Error(`Cannot determine type of '${i}' axis. Please provide 'axis' or 'position' option.`);
}
function ns(i, t, e) {
  if (e[t + "AxisID"] === i)
    return {
      axis: t
    };
}
function Pa(i, t) {
  if (t.data && t.data.datasets) {
    const e = t.data.datasets.filter((s) => s.xAxisID === i || s.yAxisID === i);
    if (e.length)
      return ns(i, "x", e[0]) || ns(i, "y", e[0]);
  }
  return {};
}
function Oa(i, t) {
  const e = wt[i.type] || {
    scales: {}
  }, s = t.scales || {}, n = qe(i.type, t), o = /* @__PURE__ */ Object.create(null);
  return Object.keys(s).forEach((r) => {
    const a = s[r];
    if (!P(a))
      return console.error(`Invalid scale configuration for scale: ${r}`);
    if (a._proxy)
      return console.warn(`Ignoring resolver passed as options for scale: ${r}`);
    const l = Ge(r, a, Pa(r, i), E.scales[a.type]), c = Sa(l, n), h = e.scales || {};
    o[r] = Vt(/* @__PURE__ */ Object.create(null), [
      {
        axis: l
      },
      a,
      h[l],
      h[c]
    ]);
  }), i.data.datasets.forEach((r) => {
    const a = r.type || i.type, l = r.indexAxis || qe(a, t), h = (wt[a] || {}).scales || {};
    Object.keys(h).forEach((f) => {
      const d = Ma(f, l), u = r[d + "AxisID"] || d;
      o[u] = o[u] || /* @__PURE__ */ Object.create(null), Vt(o[u], [
        {
          axis: d
        },
        s[u],
        h[f]
      ]);
    });
  }), Object.keys(o).forEach((r) => {
    const a = o[r];
    Vt(a, [
      E.scales[a.type],
      E.scale
    ]);
  }), o;
}
function rn(i) {
  const t = i.options || (i.options = {});
  t.plugins = C(t.plugins, {}), t.scales = Oa(i, t);
}
function an(i) {
  return i = i || {}, i.datasets = i.datasets || [], i.labels = i.labels || [], i;
}
function Ca(i) {
  return i = i || {}, i.data = an(i.data), rn(i), i;
}
const os = /* @__PURE__ */ new Map(), ln = /* @__PURE__ */ new Set();
function ue(i, t) {
  let e = os.get(i);
  return e || (e = t(), os.set(i, e), ln.add(e)), e;
}
const zt = (i, t, e) => {
  const s = ke(t, e);
  s !== void 0 && i.add(s);
};
class Ta {
  constructor(t) {
    this._config = Ca(t), this._scopeCache = /* @__PURE__ */ new Map(), this._resolverCache = /* @__PURE__ */ new Map();
  }
  get platform() {
    return this._config.platform;
  }
  get type() {
    return this._config.type;
  }
  set type(t) {
    this._config.type = t;
  }
  get data() {
    return this._config.data;
  }
  set data(t) {
    this._config.data = an(t);
  }
  get options() {
    return this._config.options;
  }
  set options(t) {
    this._config.options = t;
  }
  get plugins() {
    return this._config.plugins;
  }
  update() {
    const t = this._config;
    this.clearCache(), rn(t);
  }
  clearCache() {
    this._scopeCache.clear(), this._resolverCache.clear();
  }
  datasetScopeKeys(t) {
    return ue(t, () => [
      [
        `datasets.${t}`,
        ""
      ]
    ]);
  }
  datasetAnimationScopeKeys(t, e) {
    return ue(`${t}.transition.${e}`, () => [
      [
        `datasets.${t}.transitions.${e}`,
        `transitions.${e}`
      ],
      [
        `datasets.${t}`,
        ""
      ]
    ]);
  }
  datasetElementScopeKeys(t, e) {
    return ue(`${t}-${e}`, () => [
      [
        `datasets.${t}.elements.${e}`,
        `datasets.${t}`,
        `elements.${e}`,
        ""
      ]
    ]);
  }
  pluginScopeKeys(t) {
    const e = t.id, s = this.type;
    return ue(`${s}-plugin-${e}`, () => [
      [
        `plugins.${e}`,
        ...t.additionalOptionScopes || []
      ]
    ]);
  }
  _cachedScopes(t, e) {
    const s = this._scopeCache;
    let n = s.get(t);
    return (!n || e) && (n = /* @__PURE__ */ new Map(), s.set(t, n)), n;
  }
  getOptionScopes(t, e, s) {
    const { options: n, type: o } = this, r = this._cachedScopes(t, s), a = r.get(e);
    if (a)
      return a;
    const l = /* @__PURE__ */ new Set();
    e.forEach((h) => {
      t && (l.add(t), h.forEach((f) => zt(l, t, f))), h.forEach((f) => zt(l, n, f)), h.forEach((f) => zt(l, wt[o] || {}, f)), h.forEach((f) => zt(l, E, f)), h.forEach((f) => zt(l, Xe, f));
    });
    const c = Array.from(l);
    return c.length === 0 && c.push(/* @__PURE__ */ Object.create(null)), ln.has(e) && r.set(e, c), c;
  }
  chartOptionScopes() {
    const { options: t, type: e } = this;
    return [
      t,
      wt[e] || {},
      E.datasets[e] || {},
      {
        type: e
      },
      E,
      Xe
    ];
  }
  resolveNamedOptions(t, e, s, n = [
    ""
  ]) {
    const o = {
      $shared: !0
    }, { resolver: r, subPrefixes: a } = rs(this._resolverCache, t, n);
    let l = r;
    if (Ia(r, e)) {
      o.$shared = !1, s = ht(s) ? s() : s;
      const c = this.createResolver(t, s, a);
      l = Ct(r, s, c);
    }
    for (const c of e)
      o[c] = l[c];
    return o;
  }
  createResolver(t, e, s = [
    ""
  ], n) {
    const { resolver: o } = rs(this._resolverCache, t, s);
    return P(e) ? Ct(o, e, void 0, n) : o;
  }
}
function rs(i, t, e) {
  let s = i.get(t);
  s || (s = /* @__PURE__ */ new Map(), i.set(t, s));
  const n = e.join();
  let o = s.get(n);
  return o || (o = {
    resolver: ci(t, e),
    subPrefixes: e.filter((a) => !a.toLowerCase().includes("hover"))
  }, s.set(n, o)), o;
}
const Aa = (i) => P(i) && Object.getOwnPropertyNames(i).some((t) => ht(i[t]));
function Ia(i, t) {
  const { isScriptable: e, isIndexable: s } = js(i);
  for (const n of t) {
    const o = e(n), r = s(n), a = (r || o) && i[n];
    if (o && (ht(a) || Aa(a)) || r && z(a))
      return !0;
  }
  return !1;
}
var La = "4.5.1";
const Fa = [
  "top",
  "bottom",
  "left",
  "right",
  "chartArea"
];
function as(i, t) {
  return i === "top" || i === "bottom" || Fa.indexOf(i) === -1 && t === "x";
}
function ls(i, t) {
  return function(e, s) {
    return e[i] === s[i] ? e[t] - s[t] : e[i] - s[i];
  };
}
function cs(i) {
  const t = i.chart, e = t.options.animation;
  t.notifyPlugins("afterRender"), F(e && e.onComplete, [
    i
  ], t);
}
function Ea(i) {
  const t = i.chart, e = t.options.animation;
  F(e && e.onProgress, [
    i
  ], t);
}
function cn(i) {
  return di() && typeof i == "string" ? i = document.getElementById(i) : i && i.length && (i = i[0]), i && i.canvas && (i = i.canvas), i;
}
const xe = {}, hs = (i) => {
  const t = cn(i);
  return Object.values(xe).filter((e) => e.canvas === t).pop();
};
function Ra(i, t, e) {
  const s = Object.keys(i);
  for (const n of s) {
    const o = +n;
    if (o >= t) {
      const r = i[n];
      delete i[n], (e > 0 || o > t) && (i[o + e] = r);
    }
  }
}
function za(i, t, e, s) {
  return !e || i.type === "mouseout" ? null : s ? t : i;
}
class Q {
  static register(...t) {
    G.add(...t), fs();
  }
  static unregister(...t) {
    G.remove(...t), fs();
  }
  constructor(t, e) {
    const s = this.config = new Ta(e), n = cn(t), o = hs(n);
    if (o)
      throw new Error("Canvas is already in use. Chart with ID '" + o.id + "' must be destroyed before the canvas with ID '" + o.canvas.id + "' can be reused.");
    const r = s.createResolver(s.chartOptionScopes(), this.getContext());
    this.platform = new (s.platform || ea(n))(), this.platform.updateConfig(s);
    const a = this.platform.acquireContext(n, r.aspectRatio), l = a && a.canvas, c = l && l.height, h = l && l.width;
    if (this.id = Nn(), this.ctx = a, this.canvas = l, this.width = h, this.height = c, this._options = r, this._aspectRatio = this.aspectRatio, this._layers = [], this._metasets = [], this._stacks = void 0, this.boxes = [], this.currentDevicePixelRatio = void 0, this.chartArea = void 0, this._active = [], this._lastEvent = void 0, this._listeners = {}, this._responsiveListeners = void 0, this._sortedMetasets = [], this.scales = {}, this._plugins = new xa(), this.$proxies = {}, this._hiddenIndices = {}, this.attached = !1, this._animationsDisabled = void 0, this.$context = void 0, this._doResize = ro((f) => this.update(f), r.resizeDelay || 0), this._dataChanges = [], xe[this.id] = this, !a || !l) {
      console.error("Failed to create chart: can't acquire context from the given item");
      return;
    }
    it.listen(this, "complete", cs), it.listen(this, "progress", Ea), this._initialize(), this.attached && this.update();
  }
  get aspectRatio() {
    const { options: { aspectRatio: t, maintainAspectRatio: e }, width: s, height: n, _aspectRatio: o } = this;
    return T(t) ? e && o ? o : n ? s / n : null : t;
  }
  get data() {
    return this.config.data;
  }
  set data(t) {
    this.config.data = t;
  }
  get options() {
    return this._options;
  }
  set options(t) {
    this.config.options = t;
  }
  get registry() {
    return G;
  }
  _initialize() {
    return this.notifyPlugins("beforeInit"), this.options.responsive ? this.resize() : Ri(this, this.options.devicePixelRatio), this.bindEvents(), this.notifyPlugins("afterInit"), this;
  }
  clear() {
    return Ai(this.canvas, this.ctx), this;
  }
  stop() {
    return it.stop(this), this;
  }
  resize(t, e) {
    it.running(this) ? this._resizeBeforeDraw = {
      width: t,
      height: e
    } : this._resize(t, e);
  }
  _resize(t, e) {
    const s = this.options, n = this.canvas, o = s.maintainAspectRatio && this.aspectRatio, r = this.platform.getMaximumSize(n, t, e, o), a = s.devicePixelRatio || this.platform.getDevicePixelRatio(), l = this.width ? "resize" : "attach";
    this.width = r.width, this.height = r.height, this._aspectRatio = this.aspectRatio, Ri(this, a, !0) && (this.notifyPlugins("resize", {
      size: r
    }), F(s.onResize, [
      this,
      r
    ], this), this.attached && this._doResize(l) && this.render());
  }
  ensureScalesHaveIDs() {
    const e = this.options.scales || {};
    O(e, (s, n) => {
      s.id = n;
    });
  }
  buildOrUpdateScales() {
    const t = this.options, e = t.scales, s = this.scales, n = Object.keys(s).reduce((r, a) => (r[a] = !1, r), {});
    let o = [];
    e && (o = o.concat(Object.keys(e).map((r) => {
      const a = e[r], l = Ge(r, a), c = l === "r", h = l === "x";
      return {
        options: a,
        dposition: c ? "chartArea" : h ? "bottom" : "left",
        dtype: c ? "radialLinear" : h ? "category" : "linear"
      };
    }))), O(o, (r) => {
      const a = r.options, l = a.id, c = Ge(l, a), h = C(a.type, r.dtype);
      (a.position === void 0 || as(a.position, c) !== as(r.dposition)) && (a.position = r.dposition), n[l] = !0;
      let f = null;
      if (l in s && s[l].type === h)
        f = s[l];
      else {
        const d = G.getScale(h);
        f = new d({
          id: l,
          type: h,
          ctx: this.ctx,
          chart: this
        }), s[f.id] = f;
      }
      f.init(a, t);
    }), O(n, (r, a) => {
      r || delete s[a];
    }), O(s, (r) => {
      he.configure(this, r, r.options), he.addBox(this, r);
    });
  }
  _updateMetasets() {
    const t = this._metasets, e = this.data.datasets.length, s = t.length;
    if (t.sort((n, o) => n.index - o.index), s > e) {
      for (let n = e; n < s; ++n)
        this._destroyDatasetMeta(n);
      t.splice(e, s - e);
    }
    this._sortedMetasets = t.slice(0).sort(ls("order", "index"));
  }
  _removeUnreferencedMetasets() {
    const { _metasets: t, data: { datasets: e } } = this;
    t.length > e.length && delete this._stacks, t.forEach((s, n) => {
      e.filter((o) => o === s._dataset).length === 0 && this._destroyDatasetMeta(n);
    });
  }
  buildOrUpdateControllers() {
    const t = [], e = this.data.datasets;
    let s, n;
    for (this._removeUnreferencedMetasets(), s = 0, n = e.length; s < n; s++) {
      const o = e[s];
      let r = this.getDatasetMeta(s);
      const a = o.type || this.config.type;
      if (r.type && r.type !== a && (this._destroyDatasetMeta(s), r = this.getDatasetMeta(s)), r.type = a, r.indexAxis = o.indexAxis || qe(a, this.options), r.order = o.order || 0, r.index = s, r.label = "" + o.label, r.visible = this.isDatasetVisible(s), r.controller)
        r.controller.updateIndex(s), r.controller.linkScales();
      else {
        const l = G.getController(a), { datasetElementType: c, dataElementType: h } = E.datasets[a];
        Object.assign(l, {
          dataElementType: G.getElement(h),
          datasetElementType: c && G.getElement(c)
        }), r.controller = new l(this, s), t.push(r.controller);
      }
    }
    return this._updateMetasets(), t;
  }
  _resetElements() {
    O(this.data.datasets, (t, e) => {
      this.getDatasetMeta(e).controller.reset();
    }, this);
  }
  reset() {
    this._resetElements(), this.notifyPlugins("reset");
  }
  update(t) {
    const e = this.config;
    e.update();
    const s = this._options = e.createResolver(e.chartOptionScopes(), this.getContext()), n = this._animationsDisabled = !s.animation;
    if (this._updateScales(), this._checkEventBindings(), this._updateHiddenIndices(), this._plugins.invalidate(), this.notifyPlugins("beforeUpdate", {
      mode: t,
      cancelable: !0
    }) === !1)
      return;
    const o = this.buildOrUpdateControllers();
    this.notifyPlugins("beforeElementsUpdate");
    let r = 0;
    for (let c = 0, h = this.data.datasets.length; c < h; c++) {
      const { controller: f } = this.getDatasetMeta(c), d = !n && o.indexOf(f) === -1;
      f.buildOrUpdateElements(d), r = Math.max(+f.getMaxOverflow(), r);
    }
    r = this._minPadding = s.layout.autoPadding ? r : 0, this._updateLayout(r), n || O(o, (c) => {
      c.reset();
    }), this._updateDatasets(t), this.notifyPlugins("afterUpdate", {
      mode: t
    }), this._layers.sort(ls("z", "_idx"));
    const { _active: a, _lastEvent: l } = this;
    l ? this._eventHandler(l, !0) : a.length && this._updateHoverStyles(a, a, !0), this.render();
  }
  _updateScales() {
    O(this.scales, (t) => {
      he.removeBox(this, t);
    }), this.ensureScalesHaveIDs(), this.buildOrUpdateScales();
  }
  _checkEventBindings() {
    const t = this.options, e = new Set(Object.keys(this._listeners)), s = new Set(t.events);
    (!yi(e, s) || !!this._responsiveListeners !== t.responsive) && (this.unbindEvents(), this.bindEvents());
  }
  _updateHiddenIndices() {
    const { _hiddenIndices: t } = this, e = this._getUniformDataChanges() || [];
    for (const { method: s, start: n, count: o } of e) {
      const r = s === "_removeElements" ? -o : o;
      Ra(t, n, r);
    }
  }
  _getUniformDataChanges() {
    const t = this._dataChanges;
    if (!t || !t.length)
      return;
    this._dataChanges = [];
    const e = this.data.datasets.length, s = (o) => new Set(t.filter((r) => r[0] === o).map((r, a) => a + "," + r.splice(1).join(","))), n = s(0);
    for (let o = 1; o < e; o++)
      if (!yi(n, s(o)))
        return;
    return Array.from(n).map((o) => o.split(",")).map((o) => ({
      method: o[1],
      start: +o[2],
      count: +o[3]
    }));
  }
  _updateLayout(t) {
    if (this.notifyPlugins("beforeLayout", {
      cancelable: !0
    }) === !1)
      return;
    he.update(this, this.width, this.height, t);
    const e = this.chartArea, s = e.width <= 0 || e.height <= 0;
    this._layers = [], O(this.boxes, (n) => {
      s && n.position === "chartArea" || (n.configure && n.configure(), this._layers.push(...n._layers()));
    }, this), this._layers.forEach((n, o) => {
      n._idx = o;
    }), this.notifyPlugins("afterLayout");
  }
  _updateDatasets(t) {
    if (this.notifyPlugins("beforeDatasetsUpdate", {
      mode: t,
      cancelable: !0
    }) !== !1) {
      for (let e = 0, s = this.data.datasets.length; e < s; ++e)
        this.getDatasetMeta(e).controller.configure();
      for (let e = 0, s = this.data.datasets.length; e < s; ++e)
        this._updateDataset(e, ht(t) ? t({
          datasetIndex: e
        }) : t);
      this.notifyPlugins("afterDatasetsUpdate", {
        mode: t
      });
    }
  }
  _updateDataset(t, e) {
    const s = this.getDatasetMeta(t), n = {
      meta: s,
      index: t,
      mode: e,
      cancelable: !0
    };
    this.notifyPlugins("beforeDatasetUpdate", n) !== !1 && (s.controller._update(e), n.cancelable = !1, this.notifyPlugins("afterDatasetUpdate", n));
  }
  render() {
    this.notifyPlugins("beforeRender", {
      cancelable: !0
    }) !== !1 && (it.has(this) ? this.attached && !it.running(this) && it.start(this) : (this.draw(), cs({
      chart: this
    })));
  }
  draw() {
    let t;
    if (this._resizeBeforeDraw) {
      const { width: s, height: n } = this._resizeBeforeDraw;
      this._resizeBeforeDraw = null, this._resize(s, n);
    }
    if (this.clear(), this.width <= 0 || this.height <= 0 || this.notifyPlugins("beforeDraw", {
      cancelable: !0
    }) === !1)
      return;
    const e = this._layers;
    for (t = 0; t < e.length && e[t].z <= 0; ++t)
      e[t].draw(this.chartArea);
    for (this._drawDatasets(); t < e.length; ++t)
      e[t].draw(this.chartArea);
    this.notifyPlugins("afterDraw");
  }
  _getSortedDatasetMetas(t) {
    const e = this._sortedMetasets, s = [];
    let n, o;
    for (n = 0, o = e.length; n < o; ++n) {
      const r = e[n];
      (!t || r.visible) && s.push(r);
    }
    return s;
  }
  getSortedVisibleDatasetMetas() {
    return this._getSortedDatasetMetas(!0);
  }
  _drawDatasets() {
    if (this.notifyPlugins("beforeDatasetsDraw", {
      cancelable: !0
    }) === !1)
      return;
    const t = this.getSortedVisibleDatasetMetas();
    for (let e = t.length - 1; e >= 0; --e)
      this._drawDataset(t[e]);
    this.notifyPlugins("afterDatasetsDraw");
  }
  _drawDataset(t) {
    const e = this.ctx, s = {
      meta: t,
      index: t.index,
      cancelable: !0
    }, n = Zs(this, t);
    this.notifyPlugins("beforeDatasetDraw", s) !== !1 && (n && ai(e, n), t.controller.draw(), n && li(e), s.cancelable = !1, this.notifyPlugins("afterDatasetDraw", s));
  }
  isPointInArea(t) {
    return qt(t, this.chartArea, this._minPadding);
  }
  getElementsAtEventForMode(t, e, s, n) {
    const o = Fr.modes[e];
    return typeof o == "function" ? o(this, t, s, n) : [];
  }
  getDatasetMeta(t) {
    const e = this.data.datasets[t], s = this._metasets;
    let n = s.filter((o) => o && o._dataset === e).pop();
    return n || (n = {
      type: null,
      data: [],
      dataset: null,
      controller: null,
      hidden: null,
      xAxisID: null,
      yAxisID: null,
      order: e && e.order || 0,
      index: t,
      _dataset: e,
      _parsed: [],
      _sorted: !1
    }, s.push(n)), n;
  }
  getContext() {
    return this.$context || (this.$context = Mt(null, {
      chart: this,
      type: "chart"
    }));
  }
  getVisibleDatasetCount() {
    return this.getSortedVisibleDatasetMetas().length;
  }
  isDatasetVisible(t) {
    const e = this.data.datasets[t];
    if (!e)
      return !1;
    const s = this.getDatasetMeta(t);
    return typeof s.hidden == "boolean" ? !s.hidden : !e.hidden;
  }
  setDatasetVisibility(t, e) {
    const s = this.getDatasetMeta(t);
    s.hidden = !e;
  }
  toggleDataVisibility(t) {
    this._hiddenIndices[t] = !this._hiddenIndices[t];
  }
  getDataVisibility(t) {
    return !this._hiddenIndices[t];
  }
  _updateVisibility(t, e, s) {
    const n = s ? "show" : "hide", o = this.getDatasetMeta(t), r = o.controller._resolveAnimations(void 0, n);
    Me(e) ? (o.data[e].hidden = !s, this.update()) : (this.setDatasetVisibility(t, s), r.update(o, {
      visible: s
    }), this.update((a) => a.datasetIndex === t ? n : void 0));
  }
  hide(t, e) {
    this._updateVisibility(t, e, !1);
  }
  show(t, e) {
    this._updateVisibility(t, e, !0);
  }
  _destroyDatasetMeta(t) {
    const e = this._metasets[t];
    e && e.controller && e.controller._destroy(), delete this._metasets[t];
  }
  _stop() {
    let t, e;
    for (this.stop(), it.remove(this), t = 0, e = this.data.datasets.length; t < e; ++t)
      this._destroyDatasetMeta(t);
  }
  destroy() {
    this.notifyPlugins("beforeDestroy");
    const { canvas: t, ctx: e } = this;
    this._stop(), this.config.clearCache(), t && (this.unbindEvents(), Ai(t, e), this.platform.releaseContext(e), this.canvas = null, this.ctx = null), delete xe[this.id], this.notifyPlugins("afterDestroy");
  }
  toBase64Image(...t) {
    return this.canvas.toDataURL(...t);
  }
  bindEvents() {
    this.bindUserEvents(), this.options.responsive ? this.bindResponsiveEvents() : this.attached = !0;
  }
  bindUserEvents() {
    const t = this._listeners, e = this.platform, s = (o, r) => {
      e.addEventListener(this, o, r), t[o] = r;
    }, n = (o, r, a) => {
      o.offsetX = r, o.offsetY = a, this._eventHandler(o);
    };
    O(this.options.events, (o) => s(o, n));
  }
  bindResponsiveEvents() {
    this._responsiveListeners || (this._responsiveListeners = {});
    const t = this._responsiveListeners, e = this.platform, s = (l, c) => {
      e.addEventListener(this, l, c), t[l] = c;
    }, n = (l, c) => {
      t[l] && (e.removeEventListener(this, l, c), delete t[l]);
    }, o = (l, c) => {
      this.canvas && this.resize(l, c);
    };
    let r;
    const a = () => {
      n("attach", a), this.attached = !0, this.resize(), s("resize", o), s("detach", r);
    };
    r = () => {
      this.attached = !1, n("resize", o), this._stop(), this._resize(0, 0), s("attach", a);
    }, e.isAttached(this.canvas) ? a() : r();
  }
  unbindEvents() {
    O(this._listeners, (t, e) => {
      this.platform.removeEventListener(this, e, t);
    }), this._listeners = {}, O(this._responsiveListeners, (t, e) => {
      this.platform.removeEventListener(this, e, t);
    }), this._responsiveListeners = void 0;
  }
  updateHoverStyle(t, e, s) {
    const n = s ? "set" : "remove";
    let o, r, a, l;
    for (e === "dataset" && (o = this.getDatasetMeta(t[0].datasetIndex), o.controller["_" + n + "DatasetHoverStyle"]()), a = 0, l = t.length; a < l; ++a) {
      r = t[a];
      const c = r && this.getDatasetMeta(r.datasetIndex).controller;
      c && c[n + "HoverStyle"](r.element, r.datasetIndex, r.index);
    }
  }
  getActiveElements() {
    return this._active || [];
  }
  setActiveElements(t) {
    const e = this._active || [], s = t.map(({ datasetIndex: o, index: r }) => {
      const a = this.getDatasetMeta(o);
      if (!a)
        throw new Error("No dataset found at index " + o);
      return {
        datasetIndex: o,
        element: a.data[r],
        index: r
      };
    });
    !ve(s, e) && (this._active = s, this._lastEvent = null, this._updateHoverStyles(s, e));
  }
  notifyPlugins(t, e, s) {
    return this._plugins.notify(this, t, e, s);
  }
  isPluginEnabled(t) {
    return this._plugins._cache.filter((e) => e.plugin.id === t).length === 1;
  }
  _updateHoverStyles(t, e, s) {
    const n = this.options.hover, o = (l, c) => l.filter((h) => !c.some((f) => h.datasetIndex === f.datasetIndex && h.index === f.index)), r = o(e, t), a = s ? t : o(t, e);
    r.length && this.updateHoverStyle(r, n.mode, !1), a.length && n.mode && this.updateHoverStyle(a, n.mode, !0);
  }
  _eventHandler(t, e) {
    const s = {
      event: t,
      replay: e,
      cancelable: !0,
      inChartArea: this.isPointInArea(t)
    }, n = (r) => (r.options.events || this.options.events).includes(t.native.type);
    if (this.notifyPlugins("beforeEvent", s, n) === !1)
      return;
    const o = this._handleEvent(t, e, s.inChartArea);
    return s.cancelable = !1, this.notifyPlugins("afterEvent", s, n), (o || s.changed) && this.render(), this;
  }
  _handleEvent(t, e, s) {
    const { _active: n = [], options: o } = this, r = e, a = this._getActiveElements(t, n, s, r), l = Yn(t), c = za(t, this._lastEvent, s, l);
    s && (this._lastEvent = null, F(o.onHover, [
      t,
      a,
      this
    ], this), l && F(o.onClick, [
      t,
      a,
      this
    ], this));
    const h = !ve(a, n);
    return (h || e) && (this._active = a, this._updateHoverStyles(a, n, e)), this._lastEvent = c, h;
  }
  _getActiveElements(t, e, s, n) {
    if (t.type === "mouseout")
      return [];
    if (!s)
      return e;
    const o = this.options.hover;
    return this.getElementsAtEventForMode(t, o.mode, o, n);
  }
}
S(Q, "defaults", E), S(Q, "instances", xe), S(Q, "overrides", wt), S(Q, "registry", G), S(Q, "version", La), S(Q, "getChart", hs);
function fs() {
  return O(Q.instances, (i) => i._plugins.invalidate());
}
function hn(i, t, e = t) {
  i.lineCap = C(e.borderCapStyle, t.borderCapStyle), i.setLineDash(C(e.borderDash, t.borderDash)), i.lineDashOffset = C(e.borderDashOffset, t.borderDashOffset), i.lineJoin = C(e.borderJoinStyle, t.borderJoinStyle), i.lineWidth = C(e.borderWidth, t.borderWidth), i.strokeStyle = C(e.borderColor, t.borderColor);
}
function Ba(i, t, e) {
  i.lineTo(e.x, e.y);
}
function Na(i) {
  return i.stepped ? wo : i.tension || i.cubicInterpolationMode === "monotone" ? ko : Ba;
}
function fn(i, t, e = {}) {
  const s = i.length, { start: n = 0, end: o = s - 1 } = e, { start: r, end: a } = t, l = Math.max(n, r), c = Math.min(o, a), h = n < r && o < r || n > a && o > a;
  return {
    count: s,
    start: l,
    loop: t.loop,
    ilen: c < l && !h ? s + c - l : c - l
  };
}
function Ha(i, t, e, s) {
  const { points: n, options: o } = t, { count: r, start: a, loop: l, ilen: c } = fn(n, e, s), h = Na(o);
  let { move: f = !0, reverse: d } = s || {}, u, m, p;
  for (u = 0; u <= c; ++u)
    m = n[(a + (d ? c - u : u)) % r], !m.skip && (f ? (i.moveTo(m.x, m.y), f = !1) : h(i, p, m, d, o.stepped), p = m);
  return l && (m = n[(a + (d ? c : 0)) % r], h(i, p, m, d, o.stepped)), !!l;
}
function Va(i, t, e, s) {
  const n = t.points, { count: o, start: r, ilen: a } = fn(n, e, s), { move: l = !0, reverse: c } = s || {};
  let h = 0, f = 0, d, u, m, p, g, b;
  const x = (y) => (r + (c ? a - y : y)) % o, v = () => {
    p !== g && (i.lineTo(h, g), i.lineTo(h, p), i.lineTo(h, b));
  };
  for (l && (u = n[x(0)], i.moveTo(u.x, u.y)), d = 0; d <= a; ++d) {
    if (u = n[x(d)], u.skip)
      continue;
    const y = u.x, _ = u.y, M = y | 0;
    M === m ? (_ < p ? p = _ : _ > g && (g = _), h = (f * h + y) / ++f) : (v(), i.lineTo(y, _), m = M, f = 0, p = g = _), b = _;
  }
  v();
}
function Ze(i) {
  const t = i.options, e = t.borderDash && t.borderDash.length;
  return !i._decimated && !i._loop && !t.tension && t.cubicInterpolationMode !== "monotone" && !t.stepped && !e ? Va : Ha;
}
function Wa(i) {
  return i.stepped ? ir : i.tension || i.cubicInterpolationMode === "monotone" ? sr : _t;
}
function ja(i, t, e, s) {
  let n = t._path;
  n || (n = t._path = new Path2D(), t.path(n, e, s) && n.closePath()), hn(i, t.options), i.stroke(n);
}
function $a(i, t, e, s) {
  const { segments: n, options: o } = t, r = Ze(t);
  for (const a of n)
    hn(i, o, a.style), i.beginPath(), r(i, t, a, {
      start: e,
      end: e + s - 1
    }) && i.closePath(), i.stroke();
}
const Ya = typeof Path2D == "function";
function Ua(i, t, e, s) {
  Ya && !t.options.segment ? ja(i, t, e, s) : $a(i, t, e, s);
}
class lt extends kt {
  constructor(t) {
    super(), this.animated = !0, this.options = void 0, this._chart = void 0, this._loop = void 0, this._fullLoop = void 0, this._path = void 0, this._points = void 0, this._segments = void 0, this._decimated = !1, this._pointsUpdated = !1, this._datasetIndex = void 0, t && Object.assign(this, t);
  }
  updateControlPoints(t, e) {
    const s = this.options;
    if ((s.tension || s.cubicInterpolationMode === "monotone") && !s.stepped && !this._pointsUpdated) {
      const n = s.spanGaps ? this._loop : this._fullLoop;
      Ko(this._points, s, t, n, e), this._pointsUpdated = !0;
    }
  }
  set points(t) {
    this._points = t, delete this._segments, delete this._path, this._pointsUpdated = !1;
  }
  get points() {
    return this._points;
  }
  get segments() {
    return this._segments || (this._segments = fr(this, this.options.segment));
  }
  first() {
    const t = this.segments, e = this.points;
    return t.length && e[t[0].start];
  }
  last() {
    const t = this.segments, e = this.points, s = t.length;
    return s && e[t[s - 1].end];
  }
  interpolate(t, e) {
    const s = this.options, n = t[e], o = this.points, r = Gs(this, {
      property: e,
      start: n,
      end: n
    });
    if (!r.length)
      return;
    const a = [], l = Wa(s);
    let c, h;
    for (c = 0, h = r.length; c < h; ++c) {
      const { start: f, end: d } = r[c], u = o[f], m = o[d];
      if (u === m) {
        a.push(u);
        continue;
      }
      const p = Math.abs((n - u[e]) / (m[e] - u[e])), g = l(u, m, p, s.stepped);
      g[e] = t[e], a.push(g);
    }
    return a.length === 1 ? a[0] : a;
  }
  pathSegment(t, e, s) {
    return Ze(this)(t, this, e, s);
  }
  path(t, e, s) {
    const n = this.segments, o = Ze(this);
    let r = this._loop;
    e = e || 0, s = s || this.points.length - e;
    for (const a of n)
      r &= o(t, this, a, {
        start: e,
        end: e + s - 1
      });
    return !!r;
  }
  draw(t, e, s, n) {
    const o = this.options || {};
    (this.points || []).length && o.borderWidth && (t.save(), Ua(t, this, s, n), t.restore()), this.animated && (this._pointsUpdated = !1, this._path = void 0);
  }
}
S(lt, "id", "line"), S(lt, "defaults", {
  borderCapStyle: "butt",
  borderDash: [],
  borderDashOffset: 0,
  borderJoinStyle: "miter",
  borderWidth: 3,
  capBezierPoints: !0,
  cubicInterpolationMode: "default",
  fill: !1,
  spanGaps: !1,
  stepped: !1,
  tension: 0
}), S(lt, "defaultRoutes", {
  backgroundColor: "backgroundColor",
  borderColor: "borderColor"
}), S(lt, "descriptors", {
  _scriptable: !0,
  _indexable: (t) => t !== "borderDash" && t !== "fill"
});
function ds(i, t, e, s) {
  const n = i.options, { [e]: o } = i.getProps([
    e
  ], s);
  return Math.abs(t - o) < n.radius + n.hitRadius;
}
class ye extends kt {
  constructor(e) {
    super();
    S(this, "parsed");
    S(this, "skip");
    S(this, "stop");
    this.options = void 0, this.parsed = void 0, this.skip = void 0, this.stop = void 0, e && Object.assign(this, e);
  }
  inRange(e, s, n) {
    const o = this.options, { x: r, y: a } = this.getProps([
      "x",
      "y"
    ], n);
    return Math.pow(e - r, 2) + Math.pow(s - a, 2) < Math.pow(o.hitRadius + o.radius, 2);
  }
  inXRange(e, s) {
    return ds(this, e, "x", s);
  }
  inYRange(e, s) {
    return ds(this, e, "y", s);
  }
  getCenterPoint(e) {
    const { x: s, y: n } = this.getProps([
      "x",
      "y"
    ], e);
    return {
      x: s,
      y: n
    };
  }
  size(e) {
    e = e || this.options || {};
    let s = e.radius || 0;
    s = Math.max(s, s && e.hoverRadius || 0);
    const n = s && e.borderWidth || 0;
    return (s + n) * 2;
  }
  draw(e, s) {
    const n = this.options;
    this.skip || n.radius < 0.1 || !qt(this, s, this.size(n) / 2) || (e.strokeStyle = n.borderColor, e.lineWidth = n.borderWidth, e.fillStyle = n.backgroundColor, Ke(e, n, this.x, this.y));
  }
  getRange() {
    const e = this.options || {};
    return e.radius + e.hitRadius;
  }
}
S(ye, "id", "point"), /**
* @type {any}
*/
S(ye, "defaults", {
  borderWidth: 1,
  hitRadius: 1,
  hoverBorderWidth: 1,
  hoverRadius: 4,
  pointStyle: "circle",
  radius: 3,
  rotation: 0
}), /**
* @type {any}
*/
S(ye, "defaultRoutes", {
  backgroundColor: "backgroundColor",
  borderColor: "borderColor"
});
function Xa(i, t, e) {
  const s = i.segments, n = i.points, o = t.points, r = [];
  for (const a of s) {
    let { start: l, end: c } = a;
    c = Ae(l, c, n);
    const h = Qe(e, n[l], n[c], a.loop);
    if (!t.segments) {
      r.push({
        source: a,
        target: h,
        start: n[l],
        end: n[c]
      });
      continue;
    }
    const f = Gs(t, h);
    for (const d of f) {
      const u = Qe(e, o[d.start], o[d.end], d.loop), m = qs(a, n, u);
      for (const p of m)
        r.push({
          source: p,
          target: d,
          start: {
            [e]: us(h, u, "start", Math.max)
          },
          end: {
            [e]: us(h, u, "end", Math.min)
          }
        });
    }
  }
  return r;
}
function Qe(i, t, e, s) {
  if (s)
    return;
  let n = t[i], o = e[i];
  return i === "angle" && (n = Z(n), o = Z(o)), {
    property: i,
    start: n,
    end: o
  };
}
function Ka(i, t) {
  const { x: e = null, y: s = null } = i || {}, n = t.points, o = [];
  return t.segments.forEach(({ start: r, end: a }) => {
    a = Ae(r, a, n);
    const l = n[r], c = n[a];
    s !== null ? (o.push({
      x: l.x,
      y: s
    }), o.push({
      x: c.x,
      y: s
    })) : e !== null && (o.push({
      x: e,
      y: l.y
    }), o.push({
      x: e,
      y: c.y
    }));
  }), o;
}
function Ae(i, t, e) {
  for (; t > i; t--) {
    const s = e[t];
    if (!isNaN(s.x) && !isNaN(s.y))
      break;
  }
  return t;
}
function us(i, t, e, s) {
  return i && t ? s(i[e], t[e]) : i ? i[e] : t ? t[e] : 0;
}
function dn(i, t) {
  let e = [], s = !1;
  return z(i) ? (s = !0, e = i) : e = Ka(i, t), e.length ? new lt({
    points: e,
    options: {
      tension: 0
    },
    _loop: s,
    _fullLoop: s
  }) : null;
}
function gs(i) {
  return i && i.fill !== !1;
}
function qa(i, t, e) {
  let n = i[t].fill;
  const o = [
    t
  ];
  let r;
  if (!e)
    return n;
  for (; n !== !1 && o.indexOf(n) === -1; ) {
    if (!H(n))
      return n;
    if (r = i[n], !r)
      return !1;
    if (r.visible)
      return n;
    o.push(n), n = r.fill;
  }
  return !1;
}
function Ga(i, t, e) {
  const s = tl(i);
  if (P(s))
    return isNaN(s.value) ? !1 : s;
  let n = parseFloat(s);
  return H(n) && Math.floor(n) === n ? Za(s[0], t, n, e) : [
    "origin",
    "start",
    "end",
    "stack",
    "shape"
  ].indexOf(s) >= 0 && s;
}
function Za(i, t, e, s) {
  return (i === "-" || i === "+") && (e = t + e), e === t || e < 0 || e >= s ? !1 : e;
}
function Qa(i, t) {
  let e = null;
  return i === "start" ? e = t.bottom : i === "end" ? e = t.top : P(i) ? e = t.getPixelForValue(i.value) : t.getBasePixel && (e = t.getBasePixel()), e;
}
function Ja(i, t, e) {
  let s;
  return i === "start" ? s = e : i === "end" ? s = t.options.reverse ? t.min : t.max : P(i) ? s = i.value : s = t.getBaseValue(), s;
}
function tl(i) {
  const t = i.options, e = t.fill;
  let s = C(e && e.target, e);
  return s === void 0 && (s = !!t.backgroundColor), s === !1 || s === null ? !1 : s === !0 ? "origin" : s;
}
function el(i) {
  const { scale: t, index: e, line: s } = i, n = [], o = s.segments, r = s.points, a = il(t, e);
  a.push(dn({
    x: null,
    y: t.bottom
  }, s));
  for (let l = 0; l < o.length; l++) {
    const c = o[l];
    for (let h = c.start; h <= c.end; h++)
      sl(n, r[h], a);
  }
  return new lt({
    points: n,
    options: {}
  });
}
function il(i, t) {
  const e = [], s = i.getMatchingVisibleMetas("line");
  for (let n = 0; n < s.length; n++) {
    const o = s[n];
    if (o.index === t)
      break;
    o.hidden || e.unshift(o.dataset);
  }
  return e;
}
function sl(i, t, e) {
  const s = [];
  for (let n = 0; n < e.length; n++) {
    const o = e[n], { first: r, last: a, point: l } = nl(o, t, "x");
    if (!(!l || r && a)) {
      if (r)
        s.unshift(l);
      else if (i.push(l), !a)
        break;
    }
  }
  i.push(...s);
}
function nl(i, t, e) {
  const s = i.interpolate(t, e);
  if (!s)
    return {};
  const n = s[e], o = i.segments, r = i.points;
  let a = !1, l = !1;
  for (let c = 0; c < o.length; c++) {
    const h = o[c], f = r[h.start][e], d = r[h.end][e];
    if (Rs(n, f, d)) {
      a = n === f, l = n === d;
      break;
    }
  }
  return {
    first: a,
    last: l,
    point: s
  };
}
class un {
  constructor(t) {
    this.x = t.x, this.y = t.y, this.radius = t.radius;
  }
  pathSegment(t, e, s) {
    const { x: n, y: o, radius: r } = this;
    return e = e || {
      start: 0,
      end: tt
    }, t.arc(n, o, r, e.end, e.start, !0), !s.bounds;
  }
  interpolate(t) {
    const { x: e, y: s, radius: n } = this, o = t.angle;
    return {
      x: e + Math.cos(o) * n,
      y: s + Math.sin(o) * n,
      angle: o
    };
  }
}
function ol(i) {
  const { chart: t, fill: e, line: s } = i;
  if (H(e))
    return rl(t, e);
  if (e === "stack")
    return el(i);
  if (e === "shape")
    return !0;
  const n = al(i);
  return n instanceof un ? n : dn(n, s);
}
function rl(i, t) {
  const e = i.getDatasetMeta(t);
  return e && i.isDatasetVisible(t) ? e.dataset : null;
}
function al(i) {
  return (i.scale || {}).getPointPositionForValue ? cl(i) : ll(i);
}
function ll(i) {
  const { scale: t = {}, fill: e } = i, s = Qa(e, t);
  if (H(s)) {
    const n = t.isHorizontal();
    return {
      x: n ? s : null,
      y: n ? null : s
    };
  }
  return null;
}
function cl(i) {
  const { scale: t, fill: e } = i, s = t.options, n = t.getLabels().length, o = s.reverse ? t.max : t.min, r = Ja(e, t, o), a = [];
  if (s.grid.circular) {
    const l = t.getPointPositionForValue(0, o);
    return new un({
      x: l.x,
      y: l.y,
      radius: t.getDistanceFromCenterForValue(r)
    });
  }
  for (let l = 0; l < n; ++l)
    a.push(t.getPointPositionForValue(l, r));
  return a;
}
function je(i, t, e) {
  const s = ol(t), { chart: n, index: o, line: r, scale: a, axis: l } = t, c = r.options, h = c.fill, f = c.backgroundColor, { above: d = f, below: u = f } = h || {}, m = n.getDatasetMeta(o), p = Zs(n, m);
  s && r.points.length && (ai(i, e), hl(i, {
    line: r,
    target: s,
    above: d,
    below: u,
    area: e,
    scale: a,
    axis: l,
    clip: p
  }), li(i));
}
function hl(i, t) {
  const { line: e, target: s, above: n, below: o, area: r, scale: a, clip: l } = t, c = e._loop ? "angle" : t.axis;
  i.save();
  let h = o;
  o !== n && (c === "x" ? (ps(i, s, r.top), $e(i, {
    line: e,
    target: s,
    color: n,
    scale: a,
    property: c,
    clip: l
  }), i.restore(), i.save(), ps(i, s, r.bottom)) : c === "y" && (ms(i, s, r.left), $e(i, {
    line: e,
    target: s,
    color: o,
    scale: a,
    property: c,
    clip: l
  }), i.restore(), i.save(), ms(i, s, r.right), h = n)), $e(i, {
    line: e,
    target: s,
    color: h,
    scale: a,
    property: c,
    clip: l
  }), i.restore();
}
function ps(i, t, e) {
  const { segments: s, points: n } = t;
  let o = !0, r = !1;
  i.beginPath();
  for (const a of s) {
    const { start: l, end: c } = a, h = n[l], f = n[Ae(l, c, n)];
    o ? (i.moveTo(h.x, h.y), o = !1) : (i.lineTo(h.x, e), i.lineTo(h.x, h.y)), r = !!t.pathSegment(i, a, {
      move: r
    }), r ? i.closePath() : i.lineTo(f.x, e);
  }
  i.lineTo(t.first().x, e), i.closePath(), i.clip();
}
function ms(i, t, e) {
  const { segments: s, points: n } = t;
  let o = !0, r = !1;
  i.beginPath();
  for (const a of s) {
    const { start: l, end: c } = a, h = n[l], f = n[Ae(l, c, n)];
    o ? (i.moveTo(h.x, h.y), o = !1) : (i.lineTo(e, h.y), i.lineTo(h.x, h.y)), r = !!t.pathSegment(i, a, {
      move: r
    }), r ? i.closePath() : i.lineTo(e, f.y);
  }
  i.lineTo(e, t.first().y), i.closePath(), i.clip();
}
function $e(i, t) {
  const { line: e, target: s, property: n, color: o, scale: r, clip: a } = t, l = Xa(e, s, n);
  for (const { source: c, target: h, start: f, end: d } of l) {
    const { style: { backgroundColor: u = o } = {} } = c, m = s !== !0;
    i.save(), i.fillStyle = u, fl(i, r, a, m && Qe(n, f, d)), i.beginPath();
    const p = !!e.pathSegment(i, c);
    let g;
    if (m) {
      p ? i.closePath() : bs(i, s, d, n);
      const b = !!s.pathSegment(i, h, {
        move: p,
        reverse: !0
      });
      g = p && b, g || bs(i, s, f, n);
    }
    i.closePath(), i.fill(g ? "evenodd" : "nonzero"), i.restore();
  }
}
function fl(i, t, e, s) {
  const n = t.chart.chartArea, { property: o, start: r, end: a } = s || {};
  if (o === "x" || o === "y") {
    let l, c, h, f;
    o === "x" ? (l = r, c = n.top, h = a, f = n.bottom) : (l = n.left, c = r, h = n.right, f = a), i.beginPath(), e && (l = Math.max(l, e.left), h = Math.min(h, e.right), c = Math.max(c, e.top), f = Math.min(f, e.bottom)), i.rect(l, c, h - l, f - c), i.clip();
  }
}
function bs(i, t, e, s) {
  const n = t.interpolate(e, s);
  n && i.lineTo(n.x, n.y);
}
var dl = {
  id: "filler",
  afterDatasetsUpdate(i, t, e) {
    const s = (i.data.datasets || []).length, n = [];
    let o, r, a, l;
    for (r = 0; r < s; ++r)
      o = i.getDatasetMeta(r), a = o.dataset, l = null, a && a.options && a instanceof lt && (l = {
        visible: i.isDatasetVisible(r),
        index: r,
        fill: Ga(a, r, s),
        chart: i,
        axis: o.controller.options.indexAxis,
        scale: o.vScale,
        line: a
      }), o.$filler = l, n.push(l);
    for (r = 0; r < s; ++r)
      l = n[r], !(!l || l.fill === !1) && (l.fill = qa(n, r, e.propagate));
  },
  beforeDraw(i, t, e) {
    const s = e.drawTime === "beforeDraw", n = i.getSortedVisibleDatasetMetas(), o = i.chartArea;
    for (let r = n.length - 1; r >= 0; --r) {
      const a = n[r].$filler;
      a && (a.line.updateControlPoints(o, a.axis), s && a.fill && je(i.ctx, a, o));
    }
  },
  beforeDatasetsDraw(i, t, e) {
    if (e.drawTime !== "beforeDatasetsDraw")
      return;
    const s = i.getSortedVisibleDatasetMetas();
    for (let n = s.length - 1; n >= 0; --n) {
      const o = s[n].$filler;
      gs(o) && je(i.ctx, o, i.chartArea);
    }
  },
  beforeDatasetDraw(i, t, e) {
    const s = t.meta.$filler;
    !gs(s) || e.drawTime !== "beforeDatasetDraw" || je(i.ctx, s, i.chartArea);
  },
  defaults: {
    propagate: !0,
    drawTime: "beforeDatasetDraw"
  }
};
const Ht = {
  average(i) {
    if (!i.length)
      return !1;
    let t, e, s = /* @__PURE__ */ new Set(), n = 0, o = 0;
    for (t = 0, e = i.length; t < e; ++t) {
      const a = i[t].element;
      if (a && a.hasValue()) {
        const l = a.tooltipPosition();
        s.add(l.x), n += l.y, ++o;
      }
    }
    return o === 0 || s.size === 0 ? !1 : {
      x: [
        ...s
      ].reduce((a, l) => a + l) / s.size,
      y: n / o
    };
  },
  nearest(i, t) {
    if (!i.length)
      return !1;
    let e = t.x, s = t.y, n = Number.POSITIVE_INFINITY, o, r, a;
    for (o = 0, r = i.length; o < r; ++o) {
      const l = i[o].element;
      if (l && l.hasValue()) {
        const c = l.getCenterPoint(), h = Ue(t, c);
        h < n && (n = h, a = l);
      }
    }
    if (a) {
      const l = a.tooltipPosition();
      e = l.x, s = l.y;
    }
    return {
      x: e,
      y: s
    };
  }
};
function q(i, t) {
  return t && (z(t) ? Array.prototype.push.apply(i, t) : i.push(t)), i;
}
function st(i) {
  return (typeof i == "string" || i instanceof String) && i.indexOf(`
`) > -1 ? i.split(`
`) : i;
}
function ul(i, t) {
  const { element: e, datasetIndex: s, index: n } = t, o = i.getDatasetMeta(s).controller, { label: r, value: a } = o.getLabelAndValue(n);
  return {
    chart: i,
    label: r,
    parsed: o.getParsed(n),
    raw: i.data.datasets[s].data[n],
    formattedValue: a,
    dataset: o.getDataset(),
    dataIndex: n,
    datasetIndex: s,
    element: e
  };
}
function _s(i, t) {
  const e = i.chart.ctx, { body: s, footer: n, title: o } = i, { boxWidth: r, boxHeight: a } = t, l = J(t.bodyFont), c = J(t.titleFont), h = J(t.footerFont), f = o.length, d = n.length, u = s.length, m = ft(t.padding);
  let p = m.height, g = 0, b = s.reduce((y, _) => y + _.before.length + _.lines.length + _.after.length, 0);
  if (b += i.beforeBody.length + i.afterBody.length, f && (p += f * c.lineHeight + (f - 1) * t.titleSpacing + t.titleMarginBottom), b) {
    const y = t.displayColors ? Math.max(a, l.lineHeight) : l.lineHeight;
    p += u * y + (b - u) * l.lineHeight + (b - 1) * t.bodySpacing;
  }
  d && (p += t.footerMarginTop + d * h.lineHeight + (d - 1) * t.footerSpacing);
  let x = 0;
  const v = function(y) {
    g = Math.max(g, e.measureText(y).width + x);
  };
  return e.save(), e.font = c.string, O(i.title, v), e.font = l.string, O(i.beforeBody.concat(i.afterBody), v), x = t.displayColors ? r + 2 + t.boxPadding : 0, O(s, (y) => {
    O(y.before, v), O(y.lines, v), O(y.after, v);
  }), x = 0, e.font = h.string, O(i.footer, v), e.restore(), g += m.width, {
    width: g,
    height: p
  };
}
function gl(i, t) {
  const { y: e, height: s } = t;
  return e < s / 2 ? "top" : e > i.height - s / 2 ? "bottom" : "center";
}
function pl(i, t, e, s) {
  const { x: n, width: o } = s, r = e.caretSize + e.caretPadding;
  if (i === "left" && n + o + r > t.width || i === "right" && n - o - r < 0)
    return !0;
}
function ml(i, t, e, s) {
  const { x: n, width: o } = e, { width: r, chartArea: { left: a, right: l } } = i;
  let c = "center";
  return s === "center" ? c = n <= (a + l) / 2 ? "left" : "right" : n <= o / 2 ? c = "left" : n >= r - o / 2 && (c = "right"), pl(c, i, t, e) && (c = "center"), c;
}
function xs(i, t, e) {
  const s = e.yAlign || t.yAlign || gl(i, e);
  return {
    xAlign: e.xAlign || t.xAlign || ml(i, t, e, s),
    yAlign: s
  };
}
function bl(i, t) {
  let { x: e, width: s } = i;
  return t === "right" ? e -= s : t === "center" && (e -= s / 2), e;
}
function _l(i, t, e) {
  let { y: s, height: n } = i;
  return t === "top" ? s += e : t === "bottom" ? s -= n + e : s -= n / 2, s;
}
function ys(i, t, e, s) {
  const { caretSize: n, caretPadding: o, cornerRadius: r } = i, { xAlign: a, yAlign: l } = e, c = n + o, { topLeft: h, topRight: f, bottomLeft: d, bottomRight: u } = me(r);
  let m = bl(t, a);
  const p = _l(t, l, c);
  return l === "center" ? a === "left" ? m += c : a === "right" && (m -= c) : a === "left" ? m -= Math.max(h, d) + n : a === "right" && (m += Math.max(f, u) + n), {
    x: U(m, 0, s.width - t.width),
    y: U(p, 0, s.height - t.height)
  };
}
function ge(i, t, e) {
  const s = ft(e.padding);
  return t === "center" ? i.x + i.width / 2 : t === "right" ? i.x + i.width - s.right : i.x + s.left;
}
function vs(i) {
  return q([], st(i));
}
function xl(i, t, e) {
  return Mt(i, {
    tooltip: t,
    tooltipItems: e,
    type: "tooltip"
  });
}
function ws(i, t) {
  const e = t && t.dataset && t.dataset.tooltip && t.dataset.tooltip.callbacks;
  return e ? i.override(e) : i;
}
const gn = {
  beforeTitle: et,
  title(i) {
    if (i.length > 0) {
      const t = i[0], e = t.chart.data.labels, s = e ? e.length : 0;
      if (this && this.options && this.options.mode === "dataset")
        return t.dataset.label || "";
      if (t.label)
        return t.label;
      if (s > 0 && t.dataIndex < s)
        return e[t.dataIndex];
    }
    return "";
  },
  afterTitle: et,
  beforeBody: et,
  beforeLabel: et,
  label(i) {
    if (this && this.options && this.options.mode === "dataset")
      return i.label + ": " + i.formattedValue || i.formattedValue;
    let t = i.dataset.label || "";
    t && (t += ": ");
    const e = i.formattedValue;
    return T(e) || (t += e), t;
  },
  labelColor(i) {
    const e = i.chart.getDatasetMeta(i.datasetIndex).controller.getStyle(i.dataIndex);
    return {
      borderColor: e.borderColor,
      backgroundColor: e.backgroundColor,
      borderWidth: e.borderWidth,
      borderDash: e.borderDash,
      borderDashOffset: e.borderDashOffset,
      borderRadius: 0
    };
  },
  labelTextColor() {
    return this.options.bodyColor;
  },
  labelPointStyle(i) {
    const e = i.chart.getDatasetMeta(i.datasetIndex).controller.getStyle(i.dataIndex);
    return {
      pointStyle: e.pointStyle,
      rotation: e.rotation
    };
  },
  afterLabel: et,
  afterBody: et,
  beforeFooter: et,
  footer: et,
  afterFooter: et
};
function V(i, t, e, s) {
  const n = i[t].call(e, s);
  return typeof n > "u" ? gn[t].call(e, s) : n;
}
class Je extends kt {
  constructor(t) {
    super(), this.opacity = 0, this._active = [], this._eventPosition = void 0, this._size = void 0, this._cachedAnimations = void 0, this._tooltipItems = [], this.$animations = void 0, this.$context = void 0, this.chart = t.chart, this.options = t.options, this.dataPoints = void 0, this.title = void 0, this.beforeBody = void 0, this.body = void 0, this.afterBody = void 0, this.footer = void 0, this.xAlign = void 0, this.yAlign = void 0, this.x = void 0, this.y = void 0, this.height = void 0, this.width = void 0, this.caretX = void 0, this.caretY = void 0, this.labelColors = void 0, this.labelPointStyles = void 0, this.labelTextColors = void 0;
  }
  initialize(t) {
    this.options = t, this._cachedAnimations = void 0, this.$context = void 0;
  }
  _resolveAnimations() {
    const t = this._cachedAnimations;
    if (t)
      return t;
    const e = this.chart, s = this.options.setContext(this.getContext()), n = s.enabled && e.options.animation && s.animations, o = new Qs(this.chart, n);
    return n._cacheable && (this._cachedAnimations = Object.freeze(o)), o;
  }
  getContext() {
    return this.$context || (this.$context = xl(this.chart.getContext(), this, this._tooltipItems));
  }
  getTitle(t, e) {
    const { callbacks: s } = e, n = V(s, "beforeTitle", this, t), o = V(s, "title", this, t), r = V(s, "afterTitle", this, t);
    let a = [];
    return a = q(a, st(n)), a = q(a, st(o)), a = q(a, st(r)), a;
  }
  getBeforeBody(t, e) {
    return vs(V(e.callbacks, "beforeBody", this, t));
  }
  getBody(t, e) {
    const { callbacks: s } = e, n = [];
    return O(t, (o) => {
      const r = {
        before: [],
        lines: [],
        after: []
      }, a = ws(s, o);
      q(r.before, st(V(a, "beforeLabel", this, o))), q(r.lines, V(a, "label", this, o)), q(r.after, st(V(a, "afterLabel", this, o))), n.push(r);
    }), n;
  }
  getAfterBody(t, e) {
    return vs(V(e.callbacks, "afterBody", this, t));
  }
  getFooter(t, e) {
    const { callbacks: s } = e, n = V(s, "beforeFooter", this, t), o = V(s, "footer", this, t), r = V(s, "afterFooter", this, t);
    let a = [];
    return a = q(a, st(n)), a = q(a, st(o)), a = q(a, st(r)), a;
  }
  _createItems(t) {
    const e = this._active, s = this.chart.data, n = [], o = [], r = [];
    let a = [], l, c;
    for (l = 0, c = e.length; l < c; ++l)
      a.push(ul(this.chart, e[l]));
    return t.filter && (a = a.filter((h, f, d) => t.filter(h, f, d, s))), t.itemSort && (a = a.sort((h, f) => t.itemSort(h, f, s))), O(a, (h) => {
      const f = ws(t.callbacks, h);
      n.push(V(f, "labelColor", this, h)), o.push(V(f, "labelPointStyle", this, h)), r.push(V(f, "labelTextColor", this, h));
    }), this.labelColors = n, this.labelPointStyles = o, this.labelTextColors = r, this.dataPoints = a, a;
  }
  update(t, e) {
    const s = this.options.setContext(this.getContext()), n = this._active;
    let o, r = [];
    if (!n.length)
      this.opacity !== 0 && (o = {
        opacity: 0
      });
    else {
      const a = Ht[s.position].call(this, n, this._eventPosition);
      r = this._createItems(s), this.title = this.getTitle(r, s), this.beforeBody = this.getBeforeBody(r, s), this.body = this.getBody(r, s), this.afterBody = this.getAfterBody(r, s), this.footer = this.getFooter(r, s);
      const l = this._size = _s(this, s), c = Object.assign({}, a, l), h = xs(this.chart, s, c), f = ys(s, c, h, this.chart);
      this.xAlign = h.xAlign, this.yAlign = h.yAlign, o = {
        opacity: 1,
        x: f.x,
        y: f.y,
        width: l.width,
        height: l.height,
        caretX: a.x,
        caretY: a.y
      };
    }
    this._tooltipItems = r, this.$context = void 0, o && this._resolveAnimations().update(this, o), t && s.external && s.external.call(this, {
      chart: this.chart,
      tooltip: this,
      replay: e
    });
  }
  drawCaret(t, e, s, n) {
    const o = this.getCaretPosition(t, s, n);
    e.lineTo(o.x1, o.y1), e.lineTo(o.x2, o.y2), e.lineTo(o.x3, o.y3);
  }
  getCaretPosition(t, e, s) {
    const { xAlign: n, yAlign: o } = this, { caretSize: r, cornerRadius: a } = s, { topLeft: l, topRight: c, bottomLeft: h, bottomRight: f } = me(a), { x: d, y: u } = t, { width: m, height: p } = e;
    let g, b, x, v, y, _;
    return o === "center" ? (y = u + p / 2, n === "left" ? (g = d, b = g - r, v = y + r, _ = y - r) : (g = d + m, b = g + r, v = y - r, _ = y + r), x = g) : (n === "left" ? b = d + Math.max(l, h) + r : n === "right" ? b = d + m - Math.max(c, f) - r : b = this.caretX, o === "top" ? (v = u, y = v - r, g = b - r, x = b + r) : (v = u + p, y = v + r, g = b + r, x = b - r), _ = v), {
      x1: g,
      x2: b,
      x3: x,
      y1: v,
      y2: y,
      y3: _
    };
  }
  drawTitle(t, e, s) {
    const n = this.title, o = n.length;
    let r, a, l;
    if (o) {
      const c = Re(s.rtl, this.x, this.width);
      for (t.x = ge(this, s.titleAlign, s), e.textAlign = c.textAlign(s.titleAlign), e.textBaseline = "middle", r = J(s.titleFont), a = s.titleSpacing, e.fillStyle = s.titleColor, e.font = r.string, l = 0; l < o; ++l)
        e.fillText(n[l], c.x(t.x), t.y + r.lineHeight / 2), t.y += r.lineHeight + a, l + 1 === o && (t.y += s.titleMarginBottom - a);
    }
  }
  _drawColorBox(t, e, s, n, o) {
    const r = this.labelColors[s], a = this.labelPointStyles[s], { boxHeight: l, boxWidth: c } = o, h = J(o.bodyFont), f = ge(this, "left", o), d = n.x(f), u = l < h.lineHeight ? (h.lineHeight - l) / 2 : 0, m = e.y + u;
    if (o.usePointStyle) {
      const p = {
        radius: Math.min(c, l) / 2,
        pointStyle: a.pointStyle,
        rotation: a.rotation,
        borderWidth: 1
      }, g = n.leftForLtr(d, c) + c / 2, b = m + l / 2;
      t.strokeStyle = o.multiKeyBackground, t.fillStyle = o.multiKeyBackground, Ke(t, p, g, b), t.strokeStyle = r.borderColor, t.fillStyle = r.backgroundColor, Ke(t, p, g, b);
    } else {
      t.lineWidth = P(r.borderWidth) ? Math.max(...Object.values(r.borderWidth)) : r.borderWidth || 1, t.strokeStyle = r.borderColor, t.setLineDash(r.borderDash || []), t.lineDashOffset = r.borderDashOffset || 0;
      const p = n.leftForLtr(d, c), g = n.leftForLtr(n.xPlus(d, 1), c - 2), b = me(r.borderRadius);
      Object.values(b).some((x) => x !== 0) ? (t.beginPath(), t.fillStyle = o.multiKeyBackground, Li(t, {
        x: p,
        y: m,
        w: c,
        h: l,
        radius: b
      }), t.fill(), t.stroke(), t.fillStyle = r.backgroundColor, t.beginPath(), Li(t, {
        x: g,
        y: m + 1,
        w: c - 2,
        h: l - 2,
        radius: b
      }), t.fill()) : (t.fillStyle = o.multiKeyBackground, t.fillRect(p, m, c, l), t.strokeRect(p, m, c, l), t.fillStyle = r.backgroundColor, t.fillRect(g, m + 1, c - 2, l - 2));
    }
    t.fillStyle = this.labelTextColors[s];
  }
  drawBody(t, e, s) {
    const { body: n } = this, { bodySpacing: o, bodyAlign: r, displayColors: a, boxHeight: l, boxWidth: c, boxPadding: h } = s, f = J(s.bodyFont);
    let d = f.lineHeight, u = 0;
    const m = Re(s.rtl, this.x, this.width), p = function(k) {
      e.fillText(k, m.x(t.x + u), t.y + d / 2), t.y += d + o;
    }, g = m.textAlign(r);
    let b, x, v, y, _, M, w;
    for (e.textAlign = r, e.textBaseline = "middle", e.font = f.string, t.x = ge(this, g, s), e.fillStyle = s.bodyColor, O(this.beforeBody, p), u = a && g !== "right" ? r === "center" ? c / 2 + h : c + 2 + h : 0, y = 0, M = n.length; y < M; ++y) {
      for (b = n[y], x = this.labelTextColors[y], e.fillStyle = x, O(b.before, p), v = b.lines, a && v.length && (this._drawColorBox(e, t, y, m, s), d = Math.max(f.lineHeight, l)), _ = 0, w = v.length; _ < w; ++_)
        p(v[_]), d = f.lineHeight;
      O(b.after, p);
    }
    u = 0, d = f.lineHeight, O(this.afterBody, p), t.y -= o;
  }
  drawFooter(t, e, s) {
    const n = this.footer, o = n.length;
    let r, a;
    if (o) {
      const l = Re(s.rtl, this.x, this.width);
      for (t.x = ge(this, s.footerAlign, s), t.y += s.footerMarginTop, e.textAlign = l.textAlign(s.footerAlign), e.textBaseline = "middle", r = J(s.footerFont), e.fillStyle = s.footerColor, e.font = r.string, a = 0; a < o; ++a)
        e.fillText(n[a], l.x(t.x), t.y + r.lineHeight / 2), t.y += r.lineHeight + s.footerSpacing;
    }
  }
  drawBackground(t, e, s, n) {
    const { xAlign: o, yAlign: r } = this, { x: a, y: l } = t, { width: c, height: h } = s, { topLeft: f, topRight: d, bottomLeft: u, bottomRight: m } = me(n.cornerRadius);
    e.fillStyle = n.backgroundColor, e.strokeStyle = n.borderColor, e.lineWidth = n.borderWidth, e.beginPath(), e.moveTo(a + f, l), r === "top" && this.drawCaret(t, e, s, n), e.lineTo(a + c - d, l), e.quadraticCurveTo(a + c, l, a + c, l + d), r === "center" && o === "right" && this.drawCaret(t, e, s, n), e.lineTo(a + c, l + h - m), e.quadraticCurveTo(a + c, l + h, a + c - m, l + h), r === "bottom" && this.drawCaret(t, e, s, n), e.lineTo(a + u, l + h), e.quadraticCurveTo(a, l + h, a, l + h - u), r === "center" && o === "left" && this.drawCaret(t, e, s, n), e.lineTo(a, l + f), e.quadraticCurveTo(a, l, a + f, l), e.closePath(), e.fill(), n.borderWidth > 0 && e.stroke();
  }
  _updateAnimationTarget(t) {
    const e = this.chart, s = this.$animations, n = s && s.x, o = s && s.y;
    if (n || o) {
      const r = Ht[t.position].call(this, this._active, this._eventPosition);
      if (!r)
        return;
      const a = this._size = _s(this, t), l = Object.assign({}, r, this._size), c = xs(e, t, l), h = ys(t, l, c, e);
      (n._to !== h.x || o._to !== h.y) && (this.xAlign = c.xAlign, this.yAlign = c.yAlign, this.width = a.width, this.height = a.height, this.caretX = r.x, this.caretY = r.y, this._resolveAnimations().update(this, h));
    }
  }
  _willRender() {
    return !!this.opacity;
  }
  draw(t) {
    const e = this.options.setContext(this.getContext());
    let s = this.opacity;
    if (!s)
      return;
    this._updateAnimationTarget(e);
    const n = {
      width: this.width,
      height: this.height
    }, o = {
      x: this.x,
      y: this.y
    };
    s = Math.abs(s) < 1e-3 ? 0 : s;
    const r = ft(e.padding), a = this.title.length || this.beforeBody.length || this.body.length || this.afterBody.length || this.footer.length;
    e.enabled && a && (t.save(), t.globalAlpha = s, this.drawBackground(o, t, n, e), rr(t, e.textDirection), o.y += r.top, this.drawTitle(o, t, e), this.drawBody(o, t, e), this.drawFooter(o, t, e), ar(t, e.textDirection), t.restore());
  }
  getActiveElements() {
    return this._active || [];
  }
  setActiveElements(t, e) {
    const s = this._active, n = t.map(({ datasetIndex: a, index: l }) => {
      const c = this.chart.getDatasetMeta(a);
      if (!c)
        throw new Error("Cannot find a dataset at index " + a);
      return {
        datasetIndex: a,
        element: c.data[l],
        index: l
      };
    }), o = !ve(s, n), r = this._positionChanged(n, e);
    (o || r) && (this._active = n, this._eventPosition = e, this._ignoreReplayEvents = !0, this.update(!0));
  }
  handleEvent(t, e, s = !0) {
    if (e && this._ignoreReplayEvents)
      return !1;
    this._ignoreReplayEvents = !1;
    const n = this.options, o = this._active || [], r = this._getActiveElements(t, o, e, s), a = this._positionChanged(r, t), l = e || !ve(r, o) || a;
    return l && (this._active = r, (n.enabled || n.external) && (this._eventPosition = {
      x: t.x,
      y: t.y
    }, this.update(!0, e))), l;
  }
  _getActiveElements(t, e, s, n) {
    const o = this.options;
    if (t.type === "mouseout")
      return [];
    if (!n)
      return e.filter((a) => this.chart.data.datasets[a.datasetIndex] && this.chart.getDatasetMeta(a.datasetIndex).controller.getParsed(a.index) !== void 0);
    const r = this.chart.getElementsAtEventForMode(t, o.mode, o, s);
    return o.reverse && r.reverse(), r;
  }
  _positionChanged(t, e) {
    const { caretX: s, caretY: n, options: o } = this, r = Ht[o.position].call(this, t, e);
    return r !== !1 && (s !== r.x || n !== r.y);
  }
}
S(Je, "positioners", Ht);
var yl = {
  id: "tooltip",
  _element: Je,
  positioners: Ht,
  afterInit(i, t, e) {
    e && (i.tooltip = new Je({
      chart: i,
      options: e
    }));
  },
  beforeUpdate(i, t, e) {
    i.tooltip && i.tooltip.initialize(e);
  },
  reset(i, t, e) {
    i.tooltip && i.tooltip.initialize(e);
  },
  afterDraw(i) {
    const t = i.tooltip;
    if (t && t._willRender()) {
      const e = {
        tooltip: t
      };
      if (i.notifyPlugins("beforeTooltipDraw", {
        ...e,
        cancelable: !0
      }) === !1)
        return;
      t.draw(i.ctx), i.notifyPlugins("afterTooltipDraw", e);
    }
  },
  afterEvent(i, t) {
    if (i.tooltip) {
      const e = t.replay;
      i.tooltip.handleEvent(t.event, e, t.inChartArea) && (t.changed = !0);
    }
  },
  defaults: {
    enabled: !0,
    external: null,
    position: "average",
    backgroundColor: "rgba(0,0,0,0.8)",
    titleColor: "#fff",
    titleFont: {
      weight: "bold"
    },
    titleSpacing: 2,
    titleMarginBottom: 6,
    titleAlign: "left",
    bodyColor: "#fff",
    bodySpacing: 2,
    bodyFont: {},
    bodyAlign: "left",
    footerColor: "#fff",
    footerSpacing: 2,
    footerMarginTop: 6,
    footerFont: {
      weight: "bold"
    },
    footerAlign: "left",
    padding: 6,
    caretPadding: 2,
    caretSize: 5,
    cornerRadius: 6,
    boxHeight: (i, t) => t.bodyFont.size,
    boxWidth: (i, t) => t.bodyFont.size,
    multiKeyBackground: "#fff",
    displayColors: !0,
    boxPadding: 0,
    borderColor: "rgba(0,0,0,0)",
    borderWidth: 0,
    animation: {
      duration: 400,
      easing: "easeOutQuart"
    },
    animations: {
      numbers: {
        type: "number",
        properties: [
          "x",
          "y",
          "width",
          "height",
          "caretX",
          "caretY"
        ]
      },
      opacity: {
        easing: "linear",
        duration: 200
      }
    },
    callbacks: gn
  },
  defaultRoutes: {
    bodyFont: "font",
    footerFont: "font",
    titleFont: "font"
  },
  descriptors: {
    _scriptable: (i) => i !== "filter" && i !== "itemSort" && i !== "external",
    _indexable: !1,
    callbacks: {
      _scriptable: !1,
      _indexable: !1
    },
    animation: {
      _fallback: !1
    },
    animations: {
      _fallback: "animation"
    }
  },
  additionalOptionScopes: [
    "interaction"
  ]
};
function vl(i, t) {
  const e = [], { bounds: n, step: o, min: r, max: a, precision: l, count: c, maxTicks: h, maxDigits: f, includeBounds: d } = i, u = o || 1, m = h - 1, { min: p, max: g } = t, b = !T(r), x = !T(a), v = !T(c), y = (g - p) / (f + 1);
  let _ = wi((g - p) / m / u) * u, M, w, k, D;
  if (_ < 1e-14 && !b && !x)
    return [
      {
        value: p
      },
      {
        value: g
      }
    ];
  D = Math.ceil(g / _) - Math.floor(p / _), D > m && (_ = wi(D * _ / m / u) * u), T(l) || (M = Math.pow(10, l), _ = Math.ceil(_ * M) / M), n === "ticks" ? (w = Math.floor(p / _) * _, k = Math.ceil(g / _) * _) : (w = p, k = g), b && x && o && Gn((a - r) / o, _ / 1e3) ? (D = Math.round(Math.min((a - r) / _, h)), _ = (a - r) / D, w = r, k = a) : v ? (w = b ? r : w, k = x ? a : k, D = c - 1, _ = (k - w) / D) : (D = (k - w) / _, Wt(D, Math.round(D), _ / 1e3) ? D = Math.round(D) : D = Math.ceil(D));
  const A = Math.max(ki(_), ki(w));
  M = Math.pow(10, T(l) ? A : l), w = Math.round(w * M) / M, k = Math.round(k * M) / M;
  let I = 0;
  for (b && (d && w !== r ? (e.push({
    value: r
  }), w < r && I++, Wt(Math.round((w + I * _) * M) / M, r, ks(r, y, i)) && I++) : w < r && I++); I < D; ++I) {
    const R = Math.round((w + I * _) * M) / M;
    if (x && R > a)
      break;
    e.push({
      value: R
    });
  }
  return x && d && k !== a ? e.length && Wt(e[e.length - 1].value, a, ks(a, y, i)) ? e[e.length - 1].value = a : e.push({
    value: a
  }) : (!x || k === a) && e.push({
    value: k
  }), e;
}
function ks(i, t, { horizontal: e, minRotation: s }) {
  const n = xt(s), o = (e ? Math.sin(n) : Math.cos(n)) || 1e-3, r = 0.75 * t * ("" + i).length;
  return Math.min(t / o, r);
}
class wl extends Qt {
  constructor(t) {
    super(t), this.start = void 0, this.end = void 0, this._startValue = void 0, this._endValue = void 0, this._valueRange = 0;
  }
  parse(t, e) {
    return T(t) || (typeof t == "number" || t instanceof Number) && !isFinite(+t) ? null : +t;
  }
  handleTickRangeOptions() {
    const { beginAtZero: t } = this.options, { minDefined: e, maxDefined: s } = this.getUserBounds();
    let { min: n, max: o } = this;
    const r = (l) => n = e ? n : l, a = (l) => o = s ? o : l;
    if (t) {
      const l = Ot(n), c = Ot(o);
      l < 0 && c < 0 ? a(0) : l > 0 && c > 0 && r(0);
    }
    if (n === o) {
      let l = o === 0 ? 1 : Math.abs(o * 0.05);
      a(o + l), t || r(n - l);
    }
    this.min = n, this.max = o;
  }
  getTickLimit() {
    const t = this.options.ticks;
    let { maxTicksLimit: e, stepSize: s } = t, n;
    return s ? (n = Math.ceil(this.max / s) - Math.floor(this.min / s) + 1, n > 1e3 && (console.warn(`scales.${this.id}.ticks.stepSize: ${s} would result generating up to ${n} ticks. Limiting to 1000.`), n = 1e3)) : (n = this.computeTickLimit(), e = e || 11), e && (n = Math.min(e, n)), n;
  }
  computeTickLimit() {
    return Number.POSITIVE_INFINITY;
  }
  buildTicks() {
    const t = this.options, e = t.ticks;
    let s = this.getTickLimit();
    s = Math.max(2, s);
    const n = {
      maxTicks: s,
      bounds: t.bounds,
      min: t.min,
      max: t.max,
      precision: e.precision,
      step: e.stepSize,
      count: e.count,
      maxDigits: this._maxDigits(),
      horizontal: this.isHorizontal(),
      minRotation: e.minRotation || 0,
      includeBounds: e.includeBounds !== !1
    }, o = this._range || this, r = vl(n, o);
    return t.bounds === "ticks" && Zn(r, this, "value"), t.reverse ? (r.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), r;
  }
  configure() {
    const t = this.ticks;
    let e = this.min, s = this.max;
    if (super.configure(), this.options.offset && t.length) {
      const n = (s - e) / Math.max(t.length - 1, 1) / 2;
      e -= n, s += n;
    }
    this._startValue = e, this._endValue = s, this._valueRange = s - e;
  }
  getLabelForValue(t) {
    return Hs(t, this.chart.options.locale, this.options.ticks.format);
  }
}
class ti extends wl {
  determineDataLimits() {
    const { min: t, max: e } = this.getMinMax(!0);
    this.min = H(t) ? t : 0, this.max = H(e) ? e : 1, this.handleTickRangeOptions();
  }
  computeTickLimit() {
    const t = this.isHorizontal(), e = t ? this.width : this.height, s = xt(this.options.ticks.minRotation), n = (t ? Math.sin(s) : Math.cos(s)) || 1e-3, o = this._resolveTickFontOptions(0);
    return Math.ceil(e / Math.min(40, o.lineHeight / n));
  }
  getPixelForValue(t) {
    return t === null ? NaN : this.getPixelForDecimal((t - this._startValue) / this._valueRange);
  }
  getValueForPixel(t) {
    return this._startValue + this.getDecimalForPixel(t) * this._valueRange;
  }
}
S(ti, "id", "linear"), S(ti, "defaults", {
  ticks: {
    callback: Vs.formatters.numeric
  }
});
const Ie = {
  millisecond: {
    common: !0,
    size: 1,
    steps: 1e3
  },
  second: {
    common: !0,
    size: 1e3,
    steps: 60
  },
  minute: {
    common: !0,
    size: 6e4,
    steps: 60
  },
  hour: {
    common: !0,
    size: 36e5,
    steps: 24
  },
  day: {
    common: !0,
    size: 864e5,
    steps: 30
  },
  week: {
    common: !1,
    size: 6048e5,
    steps: 4
  },
  month: {
    common: !0,
    size: 2628e6,
    steps: 12
  },
  quarter: {
    common: !1,
    size: 7884e6,
    steps: 4
  },
  year: {
    common: !0,
    size: 3154e7
  }
}, W = /* @__PURE__ */ Object.keys(Ie);
function Ms(i, t) {
  return i - t;
}
function Ss(i, t) {
  if (T(t))
    return null;
  const e = i._adapter, { parser: s, round: n, isoWeekday: o } = i._parseOpts;
  let r = t;
  return typeof s == "function" && (r = s(r)), H(r) || (r = typeof s == "string" ? e.parse(r, s) : e.parse(r)), r === null ? null : (n && (r = n === "week" && (Kt(o) || o === !0) ? e.startOf(r, "isoWeek", o) : e.startOf(r, n)), +r);
}
function Ds(i, t, e, s) {
  const n = W.length;
  for (let o = W.indexOf(i); o < n - 1; ++o) {
    const r = Ie[W[o]], a = r.steps ? r.steps : Number.MAX_SAFE_INTEGER;
    if (r.common && Math.ceil((e - t) / (a * r.size)) <= s)
      return W[o];
  }
  return W[n - 1];
}
function kl(i, t, e, s, n) {
  for (let o = W.length - 1; o >= W.indexOf(e); o--) {
    const r = W[o];
    if (Ie[r].common && i._adapter.diff(n, s, r) >= t - 1)
      return r;
  }
  return W[e ? W.indexOf(e) : 0];
}
function Ml(i) {
  for (let t = W.indexOf(i) + 1, e = W.length; t < e; ++t)
    if (Ie[W[t]].common)
      return W[t];
}
function Ps(i, t, e) {
  if (!e)
    i[t] = !0;
  else if (e.length) {
    const { lo: s, hi: n } = oi(e, t), o = e[s] >= t ? e[s] : e[n];
    i[o] = !0;
  }
}
function Sl(i, t, e, s) {
  const n = i._adapter, o = +n.startOf(t[0].value, s), r = t[t.length - 1].value;
  let a, l;
  for (a = o; a <= r; a = +n.add(a, 1, s))
    l = e[a], l >= 0 && (t[l].major = !0);
  return t;
}
function Os(i, t, e) {
  const s = [], n = {}, o = t.length;
  let r, a;
  for (r = 0; r < o; ++r)
    a = t[r], n[a] = r, s.push({
      value: a,
      major: !1
    });
  return o === 0 || !e ? s : Sl(i, s, n, e);
}
class Oe extends Qt {
  constructor(t) {
    super(t), this._cache = {
      data: [],
      labels: [],
      all: []
    }, this._unit = "day", this._majorUnit = void 0, this._offsets = {}, this._normalized = !1, this._parseOpts = void 0;
  }
  init(t, e = {}) {
    const s = t.time || (t.time = {}), n = this._adapter = new Cr._date(t.adapters.date);
    n.init(e), Vt(s.displayFormats, n.formats()), this._parseOpts = {
      parser: s.parser,
      round: s.round,
      isoWeekday: s.isoWeekday
    }, super.init(t), this._normalized = e.normalized;
  }
  parse(t, e) {
    return t === void 0 ? null : Ss(this, t);
  }
  beforeLayout() {
    super.beforeLayout(), this._cache = {
      data: [],
      labels: [],
      all: []
    };
  }
  determineDataLimits() {
    const t = this.options, e = this._adapter, s = t.time.unit || "day";
    let { min: n, max: o, minDefined: r, maxDefined: a } = this.getUserBounds();
    function l(c) {
      !r && !isNaN(c.min) && (n = Math.min(n, c.min)), !a && !isNaN(c.max) && (o = Math.max(o, c.max));
    }
    (!r || !a) && (l(this._getLabelBounds()), (t.bounds !== "ticks" || t.ticks.source !== "labels") && l(this.getMinMax(!1))), n = H(n) && !isNaN(n) ? n : +e.startOf(Date.now(), s), o = H(o) && !isNaN(o) ? o : +e.endOf(Date.now(), s) + 1, this.min = Math.min(n, o - 1), this.max = Math.max(n + 1, o);
  }
  _getLabelBounds() {
    const t = this.getLabelTimestamps();
    let e = Number.POSITIVE_INFINITY, s = Number.NEGATIVE_INFINITY;
    return t.length && (e = t[0], s = t[t.length - 1]), {
      min: e,
      max: s
    };
  }
  buildTicks() {
    const t = this.options, e = t.time, s = t.ticks, n = s.source === "labels" ? this.getLabelTimestamps() : this._generate();
    t.bounds === "ticks" && n.length && (this.min = this._userMin || n[0], this.max = this._userMax || n[n.length - 1]);
    const o = this.min, r = this.max, a = so(n, o, r);
    return this._unit = e.unit || (s.autoSkip ? Ds(e.minUnit, this.min, this.max, this._getLabelCapacity(o)) : kl(this, a.length, e.minUnit, this.min, this.max)), this._majorUnit = !s.major.enabled || this._unit === "year" ? void 0 : Ml(this._unit), this.initOffsets(n), t.reverse && a.reverse(), Os(this, a, this._majorUnit);
  }
  afterAutoSkip() {
    this.options.offsetAfterAutoskip && this.initOffsets(this.ticks.map((t) => +t.value));
  }
  initOffsets(t = []) {
    let e = 0, s = 0, n, o;
    this.options.offset && t.length && (n = this.getDecimalForValue(t[0]), t.length === 1 ? e = 1 - n : e = (this.getDecimalForValue(t[1]) - n) / 2, o = this.getDecimalForValue(t[t.length - 1]), t.length === 1 ? s = o : s = (o - this.getDecimalForValue(t[t.length - 2])) / 2);
    const r = t.length < 3 ? 0.5 : 0.25;
    e = U(e, 0, r), s = U(s, 0, r), this._offsets = {
      start: e,
      end: s,
      factor: 1 / (e + 1 + s)
    };
  }
  _generate() {
    const t = this._adapter, e = this.min, s = this.max, n = this.options, o = n.time, r = o.unit || Ds(o.minUnit, e, s, this._getLabelCapacity(e)), a = C(n.ticks.stepSize, 1), l = r === "week" ? o.isoWeekday : !1, c = Kt(l) || l === !0, h = {};
    let f = e, d, u;
    if (c && (f = +t.startOf(f, "isoWeek", l)), f = +t.startOf(f, c ? "day" : r), t.diff(s, e, r) > 1e5 * a)
      throw new Error(e + " and " + s + " are too far apart with stepSize of " + a + " " + r);
    const m = n.ticks.source === "data" && this.getDataTimestamps();
    for (d = f, u = 0; d < s; d = +t.add(d, a, r), u++)
      Ps(h, d, m);
    return (d === s || n.bounds === "ticks" || u === 1) && Ps(h, d, m), Object.keys(h).sort(Ms).map((p) => +p);
  }
  getLabelForValue(t) {
    const e = this._adapter, s = this.options.time;
    return s.tooltipFormat ? e.format(t, s.tooltipFormat) : e.format(t, s.displayFormats.datetime);
  }
  format(t, e) {
    const n = this.options.time.displayFormats, o = this._unit, r = e || n[o];
    return this._adapter.format(t, r);
  }
  _tickFormatFunction(t, e, s, n) {
    const o = this.options, r = o.ticks.callback;
    if (r)
      return F(r, [
        t,
        e,
        s
      ], this);
    const a = o.time.displayFormats, l = this._unit, c = this._majorUnit, h = l && a[l], f = c && a[c], d = s[e], u = c && f && d && d.major;
    return this._adapter.format(t, n || (u ? f : h));
  }
  generateTickLabels(t) {
    let e, s, n;
    for (e = 0, s = t.length; e < s; ++e)
      n = t[e], n.label = this._tickFormatFunction(n.value, e, t);
  }
  getDecimalForValue(t) {
    return t === null ? NaN : (t - this.min) / (this.max - this.min);
  }
  getPixelForValue(t) {
    const e = this._offsets, s = this.getDecimalForValue(t);
    return this.getPixelForDecimal((e.start + s) * e.factor);
  }
  getValueForPixel(t) {
    const e = this._offsets, s = this.getDecimalForPixel(t) / e.factor - e.end;
    return this.min + s * (this.max - this.min);
  }
  _getLabelSize(t) {
    const e = this.options.ticks, s = this.ctx.measureText(t).width, n = xt(this.isHorizontal() ? e.maxRotation : e.minRotation), o = Math.cos(n), r = Math.sin(n), a = this._resolveTickFontOptions(0).size;
    return {
      w: s * o + a * r,
      h: s * r + a * o
    };
  }
  _getLabelCapacity(t) {
    const e = this.options.time, s = e.displayFormats, n = s[e.unit] || s.millisecond, o = this._tickFormatFunction(t, 0, Os(this, [
      t
    ], this._majorUnit), n), r = this._getLabelSize(o), a = Math.floor(this.isHorizontal() ? this.width / r.w : this.height / r.h) - 1;
    return a > 0 ? a : 1;
  }
  getDataTimestamps() {
    let t = this._cache.data || [], e, s;
    if (t.length)
      return t;
    const n = this.getMatchingVisibleMetas();
    if (this._normalized && n.length)
      return this._cache.data = n[0].controller.getAllParsedValues(this);
    for (e = 0, s = n.length; e < s; ++e)
      t = t.concat(n[e].controller.getAllParsedValues(this));
    return this._cache.data = this.normalize(t);
  }
  getLabelTimestamps() {
    const t = this._cache.labels || [];
    let e, s;
    if (t.length)
      return t;
    const n = this.getLabels();
    for (e = 0, s = n.length; e < s; ++e)
      t.push(Ss(this, n[e]));
    return this._cache.labels = this._normalized ? t : this.normalize(t);
  }
  normalize(t) {
    return oo(t.sort(Ms));
  }
}
S(Oe, "id", "time"), S(Oe, "defaults", {
  bounds: "data",
  adapters: {},
  time: {
    parser: !1,
    unit: !1,
    round: !1,
    isoWeekday: !1,
    minUnit: "millisecond",
    displayFormats: {}
  },
  ticks: {
    source: "auto",
    callback: !1,
    major: {
      enabled: !1
    }
  }
});
function pe(i, t, e) {
  let s = 0, n = i.length - 1, o, r, a, l;
  e ? (t >= i[s].pos && t <= i[n].pos && ({ lo: s, hi: n } = yt(i, "pos", t)), { pos: o, time: a } = i[s], { pos: r, time: l } = i[n]) : (t >= i[s].time && t <= i[n].time && ({ lo: s, hi: n } = yt(i, "time", t)), { time: o, pos: a } = i[s], { time: r, pos: l } = i[n]);
  const c = r - o;
  return c ? a + (l - a) * (t - o) / c : a;
}
class Cs extends Oe {
  constructor(t) {
    super(t), this._table = [], this._minPos = void 0, this._tableRange = void 0;
  }
  initOffsets() {
    const t = this._getTimestampsForTable(), e = this._table = this.buildLookupTable(t);
    this._minPos = pe(e, this.min), this._tableRange = pe(e, this.max) - this._minPos, super.initOffsets(t);
  }
  buildLookupTable(t) {
    const { min: e, max: s } = this, n = [], o = [];
    let r, a, l, c, h;
    for (r = 0, a = t.length; r < a; ++r)
      c = t[r], c >= e && c <= s && n.push(c);
    if (n.length < 2)
      return [
        {
          time: e,
          pos: 0
        },
        {
          time: s,
          pos: 1
        }
      ];
    for (r = 0, a = n.length; r < a; ++r)
      h = n[r + 1], l = n[r - 1], c = n[r], Math.round((h + l) / 2) !== c && o.push({
        time: c,
        pos: r / (a - 1)
      });
    return o;
  }
  _generate() {
    const t = this.min, e = this.max;
    let s = super.getDataTimestamps();
    return (!s.includes(t) || !s.length) && s.splice(0, 0, t), (!s.includes(e) || s.length === 1) && s.push(e), s.sort((n, o) => n - o);
  }
  _getTimestampsForTable() {
    let t = this._cache.all || [];
    if (t.length)
      return t;
    const e = this.getDataTimestamps(), s = this.getLabelTimestamps();
    return e.length && s.length ? t = this.normalize(e.concat(s)) : t = e.length ? e : s, t = this._cache.all = t, t;
  }
  getDecimalForValue(t) {
    return (pe(this._table, t) - this._minPos) / this._tableRange;
  }
  getValueForPixel(t) {
    const e = this._offsets, s = this.getDecimalForPixel(t) / e.factor - e.end;
    return pe(this._table, s * this._tableRange + this._minPos, !0);
  }
}
S(Cs, "id", "timeseries"), S(Cs, "defaults", Oe.defaults);
Q.register(be, lt, ye, ti, yl, dl);
const Dl = {
  id: "crosshair",
  afterDraw(i) {
    const t = i.tooltip;
    if (!t || !t.getActiveElements().length) return;
    const e = i.ctx, n = t.getActiveElements()[0].element.x, o = i.scales.y.top, r = i.scales.y.bottom;
    e.save(), e.beginPath(), e.moveTo(n, o), e.lineTo(n, r), e.lineWidth = 2, e.strokeStyle = "#ff4444", e.stroke(), e.restore();
  }
};
Q.register(Dl);
class Pl extends HTMLElement {
  constructor() {
    super(...arguments), this.chart = null, this.canvas = null, this.chartData = null;
  }
  static get observedAttributes() {
    return ["data"];
  }
  connectedCallback() {
    this.setupDOM();
  }
  disconnectedCallback() {
    var t;
    (t = this.chart) == null || t.destroy();
  }
  attributeChangedCallback(t, e, s) {
    if (t === "data" && s) {
      try {
        this.chartData = JSON.parse(s);
      } catch {
        console.error("speed-chart: Invalid JSON data attribute");
        return;
      }
      this.canvas && this.renderChart();
    }
  }
  setupDOM() {
    const t = document.createElement("div");
    t.style.cssText = "background:#1a1d2e;border-radius:8px;padding:16px;position:relative;width:100%;", this.canvas = document.createElement("canvas"), t.appendChild(this.canvas), this.appendChild(t), this.chartData && this.renderChart();
  }
  renderChart() {
    var p;
    if (!this.canvas || !this.chartData) return;
    (p = this.chart) == null || p.destroy();
    const { drivers: t, sectors: e, maxSpeed: s } = this.chartData, n = t.flatMap((g) => g.points.map((b) => b.distance)), o = t.flatMap((g) => g.points.map((b) => b.speed)), r = this.chartData.maxDistance || Math.max(...n), a = s || Math.ceil(Math.max(...o) / 5) * 5, l = e.map((g) => ({
      distance: g.distance,
      label: g.label
    })), c = t.map((g) => ({
      label: g.name,
      data: g.points.map((b) => ({ x: b.distance, y: b.speed })),
      borderColor: g.color,
      backgroundColor: "transparent",
      borderWidth: 2,
      pointRadius: 0,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "transparent",
      pointHoverBorderColor: g.color,
      pointHoverBorderWidth: 2,
      tension: 0.3
    })), h = {
      id: "sectorLines",
      afterDraw(g) {
        const b = g.ctx, x = g.scales.x, v = g.scales.y;
        l.forEach((y) => {
          const _ = x.getPixelForValue(y.distance);
          b.save(), b.beginPath(), b.moveTo(_, v.top), b.lineTo(_, v.bottom), b.lineWidth = 1, b.strokeStyle = "rgba(255,255,255,0.15)", b.setLineDash([4, 4]), b.stroke(), b.setLineDash([]);
          const M = window.innerWidth < 600 ? 10 : 12;
          b.fillStyle = "#00e5ff", b.font = `bold ${M}px system-ui, sans-serif`, b.textAlign = "center", b.fillText(y.label, _, v.bottom + 20), b.restore();
        });
      }
    }, f = window.innerWidth < 600, d = {
      type: "line",
      data: { datasets: c },
      options: {
        responsive: !0,
        maintainAspectRatio: !1,
        animation: !1,
        interaction: {
          mode: "index",
          intersect: !1
        },
        scales: {
          x: {
            type: "linear",
            min: 0,
            max: r,
            title: {
              display: !1
            },
            grid: {
              color: "rgba(255,255,255,0.06)"
            },
            ticks: {
              display: !1
            },
            border: {
              color: "rgba(255,255,255,0.1)"
            }
          },
          y: {
            type: "linear",
            min: 0,
            max: a,
            title: {
              display: !f,
              text: "Speed km/h",
              color: "#ccc",
              font: { size: f ? 10 : 14, family: "system-ui, sans-serif" }
            },
            grid: {
              color: "rgba(255,255,255,0.06)"
            },
            ticks: {
              color: "#aaa",
              font: { size: f ? 9 : 11 },
              maxTicksLimit: f ? 4 : 8
            },
            border: {
              color: "rgba(255,255,255,0.1)"
            }
          }
        },
        plugins: {
          tooltip: {
            backgroundColor: "rgba(0,0,0,0.85)",
            titleColor: "#fff",
            bodyFont: { size: f ? 11 : 13 },
            titleFont: { size: f ? 11 : 13 },
            padding: f ? 8 : 12,
            cornerRadius: 6,
            displayColors: !1,
            callbacks: {
              title(g) {
                return g.length ? `Distance: ${g[0].parsed.x}m` : "";
              },
              label(g) {
                const b = g.parsed.y ?? 0;
                return `${g.dataset.label}: ${b.toFixed(2)}`;
              },
              labelTextColor(g) {
                return g.dataset.borderColor;
              }
            }
          },
          legend: {
            display: !1
          }
        },
        layout: {
          padding: { bottom: f ? 16 : 24, left: f ? 0 : 8 }
        }
      },
      plugins: [h]
    }, u = this.canvas.parentElement, m = this.getAttribute("height") || "400";
    u.style.height = m + "px", u.style.maxWidth = "100%", this.chart = new Q(this.canvas, d);
  }
}
customElements.define("speed-chart", Pl);
