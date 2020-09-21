var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../utils/Utils"),
    l = require("../../Initializer"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblTime = null;
            e.lblDes = null;
            e.lblNo = null;
            return e;
        }
        e.prototype.onClickSteal = function() {
            var t = this.data;
            t && l.flowerProxy.sendStealCheck(t.uid);
        };
        e.prototype.showData = function() {
            var t = this.data;
            if (t) {
                this.lblNo.string = t.uid + "";
                this.lblTime.string = n.timeUtil.getDateDiff(t.time);
                -1 == t.steal
                    ? (this.lblDes.string = i18n.t("FLOWER_SHOU_HELP_TIP", {
                          n: t.fname
                      }))
                    : (this.lblDes.string = i18n.t("FLOWER_STEAL_TIP", {
                          n: t.fname,
                          d: t.steal
                      }));
            }
        };
        __decorate([s(cc.Label)], e.prototype, "lblTime", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblDes", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblNo", void 0);
        return (e = __decorate([a], e));
    })(i.default);
o.default = c;
