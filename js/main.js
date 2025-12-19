/*
 Platform.js <https://mths.be/platform>
 Copyright 2014-2018 Benjamin Tan <https://bnjmnt4n.now.sh/>
 Copyright 2011-2013 John-David Dalton
 Available under MIT license <https://mths.be/mit>
 Hammer.JS - v2.0.8 - 2016-04-23
 http://hammerjs.github.io/

 Copyright (c) 2016 Jorik Tangelder;
 Licensed under the MIT license */
(function () {
    var a = "undefined" !== typeof window && "undefined" !== typeof window.document ? window.document : {}
        , d = "undefined" !== typeof module && module.exports
        , b = function () {
            for (var l, f = ["requestFullscreen exitFullscreen fullscreenElement fullscreenEnabled fullscreenchange fullscreenerror".split(" "), "webkitRequestFullscreen webkitExitFullscreen webkitFullscreenElement webkitFullscreenEnabled webkitfullscreenchange webkitfullscreenerror".split(" "), "webkitRequestFullScreen webkitCancelFullScreen webkitCurrentFullScreenElement webkitCancelFullScreen webkitfullscreenchange webkitfullscreenerror".split(" "), "mozRequestFullScreen mozCancelFullScreen mozFullScreenElement mozFullScreenEnabled mozfullscreenchange mozfullscreenerror".split(" "), "msRequestFullscreen msExitFullscreen msFullscreenElement msFullscreenEnabled MSFullscreenChange MSFullscreenError".split(" ")], q = 0, m = f.length, g = {}; q < m; q++)
                if ((l = f[q]) && l[1] in a) {
                    for (q = 0; q < l.length; q++)
                        g[f[0][q]] = l[q];
                    return g
                }
            return !1
        }()
        , e = {
            change: b.fullscreenchange,
            error: b.fullscreenerror
        }
        , h = {
            request: function (l) {
                return new Promise(function (f, q) {
                    var m = function () {
                        this.off("change", m);
                        f()
                    }
                        .bind(this);
                    this.on("change", m);
                    l = l || a.documentElement;
                    Promise.resolve(l[b.requestFullscreen]())["catch"](q)
                }
                    .bind(this))
            },
            exit: function () {
                return new Promise(function (l, f) {
                    if (this.isFullscreen) {
                        var q = function () {
                            this.off("change", q);
                            l()
                        }
                            .bind(this);
                        this.on("change", q);
                        Promise.resolve(a[b.exitFullscreen]())["catch"](f)
                    } else
                        l()
                }
                    .bind(this))
            },
            toggle: function (l) {
                return this.isFullscreen ? this.exit() : this.request(l)
            },
            onchange: function (l) {
                this.on("change", l)
            },
            onerror: function (l) {
                this.on("error", l)
            },
            on: function (l, f) {
                var q = e[l];
                q && a.addEventListener(q, f, !1)
            },
            off: function (l, f) {
                var q = e[l];
                q && a.removeEventListener(q, f, !1)
            },
            raw: b
        };
    b ? (Object.defineProperties(h, {
        isFullscreen: {
            get: function () {
                return !!a[b.fullscreenElement]
            }
        },
        element: {
            enumerable: !0,
            get: function () {
                return a[b.fullscreenElement]
            }
        },
        isEnabled: {
            enumerable: !0,
            get: function () {
                return !!a[b.fullscreenEnabled]
            }
        }
    }),
        d ? module.exports = h : window.screenfull = h) : d ? module.exports = {
            isEnabled: !1
        } : window.screenfull = {
            isEnabled: !1
        }
}
)();
(function () {
    function a(t) {
        t = String(t);
        return t.charAt(0).toUpperCase() + t.slice(1)
    }
    function d(t, F) {
        var J = -1
            , C = t ? t.length : 0;
        if ("number" == typeof C && -1 < C && C <= y)
            for (; ++J < C;)
                F(t[J], J, t);
        else
            e(t, F)
    }
    function b(t) {
        t = String(t).replace(/^ +| +$/g, "");
        return /^(?:webOS|i(?:OS|P))/.test(t) ? t : a(t)
    }
    function e(t, F) {
        for (var J in t)
            u.call(t, J) && F(t[J], J, t)
    }
    function h(t) {
        return null == t ? a(t) : B.call(t).slice(8, -1)
    }
    function l(t, F) {
        var J = null != t ? typeof t[F] : "number";
        return !/^(?:boolean|number|string|undefined)$/.test(J) && ("object" == J ? !!t[F] : !0)
    }
    function f(t) {
        return String(t).replace(/([ -])(?!$)/g, "$1?")
    }
    function q(t, F) {
        var J = null;
        d(t, function (C, D) {
            J = F(J, C, D, t)
        });
        return J
    }
    function m(t) {
        function F(U) {
            return q(U, function (R, P) {
                var S = P.pattern || f(P);
                !R && (R = RegExp("\\b" + S + " *\\d+[.\\w_]*", "i").exec(t) || RegExp("\\b" + S + " *\\w+-[\\w]*", "i").exec(t) || RegExp("\\b" + S + "(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)", "i").exec(t)) && ((R = String(P.label && !RegExp(S, "i").test(P.label) ? P.label : R).split("/"))[1] && !/[\d.]+/.test(R[0]) && (R[0] += " " + R[1]),
                    P = P.label || P,
                    R = b(R[0].replace(RegExp(S, "i"), P).replace(RegExp("; *(?:" + P + "[_-])?", "i"), " ").replace(RegExp("(" + P + ")[-_.]?(\\w)", "i"), "$1 $2")));
                return R
            })
        }
        function J(U) {
            return q(U, function (R, P) {
                return R || (RegExp(P + "(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)", "i").exec(t) || 0)[1] || null
            })
        }
        var C = x
            , D = t && "object" == typeof t && "String" != h(t);
        D && (C = t,
            t = null);
        var L = C.navigator || {}
            , G = L.userAgent || "";
        t || (t = G);
        var ka = D ? !!L.likeChrome : /\bChrome\b/.test(t) && !/internal|\n/i.test(B.toString())
            , da = D ? "Object" : "ScriptBridgingProxyObject"
            , ma = D ? "Object" : "Environment"
            , N = D && C.java ? "JavaPackage" : h(C.java)
            , Z = D ? "Object" : "RuntimeObject";
        ma = (N = /\bJava/.test(N) && C.java) && h(C.environment) == ma;
        var ea = N ? "a" : "\u03b1", X = N ? "b" : "\u03b2", Aa = C.document || {}, fa = C.operamini || C.opera, qa = A.test(qa = D && fa ? fa["[[Class]]"] : h(fa)) ? qa : fa = null, w, va = t;
        D = [];
        var aa = null
            , ia = t == G;
        G = ia && fa && "function" == typeof fa.version && fa.version();
        var Q = function (U) {
            return q(U, function (R, P) {
                return R || RegExp("\\b" + (P.pattern || f(P)) + "\\b", "i").exec(t) && (P.label || P)
            })
        }([{
            label: "EdgeHTML",
            pattern: "Edge"
        }, "Trident", {
            label: "WebKit",
            pattern: "AppleWebKit"
        }, "iCab", "Presto", "NetFront", "Tasman", "KHTML", "Gecko"])
            , H = function (U) {
                return q(U, function (R, P) {
                    return R || RegExp("\\b" + (P.pattern || f(P)) + "\\b", "i").exec(t) && (P.label || P)
                })
            }(["Adobe AIR", "Arora", "Avant Browser", "Breach", "Camino", "Electron", "Epiphany", "Fennec", "Flock", "Galeon", "GreenBrowser", "iCab", "Iceweasel", "K-Meleon", "Konqueror", "Lunascape", "Maxthon", {
                label: "Microsoft Edge",
                pattern: "Edge"
            }, "Midori", "Nook Browser", "PaleMoon", "PhantomJS", "Raven", "Rekonq", "RockMelt", {
                    label: "Samsung Internet",
                    pattern: "SamsungBrowser"
                }, "SeaMonkey", {
                    label: "Silk",
                    pattern: "(?:Cloud9|Silk-Accelerated)"
                }, "Sleipnir", "SlimBrowser", {
                    label: "SRWare Iron",
                    pattern: "Iron"
                }, "Sunrise", "Swiftfox", "Waterfox", "WebPositive", "Opera Mini", {
                    label: "Opera Mini",
                    pattern: "OPiOS"
                }, "Opera", {
                    label: "Opera",
                    pattern: "OPR"
                }, "Chrome", {
                    label: "Chrome Mobile",
                    pattern: "(?:CriOS|CrMo)"
                }, {
                    label: "Firefox",
                    pattern: "(?:Firefox|Minefield)"
                }, {
                    label: "Firefox for iOS",
                    pattern: "FxiOS"
                }, {
                    label: "IE",
                    pattern: "IEMobile"
                }, {
                    label: "IE",
                    pattern: "MSIE"
                }, "Safari"])
            , O = F([{
                label: "BlackBerry",
                pattern: "BB10"
            }, "BlackBerry", {
                label: "Galaxy S",
                pattern: "GT-I9000"
            }, {
                label: "Galaxy S2",
                pattern: "GT-I9100"
            }, {
                label: "Galaxy S3",
                pattern: "GT-I9300"
            }, {
                label: "Galaxy S4",
                pattern: "GT-I9500"
            }, {
                label: "Galaxy S5",
                pattern: "SM-G900"
            }, {
                label: "Galaxy S6",
                pattern: "SM-G920"
            }, {
                label: "Galaxy S6 Edge",
                pattern: "SM-G925"
            }, {
                label: "Galaxy S7",
                pattern: "SM-G930"
            }, {
                label: "Galaxy S7 Edge",
                pattern: "SM-G935"
            }, "Google TV", "Lumia", "iPad", "iPod", "iPhone", "Kindle", {
                label: "Kindle Fire",
                pattern: "(?:Cloud9|Silk-Accelerated)"
            }, "Nexus", "Nook", "PlayBook", "PlayStation Vita", "PlayStation", "TouchPad", "Transformer", {
                label: "Wii U",
                pattern: "WiiU"
            }, "Wii", "Xbox One", {
                label: "Xbox 360",
                pattern: "Xbox"
            }, "Xoom"])
            , W = function (U) {
                return q(U, function (R, P, S) {
                    return R || (P[O] || P[/^[a-z]+(?: +[a-z]+\b)*/i.exec(O)] || RegExp("\\b" + f(S) + "(?:\\b|\\w*\\d)", "i").exec(t)) && S
                })
            }({
                Apple: {
                    iPad: 1,
                    iPhone: 1,
                    iPod: 1
                },
                Archos: {},
                Amazon: {
                    Kindle: 1,
                    "Kindle Fire": 1
                },
                Asus: {
                    Transformer: 1
                },
                "Barnes & Noble": {
                    Nook: 1
                },
                BlackBerry: {
                    PlayBook: 1
                },
                Google: {
                    "Google TV": 1,
                    Nexus: 1
                },
                HP: {
                    TouchPad: 1
                },
                HTC: {},
                LG: {},
                Microsoft: {
                    Xbox: 1,
                    "Xbox One": 1
                },
                Motorola: {
                    Xoom: 1
                },
                Nintendo: {
                    "Wii U": 1,
                    Wii: 1
                },
                Nokia: {
                    Lumia: 1
                },
                Samsung: {
                    "Galaxy S": 1,
                    "Galaxy S2": 1,
                    "Galaxy S3": 1,
                    "Galaxy S4": 1
                },
                Sony: {
                    PlayStation: 1,
                    "PlayStation Vita": 1
                }
            })
            , I = function (U) {
                return q(U, function (R, P) {
                    var S = P.pattern || f(P);
                    if (!R && (R = RegExp("\\b" + S + "(?:/[\\d.]+|[ \\w.]*)", "i").exec(t))) {
                        var ba = R
                            , wa = P.label || P
                            , Ba = {
                                "10.0": "10",
                                "6.4": "10 Technical Preview",
                                "6.3": "8.1",
                                "6.2": "8",
                                "6.1": "Server 2008 R2 / 7",
                                "6.0": "Server 2008 / Vista",
                                "5.2": "Server 2003 / XP 64-bit",
                                "5.1": "XP",
                                "5.01": "2000 SP1",
                                "5.0": "2000",
                                "4.0": "NT",
                                "4.90": "ME"
                            };
                        S && wa && /^Win/i.test(ba) && !/^Windows Phone /i.test(ba) && (Ba = Ba[/[\d.]+$/.exec(ba)]) && (ba = "Windows " + Ba);
                        ba = String(ba);
                        S && wa && (ba = ba.replace(RegExp(S, "i"), wa));
                        R = ba = b(ba.replace(/ ce$/i, " CE").replace(/\bhpw/i, "web").replace(/\bMacintosh\b/, "Mac OS").replace(/_PowerPC\b/i, " OS").replace(/\b(OS X) [^ \d]+/i, "$1").replace(/\bMac (OS X)\b/, "$1").replace(/\/(\d)/, " $1").replace(/_/g, ".").replace(/(?: BePC|[ .]*fc[ \d.]+)$/i, "").replace(/\bx86\.64\b/gi, "x86_64").replace(/\b(Windows Phone) OS\b/, "$1").replace(/\b(Chrome OS \w+) [\d.]+\b/, "$1").split(" on ")[0])
                    }
                    return R
                })
            }(["Windows Phone", "Android", "CentOS", {
                label: "Chrome OS",
                pattern: "CrOS"
            }, "Debian", "Fedora", "FreeBSD", "Gentoo", "Haiku", "Kubuntu", "Linux Mint", "OpenBSD", "Red Hat", "SuSE", "Ubuntu", "Xubuntu", "Cygwin", "Symbian OS", "hpwOS", "webOS ", "webOS", "Tablet OS", "Tizen", "Linux", "Mac OS X", "Macintosh", "Mac", "Windows 98;", "Windows "]);
        Q && (Q = [Q]);
        W && !O && (O = F([W]));
        if (w = /\bGoogle TV\b/.exec(O))
            O = w[0];
        /\bSimulator\b/i.test(t) && (O = (O ? O + " " : "") + "Simulator");
        "Opera Mini" == H && /\bOPiOS\b/.test(t) && D.push("running in Turbo/Uncompressed mode");
        "IE" == H && /\blike iPhone OS\b/.test(t) ? (w = m(t.replace(/like iPhone OS/, "")),
            W = w.manufacturer,
            O = w.product) : /^iP/.test(O) ? (H || (H = "Safari"),
                I = "iOS" + ((w = / OS ([\d_]+)/i.exec(t)) ? " " + w[1].replace(/_/g, ".") : "")) : "Konqueror" != H || /buntu/i.test(I) ? W && "Google" != W && (/Chrome/.test(H) && !/\bMobile Safari\b/i.test(t) || /\bVita\b/.test(O)) || /\bAndroid\b/.test(I) && /^Chrome/.test(H) && /\bVersion\//i.test(t) ? (H = "Android Browser",
                    I = /\bAndroid\b/.test(I) ? I : "Android") : "Silk" == H ? (/\bMobi/i.test(t) || (I = "Android",
                        D.unshift("desktop mode")),
                        /Accelerated *= *true/i.test(t) && D.unshift("accelerated")) : "PaleMoon" == H && (w = /\bFirefox\/([\d.]+)\b/.exec(t)) ? D.push("identifying as Firefox " + w[1]) : "Firefox" == H && (w = /\b(Mobile|Tablet|TV)\b/i.exec(t)) ? (I || (I = "Firefox OS"),
                            O || (O = w[1])) : !H || (w = !/\bMinefield\b/i.test(t) && /\b(?:Firefox|Safari)\b/.exec(H)) ? (H && !O && /[\/,]|^[^(]+?\)/.test(t.slice(t.indexOf(w + "/") + 8)) && (H = null),
                                (w = O || W || I) && (O || W || /\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(I)) && (H = /[a-z]+(?: Hat)?/i.exec(/\bAndroid\b/.test(I) ? I : w) + " Browser")) : "Electron" == H && (w = (/\bChrome\/([\d.]+)\b/.exec(t) || 0)[1]) && D.push("Chromium " + w) : I = "Kubuntu";
        G || (G = J(["(?:Cloud9|CriOS|CrMo|Edge|FxiOS|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|SamsungBrowser|Silk(?!/[\\d.]+$))", "Version", f(H), "(?:Firefox|Minefield|NetFront)"]));
        if (w = "iCab" == Q && 3 < parseFloat(G) && "WebKit" || /\bOpera\b/.test(H) && (/\bOPR\b/.test(t) ? "Blink" : "Presto") || /\b(?:Midori|Nook|Safari)\b/i.test(t) && !/^(?:Trident|EdgeHTML)$/.test(Q) && "WebKit" || !Q && /\bMSIE\b/i.test(t) && ("Mac OS" == I ? "Tasman" : "Trident") || "WebKit" == Q && /\bPlayStation\b(?! Vita\b)/i.test(H) && "NetFront")
            Q = [w];
        "IE" == H && (w = (/; *(?:XBLWP|ZuneWP)(\d+)/i.exec(t) || 0)[1]) ? (H += " Mobile",
            I = "Windows Phone " + (/\+$/.test(w) ? w : w + ".x"),
            D.unshift("desktop mode")) : /\bWPDesktop\b/i.test(t) ? (H = "IE Mobile",
                I = "Windows Phone 8.x",
                D.unshift("desktop mode"),
                G || (G = (/\brv:([\d.]+)/.exec(t) || 0)[1])) : "IE" != H && "Trident" == Q && (w = /\brv:([\d.]+)/.exec(t)) && (H && D.push("identifying as " + H + (G ? " " + G : "")),
                    H = "IE",
                    G = w[1]);
        if (ia) {
            if (l(C, "global"))
                if (N && (w = N.lang.System,
                    va = w.getProperty("os.arch"),
                    I = I || w.getProperty("os.name") + " " + w.getProperty("os.version")),
                    ma) {
                    try {
                        G = C.require("ringo/engine").version.join("."),
                            H = "RingoJS"
                    } catch (U) {
                        (w = C.system) && w.global.system == C.system && (H = "Narwhal",
                            I || (I = w[0].os || null))
                    }
                    H || (H = "Rhino")
                } else
                    "object" == typeof C.process && !C.process.browser && (w = C.process) && ("object" == typeof w.versions && ("string" == typeof w.versions.electron ? (D.push("Node " + w.versions.node),
                        H = "Electron",
                        G = w.versions.electron) : "string" == typeof w.versions.nw && (D.push("Chromium " + G, "Node " + w.versions.node),
                            H = "NW.js",
                            G = w.versions.nw)),
                        H || (H = "Node.js",
                            va = w.arch,
                            I = w.platform,
                            G = (G = /[\d.]+/.exec(w.version)) ? G[0] : null));
            else
                h(w = C.runtime) == da ? (H = "Adobe AIR",
                    I = w.flash.system.Capabilities.os) : h(w = C.phantom) == Z ? (H = "PhantomJS",
                        G = (w = w.version || null) && w.major + "." + w.minor + "." + w.patch) : "number" == typeof Aa.documentMode && (w = /\bTrident\/(\d+)/i.exec(t)) ? (G = [G, Aa.documentMode],
                            (w = +w[1] + 4) != G[1] && (D.push("IE " + G[1] + " mode"),
                                Q && (Q[1] = ""),
                                G[1] = w),
                            G = "IE" == H ? String(G[1].toFixed(1)) : G[0]) : "number" == typeof Aa.documentMode && /^(?:Chrome|Firefox)\b/.test(H) && (D.push("masking as " + H + " " + G),
                                H = "IE",
                                G = "11.0",
                                Q = ["Trident"],
                                I = "Windows");
            I = I && b(I)
        }
        G && (w = /(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(G) || /(?:alpha|beta)(?: ?\d)?/i.exec(t + ";" + (ia && L.appMinorVersion)) || /\bMinefield\b/i.test(t) && "a") && (aa = /b/i.test(w) ? "beta" : "alpha",
            G = G.replace(RegExp(w + "\\+?$"), "") + ("beta" == aa ? X : ea) + (/\d+\+?/.exec(w) || ""));
        if ("Fennec" == H || "Firefox" == H && /\b(?:Android|Firefox OS)\b/.test(I))
            H = "Firefox Mobile";
        else if ("Maxthon" == H && G)
            G = G.replace(/\.[\d.]+/, ".x");
        else if (/\bXbox\b/i.test(O))
            "Xbox 360" == O && (I = null),
                "Xbox 360" == O && /\bIEMobile\b/.test(t) && D.unshift("mobile mode");
        else if (!/^(?:Chrome|IE|Opera)$/.test(H) && (!H || O || /Browser|Mobi/.test(H)) || "Windows CE" != I && !/Mobi/i.test(t))
            if ("IE" == H && ia)
                try {
                    null === C.external && D.unshift("platform preview")
                } catch (U) {
                    D.unshift("embedded")
                }
            else
                (/\bBlackBerry\b/.test(O) || /\bBB10\b/.test(t)) && (w = (RegExp(O.replace(/ +/g, " *") + "/([.\\d]+)", "i").exec(t) || 0)[1] || G) ? (w = [w, /BB10/.test(t)],
                    I = (w[1] ? (O = null,
                        W = "BlackBerry") : "Device Software") + " " + w[0],
                    G = null) : this != e && "Wii" != O && (ia && fa || /Opera/.test(H) && /\b(?:MSIE|Firefox)\b/i.test(t) || "Firefox" == H && /\bOS X (?:\d+\.){2,}/.test(I) || "IE" == H && (I && !/^Win/.test(I) && 5.5 < G || /\bWindows XP\b/.test(I) && 8 < G || 8 == G && !/\bTrident\b/.test(t))) && !A.test(w = m.call(e, t.replace(A, "") + ";")) && w.name && (w = "ing as " + w.name + ((w = w.version) ? " " + w : ""),
                        A.test(H) ? (/\bIE\b/.test(w) && "Mac OS" == I && (I = null),
                            w = "identify" + w) : (w = "mask" + w,
                                H = qa ? b(qa.replace(/([a-z])([A-Z])/g, "$1 $2")) : "Opera",
                                /\bIE\b/.test(w) && (I = null),
                                ia || (G = null)),
                        Q = ["Presto"],
                        D.push(w));
        else
            H += " Mobile";
        if (w = (/\bAppleWebKit\/([\d.]+\+?)/i.exec(t) || 0)[1]) {
            w = [parseFloat(w.replace(/\.(\d)$/, ".0$1")), w];
            if ("Safari" == H && "+" == w[1].slice(-1))
                H = "WebKit Nightly",
                    aa = "alpha",
                    G = w[1].slice(0, -1);
            else if (G == w[1] || G == (w[2] = (/\bSafari\/([\d.]+\+?)/i.exec(t) || 0)[1]))
                G = null;
            w[1] = (/\bChrome\/([\d.]+)/i.exec(t) || 0)[1];
            537.36 == w[0] && 537.36 == w[2] && 28 <= parseFloat(w[1]) && "WebKit" == Q && (Q = ["Blink"]);
            ia && (ka || w[1]) ? (Q && (Q[1] = "like Chrome"),
                w = w[1] || (w = w[0],
                    530 > w ? 1 : 532 > w ? 2 : 532.05 > w ? 3 : 533 > w ? 4 : 534.03 > w ? 5 : 534.07 > w ? 6 : 534.1 > w ? 7 : 534.13 > w ? 8 : 534.16 > w ? 9 : 534.24 > w ? 10 : 534.3 > w ? 11 : 535.01 > w ? 12 : 535.02 > w ? "13+" : 535.07 > w ? 15 : 535.11 > w ? 16 : 535.19 > w ? 17 : 536.05 > w ? 18 : 536.1 > w ? 19 : 537.01 > w ? 20 : 537.11 > w ? "21+" : 537.13 > w ? 23 : 537.18 > w ? 24 : 537.24 > w ? 25 : 537.36 > w ? 26 : "Blink" != Q ? "27" : "28")) : (Q && (Q[1] = "like Safari"),
                        w = (w = w[0],
                            400 > w ? 1 : 500 > w ? 2 : 526 > w ? 3 : 533 > w ? 4 : 534 > w ? "4+" : 535 > w ? 5 : 537 > w ? 6 : 538 > w ? 7 : 601 > w ? 8 : "8"));
            Q && (Q[1] += " " + (w += "number" == typeof w ? ".x" : /[.+]/.test(w) ? "" : "+"));
            "Safari" == H && (!G || 45 < parseInt(G)) && (G = w)
        }
        "Opera" == H && (w = /\bzbov|zvav$/.exec(I)) ? (H += " ",
            D.unshift("desktop mode"),
            "zvav" == w ? (H += "Mini",
                G = null) : H += "Mobile",
            I = I.replace(RegExp(" *" + w + "$"), "")) : "Safari" == H && /\bChrome\b/.exec(Q && Q[1]) && (D.unshift("desktop mode"),
                H = "Chrome Mobile",
                G = null,
                /\bOS X\b/.test(I) ? (W = "Apple",
                    I = "iOS 4.3+") : I = null);
        G && 0 == G.indexOf(w = /[\d.]+$/.exec(I)) && -1 < t.indexOf("/" + w + "-") && (I = String(I.replace(w, "")).replace(/^ +| +$/g, ""));
        Q && !/\b(?:Avant|Nook)\b/.test(H) && (/Browser|Lunascape|Maxthon/.test(H) || "Safari" != H && /^iOS/.test(I) && /\bSafari\b/.test(Q[1]) || /^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Samsung Internet|Sleipnir|Web)/.test(H) && Q[1]) && (w = Q[Q.length - 1]) && D.push(w);
        D.length && (D = ["(" + D.join("; ") + ")"]);
        W && O && 0 > O.indexOf(W) && D.push("on " + W);
        O && D.push((/^on /.test(D[D.length - 1]) ? "" : "on ") + O);
        if (I) {
            var xa = (w = / ([\d.+]+)$/.exec(I)) && "/" == I.charAt(I.length - w[0].length - 1);
            I = {
                architecture: 32,
                family: w && !xa ? I.replace(w[0], "") : I,
                version: w ? w[1] : null,
                toString: function () {
                    var U = this.version;
                    return this.family + (U && !xa ? " " + U : "") + (64 == this.architecture ? " 64-bit" : "")
                }
            }
        }
        (w = /\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(va)) && !/\bi686\b/i.test(va) ? (I && (I.architecture = 64,
            I.family = I.family.replace(RegExp(" *" + w), "")),
            H && (/\bWOW64\b/i.test(t) || ia && /\w(?:86|32)$/.test(L.cpuClass || L.platform) && !/\bWin64; x64\b/i.test(t)) && D.unshift("32-bit")) : I && /^OS X/.test(I.family) && "Chrome" == H && 39 <= parseFloat(G) && (I.architecture = 64);
        t || (t = null);
        C = {};
        C.description = t;
        C.layout = Q && Q[0];
        C.manufacturer = W;
        C.name = H;
        C.prerelease = aa;
        C.product = O;
        C.ua = t;
        C.version = H && G;
        C.os = I || {
            architecture: null,
            family: null,
            version: null,
            toString: function () {
                return "null"
            }
        };
        C.parse = m;
        C.toString = function () {
            return this.description || ""
        }
            ;
        C.version && D.unshift(G);
        C.name && D.unshift(H);
        I && H && (I != String(I).split(" ")[0] || I != H.split(" ")[0] && !O) && D.push(O ? "(" + I + ")" : "on " + I);
        D.length && (C.description = D.join(" "));
        return C
    }
    var g = {
        "function": !0,
        object: !0
    }
        , x = g[typeof window] && window || this
        , r = g[typeof exports] && exports;
    g = g[typeof module] && module && !module.nodeType && module;
    var n = r && g && "object" == typeof global && global;
    !n || n.global !== n && n.window !== n && n.self !== n || (x = n);
    var y = Math.pow(2, 53) - 1
        , A = /\bOpera/;
    n = Object.prototype;
    var u = n.hasOwnProperty
        , B = n.toString
        , z = m();
    "function" == typeof define && "object" == typeof define.amd && define.amd ? (x.platform = z,
        define(function () {
            return z
        })) : r && g ? e(z, function (t, F) {
            r[F] = t
        }) : x.platform = z
}
).call(this);
function buildIOSMeta() {
    for (var a = [{
        name: "viewport",
        content: "width=device-width, height=device-height, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no"
    }, {
        name: "apple-mobile-web-app-capable",
        content: "yes"
    }, {
        name: "apple-mobile-web-app-status-bar-style",
        content: "black"
    }], d = 0; d < a.length; d++) {
        var b = document.createElement("meta");
        b.name = a[d].name;
        b.content = a[d].content;
        var e = window.document.head.querySelector('meta[name="' + b.name + '"]');
        e && e.parentNode.removeChild(e);
        window.document.head.appendChild(b)
    }
}
function hideIOSFullscreenPanel() {
    jQuery(".xxx-ios-fullscreen-message").css("display", "none");
    jQuery(".xxx-ios-fullscreen-scroll").css("display", "none");
    jQuery(".xxx-game-iframe-full").removeClass("xxx-game-iframe-iphone-se")
}
function buildIOSFullscreenPanel() {
    jQuery("body").append('<div class="xxx-ios-fullscreen-message"><div class="xxx-ios-fullscreen-swipe"></div></div><div class="xxx-ios-fullscreen-scroll"></div>')
}
function showIOSFullscreenPanel() {
    jQuery(".xxx-ios-fullscreen-message").css("display", "block");
    jQuery(".xxx-ios-fullscreen-scroll").css("display", "block")
}
function __iosResize() {
    window.scrollTo(0, 0);
    console.log(window.devicePixelRatio);
    console.log(window.innerWidth);
    console.log(window.innerHeight);
    if ("iPhone" === platform.product)
        switch (window.devicePixelRatio) {
            case 2:
                switch (window.innerWidth) {
                    case 568:
                        320 !== window.innerHeight && jQuery(".xxx-game-iframe-full").addClass("xxx-game-iframe-iphone-se");
                        break;
                    case 667:
                        375 === window.innerHeight ? hideIOSFullscreenPanel() : showIOSFullscreenPanel();
                        break;
                    case 808:
                        414 === window.innerHeight ? hideIOSFullscreenPanel() : showIOSFullscreenPanel();
                        break;
                    default:
                        hideIOSFullscreenPanel()
                }
                break;
            case 3:
                switch (window.innerWidth) {
                    case 736:
                        414 === window.innerHeight ? hideIOSFullscreenPanel() : showIOSFullscreenPanel();
                        break;
                    case 724:
                        375 === window.innerHeight ? hideIOSFullscreenPanel() : showIOSFullscreenPanel();
                        break;
                    case 808:
                        414 === window.innerHeight ? hideIOSFullscreenPanel() : showIOSFullscreenPanel();
                        break;
                    default:
                        hideIOSFullscreenPanel()
                }
                break;
            default:
                hideIOSFullscreenPanel()
        }
}
function iosResize() {
    __iosResize();
    setTimeout(function () {
        __iosResize()
    }, 500)
}
function iosInIframe() {
    try {
        return window.self !== window.top
    } catch (a) {
        return !0
    }
}
function isIOSLessThen13() {
    var a = platform.os
        , d = a.family.toLowerCase();
    a = parseFloat(a.version);
    return "ios" === d && 13 > a ? !0 : !1
}
$(document).ready(function () {
    platform && "iPhone" === platform.product && "safari" === platform.name.toLowerCase() && isIOSLessThen13() && !iosInIframe() && (buildIOSFullscreenPanel(),
        buildIOSMeta())
});
jQuery(window).resize(function () {
    platform && "iPhone" === platform.product && "safari" === platform.name.toLowerCase() && isIOSLessThen13() && !iosInIframe() && iosResize()
});
var s_iOffsetX, s_iOffsetY, s_iScaleFactor = 1, s_bIsIphone = !1, s_bFocus = !0;
(function (a) {
    (jQuery.browser = jQuery.browser || {}).mobile = /android|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(ad|hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|tablet|treo|up\.(browser|link)|vodafone|wap|webos|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4));
    (jQuery.browser = jQuery.browser || {}).mobile = /android|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(ad|hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|tablet|treo|up\.(browser|link)|vodafone|wap|webos|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))
}
)(navigator.userAgent || navigator.vendor || window.opera);

