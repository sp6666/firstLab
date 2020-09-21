var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/UrlLoad"),
    n = require("../../utils/Utils"),
    l = require("../../utils/UIUtils"),
    r = require("../../Initializer"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.roleUrl = null;
            e.proUrl = null;
            e.title_bg = null;
            e.jb_title = null;
            e.wordUrl = null;
            e.lblName = null;
            e.lblStory = null;
            e.lblServant = null;
            e.lblPro = null;
            e.buf = null;
            e.bar = null;
            e.lblExp = null;
            e.lblLv = null;
            e.list = [];
            e._index = 0;
            return e;
        }
        e.prototype.onLoad = function() {
            this.list = this.node.openParam.list;
            this.showData();
        };
        e.prototype.showData = function() {
            var t = this.list[this._index];
            if (t) {
                var e = localcache.getItem(localdb.table_heropve, t);
                if (e) {
                    this.roleUrl.url = l.uiHelps.getServantSpine(e.roleid);
                    this.lblName.string = e.name;
                    this.title_bg.url = l.uiHelps.getJbTitleBg(e.star);
                    this.jb_title.url = l.uiHelps.getJbTitle(e.star);
                    this.wordUrl.url = l.uiHelps.getJbTitleWord(e.star);
                    this.proUrl.url = l.uiHelps.getLangSp(e.specMsg);
                    var o = localcache.getItem(localdb.table_hero, e.roleid);
                    this.lblServant.string = o.name;
                    this.lblName.string = e.name;
                    var i = r.jibanProxy.getJbItemLvData(e.roleid, t),
                        n = i ? i.level : 0,
                        a = localcache.getItem(localdb.table_heropveJbProp, n),
                        s = 0;
                    if (a)
                        for (var c = 0; c < a.count.length; c++)
                            if (a.count[c].star == e.star) {
                                s = a.count[c].count;
                                break;
                            }
                    this.lblPro.string = i18n.t("SERVANT_JI_BAN_JIA_HAO_TXT", {
                        num: s
                    });
                    this.buf.active = i && 1 != i.level;
                    this.lblLv.string = i18n.t(
                        "SERVANT_JI_BAN_ITEM_LEVEL_TXT",
                        {
                            lv: n
                        }
                    );
                    var _ = localcache.getItem(localdb.table_heropveJbLevel, n);
                    if (_) {
                        var d = i ? i.exp : 0;
                        this.bar.progress = d / _.story_num;
                        this.lblExp.string = i18n.t("COMMON_NUM", {
                            f: d,
                            s: _.story_num
                        });
                    }
                    e.star <= 1
                        ? (this.lblLv.node.color = cc.color(10, 53, 64))
                        : 2 == e.star
                        ? (this.lblLv.node.color = cc.color(42, 10, 64))
                        : 3 == e.star
                        ? (this.lblLv.node.color = cc.color(87, 9, 9))
                        : e.star >= 4 &&
                          (this.lblLv.node.color = cc.color(104, 43, 9));
                }
            }
            this._index++;
        };
        e.prototype.onClickClose = function() {
            this._index <= this.list.length - 1
                ? this.showData()
                : n.utils.closeView(this);
        };
        __decorate([c(i.default)], e.prototype, "roleUrl", void 0);
        __decorate([c(i.default)], e.prototype, "proUrl", void 0);
        __decorate([c(i.default)], e.prototype, "title_bg", void 0);
        __decorate([c(i.default)], e.prototype, "jb_title", void 0);
        __decorate([c(i.default)], e.prototype, "wordUrl", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblStory", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblServant", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblPro", void 0);
        __decorate([c(cc.Node)], e.prototype, "buf", void 0);
        __decorate([c(cc.ProgressBar)], e.prototype, "bar", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblExp", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblLv", void 0);
        return (e = __decorate([s], e));
    })(cc.Component);
o.default = _;
