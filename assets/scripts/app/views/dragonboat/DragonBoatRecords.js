var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = cc._decorator,
    l = n.ccclass,
    r = n.property,
    a = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblDes = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this.data;
            t &&
                (this.lblDes.string = i18n.t("DRAGON_BOAT_RECORD", {
                    name: t.name,
                    num: 50
                }));
        };
        __decorate([r(cc.Label)], e.prototype, "lblDes", void 0);
        return (e = __decorate([l], e));
    })(i.default);
o.default = a;