// --- DYNAMIC SCALING HELPERS ---
var ORIGINAL_SPRITE_DIMS = {
    "player": { w: 1998, h: 1895 },
    "bg_menu": { w: 1920, h: 1080 },
    "sky": { w: 1920, h: 340 },
    "route": { w: 1920, h: 621 },
    "route_line": { w: 1920, h: 61 },
    "ground": { w: 1920, h: 158 },
    "trees_hill": { w: 1920, h: 290 }
};

function getSpriteScale(key, actualWidth) {
    if (ORIGINAL_SPRITE_DIMS[key]) {
        // Avoid division by zero
        if (ORIGINAL_SPRITE_DIMS[key].w === 0) return 1;

        var scale = actualWidth / ORIGINAL_SPRITE_DIMS[key].w;
        // Allow small margin of error (e.g. 1998 vs 2000) before scaling
        if (Math.abs(scale - 1) < 0.05) return 1;

        console.log("Scaling sprite '" + key + "' by factor: " + scale + " (Original: " + ORIGINAL_SPRITE_DIMS[key].w + ", Actual: " + actualWidth + ")");
        return scale;
    }
    return 1;
}

function resizeSpriteFrames(frames, scale) {
    if (scale === 1) return frames;
    var newFrames = [];
    for (var i = 0; i < frames.length; i++) {
        var f = frames[i];
        if (Array.isArray(f) && f.length >= 7) {
            newFrames.push([
                f[0] * scale, // x
                f[1] * scale, // y
                f[2] * scale, // w
                f[3] * scale, // h
                f[4],         // image index
                f[5] * scale, // regX
                f[6] * scale  // regY
            ]);
        } else {
            newFrames.push(f);
        }
    }
    return newFrames;
}
// -------------------------------

$(window).resize(function () {
    sizeHandler()
});
function trace(a) {
    console.log(a)
}
function getSize(a) {
    var d = a.toLowerCase()
        , b = window.document
        , e = b.documentElement;
    if (void 0 === window["inner" + a])
        a = e["client" + a];
    else if (window["inner" + a] != e["client" + a]) {
        var h = b.createElement("body");
        h.id = "vpw-test-b";
        h.style.cssText = "overflow:scroll";
        var l = b.createElement("div");
        l.id = "vpw-test-d";
        l.style.cssText = "position:absolute;top:-1000px";
        l.innerHTML = "<style>@media(" + d + ":" + e["client" + a] + "px){body#vpw-test-b div#vpw-test-d{" + d + ":7px!important}}</style>";
        h.appendChild(l);
        e.insertBefore(h, b.head);
        a = 7 == l["offset" + a] ? e["client" + a] : window["inner" + a];
        e.removeChild(h)
    } else
        a = window["inner" + a];
    return a
}
window.addEventListener("orientationchange", onOrientationChange);
function onOrientationChange() {
    window.matchMedia("(orientation: portrait)").matches && sizeHandler();
    window.matchMedia("(orientation: landscape)").matches && sizeHandler()
}
function isChrome() {
    return /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)
}
function isMobile() {
    return isIpad() ? !0 : jQuery.browser.mobile
}
function isIpad() {
    var a = -1 !== navigator.userAgent.toLowerCase().indexOf("ipad");
    return !a && navigator.userAgent.match(/Mac/) && navigator.maxTouchPoints && 2 < navigator.maxTouchPoints ? !0 : a
}
function isIOS() {
    for (var a = "iPad Simulator;iPhone Simulator;iPod Simulator;iPad;iPhone;iPod".split(";"); a.length;)
        if (navigator.platform === a.pop())
            return s_bIsIphone = !0;
    return s_bIsIphone = !1
}
function getIOSWindowHeight() {
    return document.documentElement.clientWidth / window.innerWidth * window.innerHeight
}
function getHeightOfIOSToolbars() {
    var a = (0 === window.orientation ? screen.height : screen.width) - getIOSWindowHeight();
    return 1 < a ? a : 0
}
function _checkOrientation(a, d) {
    s_bMobile && ENABLE_CHECK_ORIENTATION && (a > d ? "landscape" === $(".orientation-msg-container").attr("data-orientation") ? ($(".orientation-msg-container").css("display", "none"),
        s_oMain.startUpdate()) : ($(".orientation-msg-container").css("display", "block"),
            s_oMain.stopUpdate()) : "portrait" === $(".orientation-msg-container").attr("data-orientation") ? ($(".orientation-msg-container").css("display", "none"),
                s_oMain.startUpdate()) : ($(".orientation-msg-container").css("display", "block"),
                    s_oMain.stopUpdate()))
}
function sizeHandler() {
    window.scrollTo(0, 1);
    if ($("#canvas")) {
        var a = null !== platform.name && "safari" === platform.name.toLowerCase() ? getIOSWindowHeight() : getSize("Height");
        var d = getSize("Width");
        s_bFocus && _checkOrientation(d, a);
        var b = Math.min(a / CANVAS_HEIGHT, d / CANVAS_WIDTH)
            , e = Math.round(CANVAS_WIDTH * b);
        b = Math.round(CANVAS_HEIGHT * b);
        if (b < a) {
            var h = a - b;
            b += h;
            e += CANVAS_WIDTH / CANVAS_HEIGHT * h
        } else
            e < d && (h = d - e,
                e += h,
                b += CANVAS_HEIGHT / CANVAS_WIDTH * h);
        h = a / 2 - b / 2;
        var l = d / 2 - e / 2
            , f = CANVAS_WIDTH / e;
        if (l * f < -EDGEBOARD_X || h * f < -EDGEBOARD_Y)
            b = Math.min(a / (CANVAS_HEIGHT - 2 * EDGEBOARD_Y), d / (CANVAS_WIDTH - 2 * EDGEBOARD_X)),
                e = Math.round(CANVAS_WIDTH * b),
                b = Math.round(CANVAS_HEIGHT * b),
                h = (a - b) / 2,
                l = (d - e) / 2,
                f = CANVAS_WIDTH / e;
        s_iOffsetX = -1 * l * f;
        s_iOffsetY = -1 * h * f;
        0 <= h && (s_iOffsetY = 0);
        0 <= l && (s_iOffsetX = 0);
        null !== s_oGame && s_oGame.refreshButtonPos(s_iOffsetX, s_iOffsetY);
        null !== s_oMenu && s_oMenu.refreshButtonPos(s_iOffsetX, s_iOffsetY);
        $("#canvas").css("width", e + "px");
        $("#canvas").css("height", b + "px");
        0 > h || (h = (a - b) / 2);
        $("#canvas").css("top", h + "px");
        $("#canvas").css("left", l + "px");
        fullscreenHandler()
    }
}
function playSound(a, d, b) {
    return !1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile ? (s_aSounds[a].play(),
        s_aSounds[a].volume(d),
        s_aSounds[a].loop(b),
        s_aSounds[a]) : null
}
function stopSound(a) {
    !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || s_aSounds[a].stop()
}
function setVolume(a, d) {
    !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || s_aSounds[a].volume(d)
}
function setMute(a, d) {
    !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || s_aSounds[a].mute(d)
}
function createBitmap(a, d, b) {
    var e = new createjs.Bitmap(a)
        , h = new createjs.Shape;
    d && b ? h.graphics.beginFill("#fff").drawRect(0, 0, d, b) : h.graphics.beginFill("#ff0").drawRect(0, 0, a.width, a.height);
    e.hitArea = h;
    return e
}
function createSprite(a, d, b, e, h, l) {
    a = null !== d ? new createjs.Sprite(a, d) : new createjs.Sprite(a);
    d = new createjs.Shape;
    d.graphics.beginFill("#000000").drawRect(-b, -e, h, l);
    a.hitArea = d;
    return a
}
function pad(a, d, b) {
    a += "";
    return a.length >= d ? a : Array(d - a.length + 1).join(b || "0") + a
}
function randomFloatBetween(a, d, b) {
    "undefined" === typeof b && (b = 2);
    return parseFloat(Math.min(a + Math.random() * (d - a), d).toFixed(b))
}
function rotateVector2D(a, d) {
    var b = d.getX() * Math.cos(a) + d.getY() * Math.sin(a)
        , e = d.getX() * -Math.sin(a) + d.getY() * Math.cos(a);
    d.set(b, e)
}
function tweenVectorsOnX(a, d, b) {
    return a + b * (d - a)
}
function shuffle(a) {
    for (var d = a.length, b, e; 0 !== d;)
        e = Math.floor(Math.random() * d),
            --d,
            b = a[d],
            a[d] = a[e],
            a[e] = b;
    return a
}
Array.prototype.sortOn = function () {
    var a = this.slice();
    if (!arguments.length)
        return a.sort();
    var d = Array.prototype.slice.call(arguments);
    return a.sort(function (b, e) {
        for (var h = d.slice(), l = h.shift(); b[l] == e[l] && h.length;)
            l = h.shift();
        return b[l] == e[l] ? 0 : b[l] > e[l] ? 1 : -1
    })
}
    ;
function bubbleSort(a) {
    do {
        var d = !1;
        for (var b = 0; b < a.length - 1; b++)
            a[b] > a[b + 1] && (d = a[b],
                a[b] = a[b + 1],
                a[b + 1] = d,
                d = !0)
    } while (d)
}
function compare(a, d) {
    return a.index > d.index ? -1 : a.index < d.index ? 1 : 0
}
function easeLinear(a, d, b, e) {
    return b * a / e + d
}
function easeInQuad(a, d, b, e) {
    return b * (a /= e) * a + d
}
function easeInSine(a, d, b, e) {
    return -b * Math.cos(a / e * (Math.PI / 2)) + b + d
}
function easeInCubic(a, d, b, e) {
    return b * (a /= e) * a * a + d
}
function getTrajectoryPoint(a, d) {
    var b = new createjs.Point
        , e = (1 - a) * (1 - a)
        , h = a * a;
    b.x = e * d.start.x + 2 * (1 - a) * a * d.traj.x + h * d.end.x;
    b.y = e * d.start.y + 2 * (1 - a) * a * d.traj.y + h * d.end.y;
    return b
}
function formatTime(a) {
    a /= 1E3;
    var d = Math.floor(a / 60);
    a = parseFloat(a - 60 * d).toFixed(1);
    var b = "";
    b = 10 > d ? b + ("0" + d + ":") : b + (d + ":");
    return 10 > a ? b + ("0" + a) : b + a
}
function degreesToRadians(a) {
    return a * Math.PI / 180
}
function checkRectCollision(a, d) {
    var b = getBounds(a, .9);
    var e = getBounds(d, .98);
    return calculateIntersection(b, e)
}
function calculateIntersection(a, d) {
    var b, e, h, l;
    var f = a.x + (b = a.width / 2);
    var q = a.y + (e = a.height / 2);
    var m = d.x + (h = d.width / 2);
    var g = d.y + (l = d.height / 2);
    f = Math.abs(f - m) - (b + h);
    q = Math.abs(q - g) - (e + l);
    return 0 > f && 0 > q ? (f = Math.min(Math.min(a.width, d.width), -f),
        q = Math.min(Math.min(a.height, d.height), -q),
    {
        x: Math.max(a.x, d.x),
        y: Math.max(a.y, d.y),
        width: f,
        height: q,
        rect1: a,
        rect2: d
    }) : null
}
function getBounds(a, d) {
    var b = {
        x: Infinity,
        y: Infinity,
        width: 0,
        height: 0
    };
    if (a instanceof createjs.Container) {
        b.x2 = -Infinity;
        b.y2 = -Infinity;
        var e = a.children, h = e.length, l;
        for (l = 0; l < h; l++) {
            var f = getBounds(e[l], 1);
            f.x < b.x && (b.x = f.x);
            f.y < b.y && (b.y = f.y);
            f.x + f.width > b.x2 && (b.x2 = f.x + f.width);
            f.y + f.height > b.y2 && (b.y2 = f.y + f.height)
        }
        Infinity == b.x && (b.x = 0);
        Infinity == b.y && (b.y = 0);
        Infinity == b.x2 && (b.x2 = 0);
        Infinity == b.y2 && (b.y2 = 0);
        b.width = b.x2 - b.x;
        b.height = b.y2 - b.y;
        delete b.x2;
        delete b.y2
    } else {
        if (a instanceof createjs.Bitmap) {
            h = a.sourceRect || a.image;
            l = h.width * d;
            var q = h.height * d
        } else if (a instanceof createjs.Sprite)
            if (a.spriteSheet._frames && a.spriteSheet._frames[a.currentFrame] && a.spriteSheet._frames[a.currentFrame].image) {
                h = a.spriteSheet.getFrame(a.currentFrame);
                l = h.rect.width;
                q = h.rect.height;
                e = h.regX;
                var m = h.regY
            } else
                b.x = a.x || 0,
                    b.y = a.y || 0;
        else
            b.x = a.x || 0,
                b.y = a.y || 0;
        e = e || 0;
        l = l || 0;
        m = m || 0;
        q = q || 0;
        b.regX = e;
        b.regY = m;
        h = a.localToGlobal(0 - e, 0 - m);
        f = a.localToGlobal(l - e, q - m);
        l = a.localToGlobal(l - e, 0 - m);
        e = a.localToGlobal(0 - e, q - m);
        b.x = Math.min(Math.min(Math.min(h.x, f.x), l.x), e.x);
        b.y = Math.min(Math.min(Math.min(h.y, f.y), l.y), e.y);
        b.width = Math.max(Math.max(Math.max(h.x, f.x), l.x), e.x) - b.x;
        b.height = Math.max(Math.max(Math.max(h.y, f.y), l.y), e.y) - b.y
    }
    return b
}
function NoClickDelay(a) {
    this.element = a;
    window.Touch && this.element.addEventListener("touchstart", this, !1)
}
function shuffle(a) {
    for (var d = a.length, b, e; 0 < d;)
        e = Math.floor(Math.random() * d),
            d--,
            b = a[d],
            a[d] = a[e],
            a[e] = b;
    return a
}
NoClickDelay.prototype = {
    handleEvent: function (a) {
        switch (a.type) {
            case "touchstart":
                this.onTouchStart(a);
                break;
            case "touchmove":
                this.onTouchMove(a);
                break;
            case "touchend":
                this.onTouchEnd(a)
        }
    },
    onTouchStart: function (a) {
        a.preventDefault();
        this.moved = !1;
        this.element.addEventListener("touchmove", this, !1);
        this.element.addEventListener("touchend", this, !1)
    },
    onTouchMove: function (a) {
        this.moved = !0
    },
    onTouchEnd: function (a) {
        this.element.removeEventListener("touchmove", this, !1);
        this.element.removeEventListener("touchend", this, !1);
        if (!this.moved) {
            a = document.elementFromPoint(a.changedTouches[0].clientX, a.changedTouches[0].clientY);
            3 == a.nodeType && (a = a.parentNode);
            var d = document.createEvent("MouseEvents");
            d.initEvent("click", !0, !0);
            a.dispatchEvent(d)
        }
    }
};
(function () {
    function a(b) {
        var e = {
            focus: "visible",
            focusin: "visible",
            pageshow: "visible",
            blur: "hidden",
            focusout: "hidden",
            pagehide: "hidden"
        };
        b = b || window.event;
        b.type in e ? document.body.className = e[b.type] : (document.body.className = this[d] ? "hidden" : "visible",
            "hidden" === document.body.className ? (s_oMain.stopUpdate(),
                s_bFocus = !1) : (s_oMain.startUpdate(),
                    s_bFocus = !0))
    }
    var d = "hidden";
    d in document ? document.addEventListener("visibilitychange", a) : (d = "mozHidden") in document ? document.addEventListener("mozvisibilitychange", a) : (d = "webkitHidden") in document ? document.addEventListener("webkitvisibilitychange", a) : (d = "msHidden") in document ? document.addEventListener("msvisibilitychange", a) : "onfocusin" in document ? document.onfocusin = document.onfocusout = a : window.onpageshow = window.onpagehide = window.onfocus = window.onblur = a
}
)();
function ctlArcadeResume() {
    null !== s_oMain && s_oMain.startUpdate()
}
function ctlArcadePause() {
    null !== s_oMain && s_oMain.stopUpdate()
}
function getParamValue(a) {
    for (var d = window.location.search.substring(1).split("&"), b = 0; b < d.length; b++) {
        var e = d[b].split("=");
        if (e[0] == a)
            return e[1]
    }
}
this.clearLocalStorage = function () {
    s_iLastLevel = 1;
    s_bStorageAvailable && localStorage.clear()
}
    ;
function saveItem(a, d) {
    s_bStorageAvailable && localStorage.setItem(a, d)
}
function getItem(a) {
    return s_bStorageAvailable ? localStorage.getItem(a) : null
}
function randomIntBetween(a, d) {
    return parseInt(Math.min(a + Math.random() * (d - a), d))
}
function fullscreenHandler() {
    ENABLE_FULLSCREEN && screenfull.isEnabled && (s_bFullscreen = screenfull.isFullscreen,
        null !== s_oInterface && s_oInterface.resetFullscreenBut(),
        null !== s_oMenu && s_oMenu.resetFullscreenBut())
}
if (screenfull.isEnabled)
    screenfull.on("change", function () {
        s_bFullscreen = screenfull.isFullscreen;
        null !== s_oInterface && s_oInterface.resetFullscreenBut();
        null !== s_oMenu && s_oMenu.resetFullscreenBut()
    });
