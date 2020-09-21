var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/StateImg"),
    n = require("../../component/UrlLoad"),
    l = require("../../utils/UIUtils"),
    r = require("../../utils/Utils"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblOld = null;
            e.lblNew = null;
            e.luckImg = null;
            e.heroImg = null;
            e.wifeImg = null;
            e.jbNode = null;
            e.lblNum = null;
            e.nodeJb = null;
            e.nodeYQ = null;
            return e;
        }
        e.prototype.onLoad = function() {
            var t = this.node.openParam;
            if (t) {
                this.nodeJb.active = this.heroImg.node.active = 1 == t.type;
                this.nodeYQ.active = this.wifeImg.node.active = 2 == t.type;
                if (1 == t.type)
                    this.heroImg.url = l.uiHelps.getServantSpine(t.id);
                else if (2 == t.type) {
                    var e = localcache.getItem(localdb.table_wife, t.id);
                    this.wifeImg.url = l.uiHelps.getWifeBody(e.res);
                }
                this.lblOld.string = i18n.t("COMMON_LEVEL_TXT", {
                    lv: t.orgLv
                });
                this.lblNew.string = i18n.t("COMMON_LEVEL_TXT", {
                    lv: t.lv
                });
                this.luckImg.total = 5;
                this.luckImg.value = t.lv;
                this.luckImg.node.active = t.lv <= 5;
                this.jbNode.active = t.lv > 5;
                this.lblNum.string = i18n.t("SERVANT_JI_BAN_FLOWER", {
                    num: t.lv
                });
            }
        };
        e.prototype.onClickClose = function() {
            r.utils.closeView(this);
        };
        __decorate([c(cc.Label)], e.prototype, "lblOld", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblNew", void 0);
        __decorate([c(i.default)], e.prototype, "luckImg", void 0);
        __decorate([c(n.default)], e.prototype, "heroImg", void 0);
        __decorate([c(n.default)], e.prototype, "wifeImg", void 0);
        __decorate([c(cc.Node)], e.prototype, "jbNode", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblNum", void 0);
        __decorate([c(cc.Node)], e.prototype, "nodeJb", void 0);
        __decorate([c(cc.Node)], e.prototype, "nodeYQ", void 0);
        return (e = __decorate([s], e));
    })(cc.Component);
o.default = _;
