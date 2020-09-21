var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../Config"),
    n = require("../component/ConfirmView"),
    l = require("../Initializer"),
    r = (function () {
        function t() {
            this.BLACK = cc.Color.BLACK;
            this.WHITE = cc.Color.WHITE;
            this.GREEN = cc.Color.WHITE.fromHEX("#12F849");
            this.BLUE = cc.Color.WHITE.fromHEX("#0072f8");
            this.PURPLE = cc.Color.WHITE.fromHEX("#ea00ff");
            this.ORANGE = cc.Color.WHITE.fromHEX("#e55103");
            this.RED = cc.Color.WHITE.fromHEX("#DD1717");
            this.GOLDEN = cc.Color.WHITE.fromHEX("#FFC548");
            this.UNIQUE = cc.Color.WHITE.fromHEX("#FDFAF1");
            this.GRAY = cc.Color.WHITE.fromHEX("#AAAAAA");
            this.BLACK_GREEN = cc.Color.WHITE.fromHEX("#309c1b");
            this._uiMap = {};
            this._midLayer = null;
            this._topLayer = null;
            this._textCache = [];
            this._isExit = !1;
            this._loadPrefabs = {};
            this.isCollect = !1;
            this.releaseObjs = {};
            this.waitUI = null;
            this.poplist = [];
            this.isPop = !1;
        }
        t.prototype.index2color = function (t) {
            switch (t) {
                case 1:
                    return this.WHITE;

                case 2:
                    return this.BLACK_GREEN;

                case 3:
                    return this.BLUE;

                case 4:
                    return this.PURPLE;

                case 5:
                    return this.ORANGE;

                case 6:
                    return this.RED;

                case 7:
                    return this.GOLDEN;

                case 8:
                    return this.UNIQUE;
            }
            return t > 8 ? this.UNIQUE : this.GRAY;
        };
        t.prototype.formatMoney = function (t) {
            return null == t ?
                "0" :
                t < 1e5 ?
                t.toString() :
                t < 1e8 ?
                (t / 1e4).toFixed(2) + i18n.t("COMMON_WAN") :
                (t / 1e8).toFixed(2) + i18n.t("COMMON_YI");
        };
        t.prototype.copyData = function (t, e) {
            if (null != e && null != t)
                if (t instanceof Array && e instanceof Array)
                    this.copyList(t, e);
                else
                    for (var o in e) t[o] = null != e[o] ? e[o] : t[o];
        };
        t.prototype.copyList = function (t, e, o, i, n) {
            void 0 === o && (o = "id");
            void 0 === i && (i = !1);
            void 0 === n && (n = "");
            if (null != t && null != e)
                if (0 == e.length) t = e;
                else
                    for (var l = 0; l < e.length; l++) {
                        for (var r = !1, a = 0; a < t.length; a++)
                            if (
                                null != t[a] &&
                                null != e[l] &&
                                t[a][o] &&
                                e[l][o] &&
                                t[a][o] == e[l][o]
                            ) {
                                i && t[a][n] < e[l][n] && (e[l].isNew = !0);
                                this.copyData(t[a], e[l]);
                                r = !0;
                            }
                        if (!r && null != e[l]) {
                            e[l].isNew = !0;
                            t.push(e[l]);
                        }
                    }
        };
        t.prototype.getArea = function (t) {
            return t < 1e6 ? 999 : t % 1e6;
        };
        t.prototype.clearLayer = function () {
            this._midLayer = null;
            this._topLayer = null;
            var t = [];
            for (var e in this._uiMap) t.push(e);
            for (var o = 0; o < t.length; o++) this.closeNameView(t[o]);
            this._uiMap = {};
        };
        t.prototype.openPrefabView = function (t, e, n, l) {
            void 0 === e && (e = !1);
            void 0 === n && (n = null);
            void 0 === l && (l = !1);
            if (!this._isExit) {
                null == this._uiMap && (this._uiMap = {});
                if ("" != t) {
                    t = i.Config.skin + "/prefabs/ui/" + t;
                    null != this._uiMap[t] ?
                        this.setViewIndex(t) :
                        this.loadPrefabView(t, e, n, l);
                } else o.alertUtil.alert(i18n.t("MAIN_FUN_UNOPEN"));
            }
        };

        t.prototype.getViewNum = function () {
            if (this._midLayer) {
                return this._midLayer.childrenCount;
            }

            return 0;
        };

        t.prototype.setViewIndex = function (t) {
            var e = this._uiMap[t];
            e && e.parent && e.setSiblingIndex(e.parent.childrenCount - 1);
        };
        t.prototype.loadPrefabView = function (t, e, i, n) {
            void 0 === e && (e = !1);
            void 0 === i && (i = null);
            void 0 === n && (n = !1);
            var l = this;
            if (!this._loadPrefabs[t]) {
                this._loadPrefabs[t] = !0;
                cc.loader.loadRes(t, function (r, a) {
                    l._loadPrefabs[t] = !1;
                    if (null == r && a) {
                        var s = cc.instantiate(a);
                        if (s) {
                            s.__url = t;
                            s.openParam = i;
                            s.openTime = cc.sys.now();
                            s.show_main_effect = n;
                            l._uiMap[t] = s;
                            l.findTopLayer();
                            l._midLayer && !e ?
                                l._midLayer.addChild(s) :
                                e && l._topLayer && l._topLayer.addChild(s);
                            o.utils.showNodeEffect(s);
                        }
                    } else cc.warn(r + " name load error!!!");
                });
            }
        };
        t.prototype.findTopLayer = function () {
            if (null == this._midLayer) {
                var t = cc.director.getScene().getChildByName("Canvas");
                if (t) {
                    this._midLayer = t.getChildByName("midLayer");
                    this._topLayer = t.getChildByName("topLayer");
                }
            }
        };
        t.prototype.closeTopView = function () {
            if (!l.guideProxy.guideUI || l.guideProxy.guideUI.isHideShow()) {
                var t = null;
                null != this._topLayer &&
                    this._topLayer.childrenCount > 0 &&
                    (t = this._topLayer.children[
                        this._topLayer.childrenCount - 1
                    ]);
                "WaitHttp" == t.name && (t = null);
                null == t &&
                    null != this._midLayer &&
                    this._midLayer.childrenCount > 0 &&
                    (t = this._midLayer.children[
                        this._midLayer.childrenCount - 1
                    ]);
                if (null != t)
                    for (
                        var e = t.getComponents(cc.Component), o = 0; o < e.length; o++
                    ) {
                        cc.log(e[o].name);
                        if (0 == e[o].name.indexOf("StoryView")) break;
                        if (
                            "Widget" != e[o].name &&
                            "Animation" != e[o].name &&
                            "Button" != e[o].name
                        ) {
                            this.closeView(e[o]);
                            break;
                        }
                    }
            }
        };
        t.prototype.closeView = function (t, e) {
            void 0 === e && (e = !1);
            if (t.node.openTime && cc.sys.now() - t.node.openTime < 500)
                return !1;
            if (t && t.node && null == t.is_Show_Hide_Effect) {
                t.is_Show_Hide_Effect = !0;
                delete this._uiMap[t.node.__url];
                var n = this.showEffect(t, 1);
                t.enabled = !1;
                e = e || t.node.show_main_effect;
                var l = function () {
                    if (t.node) {
                        i.Config.DEBUG &&
                            cc.log(t.node.__url + " prefab destory !!!"); -
                        1 != t.node.__url.indexOf("StoryView") &&
                            facade.send("STORY_VIEW_DESOTRY");
                        t.node.destroy();
                        t.node.removeFromParent(!0);
                        o.utils.releaseAssetPrefab(t.node.__url);
                    }
                    e && facade.send("SHOW_OPEN_EFFECT");
                };
                "MainScene" == cc.director.getScene().name ?
                    facade.send("TIME_RUN_FUN", {
                        fun: l,
                        time: n
                    }) :
                    l();
                return !0;
            }
            return !1;
        };
        t.prototype.closeNameView = function (t, e) {
            void 0 === e && (e = !0);
            t = i.Config.skin + "/prefabs/ui/" + t;
            var n = this._uiMap[t];
            if (!(n && n.openTime && cc.sys.now() - n.openTime < 500) && n) {
                delete this._uiMap[t];
                i.Config.DEBUG && cc.log(t + " prefab destory !!!");
                var l = n.getComponent(cc.Component);
                if (null == l || l.is_Show_Hide_Effect) return;
                l.enabled = !1;
                l.is_Show_Hide_Effect = !0;
                var r = this.showEffect(l, 1),
                    a = function () {
                        i.Config.DEBUG &&
                            cc.log(n.__url + " prefab destory !!!");
                        n.destroy();
                        n.removeFromParent(!0);
                        o.utils.releaseAssetPrefab(n.__url);
                        e && facade.send("SHOW_OPEN_EFFECT");
                    };
                "MainScene" == cc.director.getScene().name ?
                    facade.send("TIME_RUN_FUN", {
                        fun: a,
                        time: r
                    }) :
                    a();
            }
        };
        t.prototype.releaseCollect = function () {
            if (this.isCollect) {
                cc.sys.isBrowser || cc.textureCache.removeUnusedTextures();
                this.isCollect = !1;
                this.releaseObjs = {};
                // cc.sys.garbageCollect();
            }
        };
        t.prototype.releaseAssetPrefab = function (t) {
            if (!cc.sys.isBrowser) {
                this.releaseAsset(t);
                this.releaseBgAsset();
                this.isCollect = !0;
            }
        };
        t.prototype.releaseAsset = function (t) {
            if (!cc.sys.isBrowser && !this.releaseObjs[t] && null != t) {
                this.releaseObjs[t] = 1;
                if (t.indexOf("/ico/")) this._textCache.push(t);
                else {
                    cc.loader.removeItem(t);
                    var e = cc.loader.getDependsRecursively(t);
                    if (null != e)
                        for (var o = 0; o < e.length; o++)
                            null != e[o] &&
                            -1 == e[o].indexOf("json") &&
                            -1 == e[o].indexOf("/ui/common/") &&
                            -1 == e[o].indexOf("/particle/") &&
                            -1 == e[o].indexOf("/temp/") &&
                            -1 == e[o].indexOf("/ui/main/") &&
                            -1 == e[o].indexOf("/ui/icon/") &&
                            ((-1 != e[o].indexOf("json") &&
                                    -1 == e[o].indexOf("/spine/")) ||
                                this._textCache.push(e[o]));
                    cc.loader.releaseRes(t);
                }
            }
        };
        t.prototype.releaseBgAsset = function () {
            for (var t = 0; t < this._textCache.length; t++) {
                cc.loader.removeItem(this._textCache[t]);
                cc.loader.release(this._textCache[t]);
            }
            this._textCache = [];
        };
        t.prototype.isOpenView = function (t) {
            t = i.Config.skin + "/prefabs/ui/" + t;
            return null != this._uiMap[t];
        };
        t.prototype.showNodeEffect = function (t, e) {
            void 0 === e && (e = 0);
            if (null != t) {
                var o = t.getComponent(cc.Animation);
                if (o) {
                    var i = o.getClips(); -
                    1 == e && (e = Math.floor(Math.random() * i.length)); -
                    1 != e &&
                        i.length > 2 &&
                        i.length % 2 == 0 &&
                        (e += 2 * Math.floor((Math.random() * i.length) / 2));
                    var n = i[e];
                    n && o.play(n.name);
                }
            }
        };
        t.prototype.showEffect = function (t, e, o) {
            if (null != t) {
                var i = t.node.getComponent(cc.Animation),
                    n = 0;
                if (i) {
                    var l = i.getClips()[e];
                    if (l) {
                        i.play(l.name);
                        n = l.duration;
                    }
                }
                o && (n > 0.05 ? t.scheduleOnce(o, n - 0.05) : o.apply(t));
                return n;
            }
        };
        t.prototype.showSpine = function (node, animName, isloop, callbackfun) {
            if (node == null)
                return;
            if (node.node == null || node.node == undefined)
                return;

            var sln = node.node.getComponent(sp.Skeleton);
            if (sln == null || sln == undefined)
                return;

            sln.setAnimation(0, animName, isloop);

            if (isloop != null && isloop != true && callbackfun != null) {
                sln.setCompleteListener((trackEntry, loopCount) => {
                    callbackfun();
                });
            }
        };
        t.prototype.getParamStr = function (t) {
            var e = localcache.getItem(localdb.table_param, t);
            return e ? e.param + "" : "";
        };
        t.prototype.getParamInt = function (t) {
            var e = localcache.getItem(localdb.table_param, t);
            return e ? parseInt(e.param) : 0;
        };
        t.prototype.getParamStrs = function (t, e, i) {
            void 0 === e && (e = "|");
            void 0 === i && (i = ",");
            for (
                var n = this.getParamStr(t).split(e), l = [], r = 0; r < n.length; r++
            )
                if (o.stringUtil.isBlank(i)) l.push(n[r]);
                else {
                    for (
                        var a = n[r].split(i), s = [], c = 0; c < a.length; c++
                    )
                        s.push(a[c]);
                    l.push(s);
                }
            return l;
        };
        t.prototype.showSingeConfirm = function (t, e, o, i, n) {
            void 0 === o && (o = null);
            void 0 === i && (i = null);
            void 0 === n && (n = null);
            var l = new a();
            l.txt = t;
            l.target = o;
            l.handler = e;
            l.color = i;
            l.left = n;
            this.openPrefabView("ConfirmRetry", !0, l);
        };

        t.prototype.showSingleBigConfirm = function (t, e, o, i, n) {
            void 0 === o && (o = null);
            void 0 === i && (i = null);
            void 0 === n && (n = null);
            var l = new a();
            l.txt = t;
            l.target = o;
            l.handler = e;
            l.color = i;
            l.left = n;
            this.openPrefabView("ConfirmBigRetry", !0, l);
        };

        t.prototype.showConfirm = function (t, e, o, i, n, l) {
            void 0 === o && (o = null);
            void 0 === i && (i = null);
            void 0 === n && (n = null);
            void 0 === l && (l = null);
            var r = new a();
            r.txt = t;
            r.target = o;
            r.handler = e;
            r.color = i;
            r.left = n;
            r.right = l;
            this.openPrefabView("ConfirmView", !0, r);
        };

        t.prototype.showConfirmReport = function (text, textMid, e, o, i, n, l) {
            void 0 === o && (o = null);
            void 0 === i && (i = null);
            void 0 === n && (n = null);
            void 0 === l && (l = null);
            var r = new a();
            r.txt = text;
            r.txtMid = textMid;
            r.target = o;
            r.handler = e;
            r.color = i;
            r.left = n;
            r.right = l;
            this.openPrefabView("ConfirmReportView", !0, r);
        };

        t.prototype.showConfirmItem = function (t, e, o, i, l, r, s, c, _) {
            void 0 === l && (l = "");
            void 0 === r && (r = null);
            void 0 === s && (s = null);
            void 0 === c && (c = null);
            void 0 === _ && (_ = null);
            var d = new a();
            d.txt = t;
            d.itemId = e;
            d.count = o;
            d.target = r;
            d.handler = i;
            d.color = s;
            d.left = c;
            d.right = _;
            d.skip = l;
            n.default.isSkip(d) || this.openPrefabView("ConfirmItem", !1, d);
        };
        t.prototype.showConfirmItemMore = function (t, e, o, i, n, l, r, s, c) {
            void 0 === n && (n = null);
            void 0 === l && (l = null);
            void 0 === r && (r = null);
            void 0 === s && (s = null);
            void 0 === c && (c = 0);
            var _ = new a();
            _.txt = t;
            _.itemId = e;
            _.count = o < 1 ? 1 : o;
            _.target = n;
            _.handler = i;
            _.color = l;
            _.left = r;
            _.right = s;
            _.baseCount = c;
            this.openPrefabView("ConfirmItemMore", !1, _);
        };
        t.prototype.showConfirmInput = function (t, e, o, i, n, l) {
            void 0 === o && (o = null);
            void 0 === i && (i = null);
            void 0 === n && (n = null);
            void 0 === l && (l = null);
            var r = new a();
            r.txt = t;
            r.target = o;
            r.handler = e;
            r.color = i;
            r.left = n;
            r.right = l;
            this.openPrefabView("ConfirmInput", !1, r);
        };
        t.prototype.getHanzi = function (t) {
            var e = i18n.t("COMMON_HANZI").split("|");
            if (t > 10) var o = t % 10;
            else o = t;
            if (t > 19) {
                return (
                    e[Math.floor(t / 10) - 1] +
                    e[9] +
                    (t % 10 == 0 ? "" : e[(t % 10) - 1])
                );
            }
            return (t > 10 ? e[9] : "") + e[o - 1];
        };
        t.prototype.setClostBtn = function (t, e) {
            if (null != t && null != e) {
                var o = t.node.getComponent(cc.Animation);
                if (o) {
                    var i = o.getClips()[0].duration;
                    if (0 != i) {
                        e.interactable = !1;
                        t.scheduleOnce(function () {
                            e.interactable = !0;
                        }, i);
                    }
                }
            }
        };
        t.prototype.setWaitUI = function () {
            if (this.waitUI) {
                this.waitUI.removeFromParent(!0);
                this.waitUI.destroy();
                this.waitUI = null;
            }
            var t = i.Config.skin + "/prefabs/ui/WaitHttp",
                e = this;
            this.findTopLayer();
            cc.loader.loadRes(t, function (t, o) {
                if (null != o) {
                    var i = cc.instantiate(o);
                    e.waitUI = i;
                    if (null != e._topLayer) {
                        i.active = !1;
                        e._topLayer.addChild(i);
                    } else {
                        var n = cc.director.getScene().getChildByName("Canvas");
                        i.active = !1;
                        n.addChild(i);
                    }
                    JsonHttp.setWaitUI(i.getComponent(cc.Component));
                } else cc.warn(t + " name load error!!!");
            });
        };
        t.prototype.popView = function (t, e) {
            o.stringUtil.isBlank(t) ||
                this.poplist.push({
                    url: t,
                    openParam: e
                });
        };
        t.prototype.popNext = function (t) {
            if (!this.isPop || !t) {
                this.isPop = !0;
                if (0 != this.poplist.length) {
                    for (
                        var e = 0, o = [], i = [], n = 0; n < this.poplist.length; n++
                    ) {
                        if ("AlertItemShow" == (l = this.poplist[n]).url) {
                            e++;
                            o.push(l.openParam);
                            i.push(n);
                        }
                    }
                    if (e > 1) {
                        for (n = i.length - 1; n >= 0; n--)
                            this.poplist.splice(i[n], 1);
                        this.openPrefabView("AlertItemMore", !1, o);
                    } else {
                        var l = this.poplist.shift();
                        this.openPrefabView(l.url, !1, l.openParam);
                    }
                } else this.isPop = !1;
            }
        };
        t.prototype.getSizeStr = function (t) {
            null == t && (t = 0);
            return t > 1048576 ?
                (t / 1024 / 1024).toFixed(2) + "M" :
                (t / 1024).toFixed(1) + "KB";
        };
        t.prototype.getWorldPos = function (t, e) {
            void 0 === e && (e = null);
            for (var o = cc.v2(t.x, t.y);
                (t = t.parent) != e && null != t;) {
                o.x += t.x;
                o.y += t.y;
            }
            return o;
        };
        t.prototype.randomArray = function (t) {
            t.sort(function (t, e) {
                return 10 * Math.random() < 5 ? 1 : -1;
            });
        };
        t.prototype.setCanvas = function () {
            var t = cc.winSize;
            if (t.width / t.height > 0.5625) {
                var e = cc.director
                    .getScene()
                    .getChildByName("Canvas")
                    .getComponent(cc.Canvas);
                e && (e.fitHeight = !0);
            }
        };
        return t;
    })();