function CSpriteLibrary() {
    var a = {}, d, b, e, h, l, f;
    this.init = function (q, m, g) {
        d = {};
        e = b = 0;
        h = q;
        l = m;
        f = g
    }
        ;
    this.addSprite = function (q, m) {
        if (!a.hasOwnProperty(q)) {
            var g = new Image;
            a[q] = d[q] = {
                szPath: m,
                oSprite: g,
                bLoaded: !1
            };
            b++
        }
    }
        ;
    this.getSprite = function (q) {
        return a.hasOwnProperty(q) ? a[q].oSprite : null
    }
        ;
    this._onSpritesLoaded = function () {
        b = 0;
        l.call(f)
    }
        ;
    this._onSpriteLoaded = function () {
        h.call(f);
        ++e === b && this._onSpritesLoaded()
    }
        ;
    this.loadSprites = function () {
        for (var q in d)
            d[q].oSprite.oSpriteLibrary = this,
                d[q].oSprite.szKey = q,
                d[q].oSprite.onload = function () {
                    this.oSpriteLibrary.setLoaded(this.szKey);
                    this.oSpriteLibrary._onSpriteLoaded(this.szKey)
                }
                ,
                d[q].oSprite.onerror = function (m) {
                    var g = m.currentTarget;
                    setTimeout(function () {
                        d[g.szKey].oSprite.src = d[g.szKey].szPath
                    }, 500)
                }
                ,
                d[q].oSprite.src = d[q].szPath
    }
        ;
    this.setLoaded = function (q) {
        a[q].bLoaded = !0
    }
        ;
    this.isLoaded = function (q) {
        return a[q].bLoaded
    }
        ;
    this.getNumSprites = function () {
        return b
    }
}
!function (a, d, b, e) {
    function h(c, k, p) {
        return setTimeout(g(c, p), k)
    }
    function l(c, k, p) {
        return Array.isArray(c) ? (f(c, p[k], p),
            !0) : !1
    }
    function f(c, k, p) {
        var v;
        if (c)
            if (c.forEach)
                c.forEach(k, p);
            else if (c.length !== e)
                for (v = 0; v < c.length;)
                    k.call(p, c[v], v, c),
                        v++;
            else
                for (v in c)
                    c.hasOwnProperty(v) && k.call(p, c[v], v, c)
    }
    function q(c, k, p) {
        var v = "DEPRECATED METHOD: " + k + "\n" + p + " AT \n";
        return function () {
            var E = Error("get-stack-trace");
            E = E && E.stack ? E.stack.replace(/^[^\(]+?[\n$]/gm, "").replace(/^\s+at\s+/gm, "").replace(/^Object.<anonymous>\s*\(/gm, "{anonymous}()@") : "Unknown Stack Trace";
            var K = a.console && (a.console.warn || a.console.log);
            return K && K.call(a.console, v, E),
                c.apply(this, arguments)
        }
    }
    function m(c, k, p) {
        var v = k.prototype;
        k = c.prototype = Object.create(v);
        k.constructor = c;
        k._super = v;
        p && oa(k, p)
    }
    function g(c, k) {
        return function () {
            return c.apply(k, arguments)
        }
    }
    function x(c, k) {
        return typeof c == Za ? c.apply(k ? k[0] || e : e, k) : c
    }
    function r(c, k, p) {
        f(A(k), function (v) {
            c.addEventListener(v, p, !1)
        })
    }
    function n(c, k, p) {
        f(A(k), function (v) {
            c.removeEventListener(v, p, !1)
        })
    }
    function y(c, k) {
        for (; c;) {
            if (c == k)
                return !0;
            c = c.parentNode
        }
        return !1
    }
    function A(c) {
        return c.trim().split(/\s+/g)
    }
    function u(c, k, p) {
        if (c.indexOf && !p)
            return c.indexOf(k);
        for (var v = 0; v < c.length;) {
            if (p && c[v][p] == k || !p && c[v] === k)
                return v;
            v++
        }
        return -1
    }
    function B(c) {
        return Array.prototype.slice.call(c, 0)
    }
    function z(c, k, p) {
        for (var v = [], E = [], K = 0; K < c.length;) {
            var M = k ? c[K][k] : c[K];
            0 > u(E, M) && v.push(c[K]);
            E[K] = M;
            K++
        }
        return p && (v = k ? v.sort(function (T, ja) {
            return T[k] > ja[k]
        }) : v.sort()),
            v
    }
    function t(c, k) {
        for (var p, v, E = k[0].toUpperCase() + k.slice(1), K = 0; K < Pa.length;) {
            if (p = Pa[K],
                v = p ? p + E : k,
                v in c)
                return v;
            K++
        }
        return e
    }
    function F(c) {
        c = c.ownerDocument || c;
        return c.defaultView || c.parentWindow || a
    }
    function J(c, k) {
        var p = this;
        this.manager = c;
        this.callback = k;
        this.element = c.element;
        this.target = c.options.inputTarget;
        this.domHandler = function (v) {
            x(c.options.enable, [c]) && p.handler(v)
        }
            ;
        this.init()
    }
    function C(c) {
        var k = c.options.inputClass;
        return new (k ? k : $a ? Z : ab ? X : Qa ? fa : N)(c, D)
    }
    function D(c, k, p) {
        var v = p.pointers.length;
        var E = p.changedPointers.length;
        var K = k & Y && 0 === v - E;
        v = k & (V | ca) && 0 === v - E;
        p.isFirst = !!K;
        p.isFinal = !!v;
        K && (c.session = {});
        p.eventType = k;
        k = c.session;
        K = p.pointers;
        v = K.length;
        k.firstInput || (k.firstInput = L(p));
        1 < v && !k.firstMultiple ? k.firstMultiple = L(p) : 1 === v && (k.firstMultiple = !1);
        E = k.firstInput;
        var M = (v = k.firstMultiple) ? v.center : E.center;
        var T = p.center = G(K);
        p.timeStamp = Na();
        p.deltaTime = p.timeStamp - E.timeStamp;
        p.angle = ma(M, T);
        p.distance = da(M, T);
        E = p.center;
        M = k.offsetDelta || {};
        T = k.prevDelta || {};
        var ja = k.prevInput || {};
        p.eventType !== Y && ja.eventType !== V || (T = k.prevDelta = {
            x: ja.deltaX || 0,
            y: ja.deltaY || 0
        },
            M = k.offsetDelta = {
                x: E.x,
                y: E.y
            });
        p.deltaX = T.x + (E.x - M.x);
        p.deltaY = T.y + (E.y - M.y);
        p.offsetDirection = ka(p.deltaX, p.deltaY);
        M = p.deltaTime;
        E = p.deltaX / M || 0;
        M = p.deltaY / M || 0;
        p.overallVelocityX = E;
        p.overallVelocityY = M;
        p.overallVelocity = ra(E) > ra(M) ? E : M;
        v ? (E = v.pointers,
            E = da(K[0], K[1], Ja) / da(E[0], E[1], Ja)) : E = 1;
        p.scale = E;
        v ? (v = v.pointers,
            K = ma(K[1], K[0], Ja) + ma(v[1], v[0], Ja)) : K = 0;
        p.rotation = K;
        p.maxPointers = k.prevInput ? p.pointers.length > k.prevInput.maxPointers ? p.pointers.length : k.prevInput.maxPointers : p.pointers.length;
        M = k.lastInterval || p;
        K = p.timeStamp - M.timeStamp;
        p.eventType != ca && (K > bb || M.velocity === e) ? (E = p.deltaX - M.deltaX,
            M = p.deltaY - M.deltaY,
            T = E / K || 0,
            ja = M / K || 0,
            K = T,
            v = ja,
            T = ra(T) > ra(ja) ? T : ja,
            E = ka(E, M),
            k.lastInterval = p) : (T = M.velocity,
                K = M.velocityX,
                v = M.velocityY,
                E = M.direction);
        p.velocity = T;
        p.velocityX = K;
        p.velocityY = v;
        p.direction = E;
        k = c.element;
        y(p.srcEvent.target, k) && (k = p.srcEvent.target);
        p.target = k;
        c.emit("hammer.input", p);
        c.recognize(p);
        c.session.prevInput = p
    }
    function L(c) {
        for (var k = [], p = 0; p < c.pointers.length;)
            k[p] = {
                clientX: ya(c.pointers[p].clientX),
                clientY: ya(c.pointers[p].clientY)
            },
                p++;
        return {
            timeStamp: Na(),
            pointers: k,
            center: G(k),
            deltaX: c.deltaX,
            deltaY: c.deltaY
        }
    }
    function G(c) {
        var k = c.length;
        if (1 === k)
            return {
                x: ya(c[0].clientX),
                y: ya(c[0].clientY)
            };
        for (var p = 0, v = 0, E = 0; k > E;)
            p += c[E].clientX,
                v += c[E].clientY,
                E++;
        return {
            x: ya(p / k),
            y: ya(v / k)
        }
    }
    function ka(c, k) {
        return c === k ? Ka : ra(c) >= ra(k) ? 0 > c ? Ca : Da : 0 > k ? Ea : Fa
    }
    function da(c, k, p) {
        p || (p = Ra);
        var v = k[p[0]] - c[p[0]];
        c = k[p[1]] - c[p[1]];
        return Math.sqrt(v * v + c * c)
    }
    function ma(c, k, p) {
        p || (p = Ra);
        return 180 * Math.atan2(k[p[1]] - c[p[1]], k[p[0]] - c[p[0]]) / Math.PI
    }
    function N() {
        this.evEl = cb;
        this.evWin = db;
        this.pressed = !1;
        J.apply(this, arguments)
    }
    function Z() {
        this.evEl = Sa;
        this.evWin = Ta;
        J.apply(this, arguments);
        this.store = this.manager.session.pointerEvents = []
    }
    function ea() {
        this.evTarget = eb;
        this.evWin = fb;
        this.started = !1;
        J.apply(this, arguments)
    }
    function X() {
        this.evTarget = gb;
        this.targetIds = {};
        J.apply(this, arguments)
    }
    function Aa(c, k) {
        var p = B(c.touches)
            , v = this.targetIds;
        if (k & (Y | sa) && 1 === p.length)
            return v[p[0].identifier] = !0,
                [p, p];
        var E, K = B(c.changedTouches), M = [], T = this.target;
        if (E = p.filter(function (ja) {
            return y(ja.target, T)
        }),
            k === Y)
            for (p = 0; p < E.length;)
                v[E[p].identifier] = !0,
                    p++;
        for (p = 0; p < K.length;)
            v[K[p].identifier] && M.push(K[p]),
                k & (V | ca) && delete v[K[p].identifier],
                p++;
        return M.length ? [z(E.concat(M), "identifier", !0), M] : void 0
    }
    function fa() {
        J.apply(this, arguments);
        var c = g(this.handler, this);
        this.touch = new X(this.manager, c);
        this.mouse = new N(this.manager, c);
        this.primaryTouch = null;
        this.lastTouches = []
    }
    function qa(c) {
        c = c.changedPointers[0];
        if (c.identifier === this.primaryTouch) {
            var k = {
                x: c.clientX,
                y: c.clientY
            };
            this.lastTouches.push(k);
            var p = this.lastTouches;
            setTimeout(function () {
                var v = p.indexOf(k);
                -1 < v && p.splice(v, 1)
            }, hb)
        }
    }
    function w(c, k) {
        this.manager = c;
        this.set(k)
    }
    function va(c) {
        if (-1 < c.indexOf(ta))
            return ta;
        var k = -1 < c.indexOf(Ga)
            , p = -1 < c.indexOf(Ha);
        return k && p ? ta : k || p ? k ? Ga : Ha : -1 < c.indexOf(Oa) ? Oa : Ua
    }
    function aa(c) {
        this.options = oa({}, this.defaults, c || {});
        this.id = ib++;
        this.manager = null;
        c = this.options.enable;
        this.options.enable = c === e ? !0 : c;
        this.state = La;
        this.simultaneous = {};
        this.requireFail = []
    }
    function ia(c) {
        return c & Ia ? "cancel" : c & pa ? "end" : c & za ? "move" : c & ha ? "start" : ""
    }
    function Q(c) {
        return c == Fa ? "down" : c == Ea ? "up" : c == Ca ? "left" : c == Da ? "right" : ""
    }
    function H(c, k) {
        var p = k.manager;
        return p ? p.get(c) : c
    }
    function O() {
        aa.apply(this, arguments)
    }
    function W() {
        O.apply(this, arguments);
        this.pY = this.pX = null
    }
    function I() {
        O.apply(this, arguments)
    }
    function xa() {
        aa.apply(this, arguments);
        this._input = this._timer = null
    }
    function U() {
        O.apply(this, arguments)
    }
    function R() {
        O.apply(this, arguments)
    }
    function P() {
        aa.apply(this, arguments);
        this.pCenter = this.pTime = !1;
        this._input = this._timer = null;
        this.count = 0
    }
    function S(c, k) {
        k = k || {};
        var p = k.recognizers;
        return k.recognizers = p === e ? S.defaults.preset : p,
            new ba(c, k)
    }
    function ba(c, k) {
        this.options = oa({}, S.defaults, k || {});
        this.options.inputTarget = this.options.inputTarget || c;
        this.handlers = {};
        this.session = {};
        this.recognizers = [];
        this.oldCssProps = {};
        this.element = c;
        this.input = C(this);
        this.touchAction = new w(this, this.options.touchAction);
        wa(this, !0);
        f(this.options.recognizers, function (p) {
            var v = this.add(new p[0](p[1]));
            p[2] && v.recognizeWith(p[2]);
            p[3] && v.requireFailure(p[3])
        }, this)
    }
    function wa(c, k) {
        var p = c.element;
        if (p.style) {
            var v;
            f(c.options.cssProps, function (E, K) {
                v = t(p.style, K);
                k ? (c.oldCssProps[v] = p.style[v],
                    p.style[v] = E) : p.style[v] = c.oldCssProps[v] || ""
            });
            k || (c.oldCssProps = {})
        }
    }
    function Ba(c, k) {
        var p = d.createEvent("Event");
        p.initEvent(c, !0, !0);
        p.gesture = k;
        k.target.dispatchEvent(p)
    }
    var Pa = " webkit Moz MS ms o".split(" ")
        , jb = d.createElement("div")
        , Za = "function"
        , ya = Math.round
        , ra = Math.abs
        , Na = Date.now;
    var oa = "function" != typeof Object.assign ? function (c) {
        if (c === e || null === c)
            throw new TypeError("Cannot convert undefined or null to object");
        for (var k = Object(c), p = 1; p < arguments.length; p++) {
            var v = arguments[p];
            if (v !== e && null !== v)
                for (var E in v)
                    v.hasOwnProperty(E) && (k[E] = v[E])
        }
        return k
    }
        : Object.assign;
    var Va = q(function (c, k, p) {
        for (var v = Object.keys(k), E = 0; E < v.length;)
            (!p || p && c[v[E]] === e) && (c[v[E]] = k[v[E]]),
                E++;
        return c
    }, "extend", "Use `assign`.")
        , kb = q(function (c, k) {
            return Va(c, k, !0)
        }, "merge", "Use `assign`.")
        , ib = 1
        , lb = /mobile|tablet|ip(ad|hone|od)|android/i
        , Qa = "ontouchstart" in a
        , $a = t(a, "PointerEvent") !== e
        , ab = Qa && lb.test(navigator.userAgent)
        , bb = 25
        , Y = 1
        , sa = 2
        , V = 4
        , ca = 8
        , Ka = 1
        , Ca = 2
        , Da = 4
        , Ea = 8
        , Fa = 16
        , la = Ca | Da
        , ua = Ea | Fa
        , Wa = la | ua
        , Ra = ["x", "y"]
        , Ja = ["clientX", "clientY"];
    J.prototype = {
        handler: function () { },
        init: function () {
            this.evEl && r(this.element, this.evEl, this.domHandler);
            this.evTarget && r(this.target, this.evTarget, this.domHandler);
            this.evWin && r(F(this.element), this.evWin, this.domHandler)
        },
        destroy: function () {
            this.evEl && n(this.element, this.evEl, this.domHandler);
            this.evTarget && n(this.target, this.evTarget, this.domHandler);
            this.evWin && n(F(this.element), this.evWin, this.domHandler)
        }
    };
    var mb = {
        mousedown: Y,
        mousemove: sa,
        mouseup: V
    }
        , cb = "mousedown"
        , db = "mousemove mouseup";
    m(N, J, {
        handler: function (c) {
            var k = mb[c.type];
            k & Y && 0 === c.button && (this.pressed = !0);
            k & sa && 1 !== c.which && (k = V);
            this.pressed && (k & V && (this.pressed = !1),
                this.callback(this.manager, k, {
                    pointers: [c],
                    changedPointers: [c],
                    pointerType: "mouse",
                    srcEvent: c
                }))
        }
    });
    var nb = {
        pointerdown: Y,
        pointermove: sa,
        pointerup: V,
        pointercancel: ca,
        pointerout: ca
    }
        , ob = {
            2: "touch",
            3: "pen",
            4: "mouse",
            5: "kinect"
        }
        , Sa = "pointerdown"
        , Ta = "pointermove pointerup pointercancel";
    a.MSPointerEvent && !a.PointerEvent && (Sa = "MSPointerDown",
        Ta = "MSPointerMove MSPointerUp MSPointerCancel");
    m(Z, J, {
        handler: function (c) {
            var k = this.store
                , p = !1
                , v = c.type.toLowerCase().replace("ms", "");
            v = nb[v];
            var E = ob[c.pointerType] || c.pointerType
                , K = "touch" == E
                , M = u(k, c.pointerId, "pointerId");
            v & Y && (0 === c.button || K) ? 0 > M && (k.push(c),
                M = k.length - 1) : v & (V | ca) && (p = !0);
            0 > M || (k[M] = c,
                this.callback(this.manager, v, {
                    pointers: k,
                    changedPointers: [c],
                    pointerType: E,
                    srcEvent: c
                }),
                p && k.splice(M, 1))
        }
    });
    var pb = {
        touchstart: Y,
        touchmove: sa,
        touchend: V,
        touchcancel: ca
    }
        , eb = "touchstart"
        , fb = "touchstart touchmove touchend touchcancel";
    m(ea, J, {
        handler: function (c) {
            var k = pb[c.type];
            if (k === Y && (this.started = !0),
                this.started) {
                var p = B(c.touches);
                var v = B(c.changedTouches);
                v = (k & (V | ca) && (p = z(p.concat(v), "identifier", !0)),
                    [p, v]);
                k & (V | ca) && 0 === v[0].length - v[1].length && (this.started = !1);
                this.callback(this.manager, k, {
                    pointers: v[0],
                    changedPointers: v[1],
                    pointerType: "touch",
                    srcEvent: c
                })
            }
        }
    });
    var qb = {
        touchstart: Y,
        touchmove: sa,
        touchend: V,
        touchcancel: ca
    }
        , gb = "touchstart touchmove touchend touchcancel";
    m(X, J, {
        handler: function (c) {
            var k = qb[c.type]
                , p = Aa.call(this, c, k);
            p && this.callback(this.manager, k, {
                pointers: p[0],
                changedPointers: p[1],
                pointerType: "touch",
                srcEvent: c
            })
        }
    });
    var hb = 2500;
    m(fa, J, {
        handler: function (c, k, p) {
            var v = "touch" == p.pointerType
                , E = "mouse" == p.pointerType;
            if (!(E && p.sourceCapabilities && p.sourceCapabilities.firesTouchEvents)) {
                if (v)
                    k & Y ? (this.primaryTouch = p.changedPointers[0].identifier,
                        qa.call(this, p)) : k & (V | ca) && qa.call(this, p);
                else {
                    if (v = E)
                        a: {
                            v = p.srcEvent.clientX;
                            E = p.srcEvent.clientY;
                            for (var K = 0; K < this.lastTouches.length; K++) {
                                var M = this.lastTouches[K]
                                    , T = Math.abs(E - M.y);
                                if (25 >= Math.abs(v - M.x) && 25 >= T) {
                                    v = !0;
                                    break a
                                }
                            }
                            v = !1
                        }
                    if (v)
                        return
                }
                this.callback(c, k, p)
            }
        },
        destroy: function () {
            this.touch.destroy();
            this.mouse.destroy()
        }
    });
    var Xa = t(jb.style, "touchAction")
        , Ya = Xa !== e
        , Ua = "auto"
        , Oa = "manipulation"
        , ta = "none"
        , Ga = "pan-x"
        , Ha = "pan-y"
        , Ma = function () {
            if (!Ya)
                return !1;
            var c = {}
                , k = a.CSS && a.CSS.supports;
            return "auto;manipulation;pan-y;pan-x;pan-x pan-y;none".split(";").forEach(function (p) {
                c[p] = k ? a.CSS.supports("touch-action", p) : !0
            }),
                c
        }();
    w.prototype = {
        set: function (c) {
            "compute" == c && (c = this.compute());
            Ya && this.manager.element.style && Ma[c] && (this.manager.element.style[Xa] = c);
            this.actions = c.toLowerCase().trim()
        },
        update: function () {
            this.set(this.manager.options.touchAction)
        },
        compute: function () {
            var c = [];
            return f(this.manager.recognizers, function (k) {
                x(k.options.enable, [k]) && (c = c.concat(k.getTouchAction()))
            }),
                va(c.join(" "))
        },
        preventDefaults: function (c) {
            var k = c.srcEvent
                , p = c.offsetDirection;
            if (this.manager.session.prevented)
                return void k.preventDefault();
            var v = this.actions
                , E = -1 < v.indexOf(ta) && !Ma[ta]
                , K = -1 < v.indexOf(Ha) && !Ma[Ha];
            v = -1 < v.indexOf(Ga) && !Ma[Ga];
            if (E) {
                var M = 2 > c.distance
                    , T = 250 > c.deltaTime;
                if (1 === c.pointers.length && M && T)
                    return
            }
            return v && K ? void 0 : E || K && p & la || v && p & ua ? this.preventSrc(k) : void 0
        },
        preventSrc: function (c) {
            this.manager.session.prevented = !0;
            c.preventDefault()
        }
    };
    var La = 1
        , ha = 2
        , za = 4
        , pa = 8
        , na = pa
        , Ia = 16;
    aa.prototype = {
        defaults: {},
        set: function (c) {
            return oa(this.options, c),
                this.manager && this.manager.touchAction.update(),
                this
        },
        recognizeWith: function (c) {
            if (l(c, "recognizeWith", this))
                return this;
            var k = this.simultaneous;
            return c = H(c, this),
                k[c.id] || (k[c.id] = c,
                    c.recognizeWith(this)),
                this
        },
        dropRecognizeWith: function (c) {
            return l(c, "dropRecognizeWith", this) ? this : (c = H(c, this),
                delete this.simultaneous[c.id],
                this)
        },
        requireFailure: function (c) {
            if (l(c, "requireFailure", this))
                return this;
            var k = this.requireFail;
            return c = H(c, this),
                -1 === u(k, c) && (k.push(c),
                    c.requireFailure(this)),
                this
        },
        dropRequireFailure: function (c) {
            if (l(c, "dropRequireFailure", this))
                return this;
            c = H(c, this);
            c = u(this.requireFail, c);
            return -1 < c && this.requireFail.splice(c, 1),
                this
        },
        hasRequireFailures: function () {
            return 0 < this.requireFail.length
        },
        canRecognizeWith: function (c) {
            return !!this.simultaneous[c.id]
        },
        emit: function (c) {
            function k(E) {
                p.manager.emit(E, c)
            }
            var p = this
                , v = this.state;
            pa > v && k(p.options.event + ia(v));
            k(p.options.event);
            c.additionalEvent && k(c.additionalEvent);
            v >= pa && k(p.options.event + ia(v))
        },
        tryEmit: function (c) {
            return this.canEmit() ? this.emit(c) : void (this.state = 32)
        },
        canEmit: function () {
            for (var c = 0; c < this.requireFail.length;) {
                if (!(this.requireFail[c].state & (32 | La)))
                    return !1;
                c++
            }
            return !0
        },
        recognize: function (c) {
            c = oa({}, c);
            return x(this.options.enable, [this, c]) ? (this.state & (na | Ia | 32) && (this.state = La),
                this.state = this.process(c),
                void (this.state & (ha | za | pa | Ia) && this.tryEmit(c))) : (this.reset(),
                    void (this.state = 32))
        },
        process: function (c) { },
        getTouchAction: function () { },
        reset: function () { }
    };
    m(O, aa, {
        defaults: {
            pointers: 1
        },
        attrTest: function (c) {
            var k = this.options.pointers;
            return 0 === k || c.pointers.length === k
        },
        process: function (c) {
            var k = this.state
                , p = c.eventType
                , v = k & (ha | za);
            c = this.attrTest(c);
            return v && (p & ca || !c) ? k | Ia : v || c ? p & V ? k | pa : k & ha ? k | za : ha : 32
        }
    });
    m(W, O, {
        defaults: {
            event: "pan",
            threshold: 10,
            pointers: 1,
            direction: Wa
        },
        getTouchAction: function () {
            var c = this.options.direction
                , k = [];
            return c & la && k.push(Ha),
                c & ua && k.push(Ga),
                k
        },
        directionTest: function (c) {
            var k = this.options
                , p = !0
                , v = c.distance
                , E = c.direction
                , K = c.deltaX
                , M = c.deltaY;
            return E & k.direction || (k.direction & la ? (E = 0 === K ? Ka : 0 > K ? Ca : Da,
                p = K != this.pX,
                v = Math.abs(c.deltaX)) : (E = 0 === M ? Ka : 0 > M ? Ea : Fa,
                    p = M != this.pY,
                    v = Math.abs(c.deltaY))),
                c.direction = E,
                p && v > k.threshold && E & k.direction
        },
        attrTest: function (c) {
            return O.prototype.attrTest.call(this, c) && (this.state & ha || !(this.state & ha) && this.directionTest(c))
        },
        emit: function (c) {
            this.pX = c.deltaX;
            this.pY = c.deltaY;
            var k = Q(c.direction);
            k && (c.additionalEvent = this.options.event + k);
            this._super.emit.call(this, c)
        }
    });
    m(I, O, {
        defaults: {
            event: "pinch",
            threshold: 0,
            pointers: 2
        },
        getTouchAction: function () {
            return [ta]
        },
        attrTest: function (c) {
            return this._super.attrTest.call(this, c) && (Math.abs(c.scale - 1) > this.options.threshold || this.state & ha)
        },
        emit: function (c) {
            1 !== c.scale && (c.additionalEvent = this.options.event + (1 > c.scale ? "in" : "out"));
            this._super.emit.call(this, c)
        }
    });
    m(xa, aa, {
        defaults: {
            event: "press",
            pointers: 1,
            time: 251,
            threshold: 9
        },
        getTouchAction: function () {
            return [Ua]
        },
        process: function (c) {
            var k = this.options
                , p = c.pointers.length === k.pointers
                , v = c.distance < k.threshold
                , E = c.deltaTime > k.time;
            if (this._input = c,
                !v || !p || c.eventType & (V | ca) && !E)
                this.reset();
            else if (c.eventType & Y)
                this.reset(),
                    this._timer = h(function () {
                        this.state = na;
                        this.tryEmit()
                    }, k.time, this);
            else if (c.eventType & V)
                return na;
            return 32
        },
        reset: function () {
            clearTimeout(this._timer)
        },
        emit: function (c) {
            this.state === na && (c && c.eventType & V ? this.manager.emit(this.options.event + "up", c) : (this._input.timeStamp = Na(),
                this.manager.emit(this.options.event, this._input)))
        }
    });
    m(U, O, {
        defaults: {
            event: "rotate",
            threshold: 0,
            pointers: 2
        },
        getTouchAction: function () {
            return [ta]
        },
        attrTest: function (c) {
            return this._super.attrTest.call(this, c) && (Math.abs(c.rotation) > this.options.threshold || this.state & ha)
        }
    });
    m(R, O, {
        defaults: {
            event: "swipe",
            threshold: 10,
            velocity: .3,
            direction: la | ua,
            pointers: 1
        },
        getTouchAction: function () {
            return W.prototype.getTouchAction.call(this)
        },
        attrTest: function (c) {
            var k, p = this.options.direction;
            return p & (la | ua) ? k = c.overallVelocity : p & la ? k = c.overallVelocityX : p & ua && (k = c.overallVelocityY),
                this._super.attrTest.call(this, c) && p & c.offsetDirection && c.distance > this.options.threshold && c.maxPointers == this.options.pointers && ra(k) > this.options.velocity && c.eventType & V
        },
        emit: function (c) {
            var k = Q(c.offsetDirection);
            k && this.manager.emit(this.options.event + k, c);
            this.manager.emit(this.options.event, c)
        }
    });
    m(P, aa, {
        defaults: {
            event: "tap",
            pointers: 1,
            taps: 1,
            interval: 300,
            time: 250,
            threshold: 9,
            posThreshold: 10
        },
        getTouchAction: function () {
            return [Oa]
        },
        process: function (c) {
            var k = this.options
                , p = c.pointers.length === k.pointers
                , v = c.distance < k.threshold
                , E = c.deltaTime < k.time;
            if (this.reset(),
                c.eventType & Y && 0 === this.count)
                return this.failTimeout();
            if (v && E && p) {
                if (c.eventType != V)
                    return this.failTimeout();
                p = this.pTime ? c.timeStamp - this.pTime < k.interval : !0;
                v = !this.pCenter || da(this.pCenter, c.center) < k.posThreshold;
                this.pTime = c.timeStamp;
                this.pCenter = c.center;
                v && p ? this.count += 1 : this.count = 1;
                this._input = c;
                if (0 === this.count % k.taps)
                    return this.hasRequireFailures() ? (this._timer = h(function () {
                        this.state = na;
                        this.tryEmit()
                    }, k.interval, this),
                        ha) : na
            }
            return 32
        },
        failTimeout: function () {
            return this._timer = h(function () {
                this.state = 32
            }, this.options.interval, this),
                32
        },
        reset: function () {
            clearTimeout(this._timer)
        },
        emit: function () {
            this.state == na && (this._input.tapCount = this.count,
                this.manager.emit(this.options.event, this._input))
        }
    });
    S.VERSION = "2.0.8";
    S.defaults = {
        domEvents: !1,
        touchAction: "compute",
        enable: !0,
        inputTarget: null,
        inputClass: null,
        preset: [[U, {
            enable: !1
        }], [I, {
            enable: !1
        }, ["rotate"]], [R, {
            direction: la
        }], [W, {
            direction: la
        }, ["swipe"]], [P], [P, {
            event: "doubletap",
            taps: 2
        }, ["tap"]], [xa]],
        cssProps: {
            userSelect: "none",
            touchSelect: "none",
            touchCallout: "none",
            contentZooming: "none",
            userDrag: "none",
            tapHighlightColor: "rgba(0,0,0,0)"
        }
    };
    ba.prototype = {
        set: function (c) {
            return oa(this.options, c),
                c.touchAction && this.touchAction.update(),
                c.inputTarget && (this.input.destroy(),
                    this.input.target = c.inputTarget,
                    this.input.init()),
                this
        },
        stop: function (c) {
            this.session.stopped = c ? 2 : 1
        },
        recognize: function (c) {
            var k = this.session;
            if (!k.stopped) {
                this.touchAction.preventDefaults(c);
                var p = this.recognizers
                    , v = k.curRecognizer;
                (!v || v && v.state & na) && (v = k.curRecognizer = null);
                for (var E = 0; E < p.length;) {
                    var K = p[E];
                    2 === k.stopped || v && K != v && !K.canRecognizeWith(v) ? K.reset() : K.recognize(c);
                    !v && K.state & (ha | za | pa) && (v = k.curRecognizer = K);
                    E++
                }
            }
        },
        get: function (c) {
            if (c instanceof aa)
                return c;
            for (var k = this.recognizers, p = 0; p < k.length; p++)
                if (k[p].options.event == c)
                    return k[p];
            return null
        },
        add: function (c) {
            if (l(c, "add", this))
                return this;
            var k = this.get(c.options.event);
            return k && this.remove(k),
                this.recognizers.push(c),
                c.manager = this,
                this.touchAction.update(),
                c
        },
        remove: function (c) {
            if (l(c, "remove", this))
                return this;
            if (c = this.get(c)) {
                var k = this.recognizers;
                c = u(k, c);
                -1 !== c && (k.splice(c, 1),
                    this.touchAction.update())
            }
            return this
        },
        on: function (c, k) {
            if (c !== e && k !== e) {
                var p = this.handlers;
                return f(A(c), function (v) {
                    p[v] = p[v] || [];
                    p[v].push(k)
                }),
                    this
            }
        },
        off: function (c, k) {
            if (c !== e) {
                var p = this.handlers;
                return f(A(c), function (v) {
                    k ? p[v] && p[v].splice(u(p[v], k), 1) : delete p[v]
                }),
                    this
            }
        },
        emit: function (c, k) {
            this.options.domEvents && Ba(c, k);
            var p = this.handlers[c] && this.handlers[c].slice();
            if (p && p.length) {
                k.type = c;
                k.preventDefault = function () {
                    k.srcEvent.preventDefault()
                }
                    ;
                for (var v = 0; v < p.length;)
                    p[v](k),
                        v++
            }
        },
        destroy: function () {
            this.element && wa(this, !1);
            this.handlers = {};
            this.session = {};
            this.input.destroy();
            this.element = null
        }
    };
    oa(S, {
        INPUT_START: Y,
        INPUT_MOVE: sa,
        INPUT_END: V,
        INPUT_CANCEL: ca,
        STATE_POSSIBLE: La,
        STATE_BEGAN: ha,
        STATE_CHANGED: za,
        STATE_ENDED: pa,
        STATE_RECOGNIZED: na,
        STATE_CANCELLED: Ia,
        STATE_FAILED: 32,
        DIRECTION_NONE: Ka,
        DIRECTION_LEFT: Ca,
        DIRECTION_RIGHT: Da,
        DIRECTION_UP: Ea,
        DIRECTION_DOWN: Fa,
        DIRECTION_HORIZONTAL: la,
        DIRECTION_VERTICAL: ua,
        DIRECTION_ALL: Wa,
        Manager: ba,
        Input: J,
        TouchAction: w,
        TouchInput: X,
        MouseInput: N,
        PointerEventInput: Z,
        TouchMouseInput: fa,
        SingleTouchInput: ea,
        Recognizer: aa,
        AttrRecognizer: O,
        Tap: P,
        Pan: W,
        Swipe: R,
        Pinch: I,
        Rotate: U,
        Press: xa,
        on: r,
        off: n,
        each: f,
        merge: kb,
        extend: Va,
        assign: oa,
        inherit: m,
        bindFn: g,
        prefixed: t
    });
    ("undefined" != typeof a ? a : "undefined" != typeof self ? self : {}).Hammer = S;
    "function" == typeof define && define.amd ? define(function () {
        return S
    }) : "undefined" != typeof module && module.exports ? module.exports = S : a[b] = S
}(window, document, "Hammer");
var CANVAS_WIDTH = 1920, CANVAS_HEIGHT = 1080, EDGEBOARD_X = 240, EDGEBOARD_Y = 140, PRIMARY_FONT = "dimboregular", FONT_COLOR = "#fff", FONT_STROKE = "#660000", FPS = 30, FPS_TIME = 1E3 / FPS, DISABLE_SOUND_MOBILE = !1, ENABLE_FULLSCREEN = !0, SOUNDTRACK_VOLUME_IN_GAME = .5, STATE_LOADING = 0, STATE_MENU = 1, STATE_LEVEL_MENU = 2, STATE_HELP = 3, STATE_GAME = 3, ON_MOUSE_DOWN = 0, ON_MOUSE_UP = 1, ON_MOUSE_OVER = 2, ON_MOUSE_OUT = 3, ON_DRAG_START = 4, ON_DRAG_END = 5, ON_PRESS_DOWN = 6, ON_PRESS_UP = 7, ON_CHAR_COL = 8, ON_PRESS_RESTART = 9, ON_PRESS_HOME = 10, ON_PRESS_EXIT = 11, ON_PRESS_PAUSE = 12, ON_PRESS_AUDIO = 13, ON_PRESS_FULLSCREEN = 14, ON_PRESS_PAUSE_PANEL = 15, ON_PRESS_YES = 16, ON_PRESS_NO = 17, ON_CHARACTER_MOVE = 18, ON_PRESENT_ANIM_TO_CHAR_END = 19, ON_CHAR_MOVEMENT_END = 20, ON_TAP_DOWN = 21, ON_MSG_BOX_CENTER_BUT = 22, MOBILE_SWIPE_CONTROL = !0, TAP_DISTANCE_Y_TOLLERANCE = 80, WIDTH_FIELDS_ROWS = 100, ROW_POS = [350, 460, 585, 700, 860], START_POINT_FIRST_ROW = 350, OFFSET_ROW_OBJECT_Y = [0, 0, 0, 0, 40], STEP_SPEED_INCREASE, MS_STAGE_TRIGGED_EVERY, MS_SPEED_INTERPOLATION_TIME = 500, MAX_OBSTACLES_SCREEN = 5, MAX_PRIZES_SCREEN = 3, MS_RANGE_OBJ_SPAWN_RATE, MS_START_WAIT_SPAWN_OBJ = 500, BG_SKY_RATE_SPEED = .1, BG_HILL_RATE_SPEED = .25, BG_GROUND_RATE_SPEED = 1.5, DISPLAY_SHOCK_X = 50, DISPLAY_SHOCK_Y = 50, OFFSET_CHARACTER_Y = 25, OFFSET_X_CLOSED_ROUTE_OBSTACLE = 300, MS_LERP_SPEED = 1E3, OBJ_OCCURENCE, OFFSET_PLAYER_COL_DIMENSION = {
    x: 100,
    y: 0
}, OFFSET_PLAYER_COL_POINT = {
    x: 150,
    y: 0
}, COMMAND_UP = 0, COMMAND_DOWN = 1, CHAR_STATE_RUN = 0, CHAR_STATE_SWITCH = 1, FIX_X_POS = 350, MS_CHAR_SWITCH_TIME = 200, MS_POWER_UP_TIME = 5E3, MS_SIGNAL_END_POWER_UP = 1E3, OBSTACLE_TYPE = 0, PRIZE_TYPE = 1, POWER_UP_TYPE = 2, WALKER_OBSTACLE_TYPE = 3, DEBUG_LINES_ROWS_ROUTE = !1, DEBUG_CHAR_COLLISION_SHAPE = !1, DEBUG_DEFAULT_COLOR = ["#cc0000", "#00cc00", "#0000cc", "#ffff00", "#800080"], DEBUG_LINES_WIDTH = 14, GAME_STATE_HELP = 0, GAME_STATE_PLAY = 1, GAME_STATE_GAME_OVER = 2, ENABLE_CHECK_ORIENTATION, PROPERTY_OBJECT_5 = {
    framerate: 30,
    frames: [[0, 0, 127, 246, 0, 81, 222.2], [127, 0, 132, 222, 0, 76, 198.2], [259, 0, 121, 235, 0, 76, 222.2], [127, 222, 128, 220, 0, 65, 215.2], [0, 246, 123, 227, 0, 70, 220.2], [380, 0, 121, 226, 0, 62, 217.2], [380, 226, 116, 233, 0, 54, 208.2], [255, 235, 117, 230, 0, 58, 214.2], [372, 459, 126, 211, 0, 58, 186.2], [123, 442, 129, 194, 0, 60, 169.2], [252, 465, 119, 201, 0, 56, 176.2], [0, 473, 119, 201, 0, 56, 176.2], [119, 636, 128, 191, 0, 60, 166.2], [0, 674, 109, 212, 0, 52, 187.2], [247, 666, 109, 207, 0, 52, 182.2], [109, 827, 138, 200, 0, 71, 175.2], [0, 886, 109, 207, 0, 52, 182.2], [356, 670, 147, 181, 0, 67, 156.2], [356, 851, 137, 188, 0, 63, 163.2], [247, 873, 109, 207, 0, 52, 182.2], [109, 1027, 134, 190, 0, 61, 165.2], [0, 1093, 109, 207, 0, 52, 182.2], [356, 1039, 147, 171, 0, 67, 146.2], [243, 1080, 109, 207, 0, 52, 182.2], [109, 1217, 109, 207, 0, 52, 182.2], [352, 1210, 137, 181, 0, 63, 156.2]],
    animations: {
        stay: {
            frames: [13, 10, 12, 25, 22, 20, 8, 6],
            next: "jump"
        },
        jump: {
            frames: [7, 5, 3, 4, 2, 0, 1, 15, 17],
            next: "land"
        },
        land: {
            frames: [18, 9, 11, 14, 16, 19, 21, 23, 24]
        },
        idle: {
            frames: [13],
            next: "idle"
        }
    }
}, OBJECTS_PROPERTIES = [{
    anim: !1,
    type: OBSTACLE_TYPE,
    instance: 3,
    collision_offset: {
        x: -50,
        y: 0
    },
    reg_offset: {
        x: -50,
        y: 50
    }
}, {
    anim: !1,
    type: OBSTACLE_TYPE,
    collision_offset: {
        x: -50,
        y: 0
    },
    instance: 5,
    reg_offset: {
        x: -50,
        y: 30
    }
}, {
    anim: !1,
    type: OBSTACLE_TYPE,
    collision_offset: {
        x: -25,
        y: 0
    },
    instance: 5,
    reg_offset: {
        x: -30,
        y: 40
    }
}, {
    anim: !1,
    type: OBSTACLE_TYPE,
    collision_offset: {
        x: -80,
        y: 0
    },
    instance: 5,
    reg_offset: {
        x: -40,
        y: 20
    }
}, {
    anim: !1,
    type: OBSTACLE_TYPE,
    collision_offset: {
        x: -75,
        y: 0
    },
    instance: 5,
    reg_offset: {
        x: -35,
        y: 20
    }
}, {
    anim: !0,
    reg: {
        x: 4,
        y: 6
    },
    property: PROPERTY_OBJECT_5,
    type: WALKER_OBSTACLE_TYPE,
    start_anim: "stay",
    collision_offset: {
        x: 25,
        y: 0
    },
    speed: 10,
    instance: 1,
    reg_offset: {
        x: 0,
        y: 0
    }
}, {
    anim: !1,
    type: PRIZE_TYPE,
    value: 1,
    collision_offset: {
        x: 75,
        y: 0
    },
    instance: 2,
    reg_offset: {
        x: 0,
        y: 20
    },
    shadowScale: 1
}, {
    anim: !1,
    type: PRIZE_TYPE,
    value: 10,
    collision_offset: {
        x: 70,
        y: 0
    },
    instance: 2,
    reg_offset: {
        x: 0,
        y: 20
    },
    shadowScale: .8
}, {
    anim: !1,
    type: PRIZE_TYPE,
    value: 10,
    collision_offset: {
        x: 70,
        y: 0
    },
    instance: 2,
    reg_offset: {
        x: 0,
        y: 20
    },
    shadowScale: 1
}, {
    anim: !0,
    reg: {
        x: 16,
        y: 1
    },
    animations: {
        loop: [0, 15, "loop"]
    },
    type: POWER_UP_TYPE,
    start_anim: "loop",
    collision_offset: {
        x: 40,
        y: 0
    },
    instance: 1,
    reg_offset: {
        x: 0,
        y: 30
    }
}], PREVIEW_INTERSECTION_WALKER_OBSTACLE = 600, PREVIEW_INTERSECTION_OBSTACLE_OFFSET = 100, SHOW_PRESENT_SPARKLES = !1, TEXT_ARE_SURE = "ARE YOU SURE?", TEXT_GAMEOVER = "GAME OVER", TEXT_POINTS = "PTS: %s", TEXT_SCORE = "SCORE: %s", TEXT_BEST_SCORE = "BEST SCORE: %s", TEXT_PAUSE = "PAUSE", TEXT_AVOID = "AVOID OBSTACLES", TEXT_PRIZES = "COLLECT GIFT PACKS AND POWER UPS", TEXT_POWER_UP = "POWER UP", TEXT_OK = "OK", TEXT_ERR_LS = "YOUR WEB BROWSER DOES NOT SUPPORT LOCAL STORAGE. IF YOU'RE USING SAFARI, IT MAY BE RELATED TO PRIVATE BROWSING. AS A RESULT, SOME INFO MAY NOT BE SAVED OR SOME FEATURES MAY NOT BE AVAILABLE.", TEXT_DEVELOPED = "DEVELOPED BY", TEXT_SHARE_IMAGE = "200x200.jpg", TEXT_SHARE_TITLE = "Congratulations!", TEXT_SHARE_MSG1 = "You collected <strong>", TEXT_SHARE_MSG2 = " points</strong>!<br><br>Share your score with your friends!", TEXT_SHARE_SHARE1 = "My score is ", TEXT_SHARE_SHARE2 = " points! Can you do better";
function CPreloader() {
    var a, d, b, e, h, l, f;
    this._init = function () {
        s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);
        s_oSpriteLibrary.addSprite("bg_menu", "./sprites/bg_menu.jpg");
        s_oSpriteLibrary.addSprite("progress_bar", "./sprites/progress_bar.png");
        s_oSpriteLibrary.loadSprites();
        f = new createjs.Container;
        s_oStage.addChild(f)
    }
        ;
    this.unload = function () {
        f.removeAllChildren()
    }
        ;
    this.hide = function () {
        var q = this;
        setTimeout(function () {
            createjs.Tween.get(l).to({
                alpha: 1
            }, 500).call(function () {
                q.unload();
                s_oMain.gotoMenu()
            })
        }, 1E3)
    }
        ;
    this._onImagesLoaded = function () { }
        ;
    this._onAllImagesLoaded = function () {
        this.attachSprites();
        s_oMain.preloaderReady()
    }
        ;
    this.attachSprites = function () {
        var q = createBitmap(s_oSpriteLibrary.getSprite("bg_menu"));
        f.addChild(q);
        q = s_oSpriteLibrary.getSprite("progress_bar");
        e = createBitmap(q);
        e.x = CANVAS_WIDTH / 2 - q.width / 2;
        e.y = CANVAS_HEIGHT - 220;
        f.addChild(e);
        a = q.width;
        d = q.height;
        h = new createjs.Shape;
        h.graphics.beginFill("rgba(255,255,255,0.01)").drawRect(e.x, e.y, 1, d);
        f.addChild(h);
        e.mask = h;
        b = new createjs.Text("", "30px " + PRIMARY_FONT, "#fff");
        b.x = CANVAS_WIDTH / 2;
        b.y = CANVAS_HEIGHT - 175;
        b.shadow = new createjs.Shadow("#000", 2, 2, 2);
        b.textBaseline = "alphabetic";
        b.textAlign = "center";
        f.addChild(b);
        l = new createjs.Shape;
        l.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        l.alpha = 0;
        f.addChild(l)
    }
        ;
    this.refreshLoader = function (q) {
        b.text = q + "%";
        h.graphics.clear();
        q = Math.floor(q * a / 100);
        h.graphics.beginFill("rgba(255,255,255,0.01)").drawRect(e.x, e.y, q, d)
    }
        ;
    this._init()
}
function CMain(a) {
    var d, b = 0, e = 0, h = STATE_LOADING, l, f;
    this.initContainer = function () {
        s_oCanvas = document.getElementById("canvas");
        s_oStage = new createjs.Stage(s_oCanvas);
        s_oStage.preventSelection = !1;
        createjs.Touch.enable(s_oStage, !0);
        s_bMobile = isMobile();
        !1 === s_bMobile ? (s_oHammer = null,
            s_oStage.enableMouseOver(FPS),
            $("body").on("contextmenu", "#canvas", function (q) {
                return !1
            })) : (s_oHammer = new Hammer(s_oCanvas),
                s_oHammer.get("pinch").set({
                    enable: !1
                }),
                s_oHammer.get("pan").set({
                    enable: !0
                }),
                s_oHammer.get("press").set({
                    enable: !1
                }),
                s_oHammer.get("rotate").set({
                    enable: !1
                }),
                s_oHammer.get("swipe").set({
                    enable: !0
                }),
                s_oHammer.get("tap").set({
                    enable: !1
                }));
        s_iPrevTime = (new Date).getTime();
        createjs.Ticker.addEventListener("tick", this._update);
        createjs.Ticker.framerate = FPS;
        navigator.userAgent.match(/Windows Phone/i) && (DISABLE_SOUND_MOBILE = !0);
        s_oSpriteLibrary = new CSpriteLibrary;
        seekAndDestroy() ? l = new CPreloader : window.location.href = "https://www.sodepsi.com/"
    }
        ;
    this.preloaderReady = function () {
        d = !0;
        s_oMain._loadImages();
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || s_oMain._initSounds()
    }
        ;
    this.soundLoaded = function () {
        b++;
        l.refreshLoader(Math.floor(b / e * 100));
        b === e && s_oMain._onAllResourcesLoaded()
    }
        ;
    this._initSounds = function () {
        Howler.mute(!s_bAudioActive);
        s_aSoundsInfo = [];
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "press_but",
            loop: !1,
            volume: 1,
            ingamename: "press_but"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "game_over",
            loop: !1,
            volume: 1,
            ingamename: "game_over"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "soundtrack",
            loop: !0,
            volume: 1,
            ingamename: "soundtrack"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "prize",
            loop: !1,
            volume: 1,
            ingamename: "prize"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "power_up",
            loop: !1,
            volume: 1,
            ingamename: "power_up"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "bump",
            loop: !1,
            volume: 1,
            ingamename: "bump"
        });
        e += s_aSoundsInfo.length;
        s_aSounds = [];
        for (var q = 0; q < s_aSoundsInfo.length; q++)
            this.tryToLoadSound(s_aSoundsInfo[q], !1)
    }
        ;
    this.tryToLoadSound = function (q, m) {
        setTimeout(function () {
            s_aSounds[q.ingamename] = new Howl({
                src: [q.path + q.filename + ".mp3"],
                autoplay: !1,
                preload: !0,
                loop: q.loop,
                volume: q.volume,
                onload: s_oMain.soundLoaded,
                onloaderror: function (g, x) {
                    for (var r = 0; r < s_aSoundsInfo.length; r++)
                        if (g === s_aSounds[s_aSoundsInfo[r].ingamename]._sounds[0]._id) {
                            s_oMain.tryToLoadSound(s_aSoundsInfo[r], !0);
                            break
                        }
                },
                onplayerror: function (g) {
                    for (var x = 0; x < s_aSoundsInfo.length; x++)
                        if (g === s_aSounds[s_aSoundsInfo[x].ingamename]._sounds[0]._id) {
                            s_aSounds[s_aSoundsInfo[x].ingamename].once("unlock", function () {
                                s_aSounds[s_aSoundsInfo[x].ingamename].play();
                                "soundtrack" === s_aSoundsInfo[x].ingamename && null !== s_oGame && setVolume("soundtrack", SOUNDTRACK_VOLUME_IN_GAME)
                            });
                            break
                        }
                }
            })
        }, m ? 200 : 0)
    }
        ;
    this._loadImages = function () {
        s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);
        s_oSpriteLibrary.addSprite("but_play", "./sprites/but_play.png");
        s_oSpriteLibrary.addSprite("msg_box", "./sprites/msg_box.png");
        s_oSpriteLibrary.addSprite("ctl_logo", "./sprites/ctl_logo.png");
        s_oSpriteLibrary.addSprite("but_credits", "./sprites/but_credits.png");
        s_oSpriteLibrary.addSprite("but_pause", "./sprites/but_pause.png");
        s_oSpriteLibrary.addSprite("but_restart", "./sprites/but_restart.png");
        s_oSpriteLibrary.addSprite("but_home", "./sprites/but_home.png");
        s_oSpriteLibrary.addSprite("but_exit", "./sprites/but_exit.png");
        s_oSpriteLibrary.addSprite("audio_icon", "./sprites/audio_icon.png");
        s_oSpriteLibrary.addSprite("but_fullscreen", "./sprites/but_fullscreen.png");
        s_oSpriteLibrary.addSprite("but_generic", "./sprites/but_generic.png");
        s_oSpriteLibrary.addSprite("bg_menu", "./sprites/bg_menu.jpg");
        s_oSpriteLibrary.addSprite("route", "./sprites/route.jpg");
        s_oSpriteLibrary.addSprite("route_line", "./sprites/route_line.png");
        s_oSpriteLibrary.addSprite("sky", "./sprites/sky.jpg");
        s_oSpriteLibrary.addSprite("ground", "./sprites/ground.png");
        s_oSpriteLibrary.addSprite("trees_hill", "./sprites/trees_hill.png");
        s_oSpriteLibrary.addSprite("logo_menu", "./sprites/logo_menu.png");
        s_oSpriteLibrary.addSprite("score_panel", "./sprites/score_panel.png");
        s_oSpriteLibrary.addSprite("player", "./sprites/player.png");
        s_oSpriteLibrary.addSprite("but_arrow_down", "./sprites/but_arrow_down.png");
        s_oSpriteLibrary.addSprite("but_arrow_up", "./sprites/but_arrow_up.png");
        s_oSpriteLibrary.addSprite("key_up", "./sprites/key_up.png");
        s_oSpriteLibrary.addSprite("hand", "./sprites/hand.png");
        s_oSpriteLibrary.addSprite("swipe", "./sprites/swipe.png");
        s_oSpriteLibrary.addSprite("but_no", "./sprites/but_no.png");
        s_oSpriteLibrary.addSprite("but_yes", "./sprites/but_yes.png");
        s_oSpriteLibrary.addSprite("sparkles", "./sprites/sparkles.png");
        s_oSpriteLibrary.addSprite("present_shadow", "./sprites/present_shadow.png");
        for (var q = 0; q < OBJECTS_PROPERTIES.length; q++)
            s_oSpriteLibrary.addSprite("object_" + q, "./sprites/objects/object_" + q + ".png");
        e += s_oSpriteLibrary.getNumSprites();
        s_oSpriteLibrary.loadSprites()
    }
        ;
    this._onImagesLoaded = function () {
        b++;
        l.refreshLoader(Math.floor(b / e * 100));
        b === e && s_oMain._onAllResourcesLoaded()
    }
        ;
    this._onAllResourcesLoaded = function () {
        l.unload();
        try {
            saveItem("ls_available", "ok")
        } catch (q) {
            s_bStorageAvailable = !1
        }
        s_oSoundTrack = playSound("soundtrack", 1, !0);
        this.gotoMenu()
    }
        ;
    this._onAllImagesLoaded = function () { }
        ;
    this.clearLocalStorage = function () {
        s_iLastLevel = 1;
        s_bStorageAvailable && localStorage.clear()
    }
        ;
    this.gotoMenu = function () {
        new CMenu;
        h = STATE_MENU
    }
        ;
    this.gotoGame = function () {
        f = new CGame;
        h = STATE_GAME
    }
        ;
    this.gotoHelp = function () {
        new CHelp;
        h = STATE_HELP
    }
        ;
    this.stopUpdate = function () {
        d = !1;
        createjs.Ticker.paused = !0;
        $("#block_game").css("display", "block");
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || Howler.mute(!0)
    }
        ;
    this.startUpdate = function () {
        s_iPrevTime = (new Date).getTime();
        d = !0;
        createjs.Ticker.paused = !1;
        $("#block_game").css("display", "none");
        (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) && s_bAudioActive && Howler.mute(!1)
    }
        ;
    this._update = function (q) {
        if (!1 !== d) {
            var m = (new Date).getTime();
            s_iTimeElaps = m - s_iPrevTime;
            s_iCntTime += s_iTimeElaps;
            s_iCntFps++;
            s_iPrevTime = m;
            1E3 <= s_iCntTime && (s_iCurFps = s_iCntFps,
                s_iCntTime -= 1E3,
                s_iCntFps = 0);
            h === STATE_GAME && f.update();
            s_oStage.update(q)
        }
    }
        ;
    s_oMain = this;
    ENABLE_FULLSCREEN = a.fullscreen;
    ENABLE_CHECK_ORIENTATION = a.check_orientation;
    MS_STAGE_TRIGGED_EVERY = a.increase_step_speed_every;
    STEP_SPEED_INCREASE = a.steps_speed;
    MS_RANGE_OBJ_SPAWN_RATE = a.objects_spawn_time;
    OBJ_OCCURENCE = a.objects_occurance;
    s_bAudioActive = a.audio_enable_on_startup;
    this.initContainer()
}
var s_bMobile, s_bAudioActive = !1, s_iCntTime = 0, s_iTimeElaps = 0, s_iPrevTime = 0, s_iCntFps = 0, s_iCurFps = 0, s_bFullscreen = !1, s_oDrawLayer, s_oStage, s_oMain, s_oSpriteLibrary, s_oSoundTrack = null, s_oCanvas, s_iLastLevel = 1, s_bStorageAvailable = !0, s_aSounds, s_aSoundsInfo;
function CTextButton(a, d, b, e, h, l, f, q) {
    var m, g, x, r, n, y, A;
    this._init = function (B, z, t, F, J, C, D) {
        m = [];
        g = [];
        J = createBitmap(t);
        var L = Math.ceil(D / 20);
        n = new createjs.Text(F, D + "px " + PRIMARY_FONT, "#000000");
        n.textAlign = "center";
        n.textBaseline = "alphabetic";
        var G = n.getBounds();
        n.x = t.width / 2 + L;
        n.y = Math.floor(t.height / 2) + G.height / 3 + L;
        r = new createjs.Text(F, D + "px " + PRIMARY_FONT, C);
        r.textAlign = "center";
        r.textBaseline = "alphabetic";
        G = r.getBounds();
        r.x = t.width / 2;
        r.y = Math.floor(t.height / 2) + G.height / 3;
        x = new createjs.Container;
        x.x = B;
        x.y = z;
        x.regX = t.width / 2;
        x.regY = t.height / 2;
        x.addChild(J, n, r);
        u.addChild(x);
        s_bMobile || (x.cursor = "pointer");
        this._initListener()
    }
        ;
    this.unload = function () {
        x.off("mousedown", y);
        x.off("pressup", A);
        u.removeChild(x)
    }
        ;
    this.setVisible = function (B) {
        x.visible = B
    }
        ;
    this._initListener = function () {
        y = x.on("mousedown", this.buttonDown);
        A = x.on("pressup", this.buttonRelease)
    }
        ;
    this.addEventListener = function (B, z, t) {
        m[B] = z;
        g[B] = t
    }
        ;
    this.buttonRelease = function () {
        x.scaleX = 1;
        x.scaleY = 1;
        playSound("press_but", 1, !1);
        m[ON_MOUSE_UP] && m[ON_MOUSE_UP].call(g[ON_MOUSE_UP])
    }
        ;
    this.buttonDown = function () {
        x.scaleX = .9;
        x.scaleY = .9;
        m[ON_MOUSE_DOWN] && m[ON_MOUSE_DOWN].call(g[ON_MOUSE_DOWN])
    }
        ;
    this.changeText = function (B) {
        r.text = B;
        n.text = B
    }
        ;
    this.setTextPosition = function (B) {
        r.y = B;
        n.y = B + 2
    }
        ;
    this.setPosition = function (B, z) {
        x.x = B;
        x.y = z
    }
        ;
    this.setX = function (B) {
        x.x = B
    }
        ;
    this.setY = function (B) {
        x.y = B
    }
        ;
    this.getButtonImage = function () {
        return x
    }
        ;
    this.getX = function () {
        return x.x
    }
        ;
    this.getY = function () {
        return x.y
    }
        ;
    var u = q;
    this._init(a, d, b, e, h, l, f);
    return this
}
function CToggle(a, d, b, e, h) {
    var l, f, q, m, g, x, r;
    this._init = function (n, y, A, u, B) {
        r = void 0 !== B ? B : s_oStage;
        f = [];
        q = [];
        B = new createjs.SpriteSheet({
            images: [A],
            frames: {
                width: A.width / 2,
                height: A.height,
                regX: A.width / 2 / 2,
                regY: A.height / 2
            },
            animations: {
                state_true: [0],
                state_false: [1]
            }
        });
        l = u;
        m = createSprite(B, "state_" + l, A.width / 2 / 2, A.height / 2, A.width / 2, A.height);
        m.x = n;
        m.y = y;
        m.stop();
        s_bMobile || (m.cursor = "pointer");
        r.addChild(m);
        this._initListener()
    }
        ;
    this.unload = function () {
        m.off("mousedown", g);
        m.off("pressup", x);
        r.removeChild(m)
    }
        ;
    this._initListener = function () {
        g = m.on("mousedown", this.buttonDown);
        x = m.on("pressup", this.buttonRelease)
    }
        ;
    this.addEventListener = function (n, y, A) {
        f[n] = y;
        q[n] = A
    }
        ;
    this.setCursorType = function (n) {
        m.cursor = n
    }
        ;
    this.setActive = function (n) {
        l = n;
        m.gotoAndStop("state_" + l)
    }
        ;
    this.buttonRelease = function () {
        m.scaleX = 1;
        m.scaleY = 1;
        playSound("press_but", 1, !1);
        l = !l;
        m.gotoAndStop("state_" + l);
        f[ON_MOUSE_UP] && f[ON_MOUSE_UP].call(q[ON_MOUSE_UP], l)
    }
        ;
    this.buttonDown = function () {
        m.scaleX = .9;
        m.scaleY = .9;
        f[ON_MOUSE_DOWN] && f[ON_MOUSE_DOWN].call(q[ON_MOUSE_DOWN])
    }
        ;
    this.setPosition = function (n, y) {
        m.x = n;
        m.y = y
    }
        ;
    this._init(a, d, b, e, h)
}
function CGfxButton(a, d, b, e) {
    var h, l, f, q, m, g, x, r, n = !1;
    this._init = function (u, B, z) {
        h = [];
        l = [];
        q = [];
        f = createBitmap(z);
        f.x = u;
        f.y = B;
        f.regX = z.width / 2;
        f.regY = z.height / 2;
        g = m = 1;
        s_bMobile || (f.cursor = "pointer");
        y.addChild(f);
        this._initListener()
    }
        ;
    this.unload = function () {
        f.off("mousedown", x);
        f.off("pressup", r);
        y.removeChild(f)
    }
        ;
    this.setVisible = function (u) {
        f.visible = u
    }
        ;
    this.setCursorType = function (u) {
        f.cursor = u
    }
        ;
    this._initListener = function () {
        x = f.on("mousedown", this.buttonDown);
        r = f.on("pressup", this.buttonRelease)
    }
        ;
    this.addEventListener = function (u, B, z) {
        h[u] = B;
        l[u] = z
    }
        ;
    this.addEventListenerWithParams = function (u, B, z, t) {
        h[u] = B;
        l[u] = z;
        q[u] = t
    }
        ;
    this.buttonRelease = function () {
        n || (f.scaleX = 0 < m ? m : -m,
            f.scaleY = g,
            playSound("press_but", 1, !1),
            h[ON_MOUSE_UP] && h[ON_MOUSE_UP].call(l[ON_MOUSE_UP], q[ON_MOUSE_UP]))
    }
        ;
    this.buttonDown = function () {
        n || (f.scaleX = 0 < m ? .9 * m : .9 * -m,
            f.scaleY = .9 * g,
            h[ON_MOUSE_DOWN] && h[ON_MOUSE_DOWN].call(l[ON_MOUSE_DOWN], q[ON_MOUSE_DOWN]))
    }
        ;
    this.rotation = function (u) {
        f.rotation = u
    }
        ;
    this.getButton = function () {
        return f
    }
        ;
    this.setPosition = function (u, B) {
        f.x = u;
        f.y = B
    }
        ;
    this.setX = function (u) {
        f.x = u
    }
        ;
    this.setY = function (u) {
        f.y = u
    }
        ;
    this.getButtonImage = function () {
        return f
    }
        ;
    this.block = function (u) {
        n = u;
        f.scaleX = m;
        f.scaleY = g
    }
        ;
    this.setScaleX = function (u) {
        m = f.scaleX = u
    }
        ;
    this.setScale = function (u) {
        g = m = u;
        f.scaleX = f.scaleY = u
    }
        ;
    this.getX = function () {
        return f.x
    }
        ;
    this.getY = function () {
        return f.y
    }
        ;
    this.pulseAnimation = function () {
        createjs.Tween.get(f).to({
            scaleX: .9 * m,
            scaleY: .9 * g
        }, 850, createjs.Ease.quadOut).to({
            scaleX: m,
            scaleY: g
        }, 650, createjs.Ease.quadIn).call(function () {
            A.pulseAnimation()
        })
    }
        ;
    this.trebleAnimation = function () {
        createjs.Tween.get(f).to({
            rotation: 5
        }, 75, createjs.Ease.quadOut).to({
            rotation: -5
        }, 140, createjs.Ease.quadIn).to({
            rotation: 0
        }, 75, createjs.Ease.quadIn).wait(750).call(function () {
            A.trebleAnimation()
        })
    }
        ;
    this.removeAllTweens = function () {
        createjs.Tween.removeTweens(f)
    }
        ;
    var y = void 0 !== e ? e : s_oStage;
    this._init(a, d, b);
    var A = this;
    return this
}
function CMenu() {
    var a, d, b, e, h, l, f, q, m, g, x, r, n, y, A = null, u = null, B;
    this._init = function () {
        var bg = s_oSpriteLibrary.getSprite("bg_menu");
        m = createBitmap(bg);
        var s = getSpriteScale("bg_menu", bg.width);
        m.scaleX = m.scaleY = s;
        s_oStage.addChild(m);
        var z = s_oSpriteLibrary.getSprite("but_play");
        a = CANVAS_WIDTH / 2;
        d = CANVAS_HEIGHT - z.height / 2 - 10;
        g = new CGfxButton(a, d, z, s_oStage);
        g.addEventListener(ON_MOUSE_UP, this._onButPlayRelease, this);
        g.pulseAnimation();
        z = s_oSpriteLibrary.getSprite("but_credits");
        f = z.height / 2 + 10;
        q = z.height / 2 + 10;
        n = new CGfxButton(CANVAS_WIDTH / 2, CANVAS_HEIGHT - 240, z, s_oStage);
        n.addEventListener(ON_MOUSE_UP, this._onCreditsBut, this);
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile)
            z = s_oSpriteLibrary.getSprite("audio_icon"),
                h = CANVAS_WIDTH - z.height / 2 - 10,
                l = z.height / 2 + 10,
                r = new CToggle(h, l, z, s_bAudioActive, s_oStage),
                r.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
        z = window.document;
        var t = z.documentElement;
        A = t.requestFullscreen || t.mozRequestFullScreen || t.webkitRequestFullScreen || t.msRequestFullscreen;
        u = z.exitFullscreen || z.mozCancelFullScreen || z.webkitExitFullscreen || z.msExitFullscreen;
        !1 === ENABLE_FULLSCREEN && (A = !1);
        A && screenfull.isEnabled && (z = s_oSpriteLibrary.getSprite("but_fullscreen"),
            b = f + z.width / 2 + 10,
            e = z.height / 2 + 10,
            y = new CToggle(b, e, z, s_bFullscreen, s_oStage),
            y.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this));
        z = s_oSpriteLibrary.getSprite("logo_menu");
        B = createBitmap(z);
        B.regX = z.width / 2;
        B.regY = z.height / 2;
        B.x = CANVAS_WIDTH / 2;
        B.y = -B.regY;
        s_oStage.addChild(B);
        x = new createjs.Shape;
        x.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        s_oStage.addChild(x);
        createjs.Tween.get(x).to({
            alpha: 0
        }, 1E3).call(function () {
            x.visible = !1;
            createjs.Tween.get(B).to({
                y: 250
            }, 1E3, createjs.Ease.bounceOut)
        });
        if (!s_bStorageAvailable) {
            var F = new CMsgBox(20, TEXT_ERR_LS, "", TEXT_OK, "");
            F.addEventListener(ON_MSG_BOX_CENTER_BUT, function () {
                F.hide()
            }, this)
        }
        this.refreshButtonPos(s_iOffsetX, s_iOffsetY);
        setVolume("soundtrack", 1)
    }
        ;
    this.unload = function () {
        g.unload();
        g = null;
        x.visible = !1;
        n.unload();
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile)
            r.unload(),
                r = null;
        A && screenfull.isEnabled && y.unload();
        s_oStage.removeChild(m);
        s_oMenu = m = null
    }
        ;
    this.refreshButtonPos = function (z, t) {
        g.setPosition(a, d - t);
        n.setPosition(f + z, t + q);
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || r.setPosition(h - z, t + l);
        A && screenfull.isEnabled && y.setPosition(b + z, e + t)
    }
        ;
    this._onAudioToggle = function () {
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive
    }
        ;
    this._onCreditsBut = function () {
        new CCreditsPanel
    }
        ;
    this._exitFromMenu = function () {
        this.unload();
        s_oMain.gotoGame();
        $(s_oMain).trigger("start_session")
    }
        ;
    this._onButPlayRelease = function () {
        s_oMenu._exitFromMenu()
    }
        ;
    this.resetFullscreenBut = function () {
        y.setActive(s_bFullscreen)
    }
        ;
    this._onFullscreenRelease = function () {
        s_bFullscreen ? u.call(window.document) : A.call(window.document.documentElement);
        sizeHandler()
    }
        ;
    s_oMenu = this;
    this._init()
}
var s_oMenu = null;
function CGame() {
    var a = !1, d, b, e, h, l, f, q, m, g, x, r, n, y, A, u, B, z, t, F, J;
    this._init = function () {
        a = !0;
        b = new createjs.Container;
        s_oStage.addChild(b);
        e = new CRoute(b);
        e.addEventListener(ON_PRESENT_ANIM_TO_CHAR_END, this._onFinishedPrizeAnimation, this);
        f = new CCharacter(FIX_X_POS, e.getRowYByID(0) + OFFSET_CHARACTER_Y, e.getContainerObjs());
        f.changeAnimation("idle");
        f.addEventListener(ON_CHAR_MOVEMENT_END, this._onCharMovementEnd, this);
        h = new CController(s_oStage);
        h.addEventListener(ON_PRESS_DOWN, this._onKeyDown, this, COMMAND_DOWN);
        h.addEventListener(ON_PRESS_UP, this._onKeyDown, this, COMMAND_UP);
        h.addEventListener(ON_TAP_DOWN, this._onTapDown, this);
        h.setInput(!0);
        this.createInterface();
        l = new CCollisionController;
        l.addEventListener(ON_CHAR_COL, this._onCharCollision, this);
        new CTweenController;
        this.createPanels();
        r = new createjs.Shape;
        r.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        r.alpha = 0;
        r.on("mousedown", function () { });
        s_oStage.addChild(r);
        r.visible = !1;
        n = new CEffectText(TEXT_POWER_UP);
        A = GAME_STATE_HELP;
        u = 0;
        z = B = STEP_SPEED_INCREASE[u];
        t = MS_STAGE_TRIGGED_EVERY;
        y = 0
    }
        ;
    this.unload = function () {
        d.unload();
        q.unload();
        g.unload();
        m.unload();
        r.removeAllEventListeners();
        b.removeAllEventListeners();
        createjs.Tween.removeAllTweens();
        s_oStage.removeAllChildren();
        s_oGame = null
    }
        ;
    this.restartGame = function () {
        y = 0;
        d.refreshScore(y);
        r.visible = !0;
        createjs.Tween.get(r).to({
            alpha: 1
        }, 500).call(function () {
            q.hide();
            e.resetPoolObjects();
            f.changeAnimation("idle");
            f.setPlayerIDRow(0);
            f.setPosition(null, e.getRowYByID(0));
            createjs.Tween.get(r).to({
                alpha: 0
            }, 500).call(function () {
                r.visible = !1;
                A = GAME_STATE_PLAY;
                f.changeAnimation("run");
                h.setInput(!0)
            })
        });
        t = MS_STAGE_TRIGGED_EVERY;
        e.setSpawnTimer(MS_START_WAIT_SPAWN_OBJ);
        u = 0;
        z = B = STEP_SPEED_INCREASE[u];
        $(s_oMain).trigger("restart_level", 0)
    }
        ;
    this.createInterface = function () {
        d = new CInterface;
        d.addEventListener(ON_PRESS_EXIT, this._onPressExit, this);
        d.addEventListener(ON_PRESS_PAUSE, this._onPauseButton, this, !0)
    }
        ;
    this.createPanels = function () {
        var C = s_oSpriteLibrary.getSprite("msg_box");
        q = new CEndPanel(C);
        q.addEventListener(ON_PRESS_HOME, this._onPressHome, this);
        q.addEventListener(ON_PRESS_RESTART, this._onPressRestart, this);
        m = new CAreYouSurePanel(C);
        m.addEventListener(ON_PRESS_YES, this._onPressYes, this);
        m.addEventListener(ON_PRESS_NO, this._onPressNo, this);
        g = new CPause;
        g.addEventListener(ON_PRESS_PAUSE_PANEL, this._onPausePanel, this);
        x = new CHelpPanel;
        x.addEventListener(ON_PRESS_YES, this._onPressOk, this)
    }
        ;
    this.gameOver = function () {
        var C = getItem("runner_game_score");
        e.setAllWalkerObjectesAnimation("idle");
        null === C ? (C = y,
            saveItem("runner_game_score", y)) : y >= C && saveItem("runner_game_score", y);
        createjs.Tween.get().wait(500).call(function () {
            q.show(y, C)
        });
        $(s_oMain).trigger("end_level", 0)
    }
        ;
    this._increaseScore = function (C) {
        y += C;
        d.refreshScore(y)
    }
        ;
    this.getState = function () {
        return A
    }
        ;
    this.getStage = function () {
        return u
    }
        ;
    this.onExit = function () {
        $(s_oMain).trigger("end_session");
        this.unload();
        s_oMain.gotoMenu()
    }
        ;
    this._onPressHome = function () {
        this.onExit()
    }
        ;
    this._onPressRestart = function () {
        this.restartGame()
    }
        ;
    this._onPressNo = function () {
        a = !0;
        m.hide();
        f.playAnimation();
        e.playAnimationObjs()
    }
        ;
    this._onPressYes = function () {
        this.onExit()
    }
        ;
    this._onPressOk = function () {
        x.hide();
        A = GAME_STATE_PLAY;
        f.changeAnimation("run");
        $(s_oMain).trigger("start_level", 0)
    }
        ;
    this._onPressExit = function () {
        a = !1;
        m.show();
        f.stopAnimation();
        e.stopAnimationObjs()
    }
        ;
    this._onPauseButton = function () {
        a = !1;
        g.show();
        f.stopAnimation();
        e.stopAnimationObjs()
    }
        ;
    this._onPausePanel = function () {
        a = !0;
        g.hide();
        f.playAnimation();
        e.playAnimationObjs()
    }
        ;
    this._onCharCollision = function (C) {
        C = C.obj2;
        if (C.getType() === PRIZE_TYPE)
            this.onPrizesCollided(C);
        else if (C.getType() === OBSTACLE_TYPE || C.getType() === WALKER_OBSTACLE_TYPE)
            this.onObstacleCollided(C);
        else if (C.getType() === POWER_UP_TYPE)
            this.onPowerUpCollided(C)
    }
        ;
    this._onTapDown = function (C) {
        var D = f.getPos().y;
        C.y < D + TAP_DISTANCE_Y_TOLLERANCE && C.y > D - TAP_DISTANCE_Y_TOLLERANCE || (C.y > D ? this._onKeyDown(COMMAND_DOWN) : this._onKeyDown(COMMAND_UP))
    }
        ;
    this._onKeyDown = function (C) {
        if (A === GAME_STATE_PLAY) {
            var D = f.getIDRow()
                , L = f.getState();
            C === COMMAND_UP ? --D : C === COMMAND_DOWN && (D += 1);
            0 > D || D > ROW_POS.length - 1 || L === CHAR_STATE_SWITCH || L === COMMAND_UP && 0 > D || D === COMMAND_DOWN && D > ROW_POS.length - 1 || (C = e.getRowYByID(D) + OFFSET_CHARACTER_Y + OFFSET_ROW_OBJECT_Y[D],
                f.controlMovement(C, D))
        }
    }
        ;
    this.refreshButtonPos = function (C, D) {
        d.refreshButtonPos(C, D);
        h.refreshButtonPos(C, D)
    }
        ;
    this.checkCollisionCharacterOverObj = function () {
        for (var C = e.getRowObjsByID(f.getIDRow()), D = 0; D < C.length; D++)
            l.checkCollisionPointRect(f, C[D]);
        1 > C.length && f.setCollided(!1)
    }
        ;
    this._onFinishedPrizeAnimation = function (C) {
        playSound("prize", 1, !1);
        this._increaseScore(C.getValue());
        new CScoreText(C.getValue(), C.getPos().x + 50, C.getPos().y - 40)
    }
        ;
    this.onPrizesCollided = function (C) {
        f.startSparklesAnimation();
        e.animationPrize(C, f)
    }
        ;
    this.onPowerUpCollided = function (C) {
        playSound("power_up", 1, !1);
        C.setPosX(-s_iOffsetX - 2 * C.getRectangle().width);
        n.startAnimation();
        f.activePowerUp()
    }
        ;
    this.onObstacleCollided = function (C) {
        e.swapDepthChildren(f.getGraphic(), C.getGraphic());
        if (!f.getPowerUp()) {
            A = GAME_STATE_GAME_OVER;
            f.changeAnimation("fall");
            f.setState(CHAR_STATE_RUN);
            h.setInput(!1);
            new CTremble(b, 150, 5, 5);
            playSound("bump", 1, !1);
            var D = playSound("game_over", 1, !1);
            setVolume("soundtrack", 0);
            D.on("end", function () {
                setVolume("soundtrack", 1);
                D.off("end")
            });
            this.gameOver()
        }
    }
        ;
    this._onCharMovementEnd = function () {
        e.sortDepth()
    }
        ;
    this.checkTimer = function () {
        z >= STEP_SPEED_INCREASE[STEP_SPEED_INCREASE.length - 1] || (t -= s_iTimeElaps,
            0 > t && (u += 1,
                z = STEP_SPEED_INCREASE[u],
                t = MS_STAGE_TRIGGED_EVERY,
                F = J = MS_LERP_SPEED / (z - B)))
    }
        ;
    this.depthCharOnPowerUpMode = function () {
        f.getPowerUp() && e.setObjDepthUpToAll(f.getGraphic())
    }
        ;
    this.lerpSpeed = function () {
        B < z && (F -= s_iTimeElaps,
            0 >= F && (B += 1,
                F = J),
            B > z && (B = z))
    }
        ;
    this.update = function () {
        switch (A) {
            case GAME_STATE_PLAY:
                a && (f.update(),
                    this.checkTimer(),
                    this.lerpSpeed(),
                    e.update(B),
                    this.checkCollisionCharacterOverObj(),
                    this.depthCharOnPowerUpMode())
        }
    }
        ;
    s_oGame = this;
    this._init()
}
var s_oGame = null;
function CInterface() {
    var a, d, b, e, h, l, f, q, m, g, x, r, n, y, A, u, B, z, t = null, F = null, J, C, D;
    this._init = function () {
        z = new createjs.Container;
        s_oStage.addChild(z);
        var L = s_oSpriteLibrary.getSprite("score_panel");
        u = createBitmap(L);
        u.regX = L.width / 2;
        u.regY = L.height / 2;
        a = u.regX + 10;
        d = u.regY + 10;
        z.x = a;
        z.y = d;
        z.addChild(u);
        A = new CTLText(z, -65, -18, 170, 36, 30, "left", FONT_COLOR, PRIMARY_FONT, 1, 2, 2, sprintf(TEXT_POINTS, 0), !0, !0, !1, !1);
        B = new CRollingScore;
        this.refreshScore(0);
        L = s_oSpriteLibrary.getSprite("but_exit");
        m = CANVAS_WIDTH - L.height / 2 - 10;
        g = L.height / 2 + 10;
        r = new CGfxButton(m, g, L, s_oStage);
        r.addEventListenerWithParams(ON_MOUSE_UP, this.triggerEvent, this, ON_PRESS_EXIT);
        f = m - L.width - 10;
        q = g;
        n = new CGfxButton(f, q, s_oSpriteLibrary.getSprite("but_pause"), s_oStage);
        n.addEventListenerWithParams(ON_MOUSE_UP, this.triggerEvent, this, ON_PRESS_PAUSE);
        h = f - L.width - 10;
        l = L.height / 2 + 10;
        !1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile ? (L = s_oSpriteLibrary.getSprite("audio_icon"),
            x = new CToggle(h, l, L, s_bAudioActive, s_oStage),
            x.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this),
            b = h - L.width / 2 - 10) : b = f - L.width - 10;
        e = L.height / 2 + 10;
        L = window.document;
        var G = L.documentElement;
        t = G.requestFullscreen || G.mozRequestFullScreen || G.webkitRequestFullScreen || G.msRequestFullscreen;
        F = L.exitFullscreen || L.mozCancelFullScreen || L.webkitExitFullscreen || L.msExitFullscreen;
        !1 === ENABLE_FULLSCREEN && (t = !1);
        t && screenfull.isEnabled && (L = s_oSpriteLibrary.getSprite("but_fullscreen"),
            y = new CToggle(b, e, L, s_bFullscreen, s_oStage),
            y.addEventListener(ON_MOUSE_UP, this._onFullscreen, this));
        this.refreshButtonPos(s_iOffsetX, s_iOffsetY);
        J = [];
        C = [];
        D = []
    }
        ;
    this.unload = function () {
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile)
            x.unload(),
                x = null;
        r.unload();
        n.unload();
        t && screenfull.isEnabled && y.unload()
    }
        ;
    this._onFullscreen = function () {
        s_bFullscreen ? F.call(window.document) : t.call(window.document.documentElement);
        sizeHandler()
    }
        ;
    this._onAudioToggle = function () {
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive
    }
        ;
    this.refreshButtonPos = function (L, G) {
        r.setPosition(m - L, G + g);
        n.setPosition(f - L, G + q);
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || x.setPosition(h - L, G + l);
        t && screenfull.isEnabled && y.setPosition(b - L, e + G);
        z.x = a + L;
        z.y = d + G
    }
        ;
    this.triggerEvent = function (L) {
        J[L] && J[L].call(C[L], D[L])
    }
        ;
    this.addEventListener = function (L, G, ka, da) {
        J[L] = G;
        C[L] = ka;
        D[L] = da
    }
        ;
    this.refreshScore = function (L) {
        B.rolling(A, null, L)
    }
        ;
    this.resetFullscreenBut = function () {
        y.setActive(s_bFullscreen)
    }
        ;
    this._init();
    s_oInterface = this;
    return this
}
s_oInterface = null;
function CHelpPanel() {
    var a, d, b, e, h, l, f, q, m, g, x, r, n, y, A, u, B;
    this._init = function () {
        A = [];
        u = [];
        B = [];
        b = new createjs.Container;
        b.aplha = 0;
        s_oStage.addChild(b);
        a = new createjs.Shape;
        a.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        a.alpha = .5;
        a.on("mousedown", function () { });
        b.addChild(a);
        e = new createjs.Container;
        b.addChild(e);
        var z = s_oSpriteLibrary.getSprite("msg_box")
            , t = createBitmap(z);
        t.regX = z.width / 2;
        t.regY = z.height / 2;
        t.x = CANVAS_WIDTH / 2 - 26;
        t.y = CANVAS_HEIGHT / 2;
        e.addChild(t);
        h = new createjs.Container;
        e.addChild(h);
        g = m = q = f = null;
        this.attachSprites();
        t = 800;
        var F = 100
            , J = CANVAS_WIDTH / 2
            , C = CANVAS_HEIGHT / 2 - 150;
        (new CTLText(h, J - t / 2, C - F / 2, t, F, 46, "center", FONT_STROKE, PRIMARY_FONT, 1, 2, 2, TEXT_AVOID, !0, !0, !1, !1)).setOutline(3);
        new CTLText(h, J - t / 2, C - F / 2, t, F, 46, "center", "#ffffff", PRIMARY_FONT, 1, 2, 2, TEXT_AVOID, !0, !0, !1, !1);
        l = new createjs.Container;
        e.addChild(l);
        l.alpha = 0;
        t = 600;
        F = 50;
        J = CANVAS_WIDTH / 2;
        C = CANVAS_HEIGHT / 2 - 150;
        (new CTLText(l, J - t / 2, C - F / 2, t, F, 46, "center", FONT_STROKE, PRIMARY_FONT, 1, 2, 2, TEXT_PRIZES, !0, !0, !1, !1)).setOutline(3);
        new CTLText(l, J - t / 2, C - F / 2, t, F, 46, "center", "#ffffff", PRIMARY_FONT, 1, 2, 2, TEXT_PRIZES, !0, !0, !1, !1);
        t = s_oSpriteLibrary.getSprite("but_yes");
        d = new CGfxButton(CANVAS_WIDTH / 2 + z.width / 2 - t.width / 2 - 70, CANVAS_HEIGHT / 2 + z.height / 2 - t.height / 2 - 45, t, e);
        d.addEventListenerWithParams(ON_MOUSE_UP, this.triggerEvent, this, ON_PRESS_YES);
        createjs.Tween.get(b).to({
            alpha: 1
        }, 1E3, createjs.Ease.backOut)
    }
        ;
    this.attachSprites = function () {
        var z = new createjs.Container;
        b.addChild(z);
        z.x = CANVAS_WIDTH / 2;
        z.y = CANVAS_HEIGHT / 2;
        var t = s_oSpriteLibrary.getSprite("object_0");
        x = new CStaticObstacle(z, t, OBJECTS_PROPERTIES[0], 0, 0);
        x.setScale(.6);
        x.getGraphic().alpha = 0;
        x.setPos(220, 0);
        var F = s_oSpriteLibrary.getSprite("object_7");
        n = new CStaticPrize(z, F, OBJECTS_PROPERTIES[7], 1, 7);
        n.setScale(.6);
        n.getGraphic().alpha = 0;
        n.setPos(620, 0);
        n.animationFloating();
        t = new CCharacter(0, 0, z);
        t.changeAnimation("run");
        t.setScale(.6);
        F = s_oSpriteLibrary.getSprite("object_2");
        r = new CStaticObstacle(z, F, OBJECTS_PROPERTIES[2], 2, 2);
        r.setScale(.6);
        r.getGraphic().alpha = 0;
        r.setPos(420, 100);
        s_bMobile ? (F = s_oSpriteLibrary.getSprite("swipe"),
            g = createBitmap(F),
            g.regX = .5 * F.width,
            g.regY = .5 * F.height,
            g.x = 0,
            g.rotation = 90,
            g.alpha = 0,
            z.addChild(g),
            F = s_oSpriteLibrary.getSprite("hand"),
            m = createBitmap(F),
            m.regX = .5 * F.width,
            m.regY = .5 * F.height,
            m.x = 0,
            y = m.y = 200,
            z.addChild(m)) : (F = s_oSpriteLibrary.getSprite("key_up"),
                f = createBitmap(F),
                f.regX = F.width / 2,
                f.regY = F.height / 2,
                f.x = -80,
                f.y = 180,
                z.addChild(f),
                q = createBitmap(F),
                q.regX = F.width / 2,
                q.regY = F.height / 2,
                q.x = 80,
                q.y = f.y,
                q.rotation = 180,
                z.addChild(q));
        this.animationLoop(x.getGraphic(), n, r.getGraphic(), t)
    }
        ;
    this.animationLoop = function (z, t, F, J) {
        var C = this
            , D = t.getGraphic();
        z.x = 220;
        z.y = 0;
        D.x = 220;
        D.y = 0;
        D.alpha = 0;
        F.x = 220;
        F.y = 100;
        t.setScale(.6);
        createjs.Tween.get(z).to({
            alpha: 1
        }, 250);
        createjs.Tween.get(J).wait(300).call(function () {
            C.inputAnimation(COMMAND_DOWN);
            J.controlMovement(100, 1)
        });
        createjs.Tween.get(z).to({
            x: -20
        }, 1E3).call(function () {
            createjs.Tween.get(z).to({
                x: -220,
                alpha: 0
            }, 750);
            createjs.Tween.get(F).to({
                alpha: 1
            }, 250);
            createjs.Tween.get(J).wait(300).call(function () {
                C.inputAnimation(COMMAND_UP);
                J.controlMovement(0, 1)
            });
            F.x = 220;
            createjs.Tween.get(F).to({
                x: -20
            }, 1E3).call(function () {
                createjs.Tween.get(F).to({
                    x: -220,
                    alpha: 0
                }, 750);
                createjs.Tween.get(h).to({
                    alpha: 0
                }, 250);
                createjs.Tween.get(l).to({
                    alpha: 1
                }, 300).call(function () {
                    createjs.Tween.get(D).to({
                        alpha: 1
                    }, 250);
                    createjs.Tween.get(D).to({
                        x: 80
                    }, 700).call(function () {
                        t.animToCharacter(J);
                        createjs.Tween.get(t).wait(250).call(function () {
                            createjs.Tween.get(l).to({
                                alpha: 0
                            }, 250);
                            createjs.Tween.get(h).to({
                                alpha: 1
                            }, 250);
                            C.animationLoop(z, t, F, J)
                        })
                    })
                })
            })
        })
    }
        ;
    this.inputAnimation = function (z) {
        switch (z) {
            case COMMAND_DOWN:
                s_bMobile ? (g.y = y - 30,
                    g.rotation = 90,
                    createjs.Tween.get(g, {
                        override: !0
                    }).wait(200).to({
                        alpha: 1
                    }, 200, createjs.Ease.circOut).to({
                        alpha: 0
                    }, 200, createjs.Ease.circOut),
                    createjs.Tween.get(m).to({
                        y: y + 80
                    }, 300, createjs.Ease.sineOut).to({
                        y: y
                    }, 400, createjs.Ease.sineOut)) : createjs.Tween.get(q).to({
                        scaleX: .8,
                        scaleY: .8
                    }, 200).to({
                        scaleX: 1,
                        scaleY: 1
                    }, 200);
                break;
            case COMMAND_UP:
                s_bMobile ? (g.y = y - 30,
                    g.rotation = -90,
                    createjs.Tween.get(g, {
                        override: !0
                    }).wait(200).to({
                        alpha: 1
                    }, 200, createjs.Ease.cubicOut).to({
                        alpha: 0
                    }, 200, createjs.Ease.cubicOut),
                    createjs.Tween.get(m).to({
                        y: y - 80
                    }, 300, createjs.Ease.sineOut).to({
                        y: y
                    }, 400, createjs.Ease.sineOut)) : createjs.Tween.get(f).to({
                        scaleX: .8,
                        scaleY: .8
                    }, 200).to({
                        scaleX: 1,
                        scaleY: 1
                    }, 200)
        }
    }
        ;
    this.hide = function () {
        this.unload()
    }
        ;
    this.triggerEvent = function (z) {
        A[z] && A[z].call(u[z], B[z])
    }
        ;
    this.addEventListener = function (z, t, F, J) {
        A[z] = t;
        u[z] = F;
        B[z] = J
    }
        ;
    this.unload = function () {
        createjs.Tween.removeTweens(x.getGraphic());
        createjs.Tween.removeTweens(r.getGraphic());
        createjs.Tween.removeTweens(n.getGraphic());
        n.unload();
        a.removeAllEventListeners();
        s_oStage.removeChild(b)
    }
        ;
    this._init()
}
function CCreditsPanel() {
    var a, d, b, e, h, l, f;
    this._init = function () {
        e = new createjs.Shape;
        e.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        e.alpha = 0;
        e.on("mousedown", function () { });
        s_oStage.addChild(e);
        (new createjs.Tween.get(e)).to({
            alpha: .7
        }, 500);
        h = new createjs.Container;
        s_oStage.addChild(h);
        var q = s_oSpriteLibrary.getSprite("msg_box")
            , m = createBitmap(q);
        m.x = -26;
        m.y = 0;
        m.regX = q.width / 2;
        m.regY = q.height / 2;
        h.addChild(m);
        h.x = CANVAS_WIDTH / 2;
        h.y = CANVAS_HEIGHT + q.height / 2;
        a = h.y;
        (new createjs.Tween.get(h)).to({
            y: CANVAS_HEIGHT / 2 - 40
        }, 500, createjs.Ease.quartIn);
        var g = q.width - 100;
        q = -q.height / 2 + 250;
        (new CTLText(h, -(g / 2), q - 21, g, 42, 40, "center", FONT_STROKE, PRIMARY_FONT, 1, 2, 2, TEXT_DEVELOPED, !0, !0, !1, !1)).setOutline(2);
        new CTLText(h, -(g / 2), q - 21, g, 42, 40, "center", FONT_COLOR, PRIMARY_FONT, 1, 2, 2, TEXT_DEVELOPED, !0, !0, !1, !1);
        q = 114;
        (new CTLText(h, -(g / 2), q - 21, g, 42, 32, "center", FONT_STROKE, PRIMARY_FONT, 1, 2, 2, "Sodepsi AD", !0, !0, !1, !1)).setOutline(2);
        new CTLText(h, -(g / 2), q - 21, g, 42, 32, "center", FONT_COLOR, PRIMARY_FONT, 1, 2, 2, "Sodepsi AD", !0, !0, !1, !1);
        q = s_oSpriteLibrary.getSprite("ctl_logo");
        f = createBitmap(q);
        d = f.on("click", this._onLogoButRelease);
        f.regX = q.width / 2;
        f.regY = q.height / 2;
        f.y = 40;
        h.addChild(f);
        b = new createjs.Shape;
        b.graphics.beginFill("#0f0f0f").drawRect(-CANVAS_WIDTH / 2, -CANVAS_HEIGHT / 2, CANVAS_WIDTH, CANVAS_HEIGHT);
        b.alpha = .01;
        d = b.on("click", this._onLogoButRelease);
        h.addChild(b);
        q = s_oSpriteLibrary.getSprite("but_exit");
        l = new CGfxButton(m.x - m.regX + 140, m.y - m.regY + 155, q, h);
        l.addEventListener(ON_MOUSE_UP, this.unload, this)
    }
        ;
    this.unload = function () {
        b.off("click", d);
        l.block();
        (new createjs.Tween.get(e)).to({
            alpha: 0
        }, 500);
        (new createjs.Tween.get(h)).to({
            y: a
        }, 400, createjs.Ease.backIn).call(function () {
            s_oStage.removeChild(e);
            s_oStage.removeChild(h);
            l.unload()
        });
        e.removeAllEventListeners();
        f.removeAllEventListeners()
    }
        ;
    this._onLogoButRelease = function () {
        window.open("https://www.sodepsi.com/")
    }
        ;
    this._init()
}
function CAreYouSurePanel() {
    var a, d, b, e, h, l, f, q, m;
    this._init = function () {
        h = new createjs.Shape;
        h.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        h.on("click", function () { });
        h.visible = !1;
        l = new createjs.Container;
        s_oStage.addChild(h, l);
        var g = s_oSpriteLibrary.getSprite("msg_box")
            , x = createBitmap(g);
        x.regX = g.width / 2;
        x.regY = g.height / 2;
        x.x = -20;
        l.addChild(x);
        l.x = CANVAS_WIDTH / 2;
        l.y = CANVAS_HEIGHT + g.height / 2;
        a = l.x;
        d = l.y;
        x = g.width - 100;
        g = -g.height / 2 + 200;
        (new CTLText(l, -(x / 2), g - 30, x, 60, 54, "center", FONT_STROKE, PRIMARY_FONT, 1, 2, 2, TEXT_ARE_SURE, !0, !0, !1, !1)).setOutline(5);
        new CTLText(l, -(x / 2), g - 30, x, 60, 54, "center", FONT_COLOR, PRIMARY_FONT, 1, 2, 2, TEXT_ARE_SURE, !0, !0, !1, !1);
        b = new CGfxButton(160, 100, s_oSpriteLibrary.getSprite("but_yes"), l);
        b.addEventListenerWithParams(ON_MOUSE_UP, this.triggerEvent, this, ON_PRESS_YES);
        e = new CGfxButton(-160, 100, s_oSpriteLibrary.getSprite("but_no"), l);
        e.addEventListenerWithParams(ON_MOUSE_UP, this.triggerEvent, this, ON_PRESS_NO);
        e.pulseAnimation();
        f = [];
        q = [];
        m = []
    }
        ;
    this.show = function () {
        h.alpha = 0;
        l.x = a;
        l.y = d;
        h.visible = !0;
        l.visible = !0;
        createjs.Tween.get(l).to({
            y: CANVAS_HEIGHT / 2 - 40
        }, 500, createjs.Ease.quartIn);
        createjs.Tween.get(h).to({
            alpha: .7
        }, 500)
    }
        ;
    this.hide = function () {
        h.visible = !1;
        l.visible = !1
    }
        ;
    this.triggerEvent = function (g) {
        f[g] && f[g].call(q[g], m[g])
    }
        ;
    this.addEventListener = function (g, x, r, n) {
        f[g] = x;
        q[g] = r;
        m[g] = n
    }
        ;
    this.unload = function () {
        e.unload();
        b.unload();
        s_oStage.removeChild(h);
        s_oStage.removeChild(l);
        h.removeAllEventListeners()
    }
        ;
    this._init()
}
function CEndPanel(a) {
    var d, b, e, h, l, f, q, m, g, x, r, n, y, A;
    this._init = function (u) {
        b = new createjs.Container;
        b.alpha = 0;
        b.visible = !1;
        s_oStage.addChild(b);
        r = new createjs.Shape;
        r.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        r.alpha = .7;
        r.on("mousedown", function () { });
        b.addChild(r);
        d = createBitmap(u);
        d.x = CANVAS_WIDTH / 2 - 26;
        d.y = CANVAS_HEIGHT / 2;
        d.regX = u.width / 2;
        d.regY = u.height / 2;
        b.addChild(d);
        u = 400;
        var B = 70
            , z = CANVAS_WIDTH / 2
            , t = CANVAS_HEIGHT / 2 - 130;
        e = new CTLText(b, z - u / 2, t - B / 2, u, B, 60, "center", FONT_STROKE, PRIMARY_FONT, 1, 2, 2, TEXT_GAMEOVER, !0, !0, !1, !1);
        e.setOutline(5);
        h = new CTLText(b, z - u / 2, t - B / 2, u, B, 60, "center", FONT_COLOR, PRIMARY_FONT, 1, 2, 2, TEXT_GAMEOVER, !0, !0, !1, !1);
        u = 350;
        B = 60;
        z = CANVAS_WIDTH / 2;
        t = h.getY() + 130;
        l = new CTLText(b, z - u / 2, t - B / 2, u, B, 50, "center", FONT_STROKE, PRIMARY_FONT, 1, 2, 2, " ", !0, !0, !1, !1);
        l.setOutline(3);
        f = new CTLText(b, z - u / 2, t - B / 2, u, B, 50, "center", FONT_COLOR, PRIMARY_FONT, 1, 2, 2, " ", !0, !0, !1, !1);
        u = 350;
        B = 50;
        z = CANVAS_WIDTH / 2;
        t = f.getY() + 100;
        q = new CTLText(b, z - u / 2, t - B / 2, u, B, 40, "center", FONT_STROKE, PRIMARY_FONT, 1, 2, 2, " ", !0, !0, !1, !1);
        q.setOutline(3);
        m = new CTLText(b, z - u / 2, t - B / 2, u, B, 40, "center", FONT_COLOR, PRIMARY_FONT, 1, 2, 2, " ", !0, !0, !1, !1);
        g = new CGfxButton(CANVAS_WIDTH / 2 + 110, CANVAS_HEIGHT / 2 + 170, s_oSpriteLibrary.getSprite("but_restart"), b);
        g.addEventListenerWithParams(ON_MOUSE_UP, this.triggerEvent, this, ON_PRESS_RESTART);
        g.pulseAnimation();
        x = new CGfxButton(CANVAS_WIDTH / 2 - 110, CANVAS_HEIGHT / 2 + 170, s_oSpriteLibrary.getSprite("but_home"), b);
        x.addEventListenerWithParams(ON_MOUSE_UP, this.triggerEvent, this, ON_PRESS_HOME);
        n = [];
        y = [];
        A = []
    }
        ;
    this.unload = function () {
        r.removeAllEventListeners();
        x.unload();
        g.unload();
        s_oStage.removeChild(b)
    }
        ;
    this.hide = function () {
        b.visible = !1;
        b.aplha = 0;
        createjs.Tween.removeTweens(b)
    }
        ;
    this.show = function (u, B) {
        l.refreshText(sprintf(TEXT_SCORE, u));
        f.refreshText(sprintf(TEXT_SCORE, u));
        q.refreshText(sprintf(TEXT_BEST_SCORE, B));
        m.refreshText(sprintf(TEXT_BEST_SCORE, B));
        b.visible = !0;
        createjs.Tween.get(b).wait(500).to({
            alpha: 1
        }, 500);
        $(s_oMain).trigger("save_score", u);
        $(s_oMain).trigger("show_interlevel_ad");
        var z = "You collected <strong>" + u + " points</strong>!<br><br>Share your score with your friends!"
            , t = "My score is " + u + " points! Can you do better?";
        $(s_oMain).trigger("share_event", u, "200x200.jpg", "Congratulations!", z, t)
    }
        ;
    this.triggerEvent = function (u) {
        n[u] && n[u].call(y[u], A[u])
    }
        ;
    this.addEventListener = function (u, B, z, t) {
        n[u] = B;
        y[u] = z;
        A[u] = t
    }
        ;
    this._init(a);
    return this
}
function CMsgBox(a, d, b, e, h) {
    var l, f, q, m, g, x, r, n;
    this._init = function (y, A, u, B, z) {
        l = [];
        f = [];
        n = new createjs.Container;
        s_oStage.addChild(n);
        var t = new createjs.Shape;
        t.graphics.beginFill("rgba(0,0,0,0.7)").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        t.on("mousedown", function () { });
        n.addChild(t);
        t = s_oSpriteLibrary.getSprite("msg_box");
        var F = createBitmap(t);
        F.regX = t.width / 2;
        F.regY = t.height / 2;
        F.x = CANVAS_WIDTH / 2 - 20;
        F.y = CANVAS_HEIGHT / 2;
        n.addChild(F);
        t = t.width - 130;
        F = CANVAS_WIDTH / 2;
        m = new CTLText(n, F - t / 2, 340, t, 180, y, "center", FONT_STROKE, PRIMARY_FONT, 1.2, 2, 2, " ", !0, !0, !0, !1);
        m.setOutline(3);
        q = new CTLText(n, F - t / 2, 340, t, 180, y, "center", FONT_COLOR, PRIMARY_FONT, 1.2, 2, 2, " ", !0, !0, !0, !1);
        g = new CTextButton(CANVAS_WIDTH / 2 - 100, CANVAS_HEIGHT - 370, s_oSpriteLibrary.getSprite("but_generic"), "LEFT", PRIMARY_FONT, "#ffffff", 30, n);
        g.addEventListener(ON_MOUSE_UP, this._onButLeftDownRelease, this);
        x = new CTextButton(CANVAS_WIDTH / 2, CANVAS_HEIGHT - 370, s_oSpriteLibrary.getSprite("but_generic"), "CENTER", PRIMARY_FONT, "#ffffff", 30, n);
        x.addEventListener(ON_MOUSE_UP, this._onButCenterDownRelease, this);
        r = new CTextButton(CANVAS_WIDTH / 2 + 90, CANVAS_HEIGHT - 370, s_oSpriteLibrary.getSprite("but_generic"), "LEFT", PRIMARY_FONT, "#ffffff", 30, n);
        r.addEventListener(ON_MOUSE_UP, this._onButRightDownRelease, this);
        this.show(A, u, B, z)
    }
        ;
    this.show = function (y, A, u, B) {
        q.refreshText(y);
        m.refreshText(y);
        "" !== A ? (g.changeText(A),
            g.setVisible(!0)) : g.setVisible(!1);
        "" !== u ? (x.changeText(u),
            x.setVisible(!0)) : x.setVisible(!1);
        "" !== B ? (r.changeText(B),
            r.setVisible(!0)) : r.setVisible(!1)
    }
        ;
    this.hide = function () {
        this.unload();
        s_oStage.removeChild(n)
    }
        ;
    this.unload = function () {
        g.unload();
        x.unload();
        r.unload()
    }
        ;
    this.addEventListener = function (y, A, u) {
        l[y] = A;
        f[y] = u
    }
        ;
    this._onButLeftDownRelease = function () {
        l[ON_MSG_BOX_LEFT_BUT] && (l[ON_MSG_BOX_LEFT_BUT].call(f[ON_MSG_BOX_LEFT_BUT]),
            n.visible = !1)
    }
        ;
    this._onButCenterDownRelease = function () {
        l[ON_MSG_BOX_CENTER_BUT] && (l[ON_MSG_BOX_CENTER_BUT].call(f[ON_MSG_BOX_CENTER_BUT]),
            n.visible = !1)
    }
        ;
    this._onButRightDownRelease = function () {
        l[ON_MSG_BOX_RIGHT_BUT] && (l[ON_MSG_BOX_RIGHT_BUT].call(f[ON_MSG_BOX_RIGHT_BUT]),
            n.visible = !1)
    }
        ;
    this._init(a, d, b, e, h)
}
function CPause() {
    var a, d, b, e, h;
    this._init = function () {
        d = new createjs.Container;
        d.visible = !1;
        d.on("click", this.triggerEvent, null, !1, ON_PRESS_PAUSE_PANEL);
        s_oStage.addChild(d);
        a = new createjs.Shape;
        a.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        a.alpha = .5;
        d.addChild(a);
        var l = new createjs.Text(TEXT_PAUSE, " 70px " + PRIMARY_FONT, FONT_STROKE);
        l.x = CANVAS_WIDTH / 2;
        l.y = CANVAS_HEIGHT / 2;
        l.textAlign = "center";
        l.textBaseline = "alphabetic";
        l.outline = 4;
        d.addChild(l);
        l = new createjs.Text(TEXT_PAUSE, " 70px " + PRIMARY_FONT, FONT_COLOR);
        l.x = CANVAS_WIDTH / 2;
        l.y = CANVAS_HEIGHT / 2;
        l.textAlign = "center";
        l.textBaseline = "alphabetic";
        d.addChild(l);
        b = [];
        e = [];
        h = []
    }
        ;
    this.show = function () {
        d.alpha = 0;
        d.visible = !0;
        createjs.Tween.get(d).to({
            alpha: 1
        }, 600)
    }
        ;
    this.unload = function () {
        d.removeAllEventListeners();
        a.removeAllEventListeners()
    }
        ;
    this.hide = function () {
        d.visible = !1
    }
        ;
    this.triggerEvent = function (l, f) {
        b[f] && b[f].call(e[f], h[f])
    }
        ;
    this.addEventListener = function (l, f, q, m) {
        b[l] = f;
        e[l] = q;
        h[l] = m
    }
        ;
    this._init()
}
CTLText.prototype = {
    constructor: CTLText,
    __autofit: function () {
        if (this._bFitText) {
            for (var a = this._iFontSize; (this._oText.getBounds().height > this._iHeight - 2 * this._iPaddingV || this._oText.getBounds().width > this._iWidth - 2 * this._iPaddingH) && !(a--,
                this._oText.font = a + "px " + this._szFont,
                this._oText.lineHeight = Math.round(a * this._fLineHeightFactor),
                this.__updateY(),
                this.__verticalAlign(),
                8 > a);)
                ;
            this._iFontSize = a
        }
    },
    __verticalAlign: function () {
        if (this._bVerticalAlign) {
            var a = this._oText.getBounds().height;
            this._oText.y -= (a - this._iHeight) / 2 + this._iPaddingV
        }
    },
    __updateY: function () {
        this._oText.y = this._y + this._iPaddingV;
        switch (this._oText.textBaseline) {
            case "middle":
                this._oText.y += this._oText.lineHeight / 2 + (this._iFontSize * this._fLineHeightFactor - this._iFontSize)
        }
    },
    __createText: function (a) {
        this._bDebug && (this._oDebugShape = new createjs.Shape,
            this._oDebugShape.graphics.beginFill("rgba(255,0,0,0.5)").drawRect(this._x, this._y, this._iWidth, this._iHeight),
            this._oContainer.addChild(this._oDebugShape));
        this._oText = new createjs.Text(a, this._iFontSize + "px " + this._szFont, this._szColor);
        this._oText.textBaseline = "middle";
        this._oText.lineHeight = Math.round(this._iFontSize * this._fLineHeightFactor);
        this._oText.textAlign = this._szAlign;
        this._oText.lineWidth = this._bMultiline ? this._iWidth - 2 * this._iPaddingH : null;
        switch (this._szAlign) {
            case "center":
                this._oText.x = this._x + this._iWidth / 2;
                break;
            case "left":
                this._oText.x = this._x + this._iPaddingH;
                break;
            case "right":
                this._oText.x = this._x + this._iWidth - this._iPaddingH
        }
        this._oContainer.addChild(this._oText);
        this.refreshText(a)
    },
    setVerticalAlign: function (a) {
        this._bVerticalAlign = a
    },
    setVisible: function (a) {
        this._oText.visible = a
    },
    setOutline: function (a) {
        null !== this._oText && (this._oText.outline = a)
    },
    setShadow: function (a, d, b, e) {
        null !== this._oText && (this._oText.shadow = new createjs.Shadow(a, d, b, e))
    },
    setColor: function (a) {
        this._oText.color = a
    },
    setAlpha: function (a) {
        this._oText.alpha = a
    },
    setY: function (a) {
        this._y = this._oText.y = a;
        this.updateDebug()
    },
    setX: function (a) {
        this._x = this._oText.x = a;
        this.updateDebug()
    },
    updateDebug: function () {
        this._bDebug && (this._oDebugShape.graphics.command.x = this._x,
            this._oDebugShape.graphics.command.y = this._y)
    },
    removeTweens: function () {
        createjs.Tween.removeTweens(this._oText)
    },
    getText: function () {
        return this._oText
    },
    getX: function () {
        return this._x
    },
    getY: function () {
        return this._y
    },
    getFontSize: function () {
        return this._iFontSize
    },
    getBounds: function () {
        return this._oText.getBounds()
    },
    refreshText: function (a) {
        "" === a && (a = " ");
        null === this._oText && this.__createText(a);
        this._oText.text = a;
        this._oText.font = this._iFontSize + "px " + this._szFont;
        this._oText.lineHeight = Math.round(this._iFontSize * this._fLineHeightFactor);
        this.__autofit();
        this.__updateY();
        this.__verticalAlign()
    }
};
function CTLText(a, d, b, e, h, l, f, q, m, g, x, r, n, y, A, u, B) {
    this._oContainer = a;
    this._x = d;
    this._y = b;
    this._iWidth = e;
    this._iHeight = h;
    this._bMultiline = u;
    this._iFontSize = l;
    this._szAlign = f;
    this._szColor = q;
    this._szFont = m;
    this._iPaddingH = x;
    this._iPaddingV = r;
    this._bVerticalAlign = A;
    this._bFitText = y;
    this._bDebug = B;
    this._oDebugShape = null;
    this._fLineHeightFactor = g;
    this._oText = null;
    n && this.__createText(n)
}
!function () {
    function a(h) {
        var l = h;
        if (e[l])
            l = e[l];
        else {
            for (var f = l, q, m = [], g = 0; f;) {
                if (null !== (q = b.text.exec(f)))
                    m.push(q[0]);
                else if (null !== (q = b.modulo.exec(f)))
                    m.push("%");
                else if (null !== (q = b.placeholder.exec(f))) {
                    if (q[2]) {
                        g |= 1;
                        var x = [], r = q[2], n;
                        if (null !== (n = b.key.exec(r)))
                            for (x.push(n[1]); "" !== (r = r.substring(n[0].length));)
                                if (null !== (n = b.key_access.exec(r)))
                                    x.push(n[1]);
                                else if (null !== (n = b.index_access.exec(r)))
                                    x.push(n[1]);
                                else
                                    throw new SyntaxError("[sprintf] failed to parse named argument key");
                        else
                            throw new SyntaxError("[sprintf] failed to parse named argument key");
                        q[2] = x
                    } else
                        g |= 2;
                    if (3 === g)
                        throw Error("[sprintf] mixing positional and named placeholders is not (yet) supported");
                    m.push({
                        placeholder: q[0],
                        param_no: q[1],
                        keys: q[2],
                        sign: q[3],
                        pad_char: q[4],
                        align: q[5],
                        width: q[6],
                        precision: q[7],
                        type: q[8]
                    })
                } else
                    throw new SyntaxError("[sprintf] unexpected placeholder");
                f = f.substring(q[0].length)
            }
            l = e[l] = m
        }
        f = arguments;
        q = 1;
        m = l.length;
        x = "";
        var y, A;
        for (r = 0; r < m; r++)
            if ("string" === typeof l[r])
                x += l[r];
            else if ("object" === typeof l[r]) {
                n = l[r];
                if (n.keys)
                    for (g = f[q],
                        y = 0; y < n.keys.length; y++) {
                        if (void 0 == g)
                            throw Error(a('[sprintf] Cannot access property "%s" of undefined value "%s"', n.keys[y], n.keys[y - 1]));
                        g = g[n.keys[y]]
                    }
                else
                    g = n.param_no ? f[n.param_no] : f[q++];
                b.not_type.test(n.type) && b.not_primitive.test(n.type) && g instanceof Function && (g = g());
                if (b.numeric_arg.test(n.type) && "number" !== typeof g && isNaN(g))
                    throw new TypeError(a("[sprintf] expecting number but found %T", g));
                b.number.test(n.type) && (A = 0 <= g);
                switch (n.type) {
                    case "b":
                        g = parseInt(g, 10).toString(2);
                        break;
                    case "c":
                        g = String.fromCharCode(parseInt(g, 10));
                        break;
                    case "d":
                    case "i":
                        g = parseInt(g, 10);
                        break;
                    case "j":
                        g = JSON.stringify(g, null, n.width ? parseInt(n.width) : 0);
                        break;
                    case "e":
                        g = n.precision ? parseFloat(g).toExponential(n.precision) : parseFloat(g).toExponential();
                        break;
                    case "f":
                        g = n.precision ? parseFloat(g).toFixed(n.precision) : parseFloat(g);
                        break;
                    case "g":
                        g = n.precision ? String(Number(g.toPrecision(n.precision))) : parseFloat(g);
                        break;
                    case "o":
                        g = (parseInt(g, 10) >>> 0).toString(8);
                        break;
                    case "s":
                        g = String(g);
                        g = n.precision ? g.substring(0, n.precision) : g;
                        break;
                    case "t":
                        g = String(!!g);
                        g = n.precision ? g.substring(0, n.precision) : g;
                        break;
                    case "T":
                        g = Object.prototype.toString.call(g).slice(8, -1).toLowerCase();
                        g = n.precision ? g.substring(0, n.precision) : g;
                        break;
                    case "u":
                        g = parseInt(g, 10) >>> 0;
                        break;
                    case "v":
                        g = g.valueOf();
                        g = n.precision ? g.substring(0, n.precision) : g;
                        break;
                    case "x":
                        g = (parseInt(g, 10) >>> 0).toString(16);
                        break;
                    case "X":
                        g = (parseInt(g, 10) >>> 0).toString(16).toUpperCase()
                }
                if (b.json.test(n.type))
                    x += g;
                else {
                    if (!b.number.test(n.type) || A && !n.sign)
                        var u = "";
                    else
                        u = A ? "+" : "-",
                            g = g.toString().replace(b.sign, "");
                    y = n.pad_char ? "0" === n.pad_char ? "0" : n.pad_char.charAt(1) : " ";
                    var B = n.width - (u + g).length;
                    B = n.width ? 0 < B ? y.repeat(B) : "" : "";
                    x += n.align ? u + g + B : "0" === y ? u + B + g : B + u + g
                }
            }
        return x
    }
    function d(h, l) {
        return a.apply(null, [h].concat(l || []))
    }
    var b = {
        not_string: /[^s]/,
        not_bool: /[^t]/,
        not_type: /[^T]/,
        not_primitive: /[^v]/,
        number: /[diefg]/,
        numeric_arg: /[bcdiefguxX]/,
        json: /[j]/,
        not_json: /[^j]/,
        text: /^[^\x25]+/,
        modulo: /^\x25{2}/,
        placeholder: /^\x25(?:([1-9]\d*)\$|\(([^)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-gijostTuvxX])/,
        key: /^([a-z_][a-z_\d]*)/i,
        key_access: /^\.([a-z_][a-z_\d]*)/i,
        index_access: /^\[(\d+)\]/,
        sign: /^[+-]/
    }
        , e = Object.create(null);
    "undefined" !== typeof exports && (exports.sprintf = a,
        exports.vsprintf = d);
    "undefined" !== typeof window && (window.sprintf = a,
        window.vsprintf = d,
        "function" === typeof define && define.amd && define(function () {
            return {
                sprintf: a,
                vsprintf: d
            }
        }))
}();
function CRoute(a) {
    var d, b, e, h, l, f, q, m, g, x;
    this._init = function (r) {
        b = r;
        d = new createjs.Container;
        e = [];
        f = new CBgRoute(d);
        q = MS_START_WAIT_SPAWN_OBJ;
        this.defineRowsRoute();
        this.createObjectOccurance();
        b.addChild(d);
        this.createPoolObjects(d);
        f.setGroundOverAll();
        m = [];
        g = [];
        x = []
    }
        ;
    this.unload = function () {
        b.removeChild(d)
    }
        ;
    this.createObjectOccurance = function () {
        l = [];
        for (var r = 0; r < OBJ_OCCURENCE.length; r++) {
            var n = OBJ_OCCURENCE[r];
            l[r] = [];
            for (var y = 0; y < n.length; y++)
                for (var A = 0; A < n[y]; A++)
                    l[r].push(y)
        }
    }
        ;
    this.defineRowsRoute = function () {
        for (var r = 0; r < ROW_POS.length; r++)
            if (e.push(new CRowRoute(d, r, ROW_POS[r])),
                DEBUG_LINES_ROWS_ROUTE) {
                var n = new createjs.Container;
                s_oStage.addChild(n);
                e[e.length - 1].debugLines(n)
            }
    }
        ;
    this.routeMovement = function (r) {
        f.update(r)
    }
        ;
    this.createPoolObjects = function () {
        h = [];
        for (var r = 0, n = 0; n < OBJECTS_PROPERTIES.length; n++)
            for (var y = s_oSpriteLibrary.getSprite("object_" + n), A = 0; A < OBJECTS_PROPERTIES[n].instance; A++) {
                var u = null;
                switch (OBJECTS_PROPERTIES[n].type) {
                    case OBSTACLE_TYPE:
                        u = new CStaticObstacle(d, y, OBJECTS_PROPERTIES[n], r, n);
                        break;
                    case PRIZE_TYPE:
                        OBJECTS_PROPERTIES[n].anim ? u = new CAnimPrize(d, y, OBJECTS_PROPERTIES[n], r, n) : (u = new CStaticPrize(d, y, OBJECTS_PROPERTIES[n], r, n),
                            u.addEventListener(ON_PRESENT_ANIM_TO_CHAR_END, this._onAnimToCharEnd, this, u));
                        break;
                    case POWER_UP_TYPE:
                        u = new CAnimPrize(d, y, OBJECTS_PROPERTIES[n], r, n);
                        break;
                    case WALKER_OBSTACLE_TYPE:
                        u = new CWalkerObstacle(d, y, OBJECTS_PROPERTIES[n], r, n)
                }
                u.setVisible(!1);
                h.push(u);
                r += 1
            }
    }
        ;
    this.resetPoolObjects = function () {
        for (var r = 0; r < h.length; r++)
            h[r].setVisible(!1);
        for (r = 0; r < e.length; r++)
            e[r].removeObjsReference()
    }
        ;
    this.checkNumObjsOnRoute = function (r) {
        for (var n = 0, y = 0, A = !1, u = 0; u < h.length; u++)
            if (h[u].getVisible() && (h[u].getType() === OBSTACLE_TYPE || h[u].getType() === WALKER_OBSTACLE_TYPE ? n += 1 : h[u].getType() === PRIZE_TYPE && (y += 1),
                n >= MAX_OBSTACLES_SCREEN && (r === OBSTACLE_TYPE || r === WALKER_OBSTACLE_TYPE) || y >= MAX_PRIZES_SCREEN && r === PRIZE_TYPE)) {
                A = !0;
                break
            }
        return A
    }
        ;
    this.setRowPoolObject = function () {
        if (0 <= q)
            q -= s_iTimeElaps;
        else {
            var r = Math.floor(Math.random() * ROW_POS.length)
                , n = l[s_oGame.getStage()][Math.floor(Math.random() * l[s_oGame.getStage()].length)];
            if (!this.checkNumObjsOnRoute(OBJECTS_PROPERTIES[n].type))
                for (var y = 0; y < h.length; y++) {
                    var A = h[y];
                    if (A.getTypeID() === n && !A.getVisible()) {
                        A.setVisible(!0);
                        n = -s_iOffsetX + A.getReg().regX;
                        y = e[r].getCenter() + OFFSET_ROW_OBJECT_Y[r];
                        A.setPos(CANVAS_WIDTH + n, y);
                        A.setScale(1);
                        n = A.getRectangle();
                        A.getType() === WALKER_OBSTACLE_TYPE ? (n.x -= PREVIEW_INTERSECTION_WALKER_OBSTACLE,
                            A.removeAllEventListeners("animationend"),
                            A.startAnimationLoop()) : n.x -= PREVIEW_INTERSECTION_OBSTACLE_OFFSET;
                        y = this.offsetImminentIntersection(n, r);
                        A.getType() === PRIZE_TYPE && A.setShadowVisible(!0);
                        y += this.checkIfCloseRoute(n, r);
                        A.setPosX(A.getPos().x + y);
                        this.sortDepth();
                        e[r].setObj(A);
                        break
                    }
                }
            this.resetTimerRand()
        }
    }
        ;
    this.offsetImminentIntersection = function (r, n) {
        return e[n].offsetIntersectionObj(r)
    }
        ;
    this.checkIfCloseRoute = function (r, n) {
        for (var y = 0, A = 0, u = 0; u < e.length; u++)
            if (0 < e[u].getNumObjects()) {
                var B = e[u].getLastObj();
                B.getType() !== PRIZE_TYPE && B.getType() !== POWER_UP_TYPE && (y += 1)
            }
        if (y < e.length - 1)
            return A;
        y = n - 1;
        u = n + 1;
        0 <= y && (A = this.offsetImminentIntersection(r, y));
        u <= e.length - 1 && (A = this.offsetImminentIntersection(r, u));
        return 0 !== A ? OFFSET_X_CLOSED_ROUTE_OBSTACLE : 0
    }
        ;
    this.resetTimerRand = function () {
        q = randomIntBetween(MS_RANGE_OBJ_SPAWN_RATE[s_oGame.getStage()].min, MS_RANGE_OBJ_SPAWN_RATE[s_oGame.getStage()].max)
    }
        ;
    this.manageRows = function (r) {
        for (var n = 0; n < e.length; n++)
            e[n].update(r)
    }
        ;
    this.sortDepth = function () {
        d.sortChildren(function (r, n) {
            return r.y > n.y ? 1 : r.y < n.y ? -1 : 0
        })
    }
        ;
    this.stopAnimationObjs = function () {
        for (var r = 0; r < e.length; r++)
            e[r].stopAllAnimationObjs()
    }
        ;
    this.playAnimationObjs = function () {
        for (var r = 0; r < e.length; r++)
            e[r].playAllAnimationObjs()
    }
        ;
    this.getRowYByID = function (r) {
        return e[r].getCenter()
    }
        ;
    this.getRowObjsByID = function (r) {
        return e[r].getObjs()
    }
        ;
    this.animationPrize = function (r, n) {
        this.swapDepthChildren(n.getGraphic(), r.getGraphic());
        r.animToCharacter(n)
    }
        ;
    this.setAllWalkerObjectesAnimation = function (r) {
        for (var n = 0; n < e.length; n++)
            for (var y = e[n].getObjs(), A = 0; A < y.length; A++)
                y[A].getType() === WALKER_OBSTACLE_TYPE && (y[A].removeAllEventListeners("animationend"),
                    y[A].changeState(r))
    }
        ;
    this.swapDepthChildren = function (r, n) {
        var y = d.getChildIndex(r)
            , A = d.getChildIndex(n);
        y < A && d.setChildIndex(r, A + 1)
    }
        ;
    this._onAnimToCharEnd = function (r) {
        m[ON_PRESENT_ANIM_TO_CHAR_END] && m[ON_PRESENT_ANIM_TO_CHAR_END].call(g[ON_PRESENT_ANIM_TO_CHAR_END], r)
    }
        ;
    this.setSpawnTimer = function (r) {
        q = r
    }
        ;
    this.getContainerObjs = function () {
        return d
    }
        ;
    this.setObjDepthUpToAll = function (r) {
        d.setChildIndex(r, d.numChildren - 2)
    }
        ;
    this.triggerEvent = function (r) {
        m[r] && m[r].call(g[r], x[r])
    }
        ;
    this.addEventListener = function (r, n, y, A) {
        m[r] = n;
        g[r] = y;
        x[r] = A
    }
        ;
    this.update = function (r) {
        this.setRowPoolObject();
        this.routeMovement(r);
        this.manageRows(r)
    }
        ;
    this._init(a)
}
function CRowRoute(a, d, b) {
    var e, h, l, f, q, m;
    this._init = function (g, x, r) {
        e = g;
        h = new createjs.Container;
        e.addChild(h);
        m = [];
        l = x;
        f = r;
        q = f + WIDTH_FIELDS_ROWS / 2
    }
        ;
    this.debugLines = function (g) {
        var x = new createjs.Shape;
        x.graphics.beginStroke(DEBUG_DEFAULT_COLOR[l]);
        x.graphics.setStrokeStyle(DEBUG_LINES_WIDTH);
        x.graphics.moveTo(0, f);
        x.graphics.lineTo(CANVAS_WIDTH, f);
        x.alpha = 1;
        var r = new createjs.Shape;
        r.graphics.beginFill("#fff").drawCircle(FIX_X_POS, q, 10);
        g.addChild(x, r)
    }
        ;
    this.setObj = function (g) {
        m.push(g);
        g.setRowRouteID({
            route_id: l,
            obj_id: m.length - 1
        })
    }
        ;
    this.getObjs = function () {
        return m
    }
        ;
    this.getNumObjects = function () {
        return m.length
    }
        ;
    this.getObj = function (g) {
        return m[g]
    }
        ;
    this.getY = function () {
        return f
    }
        ;
    this.getCenter = function () {
        return q
    }
        ;
    this.unload = function () {
        e.removeChild(h)
    }
        ;
    this.removeObj = function (g) {
        m[g].setVisible(!1);
        this.spliceObj(g)
    }
        ;
    this.spliceObj = function (g) {
        m.splice(g, 1)
    }
        ;
    this.removeObjsReference = function () {
        m = []
    }
        ;
    this.getLastObj = function () {
        return m[m.length - 1]
    }
        ;
    this.stopAllAnimationObjs = function () {
        for (var g = 0; g < m.length; g++)
            OBJECTS_PROPERTIES[m[g].getTypeID()].anim && m[g].stopAnimation()
    }
        ;
    this.playAllAnimationObjs = function () {
        for (var g = 0; g < m.length; g++)
            OBJECTS_PROPERTIES[m[g].getTypeID()].anim && m[g].playAnimation()
    }
        ;
    this.offsetIntersectionObj = function (g) {
        for (var x = 0, r = 0; r < m.length; r++) {
            var n = m[r].getRectangle();
            g.x < n.x + n.width && (x = n.x + n.width - g.x + 2 * g.width)
        }
        return x
    }
        ;
    this.objMovement = function (g) {
        for (var x = 0; x < m.length; x++) {
            var r = m[x].getPos()
                , n = s_iOffsetX - 2 * m[x].getReg().regX;
            m[x].setPosX(r.x - g);
            m[x].update();
            r.x <= n && (this.removeObj(x),
                0 <= m.length - 1 && m[0].setPosX(m[0].getPos().x - g))
        }
    }
        ;
    this.update = function (g) {
        this.objMovement(g)
    }
        ;
    this._init(a, d, b)
}
function CController(a) {
    var d, b, e, h;
    function l(u) {
        u || (u = window.event);
        u.preventDefault();
        if (x && s_oGame.getState() === GAME_STATE_PLAY) {
            var B = null;
            switch (u.keyCode) {
                case 38:
                    B = ON_PRESS_UP;
                    break;
                case 40:
                    B = ON_PRESS_DOWN
            }
            A.triggerEvent(B)
        }
    }
    var f, q, m, g, x, r, n, y;
    this._init = function (u) {
        f = u;
        q = new createjs.Container;
        f.addChild(q);
        x = !1;
        r = [];
        n = [];
        y = [];
        s_bMobile ? MOBILE_SWIPE_CONTROL ? (s_oHammer.get("swipe").set({
            direction: Hammer.DIRECTION_ALL
        }),
            s_oHammer.get("swipe").set({
                velocity: .5
            }),
            s_oHammer.get("swipe").set({
                threshold: .5
            }),
            s_oHammer.on("swipeup", this._onSwipeUp),
            s_oHammer.on("swipedown", this._onSwipeDown)) : this.createButtons() : document.onkeydown = l
    }
        ;
    this.setInput = function (u) {
        x = u
    }
        ;
    this.createButtons = function () {
        var u = s_oSpriteLibrary.getSprite("but_arrow_up");
        e = CANVAS_WIDTH / 2 - CANVAS_WIDTH / 4;
        h = 980;
        m = new CGfxButton(e, h, u, s_oStage);
        m.addEventListenerWithParams(ON_MOUSE_DOWN, this.triggerEvent, this, ON_PRESS_UP);
        u = s_oSpriteLibrary.getSprite("but_arrow_down");
        d = CANVAS_WIDTH / 2 + CANVAS_WIDTH / 4;
        b = 980;
        g = new CGfxButton(d, b, u, s_oStage);
        g.addEventListenerWithParams(ON_MOUSE_DOWN, this.triggerEvent, this, ON_PRESS_DOWN);
        this.refreshButtonPos(s_iOffsetX, s_iOffsetY)
    }
        ;
    this._onSwipeUp = function () {
        A.triggerEvent(ON_PRESS_UP)
    }
        ;
    this._onSwipeDown = function () {
        A.triggerEvent(ON_PRESS_DOWN)
    }
        ;
    this.unload = function () {
        s_bMobile && !MOBILE_SWIPE_CONTROL && (m.removeAllEventListeners(),
            g.removeAllEventListeners())
    }
        ;
    this._onPressDown = function (u) {
        y[ON_TAP_DOWN] = {
            x: u.stageX,
            y: u.stageY
        };
        A.triggerEvent(ON_TAP_DOWN)
    }
        ;
    this.refreshButtonPos = function (u, B) {
        s_bMobile && !MOBILE_SWIPE_CONTROL && (m.setPosition(e, h - B),
            g.setPosition(d, b - B))
    }
        ;
    this.triggerEvent = function (u) {
        r[u] && r[u].call(n[u], y[u])
    }
        ;
    this.addEventListener = function (u, B, z, t) {
        r[u] = B;
        n[u] = z;
        y[u] = t
    }
        ;
    var A = this;
    this._init(a)
}
function CCharacter(a, d, b) {
    var e, h, l, f, q, m, g, x, r, n, y, A, u, B, z, t, F, J, C, D, L, G, ka, da;
    this._init = function (N, Z, ea) {
        q = ea;
        m = new createjs.Container;
        q.addChild(m);
        r = null;
        t = ON_CHAR_COL;
        var X = s_oSpriteLibrary.getSprite("player");
        var iScale = getSpriteScale("player", X.width);
        ea = new createjs.SpriteSheet({
            images: [X],
            frames: resizeSpriteFrames([[1, 1, 224, 160, 0, 106, 151.5], [227, 1, 223, 160, 0, 106, 151.5], [452, 1, 223, 160, 0, 106, 151.5], [677, 1, 217, 160, 0, 106, 151.5], [896, 1, 215, 160, 0, 106, 151.5], [1113, 1, 215, 160, 0, 106, 151.5], [1330, 1, 215, 160, 0, 106, 151.5], [1547, 1, 215, 160, 0, 106, 151.5], [1764, 1, 233, 163, 0, 115, 154.5], [1, 163, 235, 164, 0, 115, 156.5], [238, 163, 232, 166, 0, 112, 157.5], [472, 163, 230, 170, 0, 107, 162.5], [704, 163, 218, 186, 0, 96, 178.5], [924, 163, 201, 204, 0, 81, 196.5], [1127, 163, 139, 205, 0, 68, 199.5], [1268, 163, 149, 206, 0, 78, 199.5], [1419, 163, 157, 206, 0, 86, 204.5], [1578, 163, 156, 206, 0, 85, 203.5], [1736, 166, 146, 206, 0, 75, 200.5], [1, 329, 137, 206, 0, 66, 199.5], [140, 331, 137, 206, 0, 66, 199.5], [279, 331, 156, 206, 0, 64, 206.5], [437, 335, 153, 207, 0, 82, 203.5], [592, 351, 150, 207, 0, 79, 199.5], [744, 351, 151, 207, 0, 80, 199.5], [897, 369, 151, 207, 0, 80, 200.5], [1050, 370, 154, 207, 0, 83, 203.5], [1206, 371, 151, 207, 0, 80, 202.5], [1359, 371, 137, 207, 0, 66, 201.5], [1498, 371, 155, 208, 0, 84, 204.5], [1655, 374, 263, 207, 0, 130, 177.5], [1, 539, 263, 207, 0, 130, 177.5], [266, 539, 153, 208, 0, 82, 203.5], [421, 544, 150, 208, 0, 79, 202.5], [573, 560, 263, 207, 0, 130, 177.5], [838, 578, 150, 208, 0, 79, 201.5], [990, 579, 143, 208, 0, 72, 202.5], [1135, 580, 263, 207, 0, 130, 177.5], [1400, 581, 146, 208, 0, 64, 206.5], [1548, 583, 261, 207, 0, 128, 178.5], [1811, 583, 155, 209, 0, 84, 205.5], [1, 748, 263, 208, 0, 130, 178.5], [266, 749, 151, 210, 0, 80, 202.5], [419, 754, 140, 214, 0, 65, 208.5], [561, 769, 263, 208, 0, 130, 179.5], [826, 789, 263, 209, 0, 130, 180.5], [1091, 789, 263, 210, 0, 130, 180.5], [1356, 792, 263, 210, 0, 130, 181.5], [1621, 794, 263, 211, 0, 130, 182.5], [1, 958, 192, 212, 0, 67, 211.5], [195, 961, 190, 213, 0, 69, 204.5], [387, 970, 167, 219, 0, 64, 218.5], [556, 979, 263, 213, 0, 130, 184.5], [821, 1E3, 263, 214, 0, 130, 185.5], [1086, 1001, 263, 214, 0, 130, 186.5], [1351, 1004, 263, 214, 0, 130, 186.5], [1616, 1007, 178, 214, 0, 64, 214.5], [1796, 1007, 189, 215, 0, 68, 206.5], [1, 1172, 191, 219, 0, 68, 214.5], [194, 1176, 191, 220, 0, 70, 211.5], [387, 1194, 262, 216, 0, 130, 189.5], [651, 1216, 262, 216, 0, 130, 188.5], [915, 1217, 262, 216, 0, 130, 188.5], [1179, 1220, 261, 216, 0, 130, 188.5], [1442, 1223, 258, 217, 0, 125, 190.5], [1702, 1224, 262, 217, 0, 129, 190.5], [1, 1398, 261, 217, 0, 130, 189.5], [264, 1412, 252, 218, 0, 119, 189.5], [518, 1434, 261, 218, 0, 130, 190.5], [781, 1435, 263, 218, 0, 130, 189.5], [1046, 1438, 247, 221, 0, 118, 195.25], [1295, 1442, 252, 221, 0, 119, 189.5], [1549, 1443, 242, 222, 0, 117, 202], [1793, 1443, 191, 223, 0, 70, 216.5], [1, 1617, 190, 225, 0, 96, 216.5], [193, 1632, 263, 222, 0, 130, 194.5], [458, 1654, 262, 223, 0, 130, 195.5], [722, 1655, 262, 223, 0, 130, 195.5], [986, 1661, 233, 225, 0, 115, 210.75], [1221, 1665, 214, 227, 0, 108, 218.5], [1437, 1667, 224, 227, 0, 113, 218.5]], iScale),
            animations: {
                run: {
                    frames: [22, 29, 32, 33, 15, 23, 24, 25, 35, 42, 26, 16, 17, 27, 18, 14, 19, 20, 28, 36],
                    next: "run"
                },
                start_power_up: {
                    frames: [74, 79, 80, 78, 72, 70, 71, 67, 64, 65, 60],
                    next: "power_up"
                },
                power_up: {
                    frames: [66, 68, 76, 77, 75, 69, 53, 46, 30, 31, 34, 37, 41, 39, 44, 45, 47, 48, 52, 54, 55, 61, 62, 63],
                    next: "power_up"
                },
                end_power_up: {
                    frames: [60, 65, 64, 67, 71, 70, 72, 78, 80, 79, 74],
                    next: "run",
                    speed: 1.2
                },
                fall: {
                    frames: [40, 43, 38, 21, 51, 56, 49, 58, 73, 59, 57, 50, 13, 12, 11, 10, 9, 8, 0, 1, 2, 3, 4, 5, 6, 7],
                    next: "fall_idle"
                },
                idle: {
                    frames: [25]
                },
                fall_idle: {
                    frames: [7]
                }
            }
        });
        g = createSprite(ea, "idle", X.width / 2 / 9, X.height / 9, X.width / 9, X.height / 9);
        m.x = N;
        m.y = Z;
        z = X.width / 9;
        A = X.height / 9;
        C = {
            x: z,
            y: A / 2 - 20
        };
        e = -z + OFFSET_PLAYER_COL_POINT.x;
        h = -A + OFFSET_PLAYER_COL_POINT.y;
        l = z - OFFSET_PLAYER_COL_DIMENSION.x;
        f = A - OFFSET_PLAYER_COL_DIMENSION.y;
        x = new createjs.Rectangle(m.x + e, m.y + h, l, f);
        y = null;
        DEBUG_CHAR_COLLISION_SHAPE && (r = new createjs.Shape,
            r.graphics.beginFill("#00ff00").drawRect(x.x, x.y, x.width, x.height),
            r.alpha = .5,
            m.addChild(r));
        this.rectCollision();
        N = s_oSpriteLibrary.getSprite("sparkles");
        ea = new createjs.SpriteSheet({
            images: [N],
            frames: [[1, 1, 99, 97, 0, 0, 0], [1, 1, 99, 97, 0, 0, 0], [102, 1, 99, 97, 0, 0, 0], [203, 1, 99, 97, 0, 0, 0], [304, 1, 99, 97, 0, 0, 0], [405, 1, 99, 97, 0, 0, 0], [506, 1, 99, 97, 0, 0, 0], [607, 1, 99, 97, 0, 0, 0], [708, 1, 99, 97, 0, 0, 0], [809, 1, 99, 97, 0, 0, 0], [910, 1, 99, 97, 0, 0, 0], [1011, 1, 99, 97, 0, 0, 0], [1112, 1, 99, 97, 0, 0, 0], [1213, 1, 99, 97, 0, 0, 0], [1314, 1, 99, 97, 0, 0, 0], [1415, 1, 99, 97, 0, 0, 0], [1516, 1, 99, 97, 0, 0, 0]],
            animations: {
                first: {
                    frames: [0, 2, 9, 10, 11, 12, 13, 14]
                },
                second: {
                    frames: [15, 16, 3, 4, 5, 6, 7, 8, 1]
                }
            }
        });
        n = createSprite(ea, "first", N.width / 2 / 17, N.height, N.width / 17, N.height);
        n.y = -C.y - 30;
        n.visible = !1;
        m.addChild(n);
        B = u = 0;
        F = CHAR_STATE_RUN;
        D = L = !1;
        G = [];
        ka = [];
        da = [];
        m.addChild(g, n)
    }
        ;
    this.getX = function () {
        return m.x
    }
        ;
    this.getY = function () {
        return m.y
    }
        ;
    this.getPos = function () {
        return {
            x: m.x,
            y: m.y
        }
    }
        ;
    this.setPosition = function (N, Z) {
        null !== N && (m.x = N);
        null !== Z && (m.y = Z);
        this.rectCollision()
    }
        ;
    this.setVisible = function (N) {
        m.visible = N
    }
        ;
    this.changeAnimation = function (N) {
        g.gotoAndPlay(N)
    }
        ;
    this.stopAnimation = function () {
        g.stop()
    }
        ;
    this.playAnimation = function () {
        g.play()
    }
        ;
    this.getRectangle = function () {
        return x
    }
        ;
    this.getGraphic = function () {
        return m
    }
        ;
    this.unload = function () {
        q.removeChild(m)
    }
        ;
    this.setPlayerIDRow = function (N) {
        u = N
    }
        ;
    this.getIDRow = function () {
        return u
    }
        ;
    this.getColIDRow = function () {
        return B
    }
        ;
    this.setState = function (N) {
        F = N
    }
        ;
    this.getState = function () {
        return F
    }
        ;
    this.setScale = function (N) {
        m.scaleX = m.scaleY = N
    }
        ;
    this.getEvtCollision = function () {
        return t
    }
        ;
    this.getCollided = function () {
        return L
    }
        ;
    this.setCollided = function (N) {
        L = N
    }
        ;
    this.activePowerUp = function () {
        D || g.gotoAndPlay("start_power_up");
        null !== y && (y.loop = 1,
            y = null);
        D = !0;
        J = MS_POWER_UP_TIME
    }
        ;
    this.deactivePowerUp = function () {
        y.loop = 1;
        y = null;
        g.gotoAndPlay("end_power_up");
        D = !1
    }
        ;
    this.getPowerUp = function () {
        return D
    }
        ;
    this.rectCollision = function () {
        x.setValues(m.x + e, m.y + h, l, f);
        null !== r && (r.graphics.command.h = x.height,
            r.graphics.command.w = x.width,
            r.graphics.command.x = x.x,
            r.graphics.command.y = x.y)
    }
        ;
    this.removeTweens = function () {
        createjs.Tween.removeTweens(m)
    }
        ;
    this.checkTimerPowerUp = function () {
        D && (J -= s_iTimeElaps,
            J <= MS_SIGNAL_END_POWER_UP && null === y && (y = createjs.Tween.get(m, {
                loop: -1
            }).to({
                alpha: .3
            }, 150, createjs.Ease.cubicOut).to({
                alpha: 1
            }, 150, createjs.Ease.cubicOut)),
            0 >= J && this.deactivePowerUp())
    }
        ;
    this.getBagPoint = function () {
        return C
    }
        ;
    this.startSparklesAnimation = function () {
        n.visible = !0;
        n.alpha = 1;
        n.removeAllEventListeners("animationend");
        n.gotoAndPlay("first");
        createjs.Tween.removeTweens(n);
        var N = this;
        n.on("animationend", function () {
            n.gotoAndPlay("second");
            createjs.Tween.get(n).to({
                alpha: 0
            }, 250, createjs.Ease.cubicOut).call(function () {
                n.visible = !1;
                N.triggerEvent(ON_CHAR_MOVEMENT_END)
            })
        })
    }
        ;
    this.controlMovement = function (N, Z) {
        this.setState(CHAR_STATE_SWITCH);
        m.removeAllEventListeners();
        u = Z;
        createjs.Tween.get(m).to({
            y: N
        }, MS_CHAR_SWITCH_TIME, createjs.Ease.cubicOut).call(function () {
            B = u;
            ma.setState(CHAR_STATE_RUN)
        })
    }
        ;
    this.triggerEvent = function (N) {
        G[N] && G[N].call(ka[N], da[N])
    }
        ;
    this.addEventListener = function (N, Z, ea, X) {
        G[N] = Z;
        ka[N] = ea;
        da[N] = X
    }
        ;
    this.update = function () {
        this.rectCollision();
        this.checkTimerPowerUp()
    }
        ;
    var ma = this;
    this._init(a, d, b)
}
function CObject() {
    this._oParentContainer;
    this._oRectangle;
    this._oShape;
    this._oRectangleMeasure;
    this._oObject;
    this._iID;
    this._iWidth;
    this._iHeight;
    this._iEvtCol;
    this._iTypeID;
    this._oRowRouteID;
    this._iGraphOffsetX;
    this._bCollided
}
CObject.prototype.createRectCollision = function (a) {
    var d = a.collision_offset.y;
    a = a.collision_offset.x;
    this._oRectangleMeasure = {
        x: -this._iWidth / 2 - a,
        y: -this._iHeight / 2 - d,
        w: this._iWidth + a,
        h: this._iHeight + d
    };
    this._oRectangle = new createjs.Rectangle(this._oObject.x + this._oRectangleMeasure.x, this._oObject.y + this._oRectangleMeasure.y, this._oRectangleMeasure.w, this._oRectangleMeasure.h);
    this._oShape = null;
    DEBUG_CHAR_COLLISION_SHAPE && (this._oShape = new createjs.Shape,
        this._oShape.graphics.beginFill("#00ff00").drawRect(this._oRectangle.x, this._oRectangle.y, this._oRectangle.width, this._oRectangle.height),
        this._oShape.alpha = .5,
        this._oParentContainer.addChild(this._oShape));
    this._bCollided = !1;
    this.rectCollision()
}
    ;
CObject.prototype.rectCollision = function () {
    this._oRectangle.setValues(this._oObject.x + this._oRectangleMeasure.x, this._oObject.y + this._oRectangleMeasure.y, this._oRectangleMeasure.w, this._oRectangleMeasure.h);
    null !== this._oShape && (this._oShape.graphics.command.h = this._oRectangle.height,
        this._oShape.graphics.command.w = this._oRectangle.width,
        this._oShape.graphics.command.x = this._oRectangle.x,
        this._oShape.graphics.command.y = this._oRectangle.y)
}
    ;
CObject.prototype.getParentContainer = function () {
    return this._oParentContainer
}
    ;
CObject.prototype.setPos = function (a, d) {
    this._oObject.x = a;
    this._oObject.y = d;
    this.rectCollision()
}
    ;
CObject.prototype.setLocalPos = function (a, d) {
    this._oObject.globalToLocal(a, d)
}
    ;
CObject.prototype.getPos = function () {
    return {
        x: this._oObject.x,
        y: this._oObject.y
    }
}
    ;
CObject.prototype.getCollided = function () {
    return this._bCollided
}
    ;
CObject.prototype.setCollided = function (a) {
    this._bCollided = a
}
    ;
CObject.prototype.getLocalPos = function () {
    return this._oObject.localToGlobal(0, 0)
}
    ;
CObject.prototype.getReg = function () {
    return {
        regX: this._oObject.regX,
        regY: this._oObject.regY
    }
}
    ;
CObject.prototype.setPosX = function (a) {
    this._oObject.x = a;
    this.rectCollision()
}
    ;
CObject.prototype.setPosY = function (a) {
    this._oObject.y = a;
    this.rectCollision()
}
    ;
CObject.prototype.setVisible = function (a) {
    this._oObject.visible = a;
    null !== this._oShape && (this._oShape.visible = a)
}
    ;
CObject.prototype.getVisible = function () {
    return this._oObject.visible
}
    ;
CObject.prototype.getGraphic = function () {
    return this._oObject
}
    ;
CObject.prototype.getRectangle = function () {
    return this._oRectangle
}
    ;
CObject.prototype.getID = function () {
    return this._iID
}
    ;
CObject.prototype.getTypeID = function () {
    return this._iTypeID
}
    ;
CObject.prototype.setScale = function (a) {
    this._oObject.scaleX = this._oObject.scaleY = a
}
    ;
CObject.prototype.getEvtCollision = function () {
    return this._iEvtCol
}
    ;
CObject.prototype.setRowRouteID = function (a) {
    this._oRowRouteID = a
}
    ;
CObject.prototype.getRowRouteID = function () {
    return this._oRowRouteID
}
    ;
CObject.prototype.update = function () { }
    ;
function CAnimPrize(a, d, b, e, h) {
    this._iValue;
    this._iType;
    this._aCbCompleted;
    this._aCbOwner;
    this._aParams;
    CObject.call(this);
    this._init(a, d, b, e, h)
}
CAnimPrize.prototype = Object.create(CObject.prototype);
CAnimPrize.prototype._init = function (a, d, b, e, h) {
    this._oParentContainer = a;
    this._iID = e;
    this._iValue = b.value;
    this._iType = b.type;
    this._iTypeID = h;
    this._oObject = this.setAnimObjType(d, b).obj;
    this._oParentContainer.addChild(this._oObject);
    this.createRectCollision(b);
    this._aCbCompleted = [];
    this._aCbOwner = [];
    this._aParams = []
}
    ;
CAnimPrize.prototype.setAnimObjType = function (a, d) {
    this._iWidth = a.width / d.reg.x;
    this._iHeight = a.height / d.reg.y;
    var b = new createjs.SpriteSheet({
        images: [a],
        frames: {
            width: a.width / d.reg.x,
            height: a.height / d.reg.y,
            regX: a.width / 2 / d.reg.x + d.reg_offset.x,
            regY: a.height / 2 / d.reg.y + d.reg_offset.y
        },
        animations: d.animations
    });
    return {
        obj: createSprite(b, d.start_anim, a.width / 2 / d.reg.x, a.height / d.reg.y, a.width / d.reg.x, a.height / d.reg.y),
        x: d.reg.x,
        y: d.reg.y
    }
}
    ;
CAnimPrize.prototype.getValue = function () {
    return this._iValue
}
    ;
CAnimPrize.prototype.getType = function () {
    return this._iType
}
    ;
CAnimPrize.prototype.changeState = function (a) {
    this._oObject.gotoAndPlay(a)
}
    ;
CAnimPrize.prototype.stopAnimation = function () {
    this._oObject.stop()
}
    ;
CAnimPrize.prototype.playAnimation = function () {
    this._oObject.play()
}
    ;
function CStaticObstacle(a, d, b, e, h) {
    this._iType;
    CObject.call(this);
    this._init(a, d, b, e, h)
}
CStaticObstacle.prototype = Object.create(CObject.prototype);
CStaticObstacle.prototype._init = function (a, d, b, e, h) {
    this._oParentContainer = a;
    this._iID = e;
    this._iType = b.type;
    this._iTypeID = h;
    this._oObject = this.setStaticObjType(d, b);
    this._oParentContainer.addChild(this._oObject);
    this.createRectCollision(b)
}
    ;
CStaticObstacle.prototype.setStaticObjType = function (a, d) {
    this._iWidth = a.width;
    this._iHeight = a.height;
    var b = createBitmap(a);
    b.regX = a.width / 2 + d.reg_offset.x;
    b.regY = a.height / 2 + d.reg_offset.y;
    return b
}
    ;
CStaticObstacle.prototype.getType = function () {
    return this._iType
}
    ;
function CStaticPrize(a, d, b, e, h) {
    this._iType;
    this._iValue;
    this._oPrize;
    this._oSparkles;
    this._oShadow;
    this._oContainerPresent;
    this._aCbCompleted;
    this._aCbOwner;
    this._aParams;
    CObject.call(this);
    this._init(a, d, b, e, h)
}
CStaticPrize.prototype = Object.create(CObject.prototype);
CStaticPrize.prototype._init = function (a, d, b, e, h) {
    this._oParentContainer = a;
    this._iID = e;
    this._iType = b.type;
    this._iTypeID = h;
    this._iValue = b.value;
    this._bTaken = !1;
    this._oObject = this.setStaticObjType(d, b);
    this._oParentContainer.addChild(this._oObject);
    this.createRectCollision(b);
    this._aCbCompleted = [];
    this._aCbOwner = [];
    this._aParams = [];
    this.animationFloating()
}
    ;
CStaticPrize.prototype.setStaticObjType = function (a, d) {
    var b = new createjs.Container;
    b.regX = a.width / 2 + d.reg_offset.x;
    b.regY = a.height / 2 + d.reg_offset.y;
    var e = s_oSpriteLibrary.getSprite("present_shadow");
    this._oShadow = createBitmap(s_oSpriteLibrary.getSprite("present_shadow"));
    this._oShadow.y = a.height / 2 + 10;
    this._oShadow.x = e.width / 2;
    this._oShadow.scaleX = this._oShadow.scaleY = d.shadowScale;
    b.addChild(this._oShadow);
    this._oContainerPresent = new createjs.Container;
    b.addChild(this._oContainerPresent);
    this._iWidth = a.width;
    this._iHeight = a.height;
    this._oPrize = createBitmap(a);
    this._oContainerPresent.addChild(this._oPrize);
    if (SHOW_PRESENT_SPARKLES) {
        e = s_oSpriteLibrary.getSprite("sparkles");
        var h = new createjs.SpriteSheet({
            images: [e],
            frames: [[1, 1, 99, 97, 0, 0, 0], [1, 1, 99, 97, 0, 0, 0], [102, 1, 99, 97, 0, 0, 0], [203, 1, 99, 97, 0, 0, 0], [304, 1, 99, 97, 0, 0, 0], [405, 1, 99, 97, 0, 0, 0], [506, 1, 99, 97, 0, 0, 0], [607, 1, 99, 97, 0, 0, 0], [708, 1, 99, 97, 0, 0, 0], [809, 1, 99, 97, 0, 0, 0], [910, 1, 99, 97, 0, 0, 0], [1011, 1, 99, 97, 0, 0, 0], [1112, 1, 99, 97, 0, 0, 0], [1213, 1, 99, 97, 0, 0, 0], [1314, 1, 99, 97, 0, 0, 0], [1415, 1, 99, 97, 0, 0, 0], [1516, 1, 99, 97, 0, 0, 0]],
            animations: {
                loop: {
                    frames: [0, 2, 9, 10, 11, 12, 13, 14, 15, 16, 3, 4, 5, 6, 7, 8, 1],
                    next: "loop"
                }
            }
        });
        this._oSparkles = createSprite(h, "loop", e.width / 2 / 17, e.height, e.width / 17, e.height);
        this._oSparkles.x = 10;
        this._oSparkles.y = 10;
        this._oContainerPresent.addChild(this._oSparkles)
    }
    this._oContainerPresent.y = -20;
    return b
}
    ;
CStaticPrize.prototype.getType = function () {
    return this._iType
}
    ;
CStaticPrize.prototype.getValue = function () {
    return this._iValue
}
    ;
CStaticPrize.prototype.animToCharacter = function (a) {
    var d = a.getPos();
    this._oShadow.visible = !1;
    var b = this;
    this._bTaken = !0;
    var e = d.x;
    a = d.y - a.getBagPoint().y;
    e *= this._oObject.scaleX;
    a *= this._oObject.scaleX;
    createjs.Tween.get(this._oObject).to({
        x: e,
        y: a,
        scaleX: 0,
        scaleY: 0
    }, 200, createjs.Ease.cubicIn).call(function (h) {
        b.triggerEvent(ON_PRESENT_ANIM_TO_CHAR_END)
    })
}
    ;
CStaticPrize.prototype.animationFloating = function () {
    var a = this._oContainerPresent;
    createjs.Tween.get(this._oShadow, {
        override: !0,
        loop: -1
    }).to({
        alpha: .5
    }, 700, createjs.Ease.cubicInOut).to({
        alpha: 1
    }, 700, createjs.Ease.cubicInOut);
    createjs.Tween.get(a, {
        override: !0,
        loop: -1
    }).to({
        y: -40
    }, 700, createjs.Ease.cubicInOut).to({
        y: -20
    }, 700, createjs.Ease.cubicInOut)
}
    ;
CStaticPrize.prototype.setShadowVisible = function (a) {
    this._oShadow.visible = a
}
    ;
CStaticPrize.prototype.triggerEvent = function (a) {
    this._aCbCompleted[a] && this._aCbCompleted[a].call(this._aCbOwner[a], this._aParams[a])
}
    ;
CStaticPrize.prototype.addEventListener = function (a, d, b, e) {
    this._aCbCompleted[a] = d;
    this._aCbOwner[a] = b;
    this._aParams[a] = e
}
    ;
CStaticPrize.prototype.unload = function () {
    createjs.Tween.removeTweens(this._oShadow);
    createjs.Tween.removeTweens(this._oContainerPresent);
    this._oParentContainer.removeChild(this._oObject);
    this._oObject = null
}
    ;
CStaticPrize.prototype.getType = function () {
    return this._iType
}
    ;
CStaticPrize.prototype.update = function () { }
    ;
function CCollisionController() {
    var a, d;
    this._init = function () {
        a = [];
        d = []
    }
        ;
    this.checkIntersectionRectRect = function (b, e) {
        var h = b.getRectangle().intersection(e.getRectangle());
        return null !== h ? h : null
    }
        ;
    this.checkCollisionPointRect = function (b, e) {
        var h = b.getRectangle()
            , l = e.getRectangle()
            , f = !1;
        h.x < l.x + l.width && h.x > l.x - .5 * l.width && (b.getCollided() || e.getCollided() || this.triggerEvent(b.getEvtCollision(), {
            obj1: b,
            obj2: e
        }),
            f = !0);
        b.setCollided(f);
        e.setCollided(f)
    }
        ;
    this.checkCollisionRectRect = function (b, e) {
        var h = b.getRectangle()
            , l = e.getRectangle();
        return h.intersects(l) ? (b.getCollided() || this.triggerEvent({
            obj1: b,
            obj2: e
        }),
            !0) : !1
    }
        ;
    this.triggerEvent = function (b, e) {
        a[b] && a[b].call(d[b], e)
    }
        ;
    this.addEventListener = function (b, e, h) {
        a[b] = e;
        d[b] = h
    }
        ;
    this._init()
}
var MS_ROLLING_SCORE = 700;
function CRollingScore() {
    var a = null
        , d = null;
    this.rolling = function (b, e, h) {
        var l = new createjs.Text(parseInt(b.getText().text.replace(/\D/g, "")), "1px " + PRIMARY_FONT, FONT_COLOR);
        a = createjs.Tween.get(l, {
            override: !0
        }).to({
            text: h
        }, MS_ROLLING_SCORE, createjs.Ease.cubicOut).addEventListener("change", function () {
            b.refreshText(sprintf(TEXT_POINTS, Math.floor(l.text)))
        }).call(function () {
            createjs.Tween.removeTweens(a)
        });
        null !== e && (d = createjs.Tween.get(e, {
            override: !0
        }).to({
            text: h
        }, MS_ROLLING_SCORE, createjs.Ease.cubicOut).addEventListener("change", function () {
            e.text = Math.floor(e.text)
        }).call(function () {
            createjs.Tween.removeTweens(d)
        }))
    }
        ;
    return this
}
function CTweenController() {
    this.tweenValue = function (a, d, b) {
        return a + b * (d - a)
    }
        ;
    this.easeLinear = function (a, d, b, e) {
        return b * a / e + d
    }
        ;
    this.easeInCubic = function (a, d, b, e) {
        e = (a /= e) * a * a;
        return d + b * e
    }
        ;
    this.easeBackInQuart = function (a, d, b, e) {
        e = (a /= e) * a;
        return d + b * (2 * e * e + 2 * e * a + -3 * e)
    }
        ;
    this.easeInBack = function (a, d, b, e) {
        return b * (a /= e) * a * (2.70158 * a - 1.70158) + d
    }
        ;
    this.easeOutCubic = function (a, d, b, e) {
        return b * ((a = a / e - 1) * a * a + 1) + d
    }
        ;
    this.getTrajectoryPoint = function (a, d) {
        var b = new createjs.Point
            , e = (1 - a) * (1 - a)
            , h = a * a;
        b.x = e * d.start.x + 2 * (1 - a) * a * d.traj.x + h * d.end.x;
        b.y = e * d.start.y + 2 * (1 - a) * a * d.traj.y + h * d.end.y;
        return b
    }
}
function CScoreText(a, d, b) {
    var e, h, l;
    this._init = function (f, q, m) {
        e = new createjs.Container;
        e.alpha = 0;
        e.x = q;
        e.y = m;
        s_oStage.addChild(e);
        f = 0 <= f ? "+" + f : f;
        l = new createjs.Text(f, "50px " + PRIMARY_FONT, FONT_STROKE);
        l.textAlign = "center";
        l.outline = 4;
        e.addChild(l);
        h = new createjs.Text(f, "50px " + PRIMARY_FONT, "#fff");
        h.textAlign = "center";
        e.addChild(h);
        var g = this;
        createjs.Tween.get(e).to({
            alpha: 1
        }, 400, createjs.Ease.quadIn).call(function () {
            g.moveUp()
        })
    }
        ;
    this.moveUp = function () {
        var f = e.y - 100
            , q = this;
        createjs.Tween.get(e).to({
            y: f
        }, 1E3, createjs.Ease.backIn).call(function () {
            q.unload()
        });
        createjs.Tween.get(e).wait(500).to({
            alpha: 0
        }, 500)
    }
        ;
    this.unload = function () {
        s_oStage.removeChild(e)
    }
        ;
    this._init(a, d, b)
}
function CEffectText(a) {
    var d, b, e, h, l, f;
    this._init = function (q) {
        e = new createjs.Container;
        e.visible = !1;
        s_oStage.addChild(e);
        l = new CTLText(e, -200, -30, 400, 60, 58, "center", FONT_STROKE, PRIMARY_FONT, 1, 2, 2, q, !0, !0, !1, !1);
        l.setOutline(5);
        h = new CTLText(e, -200, -30, 400, 60, 58, "center", FONT_COLOR, PRIMARY_FONT, 1, 2, 2, q, !0, !0, !1, !1);
        d = CANVAS_WIDTH + l.getBounds().width - s_iOffsetX;
        b = CANVAS_HEIGHT / 2;
        e.x = d;
        e.y = b;
        f = null
    }
        ;
    this.setText = function (q) {
        h.refreshText(q);
        l.refreshText(q)
    }
        ;
    this.startAnimation = function () {
        null === f && (e.x = d,
            e.y = b,
            e.visible = !0,
            createjs.Tween.get(e).to({
                alpha: 1
            }, 500, createjs.Ease.quadIn),
            f = createjs.Tween.get(e).to({
                x: CANVAS_WIDTH / 2
            }, 1E3, createjs.Ease.backIn).call(function () {
                createjs.Tween.get(e, {
                    override: !0
                }).wait(500).to({
                    x: 0 - l.getBounds().x + s_iOffsetX,
                    alpha: 0
                }, 1E3).call(function () {
                    f = null
                })
            }))
    }
        ;
    this.unload = function () {
        s_oStage.removeChild(e)
    }
        ;
    this._init(a)
}
function CBgRoute(a) {
    var d, b, e, h, l, f, q;
    this._init = function (m) {
        d = m;
        q = new createjs.Container;
        d.addChild(q);
        b = new createjs.Container;
        q.addChild(b);

        m = s_oSpriteLibrary.getSprite("sky");
        var valScal = getSpriteScale("sky", m.width);
        var g = createBitmap(m);
        g.scaleX = g.scaleY = valScal;
        b.addChild(g);
        var skyH = m.height * valScal;

        e = new createjs.Container;
        q.addChild(e);
        g = s_oSpriteLibrary.getSprite("trees_hill");
        valScal = getSpriteScale("trees_hill", g.width);
        this.createParallax(g, e, valScal);
        e.y = skyH - (g.height * valScal);

        h = new createjs.Container;
        q.addChild(h);
        g = s_oSpriteLibrary.getSprite("route");
        valScal = getSpriteScale("route", g.width);
        this.createParallax(g, h, valScal);
        h.y = skyH;
        var routeY = h.y;
        var routeH = g.height * valScal;

        l = new createjs.Container;
        h.addChild(l);
        m = s_oSpriteLibrary.getSprite("route_line");
        valScal = getSpriteScale("route_line", m.width);
        this.createParallax(m, l, valScal);
        l.y = -(m.height * valScal);

        f = new createjs.Container;
        d.addChild(f);
        m = s_oSpriteLibrary.getSprite("ground");
        valScal = getSpriteScale("ground", m.width);
        this.createParallax(m, f, valScal);
        f.y = routeY + routeH;
        f.regY = m.height * valScal;
    }
        ;
    this.createParallax = function (m, g, s) {
        var w = m.width * s;
        for (var x = 0, r = 0; 2 > r; r++) {
            var n = createBitmap(m);
            n.scaleX = n.scaleY = s;
            n.x = x;
            x += w;
            g.addChild(n)
        }
    }
        ;
    this.setGroundOverAll = function () {
        d.setChildIndex(f, d.numChildren - 1)
    }
        ;
    this.unload = function () {
        d.removeChild(q)
    }
        ;
    this.update = function (m) {
        e.x <= -CANVAS_WIDTH && (e.x = 0 + (e.x + CANVAS_WIDTH));
        e.x -= m * BG_HILL_RATE_SPEED;
        h.x <= -CANVAS_WIDTH && (h.x = 0 + (h.x + CANVAS_WIDTH));
        h.x -= m;
        f.x <= -CANVAS_WIDTH && (f.x = 0 + (f.x + CANVAS_WIDTH));
        f.x -= m * BG_GROUND_RATE_SPEED
    }
        ;
    this._init(a)
}
function CTremble(a, d, b, e) {
    var h, l, f, q, m, g, x;
    this._init = function (n, y, A, u) {
        q = f = !1;
        g = 0;
        this._calculateDuration(y, A);
        h = n.x;
        l = n.y;
        f || (f = !0,
            m = setInterval(function () {
                r._tremble(u)
            }, A))
    }
        ;
    this._tremble = function (n) {
        if (q = !q) {
            var y = .5 > Math.random() ? -n : n;
            n = .5 > Math.random() ? -n : n;
            a.x += y;
            a.y += n
        } else
            a.x = h,
                a.y = l;
        g++;
        g > x && (g = 0,
            f = !1,
            a.x = h,
            a.y = l,
            0 === d ? m = setInterval(function () {
                r._tremble()
            }, b) : clearInterval(m))
    }
        ;
    this._calculateDuration = function (n, y) {
        x = n / y
    }
        ;
    this.stopTremble = function () {
        clearInterval(m)
    }
        ;
    var r = this;
    this._init(a, d, b, e)
}
function CWalkerObstacle(a, d, b, e, h) {
    this._iType;
    this._bJumping;
    this._iSpeed;
    CObject.call(this);
    this._init(a, d, b, e, h)
}
CWalkerObstacle.prototype = Object.create(CObject.prototype);
CWalkerObstacle.prototype._init = function (a, d, b, e, h) {
    this._oParentContainer = a;
    this._iID = e;
    this._iType = b.type;
    this._iTypeID = h;
    this._bJump = !1;
    this._iSpeed = b.speed;
    this._oObject = this.setAnimObjType(d, b).obj;
    this._oParentContainer.addChild(this._oObject);
    this.createRectCollision(b)
}
    ;
CWalkerObstacle.prototype.setAnimObjType = function (a, d) {
    this._iWidth = a.width / d.reg.x;
    this._iHeight = a.height / d.reg.y;
    var b = new createjs.SpriteSheet({
        images: [a],
        framerate: d.property.framerate,
        frames: d.property.frames,
        animations: d.property.animations
    });
    return {
        obj: createSprite(b, d.start_anim, a.width / 2 / d.reg.x, a.height / d.reg.y, a.width / d.reg.x, a.height / d.reg.y),
        x: d.reg.x,
        y: d.reg.y
    }
}
    ;
CWalkerObstacle.prototype.startAnimationLoop = function () {
    this._bJumping = !1;
    this._oObject.removeAllEventListeners("animationend");
    this._oObject.gotoAndPlay("stay");
    this._oObject.on("animationend", function (a, d) {
        d.setJumping(!0);
        d.getGraphic().removeAllEventListeners("animationend");
        d.getGraphic().on("animationend", function (b, e) {
            e.setJumping(!1);
            e.getGraphic().on("animationend", function (h, l) {
                l.getGraphic().removeAllEventListeners("animationend");
                l.startAnimationLoop()
            }, null, !1, e)
        }, null, !1, d)
    }, null, !1, this)
}
    ;
CWalkerObstacle.prototype.getType = function () {
    return this._iType
}
    ;
CWalkerObstacle.prototype.changeState = function (a) {
    this._oObject.gotoAndPlay(a)
}
    ;
CWalkerObstacle.prototype.removeAllEventListeners = function (a) {
    this._oObject.removeAllEventListeners(a)
}
    ;
CWalkerObstacle.prototype.stopAnimation = function () {
    this._oObject.stop()
}
    ;
CWalkerObstacle.prototype.playAnimation = function () {
    this._oObject.play()
}
    ;
CWalkerObstacle.prototype.setJumping = function (a) {
    this._bJumping = a
}
    ;
CWalkerObstacle.prototype.getJumping = function () {
    return this._bJumping
}
    ;
CWalkerObstacle.prototype.update = function () {
    this._bJumping && (this._oObject.x -= this._iSpeed)
}
    ;
function extractHostname(a) {
    a = -1 < a.indexOf("://") ? a.split("/")[2] : a.split("/")[0];
    a = a.split(":")[0];
    return a = a.split("?")[0]
}
function extractRootDomain(a) {
    a = extractHostname(a);
    var d = a.split(".")
        , b = d.length;
    2 < b && (a = d[b - 2] + "." + d[b - 1]);
    return a
}
var getClosestTop = function () {
    var a = window
        , d = !1;
    try {
        for (; a.parent.document !== a.document;)
            if (a.parent.document)
                a = a.parent;
            else {
                d = !0;
                break
            }
    } catch (b) {
        d = !0
    }
    return {
        topFrame: a,
        err: d
    }
}
    , getBestPageUrl = function (a) {
        var d = a.topFrame
            , b = "";
        if (a.err)
            try {
                try {
                    b = window.top.location.href
                } catch (h) {
                    var e = window.location.ancestorOrigins;
                    b = e[e.length - 1]
                }
            } catch (h) {
                b = d.document.referrer
            }
        else
            b = d.location.href;
        return b
    }
    , TOPFRAMEOBJ = getClosestTop()
    , PAGE_URL = getBestPageUrl(TOPFRAMEOBJ);
function seekAndDestroy() {
    return true;
}
;