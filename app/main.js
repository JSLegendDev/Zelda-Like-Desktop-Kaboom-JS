(() => {
  // node_modules/kaboom/dist/kaboom.mjs
  var Kt = Object.defineProperty;
  var to = (i, r, o) => r in i ? Kt(i, r, { enumerable: true, configurable: true, writable: true, value: o }) : i[r] = o;
  var l = (i, r) => Kt(i, "name", { value: r, configurable: true });
  var no = (i, r) => {
    for (var o in r)
      Kt(i, o, { get: r[o], enumerable: true });
  };
  var he = (i, r, o) => (to(i, typeof r != "symbol" ? r + "" : r, o), o);
  var ro = (() => {
    for (var i = new Uint8Array(128), r = 0; r < 64; r++)
      i[r < 26 ? r + 65 : r < 52 ? r + 71 : r < 62 ? r - 4 : r * 4 - 205] = r;
    return (o) => {
      for (var u = o.length, y = new Uint8Array((u - (o[u - 1] == "=") - (o[u - 2] == "=")) * 3 / 4 | 0), A = 0, N = 0; A < u; ) {
        var g = i[o.charCodeAt(A++)], B = i[o.charCodeAt(A++)], _ = i[o.charCodeAt(A++)], F = i[o.charCodeAt(A++)];
        y[N++] = g << 2 | B >> 4, y[N++] = B << 4 | _ >> 2, y[N++] = _ << 6 | F;
      }
      return y;
    };
  })();
  function be(i) {
    return i * Math.PI / 180;
  }
  l(be, "deg2rad");
  function Je(i) {
    return i * 180 / Math.PI;
  }
  l(Je, "rad2deg");
  function Me(i, r, o) {
    return r > o ? Me(i, o, r) : Math.min(Math.max(i, r), o);
  }
  l(Me, "clamp");
  function Se(i, r, o) {
    if (typeof i == "number" && typeof r == "number")
      return i + (r - i) * o;
    if (i instanceof v && r instanceof v)
      return i.lerp(r, o);
    if (i instanceof D && r instanceof D)
      return i.lerp(r, o);
    throw new Error(`Bad value for lerp(): ${i}, ${r}. Only number, Vec2 and Color is supported.`);
  }
  l(Se, "lerp");
  function Ct(i, r, o, u, y) {
    return u + (i - r) / (o - r) * (y - u);
  }
  l(Ct, "map");
  function Qn(i, r, o, u, y) {
    return Me(Ct(i, r, o, u, y), u, y);
  }
  l(Qn, "mapc");
  var oe = class {
    x = 0;
    y = 0;
    constructor(r = 0, o = r) {
      this.x = r, this.y = o;
    }
    static fromAngle(r) {
      let o = be(r);
      return new oe(Math.cos(o), Math.sin(o));
    }
    clone() {
      return new oe(this.x, this.y);
    }
    add(...r) {
      let o = U(...r);
      return new oe(this.x + o.x, this.y + o.y);
    }
    sub(...r) {
      let o = U(...r);
      return new oe(this.x - o.x, this.y - o.y);
    }
    scale(...r) {
      let o = U(...r);
      return new oe(this.x * o.x, this.y * o.y);
    }
    dist(...r) {
      let o = U(...r);
      return this.sub(o).len();
    }
    sdist(...r) {
      let o = U(...r);
      return this.sub(o).slen();
    }
    len() {
      return Math.sqrt(this.dot(this));
    }
    slen() {
      return this.dot(this);
    }
    unit() {
      let r = this.len();
      return r === 0 ? new oe(0) : this.scale(1 / r);
    }
    normal() {
      return new oe(this.y, -this.x);
    }
    reflect(r) {
      return this.sub(r.scale(2 * this.dot(r)));
    }
    project(r) {
      return r.scale(r.dot(this) / r.len());
    }
    reject(r) {
      return this.sub(this.project(r));
    }
    dot(r) {
      return this.x * r.x + this.y * r.y;
    }
    cross(r) {
      return this.x * r.y - this.y * r.x;
    }
    angle(...r) {
      let o = U(...r);
      return Je(Math.atan2(this.y - o.y, this.x - o.x));
    }
    angleBetween(...r) {
      let o = U(...r);
      return Je(Math.atan2(this.cross(o), this.dot(o)));
    }
    lerp(r, o) {
      return new oe(Se(this.x, r.x, o), Se(this.y, r.y, o));
    }
    slerp(r, o) {
      let u = this.dot(r), y = this.cross(r), A = Math.atan2(y, u);
      return this.scale(Math.sin((1 - o) * A)).add(r.scale(Math.sin(o * A))).scale(1 / y);
    }
    isZero() {
      return this.x === 0 && this.y === 0;
    }
    toFixed(r) {
      return new oe(Number(this.x.toFixed(r)), Number(this.y.toFixed(r)));
    }
    transform(r) {
      return r.multVec2(this);
    }
    eq(r) {
      return this.x === r.x && this.y === r.y;
    }
    bbox() {
      return new K(this, 0, 0);
    }
    toString() {
      return `vec2(${this.x.toFixed(2)}, ${this.y.toFixed(2)})`;
    }
  };
  var v = oe;
  l(v, "Vec2"), he(v, "LEFT", new oe(-1, 0)), he(v, "RIGHT", new oe(1, 0)), he(v, "UP", new oe(0, -1)), he(v, "DOWN", new oe(0, 1));
  function U(...i) {
    if (i.length === 1) {
      if (i[0] instanceof v)
        return new v(i[0].x, i[0].y);
      if (Array.isArray(i[0]) && i[0].length === 2)
        return new v(...i[0]);
    }
    return new v(...i);
  }
  l(U, "vec2");
  var ee = class {
    r = 255;
    g = 255;
    b = 255;
    constructor(r, o, u) {
      this.r = Me(r, 0, 255), this.g = Me(o, 0, 255), this.b = Me(u, 0, 255);
    }
    static fromArray(r) {
      return new ee(r[0], r[1], r[2]);
    }
    static fromHex(r) {
      if (typeof r == "number")
        return new ee(r >> 16 & 255, r >> 8 & 255, r >> 0 & 255);
      if (typeof r == "string") {
        let o = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(r);
        return new ee(parseInt(o[1], 16), parseInt(o[2], 16), parseInt(o[3], 16));
      } else
        throw new Error("Invalid hex color format");
    }
    static fromHSL(r, o, u) {
      if (o == 0)
        return new ee(255 * u, 255 * u, 255 * u);
      let y = l((F, k, $) => ($ < 0 && ($ += 1), $ > 1 && ($ -= 1), $ < 1 / 6 ? F + (k - F) * 6 * $ : $ < 1 / 2 ? k : $ < 2 / 3 ? F + (k - F) * (2 / 3 - $) * 6 : F), "hue2rgb"), A = u < 0.5 ? u * (1 + o) : u + o - u * o, N = 2 * u - A, g = y(N, A, r + 1 / 3), B = y(N, A, r), _ = y(N, A, r - 1 / 3);
      return new ee(Math.round(g * 255), Math.round(B * 255), Math.round(_ * 255));
    }
    clone() {
      return new ee(this.r, this.g, this.b);
    }
    lighten(r) {
      return new ee(this.r + r, this.g + r, this.b + r);
    }
    darken(r) {
      return this.lighten(-r);
    }
    invert() {
      return new ee(255 - this.r, 255 - this.g, 255 - this.b);
    }
    mult(r) {
      return new ee(this.r * r.r / 255, this.g * r.g / 255, this.b * r.b / 255);
    }
    lerp(r, o) {
      return new ee(Se(this.r, r.r, o), Se(this.g, r.g, o), Se(this.b, r.b, o));
    }
    eq(r) {
      return this.r === r.r && this.g === r.g && this.b === r.b;
    }
    toString() {
      return `rgb(${this.r}, ${this.g}, ${this.b})`;
    }
    toHex() {
      return "#" + ((1 << 24) + (this.r << 16) + (this.g << 8) + this.b).toString(16).slice(1);
    }
  };
  var D = ee;
  l(D, "Color"), he(D, "RED", new ee(255, 0, 0)), he(D, "GREEN", new ee(0, 255, 0)), he(D, "BLUE", new ee(0, 0, 255)), he(D, "YELLOW", new ee(255, 255, 0)), he(D, "MAGENTA", new ee(255, 0, 255)), he(D, "CYAN", new ee(0, 255, 255)), he(D, "WHITE", new ee(255, 255, 255)), he(D, "BLACK", new ee(0, 0, 0));
  function j(...i) {
    if (i.length === 0)
      return new D(255, 255, 255);
    if (i.length === 1) {
      if (i[0] instanceof D)
        return i[0].clone();
      if (typeof i[0] == "string")
        return D.fromHex(i[0]);
      if (Array.isArray(i[0]) && i[0].length === 3)
        return D.fromArray(i[0]);
    }
    return new D(...i);
  }
  l(j, "rgb");
  var Zn = l((i, r, o) => D.fromHSL(i, r, o), "hsl2rgb");
  var X = class {
    x = 0;
    y = 0;
    w = 1;
    h = 1;
    constructor(r, o, u, y) {
      this.x = r, this.y = o, this.w = u, this.h = y;
    }
    scale(r) {
      return new X(this.x + this.w * r.x, this.y + this.h * r.y, this.w * r.w, this.h * r.h);
    }
    pos() {
      return new v(this.x, this.y);
    }
    clone() {
      return new X(this.x, this.y, this.w, this.h);
    }
    eq(r) {
      return this.x === r.x && this.y === r.y && this.w === r.w && this.h === r.h;
    }
    toString() {
      return `quad(${this.x}, ${this.y}, ${this.w}, ${this.h})`;
    }
  };
  l(X, "Quad");
  function te(i, r, o, u) {
    return new X(i, r, o, u);
  }
  l(te, "quad");
  var Y = class {
    m = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    constructor(r) {
      r && (this.m = r);
    }
    static translate(r) {
      return new Y([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, r.x, r.y, 0, 1]);
    }
    static scale(r) {
      return new Y([r.x, 0, 0, 0, 0, r.y, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
    }
    static rotateX(r) {
      r = be(-r);
      let o = Math.cos(r), u = Math.sin(r);
      return new Y([1, 0, 0, 0, 0, o, -u, 0, 0, u, o, 0, 0, 0, 0, 1]);
    }
    static rotateY(r) {
      r = be(-r);
      let o = Math.cos(r), u = Math.sin(r);
      return new Y([o, 0, u, 0, 0, 1, 0, 0, -u, 0, o, 0, 0, 0, 0, 1]);
    }
    static rotateZ(r) {
      r = be(-r);
      let o = Math.cos(r), u = Math.sin(r);
      return new Y([o, -u, 0, 0, u, o, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
    }
    translate(r) {
      return this.m[12] += this.m[0] * r.x + this.m[4] * r.y, this.m[13] += this.m[1] * r.x + this.m[5] * r.y, this.m[14] += this.m[2] * r.x + this.m[6] * r.y, this.m[15] += this.m[3] * r.x + this.m[7] * r.y, this;
    }
    scale(r) {
      return this.m[0] *= r.x, this.m[4] *= r.y, this.m[1] *= r.x, this.m[5] *= r.y, this.m[2] *= r.x, this.m[6] *= r.y, this.m[3] *= r.x, this.m[7] *= r.y, this;
    }
    rotate(r) {
      r = be(-r);
      let o = Math.cos(r), u = Math.sin(r), y = this.m[0], A = this.m[1], N = this.m[4], g = this.m[5];
      return this.m[0] = y * o + A * u, this.m[1] = -y * u + A * o, this.m[4] = N * o + g * u, this.m[5] = -N * u + g * o, this;
    }
    mult(r) {
      let o = [];
      for (let u = 0; u < 4; u++)
        for (let y = 0; y < 4; y++)
          o[u * 4 + y] = this.m[0 * 4 + y] * r.m[u * 4 + 0] + this.m[1 * 4 + y] * r.m[u * 4 + 1] + this.m[2 * 4 + y] * r.m[u * 4 + 2] + this.m[3 * 4 + y] * r.m[u * 4 + 3];
      return new Y(o);
    }
    multVec2(r) {
      return new v(r.x * this.m[0] + r.y * this.m[4] + this.m[12], r.x * this.m[1] + r.y * this.m[5] + this.m[13]);
    }
    getTranslation() {
      return new v(this.m[12], this.m[13]);
    }
    getScale() {
      if (this.m[0] != 0 || this.m[1] != 0) {
        let r = this.m[0] * this.m[5] - this.m[1] * this.m[4], o = Math.sqrt(this.m[0] * this.m[0] + this.m[1] * this.m[1]);
        return new v(o, r / o);
      } else if (this.m[4] != 0 || this.m[5] != 0) {
        let r = this.m[0] * this.m[5] - this.m[1] * this.m[4], o = Math.sqrt(this.m[4] * this.m[4] + this.m[5] * this.m[5]);
        return new v(r / o, o);
      } else
        return new v(0, 0);
    }
    getRotation() {
      if (this.m[0] != 0 || this.m[1] != 0) {
        let r = Math.sqrt(this.m[0] * this.m[0] + this.m[1] * this.m[1]);
        return Je(this.m[1] > 0 ? Math.acos(this.m[0] / r) : -Math.acos(this.m[0] / r));
      } else if (this.m[4] != 0 || this.m[5] != 0) {
        let r = Math.sqrt(this.m[4] * this.m[4] + this.m[5] * this.m[5]);
        return Je(Math.PI / 2 - (this.m[5] > 0 ? Math.acos(-this.m[4] / r) : -Math.acos(this.m[4] / r)));
      } else
        return 0;
    }
    getSkew() {
      if (this.m[0] != 0 || this.m[1] != 0) {
        let r = Math.sqrt(this.m[0] * this.m[0] + this.m[1] * this.m[1]);
        return new v(Math.atan(this.m[0] * this.m[4] + this.m[1] * this.m[5]) / (r * r), 0);
      } else if (this.m[4] != 0 || this.m[5] != 0) {
        let r = Math.sqrt(this.m[4] * this.m[4] + this.m[5] * this.m[5]);
        return new v(0, Math.atan(this.m[0] * this.m[4] + this.m[1] * this.m[5]) / (r * r));
      } else
        return new v(0, 0);
    }
    invert() {
      let r = [], o = this.m[10] * this.m[15] - this.m[14] * this.m[11], u = this.m[9] * this.m[15] - this.m[13] * this.m[11], y = this.m[9] * this.m[14] - this.m[13] * this.m[10], A = this.m[8] * this.m[15] - this.m[12] * this.m[11], N = this.m[8] * this.m[14] - this.m[12] * this.m[10], g = this.m[8] * this.m[13] - this.m[12] * this.m[9], B = this.m[6] * this.m[15] - this.m[14] * this.m[7], _ = this.m[5] * this.m[15] - this.m[13] * this.m[7], F = this.m[5] * this.m[14] - this.m[13] * this.m[6], k = this.m[4] * this.m[15] - this.m[12] * this.m[7], $ = this.m[4] * this.m[14] - this.m[12] * this.m[6], P = this.m[5] * this.m[15] - this.m[13] * this.m[7], f = this.m[4] * this.m[13] - this.m[12] * this.m[5], ie = this.m[6] * this.m[11] - this.m[10] * this.m[7], we = this.m[5] * this.m[11] - this.m[9] * this.m[7], ht = this.m[5] * this.m[10] - this.m[9] * this.m[6], Ne = this.m[4] * this.m[11] - this.m[8] * this.m[7], _e = this.m[4] * this.m[10] - this.m[8] * this.m[6], dt = this.m[4] * this.m[9] - this.m[8] * this.m[5];
      r[0] = this.m[5] * o - this.m[6] * u + this.m[7] * y, r[4] = -(this.m[4] * o - this.m[6] * A + this.m[7] * N), r[8] = this.m[4] * u - this.m[5] * A + this.m[7] * g, r[12] = -(this.m[4] * y - this.m[5] * N + this.m[6] * g), r[1] = -(this.m[1] * o - this.m[2] * u + this.m[3] * y), r[5] = this.m[0] * o - this.m[2] * A + this.m[3] * N, r[9] = -(this.m[0] * u - this.m[1] * A + this.m[3] * g), r[13] = this.m[0] * y - this.m[1] * N + this.m[2] * g, r[2] = this.m[1] * B - this.m[2] * _ + this.m[3] * F, r[6] = -(this.m[0] * B - this.m[2] * k + this.m[3] * $), r[10] = this.m[0] * P - this.m[1] * k + this.m[3] * f, r[14] = -(this.m[0] * F - this.m[1] * $ + this.m[2] * f), r[3] = -(this.m[1] * ie - this.m[2] * we + this.m[3] * ht), r[7] = this.m[0] * ie - this.m[2] * Ne + this.m[3] * _e, r[11] = -(this.m[0] * we - this.m[1] * Ne + this.m[3] * dt), r[15] = this.m[0] * ht - this.m[1] * _e + this.m[2] * dt;
      let Dt = this.m[0] * r[0] + this.m[1] * r[4] + this.m[2] * r[8] + this.m[3] * r[12];
      for (let Ae = 0; Ae < 4; Ae++)
        for (let xe = 0; xe < 4; xe++)
          r[Ae * 4 + xe] *= 1 / Dt;
      return new Y(r);
    }
    clone() {
      return new Y([...this.m]);
    }
    toString() {
      return this.m.toString();
    }
  };
  l(Y, "Mat4");
  function Wt(i, r, o, u = Math.sin) {
    return i + (u(o) + 1) / 2 * (r - i);
  }
  l(Wt, "wave");
  var io = 1103515245;
  var so = 12345;
  var Wn = 2147483648;
  var Ke = class {
    seed;
    constructor(r) {
      this.seed = r;
    }
    gen() {
      return this.seed = (io * this.seed + so) % Wn, this.seed / Wn;
    }
    genNumber(r, o) {
      return r + this.gen() * (o - r);
    }
    genVec2(r, o) {
      return new v(this.genNumber(r.x, o.x), this.genNumber(r.y, o.y));
    }
    genColor(r, o) {
      return new D(this.genNumber(r.r, o.r), this.genNumber(r.g, o.g), this.genNumber(r.b, o.b));
    }
    genAny(...r) {
      if (r.length === 0)
        return this.gen();
      if (r.length === 1) {
        if (typeof r[0] == "number")
          return this.genNumber(0, r[0]);
        if (r[0] instanceof v)
          return this.genVec2(U(0, 0), r[0]);
        if (r[0] instanceof D)
          return this.genColor(j(0, 0, 0), r[0]);
      } else if (r.length === 2) {
        if (typeof r[0] == "number" && typeof r[1] == "number")
          return this.genNumber(r[0], r[1]);
        if (r[0] instanceof v && r[1] instanceof v)
          return this.genVec2(r[0], r[1]);
        if (r[0] instanceof D && r[1] instanceof D)
          return this.genColor(r[0], r[1]);
      }
    }
  };
  l(Ke, "RNG");
  var Jt = new Ke(Date.now());
  function er(i) {
    return i != null && (Jt.seed = i), Jt.seed;
  }
  l(er, "randSeed");
  function ut(...i) {
    return Jt.genAny(...i);
  }
  l(ut, "rand");
  function Qt(...i) {
    return Math.floor(ut(...i));
  }
  l(Qt, "randi");
  function tr(i) {
    return ut() <= i;
  }
  l(tr, "chance");
  function nr(i) {
    return i[Qt(i.length)];
  }
  l(nr, "choose");
  function rr(i, r) {
    return i.pos.x + i.width > r.pos.x && i.pos.x < r.pos.x + r.width && i.pos.y + i.height > r.pos.y && i.pos.y < r.pos.y + r.height;
  }
  l(rr, "testRectRect");
  function oo(i, r) {
    if (i.p1.x === i.p2.x && i.p1.y === i.p2.y || r.p1.x === r.p2.x && r.p1.y === r.p2.y)
      return null;
    let o = (r.p2.y - r.p1.y) * (i.p2.x - i.p1.x) - (r.p2.x - r.p1.x) * (i.p2.y - i.p1.y);
    if (o === 0)
      return null;
    let u = ((r.p2.x - r.p1.x) * (i.p1.y - r.p1.y) - (r.p2.y - r.p1.y) * (i.p1.x - r.p1.x)) / o, y = ((i.p2.x - i.p1.x) * (i.p1.y - r.p1.y) - (i.p2.y - i.p1.y) * (i.p1.x - r.p1.x)) / o;
    return u < 0 || u > 1 || y < 0 || y > 1 ? null : u;
  }
  l(oo, "testLineLineT");
  function Xe(i, r) {
    let o = oo(i, r);
    return o ? U(i.p1.x + o * (i.p2.x - i.p1.x), i.p1.y + o * (i.p2.y - i.p1.y)) : null;
  }
  l(Xe, "testLineLine");
  function ir(i, r) {
    if (We(i, r.p1) || We(i, r.p2))
      return true;
    let o = i.points();
    return !!Xe(r, new de(o[0], o[1])) || !!Xe(r, new de(o[1], o[2])) || !!Xe(r, new de(o[2], o[3])) || !!Xe(r, new de(o[3], o[0]));
  }
  l(ir, "testRectLine");
  function We(i, r) {
    return r.x > i.pos.x && r.x < i.pos.x + i.width && r.y > i.pos.y && r.y < i.pos.y + i.height;
  }
  l(We, "testRectPoint");
  function sr(i, r) {
    let o = r.sub(i.p1), u = i.p2.sub(i.p1);
    if (Math.abs(o.cross(u)) > Number.EPSILON)
      return false;
    let y = o.dot(u) / u.dot(u);
    return y >= 0 && y <= 1;
  }
  l(sr, "testLinePoint");
  function Zt(i, r) {
    let o = i.p2.sub(i.p1), u = o.dot(o), y = i.p1.sub(r.center), A = 2 * o.dot(y), N = y.dot(y) - r.radius * r.radius, g = A * A - 4 * u * N;
    if (u <= Number.EPSILON || g < 0)
      return false;
    if (g == 0) {
      let B = -A / (2 * u);
      if (B >= 0 && B <= 1)
        return true;
    } else {
      let B = (-A + Math.sqrt(g)) / (2 * u), _ = (-A - Math.sqrt(g)) / (2 * u);
      if (B >= 0 && B <= 1 || _ >= 0 && _ <= 1)
        return true;
    }
    return St(r, i.p1);
  }
  l(Zt, "testLineCircle");
  function St(i, r) {
    return i.center.sdist(r) < i.radius * i.radius;
  }
  l(St, "testCirclePoint");
  function or(i, r) {
    let o = r.pts[r.pts.length - 1];
    for (let u of r.pts) {
      if (Zt(new de(o, u), i))
        return true;
      o = u;
    }
    return St(i, r.pts[0]) ? true : en(r, i.center);
  }
  l(or, "testCirclePolygon");
  function en(i, r) {
    let o = false, u = i.pts;
    for (let y = 0, A = u.length - 1; y < u.length; A = y++)
      u[y].y > r.y != u[A].y > r.y && r.x < (u[A].x - u[y].x) * (r.y - u[y].y) / (u[A].y - u[y].y) + u[y].x && (o = !o);
    return o;
  }
  l(en, "testPolygonPoint");
  var de = class {
    p1;
    p2;
    constructor(r, o) {
      this.p1 = r.clone(), this.p2 = o.clone();
    }
    transform(r) {
      return new de(r.multVec2(this.p1), r.multVec2(this.p2));
    }
    bbox() {
      return K.fromPoints(this.p1, this.p2);
    }
    area() {
      return this.p1.dist(this.p2);
    }
    clone() {
      return new de(this.p1, this.p2);
    }
  };
  l(de, "Line");
  var K = class {
    pos;
    width;
    height;
    constructor(r, o, u) {
      this.pos = r.clone(), this.width = o, this.height = u;
    }
    static fromPoints(r, o) {
      return new K(r.clone(), o.x - r.x, o.y - r.y);
    }
    center() {
      return new v(this.pos.x + this.width / 2, this.pos.y + this.height / 2);
    }
    points() {
      return [this.pos, this.pos.add(this.width, 0), this.pos.add(this.width, this.height), this.pos.add(0, this.height)];
    }
    transform(r) {
      return new ge(this.points().map((o) => r.multVec2(o)));
    }
    bbox() {
      return this.clone();
    }
    area() {
      return this.width * this.height;
    }
    clone() {
      return new K(this.pos.clone(), this.width, this.height);
    }
    distToPoint(r) {
      return Math.sqrt(this.sdistToPoint(r));
    }
    sdistToPoint(r) {
      let o = this.pos, u = this.pos.add(this.width, this.height), y = Math.max(o.x - r.x, 0, r.x - u.x), A = Math.max(o.y - r.y, 0, r.y - u.y);
      return y * y + A * A;
    }
  };
  l(K, "Rect");
  var Te = class {
    center;
    radius;
    constructor(r, o) {
      this.center = r.clone(), this.radius = o;
    }
    transform(r) {
      return new Ie(this.center, this.radius, this.radius).transform(r);
    }
    bbox() {
      return K.fromPoints(this.center.sub(U(this.radius)), this.center.add(U(this.radius)));
    }
    area() {
      return this.radius * this.radius * Math.PI;
    }
    clone() {
      return new Te(this.center, this.radius);
    }
  };
  l(Te, "Circle");
  var Ie = class {
    center;
    radiusX;
    radiusY;
    constructor(r, o, u) {
      this.center = r.clone(), this.radiusX = o, this.radiusY = u;
    }
    transform(r) {
      return new Ie(r.multVec2(this.center), r.m[0] * this.radiusX, r.m[5] * this.radiusY);
    }
    bbox() {
      return K.fromPoints(this.center.sub(U(this.radiusX, this.radiusY)), this.center.add(U(this.radiusX, this.radiusY)));
    }
    area() {
      return this.radiusX * this.radiusY * Math.PI;
    }
    clone() {
      return new Ie(this.center, this.radiusX, this.radiusY);
    }
  };
  l(Ie, "Ellipse");
  var ge = class {
    pts;
    constructor(r) {
      if (r.length < 3)
        throw new Error("Polygons should have at least 3 vertices");
      this.pts = r;
    }
    transform(r) {
      return new ge(this.pts.map((o) => r.multVec2(o)));
    }
    bbox() {
      let r = U(Number.MAX_VALUE), o = U(-Number.MAX_VALUE);
      for (let u of this.pts)
        r.x = Math.min(r.x, u.x), o.x = Math.max(o.x, u.x), r.y = Math.min(r.y, u.y), o.y = Math.max(o.y, u.y);
      return K.fromPoints(r, o);
    }
    area() {
      let r = 0, o = this.pts.length;
      for (let u = 0; u < o; u++) {
        let y = this.pts[u], A = this.pts[(u + 1) % o];
        r += y.x * A.y * 0.5, r -= A.x * y.y * 0.5;
      }
      return Math.abs(r);
    }
    clone() {
      return new ge(this.pts.map((r) => r.clone()));
    }
  };
  l(ge, "Polygon");
  function ar(i, r) {
    let o = Number.MAX_VALUE, u = U(0);
    for (let y of [i, r])
      for (let A = 0; A < y.pts.length; A++) {
        let N = y.pts[A], B = y.pts[(A + 1) % y.pts.length].sub(N).normal().unit(), _ = Number.MAX_VALUE, F = -Number.MAX_VALUE;
        for (let f = 0; f < i.pts.length; f++) {
          let ie = i.pts[f].dot(B);
          _ = Math.min(_, ie), F = Math.max(F, ie);
        }
        let k = Number.MAX_VALUE, $ = -Number.MAX_VALUE;
        for (let f = 0; f < r.pts.length; f++) {
          let ie = r.pts[f].dot(B);
          k = Math.min(k, ie), $ = Math.max($, ie);
        }
        let P = Math.min(F, $) - Math.max(_, k);
        if (P < 0)
          return null;
        if (P < Math.abs(o)) {
          let f = $ - _, ie = k - F;
          o = Math.abs(f) < Math.abs(ie) ? f : ie, u = B.scale(o);
        }
      }
    return u;
  }
  l(ar, "sat");
  var Tt = 2.5949095;
  var ur = 1.70158 + 1;
  var cr = 2 * Math.PI / 3;
  var lr = 2 * Math.PI / 4.5;
  var At = { linear: (i) => i, easeInSine: (i) => 1 - Math.cos(i * Math.PI / 2), easeOutSine: (i) => Math.sin(i * Math.PI / 2), easeInOutSine: (i) => -(Math.cos(Math.PI * i) - 1) / 2, easeInQuad: (i) => i * i, easeOutQuad: (i) => 1 - (1 - i) * (1 - i), easeInOutQuad: (i) => i < 0.5 ? 2 * i * i : 1 - Math.pow(-2 * i + 2, 2) / 2, easeInCubic: (i) => i * i * i, easeOutCubic: (i) => 1 - Math.pow(1 - i, 3), easeInOutCubic: (i) => i < 0.5 ? 4 * i * i * i : 1 - Math.pow(-2 * i + 2, 3) / 2, easeInQuart: (i) => i * i * i * i, easeOutQuart: (i) => 1 - Math.pow(1 - i, 4), easeInOutQuart: (i) => i < 0.5 ? 8 * i * i * i * i : 1 - Math.pow(-2 * i + 2, 4) / 2, easeInQuint: (i) => i * i * i * i * i, easeOutQuint: (i) => 1 - Math.pow(1 - i, 5), easeInOutQuint: (i) => i < 0.5 ? 16 * i * i * i * i * i : 1 - Math.pow(-2 * i + 2, 5) / 2, easeInExpo: (i) => i === 0 ? 0 : Math.pow(2, 10 * i - 10), easeOutExpo: (i) => i === 1 ? 1 : 1 - Math.pow(2, -10 * i), easeInOutExpo: (i) => i === 0 ? 0 : i === 1 ? 1 : i < 0.5 ? Math.pow(2, 20 * i - 10) / 2 : (2 - Math.pow(2, -20 * i + 10)) / 2, easeInCirc: (i) => 1 - Math.sqrt(1 - Math.pow(i, 2)), easeOutCirc: (i) => Math.sqrt(1 - Math.pow(i - 1, 2)), easeInOutCirc: (i) => i < 0.5 ? (1 - Math.sqrt(1 - Math.pow(2 * i, 2))) / 2 : (Math.sqrt(1 - Math.pow(-2 * i + 2, 2)) + 1) / 2, easeInBack: (i) => ur * i * i * i - 1.70158 * i * i, easeOutBack: (i) => 1 + ur * Math.pow(i - 1, 3) + 1.70158 * Math.pow(i - 1, 2), easeInOutBack: (i) => i < 0.5 ? Math.pow(2 * i, 2) * ((Tt + 1) * 2 * i - Tt) / 2 : (Math.pow(2 * i - 2, 2) * ((Tt + 1) * (i * 2 - 2) + Tt) + 2) / 2, easeInElastic: (i) => i === 0 ? 0 : i === 1 ? 1 : -Math.pow(2, 10 * i - 10) * Math.sin((i * 10 - 10.75) * cr), easeOutElastic: (i) => i === 0 ? 0 : i === 1 ? 1 : Math.pow(2, -10 * i) * Math.sin((i * 10 - 0.75) * cr) + 1, easeInOutElastic: (i) => i === 0 ? 0 : i === 1 ? 1 : i < 0.5 ? -(Math.pow(2, 20 * i - 10) * Math.sin((20 * i - 11.125) * lr)) / 2 : Math.pow(2, -20 * i + 10) * Math.sin((20 * i - 11.125) * lr) / 2 + 1, easeInBounce: (i) => 1 - At.easeOutBounce(1 - i), easeOutBounce: (i) => i < 1 / 2.75 ? 7.5625 * i * i : i < 2 / 2.75 ? 7.5625 * (i -= 1.5 / 2.75) * i + 0.75 : i < 2.5 / 2.75 ? 7.5625 * (i -= 2.25 / 2.75) * i + 0.9375 : 7.5625 * (i -= 2.625 / 2.75) * i + 0.984375, easeInOutBounce: (i) => i < 0.5 ? (1 - At.easeOutBounce(1 - 2 * i)) / 2 : (1 + At.easeOutBounce(2 * i - 1)) / 2 };
  var ct = At;
  var je = class extends Map {
    lastID;
    constructor(...r) {
      super(...r), this.lastID = 0;
    }
    push(r) {
      let o = this.lastID;
      return this.set(o, r), this.lastID++, o;
    }
    pushd(r) {
      let o = this.push(r);
      return () => this.delete(o);
    }
  };
  l(je, "IDList");
  var pe = class {
    paused = false;
    cancel;
    constructor(r) {
      this.cancel = r;
    }
    static join(r) {
      let o = new pe(() => r.forEach((u) => u.cancel()));
      return Object.defineProperty(o, "paused", { get: () => r[0].paused, set: (u) => r.forEach((y) => y.paused = u) }), o.paused = false, o;
    }
  };
  l(pe, "EventController");
  var ae = class {
    handlers = new je();
    add(r) {
      let o = this.handlers.pushd((...y) => {
        u.paused || r(...y);
      }), u = new pe(o);
      return u;
    }
    addOnce(r) {
      let o = this.add((...u) => {
        o.cancel(), r(...u);
      });
      return o;
    }
    next() {
      return new Promise((r) => this.addOnce(r));
    }
    trigger(...r) {
      this.handlers.forEach((o) => o(...r));
    }
    numListeners() {
      return this.handlers.size;
    }
  };
  l(ae, "Event");
  var ye = class {
    handlers = {};
    on(r, o) {
      return this.handlers[r] || (this.handlers[r] = new ae()), this.handlers[r].add(o);
    }
    onOnce(r, o) {
      let u = this.on(r, (...y) => {
        u.cancel(), o(...y);
      });
      return u;
    }
    next(r) {
      return new Promise((o) => {
        this.onOnce(r, (...u) => o(u[0]));
      });
    }
    trigger(r, ...o) {
      this.handlers[r] && this.handlers[r].trigger(...o);
    }
    remove(r) {
      delete this.handlers[r];
    }
    clear() {
      this.handlers = {};
    }
    numListeners(r) {
      return this.handlers[r]?.numListeners() ?? 0;
    }
  };
  l(ye, "EventHandler");
  function tn(i, r) {
    let o = typeof i, u = typeof r;
    if (o !== u)
      return false;
    if (o === "object" && u === "object" && i !== null && r !== null) {
      let y = Object.keys(i), A = Object.keys(r);
      if (y.length !== A.length)
        return false;
      for (let N of y) {
        let g = i[N], B = r[N];
        if (!(typeof g == "function" && typeof B == "function") && !tn(g, B))
          return false;
      }
      return true;
    }
    return i === r;
  }
  l(tn, "deepEq");
  function ao(i) {
    let r = window.atob(i), o = r.length, u = new Uint8Array(o);
    for (let y = 0; y < o; y++)
      u[y] = r.charCodeAt(y);
    return u.buffer;
  }
  l(ao, "base64ToArrayBuffer");
  function hr(i) {
    return ao(i.split(",")[1]);
  }
  l(hr, "dataURLToArrayBuffer");
  function Ot(i, r) {
    let o = document.createElement("a");
    o.href = r, o.download = i, o.click();
  }
  l(Ot, "download");
  function nn(i, r) {
    Ot(i, "data:text/plain;charset=utf-8," + r);
  }
  l(nn, "downloadText");
  function dr(i, r) {
    nn(i, JSON.stringify(r));
  }
  l(dr, "downloadJSON");
  function rn(i, r) {
    let o = URL.createObjectURL(r);
    Ot(i, o), URL.revokeObjectURL(o);
  }
  l(rn, "downloadBlob");
  var sn = l((i) => i.match(/^data:\w+\/\w+;base64,.+/), "isDataURL");
  var fr = l((i) => i.split(".").pop(), "getExt");
  var mr = (() => {
    let i = 0;
    return () => i++;
  })();
  var lt = class {
    _items;
    _compareFn;
    constructor(r = (o, u) => o < u) {
      this._compareFn = r, this._items = [];
    }
    insert(r) {
      this._items.push(r), this.moveUp(this._items.length - 1);
    }
    remove() {
      if (this._items.length === 0)
        return null;
      let r = this._items[0], o = this._items.pop();
      return this._items.length !== 0 && (this._items[0] = o, this.moveDown(0)), r;
    }
    clear() {
      this._items.splice(0, this._items.length);
    }
    moveUp(r) {
      for (; r > 0; ) {
        let o = Math.floor((r - 1) / 2);
        if (!this._compareFn(this._items[r], this._items[o]) && this._items[r] >= this._items[o])
          break;
        this.swap(r, o), r = o;
      }
    }
    moveDown(r) {
      for (; r < Math.floor(this._items.length / 2); ) {
        let o = 2 * r + 1;
        if (o < this._items.length - 1 && !this._compareFn(this._items[o], this._items[o + 1]) && ++o, this._compareFn(this._items[r], this._items[o]))
          break;
        this.swap(r, o), r = o;
      }
    }
    swap(r, o) {
      [this._items[r], this._items[o]] = [this._items[o], this._items[r]];
    }
    get length() {
      return this._items.length;
    }
  };
  l(lt, "BinaryHeap");
  var Qe = class {
    dts = [];
    timer = 0;
    fps = 0;
    tick(r) {
      this.dts.push(r), this.timer += r, this.timer >= 1 && (this.timer = 0, this.fps = Math.round(1 / (this.dts.reduce((o, u) => o + u) / this.dts.length)), this.dts = []);
    }
  };
  l(Qe, "FPSCounter");
  var De = class {
    time;
    action;
    finished = false;
    paused = false;
    constructor(r, o) {
      this.time = r, this.action = o;
    }
    tick(r) {
      return this.finished || this.paused ? false : (this.time -= r, this.time <= 0 ? (this.action(), this.finished = true, this.time = 0, true) : false);
    }
    reset(r) {
      this.time = r, this.finished = false;
    }
  };
  l(De, "Timer");
  var on = { "Joy-Con L+R (STANDARD GAMEPAD Vendor: 057e Product: 200e)": { buttons: { "0": "south", "1": "east", "2": "west", "3": "north", "4": "lshoulder", "5": "rshoulder", "6": "ltrigger", "7": "rtrigger", "8": "select", "9": "start", "10": "lstick", "11": "rstick", "12": "dpad-up", "13": "dpad-down", "14": "dpad-left", "15": "dpad-right", "16": "home", "17": "capture" }, sticks: { left: { x: 0, y: 1 }, right: { x: 2, y: 3 } } }, "Joy-Con (L) (STANDARD GAMEPAD Vendor: 057e Product: 2006)": { buttons: { "0": "south", "1": "east", "2": "west", "3": "north", "4": "lshoulder", "5": "rshoulder", "9": "select", "10": "lstick", "16": "start" }, sticks: { left: { x: 0, y: 1 } } }, "Joy-Con (R) (STANDARD GAMEPAD Vendor: 057e Product: 2007)": { buttons: { "0": "south", "1": "east", "2": "west", "3": "north", "4": "lshoulder", "5": "rshoulder", "9": "start", "10": "lstick", "16": "select" }, sticks: { left: { x: 0, y: 1 } } }, "Pro Controller (STANDARD GAMEPAD Vendor: 057e Product: 2009)": { buttons: { "0": "south", "1": "east", "2": "west", "3": "north", "4": "lshoulder", "5": "rshoulder", "6": "ltrigger", "7": "rtrigger", "8": "select", "9": "start", "10": "lstick", "11": "rstick", "12": "dpad-up", "13": "dpad-down", "14": "dpad-left", "15": "dpad-right", "16": "home", "17": "capture" }, sticks: { left: { x: 0, y: 1 }, right: { x: 2, y: 3 } } }, default: { buttons: { "0": "south", "1": "east", "2": "west", "3": "north", "4": "lshoulder", "5": "rshoulder", "6": "ltrigger", "7": "rtrigger", "8": "select", "9": "start", "10": "lstick", "11": "rstick", "12": "dpad-up", "13": "dpad-down", "14": "dpad-left", "15": "dpad-right", "16": "home" }, sticks: { left: { x: 0, y: 1 }, right: { x: 2, y: 3 } } } };
  var pr = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD0AAAA1CAYAAADyMeOEAAAAAXNSR0IArs4c6QAAAoVJREFUaIHdm7txwkAQhheGAqACiCHzOKQDQrqgILpwSAeEDBnEUAF0gCMxZ7G72qce/mec2Lpf9+3unaS78wgSNZ8uX5729+d1FNWXUuGmXlBOUUEIMckEpeQJgBu6C+BSFngztBR2vd+ovY+7g+p6LbgaWgJrAeUkDYIUXgXdBBwNi6kpABJwMTQH3AZsXRR8GHTfgEth8E3gjdAUcNewpbTgY85sCMCUuOokozE0YM0YRzM9NGAAXd8+omAF5h4lnmBRvpSnZHyLoLEbaN+aKB9KWv/KWw0tAbbANnlG+UvB2dm77NxxdwgBpjrF/d7rW9cbmpvio2A5z8iAYpVU8pGZlo6/2+MSco2lHfd3rv9jAP038e1xef9o2mjvYb2OqpqKE81028/jeietlSEVO5FRWsxWsJit1G3aFpW8iWe5RwpiCZAk25QvV6nz6fIlynRGuTd5WqpJ4guAlDfVKBK87hXljflgv1ON6fV+4+5gVlA17SfeG0heKqQd4l4jI/wrmaA9N9R4ar+wpHJDZyrrfcH0nB66PqAzPi76pn+faSyJk/vzOorYhGurQrzj/P68jtBMawHaHBIR9xoD5O34dy0qQOSYHvqExq2TpT2nf76+w7y251OYF0CRaU+J920TwLUa6inx6OxE6g80lu2ux7Y2eJLF/rCXE6zEPdnenk9o+4ih9AEdnW2q81HXl5LuU6OTl2fXUhqganbXAGq3g6jJOWV/OnoesO6YqqEB/GdNsjf7uHtwj2DzmRNpp7iOZfm6D9oAxB6Yi1gC4oIYeo4MIPdopEQRB+cAko5J1tW386HpB2Kz1eop4Epdwls/kgZ1sh8gZsEjdcWkr//D8Qu3Z3l5Nl1NtAAAAABJRU5ErkJggg==";
  var lo = {};
  no(lo, { default: () => an });
  var an = ro("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L5QNSqT5iiySS9Ja2SV//5ME0ak//+4KgAAABgQBAADAMDgYCAEgCteQ0fZH6+ICXA357+MPfhR/+ywRf/U///LVTEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+5JknQAFoWhGLm5gBClBmT3GiAAAAAGkHAAAIAAANIOAAARVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV");
  var gr = "data:image/png;base64,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";
  var wr = "data:image/png;base64,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";
  var po = "3000.0.0-beta.2";
  var vr = { ArrowLeft: "left", ArrowRight: "right", ArrowUp: "up", ArrowDown: "down", " ": "space" };
  var go2 = /* @__PURE__ */ new Set([" ", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Tab"]);
  var br = ["left", "middle", "right", "back", "forward"];
  var yr = " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~";
  var Rt = "topleft";
  var Ur = 64;
  var wo = "monospace";
  var Pt = "monospace";
  var vo = 36;
  var xr = 64;
  var Er = 256;
  var Cr = 2048;
  var Sr = 2048;
  var Tr = 2048;
  var Ar = 2048;
  var Or = 0.1;
  var bo = 64;
  var Rr = "nearest";
  var yo = 1;
  var Dr = [{ name: "a_pos", size: 2 }, { name: "a_uv", size: 2 }, { name: "a_color", size: 4 }];
  var Mt = Dr.reduce((i, r) => i + r.size, 0);
  var Br = 2048;
  var Pr = Br * 4 * Mt;
  var Mr = Br * 6;
  var Uo = `
attribute vec2 a_pos;
attribute vec2 a_uv;
attribute vec4 a_color;

varying vec2 v_pos;
varying vec2 v_uv;
varying vec4 v_color;

vec4 def_vert() {
	return vec4(a_pos, 0.0, 1.0);
}

{{user}}

void main() {
	vec4 pos = vert(a_pos, a_uv, a_color);
	v_pos = a_pos;
	v_uv = a_uv;
	v_color = a_color;
	gl_Position = pos;
}
`;
  var xo = `
precision mediump float;

varying vec2 v_pos;
varying vec2 v_uv;
varying vec4 v_color;

uniform sampler2D u_tex;

vec4 def_frag() {
	return v_color * texture2D(u_tex, v_uv);
}

{{user}}

void main() {
	gl_FragColor = frag(v_pos, v_uv, v_color, u_tex);
	if (gl_FragColor.a == 0.0) {
		discard;
	}
}
`;
  var un = `
vec4 vert(vec2 pos, vec2 uv, vec4 color) {
	return def_vert();
}
`;
  var cn = `
vec4 frag(vec2 pos, vec2 uv, vec4 color, sampler2D tex) {
	return def_frag();
}
`;
  var Eo = /* @__PURE__ */ new Set(["id", "require"]);
  var Co = /* @__PURE__ */ new Set(["add", "update", "draw", "destroy", "inspect", "drawInspect"]);
  function So(i) {
    i.requestFullscreen ? i.requestFullscreen() : i.webkitRequestFullscreen && i.webkitRequestFullscreen();
  }
  l(So, "enterFullscreen");
  function To() {
    document.exitFullscreen ? document.exitFullscreen() : document.webkitExitFullScreen && document.webkitExitFullScreen();
  }
  l(To, "exitFullscreen");
  function Ao() {
    return document.fullscreenElement || document.webkitFullscreenElement;
  }
  l(Ao, "getFullscreenElement");
  function Ze(i) {
    switch (i) {
      case "topleft":
        return new v(-1, -1);
      case "top":
        return new v(0, -1);
      case "topright":
        return new v(1, -1);
      case "left":
        return new v(-1, 0);
      case "center":
        return new v(0, 0);
      case "right":
        return new v(1, 0);
      case "botleft":
        return new v(-1, 1);
      case "bot":
        return new v(0, 1);
      case "botright":
        return new v(1, 1);
      default:
        return i;
    }
  }
  l(Ze, "anchorPt");
  function Oo(i) {
    switch (i) {
      case "left":
        return 0;
      case "center":
        return 0.5;
      case "right":
        return 1;
      default:
        return 0;
    }
  }
  l(Oo, "alignPt");
  function Ro(i) {
    return i.createBuffer(1, 1, 44100);
  }
  l(Ro, "createEmptyAudioBuffer");
  var Ue = class {
    pressed = /* @__PURE__ */ new Set([]);
    pressedRepeat = /* @__PURE__ */ new Set([]);
    released = /* @__PURE__ */ new Set([]);
    down = /* @__PURE__ */ new Set([]);
    update() {
      this.pressed.clear(), this.released.clear(), this.pressedRepeat.clear();
    }
    press(r) {
      this.pressed.add(r), this.pressedRepeat.add(r), this.down.add(r);
    }
    pressRepeat(r) {
      this.pressedRepeat.add(r);
    }
    release(r) {
      this.down.delete(r), this.pressed.delete(r), this.released.add(r);
    }
  };
  l(Ue, "ButtonState");
  var ra = l((i = {}) => {
    let r = [], o = (() => {
      let e = i.root ?? document.body;
      e === document.body && (document.body.style.width = "100%", document.body.style.height = "100%", document.body.style.margin = "0px", document.documentElement.style.width = "100%", document.documentElement.style.height = "100%");
      let t = i.canvas ?? (() => {
        let M = document.createElement("canvas");
        return e.appendChild(M), M;
      })(), n = i.scale ?? 1, a = i.width && i.height && !i.stretch && !i.letterbox;
      a ? (t.width = i.width * n, t.height = i.height * n) : (t.width = t.parentElement.offsetWidth, t.height = t.parentElement.offsetHeight);
      let c = t.width, s = t.height, h = i.pixelDensity || window.devicePixelRatio;
      t.width *= h, t.height *= h;
      let m = ["outline: none", "cursor: default"];
      a ? (m.push(`width: ${c}px`), m.push(`height: ${s}px`)) : (m.push("width: 100%"), m.push("height: 100%")), i.crisp && (m.push("image-rendering: pixelated"), m.push("image-rendering: crisp-edges")), t.style.cssText = m.join(";"), t.tabIndex = 0;
      let d = document.createElement("canvas");
      d.width = Er, d.height = Er;
      let p = d.getContext("2d", { willReadFrequently: true }), b = t.offsetWidth, T = t.offsetHeight;
      return new ResizeObserver((M) => {
        for (let I of M)
          if (I.target === t) {
            if (b === t.offsetWidth && T === t.offsetHeight)
              return;
            b = t.offsetWidth, T = t.offsetHeight, t.width = b * h, t.height = T * h, g.frameBuffer.free(), g.frameBuffer = new N(u.drawingBufferWidth, u.drawingBufferHeight), Rn(), f.ev.onOnce("frameEnd", () => {
              f.ev.trigger("resize");
            });
          }
      }).observe(t), { canvas: t, pixelDensity: h, fontCacheCanvas: d, fontCacheCtx: p, keyState: new Ue(), mouseState: new Ue(), virtualButtonState: new Ue(), gamepadButtonState: new Ue(), charInputted: [], isMouseMoved: false, mouseStarted: false, mousePos: new v(0, 0), mouseDeltaPos: new v(0, 0), time: 0, realTime: 0, skipTime: false, dt: 0, numFrames: 0, isTouchScreen: "ontouchstart" in window || navigator.maxTouchPoints > 0, loopID: null, stopped: false, paused: false, fpsCounter: new Qe() };
    })(), u = o.canvas.getContext("webgl", { antialias: true, depth: true, stencil: true, alpha: true, preserveDrawingBuffer: true });
    class y {
      src = null;
      glTex;
      width;
      height;
      constructor(t, n, a = {}) {
        this.glTex = u.createTexture(), r.push(() => this.free()), this.bind(), t && n && u.texImage2D(u.TEXTURE_2D, 0, u.RGBA, t, n, 0, u.RGBA, u.UNSIGNED_BYTE, null), this.width = t, this.height = n;
        let c = (() => {
          switch (a.filter ?? i.texFilter) {
            case "linear":
              return u.LINEAR;
            case "nearest":
              return u.NEAREST;
            default:
              return u.NEAREST;
          }
        })(), s = (() => {
          switch (a.wrap) {
            case "repeat":
              return u.REPEAT;
            case "clampToEdge":
              return u.CLAMP_TO_EDGE;
            default:
              return u.CLAMP_TO_EDGE;
          }
        })();
        u.texParameteri(u.TEXTURE_2D, u.TEXTURE_MIN_FILTER, c), u.texParameteri(u.TEXTURE_2D, u.TEXTURE_MAG_FILTER, c), u.texParameteri(u.TEXTURE_2D, u.TEXTURE_WRAP_S, s), u.texParameteri(u.TEXTURE_2D, u.TEXTURE_WRAP_T, s), this.unbind();
      }
      static fromImage(t, n = {}) {
        let a = new y(0, 0, n);
        return a.bind(), u.texImage2D(u.TEXTURE_2D, 0, u.RGBA, u.RGBA, u.UNSIGNED_BYTE, t), a.width = t.width, a.height = t.height, a.unbind(), a.src = t, a;
      }
      update(t, n = 0, a = 0) {
        this.bind(), u.texSubImage2D(u.TEXTURE_2D, 0, n, a, u.RGBA, u.UNSIGNED_BYTE, t), this.unbind();
      }
      bind() {
        u.bindTexture(u.TEXTURE_2D, this.glTex);
      }
      unbind() {
        u.bindTexture(u.TEXTURE_2D, null);
      }
      free() {
        u.deleteTexture(this.glTex);
      }
    }
    l(y, "Texture");
    class A {
      tex;
      canvas;
      ctx;
      x = 0;
      y = 0;
      curHeight = 0;
      constructor(t, n) {
        this.canvas = document.createElement("canvas"), this.canvas.width = t, this.canvas.height = n, this.tex = y.fromImage(this.canvas), this.ctx = this.canvas.getContext("2d");
      }
      add(t) {
        if (t.width > this.canvas.width || t.height > this.canvas.height)
          throw new Error(`Texture size (${t.width} x ${t.height}) exceeds limit (${this.canvas.width} x ${this.canvas.height})`);
        this.x + t.width > this.canvas.width && (this.x = 0, this.y += this.curHeight, this.curHeight = 0), this.y + t.height > this.canvas.height && (this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height), this.tex = y.fromImage(this.canvas), this.x = 0, this.y = 0, this.curHeight = 0);
        let n = new v(this.x, this.y);
        return this.x += t.width, t.height > this.curHeight && (this.curHeight = t.height), t instanceof ImageData ? this.ctx.putImageData(t, n.x, n.y) : this.ctx.drawImage(t, n.x, n.y), this.tex.update(this.canvas), [this.tex, new X(n.x / this.canvas.width, n.y / this.canvas.height, t.width / this.canvas.width, t.height / this.canvas.height)];
      }
    }
    l(A, "TexPacker");
    class N {
      tex;
      glFrameBuffer;
      glRenderBuffer;
      constructor(t, n, a = {}) {
        this.tex = new y(t, n, a), this.glFrameBuffer = u.createFramebuffer(), this.glRenderBuffer = u.createRenderbuffer(), r.push(() => this.free()), this.bind(), u.renderbufferStorage(u.RENDERBUFFER, u.DEPTH_STENCIL, t, n), u.framebufferTexture2D(u.FRAMEBUFFER, u.COLOR_ATTACHMENT0, u.TEXTURE_2D, this.tex.glTex, 0), u.framebufferRenderbuffer(u.FRAMEBUFFER, u.DEPTH_STENCIL_ATTACHMENT, u.RENDERBUFFER, this.glRenderBuffer), this.unbind();
      }
      bind() {
        u.bindFramebuffer(u.FRAMEBUFFER, this.glFrameBuffer), u.bindRenderbuffer(u.RENDERBUFFER, this.glRenderBuffer);
      }
      unbind() {
        u.bindFramebuffer(u.FRAMEBUFFER, null), u.bindRenderbuffer(u.RENDERBUFFER, null);
      }
      free() {
        u.deleteFramebuffer(this.glFrameBuffer), u.deleteRenderbuffer(this.glRenderBuffer);
      }
    }
    l(N, "FrameBuffer");
    let g = (() => {
      let e = Bt(un, cn), t = y.fromImage(new ImageData(new Uint8ClampedArray([255, 255, 255, 255]), 1, 1)), n = new N(u.drawingBufferWidth, u.drawingBufferHeight), a = null, c = 1;
      i.background && (a = D.fromArray(i.background), c = i.background[3] ?? 1, u.clearColor(a.r / 255, a.g / 255, a.b / 255, c)), u.enable(u.BLEND), u.enable(u.SCISSOR_TEST), u.blendFuncSeparate(u.SRC_ALPHA, u.ONE_MINUS_SRC_ALPHA, u.ONE, u.ONE_MINUS_SRC_ALPHA);
      let s = u.createBuffer();
      u.bindBuffer(u.ARRAY_BUFFER, s), u.bufferData(u.ARRAY_BUFFER, Pr * 4, u.DYNAMIC_DRAW), Dr.reduce((d, p, b) => (u.vertexAttribPointer(b, p.size, u.FLOAT, false, Mt * 4, d), u.enableVertexAttribArray(b), d + p.size * 4), 0), u.bindBuffer(u.ARRAY_BUFFER, null);
      let h = u.createBuffer();
      u.bindBuffer(u.ELEMENT_ARRAY_BUFFER, h), u.bufferData(u.ELEMENT_ARRAY_BUFFER, Mr * 4, u.DYNAMIC_DRAW), u.bindBuffer(u.ELEMENT_ARRAY_BUFFER, null);
      let m = y.fromImage(new ImageData(new Uint8ClampedArray([128, 128, 128, 255, 190, 190, 190, 255, 190, 190, 190, 255, 128, 128, 128, 255]), 2, 2), { wrap: "repeat", filter: "nearest" });
      return { drawCalls: 0, lastDrawCalls: 0, defShader: e, curShader: e, frameBuffer: n, postShader: null, postShaderUniform: null, defTex: t, curTex: t, curUniform: {}, vbuf: s, ibuf: h, vqueue: [], iqueue: [], transform: new Y(), transformStack: [], bgTex: m, bgColor: a, bgAlpha: c, width: i.width, height: i.height, viewport: { x: 0, y: 0, width: u.drawingBufferWidth, height: u.drawingBufferHeight } };
    })();
    class B {
      tex;
      frames = [new X(0, 0, 1, 1)];
      anims = {};
      slice9 = null;
      constructor(t, n, a = {}, c = null) {
        this.tex = t, n && (this.frames = n), this.anims = a, this.slice9 = c;
      }
      static from(t, n = {}) {
        return typeof t == "string" ? B.fromURL(t, n) : Promise.resolve(B.fromImage(t, n));
      }
      static fromImage(t, n = {}) {
        let [a, c] = P.packer.add(t), s = n.frames ? n.frames.map((h) => new X(c.x + h.x * c.w, c.y + h.y * c.h, h.w * c.w, h.h * c.h)) : ln(n.sliceX || 1, n.sliceY || 1, c.x, c.y, c.w, c.h);
        return new B(a, s, n.anims, n.slice9);
      }
      static fromURL(t, n = {}) {
        return Ae(t).then((a) => B.fromImage(a, n));
      }
    }
    l(B, "SpriteData");
    class _ {
      buf;
      constructor(t) {
        this.buf = t;
      }
      static fromArrayBuffer(t) {
        return new Promise((n, a) => F.ctx.decodeAudioData(t, n, a)).then((n) => new _(n));
      }
      static fromURL(t) {
        return sn(t) ? _.fromArrayBuffer(hr(t)) : Dt(t).then((n) => _.fromArrayBuffer(n));
      }
    }
    l(_, "SoundData");
    let F = (() => {
      let e = new (window.AudioContext || window.webkitAudioContext)(), t = e.createGain();
      t.connect(e.destination);
      let n = new _(Ro(e));
      return e.decodeAudioData(an.buffer.slice(0)).then((a) => {
        n.buf = a;
      }).catch((a) => {
        console.error("Failed to load burp: ", a);
      }), { ctx: e, masterNode: t, burpSnd: n };
    })();
    class k {
      loaded = false;
      data = null;
      error = null;
      onLoadEvents = new ae();
      onErrorEvents = new ae();
      onFinishEvents = new ae();
      constructor(t) {
        t.then((n) => {
          this.data = n, this.onLoadEvents.trigger(n);
        }).catch((n) => {
          if (this.error = n, this.onErrorEvents.numListeners() > 0)
            this.onErrorEvents.trigger(n);
          else
            throw n;
        }).finally(() => {
          this.onFinishEvents.trigger(), this.loaded = true;
        });
      }
      static loaded(t) {
        let n = new k(Promise.resolve(t));
        return n.data = t, n.loaded = true, n;
      }
      onLoad(t) {
        return this.onLoadEvents.add(t), this;
      }
      onError(t) {
        return this.onErrorEvents.add(t), this;
      }
      onFinish(t) {
        return this.onFinishEvents.add(t), this;
      }
      then(t) {
        return this.onLoad(t);
      }
      catch(t) {
        return this.onError(t);
      }
      finally(t) {
        return this.onFinish(t);
      }
    }
    l(k, "Asset");
    class $ {
      assets = /* @__PURE__ */ new Map();
      lastUID = 0;
      add(t, n) {
        let a = t ?? this.lastUID++ + "", c = new k(n);
        return this.assets.set(a, c), c;
      }
      addLoaded(t, n) {
        let a = t ?? this.lastUID++ + "", c = k.loaded(n);
        return this.assets.set(a, c), c;
      }
      get(t) {
        return this.assets.get(t);
      }
      progress() {
        if (this.assets.size === 0)
          return 1;
        let t = 0;
        return this.assets.forEach((n) => {
          n.loaded && t++;
        }), t / this.assets.size;
      }
    }
    l($, "AssetBucket");
    let P = { urlPrefix: "", sprites: new $(), fonts: new $(), bitmapFonts: new $(), sounds: new $(), shaders: new $(), custom: new $(), packer: new A(Tr, Ar), loaded: false }, f = { ev: new ye(), objEvents: new ye(), root: Ln([]), gravity: 0, scenes: {}, logs: [], cam: { pos: null, scale: new v(1), angle: 0, shake: 0, transform: new Y() } };
    function ie(e) {
      return P.custom.add(null, e);
    }
    l(ie, "load");
    function we() {
      let e = [P.sprites, P.sounds, P.shaders, P.fonts, P.bitmapFonts, P.custom];
      return e.reduce((t, n) => t + n.progress(), 0) / e.length;
    }
    l(we, "loadProgress");
    function ht(e) {
      return e !== void 0 && (P.urlPrefix = e), P.urlPrefix;
    }
    l(ht, "loadRoot");
    function Ne(e) {
      let t = P.urlPrefix + e;
      return fetch(t).then((n) => {
        if (!n.ok)
          throw new Error(`Failed to fetch ${t}`);
        return n;
      });
    }
    l(Ne, "fetchURL");
    function _e(e) {
      return Ne(e).then((t) => t.json());
    }
    l(_e, "fetchJSON");
    function dt(e) {
      return Ne(e).then((t) => t.text());
    }
    l(dt, "fetchText");
    function Dt(e) {
      return Ne(e).then((t) => t.arrayBuffer());
    }
    l(Dt, "fetchArrayBuffer");
    function Ae(e) {
      let t = new Image();
      return t.crossOrigin = "anonymous", t.src = sn(e) ? e : P.urlPrefix + e, new Promise((n, a) => {
        t.onload = () => n(t), t.onerror = () => a(new Error(`Failed to load image from "${e}"`));
      });
    }
    l(Ae, "loadImg");
    class xe {
      fontface;
      outline;
      filter;
      constructor(t, n = {}) {
        this.fontface = t, this.outline = n.outline ?? 0, this.filter = n.filter ?? Rr;
      }
    }
    l(xe, "FontData");
    function Fr(e, t, n = {}) {
      let a = new FontFace(e, typeof t == "string" ? `url(${t})` : t);
      return document.fonts.add(a), P.fonts.add(e, a.load().catch((c) => {
        throw new Error(`Failed to load font from "${t}": ${c}`);
      }).then((c) => new xe(c, n)));
    }
    l(Fr, "loadFont");
    function Lr(e, t, n, a, c = {}) {
      return P.bitmapFonts.add(e, Ae(t).then((s) => $r(y.fromImage(s, c), n, a, c.chars ?? yr)));
    }
    l(Lr, "loadBitmapFont");
    function ln(e = 1, t = 1, n = 0, a = 0, c = 1, s = 1) {
      let h = [], m = c / e, d = s / t;
      for (let p = 0; p < t; p++)
        for (let b = 0; b < e; b++)
          h.push(new X(n + b * m, a + p * d, m, d));
      return h;
    }
    l(ln, "slice");
    function hn(e, t) {
      return ie(typeof t == "string" ? new Promise((n, a) => {
        _e(t).then((c) => {
          hn(e, c).then(n).catch(a);
        });
      }) : B.from(e).then((n) => {
        let a = {};
        for (let c in t) {
          let s = t[c], h = n.frames[0], m = Tr * h.w, d = Ar * h.h, p = s.frames ? s.frames.map((T) => new X(h.x + (s.x + T.x) / m * h.w, h.y + (s.y + T.y) / d * h.h, T.w / m * h.w, T.h / d * h.h)) : ln(s.sliceX || 1, s.sliceY || 1, h.x + s.x / m * h.w, h.y + s.y / d * h.h, s.width / m * h.w, s.height / d * h.h), b = new B(n.tex, p, s.anims);
          P.sprites.addLoaded(c, b), a[c] = b;
        }
        return a;
      }));
    }
    l(hn, "loadSpriteAtlas");
    function dn(e, t = {}) {
      let n = document.createElement("canvas"), a = e[0].width, c = e[0].height;
      n.width = a * e.length, n.height = c;
      let s = n.getContext("2d");
      e.forEach((m, d) => {
        m instanceof ImageData ? s.putImageData(m, d * a, 0) : s.drawImage(m, d * a, 0);
      });
      let h = s.getImageData(0, 0, e.length * a, c);
      return B.fromImage(h, { ...t, sliceX: e.length, sliceY: 1 });
    }
    l(dn, "createSpriteSheet");
    function et(e, t, n = { sliceX: 1, sliceY: 1, anims: {} }) {
      return Array.isArray(t) ? t.some((a) => typeof a == "string") ? P.sprites.add(e, Promise.all(t.map((a) => typeof a == "string" ? Ae(a) : Promise.resolve(a))).then((a) => dn(a, n))) : P.sprites.addLoaded(e, dn(t, n)) : typeof t == "string" ? P.sprites.add(e, B.from(t, n)) : P.sprites.addLoaded(e, B.fromImage(t, n));
    }
    l(et, "loadSprite");
    function Gr(e, t) {
      return P.sprites.add(e, new Promise(async (n) => {
        let a = typeof t == "string" ? await _e(t) : t, c = await Promise.all(a.frames.map(Ae)), s = document.createElement("canvas");
        s.width = a.width, s.height = a.height * a.frames.length;
        let h = s.getContext("2d");
        c.forEach((d, p) => {
          h.drawImage(d, 0, p * a.height);
        });
        let m = await et(null, s, { sliceY: a.frames.length, anims: a.anims });
        n(m);
      }));
    }
    l(Gr, "loadPedit");
    function Vr(e, t, n) {
      typeof t == "string" && !n && (n = t.replace(new RegExp(`${fr(t)}$`), "json"));
      let a = typeof n == "string" ? _e(n) : Promise.resolve(n);
      return P.sprites.add(e, a.then((c) => {
        let s = c.meta.size, h = c.frames.map((d) => new X(d.frame.x / s.w, d.frame.y / s.h, d.frame.w / s.w, d.frame.h / s.h)), m = {};
        for (let d of c.meta.frameTags)
          d.from === d.to ? m[d.name] = d.from : m[d.name] = { from: d.from, to: d.to, speed: 10, loop: true, pingpong: d.direction === "pingpong" };
        return B.from(t, { frames: h, anims: m });
      }));
    }
    l(Vr, "loadAseprite");
    function Ir(e, t, n) {
      return P.shaders.addLoaded(e, Bt(t, n));
    }
    l(Ir, "loadShader");
    function jr(e, t, n) {
      let a = l((s) => s ? dt(s) : Promise.resolve(null), "resolveUrl"), c = Promise.all([a(t), a(n)]).then(([s, h]) => Bt(s, h));
      return P.shaders.add(e, c);
    }
    l(jr, "loadShaderURL");
    function Nr(e, t) {
      return P.sounds.add(e, typeof t == "string" ? _.fromURL(t) : _.fromArrayBuffer(t));
    }
    l(Nr, "loadSound");
    function _r(e = "bean") {
      return et(e, pr);
    }
    l(_r, "loadBean");
    function fn(e) {
      return P.sprites.get(e);
    }
    l(fn, "getSprite");
    function mn(e) {
      return P.sounds.get(e);
    }
    l(mn, "getSound");
    function pn(e) {
      return P.fonts.get(e);
    }
    l(pn, "getFont");
    function gn(e) {
      return P.bitmapFonts.get(e);
    }
    l(gn, "getBitmapFont");
    function wn(e) {
      return P.shaders.get(e);
    }
    l(wn, "getShader");
    function vn(e) {
      if (typeof e == "string") {
        let t = fn(e);
        if (t)
          return t;
        if (we() < 1)
          return null;
        throw new Error(`Sprite not found: ${e}`);
      } else {
        if (e instanceof B)
          return k.loaded(e);
        if (e instanceof k)
          return e;
        throw new Error(`Invalid sprite: ${e}`);
      }
    }
    l(vn, "resolveSprite");
    function kr(e) {
      if (typeof e == "string") {
        let t = mn(e);
        if (t)
          return t.data ?? t;
        if (we() < 1)
          return null;
        throw new Error(`Sound not found: ${e}`);
      } else {
        if (e instanceof _)
          return e;
        if (e instanceof k)
          return e.data ? e.data : e;
        throw new Error(`Invalid sound: ${e}`);
      }
    }
    l(kr, "resolveSound");
    function Hr(e) {
      if (!e)
        return g.defShader;
      if (typeof e == "string") {
        let t = wn(e);
        if (t)
          return t.data ?? t;
        if (we() < 1)
          return null;
        throw new Error(`Shader not found: ${e}`);
      } else if (e instanceof k)
        return e.data ? e.data : e;
      return e;
    }
    l(Hr, "resolveShader");
    function bn(e) {
      if (!e)
        return bn(i.font ?? wo);
      if (typeof e == "string") {
        let t = gn(e), n = pn(e);
        if (t)
          return t.data ?? t;
        if (n)
          return n.data ?? n;
        if (document.fonts.check(`${xr}px ${e}`))
          return e;
        if (we() < 1)
          return null;
        throw new Error(`Font not found: ${e}`);
      } else if (e instanceof k)
        return e.data ? e.data : e;
      return e;
    }
    l(bn, "resolveFont");
    function qr(e) {
      return e !== void 0 && (F.masterNode.gain.value = e), F.masterNode.gain.value;
    }
    l(qr, "volume");
    function yn(e, t = {}) {
      let n = kr(e), a = F.ctx, c = t.paused ?? false, s = a.createBufferSource(), h = new ae(), m = a.createGain(), d = t.seek ?? 0, p = 0, b = 0, T = false;
      s.loop = Boolean(t.loop), s.detune.value = t.detune ?? 0, s.playbackRate.value = t.speed ?? 1, s.connect(m), s.onended = () => {
        M() >= s.buffer?.duration && h.trigger();
      }, m.connect(F.masterNode), m.gain.value = t.volume ?? 1;
      let H = l((E) => {
        s.buffer = E.buf, c || (p = a.currentTime, s.start(0, d), T = true);
      }, "start");
      n instanceof k ? n.onLoad(H) : n instanceof _ && H(n);
      let M = l(() => {
        if (!s.buffer)
          return 0;
        let E = c ? b - p : a.currentTime - p, x = s.buffer.duration;
        return s.loop ? E % x : Math.min(E, x);
      }, "getTime"), I = l((E) => {
        let x = a.createBufferSource();
        return x.buffer = E.buffer, x.loop = E.loop, x.playbackRate.value = E.playbackRate.value, x.detune.value = E.detune.value, x.onended = E.onended, x.connect(m), x;
      }, "cloneNode");
      return { set paused(E) {
        if (c !== E)
          if (c = E, E)
            T && (s.stop(), T = false), b = a.currentTime;
          else {
            s = I(s);
            let x = b - p;
            s.start(0, x), T = true, p = a.currentTime - x, b = 0;
          }
      }, get paused() {
        return c;
      }, play(E = 0) {
        this.seek(E), this.paused = false;
      }, seek(E) {
        s.buffer?.duration && (E > s.buffer.duration || (c ? (s = I(s), p = b - E) : (s.stop(), s = I(s), p = a.currentTime - E, s.start(0, E), T = true, b = 0)));
      }, set speed(E) {
        s.playbackRate.value = E;
      }, get speed() {
        return s.playbackRate.value;
      }, set detune(E) {
        s.detune.value = E;
      }, get detune() {
        return s.detune.value;
      }, set volume(E) {
        m.gain.value = E;
      }, get volume() {
        return m.gain.value;
      }, set loop(E) {
        s.loop = E;
      }, get loop() {
        return s.loop;
      }, duration() {
        return s.buffer?.duration ?? 0;
      }, time() {
        return M() % this.duration();
      }, onEnd(E) {
        return h.add(E);
      }, then(E) {
        return this.onEnd(E);
      } };
    }
    l(yn, "play");
    function Un(e) {
      return yn(F.burpSnd, e);
    }
    l(Un, "burp");
    function Bt(e = un, t = cn) {
      let n = Uo.replace("{{user}}", e ?? un), a = xo.replace("{{user}}", t ?? cn), c = u.createShader(u.VERTEX_SHADER), s = u.createShader(u.FRAGMENT_SHADER);
      u.shaderSource(c, n), u.shaderSource(s, a), u.compileShader(c), u.compileShader(s);
      let h = u.createProgram();
      if (r.push(() => u.deleteProgram(h)), u.attachShader(h, c), u.attachShader(h, s), u.bindAttribLocation(h, 0, "a_pos"), u.bindAttribLocation(h, 1, "a_uv"), u.bindAttribLocation(h, 2, "a_color"), u.linkProgram(h), !u.getProgramParameter(h, u.LINK_STATUS)) {
        let m = l((T) => {
          let H = /^ERROR:\s0:(?<line>\d+):\s(?<msg>.+)/, M = T.match(H);
          return { line: Number(M.groups.line), msg: M.groups.msg.replace(/\n\0$/, "") };
        }, "formatShaderError"), d = u.getShaderInfoLog(c), p = u.getShaderInfoLog(s), b = "";
        if (d) {
          let T = m(d);
          b += `Vertex shader line ${T.line - 14}: ${T.msg}`;
        }
        if (p) {
          let T = m(p);
          b += `Fragment shader line ${T.line - 14}: ${T.msg}`;
        }
        throw new Error(b);
      }
      return u.deleteShader(c), u.deleteShader(s), { bind() {
        u.useProgram(h);
      }, unbind() {
        u.useProgram(null);
      }, free() {
        u.deleteProgram(h);
      }, send(m) {
        for (let d in m) {
          let p = m[d], b = u.getUniformLocation(h, d);
          typeof p == "number" ? u.uniform1f(b, p) : p instanceof Y ? u.uniformMatrix4fv(b, false, new Float32Array(p.m)) : p instanceof D ? u.uniform3f(b, p.r, p.g, p.b) : p instanceof v && u.uniform2f(b, p.x, p.y);
        }
      } };
    }
    l(Bt, "makeShader");
    function $r(e, t, n, a) {
      let c = e.width / t, s = {}, h = a.split("").entries();
      for (let [m, d] of h)
        s[d] = new X(m % c * t, Math.floor(m / c) * n, t, n);
      return { tex: e, map: s, size: n };
    }
    l($r, "makeFont");
    function Ft(e, t, n, a = g.defTex, c = g.defShader, s = {}) {
      let h = Hr(c);
      if (!h || h instanceof k)
        return;
      (a !== g.curTex || h !== g.curShader || !tn(g.curUniform, s) || g.vqueue.length + e.length * Mt > Pr || g.iqueue.length + t.length > Mr) && Ee();
      let m = n ? g.transform : f.cam.transform.mult(g.transform);
      for (let d of e) {
        let p = Kr(m.multVec2(d.pos));
        g.vqueue.push(p.x, p.y, d.uv.x, d.uv.y, d.color.r / 255, d.color.g / 255, d.color.b / 255, d.opacity);
      }
      for (let d of t)
        g.iqueue.push(d + g.vqueue.length / Mt - e.length);
      g.curTex = a, g.curShader = h, g.curUniform = s;
    }
    l(Ft, "drawRaw");
    function Ee() {
      !g.curTex || !g.curShader || g.vqueue.length === 0 || g.iqueue.length === 0 || (u.bindBuffer(u.ARRAY_BUFFER, g.vbuf), u.bufferSubData(u.ARRAY_BUFFER, 0, new Float32Array(g.vqueue)), u.bindBuffer(u.ELEMENT_ARRAY_BUFFER, g.ibuf), u.bufferSubData(u.ELEMENT_ARRAY_BUFFER, 0, new Uint16Array(g.iqueue)), g.curShader.bind(), g.curShader.send(g.curUniform), g.curTex.bind(), u.drawElements(u.TRIANGLES, g.iqueue.length, u.UNSIGNED_SHORT, 0), g.curTex.unbind(), g.curShader.unbind(), u.bindBuffer(u.ARRAY_BUFFER, null), u.bindBuffer(u.ELEMENT_ARRAY_BUFFER, null), g.vqueue.length = 0, g.iqueue.length = 0, g.drawCalls++);
    }
    l(Ee, "flush");
    function zr() {
      u.clear(u.COLOR_BUFFER_BIT), g.frameBuffer.bind(), u.clear(u.COLOR_BUFFER_BIT), g.bgColor || ve(() => {
        qe({ width: ne(), height: Q(), quad: new X(0, 0, ne() / Ur, Q() / Ur), tex: g.bgTex, fixed: true });
      }), g.drawCalls = 0, g.transformStack.length = 0, g.transform = new Y();
    }
    l(zr, "frameStart");
    function Yr(e, t) {
      g.postShader = e, g.postShaderUniform = t ?? null;
    }
    l(Yr, "usePostEffect");
    function Xr() {
      Ee(), g.frameBuffer.unbind(), ve(() => {
        ft({ flipY: true, tex: g.frameBuffer.tex, scale: new v(1 / o.pixelDensity), shader: g.postShader, uniform: typeof g.postShaderUniform == "function" ? g.postShaderUniform() : g.postShaderUniform, fixed: true });
      }), Ee(), g.lastDrawCalls = g.drawCalls;
    }
    l(Xr, "frameEnd");
    function Kr(e) {
      return new v(e.x / ne() * 2 - 1, -e.y / Q() * 2 + 1);
    }
    l(Kr, "screen2ndc");
    function Jr(e) {
      g.transform = e.clone();
    }
    l(Jr, "pushMatrix");
    function W(...e) {
      if (e[0] === void 0)
        return;
      let t = U(...e);
      t.x === 0 && t.y === 0 || g.transform.translate(t);
    }
    l(W, "pushTranslate");
    function ke(...e) {
      if (e[0] === void 0)
        return;
      let t = U(...e);
      t.x === 1 && t.y === 1 || g.transform.scale(t);
    }
    l(ke, "pushScale");
    function He(e) {
      e && g.transform.rotate(e);
    }
    l(He, "pushRotate");
    function fe() {
      g.transformStack.push(g.transform.clone());
    }
    l(fe, "pushTransform");
    function ue() {
      g.transformStack.length > 0 && (g.transform = g.transformStack.pop());
    }
    l(ue, "popTransform");
    function qe(e) {
      if (e.width === void 0 || e.height === void 0)
        throw new Error('drawUVQuad() requires property "width" and "height".');
      if (e.width <= 0 || e.height <= 0)
        return;
      let t = e.width, n = e.height, c = Ze(e.anchor || Rt).scale(new v(t, n).scale(-0.5)), s = e.quad || new X(0, 0, 1, 1), h = e.color || j(255, 255, 255), m = e.opacity ?? 1, d = e.tex ? Or / e.tex.width : 0, p = e.tex ? Or / e.tex.height : 0, b = s.x + d, T = s.y + p, H = s.w - d * 2, M = s.h - p * 2;
      fe(), W(e.pos), He(e.angle), ke(e.scale), W(c), Ft([{ pos: new v(-t / 2, n / 2), uv: new v(e.flipX ? b + H : b, e.flipY ? T : T + M), color: h, opacity: m }, { pos: new v(-t / 2, -n / 2), uv: new v(e.flipX ? b + H : b, e.flipY ? T + M : T), color: h, opacity: m }, { pos: new v(t / 2, -n / 2), uv: new v(e.flipX ? b : b + H, e.flipY ? T + M : T), color: h, opacity: m }, { pos: new v(t / 2, n / 2), uv: new v(e.flipX ? b : b + H, e.flipY ? T : T + M), color: h, opacity: m }], [0, 1, 3, 1, 2, 3], e.fixed, e.tex, e.shader, e.uniform), ue();
    }
    l(qe, "drawUVQuad");
    function ft(e) {
      if (!e.tex)
        throw new Error('drawTexture() requires property "tex".');
      let t = e.quad ?? new X(0, 0, 1, 1), n = e.tex.width * t.w, a = e.tex.height * t.h, c = new v(1);
      if (e.tiled) {
        let s = Math.ceil((e.width || n) / n), h = Math.ceil((e.height || a) / a), d = Ze(e.anchor || Rt).add(new v(1, 1)).scale(0.5).scale(s * n, h * a);
        for (let p = 0; p < s; p++)
          for (let b = 0; b < h; b++)
            qe(Object.assign(e, { pos: (e.pos || new v(0)).add(new v(n * p, a * b)).sub(d), scale: c.scale(e.scale || new v(1)), tex: e.tex, quad: t, width: n, height: a, anchor: "topleft" }));
      } else
        e.width && e.height ? (c.x = e.width / n, c.y = e.height / a) : e.width ? (c.x = e.width / n, c.y = c.x) : e.height && (c.y = e.height / a, c.x = c.y), qe(Object.assign(e, { scale: c.scale(e.scale || new v(1)), tex: e.tex, quad: t, width: n, height: a }));
    }
    l(ft, "drawTexture");
    function Wr(e) {
      if (!e.sprite)
        throw new Error('drawSprite() requires property "sprite"');
      let t = vn(e.sprite);
      if (!t || !t.data)
        return;
      let n = t.data.frames[e.frame ?? 0];
      if (!n)
        throw new Error(`Frame not found: ${e.frame ?? 0}`);
      ft(Object.assign(e, { tex: t.data.tex, quad: n.scale(e.quad ?? new X(0, 0, 1, 1)) }));
    }
    l(Wr, "drawSprite");
    function tt(e, t, n, a, c, s = 1) {
      a = be(a % 360), c = be(c % 360), c <= a && (c += Math.PI * 2);
      let h = [], m = Math.ceil((c - a) / be(8) * s), d = (c - a) / m;
      for (let p = a; p < c; p += d)
        h.push(e.add(t * Math.cos(p), n * Math.sin(p)));
      return h.push(e.add(t * Math.cos(c), n * Math.sin(c))), h;
    }
    l(tt, "getArcPts");
    function ce(e) {
      if (e.width === void 0 || e.height === void 0)
        throw new Error('drawRect() requires property "width" and "height".');
      if (e.width <= 0 || e.height <= 0)
        return;
      let t = e.width, n = e.height, c = Ze(e.anchor || Rt).add(1, 1).scale(new v(t, n).scale(-0.5)), s = [new v(0, 0), new v(t, 0), new v(t, n), new v(0, n)];
      if (e.radius) {
        let h = Math.min(Math.min(t, n) / 2, e.radius);
        s = [new v(h, 0), new v(t - h, 0), ...tt(new v(t - h, h), h, h, 270, 360), new v(t, h), new v(t, n - h), ...tt(new v(t - h, n - h), h, h, 0, 90), new v(t - h, n), new v(h, n), ...tt(new v(h, n - h), h, h, 90, 180), new v(0, n - h), new v(0, h), ...tt(new v(h, h), h, h, 180, 270)];
      }
      Fe(Object.assign(e, { offset: c, pts: s, ...e.gradient ? { colors: e.horizontal ? [e.gradient[0], e.gradient[1], e.gradient[1], e.gradient[0]] : [e.gradient[0], e.gradient[0], e.gradient[1], e.gradient[1]] } : {} }));
    }
    l(ce, "drawRect");
    function nt(e) {
      let { p1: t, p2: n } = e;
      if (!t || !n)
        throw new Error('drawLine() requires properties "p1" and "p2".');
      let a = e.width || 1, c = n.sub(t).unit().normal().scale(a * 0.5), s = [t.sub(c), t.add(c), n.add(c), n.sub(c)].map((h) => ({ pos: new v(h.x, h.y), uv: new v(0), color: e.color ?? D.WHITE, opacity: e.opacity ?? 1 }));
      Ft(s, [0, 1, 3, 1, 2, 3], e.fixed, g.defTex, e.shader, e.uniform);
    }
    l(nt, "drawLine");
    function xn(e) {
      let t = e.pts;
      if (!t)
        throw new Error('drawLines() requires property "pts".');
      if (!(t.length < 2))
        if (e.radius && t.length >= 3) {
          let n = t[0].sdist(t[1]);
          for (let c = 1; c < t.length - 1; c++)
            n = Math.min(t[c].sdist(t[c + 1]), n);
          let a = Math.min(e.radius, Math.sqrt(n) / 2);
          nt(Object.assign(e, { p1: t[0], p2: t[1] }));
          for (let c = 1; c < t.length - 2; c++) {
            let s = t[c], h = t[c + 1];
            nt(Object.assign(e, { p1: s, p2: h }));
          }
          nt(Object.assign(e, { p1: t[t.length - 2], p2: t[t.length - 1] }));
        } else
          for (let n = 0; n < t.length - 1; n++)
            nt(Object.assign(e, { p1: t[n], p2: t[n + 1] })), e.join !== "none" && Be(Object.assign(e, { pos: t[n], radius: e.width / 2 }));
    }
    l(xn, "drawLines");
    function En(e) {
      if (!e.p1 || !e.p2 || !e.p3)
        throw new Error('drawPolygon() requires properties "p1", "p2" and "p3".');
      return Fe(Object.assign(e, { pts: [e.p1, e.p2, e.p3] }));
    }
    l(En, "drawTriangle");
    function Be(e) {
      if (!e.radius)
        throw new Error('drawCircle() requires property "radius".');
      e.radius !== 0 && Cn(Object.assign(e, { radiusX: e.radius, radiusY: e.radius, angle: 0 }));
    }
    l(Be, "drawCircle");
    function Cn(e) {
      if (e.radiusX === void 0 || e.radiusY === void 0)
        throw new Error('drawEllipse() requires properties "radiusX" and "radiusY".');
      if (e.radiusX === 0 || e.radiusY === 0)
        return;
      let t = e.start ?? 0, n = e.end ?? 360, a = Ze(e.anchor ?? "center").scale(new v(-e.radiusX, -e.radiusY)), c = tt(a, e.radiusX, e.radiusY, t, n, e.resolution);
      c.unshift(a);
      let s = Object.assign(e, { pts: c, radius: 0, ...e.gradient ? { colors: [e.gradient[0], ...Array(c.length - 1).fill(e.gradient[1])] } : {} });
      if (n - t >= 360 && e.outline) {
        e.fill !== false && Fe(Object.assign(s, { outline: null })), Fe(Object.assign(s, { pts: c.slice(1), fill: false }));
        return;
      }
      Fe(s);
    }
    l(Cn, "drawEllipse");
    function Fe(e) {
      if (!e.pts)
        throw new Error('drawPolygon() requires property "pts".');
      let t = e.pts.length;
      if (!(t < 3)) {
        if (fe(), W(e.pos), ke(e.scale), He(e.angle), W(e.offset), e.fill !== false) {
          let n = e.color ?? D.WHITE, a = e.pts.map((s, h) => ({ pos: new v(s.x, s.y), uv: new v(0, 0), color: e.colors ? e.colors[h] ?? n : n, opacity: e.opacity ?? 1 })), c = [...Array(t - 2).keys()].map((s) => [0, s + 1, s + 2]).flat();
          Ft(a, e.indices ?? c, e.fixed, g.defTex, e.shader, e.uniform);
        }
        e.outline && xn({ pts: [...e.pts, e.pts[0]], radius: e.radius, width: e.outline.width, color: e.outline.color, join: e.outline.join, uniform: e.uniform, fixed: e.fixed, opacity: e.opacity }), ue();
      }
    }
    l(Fe, "drawPolygon");
    function Sn(e, t, n) {
      Ee(), u.clear(u.STENCIL_BUFFER_BIT), u.enable(u.STENCIL_TEST), u.stencilFunc(u.NEVER, 1, 255), u.stencilOp(u.REPLACE, u.REPLACE, u.REPLACE), t(), Ee(), u.stencilFunc(n, 1, 255), u.stencilOp(u.KEEP, u.KEEP, u.KEEP), e(), Ee(), u.disable(u.STENCIL_TEST);
    }
    l(Sn, "drawStenciled");
    function Qr(e, t) {
      Sn(e, t, u.EQUAL);
    }
    l(Qr, "drawMasked");
    function Zr(e, t) {
      Sn(e, t, u.NOTEQUAL);
    }
    l(Zr, "drawSubtracted");
    function Tn() {
      return (g.viewport.width + g.viewport.height) / (g.width + g.height);
    }
    l(Tn, "getViewportScale");
    function ve(e) {
      Ee();
      let t = g.width, n = g.height;
      g.width = g.viewport.width, g.height = g.viewport.height, e(), Ee(), g.width = t, g.height = n;
    }
    l(ve, "drawUnscaled");
    function An(e, t) {
      t.pos && (e.pos = e.pos.add(t.pos)), t.scale && (e.scale = e.scale.scale(U(t.scale))), t.angle && (e.angle += t.angle), t.color && (e.color = e.color.mult(t.color)), t.opacity && (e.opacity *= t.opacity);
    }
    l(An, "applyCharTransform");
    let On = /\[(?<style>\w+)\](?<text>.*?)\[\/\k<style>\]/g;
    function ei(e) {
      let t = {}, n = e.replace(On, "$2"), a = 0;
      for (let c of e.matchAll(On)) {
        let s = c.index - a;
        for (let h = 0; h < c.groups.text.length; h++)
          t[h + s] = [c.groups.style];
        a += c[0].length - c.groups.text.length;
      }
      return { charStyleMap: t, text: n };
    }
    l(ei, "compileStyledText");
    let Lt = {};
    function Le(e) {
      if (e.text === void 0)
        throw new Error('formatText() requires property "text".');
      let t = bn(e.font);
      if (e.text === "" || t instanceof k || !t)
        return { width: 0, height: 0, chars: [], opt: e };
      let { charStyleMap: n, text: a } = ei(e.text + ""), c = a.split("");
      if (t instanceof xe || typeof t == "string") {
        let G = t instanceof xe ? t.fontface.family : t, V = t instanceof xe ? { outline: t.outline, filter: t.filter } : { outline: 0, filter: Rr }, R = Lt[G] ?? { font: { tex: new y(Cr, Sr, { filter: V.filter }), map: {}, size: xr }, cursor: new v(0), outline: V.outline };
        Lt[G] || (Lt[G] = R), t = R.font;
        for (let le of c)
          if (!R.font.map[le]) {
            let w = o.fontCacheCtx;
            w.clearRect(0, 0, o.fontCacheCanvas.width, o.fontCacheCanvas.height), w.font = `${t.size}px ${G}`, w.textBaseline = "top", w.textAlign = "left", w.fillStyle = "#ffffff";
            let S = w.measureText(le), C = Math.ceil(S.width), O = t.size;
            R.outline && (w.lineJoin = "round", w.lineWidth = R.outline * 2, w.strokeStyle = "#000000", w.strokeText(le, R.outline, R.outline), C += R.outline * 2, O += R.outline * 3), w.fillText(le, R.outline, R.outline);
            let L = w.getImageData(0, 0, C, O);
            if (R.cursor.x + C > Cr && (R.cursor.x = 0, R.cursor.y += O, R.cursor.y > Sr))
              throw new Error("Font atlas exceeds character limit");
            t.tex.update(L, R.cursor.x, R.cursor.y), t.map[le] = new X(R.cursor.x, R.cursor.y, C, O), R.cursor.x += C;
          }
      }
      let s = e.size || t.size, h = U(e.scale ?? 1).scale(s / t.size), m = e.lineSpacing ?? 0, d = e.letterSpacing ?? 0, p = 0, b = 0, T = 0, H = [], M = [], I = 0, E = null, x = null;
      for (; I < c.length; ) {
        let G = c[I];
        if (G === `
`)
          T += s + m, H.push({ width: p - d, chars: M }), E = null, x = null, p = 0, M = [];
        else {
          let V = t.map[G];
          if (V) {
            let R = V.w * h.x;
            e.width && p + R > e.width && (T += s + m, E != null && (I -= M.length - E, G = c[I], V = t.map[G], R = V.w * h.x, M = M.slice(0, E - 1), p = x), E = null, x = null, H.push({ width: p - d, chars: M }), p = 0, M = []), M.push({ tex: t.tex, width: V.w, height: V.h, quad: new X(V.x / t.tex.width, V.y / t.tex.height, V.w / t.tex.width, V.h / t.tex.height), ch: G, pos: new v(p, T), opacity: e.opacity ?? 1, color: e.color ?? D.WHITE, scale: U(h), angle: 0 }), G === " " && (E = M.length, x = p), p += R, b = Math.max(b, p), p += d;
          }
        }
        I++;
      }
      H.push({ width: p - d, chars: M }), T += s, e.width && (b = e.width);
      let J = [];
      for (let G of H) {
        let V = (b - G.width) * Oo(e.align ?? "left");
        for (let R of G.chars) {
          let le = t.map[R.ch], w = J.length;
          if (R.pos = R.pos.add(V, 0).add(le.w * h.x * 0.5, le.h * h.y * 0.5), e.transform) {
            let S = typeof e.transform == "function" ? e.transform(w, R.ch) : e.transform;
            S && An(R, S);
          }
          if (n[w]) {
            let S = n[w];
            for (let C of S) {
              let O = e.styles[C], L = typeof O == "function" ? O(w, R.ch) : O;
              L && An(R, L);
            }
          }
          J.push(R);
        }
      }
      return { width: b, height: T, chars: J, opt: e };
    }
    l(Le, "formatText");
    function mt(e) {
      Ge(Le(e));
    }
    l(mt, "drawText");
    function Ge(e) {
      fe(), W(e.opt.pos), He(e.opt.angle), W(Ze(e.opt.anchor ?? "topleft").add(1, 1).scale(e.width, e.height).scale(-0.5)), e.chars.forEach((t) => {
        qe({ tex: t.tex, width: t.width, height: t.height, pos: t.pos, scale: t.scale, angle: t.angle, color: t.color, opacity: t.opacity, quad: t.quad, anchor: "center", uniform: e.opt.uniform, shader: e.opt.shader, fixed: e.opt.fixed });
      }), ue();
    }
    l(Ge, "drawFormattedText");
    function Rn() {
      let e = o.pixelDensity, t = u.drawingBufferWidth / e, n = u.drawingBufferHeight / e;
      if (Dn()) {
        let c = window.innerWidth, s = window.innerHeight, h = c / s, m = t / n;
        if (h > m) {
          let d = window.innerHeight * m;
          g.viewport = { x: (c - d) / 2, y: 0, width: d, height: s };
        } else {
          let d = window.innerWidth / m;
          g.viewport = { x: 0, y: (s - d) / 2, width: c, height: d };
        }
        return;
      }
      if (i.letterbox) {
        if (!i.width || !i.height)
          throw new Error("Letterboxing requires width and height defined.");
        let c = t / n, s = i.width / i.height;
        if (c > s) {
          i.stretch || (g.width = n * s, g.height = n);
          let h = n * s, m = n, d = (t - h) / 2;
          u.scissor(d * e, 0, h * e, m * e), u.viewport(d * e, 0, h * e, n * e), g.viewport = { x: d, y: 0, width: h, height: n };
        } else {
          i.stretch || (g.width = t, g.height = t / s);
          let h = t, m = t / s, d = (n - m) / 2;
          u.scissor(0, d * e, h * e, m * e), u.viewport(0, d * e, t * e, m * e), g.viewport = { x: 0, y: d, width: t, height: m };
        }
        return;
      }
      if (i.stretch) {
        if (!i.width || !i.height)
          throw new Error("Stretching requires width and height defined.");
        u.viewport(0, 0, t * e, n * e), g.viewport = { x: 0, y: 0, width: t, height: n };
        return;
      }
      let a = i.scale ?? 1;
      g.width = t / a, g.height = n / a, u.viewport(0, 0, t * e, n * e), g.viewport = { x: 0, y: 0, width: t, height: n };
    }
    l(Rn, "updateViewport");
    function ne() {
      return g.width;
    }
    l(ne, "width");
    function Q() {
      return g.height;
    }
    l(Q, "height");
    let se = {}, rt = {}, Oe = {};
    function it(e) {
      return new v((e.x - g.viewport.x) * ne() / g.viewport.width, (e.y - g.viewport.y) * Q() / g.viewport.height);
    }
    l(it, "windowToContent");
    function ti(e) {
      return new v(e.x * g.viewport.width / g.width, e.y * g.viewport.height / g.height);
    }
    l(ti, "contentToView");
    function Gt(e, t) {
      let n = it(new v(e, t));
      o.mousePos = n, o.mouseStarted = true, o.isMouseMoved = true;
    }
    l(Gt, "setMousePos"), se.mousemove = (e) => {
      let [t, n] = [e.offsetX, e.offsetY], [a, c] = [e.movementX, e.movementY];
      f.ev.onOnce("input", () => {
        Gt(t, n), o.mouseDeltaPos = U(a, c), f.ev.trigger("mouseMove");
      });
    }, se.mousedown = (e) => {
      f.ev.onOnce("input", () => {
        let t = br[e.button];
        t && o.mouseState.press(t), f.ev.trigger("mousePress", t);
      });
    }, se.mouseup = (e) => {
      f.ev.onOnce("input", () => {
        let t = br[e.button];
        t && o.mouseState.release(t), f.ev.trigger("mouseRelease", t);
      });
    }, se.keydown = (e) => {
      go2.has(e.key) && e.preventDefault(), f.ev.onOnce("input", () => {
        let t = vr[e.key] || e.key.toLowerCase();
        t.length === 1 ? (f.ev.trigger("charInput", t), o.charInputted.push(t)) : t === "space" && (f.ev.trigger("charInput", " "), o.charInputted.push(" ")), e.repeat ? (o.keyState.pressRepeat(t), f.ev.trigger("keyPressRepeat", t)) : (o.keyState.press(t), f.ev.trigger("keyPressRepeat", t), f.ev.trigger("keyPress", t));
      });
    }, se.keyup = (e) => {
      f.ev.onOnce("input", () => {
        let t = vr[e.key] || e.key.toLowerCase();
        o.keyState.release(t), f.ev.trigger("keyRelease", t);
      });
    }, se.touchstart = (e) => {
      e.preventDefault(), f.ev.onOnce("input", () => {
        let t = [...e.changedTouches];
        t.forEach((n) => {
          f.ev.trigger("touchStart", it(new v(n.clientX, n.clientY)), n);
        }), i.touchToMouse !== false && (Gt(t[0].clientX, t[0].clientY), o.mouseState.press("left"), f.ev.trigger("mousePress", "left"));
      });
    }, se.touchmove = (e) => {
      e.preventDefault(), f.ev.onOnce("input", () => {
        let t = [...e.changedTouches];
        t.forEach((n) => {
          f.ev.trigger("touchMove", it(new v(n.clientX, n.clientY)), n);
        }), i.touchToMouse !== false && (f.ev.trigger("mouseMove"), Gt(t[0].clientX, t[0].clientY));
      });
    }, se.touchend = (e) => {
      f.ev.onOnce("input", () => {
        [...e.changedTouches].forEach((n) => {
          f.ev.trigger("touchEnd", it(new v(n.clientX, n.clientY)), n);
        }), i.touchToMouse !== false && (o.mouseState.release("left"), f.ev.trigger("mouseRelease", "left"));
      });
    }, se.touchcancel = (e) => {
      f.ev.onOnce("input", () => {
        [...e.changedTouches].forEach((n) => {
          f.ev.trigger("touchEnd", it(new v(n.clientX, n.clientY)), n);
        }), i.touchToMouse !== false && (o.mouseState.release("left"), f.ev.trigger("mouseRelease", "left"));
      });
    }, se.wheel = (e) => {
      e.preventDefault(), f.ev.onOnce("input", () => {
        f.ev.trigger("scroll", new v(e.deltaX, e.deltaY));
      });
    }, se.contextmenu = (e) => e.preventDefault(), rt.visibilitychange = () => {
      switch (document.visibilityState) {
        case "visible":
          o.skipTime = true, z.paused || F.ctx.resume();
          break;
        case "hidden":
          o.keyState = new Ue(), o.mouseState = new Ue(), o.virtualButtonState = new Ue(), i.backgroundAudio || F.ctx.suspend();
          break;
      }
    }, Oe.error = (e) => {
      e.error ? qt(e.error) : qt(new Error(e.message));
    }, Oe.gamepadconnected = (e) => {
      f.ev.onOnce("input", () => {
        f.ev.trigger("gamepadConnect", e.gamepad);
      });
    }, Oe.gamepaddisconnected = (e) => {
      f.ev.onOnce("input", () => {
        f.ev.trigger("gamepadDisconnect", e.gamepad);
      });
    }, Oe.unhandledrejection = (e) => qt(e.reason);
    for (let e in se)
      o.canvas.addEventListener(e, se[e]);
    for (let e in rt)
      document.addEventListener(e, rt[e]);
    for (let e in Oe)
      window.addEventListener(e, Oe[e]);
    function $e() {
      return o.mousePos.clone();
    }
    l($e, "mousePos");
    function Pn() {
      return o.mouseDeltaPos.clone();
    }
    l(Pn, "mouseDeltaPos");
    function pt(e = "left") {
      return o.mouseState.pressed.has(e);
    }
    l(pt, "isMousePressed");
    function ni(e = "left") {
      return o.mouseState.down.has(e);
    }
    l(ni, "isMouseDown");
    function Vt(e = "left") {
      return o.mouseState.released.has(e);
    }
    l(Vt, "isMouseReleased");
    function ri() {
      return o.isMouseMoved;
    }
    l(ri, "isMouseMoved");
    function ii(e) {
      return e === void 0 ? o.keyState.pressed.size > 0 : o.keyState.pressed.has(e);
    }
    l(ii, "isKeyPressed");
    function si(e) {
      return e === void 0 ? o.keyState.pressedRepeat.size > 0 : o.keyState.pressedRepeat.has(e);
    }
    l(si, "isKeyPressedRepeat");
    function oi(e) {
      return e === void 0 ? o.keyState.down.size > 0 : o.keyState.down.has(e);
    }
    l(oi, "isKeyDown");
    function ai(e) {
      return e === void 0 ? o.keyState.released.size > 0 : o.keyState.released.has(e);
    }
    l(ai, "isKeyReleased");
    function ui(e) {
      return o.virtualButtonState.pressed.has(e);
    }
    l(ui, "isVirtualButtonPressed");
    function ci(e) {
      return o.virtualButtonState.down.has(e);
    }
    l(ci, "isVirtualButtonDown");
    function li(e) {
      return o.virtualButtonState.released.has(e);
    }
    l(li, "isVirtualButtonReleased");
    function hi(e) {
      return e === void 0 ? o.gamepadButtonState.pressed.size > 0 : o.gamepadButtonState.pressed.has(e);
    }
    l(hi, "isGamepadButtonPressed");
    function di(e) {
      return e === void 0 ? o.gamepadButtonState.down.size > 0 : o.gamepadButtonState.down.has(e);
    }
    l(di, "isGamepadButtonDown");
    function fi(e) {
      return e === void 0 ? o.gamepadButtonState.released.size > 0 : o.gamepadButtonState.released.has(e);
    }
    l(fi, "isGamepadButtonReleased");
    function mi() {
      return [...o.charInputted];
    }
    l(mi, "charInputted");
    function It() {
      return o.time;
    }
    l(It, "time");
    function pi() {
      return o.canvas.toDataURL();
    }
    l(pi, "screenshot");
    function Mn(e) {
      o.canvas.style.cursor = e;
    }
    l(Mn, "setCursor");
    function gi() {
      return o.canvas.style.cursor;
    }
    l(gi, "getCursor");
    function wi(e) {
      if (e)
        try {
          let t = o.canvas.requestPointerLock();
          t.catch && t.catch((n) => console.error(n));
        } catch (t) {
          console.error(t);
        }
      else
        document.exitPointerLock();
    }
    l(wi, "setCursorLocked");
    function vi() {
      return !!document.pointerLockElement;
    }
    l(vi, "isCursorLocked");
    function bi(e = true) {
      e ? So(o.canvas) : To();
    }
    l(bi, "setFullscreen");
    function Dn() {
      return Boolean(Ao());
    }
    l(Dn, "isFullscreen");
    function Bn() {
      return o.isTouchScreen;
    }
    l(Bn, "isTouchScreen");
    let z = { inspect: false, timeScale: 1, showLog: true, fps: () => o.fpsCounter.fps, numFrames: () => o.numFrames, stepFrame: Xn, drawCalls: () => g.drawCalls, clearLog: () => f.logs = [], log: (e) => {
      let t = i.logMax ?? yo, n = e instanceof Error ? "error" : "info";
      f.logs.unshift(`${`[time]${It().toFixed(2)}[/time] `}[${n}]${e?.toString ? e.toString() : e}[/${n}]`), f.logs.length > t && (f.logs = f.logs.slice(0, t));
    }, error: (e) => z.log(new Error(e.toString ? e.toString() : e)), curRecording: null, get paused() {
      return o.paused;
    }, set paused(e) {
      o.paused = e, e ? F.ctx.suspend() : F.ctx.resume();
    } };
    function me() {
      return o.dt * z.timeScale;
    }
    l(me, "dt");
    function yi(...e) {
      return e.length > 0 && (f.cam.pos = U(...e)), f.cam.pos ? f.cam.pos.clone() : Ut();
    }
    l(yi, "camPos");
    function Ui(...e) {
      return e.length > 0 && (f.cam.scale = U(...e)), f.cam.scale.clone();
    }
    l(Ui, "camScale");
    function xi(e) {
      return e !== void 0 && (f.cam.angle = e), f.cam.angle;
    }
    l(xi, "camRot");
    function Ei(e = 12) {
      f.cam.shake = e;
    }
    l(Ei, "shake");
    function jt(e) {
      return f.cam.transform.multVec2(e);
    }
    l(jt, "toScreen");
    function Fn(e) {
      return f.cam.transform.invert().multVec2(e);
    }
    l(Fn, "toWorld");
    function gt(e) {
      let t = new Y();
      return e.pos && t.translate(e.pos), e.scale && t.scale(e.scale), e.angle && t.rotate(e.angle), e.parent ? t.mult(e.parent.transform) : t;
    }
    l(gt, "calcTransform");
    function Ln(e) {
      let t = /* @__PURE__ */ new Map(), n = {}, a = new ye(), c = { id: mr(), hidden: false, paused: false, transform: new Y(), children: [], parent: null, add(s) {
        let h = (() => {
          if (Array.isArray(s))
            return Ln(s);
          if (s.parent)
            throw new Error("Cannot add a game obj that already has a parent.");
          return s;
        })();
        return h.parent = this, h.transform = gt(h), this.children.push(h), h.trigger("add", h), f.ev.trigger("add", h), h;
      }, readd(s) {
        let h = this.children.indexOf(s);
        return h !== -1 && (this.children.splice(h, 1), this.children.push(s)), s;
      }, remove(s) {
        let h = this.children.indexOf(s);
        h !== -1 && (s.trigger("destroy"), f.ev.trigger("destroy", s), s.parent = null, this.children.splice(h, 1));
      }, removeAll(s) {
        this.get(s).forEach((h) => this.remove(h));
      }, update() {
        this.paused || (this.children.sort((s, h) => (s.z ?? 0) - (h.z ?? 0)).forEach((s) => s.update()), this.trigger("update"));
      }, draw() {
        this.hidden || (fe(), W(this.pos), ke(this.scale), He(this.angle), this.trigger("draw"), this.children.sort((s, h) => (s.z ?? 0) - (h.z ?? 0)).forEach((s) => s.draw()), ue());
      }, drawInspect() {
        this.hidden || (fe(), W(this.pos), ke(this.scale), He(this.angle), this.children.sort((s, h) => (s.z ?? 0) - (h.z ?? 0)).forEach((s) => s.drawInspect()), this.trigger("drawInspect"), ue());
      }, use(s) {
        if (!s)
          return;
        if (typeof s == "string")
          return this.use({ id: s });
        let h = [];
        s.id && (this.unuse(s.id), n[s.id] = [], h = n[s.id], t.set(s.id, s));
        for (let d in s) {
          if (Eo.has(d))
            continue;
          let p = Object.getOwnPropertyDescriptor(s, d);
          if (typeof p.value == "function" && (s[d] = s[d].bind(this)), p.set && Object.defineProperty(s, d, { set: p.set.bind(this) }), p.get && Object.defineProperty(s, d, { get: p.get.bind(this) }), Co.has(d))
            h.push(this.on(d, s[d]).cancel);
          else if (this[d] === void 0)
            Object.defineProperty(this, d, { get: () => s[d], set: (b) => s[d] = b, configurable: true, enumerable: true }), h.push(() => delete this[d]);
          else
            throw new Error(`Duplicate component property: "${d}"`);
        }
        let m = l(() => {
          if (s.require) {
            for (let d of s.require)
              if (!this.c(d))
                throw new Error(`Component "${s.id}" requires component "${d}"`);
          }
        }, "checkDeps");
        s.destroy && h.push(s.destroy.bind(this)), this.exists() ? (m(), s.add && s.add.call(this)) : s.require && h.push(this.on("add", m).cancel);
      }, unuse(s) {
        n[s] && (n[s].forEach((h) => h()), delete n[s]), t.has(s) && t.delete(s);
      }, c(s) {
        return t.get(s);
      }, get(s, h = {}) {
        let m = h.recursive ? this.children.flatMap((d) => [d, ...d.children]) : this.children;
        if (m = m.filter((d) => s ? d.is(s) : true), h.liveUpdate) {
          let d = l((p) => h.recursive ? this.isAncestorOf(p) : p.parent === this, "isChild");
          _t((p) => {
            d(p) && p.is(s) && m.push(p);
          }), Gn((p) => {
            if (d(p) && p.is(s)) {
              let b = m.findIndex((T) => T.id === p.id);
              b !== -1 && m.splice(b, 1);
            }
          });
        }
        return m;
      }, isAncestorOf(s) {
        return s.parent ? s.parent === this || this.isAncestorOf(s.parent) : false;
      }, exists() {
        return f.root.isAncestorOf(this);
      }, is(s) {
        if (s === "*")
          return true;
        if (Array.isArray(s)) {
          for (let h of s)
            if (!this.c(h))
              return false;
          return true;
        } else
          return this.c(s) != null;
      }, on(s, h) {
        return a.on(s, h.bind(this));
      }, trigger(s, ...h) {
        a.trigger(s, ...h), f.objEvents.trigger(s, this, ...h);
      }, destroy() {
        this.parent && this.parent.remove(this);
      }, inspect() {
        let s = {};
        for (let [h, m] of t)
          s[h] = m.inspect ? m.inspect() : null;
        return s;
      }, onAdd(s) {
        return this.on("add", s);
      }, onUpdate(s) {
        return this.on("update", s);
      }, onDraw(s) {
        return this.on("draw", s);
      }, onDestroy(s) {
        return this.on("destroy", s);
      }, clearEvents() {
        a.clear();
      } };
      for (let s of e)
        c.use(s);
      return c;
    }
    l(Ln, "make");
    function Re(e, t, n) {
      return f.objEvents[e] || (f.objEvents[e] = new je()), f.objEvents.on(e, (a, ...c) => {
        a.is(t) && n(a, ...c);
      });
    }
    l(Re, "on");
    let Nt = l((e, t) => {
      if (typeof e == "function" && t === void 0) {
        let n = ot([{ update: e }]);
        return { get paused() {
          return n.paused;
        }, set paused(a) {
          n.paused = a;
        }, cancel: () => n.destroy() };
      } else if (typeof e == "string")
        return Re("update", e, t);
    }, "onUpdate"), Ci = l((e, t) => {
      if (typeof e == "function" && t === void 0) {
        let n = ot([{ draw: e }]);
        return { get paused() {
          return n.hidden;
        }, set paused(a) {
          n.hidden = a;
        }, cancel: () => n.destroy() };
      } else if (typeof e == "string")
        return Re("draw", e, t);
    }, "onDraw");
    function _t(e, t) {
      if (typeof e == "function" && t === void 0)
        return f.ev.on("add", e);
      if (typeof e == "string")
        return Re("add", e, t);
    }
    l(_t, "onAdd");
    function Gn(e, t) {
      if (typeof e == "function" && t === void 0)
        return f.ev.on("destroy", e);
      if (typeof e == "string")
        return Re("destroy", e, t);
    }
    l(Gn, "onDestroy");
    function Si(e, t, n) {
      return Re("collide", e, (a, c, s) => c.is(t) && n(a, c, s));
    }
    l(Si, "onCollide");
    function Ti(e, t, n) {
      return Re("collideUpdate", e, (a, c, s) => c.is(t) && n(a, c, s));
    }
    l(Ti, "onCollideUpdate");
    function Ai(e, t, n) {
      return Re("collideEnd", e, (a, c, s) => c.is(t) && n(a, c, s));
    }
    l(Ai, "onCollideEnd");
    function wt(e, t) {
      zn(e).forEach(t), _t(e, t);
    }
    l(wt, "forAllCurrentAndFuture");
    function Oi(e, t) {
      if (typeof e == "function")
        return Vn(e);
      {
        let n = [];
        return wt(e, (a) => {
          if (!a.area)
            throw new Error("onClick() requires the object to have area() component");
          n.push(a.onClick(() => t(a)));
        }), pe.join(n);
      }
    }
    l(Oi, "onClick");
    function Ri(e, t) {
      let n = [];
      return wt(e, (a) => {
        if (!a.area)
          throw new Error("onHover() requires the object to have area() component");
        n.push(a.onHover(() => t(a)));
      }), pe.join(n);
    }
    l(Ri, "onHover");
    function Pi(e, t) {
      let n = [];
      return wt(e, (a) => {
        if (!a.area)
          throw new Error("onHoverUpdate() requires the object to have area() component");
        n.push(a.onHoverUpdate(() => t(a)));
      }), pe.join(n);
    }
    l(Pi, "onHoverUpdate");
    function Mi(e, t) {
      let n = [];
      return wt(e, (a) => {
        if (!a.area)
          throw new Error("onHoverEnd() requires the object to have area() component");
        n.push(a.onHoverEnd(() => t(a)));
      }), pe.join(n);
    }
    l(Mi, "onHoverEnd");
    function vt(e, t) {
      let n = 0, a = [];
      t && a.push(t);
      let c = Nt(() => {
        n += me(), n >= e && (c.cancel(), a.forEach((s) => s()));
      });
      return { paused: c.paused, cancel: c.cancel, onEnd(s) {
        a.push(s);
      }, then(s) {
        return this.onEnd(s), this;
      } };
    }
    l(vt, "wait");
    function Di(e, t) {
      let n = null, a = l(() => {
        n = vt(e, a), t();
      }, "newAction");
      return n = vt(0, a), { get paused() {
        return n.paused;
      }, set paused(c) {
        n.paused = c;
      }, cancel: () => n.cancel() };
    }
    l(Di, "loop");
    let Bi = l((e, t) => {
      if (typeof e == "function")
        return f.ev.on("keyDown", e);
      if (typeof e == "string" && typeof t == "function")
        return f.ev.on("keyDown", (n) => n === e && t(e));
    }, "onKeyDown"), Pe = l((e, t) => {
      if (typeof e == "function")
        return f.ev.on("keyPress", e);
      if (typeof e == "string" && typeof t == "function")
        return f.ev.on("keyPress", (n) => n === e && t(e));
    }, "onKeyPress"), Fi = l((e, t) => {
      if (typeof e == "function")
        return f.ev.on("keyPressRepeat", e);
      if (typeof e == "string" && typeof t == "function")
        return f.ev.on("keyPressRepeat", (n) => n === e && t(e));
    }, "onKeyPressRepeat"), Li = l((e, t) => {
      if (typeof e == "function")
        return f.ev.on("keyRelease", e);
      if (typeof e == "string" && typeof t == "function")
        return f.ev.on("keyRelease", (n) => n === e && t(e));
    }, "onKeyRelease");
    function Gi(e, t) {
      return typeof e == "function" ? f.ev.on("mouseDown", (n) => e(n)) : f.ev.on("mouseDown", (n) => n === e && t(n));
    }
    l(Gi, "onMouseDown");
    function Vn(e, t) {
      return typeof e == "function" ? f.ev.on("mousePress", (n) => e(n)) : f.ev.on("mousePress", (n) => n === e && t(n));
    }
    l(Vn, "onMousePress");
    function Vi(e, t) {
      return typeof e == "function" ? f.ev.on("mouseRelease", (n) => e(n)) : f.ev.on("mouseRelease", (n) => n === e && t(n));
    }
    l(Vi, "onMouseRelease");
    function Ii(e) {
      return f.ev.on("mouseMove", () => e($e(), Pn()));
    }
    l(Ii, "onMouseMove");
    function ji(e) {
      return f.ev.on("charInput", e);
    }
    l(ji, "onCharInput");
    function Ni(e) {
      return f.ev.on("touchStart", e);
    }
    l(Ni, "onTouchStart");
    function _i(e) {
      return f.ev.on("touchMove", e);
    }
    l(_i, "onTouchMove");
    function ki(e) {
      return f.ev.on("touchEnd", e);
    }
    l(ki, "onTouchEnd");
    function Hi(e) {
      return f.ev.on("scroll", e);
    }
    l(Hi, "onScroll");
    function qi(e, t) {
      return f.ev.on("virtualButtonDown", (n) => n === e && t());
    }
    l(qi, "onVirtualButtonDown");
    function $i(e, t) {
      return f.ev.on("virtualButtonPress", (n) => n === e && t());
    }
    l($i, "onVirtualButtonPress");
    function zi(e, t) {
      return f.ev.on("virtualButtonRelease", (n) => n === e && t());
    }
    l(zi, "onVirtualButtonRelease");
    function Yi(e, t) {
      if (typeof e == "function")
        return f.ev.on("gamepadButtonDown", e);
      if (typeof e == "string" && typeof t == "function")
        return f.ev.on("gamepadButtonDown", (n) => n === e && t(e));
    }
    l(Yi, "onGamepadButtonDown");
    function Xi(e, t) {
      if (typeof e == "function")
        return f.ev.on("gamepadButtonPress", e);
      if (typeof e == "string" && typeof t == "function")
        return f.ev.on("gamepadButtonPress", (n) => n === e && t(e));
    }
    l(Xi, "onGamepadButtonPress");
    function Ki(e, t) {
      if (typeof e == "function")
        return f.ev.on("gamepadButtonRelease", e);
      if (typeof e == "string" && typeof t == "function")
        return f.ev.on("gamepadButtonRelease", (n) => n === e && t(e));
    }
    l(Ki, "onGamepadButtonRelease");
    function Ji(e, t) {
      return f.ev.on("gamepadStick", (n, a) => n === e && t(a));
    }
    l(Ji, "onGamepadStick");
    function In() {
      Pe("f1", () => {
        z.inspect = !z.inspect;
      }), Pe("f2", () => {
        z.clearLog();
      }), Pe("f8", () => {
        z.paused = !z.paused;
      }), Pe("f7", () => {
        z.timeScale = st(Me(z.timeScale - 0.2, 0, 2), 1);
      }), Pe("f9", () => {
        z.timeScale = st(Me(z.timeScale + 0.2, 0, 2), 1);
      }), Pe("f10", () => {
        z.stepFrame();
      });
    }
    l(In, "enterDebugMode");
    function jn() {
      Pe("b", () => Un());
    }
    l(jn, "enterBurpMode");
    function Wi(e) {
      f.gravity = e;
    }
    l(Wi, "setGravity");
    function Qi() {
      return f.gravity;
    }
    l(Qi, "getGravity");
    function Zi(...e) {
      e.length === 1 || e.length === 2 ? (g.bgColor = j(e[0]), e[1] && (g.bgAlpha = e[1])) : (e.length === 3 || e.length === 4) && (g.bgColor = j(e[0], e[1], e[2]), e[3] && (g.bgAlpha = e[3])), u.clearColor(g.bgColor.r / 255, g.bgColor.g / 255, g.bgColor.b / 255, g.bgAlpha);
    }
    l(Zi, "setBackground");
    function es() {
      return g.bgColor.clone();
    }
    l(es, "getBackground");
    function ts() {
      return navigator.getGamepads().filter((e) => e !== null);
    }
    l(ts, "getGamepads");
    function bt(...e) {
      return { id: "pos", pos: U(...e), moveBy(...t) {
        this.pos = this.pos.add(U(...t));
      }, move(...t) {
        this.moveBy(U(...t).scale(me()));
      }, moveTo(...t) {
        if (typeof t[0] == "number" && typeof t[1] == "number")
          return this.moveTo(U(t[0], t[1]), t[2]);
        let n = t[0], a = t[1];
        if (a === void 0) {
          this.pos = U(n);
          return;
        }
        let c = n.sub(this.pos);
        if (c.len() <= a * me()) {
          this.pos = U(n);
          return;
        }
        this.move(c.unit().scale(a));
      }, worldPos() {
        return this.parent ? this.parent.transform.multVec2(this.pos) : this.pos;
      }, screenPos() {
        return this.fixed ? this.pos : jt(this.pos);
      }, inspect() {
        return `(${Math.round(this.pos.x)}, ${Math.round(this.pos.y)})`;
      }, drawInspect() {
        Be({ color: j(255, 0, 0), radius: 4 / Tn() });
      } };
    }
    l(bt, "pos");
    function yt(...e) {
      return e.length === 0 ? yt(1) : { id: "scale", scale: U(...e), scaleTo(...t) {
        this.scale = U(...t);
      }, scaleBy(...t) {
        this.scale.scale(U(...t));
      }, inspect() {
        return `(${st(this.scale.x, 2)}, ${st(this.scale.y, 2)})`;
      } };
    }
    l(yt, "scale");
    function ns(e) {
      return { id: "rotate", angle: e ?? 0, rotateBy(t) {
        this.angle += t;
      }, rotateTo(t) {
        this.angle = t;
      }, inspect() {
        return `${Math.round(this.angle)}`;
      } };
    }
    l(ns, "rotate");
    function rs(...e) {
      return { id: "color", color: j(...e), inspect() {
        return this.color.toString();
      } };
    }
    l(rs, "color");
    function st(e, t) {
      return Number(e.toFixed(t));
    }
    l(st, "toFixed");
    function is(e) {
      return { id: "opacity", opacity: e ?? 1, inspect() {
        return `${st(this.opacity, 1)}`;
      }, fadeOut(t = 1, n = ct.linear) {
        return $t(this.opacity, 0, t, (a) => this.opacity = a, n);
      } };
    }
    l(is, "opacity");
    function kt(e) {
      if (!e)
        throw new Error("Please define an anchor");
      return { id: "anchor", anchor: e, inspect() {
        return typeof this.anchor == "string" ? this.anchor : this.anchor.toString();
      } };
    }
    l(kt, "anchor");
    function ss(e) {
      return { id: "z", z: e, inspect() {
        return `${this.z}`;
      } };
    }
    l(ss, "z");
    function os(e, t) {
      return { id: "follow", require: ["pos"], follow: { obj: e, offset: t ?? U(0) }, add() {
        e.exists() && (this.pos = this.follow.obj.pos.add(this.follow.offset));
      }, update() {
        e.exists() && (this.pos = this.follow.obj.pos.add(this.follow.offset));
      } };
    }
    l(os, "follow");
    function as(e, t) {
      let n = typeof e == "number" ? v.fromAngle(e) : e.unit();
      return { id: "move", require: ["pos"], update() {
        this.move(n.scale(t));
      } };
    }
    l(as, "move");
    let us = 200;
    function cs(e = {}) {
      let t = e.distance ?? us, n = false;
      return { id: "offscreen", require: ["pos"], isOffScreen() {
        let a = jt(this.pos), c = new K(U(0), ne(), Q());
        return !We(c, a) && c.sdistToPoint(a) > t * t;
      }, onExitScreen(a) {
        return this.on("exitView", a);
      }, onEnterScreen(a) {
        return this.on("enterView", a);
      }, update() {
        this.isOffScreen() ? (n || (this.trigger("exitView"), n = true), e.hide && (this.hidden = true), e.pause && (this.paused = true), e.destroy && this.destroy()) : (n && (this.trigger("enterView"), n = false), e.hide && (this.hidden = false), e.pause && (this.paused = false));
      } };
    }
    l(cs, "offscreen");
    function ls(e = {}) {
      let t = [], n = {}, a = /* @__PURE__ */ new Set();
      return { id: "area", collisionIgnore: e.collisionIgnore ?? [], add() {
        this.area.cursor && t.push(this.onHover(() => Mn(this.area.cursor))), t.push(this.onCollideUpdate((c, s) => {
          n[c.id] || this.trigger("collide", c, s), n[c.id] = s, a.add(c.id);
        }));
      }, update() {
        for (let c in n)
          a.has(Number(c)) || (this.trigger("collideEnd", n[c].target), delete n[c]);
        a.clear();
      }, drawInspect() {
        let c = this.localArea();
        fe(), ke(this.area.scale), W(this.area.offset);
        let s = { outline: { width: 4 / Tn(), color: j(0, 0, 255) }, anchor: this.anchor, fill: false, fixed: this.fixed };
        c instanceof K ? ce({ ...s, pos: c.pos, width: c.width, height: c.height }) : c instanceof ge ? Fe({ ...s, pts: c.pts }) : c instanceof Te && Be({ ...s, pos: c.center, radius: c.radius }), ue();
      }, destroy() {
        t.forEach((c) => c.cancel());
      }, area: { shape: e.shape ?? null, scale: e.scale ? U(e.scale) : U(1), offset: e.offset ?? U(0), cursor: e.cursor ?? null }, isClicked() {
        return pt() && this.isHovering();
      }, isHovering() {
        let c = this.fixed ? $e() : Fn($e());
        return this.hasPoint(c);
      }, checkCollision(c) {
        return n[c.id] ?? null;
      }, getCollisions() {
        return Object.values(n);
      }, isColliding(c) {
        return Boolean(n[c.id]);
      }, isOverlapping(c) {
        let s = n[c.id];
        return s && s.hasOverlap();
      }, onClick(c) {
        return this.onUpdate(() => {
          this.isClicked() && c();
        });
      }, onHover(c) {
        let s = false;
        return this.onUpdate(() => {
          s ? s = this.isHovering() : this.isHovering() && (s = true, c());
        });
      }, onHoverUpdate(c) {
        return this.onUpdate(() => {
          this.isHovering() && c();
        });
      }, onHoverEnd(c) {
        let s = false;
        return this.onUpdate(() => {
          s ? this.isHovering() || (s = false, c()) : s = this.isHovering();
        });
      }, onCollide(c, s) {
        if (typeof c == "function" && s === void 0)
          return this.on("collide", c);
        if (typeof c == "string")
          return this.onCollide((h, m) => {
            h.is(c) && s(h, m);
          });
      }, onCollideUpdate(c, s) {
        if (typeof c == "function" && s === void 0)
          return this.on("collideUpdate", c);
        if (typeof c == "string")
          return this.on("collideUpdate", (h, m) => h.is(c) && s(h, m));
      }, onCollideEnd(c, s) {
        if (typeof c == "function" && s === void 0)
          return this.on("collideEnd", c);
        if (typeof c == "string")
          return this.on("collideEnd", (h) => h.is(c) && s(h));
      }, hasPoint(c) {
        return en(this.worldArea(), c);
      }, resolveCollision(c) {
        let s = this.checkCollision(c);
        s && !s.resolved && (this.pos = this.pos.add(s.displacement), s.resolved = true);
      }, localArea() {
        return this.area.shape ? this.area.shape : this.renderArea();
      }, worldArea() {
        let c = this.localArea();
        if (!(c instanceof ge || c instanceof K))
          throw new Error("Only support polygon and rect shapes for now");
        let s = this.transform.clone().scale(U(this.area.scale ?? 1)).translate(this.area.offset);
        if (c instanceof K) {
          let h = Ze(this.anchor || Rt).add(1, 1).scale(-0.5).scale(c.width, c.height);
          s.translate(h);
        }
        return c.transform(s);
      }, screenArea() {
        let c = this.worldArea();
        return this.fixed ? c : c.transform(f.cam.transform);
      } };
    }
    l(ls, "area");
    function ze(e) {
      return { color: e.color, opacity: e.opacity, anchor: e.anchor, outline: e.outline, fixed: e.fixed, shader: e.shader, uniform: e.uniform };
    }
    l(ze, "getRenderProps");
    function Ht(e, t = {}) {
      let n = null, a = null, c = new ae();
      if (!e)
        throw new Error("Please pass the resource name or data to sprite()");
      let s = l((h, m, d, p) => {
        let b = U(1, 1);
        return d && p ? (b.x = d / (h.width * m.w), b.y = p / (h.height * m.h)) : d ? (b.x = d / (h.width * m.w), b.y = b.x) : p && (b.y = p / (h.height * m.h), b.x = b.y), b;
      }, "calcTexScale");
      return { id: "sprite", width: 0, height: 0, frame: t.frame || 0, quad: t.quad || new X(0, 0, 1, 1), animSpeed: t.animSpeed ?? 1, flipX: t.flipX ?? false, flipY: t.flipY ?? false, draw() {
        if (!n)
          return;
        let h = n.frames[this.frame ?? 0];
        if (!h)
          throw new Error(`Frame not found: ${this.frame ?? 0}`);
        if (n.slice9) {
          let { left: m, right: d, top: p, bottom: b } = n.slice9, T = n.tex.width * h.w, H = n.tex.height * h.h, M = this.width - m - d, I = this.height - p - b, E = m / T, x = d / T, J = 1 - E - x, G = p / H, V = b / H, R = 1 - G - V, le = [te(0, 0, E, G), te(E, 0, J, G), te(E + J, 0, x, G), te(0, G, E, R), te(E, G, J, R), te(E + J, G, x, R), te(0, G + R, E, V), te(E, G + R, J, V), te(E + J, G + R, x, V), te(0, 0, m, p), te(m, 0, M, p), te(m + M, 0, d, p), te(0, p, m, I), te(m, p, M, I), te(m + M, p, d, I), te(0, p + I, m, b), te(m, p + I, M, b), te(m + M, p + I, d, b)];
          for (let w = 0; w < 9; w++) {
            let S = le[w], C = le[w + 9];
            ft(Object.assign(ze(this), { pos: C.pos(), tex: n.tex, quad: h.scale(S), flipX: this.flipX, flipY: this.flipY, tiled: t.tiled, width: C.w, height: C.h }));
          }
        } else
          ft(Object.assign(ze(this), { tex: n.tex, quad: h, flipX: this.flipX, flipY: this.flipY, tiled: t.tiled, width: this.width, height: this.height }));
      }, update() {
        if (!n) {
          let m = vn(e);
          if (!m || !m.data)
            return;
          let d = m.data.frames[0].clone();
          t.quad && (d = d.scale(t.quad));
          let p = s(m.data.tex, d, t.width, t.height);
          this.width = m.data.tex.width * d.w * p.x, this.height = m.data.tex.height * d.h * p.y, t.anim && this.play(t.anim), n = m.data, c.trigger(n);
        }
        if (!a)
          return;
        let h = n.anims[a.name];
        if (typeof h == "number") {
          this.frame = h;
          return;
        }
        if (h.speed === 0)
          throw new Error("Sprite anim speed cannot be 0");
        a.timer += me() * this.animSpeed, a.timer >= 1 / a.speed && (a.timer = 0, h.from > h.to ? (this.frame--, this.frame < h.to && (a.loop ? this.frame = h.from : (this.frame++, a.onEnd(), this.stop()))) : (this.frame++, this.frame > h.to && (a.loop ? this.frame = h.from : (this.frame--, a.onEnd(), this.stop()))));
      }, play(h, m = {}) {
        if (!n) {
          c.add(() => this.play(h, m));
          return;
        }
        let d = n.anims[h];
        if (!d)
          throw new Error(`Anim not found: ${h}`);
        a && this.stop(), a = typeof d == "number" ? { name: h, timer: 0, loop: false, pingpong: false, speed: 0, onEnd: () => {
        } } : { name: h, timer: 0, loop: m.loop ?? d.loop ?? false, pingpong: m.pingpong ?? d.pingpong ?? false, speed: m.speed ?? d.speed ?? 10, onEnd: m.onEnd ?? (() => {
        }) }, this.frame = typeof d == "number" ? d : d.from, this.trigger("animStart", h);
      }, stop() {
        if (!a)
          return;
        let h = a.name;
        a = null, this.trigger("animEnd", h);
      }, numFrames() {
        return n?.frames.length ?? 0;
      }, curAnim() {
        return a?.name;
      }, onAnimEnd(h) {
        return this.on("animEnd", h);
      }, onAnimStart(h) {
        return this.on("animStart", h);
      }, renderArea() {
        return new K(U(0), this.width, this.height);
      }, inspect() {
        if (typeof e == "string")
          return `"${e}"`;
      } };
    }
    l(Ht, "sprite");
    function hs(e, t = {}) {
      function n(a) {
        let c = Le(Object.assign(ze(a), { text: a.text + "", size: a.textSize, font: a.font, width: t.width && a.width, align: a.align, letterSpacing: a.letterSpacing, lineSpacing: a.lineSpacing, transform: a.textTransform, styles: a.textStyles }));
        return t.width || (a.width = c.width / (a.scale?.x || 1)), a.height = c.height / (a.scale?.y || 1), c;
      }
      return l(n, "update"), { id: "text", text: e, textSize: t.size ?? vo, font: t.font, width: t.width, height: 0, align: t.align, lineSpacing: t.lineSpacing, letterSpacing: t.letterSpacing, textTransform: t.transform, textStyles: t.styles, add() {
        kn(() => n(this));
      }, draw() {
        Ge(n(this));
      }, renderArea() {
        return new K(U(0), this.width, this.height);
      } };
    }
    l(hs, "text");
    function ds(e, t, n = {}) {
      return { id: "rect", width: e, height: t, radius: n.radius || 0, draw() {
        ce(Object.assign(ze(this), { width: this.width, height: this.height, radius: this.radius }));
      }, renderArea() {
        return new K(U(0), this.width, this.height);
      }, inspect() {
        return `${Math.ceil(this.width)}, ${Math.ceil(this.height)}`;
      } };
    }
    l(ds, "rect");
    function fs(e, t) {
      return { id: "rect", width: e, height: t, draw() {
        qe(Object.assign(ze(this), { width: this.width, height: this.height }));
      }, renderArea() {
        return new K(U(0), this.width, this.height);
      }, inspect() {
        return `${Math.ceil(this.width)}, ${Math.ceil(this.height)}`;
      } };
    }
    l(fs, "uvquad");
    function ms(e) {
      return { id: "circle", radius: e, draw() {
        Be(Object.assign(ze(this), { radius: this.radius }));
      }, renderArea() {
        return new K(new v(this.anchor ? 0 : -this.radius), this.radius * 2, this.radius * 2);
      }, inspect() {
        return `${Math.ceil(this.radius)}`;
      } };
    }
    l(ms, "circle");
    function ps(e = 1, t = j(0, 0, 0)) {
      return { id: "outline", outline: { width: e, color: t } };
    }
    l(ps, "outline");
    function Nn(e, t) {
      let n = new je();
      return e && t && n.pushd(new De(e, t)), { id: "timer", wait(a, c) {
        let s = [c], h = new De(a, () => s.forEach((d) => d())), m = n.pushd(h);
        return { get paused() {
          return h.paused;
        }, set paused(d) {
          h.paused = d;
        }, cancel: m, onEnd(d) {
          s.push(d);
        }, then(d) {
          return this.onEnd(d), this;
        } };
      }, update() {
        n.forEach((a, c) => {
          a.tick(me()) && n.delete(c);
        });
      } };
    }
    l(Nn, "timer");
    let gs = 640, ws = 65536;
    function vs(e = {}) {
      let t = U(0), n = null, a = null, c = false, s = [];
      return { id: "body", require: ["pos", "area"], jumpForce: e.jumpForce ?? gs, gravityScale: e.gravityScale ?? 1, isStatic: e.isStatic ?? false, mass: e.mass ?? 1, add() {
        if (this.mass === 0)
          throw new Error("Can't set body mass to 0");
        s.push(this.onCollideUpdate((h, m) => {
          if (h.is("body") && !m.resolved && (this.trigger("beforePhysicsResolve", m), h.trigger("beforePhysicsResolve", m.reverse()), !m.resolved && !(this.isStatic && h.isStatic))) {
            if (!this.isStatic && !h.isStatic) {
              let d = this.mass + h.mass;
              this.pos = this.pos.add(m.displacement.scale(h.mass / d)), h.pos = h.pos.add(m.displacement.scale(-this.mass / d)), this.transform = gt(this), h.transform = gt(h);
            } else {
              let d = !this.isStatic && h.isStatic ? m : m.reverse();
              d.source.pos = d.source.pos.add(d.displacement), d.source.transform = gt(d.source);
            }
            m.resolved = true, this.trigger("physicsResolve", m), h.trigger("physicsResolve", m.reverse());
          }
        })), s.push(this.onPhysicsResolve((h) => {
          f.gravity && (h.isBottom() && this.isFalling() ? (t.y = 0, n = h.target, a = h.target.pos, c ? c = false : this.trigger("ground", n)) : h.isTop() && this.isJumping() && (t.y = 0, this.trigger("headbutt", h.target)));
        }));
      }, update() {
        if (!f.gravity || this.isStatic)
          return;
        if (c && (n = null, a = null, this.trigger("fallOff"), c = false), n)
          if (!this.isColliding(n) || !n.exists() || !n.is("body"))
            c = true;
          else {
            !n.pos.eq(a) && e.stickToPlatform !== false && this.moveBy(n.pos.sub(a)), a = n.pos;
            return;
          }
        let h = t.y;
        t.y += f.gravity * this.gravityScale * me(), t.y = Math.min(t.y, e.maxVelocity ?? ws), h < 0 && t.y >= 0 && this.trigger("fall"), this.move(t);
      }, destroy() {
        s.forEach((h) => h.cancel());
      }, onPhysicsResolve(h) {
        return this.on("physicsResolve", h);
      }, onBeforePhysicsResolve(h) {
        return this.on("beforePhysicsResolve", h);
      }, curPlatform() {
        return n;
      }, isGrounded() {
        return n !== null;
      }, isFalling() {
        return t.y > 0;
      }, isJumping() {
        return t.y < 0;
      }, jump(h) {
        n = null, a = null, t.y = -h || -this.jumpForce;
      }, onGround(h) {
        return this.on("ground", h);
      }, onFall(h) {
        return this.on("fall", h);
      }, onFallOff(h) {
        return this.on("fallOff", h);
      }, onHeadbutt(h) {
        return this.on("headbutt", h);
      } };
    }
    l(vs, "body");
    function bs(e = 2) {
      let t = e, n = [];
      return { id: "doubleJump", require: ["body"], numJumps: e, add() {
        n.push(this.onGround(() => {
          t = this.numJumps;
        }));
      }, destroy() {
        n.forEach((a) => a.cancel());
      }, doubleJump(a) {
        t <= 0 || (t < this.numJumps && this.trigger("doubleJump"), t--, this.jump(a));
      }, onDoubleJump(a) {
        return this.on("doubleJump", a);
      }, inspect() {
        return `${t}`;
      } };
    }
    l(bs, "doubleJump");
    function ys(e, t) {
      return { id: "shader", shader: e, ...typeof t == "function" ? { uniform: t(), update() {
        this.uniform = t();
      } } : { uniform: t } };
    }
    l(ys, "shader");
    function Us() {
      return { id: "fixed", fixed: true };
    }
    l(Us, "fixed");
    function _n(e) {
      return { id: "stay", stay: true, scenesToStay: e };
    }
    l(_n, "stay");
    function xs(e) {
      if (e == null)
        throw new Error("health() requires the initial amount of hp");
      return { id: "health", hurt(t = 1) {
        this.setHP(e - t), this.trigger("hurt");
      }, heal(t = 1) {
        this.setHP(e + t), this.trigger("heal");
      }, hp() {
        return e;
      }, setHP(t) {
        e = t, e <= 0 && this.trigger("death");
      }, onHurt(t) {
        return this.on("hurt", t);
      }, onHeal(t) {
        return this.on("heal", t);
      }, onDeath(t) {
        return this.on("death", t);
      }, inspect() {
        return `${e}`;
      } };
    }
    l(xs, "health");
    function Es(e, t = {}) {
      if (e == null)
        throw new Error("lifespan() requires time");
      let n = t.fade ?? 0;
      return { id: "lifespan", async add() {
        await vt(e), n > 0 && this.opacity && await $t(this.opacity, 0, n, (a) => this.opacity = a, ct.linear), this.destroy();
      } };
    }
    l(Es, "lifespan");
    function Cs(e, t, n) {
      if (!e)
        throw new Error("state() requires an initial state");
      let a = {};
      function c(d) {
        a[d] || (a[d] = { enter: new ae(), end: new ae(), update: new ae(), draw: new ae() });
      }
      l(c, "initStateEvents");
      function s(d, p, b) {
        return c(p), a[p][d].add(b);
      }
      l(s, "on");
      function h(d, p, ...b) {
        c(p), a[p][d].trigger(...b);
      }
      l(h, "trigger");
      let m = false;
      return { id: "state", state: e, enterState(d, ...p) {
        if (m = true, t && !t.includes(d))
          throw new Error(`State not found: ${d}`);
        let b = this.state;
        if (n) {
          if (!n?.[b])
            return;
          let T = typeof n[b] == "string" ? [n[b]] : n[b];
          if (!T.includes(d))
            throw new Error(`Cannot transition state from "${b}" to "${d}". Available transitions: ${T.map((H) => `"${H}"`).join(", ")}`);
        }
        h("end", b, ...p), this.state = d, h("enter", d, ...p), h("enter", `${b} -> ${d}`, ...p);
      }, onStateTransition(d, p, b) {
        return s("enter", `${d} -> ${p}`, b);
      }, onStateEnter(d, p) {
        return s("enter", d, p);
      }, onStateUpdate(d, p) {
        return s("update", d, p);
      }, onStateDraw(d, p) {
        return s("draw", d, p);
      }, onStateEnd(d, p) {
        return s("end", d, p);
      }, update() {
        m || (h("enter", e), m = true), h("update", this.state);
      }, draw() {
        h("draw", this.state);
      }, inspect() {
        return this.state;
      } };
    }
    l(Cs, "state");
    function Ss(e = 1) {
      let t = 0, n = false;
      return { require: ["opacity"], add() {
        this.opacity = 0;
      }, update() {
        n || (t += me(), this.opacity = Ct(t, 0, e, 0, 1), t >= e && (this.opacity = 1, n = true));
      } };
    }
    l(Ss, "fadeIn");
    function kn(e) {
      P.loaded ? e() : f.ev.on("load", e);
    }
    l(kn, "onLoad");
    function Ts(e, t) {
      f.scenes[e] = t;
    }
    l(Ts, "scene");
    function As(e, ...t) {
      if (!f.scenes[e])
        throw new Error(`Scene not found: ${e}`);
      f.ev.onOnce("frameEnd", () => {
        f.ev = new ye(), f.objEvents = new ye(), [...f.root.children].forEach((n) => {
          (!n.stay || n.scenesToStay && !n.scenesToStay.includes(e)) && f.root.remove(n);
        }), f.root.clearEvents(), f.cam = { pos: null, scale: U(1), angle: 0, shake: 0, transform: new Y() }, f.scenes[e](...t), i.debug !== false && In(), i.burp && jn();
      });
    }
    l(As, "go");
    function Os(e, t) {
      try {
        return JSON.parse(window.localStorage[e]);
      } catch {
        return t ? (Hn(e, t), t) : null;
      }
    }
    l(Os, "getData");
    function Hn(e, t) {
      window.localStorage[e] = JSON.stringify(t);
    }
    l(Hn, "setData");
    function qn(e) {
      let t = e(Ye);
      for (let n in t)
        Ye[n] = t[n], i.global !== false && (window[n] = t[n]);
      return Ye;
    }
    l(qn, "plug");
    function Ut() {
      return U(ne() / 2, Q() / 2);
    }
    l(Ut, "center");
    let Rs;
    ((x) => (x[x.None = 0] = "None", x[x.Left = 1] = "Left", x[x.Top = 2] = "Top", x[x.LeftTop = 3] = "LeftTop", x[x.Right = 4] = "Right", x[x.Horizontal = 5] = "Horizontal", x[x.RightTop = 6] = "RightTop", x[x.HorizontalTop = 7] = "HorizontalTop", x[x.Bottom = 8] = "Bottom", x[x.LeftBottom = 9] = "LeftBottom", x[x.Vertical = 10] = "Vertical", x[x.LeftVertical = 11] = "LeftVertical", x[x.RightBottom = 12] = "RightBottom", x[x.HorizontalBottom = 13] = "HorizontalBottom", x[x.RightVertical = 14] = "RightVertical", x[x.All = 15] = "All"))(Rs ||= {});
    function $n(e = {}) {
      let t = U(0), n = e.isObstacle ?? false, a = e.cost ?? 0, c = e.edges ?? [], s = l(() => {
        let m = { left: 1, top: 2, right: 4, bottom: 8 };
        return c.map((d) => m[d] || 0).reduce((d, p) => d | p, 0);
      }, "getEdgeMask"), h = s();
      return { id: "tile", tilePosOffset: e.offset ?? U(0), set tilePos(m) {
        let d = this.getLevel();
        t = m.clone(), this.pos = U(this.tilePos.x * d.tileWidth(), this.tilePos.y * d.tileHeight()).add(this.tilePosOffset);
      }, get tilePos() {
        return t;
      }, set isObstacle(m) {
        n !== m && (n = m, this.getLevel().invalidateNavigationMap());
      }, get isObstacle() {
        return n;
      }, set cost(m) {
        a !== m && (a = m, this.getLevel().invalidateNavigationMap());
      }, get cost() {
        return a;
      }, set edges(m) {
        c = m, h = s(), this.getLevel().invalidateNavigationMap();
      }, get edges() {
        return c;
      }, get edgeMask() {
        return h;
      }, getLevel() {
        return this.parent;
      }, moveLeft() {
        this.tilePos = this.tilePos.add(U(-1, 0));
      }, moveRight() {
        this.tilePos = this.tilePos.add(U(1, 0));
      }, moveUp() {
        this.tilePos = this.tilePos.add(U(0, -1));
      }, moveDown() {
        this.tilePos = this.tilePos.add(U(0, 1));
      } };
    }
    l($n, "tile");
    function Ps(e, t) {
      if (!t.tileWidth || !t.tileHeight)
        throw new Error("Must provide tileWidth and tileHeight.");
      let n = ot([bt(t.pos ?? U(0))]), a = e.length, c = 0, s = null, h = null, m = null, d = null, p = l((w) => w.x + w.y * c, "tile2Hash"), b = l((w) => U(Math.floor(w % c), Math.floor(w / c)), "hash2Tile"), T = l(() => {
        s = [];
        for (let w of n.children)
          H(w);
      }, "createSpatialMap"), H = l((w) => {
        let S = p(w.tilePos);
        s[S] ? s[S].push(w) : s[S] = [w];
      }, "insertIntoSpatialMap"), M = l((w) => {
        let S = p(w.tilePos);
        if (s[S]) {
          let C = s[S].indexOf(w);
          C >= 0 && s[S].splice(C, 1);
        }
      }, "removeFromSpatialMap"), I = l(() => {
        let w = false;
        for (let S of n.children) {
          let C = n.pos2Tile(S.pos);
          (S.tilePos.x != C.x || S.tilePos.y != C.y) && (w = true, M(S), S.tilePos.x = C.x, S.tilePos.y = C.y, H(S));
        }
        w && n.trigger("spatial_map_changed");
      }, "updateSpatialMap"), E = l(() => {
        let w = n.getSpatialMap(), S = n.numRows() * n.numColumns();
        h ? h.length = S : h = new Array(S), h.fill(1, 0, S);
        for (let C = 0; C < w.length; C++) {
          let O = w[C];
          if (O) {
            let L = 0;
            for (let q of O)
              if (q.isObstacle) {
                L = 1 / 0;
                break;
              } else
                L += q.cost;
            h[C] = L || 1;
          }
        }
      }, "createCostMap"), x = l(() => {
        let w = n.getSpatialMap(), S = n.numRows() * n.numColumns();
        m ? m.length = S : m = new Array(S), m.fill(15, 0, S);
        for (let C = 0; C < w.length; C++) {
          let O = w[C];
          if (O) {
            let L = O.length, q = 15;
            for (let Z = 0; Z < L; Z++)
              q |= O[Z].edgeMask;
            m[C] = q;
          }
        }
      }, "createEdgeMap"), J = l(() => {
        let w = n.numRows() * n.numColumns(), S = l((O, L) => {
          let q = [];
          for (q.push(O); q.length > 0; ) {
            let Z = q.pop();
            R(Z).forEach((re) => {
              d[re] < 0 && (d[re] = L, q.push(re));
            });
          }
        }, "traverse");
        d ? d.length = w : d = new Array(w), d.fill(-1, 0, w);
        let C = 0;
        for (let O = 0; O < h.length; O++) {
          if (d[O] >= 0) {
            C++;
            continue;
          }
          S(O, C), C++;
        }
      }, "createConnectivityMap"), G = l((w, S) => h[S], "getCost"), V = l((w, S) => {
        let C = b(w), O = b(S);
        return C.dist(O);
      }, "getHeuristic"), R = l((w, S) => {
        let C = [], O = Math.floor(w % c), L = O > 0 && m[w] & 1 && h[w - 1] !== 1 / 0, q = w >= c && m[w] & 2 && h[w - c] !== 1 / 0, Z = O < c - 1 && m[w] & 4 && h[w + 1] !== 1 / 0, re = w < c * a - c - 1 && m[w] & 8 && h[w + c] !== 1 / 0;
        return S ? (L && (q && C.push(w - c - 1), C.push(w - 1), re && C.push(w + c - 1)), q && C.push(w - c), Z && (q && C.push(w - c + 1), C.push(w + 1), re && C.push(w + c + 1)), re && C.push(w + c)) : (L && C.push(w - 1), q && C.push(w - c), Z && C.push(w + 1), re && C.push(w + c)), C;
      }, "getNeighbours"), le = { id: "level", tileWidth() {
        return t.tileWidth;
      }, tileHeight() {
        return t.tileHeight;
      }, spawn(w, ...S) {
        let C = U(...S), O = (() => {
          if (typeof w == "string") {
            if (t.tiles[w]) {
              if (typeof t.tiles[w] != "function")
                throw new Error("Level symbol def must be a function returning a component list");
              return t.tiles[w](C);
            } else if (t.wildcardTile)
              return t.wildcardTile(w, C);
          } else {
            if (Array.isArray(w))
              return w;
            throw new Error("Expected a symbol or a component list");
          }
        })();
        if (!O)
          return null;
        let L = false, q = false;
        for (let re of O)
          re.id === "tile" && (q = true), re.id === "pos" && (L = true);
        L || O.push(bt()), q || O.push($n());
        let Z = n.add(O);
        return L && (Z.tilePosOffset = Z.pos.clone()), Z.tilePos = C, s && (H(Z), this.trigger("spatial_map_changed"), this.trigger("navigation_map_invalid")), Z;
      }, numColumns() {
        return c;
      }, numRows() {
        return a;
      }, levelWidth() {
        return c * this.tileWidth();
      }, levelHeight() {
        return a * this.tileHeight();
      }, tile2Pos(...w) {
        return U(...w).scale(this.tileWidth(), this.tileHeight());
      }, pos2Tile(...w) {
        let S = U(...w);
        return U(Math.floor(S.x / this.tileWidth()), Math.floor(S.y / this.tileHeight()));
      }, getSpatialMap() {
        return s || T(), s;
      }, onSpatialMapChanged(w) {
        return this.on("spatial_map_changed", w);
      }, onNavigationMapInvalid(w) {
        return this.on("navigation_map_invalid", w);
      }, getAt(w) {
        s || T();
        let S = p(w);
        return s[S] || [];
      }, update() {
        s && I();
      }, invalidateNavigationMap() {
        h = null, m = null, d = null;
      }, onNavigationMapChanged(w) {
        return this.on("navigation_map_changed", w);
      }, getTilePath(w, S, C = {}) {
        if (h || E(), m || x(), d || J(), w.x < 0 || w.x >= c || w.y < 0 || w.y >= a || S.x < 0 || S.x >= c || S.y < 0 || S.y >= a)
          return null;
        let O = p(w), L = p(S);
        if (h[L] === 1 / 0)
          return null;
        if (O === L)
          return [];
        if (d[O] != -1 && d[O] !== d[L])
          return null;
        let q = new lt((Ce, Yt) => Ce.cost < Yt.cost);
        q.insert({ cost: 0, node: O });
        let Z = /* @__PURE__ */ new Map();
        Z.set(O, O);
        let re = /* @__PURE__ */ new Map();
        for (re.set(O, 0); q.length !== 0; ) {
          let Ce = q.remove()?.node;
          if (Ce === L)
            break;
          let Yt = R(Ce, C.allowDiagonals);
          for (let Ve of Yt) {
            let Xt = (re.get(Ce) || 0) + G(Ce, Ve) + V(Ve, L);
            (!re.has(Ve) || Xt < re.get(Ve)) && (re.set(Ve, Xt), q.insert({ cost: Xt, node: Ve }), Z.set(Ve, Ce));
          }
        }
        let zt = [], at = L, eo = b(at);
        for (zt.push(eo); at !== O; ) {
          at = Z.get(at);
          let Ce = b(at);
          zt.push(Ce);
        }
        return zt.reverse();
      }, getPath(w, S, C = {}) {
        let O = this.tileWidth(), L = this.tileHeight(), q = this.getTilePath(this.pos2Tile(w), this.pos2Tile(S), C);
        return q ? [w, ...q.slice(1, -1).map((Z) => Z.scale(O, L).add(O / 2, L / 2)), S] : null;
      } };
      return n.use(le), n.onNavigationMapInvalid(() => {
        n.invalidateNavigationMap(), n.trigger("navigation_map_changed");
      }), e.forEach((w, S) => {
        let C = w.split("");
        c = Math.max(C.length, c), C.forEach((O, L) => {
          n.spawn(O, U(L, S));
        });
      }), n;
    }
    l(Ps, "addLevel");
    function Ms(e = {}) {
      let t = null, n = null, a = null, c = null;
      return { id: "agent", require: ["pos", "tile"], agentSpeed: e.speed ?? 100, allowDiagonals: e.allowDiagonals ?? true, getDistanceToTarget() {
        return t ? this.pos.dist(t) : 0;
      }, getNextLocation() {
        return n && a ? n[a] : null;
      }, getPath() {
        return n ? n.slice() : null;
      }, getTarget() {
        return t;
      }, isNavigationFinished() {
        return n ? a === null : true;
      }, isTargetReachable() {
        return n !== null;
      }, isTargetReached() {
        return t ? this.pos.eq(t) : true;
      }, setTarget(s) {
        t = s, n = this.getLevel().getPath(this.pos, t, { allowDiagonals: this.allowDiagonals }), a = n ? 0 : null, n ? (c || (c = this.getLevel().onNavigationMapChanged(() => {
          n && a !== null && (n = this.getLevel().getPath(this.pos, t, { allowDiagonals: this.allowDiagonals }), a = n ? 0 : null, n ? this.trigger("navigation-next", this, n[a]) : this.trigger("navigation-ended", this));
        }), this.onDestroy(() => c.cancel())), this.trigger("navigation-started", this), this.trigger("navigation-next", this, n[a])) : this.trigger("navigation-ended", this);
      }, update() {
        if (n && a !== null) {
          if (this.pos.sdist(n[a]) < 2)
            if (a === n.length - 1) {
              this.pos = t.clone(), a = null, this.trigger("navigation-ended", this), this.trigger("target-reached", this);
              return;
            } else
              a++, this.trigger("navigation-next", this, n[a]);
          this.moveTo(n[a], this.agentSpeed);
        }
      }, onNavigationStarted(s) {
        return this.on("navigation-started", s);
      }, onNavigationNext(s) {
        return this.on("navigation-next", s);
      }, onNavigationEnded(s) {
        return this.on("navigation-ended", s);
      }, onTargetReached(s) {
        return this.on("target-reached", s);
      }, inspect() {
        return JSON.stringify({ target: JSON.stringify(t), path: JSON.stringify(n) });
      } };
    }
    l(Ms, "agent");
    function Ds(e) {
      let t = o.canvas.captureStream(e), n = F.ctx.createMediaStreamDestination();
      F.masterNode.connect(n);
      let a = new MediaRecorder(t), c = [];
      return a.ondataavailable = (s) => {
        s.data.size > 0 && c.push(s.data);
      }, a.onerror = () => {
        F.masterNode.disconnect(n), t.getTracks().forEach((s) => s.stop());
      }, a.start(), { resume() {
        a.resume();
      }, pause() {
        a.pause();
      }, stop() {
        return a.stop(), F.masterNode.disconnect(n), t.getTracks().forEach((s) => s.stop()), new Promise((s) => {
          a.onstop = () => {
            s(new Blob(c, { type: "video/mp4" }));
          };
        });
      }, download(s = "kaboom.mp4") {
        this.stop().then((h) => rn(s, h));
      } };
    }
    l(Ds, "record");
    function Bs() {
      return document.activeElement === o.canvas;
    }
    l(Bs, "isFocused");
    function Fs(e) {
      e.destroy();
    }
    l(Fs, "destroy");
    let ot = f.root.add.bind(f.root), Ls = f.root.readd.bind(f.root), Gs = f.root.removeAll.bind(f.root), zn = f.root.get.bind(f.root);
    function Yn(e = 2, t = 1) {
      let n = 0;
      return { id: "boom", require: ["scale"], update() {
        let a = Math.sin(n * e) * t;
        a < 0 && this.destroy(), this.scale = U(a), n += me();
      } };
    }
    l(Yn, "boom");
    let Vs = et(null, gr), Is = et(null, wr);
    function js(e, t = {}) {
      let n = ot([bt(e), _n()]), a = (t.speed || 1) * 5, c = t.scale || 1;
      n.add([Ht(Is), yt(0), kt("center"), Yn(a, c), ...t.comps ?? []]);
      let s = n.add([Ht(Vs), yt(0), kt("center"), Nn(0.4 / a, () => s.use(Yn(a, c))), ...t.comps ?? []]);
      return s.onDestroy(() => n.destroy()), n;
    }
    l(js, "addKaboom");
    function Ns() {
      for (let e of navigator.getGamepads()) {
        if (!e)
          continue;
        let n = (i.gamepads ?? {})[e.id] ?? on[e.id] ?? on.default;
        for (let a = 0; a < e.buttons.length; a++)
          e.buttons[a].pressed ? (o.gamepadButtonState.down.has(n.buttons[a]) || (o.gamepadButtonState.press(n.buttons[a]), f.ev.trigger("gamepadButtonPress", n.buttons[a])), f.ev.trigger("gamepadButtonDown", n.buttons[a])) : o.gamepadButtonState.down.has(n.buttons[a]) && (o.gamepadButtonState.release(n.buttons[a]), f.ev.trigger("gamepadButtonRelease", n.buttons[a]));
        for (let a in n.sticks) {
          let c = n.sticks[a], s = e.axes[c.x], h = e.axes[c.y];
          f.ev.trigger("gamepadStick", a, new v(s, h));
        }
      }
    }
    l(Ns, "processGamepad");
    function _s() {
      f.ev.trigger("input"), o.keyState.down.forEach((e) => f.ev.trigger("keyDown", e)), o.mouseState.down.forEach((e) => f.ev.trigger("mouseDown", e)), o.virtualButtonState.down.forEach((e) => f.ev.trigger("virtualButtonDown", e)), Ns();
    }
    l(_s, "inputFrame");
    function Xn() {
      f.root.update();
    }
    l(Xn, "updateFrame");
    class xt {
      source;
      target;
      displacement;
      resolved = false;
      constructor(t, n, a, c = false) {
        this.source = t, this.target = n, this.displacement = a, this.resolved = c;
      }
      reverse() {
        return new xt(this.target, this.source, this.displacement.scale(-1), this.resolved);
      }
      hasOverlap() {
        return !this.displacement.isZero();
      }
      isLeft() {
        return this.displacement.x > 0;
      }
      isRight() {
        return this.displacement.x < 0;
      }
      isTop() {
        return this.displacement.y > 0;
      }
      isBottom() {
        return this.displacement.y < 0;
      }
      preventResolution() {
        this.resolved = true;
      }
    }
    l(xt, "Collision");
    function ks() {
      let e = {}, t = i.hashGridSize || bo, n = new Y(), a = [];
      function c(s) {
        if (a.push(n.clone()), s.pos && n.translate(s.pos), s.scale && n.scale(s.scale), s.angle && n.rotate(s.angle), s.transform = n.clone(), s.c("area") && !s.paused) {
          let h = s, d = h.worldArea().bbox(), p = Math.floor(d.pos.x / t), b = Math.floor(d.pos.y / t), T = Math.ceil((d.pos.x + d.width) / t), H = Math.ceil((d.pos.y + d.height) / t), M = /* @__PURE__ */ new Set();
          for (let I = p; I <= T; I++)
            for (let E = b; E <= H; E++)
              if (!e[I])
                e[I] = {}, e[I][E] = [h];
              else if (!e[I][E])
                e[I][E] = [h];
              else {
                let x = e[I][E];
                e:
                  for (let J of x) {
                    if (!J.exists() || M.has(J.id))
                      continue;
                    for (let V of h.collisionIgnore)
                      if (J.is(V))
                        continue e;
                    for (let V of J.collisionIgnore)
                      if (h.is(V))
                        continue e;
                    let G = ar(h.worldArea(), J.worldArea());
                    if (G) {
                      let V = new xt(h, J, G);
                      h.trigger("collideUpdate", J, V);
                      let R = V.reverse();
                      R.resolved = V.resolved, J.trigger("collideUpdate", h, R);
                    }
                    M.add(J.id);
                  }
                x.push(h);
              }
        }
        s.children.forEach(c), n = a.pop();
      }
      l(c, "checkObj"), c(f.root);
    }
    l(ks, "checkFrame");
    function Hs() {
      let e = f.cam, t = v.fromAngle(ut(0, 360)).scale(e.shake);
      e.shake = Se(e.shake, 0, 5 * me()), e.transform = new Y().translate(Ut()).scale(e.scale).rotate(e.angle).translate((e.pos ?? Ut()).scale(-1).add(t)), f.root.draw(), Ee();
    }
    l(Hs, "drawFrame");
    function qs() {
      let e = we();
      f.ev.numListeners("loading") > 0 ? f.ev.trigger("loading", e) : ve(() => {
        let t = ne() / 2, n = 24, a = U(ne() / 2, Q() / 2).sub(U(t / 2, n / 2));
        ce({ pos: U(0), width: ne(), height: Q(), color: j(0, 0, 0) }), ce({ pos: a, width: t, height: n, fill: false, outline: { width: 4 } }), ce({ pos: a, width: t * e, height: n });
      });
    }
    l(qs, "drawLoadScreen");
    function Kn(e, t) {
      ve(() => {
        let n = U(8);
        fe(), W(e);
        let a = Le({ text: t, font: Pt, size: 16, pos: n, color: j(255, 255, 255), fixed: true }), c = a.width + n.x * 2, s = a.height + n.x * 2;
        e.x + c >= ne() && W(U(-c, 0)), e.y + s >= Q() && W(U(0, -s)), ce({ width: c, height: s, color: j(0, 0, 0), radius: 4, opacity: 0.8, fixed: true }), Ge(a), ue();
      });
    }
    l(Kn, "drawInspectText");
    function $s() {
      if (z.inspect) {
        let e = null;
        for (let t of f.root.get("*", { recursive: true }))
          if (t.c("area") && t.isHovering()) {
            e = t;
            break;
          }
        if (f.root.drawInspect(), e) {
          let t = [], n = e.inspect();
          for (let a in n)
            n[a] ? t.push(`${a}: ${n[a]}`) : t.push(`${a}`);
          Kn(ti($e()), t.join(`
`));
        }
        Kn(U(8), `FPS: ${z.fps()}`);
      }
      z.paused && ve(() => {
        fe(), W(ne(), 0), W(-8, 8);
        let e = 32;
        ce({ width: e, height: e, anchor: "topright", color: j(0, 0, 0), opacity: 0.8, radius: 4, fixed: true });
        for (let t = 1; t <= 2; t++)
          ce({ width: 4, height: e * 0.6, anchor: "center", pos: U(-e / 3 * t, e * 0.5), color: j(255, 255, 255), radius: 2, fixed: true });
        ue();
      }), z.timeScale !== 1 && ve(() => {
        fe(), W(ne(), Q()), W(-8, -8);
        let e = 8, t = Le({ text: z.timeScale.toFixed(1), font: Pt, size: 16, color: j(255, 255, 255), pos: U(-e), anchor: "botright", fixed: true });
        ce({ width: t.width + e * 2 + e * 4, height: t.height + e * 2, anchor: "botright", color: j(0, 0, 0), opacity: 0.8, radius: 4, fixed: true });
        for (let n = 0; n < 2; n++) {
          let a = z.timeScale < 1;
          En({ p1: U(-t.width - e * (a ? 2 : 3.5), -e), p2: U(-t.width - e * (a ? 2 : 3.5), -e - t.height), p3: U(-t.width - e * (a ? 3.5 : 2), -e - t.height / 2), pos: U(-n * e * 1 + (a ? -e * 0.5 : 0), 0), color: j(255, 255, 255), fixed: true });
        }
        Ge(t), ue();
      }), z.curRecording && ve(() => {
        fe(), W(0, Q()), W(24, -24), Be({ radius: 12, color: j(255, 0, 0), opacity: Wt(0, 1, It() * 4), fixed: true }), ue();
      }), z.showLog && f.logs.length > 0 && ve(() => {
        fe(), W(0, Q()), W(8, -8);
        let e = 8, t = Le({ text: f.logs.join(`
`), font: Pt, pos: U(e, -e), anchor: "botleft", size: 16, width: ne() * 0.6, lineSpacing: e / 2, fixed: true, styles: { time: { color: j(127, 127, 127) }, info: { color: j(255, 255, 255) }, error: { color: j(255, 0, 127) } } });
        ce({ width: t.width + e * 2, height: t.height + e * 2, anchor: "botleft", color: j(0, 0, 0), radius: 4, opacity: 0.8, fixed: true }), Ge(t), ue();
      });
    }
    l($s, "drawDebug");
    function zs() {
      let e = $e(), t = l((a, c, s) => {
        Be({ radius: 80 / 2, pos: a, outline: { width: 4, color: j(0, 0, 0) }, opacity: 0.5, fixed: true }), s && mt({ text: s, pos: a, color: j(0, 0, 0), size: 40, anchor: "center", opacity: 0.5, fixed: true }), pt("left") && St(new Te(a, 80 / 2), e) && f.ev.onOnce("input", () => {
          o.virtualButtonState.press(c), f.ev.trigger("virtualButtonPress", c), o.keyState.press(c), f.ev.trigger("keyPress", c);
        }), Vt("left") && f.ev.onOnce("input", () => {
          o.virtualButtonState.release(c), f.ev.trigger("virtualButtonRelease", c), o.keyState.release(c), f.ev.trigger("keyRelease", c);
        });
      }, "drawCircleButton"), n = l((a, c, s) => {
        ce({ width: 64, height: 64, pos: a, outline: { width: 4, color: j(0, 0, 0) }, radius: 4, anchor: "center", opacity: 0.5, fixed: true }), s && mt({ text: s, pos: a, color: j(0, 0, 0), size: 40, anchor: "center", opacity: 0.5, fixed: true }), pt("left") && We(new K(a.add(-64 / 2, -64 / 2), 64, 64), e) && f.ev.onOnce("input", () => {
          o.virtualButtonState.press(c), f.ev.trigger("virtualButtonPress", c), o.keyState.press(c), f.ev.trigger("keyPress", c);
        }), Vt("left") && f.ev.onOnce("input", () => {
          o.virtualButtonState.release(c), f.ev.trigger("virtualButtonRelease", c), o.keyState.release(c), f.ev.trigger("keyRelease", c);
        });
      }, "drawSquareButton");
      ve(() => {
        t(U(ne() - 80, Q() - 160), "a"), t(U(ne() - 160, Q() - 80), "b"), n(U(60, Q() - 124), "left"), n(U(188, Q() - 124), "right"), n(U(124, Q() - 188), "up"), n(U(124, Q() - 60), "down");
      });
    }
    l(zs, "drawVirtualControls"), i.debug !== false && In(), i.burp && jn();
    function Ys(e) {
      f.ev.on("loading", e);
    }
    l(Ys, "onLoading");
    function Xs(e) {
      f.ev.on("resize", e);
    }
    l(Xs, "onResize");
    function Ks(e) {
      f.ev.on("gamepadConnect", e);
    }
    l(Ks, "onGamepadConnect");
    function Js(e) {
      f.ev.on("gamepadDisconnect", e);
    }
    l(Js, "onGamepadDisconnect");
    function Ws(e) {
      f.ev.on("error", e);
    }
    l(Ws, "onError");
    function qt(e) {
      Jn(() => {
        ve(() => {
          let a = ne(), c = Q(), s = { size: 36, width: a - 32 * 2, letterSpacing: 4, lineSpacing: 4, font: Pt, fixed: true };
          ce({ width: a, height: c, color: j(0, 0, 255), fixed: true });
          let h = Le({ ...s, text: e.name, pos: U(32), color: j(255, 128, 0), fixed: true });
          Ge(h), mt({ ...s, text: e.message, pos: U(32, 32 + h.height + 16), fixed: true }), ue(), f.ev.trigger("error", e);
        });
      });
    }
    l(qt, "handleErr");
    function Qs() {
      o.keyState.update(), o.mouseState.update(), o.virtualButtonState.update(), o.gamepadButtonState.update(), o.charInputted = [], o.isMouseMoved = false;
    }
    l(Qs, "resetInputState");
    function Jn(e) {
      o.loopID !== null && cancelAnimationFrame(o.loopID);
      let t = l((n) => {
        if (o.stopped)
          return;
        if (document.visibilityState !== "visible") {
          o.loopID = requestAnimationFrame(t);
          return;
        }
        let a = n / 1e3, c = a - o.realTime;
        o.realTime = a, o.skipTime || (o.dt = c, o.time += me(), o.fpsCounter.tick(o.dt)), o.skipTime = false, o.numFrames++, zr(), e(), Xr(), Qs(), f.ev.trigger("frameEnd"), o.loopID = requestAnimationFrame(t);
      }, "frame");
      t(0);
    }
    l(Jn, "run");
    function Zs() {
      f.ev.onOnce("frameEnd", () => {
        o.stopped = true, u.clear(u.COLOR_BUFFER_BIT | u.DEPTH_BUFFER_BIT | u.STENCIL_BUFFER_BIT);
        let e = u.getParameter(u.MAX_TEXTURE_IMAGE_UNITS);
        for (let t = 0; t < e; t++)
          u.activeTexture(u.TEXTURE0 + t), u.bindTexture(u.TEXTURE_2D, null), u.bindTexture(u.TEXTURE_CUBE_MAP, null);
        u.bindBuffer(u.ARRAY_BUFFER, null), u.bindBuffer(u.ELEMENT_ARRAY_BUFFER, null), u.bindRenderbuffer(u.RENDERBUFFER, null), u.bindFramebuffer(u.FRAMEBUFFER, null), r.forEach((t) => t()), u.deleteBuffer(g.vbuf), u.deleteBuffer(g.ibuf);
        for (let t in se)
          o.canvas.removeEventListener(t, se[t]);
        for (let t in rt)
          document.removeEventListener(t, rt[t]);
        for (let t in Oe)
          window.removeEventListener(t, Oe[t]);
      });
    }
    l(Zs, "quit");
    function $t(e, t, n, a, c = ct.linear) {
      let s = 0, h = [], m = Nt(() => {
        s += me();
        let d = Math.min(s / n, 1);
        a(Se(e, t, c(d))), d === 1 && (m.cancel(), a(t), h.forEach((p) => p()));
      });
      return { get paused() {
        return m.paused;
      }, set paused(d) {
        m.paused = d;
      }, onEnd(d) {
        h.push(d);
      }, then(d) {
        return this.onEnd(d), this;
      }, cancel() {
        m.cancel();
      }, finish() {
        m.cancel(), a(t), h.forEach((d) => d());
      } };
    }
    l($t, "tween");
    let Et = true;
    Jn(() => {
      P.loaded || we() === 1 && !Et && (P.loaded = true, f.ev.trigger("load")), !P.loaded && i.loadingScreen !== false || Et ? qs() : (_s(), z.paused || Xn(), ks(), Hs(), i.debug !== false && $s(), i.virtualControls && Bn() && zs()), Et && (Et = false);
    }), Rn();
    let Ye = { VERSION: po, loadRoot: ht, loadProgress: we, loadSprite: et, loadSpriteAtlas: hn, loadSound: Nr, loadBitmapFont: Lr, loadFont: Fr, loadShader: Ir, loadShaderURL: jr, loadAseprite: Vr, loadPedit: Gr, loadBean: _r, load: ie, getSprite: fn, getSound: mn, getFont: pn, getBitmapFont: gn, getShader: wn, Asset: k, SpriteData: B, SoundData: _, width: ne, height: Q, center: Ut, dt: me, time: It, screenshot: pi, record: Ds, isFocused: Bs, setCursor: Mn, getCursor: gi, setCursorLocked: wi, isCursorLocked: vi, setFullscreen: bi, isFullscreen: Dn, isTouchScreen: Bn, onLoad: kn, onLoading: Ys, onResize: Xs, onGamepadConnect: Ks, onGamepadDisconnect: Js, onError: Ws, camPos: yi, camScale: Ui, camRot: xi, shake: Ei, toScreen: jt, toWorld: Fn, setGravity: Wi, getGravity: Qi, setBackground: Zi, getBackground: es, getGamepads: ts, add: ot, destroy: Fs, destroyAll: Gs, get: zn, readd: Ls, pos: bt, scale: yt, rotate: ns, color: rs, opacity: is, anchor: kt, area: ls, sprite: Ht, text: hs, rect: ds, circle: ms, uvquad: fs, outline: ps, body: vs, doubleJump: bs, shader: ys, timer: Nn, fixed: Us, stay: _n, health: xs, lifespan: Es, z: ss, move: as, offscreen: cs, follow: os, state: Cs, fadeIn: Ss, tile: $n, agent: Ms, on: Re, onUpdate: Nt, onDraw: Ci, onAdd: _t, onDestroy: Gn, onClick: Oi, onCollide: Si, onCollideUpdate: Ti, onCollideEnd: Ai, onHover: Ri, onHoverUpdate: Pi, onHoverEnd: Mi, onKeyDown: Bi, onKeyPress: Pe, onKeyPressRepeat: Fi, onKeyRelease: Li, onMouseDown: Gi, onMousePress: Vn, onMouseRelease: Vi, onMouseMove: Ii, onCharInput: ji, onTouchStart: Ni, onTouchMove: _i, onTouchEnd: ki, onScroll: Hi, onVirtualButtonPress: $i, onVirtualButtonDown: qi, onVirtualButtonRelease: zi, onGamepadButtonDown: Yi, onGamepadButtonPress: Xi, onGamepadButtonRelease: Ki, onGamepadStick: Ji, mousePos: $e, mouseDeltaPos: Pn, isKeyDown: oi, isKeyPressed: ii, isKeyPressedRepeat: si, isKeyReleased: ai, isMouseDown: ni, isMousePressed: pt, isMouseReleased: Vt, isMouseMoved: ri, isVirtualButtonPressed: ui, isVirtualButtonDown: ci, isVirtualButtonReleased: li, isGamepadButtonPressed: hi, isGamepadButtonDown: di, isGamepadButtonReleased: fi, charInputted: mi, loop: Di, wait: vt, play: yn, volume: qr, burp: Un, audioCtx: F.ctx, Timer: De, Line: de, Rect: K, Circle: Te, Polygon: ge, Vec2: v, Color: D, Mat4: Y, Quad: X, RNG: Ke, rand: ut, randi: Qt, randSeed: er, vec2: U, rgb: j, hsl2rgb: Zn, quad: te, choose: nr, chance: tr, lerp: Se, tween: $t, easings: ct, map: Ct, mapc: Qn, wave: Wt, deg2rad: be, rad2deg: Je, testLineLine: Xe, testRectRect: rr, testRectLine: ir, testRectPoint: We, testCirclePolygon: or, testLinePoint: sr, testLineCircle: Zt, drawSprite: Wr, drawText: mt, formatText: Le, drawRect: ce, drawLine: nt, drawLines: xn, drawTriangle: En, drawCircle: Be, drawEllipse: Cn, drawUVQuad: qe, drawPolygon: Fe, drawFormattedText: Ge, drawMasked: Qr, drawSubtracted: Zr, pushTransform: fe, popTransform: ue, pushTranslate: W, pushScale: ke, pushRotate: He, pushMatrix: Jr, usePostEffect: Yr, debug: z, scene: Ts, go: As, addLevel: Ps, getData: Os, setData: Hn, download: Ot, downloadJSON: dr, downloadText: nn, downloadBlob: rn, plug: qn, ASCII_CHARS: yr, canvas: o.canvas, addKaboom: js, LEFT: v.LEFT, RIGHT: v.RIGHT, UP: v.UP, DOWN: v.DOWN, RED: D.RED, GREEN: D.GREEN, BLUE: D.BLUE, YELLOW: D.YELLOW, MAGENTA: D.MAGENTA, CYAN: D.CYAN, WHITE: D.WHITE, BLACK: D.BLACK, quit: Zs, Event: ae, EventHandler: ye, EventController: pe };
    if (i.plugins && i.plugins.forEach(qn), i.global !== false)
      for (let e in Ye)
        window[e] = Ye[e];
    return o.canvas.focus(), Ye;
  }, "default");

  // src/assetLoader.js
  function assetLoader() {
    function setTile(x, y) {
      return { x, y, width: 16, height: 16 };
    }
    function setCharacterAnim(name, x, y) {
      return {
        x,
        y,
        width: 64,
        height: 16,
        sliceX: 4,
        sliceY: 1,
        anims: {
          [name]: {
            from: 0,
            to: 3,
            loop: true,
            speed: 4
          }
        }
      };
    }
    function setSlimeAnim(name, x, y) {
      return {
        x,
        y,
        width: 32,
        height: 16,
        sliceX: 2,
        sliceY: 1,
        anims: {
          [name]: {
            from: 0,
            to: 1,
            speed: 4,
            loop: true
          }
        }
      };
    }
    loadSpriteAtlas("./asset.png", {
      "grass-tl": setTile(0, 0),
      "grass-tm": setTile(16, 0),
      "grass-tr": setTile(32, 0),
      "grass-ml": setTile(0, 16),
      "grass-mm": setTile(16, 16),
      "grass-mr": setTile(32, 16),
      "grass-bl": setTile(0, 32),
      "grass-bm": setTile(16, 32),
      "grass-br": setTile(32, 32),
      "ground-l": setTile(0, 48),
      "ground-m": setTile(16, 48),
      "ground-r": setTile(32, 48),
      "flower-1": setTile(80, 32),
      "flower-2": setTile(96, 32),
      "tree-1": setTile(80, 48),
      "tree-2": setTile(80, 64),
      "ladder-t": setTile(384, 0),
      "ladder-m": setTile(384, 16),
      "ladder-b": setTile(384, 32),
      "grass-y-tl": setTile(112, 0),
      "grass-y-tm": setTile(128, 0),
      "grass-y-tr": setTile(144, 0),
      "grass-y-ml": setTile(112, 16),
      "grass-y-mm": setTile(128, 16),
      "grass-y-mr": setTile(144, 16),
      "grass-y-bl": setTile(112, 32),
      "grass-y-bm": setTile(128, 32),
      "grass-y-br": setTile(144, 32),
      "small-tree-1": setTile(208, 128),
      "small-tree-2": setTile(208, 144),
      "player-down": setCharacterAnim("walk", 0, 384),
      "player-side": setCharacterAnim("walk", 0, 400),
      "player-up": setCharacterAnim("walk", 0, 416),
      "player-attack-down": setTile(0, 448),
      "player-attack-right": setTile(16, 448),
      "player-attack-up": setTile(32, 448),
      "player-attack-left": setTile(48, 448),
      "player-shield-down": setTile(0, 464),
      "player-shield-right": setTile(16, 464),
      "player-shield-up": setTile(32, 464),
      "player-shield-left": setTile(48, 464),
      "slime-down": setSlimeAnim("walk", 0, 352),
      "slime-side": setSlimeAnim("walk", 32, 352),
      "slime-up": setSlimeAnim("walk", 0, 368)
    });
  }

  // src/scenes/worldLayout.js
  var terrainLayer = [
    "              34444445                ",
    "          3444100000024445            ",
    "34444444441000100000020002444444445  ",
    "100000000010001000000200020000000005  ",
    "100000000010006777777800020000000002  ",
    "100000000010009aaaaaab00020000000002  ",
    "100000000010000000000000020000000002  ",
    "100000000010000000000000020000000002  ",
    "100000000010000000000000020000000002  ",
    "100000000067777777777777780000000002  ",
    "10000000009aaaaaaaaaaaaaab0000000002  ",
    "100000000000000000000000000000000002  ",
    "100000000000000000000000000000000002  ",
    "677777777777777777777777777777777778  ",
    "9aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab  ",
    "9aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab  ",
    "dcccccccccccccccccccccccccccccccccce  ",
    "dcccccccccccccccccccccccccccccccccce  ",
    "dcccccccccccccccccccccccccccccccccce  ",
    "dcccccccccccccccccccccccccccccccejjk  ",
    "dccccccccccccccccccccccccccccejjk     ",
    "dcccccccccccccccccccccccccccce        ",
    "dcccccccejjjjjjjdcccccccccccccgggggggh",
    "dcccccejk       idccccccccccccccccccce",
    "dcccejk          idcccccccccccccccccce",
    "ijjjj            9ijjjjjjjjjjjjjjjjjjk",
    "                  9aaaaaaaaaaaaaaaaaab"
  ];
  var terrainLayerTiles = {
    tileWidth: 16,
    tileHeight: 16,
    tiles: {
      0: () => [sprite("grass-mm")],
      1: () => [sprite("grass-ml")],
      2: () => [sprite("grass-mr")],
      3: () => [sprite("grass-tl")],
      4: () => [sprite("grass-tm")],
      5: () => [sprite("grass-tr")],
      6: () => [sprite("grass-bl")],
      7: () => [sprite("grass-bm")],
      8: () => [sprite("grass-br")],
      9: () => [sprite("ground-l")],
      "a": () => [sprite("ground-m")],
      "b": () => [sprite("ground-r")],
      "c": () => [sprite("grass-y-mm")],
      "d": () => [sprite("grass-y-ml")],
      "e": () => [sprite("grass-y-mr")],
      "f": () => [sprite("grass-y-tl")],
      "g": () => [sprite("grass-y-tm")],
      "h": () => [sprite("grass-y-tr")],
      "i": () => [sprite("grass-y-bl")],
      "j": () => [sprite("grass-y-bm")],
      "k": () => [sprite("grass-y-br")]
    }
  };
  var objectLayer = [
    "                902023                ",
    "    0            1313      0          ",
    "322 1       9 3            1   0      ",
    "2 0         0                  19    ",
    "3 1 9       1     4               0   ",
    " 3    0           6        9      1   ",
    "      1                   0 0         ",
    "0 0    9                  1 1         ",
    "1 1    0                   0          ",
    "00     1   4               1          ",
    "1100       6                          ",
    "0011 0                                ",
    "11   1                                ",
    "                               4      ",
    "                               5      ",
    "                               6      ",
    "                                      ",
    " 7      7                             ",
    " 8      8                             ",
    "                                      ",
    "    7       7                         ",
    "    8       8                         ",
    " 7 7                                  ",
    "7878                                  ",
    "8 8                                   "
  ];
  var objectLayerTiles = {
    tileWidth: 16,
    tileHeight: 16,
    tiles: {
      0: () => [sprite("tree-1")],
      1: () => [sprite("tree-2")],
      2: () => [sprite("flower-1")],
      3: () => [sprite("flower-2")],
      4: () => [sprite("ladder-t")],
      5: () => [sprite("ladder-m")],
      6: () => [sprite("ladder-b")],
      7: () => [sprite("small-tree-1")],
      8: () => [sprite("small-tree-2")],
      9: () => [sprite("slime-down"), { npcType: "slime" }]
    }
  };

  // src/scenes/world.js
  function world() {
    const map = [
      addLevel(terrainLayer, terrainLayerTiles),
      addLevel(objectLayer, objectLayerTiles)
    ];
    for (const layer of map) {
      layer.use(scale(2));
      layer.use(pos(200, 200));
      for (const tile of layer.children) {
        if (tile.npcType) {
          if (tile.npcType === "slime")
            tile.play("walk");
        }
      }
    }
    const player = add([
      sprite("player-down"),
      pos(center()),
      scale(2),
      {
        speed: 100,
        direction: "down"
      }
    ]);
    onKeyDown("left", () => {
      player.direction = "left";
      player.move(-player.speed, 0);
      player.flipX = true;
      if (player.curAnim() !== "walk") {
        player.use(sprite("player-side"));
        player.play("walk");
      }
    });
    onKeyDown("right", () => {
      player.direction = "right";
      player.move(player.speed, 0);
      player.flipX = false;
      if (player.curAnim() !== "walk") {
        player.use(sprite("player-side"));
        player.play("walk");
      }
    });
    onKeyDown("up", () => {
      player.direction = "up";
      player.move(0, -player.speed);
      if (player.curAnim() !== "walk") {
        player.use(sprite("player-up"));
        player.play("walk");
      }
    });
    onKeyDown("down", () => {
      player.direction = "down";
      player.move(0, player.speed);
      if (player.curAnim() !== "walk") {
        player.use(sprite("player-down"));
        player.play("walk");
      }
    });
    onKeyRelease(() => player.stop());
    onKeyPress("space", () => {
      player.use(sprite("player-attack-" + player.direction));
    });
    onKeyRelease("space", () => {
      if (player.direction === "left") {
        player.use(sprite("player-side"));
        player.flipX = true;
      } else if (player.direction === "right") {
        player.use(sprite("player-side"));
      } else {
        player.use(sprite("player-" + player.direction));
      }
    });
    onUpdate(() => {
      camPos(player.pos);
    });
  }

  // src/debugTools/camTools.js
  function enableFreeCam() {
    camPos(800, 600);
    onKeyDown("shift", () => {
      if (isKeyDown("left"))
        camPos(camPos().x - 10, camPos().y);
      if (isKeyDown("right"))
        camPos(camPos().x + 10, camPos().y);
      if (isKeyDown("up"))
        camPos(camPos().x, camPos().y + 10);
      if (isKeyDown("down"))
        camPos(camPos().x, camPos().y - 10);
    });
  }
  function zoomCam(scaleFactor) {
    camScale(camScale().x - scaleFactor, camScale().y - scaleFactor);
    onKeyPress("+", () => camScale(camScale().x + scaleFactor, camScale().y + scaleFactor));
    onKeyPress("-", () => camScale(camScale().x - scaleFactor, camScale().y - scaleFactor));
  }

  // src/main.js
  ra({ width: window.innerWidth, height: window.innerHeight });
  setBackground(Color.fromHex("6f6abf"));
  assetLoader();
  var scenes = /* @__PURE__ */ new Map([
    ["world", () => {
      world();
      enableFreeCam();
      zoomCam(-1);
    }]
  ]);
  scenes.forEach((sceneFunc, sceneKey) => scene(sceneKey, sceneFunc));
  go("world");
})();
