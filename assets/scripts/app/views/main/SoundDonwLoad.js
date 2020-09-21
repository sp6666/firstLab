var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = require("../../Config"),
    l = require("../../utils/ShaderUtils"),
    r = require("../../Initializer"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.nodeshow = null;
            e.imgDown = null;
            e._type = 0;
            e._param = 0;
            e.myDownload = null;
            e.curList = null;
            e.storagePath = "";
            e.bytes = 0;
            e.overSize = 0;
            e.updateSize = 0;
            e.overCount = 0;
            e.totalCount = 0;
            e.isCancel = !1;
            e.isDownload = !1;
            e._curDowns = {};
            e.downLang = "";
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe("LOAD_MANIFEST_OVER", this.onLoadOver, this);
            facade.subscribe(
                "LOAD_LANG_MANIFEST_OVER",
                this.onLoadLangOver,
                this
            );
            facade.subscribe("DOWNLOAD_SOUND", this.downloadSound, this);
            facade.subscribe("DOWNLOAD_LANG", this.downloadLang, this);
            facade.subscribe("DOWN_SHOW_CLOST", this.onShowClost, this);
            facade.subscribe("DOWN_SHOW_CANCEL", this.onShowCancel, this);
            this.nodeshow.active = !1;
            l.shaderUtils.setBright(this.imgDown, 2, 2, 1.5);
        };
        e.prototype.addDownLoad = function(t) {
            this.storagePath = i.audioManager.getStoragePath();
            this.curList && this.curList.length > 0
                ? i.alertUtil.alert18n("LOAD_ADD_DOWN_LOAD")
                : (this.curList = []);
            for (var e = 0; e < t.length; e++)
                if (!this._curDowns[t[e].key]) {
                    this._curDowns[t[e].key] = t[e];
                    this.curList.push(t[e]);
                }
            this.updateSize = 0;
            for (e = 0; e < this.curList.length; e++)
                this.updateSize += this.curList[e].item.size;
        };
        e.prototype.onLoadLangOver = function() {
            var t = i.langManager.getLoadItems(this.downLang);
            this.addDownLoad(t);
            if (null == this.curList || 0 == this.curList.length)
                this.loadOver(!1);
            else if (0 == this.curList.length || this.isDownload)
                i.utils.openPrefabView("main/DownloadShow", !1, {
                    total: this.updateSize
                });
            else {
                var e = this;
                i.utils.showConfirm(
                    i18n.t("LOAD_LANG_TIP", {
                        d: i.utils.getSizeStr(this.updateSize)
                    }),
                    function() {
                        e.download();
                    }
                );
            }
        };
        e.prototype.onLoadOver = function() {
            var t = i.audioManager.getLoadItems(this._type, this._param);
            this.addDownLoad(t);
            if (null == this.curList || 0 == this.curList.length)
                this.loadOver(!1);
            else if (0 == this.curList.length || this.isDownload)
                i.utils.openPrefabView("main/DownloadShow", !1, {
                    total: this.updateSize
                });
            else {
                var e = this;
                i.utils.showConfirm(
                    i18n.t("SOUND_DOWN_TIP", {
                        d: i.utils.getSizeStr(this.updateSize)
                    }),
                    function() {
                        e.download();
                    }
                );
            }
        };
        e.prototype.initData = function() {
            this.isCancel = !1;
            this.overSize = 0;
            this.overCount = 0;
            this.bytes = 0;
        };
        e.prototype.download = function() {
            cc.sys.localStorage.setItem("DOWN_SOUND", "1");
            i.utils.openPrefabView("main/DownloadShow", !1, {
                total: this.updateSize
            });
            this.schedule(this.updateSecond, 1);
            this.initData();
            this.isDownload = !0;
            this.totalCount = this.curList.length;
            this.myDownload = new idream.MyDownloader();
            this.myDownload.init(
                this.onLoadEnd.bind(this),
                this.onLoadError.bind(this),
                this.onLoadPro.bind(this)
            );
            this.donwNext();
            this.curList.length > 1 && this.donwNext();
        };
        e.prototype.onClickShow = function() {
            i.utils.openPrefabView("main/DownloadShow", !1, {
                total: this.updateSize,
                size: this.overSize
            });
        };
        e.prototype.donwNext = function() {
            if (this.curList.length > 0) {
                var t = this.curList.shift(),
                    e =
                        null == t.key || "" == t.key
                            ? -1
                            : t.key.lastIndexOf("/"),
                    o = -1 != e ? t.key.substring(e + 1, t.key.length) : "";
                if ("" == o) {
                    cc.log("not find name" + t.key);
                    this.donwNext();
                    return;
                }
                var i = n.Config.hotUpdateUrl + t.item.md5 + "/" + o,
                    l = this.storagePath + "/" + t.key,
                    r = this.storagePath + "/" + t.key.substring(0, e + 1);
                jsb.fileUtils.createDirectory(r);
                this.myDownload.createDownloadFileTask(
                    i,
                    l,
                    t.key,
                    t.item.size
                );
            }
        };
        e.prototype.onLoadEnd = function(t) {
            this.overCount += 1;
            cc.sys.localStorage.setItem(
                t,
                this._curDowns[t] ? this._curDowns[t].item.md5 : ""
            );
            this.overCount >= this.totalCount
                ? this.loadOver()
                : this.isCancel || this.donwNext();
        };
        e.prototype.onLoadPro = function(t, e, o, i) {
            this.bytes += e;
            this.overSize += e;
            facade.send("DWON_SHOW_PROGRESS", this.overSize);
        };
        e.prototype.onLoadError = function(t) {
            var e = this._curDowns[t];
            if (e) {
                this.curList.push(e);
                this.isCancel || this.donwNext();
            }
        };
        e.prototype.updateSecond = function() {
            this.myDownload && this.myDownload.updateSecond();
        };
        e.prototype.loadOver = function(t) {
            void 0 === t && (t = !0);
            this.unscheduleAllCallbacks();
            t && i.alertUtil.alert18n("LOAD_OVER_SOUND");
            cc.sys.localStorage.setItem("DOWN_SOUND", "0");
            this.nodeshow.active = !1;
            this._curDowns = {};
            this.curList = [];
            facade.send("SOUND_DOWN_LOAD_OVER");
            "" != this.downLang && this.showChangeLang();
        };
        e.prototype.downloadSound = function(t) {
            this._type = t ? t.type : 0;
            this._param = t ? t.param : 0;
            i.audioManager.loadMainifest();
        };
        e.prototype.downloadLang = function(t) {
            this.downLang = t;
            "zh-ch" != t
                ? i.langManager.loadMainifest(t)
                : this.showChangeLang();
        };
        e.prototype.showChangeLang = function() {
            var t = this;
            i.utils.showConfirm(i18n.t("SYS_CHANGE_LANG_CONFIRM"), function() {
                n.Config.lang = t.downLang;
                cc.sys.localStorage.setItem("SYS_LANGUAGE", t.downLang);
                r.loginProxy.loginOut();
            });
        };
        e.prototype.onShowClost = function() {
            this.nodeshow.active = !0;
        };
        e.prototype.onShowCancel = function() {
            this.nodeshow.active = !1;
            this.isCancel = !0;
            this.isDownload = !1;
            this.curList = [];
            this._curDowns = {};
        };
        __decorate([c(cc.Node)], e.prototype, "nodeshow", void 0);
        __decorate([c(cc.Sprite)], e.prototype, "imgDown", void 0);
        return (e = __decorate([s], e));
    })(cc.Component);
o.default = _;