o.Utils = r;
o.utils = new r();
var a = function () {
    this.txt = "";
    this.handler = null;
    this.target = null;
    this.itemId = 0;
    this.count = 0;
    this.color = null;
    this.skip = "";
    this.left = "";
    this.right = "";
    this.baseCount = 0;
};
o.ConfirmData = a;
var s = (function () {
    function t() {
        this.alertPrefabmap = {};
        this.alertList = new Array();
    }
    t.prototype.alert = function (t, e, o) {
        this.alertBy("AlertUI", {
            text: t,
            textOpt: e,
            textColor: o
        });
    };
    t.prototype.alert18n = function (t, e) {
        this.alert(t, {}, e);
    };
    t.prototype.alertItemLimit = function (t, e) {
        void 0 === e && (e = 0);
        var o = localcache.getItem(localdb.table_item, t);
        o &&
            this.alert("COMMON_LIMIT", {
                n: o.name
            });
        facade.send("ITEM_LIMIT_GO", {
            id: t,
            count: e
        });
    };
    t.prototype.alertIcon = function (t, e, o) {
        this.alertBy("AlertIcon", {
            text: t,
            url: e,
            textColor: o
        });
    };
    t.prototype.alertBy = function (t, e) {
        if (null != this.alertPrefabmap[t]) this.alertShow(t, e);
        else {
            var o = i.Config.skin + "/prefabs/ui/" + t,
                n = this;
            cc.loader.loadRes(o, function (o, i) {
                if (null != i) {
                    n.alertPrefabmap[t] = i;
                    n.alertShow(t, e);
                } else cc.warn(o + " name load error!!!");
            });
        }
    };
    t.prototype.alertShow = function (t, e) {
        var o = cc.instantiate(this.alertPrefabmap[t]);
        if (o) {
            o.y = 100;
            var i = o.getComponent(t);
            for (var n in e) i ? (i[n] = e[n]) : cc.log(t + " is not find");
            this.alertAddToQueue(o, i);
        } else cc.warn("alert show " + t + " is error!!!");
    };
    t.prototype.alertAddToQueue = function (t, e) {
        var o = this;
        e.endCall = function () {
            o.alertList.splice(o.alertList.indexOf(e), 1);
        };
        cc.director
            .getScene()
            .getChildByName("Canvas")
            .addChild(t);
        this.alertList.push(e);
        for (
            var i = t.height + 60, n = 0, l = this.alertList.length - 1; n < l; n++
        )
            this.alertList[n] &&
            this.alertList[n].node &&
            (this.alertList[n].node.y += i);
    };
    return t;
})();
o.Alert = s;
o.alertUtil = new s();
var c = (function () {
    function t() {}
    t.prototype.trim = function (t) {
        return t.replace(/(^\s*)|(\s*$)/g, "");
    };
    t.prototype.isBlank = function (t) {
        return (
            null == t ||
            "" == t ||
            " " == t ||
            "0" == t ||
            "null" == t ||
            "undefined" == t
        );
    };
    t.prototype.hasLimit = function (t) {
        for (
            var e = ["|", "#", "<", ">", "%", "*", "/", "\\", "="],
                o = 0,
                i = e.length; o < i; o++
        )
            if (t.indexOf(e[o]) >= 0) return !0;
        return !1;
    };
    t.prototype.hasBlank = function (t) {
        for (
            var e = ["\n", "\r", "\t", "\f", " ", "　"], o = 0, i = e.length; o < i; o++
        )
            if (t.indexOf(e[o]) >= 0) return !0;
        return !1;
    };
    t.prototype.hasEmoji = function (t) {
        return t.indexOf("\ud83c") >= 0 || t.indexOf("\ud83d") >= 0;
    };
    return t;
})();
o.StringUtil = c;
o.stringUtil = new c();
var _ = (function () {
    function t() {
        this._timezoneServer = 8;
        this._timezoneClient = 8;
        this._timezoneOffset = 0;
        this._timeServer = 0;
        this._timeClient = 0;
        this._timeOfMonday = 0;
    }
    t.prototype.init = function (t, e) {
        this.setServerTime(e);
        this._timezoneServer = t;
        this._timezoneClient = -new Date().getTimezoneOffset() / 60;
        this._timezoneOffset =
            36e5 * (this._timezoneClient - this._timezoneServer);
        this._timeOfMonday = this.timeAtHMS(Date.UTC(2015, 11, 28) / 1e3);
    };
    t.prototype.setServerTime = function (t) {
        this._timeServer = t;
        this._timeClient = Math.floor(cc.sys.now() / 1e3);
    };
    Object.defineProperty(t.prototype, "second", {
        get: function () {
            return (
                this._timeServer +
                Math.floor(cc.sys.now() / 1e3) -
                this._timeClient
            );
        },
        enumerable: !0,
        configurable: !0
    });
    t.prototype.getCurSceond = function () {
        return (
            this._timeServer + Math.floor(cc.sys.now() / 1e3) - this._timeClient
        );
    };
    t.prototype.getTodaySecond = function (t, e, o) {
        void 0 === t && (t = 0);
        void 0 === e && (e = 0);
        void 0 === o && (o = 0);
        null == t && (t = 0);
        null == e && (e = 0);
        null == o && (o = 0);
        return this.timeAtHMS(this.second, t, e, o);
    };
    t.prototype.timeAtHMS = function (t, e, o, i) {
        e = e || 0;
        o = o || 0;
        i = i || 0;
        var n = t % 86400,
            l = t - n,
            r = Math.floor(n / 3600);
        r + this._timezoneServer < 0 ?
            (l -= 86400) :
            r + this._timezoneServer >= 24 && (l += 86400);
        return l + 3600 * (e - this._timezoneServer) + 60 * o + i;
    };
    t.prototype.isSameWeek = function (t, e) {
        return (
            !(t - e >= 604800) &&
            (t - this._timeOfMonday) / 604800 ==
            (e - this._timeOfMonday) / 604800
        );
    };
    t.prototype.hms2second = function (t) {
        var e = t.split(":"),
            o = e.length,
            i = 0;
        o > 0 && (i += 3600 * parseInt(e[0]));
        o > 1 && (i += 60 * parseInt(e[1]));
        o > 2 && (i += parseInt(e[2]));
        return i;
    };
    t.prototype.second2hms = function (t, e) {
        if (t > 86400 && null == e) {
            var o = t % 86400;
            o = Math.floor(o / 3600);
            return (
                i18n.t("COMMON_DAY", {
                    d: Math.floor(t / 86400)
                }) +
                (o > 0 ?
                    i18n.t("COMMON_HOUR", {
                        d: o
                    }) :
                    "")
            );
        }
        var i = Math.floor(t / 3600),
            n = Math.floor((t - 3600 * i) / 60),
            l = t % 60,
            r = e || "HH:mm:ss";
        "HH:mm" == r && t < 60 && (r = "ss");
        return (
            (r = (r = (r = r.replace("HH", this.fix2(i))).replace(
                "mm",
                this.fix2(n)
            )).replace("ss", this.fix2(l))) + ("ss" == r ? "s" : "")
        );
    };

    t.prototype.second2hmsSimple = function (t) {
        if (t > 86400) {
            return (
                i18n.t("COMMON_DAY", {
                    d: Math.floor(t / 86400)
                })
            );
        } else if (t > 3600) {
            var o = Math.floor(t / 3600);
            return i18n.t("COMMON_HOUR", {
                d: o
            });
        } else if (t > 0) {
            var o = Math.floor(t / 60);
            return i18n.t("WELFARE_ONLINE_TIME", {
                d: o
            });

        } else {
            return i18n.t("WELFARE_ONLINE_TIME", {
                d: 1
            });
        }
    };

    t.prototype.str2Second = function (t) {
        var e = t.split(" "),
            o = e[0].split("-"),
            i = e[1].split(":");
        return (
            (new Date(
                    Math.floor(parseInt(o[0])),
                    Math.floor(parseInt(o[1])) - 1,
                    Math.floor(parseInt(o[2])),
                    Math.floor(parseInt(i[0])),
                    Math.floor(parseInt(i[1])),
                    Math.floor(parseInt(i[2]))
                ).getTime() +
                this._timezoneOffset) /
            1e3
        );
    };
    t.prototype.format = function (t, e) {
        var o = new Date();
        o.setTime(1e3 * t - this._timezoneOffset);
        var i = e || "yyyy-MM-dd HH:mm:ss";
        return (i = (i = (i = (i = (i = (i = i.replace(
            "yyyy",
            o.getFullYear() + ""
        )).replace("MM", this.fix2(o.getMonth() + 1))).replace(
            "dd",
            this.fix2(o.getDate())
        )).replace("HH", this.fix2(o.getHours()))).replace(
            "mm",
            this.fix2(o.getMinutes())
        )).replace("ss", this.fix2(o.getSeconds())));
    };
    t.prototype.fix2 = function (t) {
        return t < 10 ? "0" + t : "" + t;
    };
    t.prototype.getCurMonth = function () {
        var t = new Date();
        t.setTime(1e3 * this.second - this._timezoneOffset);
        var e = this.fix2(t.getMonth() + 1);
        return parseInt(e);
    };
    t.prototype.getCurData = function () {
        var t = (this.second - this._timeOfMonday) % 604800;
        return Math.floor(t / 86400) + 1;
    };
    t.prototype.getDateDiff = function (t) {
        var e = this.second - t;
        return e < 0 || e < 60 ?
            i18n.t("TIME_MOMENT_AGO") :
            e < 3600 ?
            i18n.t("TIME_SECOND_AGO", {
                s: Math.floor(e / 60)
            }) :
            e < 86400 ?
            i18n.t("TIME_HOUR_AGO", {
                s: Math.floor(e / 3600)
            }) :
            e < 2592e3 ?
            i18n.t("TIME_DAY_AGO", {
                s: Math.floor(e / 86400)
            }) :
            i18n.t("TIME_MONTH_AGO", {
                s: Math.floor(e / 2592e3)
            });
    };
    return t;
})();
o.TimeUtil = _;
o.timeUtil = new _();
var d = (function () {
    function t() {
        this._bgm = -1;
        this._bgmCurrent = null;
        this._bgmBase = null;
        this._soundLoads = {};
        this._isSoundOff = !1;
        this._isSayOff = !1;
        this._isBlank = !1;
        this._isRole = !1;
        this._isNpc = !1;
        this._bgmVolume = 1;
        this._lastSound = -1;
        this._getSoundPath = function (t) {
            if (-1 != t.indexOf("/") && -1 != t.indexOf("/res/")) return t;
            if (null != localcache.getItem(localdb.table_voiceDown, t)) {
                if (cc.sys.isBrowser)
                    return cc.url.raw(
                        "resources/" +
                        i.Config.skin +
                        "/res/audio_down/" +
                        t +
                        ".mp3"
                    );
                var e =
                    this.storagePath +
                    "/res/raw-assets/resources/" +
                    i.Config.skin +
                    "/res/audio_down/" +
                    t +
                    ".mp3";
                return jsb.fileUtils.isFileExist(e) ?
                    e :
                    cc.url.raw(
                        "resources/" +
                        i.Config.skin +
                        "/res/audio_down/" +
                        t +
                        ".mp3"
                    );
            }
            return cc.url.raw(
                "resources/" + i.Config.skin + "/res/audio/" + t + ".mp3"
            );
        };
        this.preloadSound = function (t) {
            if (
                !this._isSoundOff &&
                !o.stringUtil.isBlank(t) &&
                !this._soundLoads[t]
            ) {
                this._soundLoads[t] = !0;
                cc.audioEngine.preload(this._getSoundPath(t));
            }
        };
        this.sound_json = null;
        this.storagePath = "";
    }
    t.prototype.setBGMVolume = function (t) {
        this._bgmVolume = t;
    };
    t.prototype.setSoundOff = function (t) {
        this._isSoundOff = t; -
        1 != this._bgm &&
            cc.audioEngine.setVolume(
                this._bgm,
                this._isSoundOff ? 0 : this._bgmVolume
            );
    };
    t.prototype.playBGM = function (t, e) {
        void 0 === e && (e = !1);
        e && (this._bgmBase = t);
        if (this._bgmCurrent != t) {
            o.stringUtil.isBlank(this._bgmCurrent) ||
                this._bgmCurrent == this._bgmBase ||
                cc.sys.isBrowser ||
                cc.audioEngine.uncache(this._getSoundPath(this._bgmCurrent));
            this._bgmCurrent = t;
            if (this._bgm >= 0) {
                cc.audioEngine.stop(this._bgm);
                this._bgm = -1;
            }
            o.stringUtil.isBlank(t) ||
                (this._bgm = cc.audioEngine.play(
                    this._getSoundPath(t),
                    !0,
                    this._isSoundOff ? 0 : this._bgmVolume
                ));
        }
    };
    t.prototype.stopBGM = function (t) {
        if (t) this.playBGM(this._bgmBase);
        else if (-1 != this._bgm) {
            cc.audioEngine.stop(this._bgm);
            this._bgm = 0;
            this._bgmCurrent = null;
            this._bgmBase = null;
        }
    };
    t.prototype.isPlayLastSound = function () {
        return -1 != this._lastSound;
    };
    t.prototype.playSound = function (t, e, i, n) {
        var l = this;
        void 0 === e && (e = !1);
        void 0 === i && (i = !1);
        if (!o.stringUtil.isBlank(t)) {
            if (e && -1 != this._lastSound) {
                cc.audioEngine.stop(this._lastSound);
                0 != this._bgm &&
                    cc.audioEngine.setVolume(
                        this._bgm,
                        this._isSoundOff ? 0 : this._bgmVolume
                    );
            }
            if (!this._isSayOff) {
                var r = this._getSoundPath(t);
                this._lastSound = cc.audioEngine.play(
                    r,
                    !1,
                    this._isSayOff ? 0 : this._bgmVolume
                );
                if (i && -1 != this._bgm) {
                    cc.audioEngine.setVolume(
                        this._bgm,
                        this._isSoundOff ? 0 : this._bgmVolume / 2
                    );
                    var a = this;
                    cc.audioEngine.setFinishCallback(
                        this._lastSound,
                        function () {
                            -1 != a._bgm &&
                                cc.audioEngine.setVolume(
                                    a._bgm,
                                    l._isSoundOff ? 0 : l._bgmVolume / 2
                                );
                            null != n && n();
                            cc.sys.isBrowser || cc.audioEngine.uncache(r);
                            a._lastSound = -1;
                        }
                    );
                }
            }
        }
    };
    t.prototype.playClickSound = function () {
        this._isSoundOff ||
            cc.audioEngine.play(
                this._getSoundPath(i.Config.clickBtnSound),
                !1,
                this._bgmVolume
            );
    };
    t.prototype.getStoragePath = function () {
        "" == this.storagePath &&
            (this.storagePath =
                (jsb.fileUtils ? jsb.fileUtils.getWritablePath() : "/") +
                "update-assets");
        return this.storagePath;
    };
    t.prototype.isExitManifest = function () {
        return null != this.sound_json;
    };
    t.prototype.loadMainifest = function () {
        if (!cc.sys.isBrowser)
            if (null == this.sound_json) {
                this.storagePath =
                    (jsb.fileUtils ? jsb.fileUtils.getWritablePath() : "/") +
                    "update-assets";
                var t =
                    this.storagePath +
                    "/res/raw-assets/resources/" +
                    i.Config.skin +
                    "/res/sound.json",
                    e = this;
                if (jsb.fileUtils.isFileExist(t))
                    cc.loader.load(t, function (t, i) {
                        if (null == t) {
                            e.sound_json = i;
                            facade.send("LOAD_MANIFEST_OVER", null, !0);
                        } else o.alertUtil.alert(t.toString());
                    });
                else {
                    t = i.Config.skin + "/res/sound";
                    cc.loader.loadRes(t, function (t, i) {
                        if (null == t) {
                            e.sound_json = i;
                            facade.send("LOAD_MANIFEST_OVER", null, !0);
                        } else o.alertUtil.alert(t.toString());
                    });
                }
            } else facade.send("LOAD_MANIFEST_OVER");
    };
    t.prototype.isNeedDown = function () {
        if (cc.sys.isBrowser) return !1;
        if ("1" == cc.sys.localStorage.getItem("DOWN_SOUND")) return !0;
        if (
            jsb.fileUtils.isDirectoryExist(
                cc.url.raw("resources/" + i.Config.skin + "/res/audio_down/")
            )
        )
            return !1;
        this.storagePath =
            (jsb.fileUtils ? jsb.fileUtils.getWritablePath() : "/") +
            "update-assets";
        return !jsb.fileUtils.isDirectoryExist(
            this.storagePath +
            "/res/raw-assets/resources/" +
            i.Config.skin +
            "/res/audio_down/"
        );
    };
    t.prototype.isNeedDownType = function (t, e) {
        if (cc.sys.isBrowser) return !1;
        if (null == this.sound_json) {
            this.loadMainifest();
            return !1;
        }
        var o = this.getLoadItems(t, e);
        return o && o.length > 0;
    };
    t.prototype.getLoadItems = function (t, e) {
        var o = localcache.getList(localdb.table_voiceDown),
            n = [];
        if (cc.sys.isBrowser) return null;
        cc.log(t, e);
        var l = jsb.fileUtils.isDirectoryExist(
            cc.url.raw("resources/" + i.Config.skin + "/res/audio_down/")
        );
        if (0 == t)
            for (var r in this.sound_json.assets) {
                var a = this.storagePath + "/" + r,
                    s = this.sound_json.assets[r],
                    c = r.replace("res/raw-assets/", ""),
                    _ = cc.url.raw(c);
                jsb.fileUtils.isFileExist(a) ||
                    null == s ||
                    (l && jsb.fileUtils.isFileExist(_)) ||
                    n.push({
                        key: r,
                        item: s
                    });
            }
        else
            for (var d = 0; d < o.length; d++)
                if (o[d].type == t && e == o[d].para) {
                    (r =
                        "res/raw-assets/resources/" +
                        i.Config.skin +
                        "/res/audio_down/" +
                        o[d].id +
                        ".mp3"),
                    (a = this.storagePath + "/" + r),
                    (_ = cc.url.raw(
                        "resources/" +
                        i.Config.skin +
                        "/res/audio_down/" +
                        o[d].id +
                        ".mp3"
                    )),
                    (s = this.sound_json.assets[r]);
                    jsb.fileUtils.isFileExist(a) ||
                        null == s ||
                        (l && jsb.fileUtils.isFileExist(_)) ||
                        n.push({
                            key: r,
                            item: s
                        });
                }
        return n;
    };
    return t;
})();
o.AudioManager = d;
o.audioManager = new d();
var u = (function () {
    function t() {
        this.lang_json = {};
        this.lang_ojson = {};
        this.storagePath = "";
        this.loadHandler = null;
    }
    t.prototype.getStoragePath = function () {
        "" == this.storagePath &&
            (this.storagePath =
                (jsb.fileUtils ? jsb.fileUtils.getWritablePath() : "/") +
                "update-assets");
        return this.storagePath;
    };
    t.prototype.loadMainifest = function (t, e) {
        void 0 === e && (e = null);
        if (!cc.sys.isBrowser) {
            this.loadHandler = e;
            if (null == this.lang_json[t] || null == this.lang_ojson[t]) {
                this.getStoragePath();
                var o =
                    this.storagePath +
                    "/res/raw-assets/resources/" +
                    i.Config.skin +
                    "/res/" +
                    t +
                    ".json",
                    n = this;
                cc.loader.load(o, function (e, o) {
                    if (null == e && null != o) {
                        n.lang_json[t] = o;
                        n.loadOver(t);
                    } else {
                        cc.log(e);
                        n.lang_json[t] = {};
                        n.loadOver(t);
                    }
                });
                o = i.Config.skin + "/res/" + t;
                cc.loader.loadRes(o, function (e, o) {
                    if (null == e && null != o) {
                        n.lang_ojson[t] = o;
                        n.loadOver(t);
                    } else {
                        cc.log(e);
                        n.lang_ojson[t] = {};
                        n.loadOver(t);
                    }
                });
            } else {
                facade.send("LOAD_LANG_MANIFEST_OVER", t);
                null != this.loadHandler && this.loadHandler(t);
            }
        }
    };
    t.prototype.loadOver = function (t) {
        if (null != this.lang_json[t] && null != this.lang_ojson[t]) {
            facade.send("LOAD_LANG_MANIFEST_OVER", t);
            null != this.loadHandler && this.loadHandler(t);
        }
    };
    t.prototype.getLoadItems = function (t) {
        if (cc.sys.isBrowser) return null;
        var e = this.lang_json[t],
            o = this.lang_ojson[t];
        if (null == e && null == o) return [];
        var i = [],
            n = e.assets ? e.assets : o.assets;
        for (var l in n) {
            var r = e && e.assets ? e.assets[l] : null,
                a = o && o.assets ? o.assets[l] : null,
                s = this.storagePath + "/" + l,
                c = !1,
                _ = r || a;
            if (null != r && null == a)
                c =
                cc.sys.localStorage.getItem(l) != r.md5 ||
                !jsb.fileUtils.isFileExist(s);
            else if (null == r && null != a) {
                var d = l.replace("res/raw-assets/", ""),
                    u = cc.url.raw(d);
                c =
                    cc.sys.localStorage.getItem(l) != a.md5 ||
                    !jsb.fileUtils.isFileExist(u);
            } else if (null != r && null != a) {
                (d = l.replace("res/raw-assets/", "")), (u = cc.url.raw(d));
                c =
                    cc.sys.localStorage.getItem(l) != r.md5 ||
                    !jsb.fileUtils.isFileExist(u) ||
                    !jsb.fileUtils.isFileExist(s);
            }
            c &&
                i.push({
                    key: l,
                    item: _
                });
        }
        return i;
    };
    t.prototype.clearLang = function (t) {
        if (cc.sys.isBrowser) return null;
        var e = this.lang_json[t];
        if (null != e)
            for (var o in e) cc.sys.localStorage.setItem(o, "");
    };
    return t;
})();
o.LangManager = u;
o.langManager = new u();