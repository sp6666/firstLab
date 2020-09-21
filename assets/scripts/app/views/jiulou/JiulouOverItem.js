var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../Initializer"),
    l = cc._decorator,
    r = l.ccclass,
    a = l.property,
    s = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblName = null;
            e.lblScore = null;
            e.lblIndex = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                this.lblIndex.string =
                    n.jiulouProxy.win.yhnew.list.indexOf(t) + 1 + "";
                this.lblName.string = t.name;
                this.lblScore.string =
                    i18n.t("JIU_LOU_YAN_HUI_SHU_XING") + " " + t.ep;
            }
        };
        __decorate([a(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblScore", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblIndex", void 0);
        return (e = __decorate([r], e));
    })(i.default);
o.default = s;
