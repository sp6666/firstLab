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
            e.lblServerName = null;
            e.lblLevel = null;
            e.lblRoleName = null;
            e.lblPower = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                this.lblServerName.string = t.servername.zh;
                this.lblRoleName.string = t.userName;
                this.lblLevel.string = i18n.t("SON_HONOUR_TEXT", {
                    str: t.levelname
                });
                this.lblPower.string = i18n.t("MAIN_SHILI", {
                    d: t.value
                });
            }
        };
        __decorate([r(cc.Label)], e.prototype, "lblServerName", void 0);
        __decorate([r(cc.Label)], e.prototype, "lblLevel", void 0);
        __decorate([r(cc.Label)], e.prototype, "lblRoleName", void 0);
        __decorate([r(cc.Label)], e.prototype, "lblPower", void 0);
        return (e = __decorate([l], e));
    })(i.default);
o.default = a;
