var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../component/LabelShadow"),
    l = require("../../Config"),
    r = require("../../utils/Utils"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblName = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this.data;
            t &&
                (l.Config.isNewServerList && !r.stringUtil.isBlank(t.name)
                    ? (this.lblName.string = t.name)
                    : (this.lblName.string = i18n.t("LOGIN_SERVER_ID", {
                          s: t.min,
                          e: t.max
                      })));
        };
        __decorate([c(n.default)], e.prototype, "lblName", void 0);
        return (e = __decorate([s], e));
    })(i.default);
o.default = _;
