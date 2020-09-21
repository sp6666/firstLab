var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("../../utils/Utils"),
    l = require("../../Initializer"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.skillGhList = null;
            e.lblname = null;
            e.lblLv = null;
            e.lblEff = null;
            return e;
        }
        e.prototype.onLoad = function() {
            var t = this.node.openParam;
            l.wifeProxy.skillWifeId = t.id;
            this.skillGhList.data = t.skill;
            var e = localcache.getItem(localdb.table_wife, t.id);
            this.lblname.string = e.wname2;
            var o = l.jibanProxy.getWifeJbLv(l.wifeProxy.skillWifeId);
            this.lblLv.string = i18n.t("WIFE_YOU_QING_LV", {
                lv: o.level % 100
            });
            this.lblEff.string = i18n.t("WIFE_SKILL_EFF", {
                num: o.prop / 100
            });
        };
        e.prototype.onClickClose = function() {
            n.utils.closeView(this);
        };
        __decorate([s(i.default)], e.prototype, "skillGhList", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblname", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblLv", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblEff", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;
