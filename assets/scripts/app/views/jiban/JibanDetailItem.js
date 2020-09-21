var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../component/UrlLoad"),
    l = require("../../Initializer"),
    r = require("../../utils/UIUtils"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblName = null;
            e.lblPro = null;
            e.lblLv = null;
            e.title_bg = null;
            e.jiban_title = null;
            e.word = null;
            e.bar = null;
            e.btn = null;
            e.nodeLock = null;
            e.lblLock = null;
            e.nodeNew = null;
            e.lblExp = null;
            e.yuyin = null;
            return e;
        }
        e.prototype.onLoad = function() {
            this.addBtnEvent(this.btn);
        };
        e.prototype.showData = function() {
            var t = this._data,
                e = localcache.getItem(localdb.table_heropve, t.id);
            if (e) {
                this.yuyin.active = e.voice > 0;
                this.lblName.string = e.name;
                var o = l.jibanProxy.isOverStory(e.id),
                    i = l.jibanProxy.getJibanIsOpen(e);
                this.nodeLock.active = !i;
                this.lblLv.node.active = 0 != e.star;
                this.bar.node.active = 0 != e.star;
                this.lblPro.node.active = 0 != e.star;
                this.nodeNew.active = !o && i;
                this.lblLv.string = i18n.t("SERVANT_JI_BAN_ITEM_LEVEL_TXT", {
                    lv: t.level
                });
                if (0 == e.star)
                    this.lblLock.string = i ? "" : this.getUnlockString();
                else {
                    var n = l.jibanProxy.getJbItemAddPro(t.id, t.level);
                    this.lblPro.string = i18n.t("SERVANT_JI_BAN_SHU_XING_ADD", {
                        name: i18n.t("COMMON_PROP" + n.pro),
                        value: n.value
                    });
                    var a = localcache.getItem(
                        localdb.table_heropveJbLevel,
                        t.level
                    );
                    if (a) {
                        this.bar.progress = t.exp / a.story_num;
                        this.lblExp.string = i18n.t("COMMON_NUM", {
                            f: t.exp,
                            s: a.story_num
                        });
                    }
                }
                this.title_bg.url = r.uiHelps.getJbTitleBg(e.star);
                this.jiban_title.url = r.uiHelps.getJbTitle(e.star);
                this.word.url = r.uiHelps.getJbTitleWord(e.star);
                1 == e.star
                    ? (this.lblPro.node.color = this.lblLv.node.color = cc.color(
                          10,
                          53,
                          64
                      ))
                    : 2 == e.star
                    ? (this.lblPro.node.color = this.lblLv.node.color = cc.color(
                          42,
                          10,
                          64
                      ))
                    : 3 == e.star
                    ? (this.lblPro.node.color = this.lblLv.node.color = cc.color(
                          87,
                          9,
                          9
                      ))
                    : 4 == e.star &&
                      (this.lblPro.node.color = this.lblLv.node.color = cc.color(
                          104,
                          43,
                          9
                      ));
            }
        };
        e.prototype.getUnlockString = function() {
            var t = this._data,
                e = localcache.getItem(localdb.table_heropve, t.id),
                o = "";
            if (e) {
                if (2 == e.type) o = l.playerProxy.getWifeName(e.roleid);
                else if (1 == e.type) {
                    o = localcache.getItem(localdb.table_hero, e.roleid).name;
                }
                switch (e.unlocktype) {
                    case 1:
                    case 2:
                        return i18n.t("SERVANT_JIBAN_NEED" + e.unlocktype, {
                            n: o,
                            c: e.unlock
                        });

                    case 3:
                        var i = localcache.getItem(
                            localdb.table_mainTask,
                            e.unlock
                        );
                        return i18n.t("FIGHT_TASK_LIMIT", {
                            n: i.name
                        });
                }
            }
            return "";
        };
        __decorate([c(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblPro", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblLv", void 0);
        __decorate([c(n.default)], e.prototype, "title_bg", void 0);
        __decorate([c(n.default)], e.prototype, "jiban_title", void 0);
        __decorate([c(n.default)], e.prototype, "word", void 0);
        __decorate([c(cc.ProgressBar)], e.prototype, "bar", void 0);
        __decorate([c(cc.Button)], e.prototype, "btn", void 0);
        __decorate([c(cc.Node)], e.prototype, "nodeLock", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblLock", void 0);
        __decorate([c(cc.Node)], e.prototype, "nodeNew", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblExp", void 0);
        __decorate([c(cc.Node)], e.prototype, "yuyin", void 0);
        return (e = __decorate([s], e));
    })(i.default);
o.default = _;
