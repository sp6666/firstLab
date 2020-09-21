var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../utils/UIUtils"),
    l = require("../../Initializer"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.master = null;
            e.lblLv = null;
            e.lblName = null;
            e.lblCd = null;
            e.roleArr = [];
            e.uid = 0;
            return e;
        }
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                this.lblLv.string = i18n.t("COMMON_PALACE", {
                    lv: t.level
                });
                this.lblName.string = t.name;
                for (var e = 0; e < this.roleArr.length; e++)
                    this.roleArr[e].active = e <= t.num2 - 1;
                n.uiUtils.countDown(t.num3, this.lblCd);
                this.uid = t.uid;
            }
        };
        e.prototype.onClickItem = function() {
            l.academyProxy.sendInto(this.uid);
        };
        __decorate([s(cc.Node)], e.prototype, "master", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblLv", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblCd", void 0);
        __decorate([s([cc.Node])], e.prototype, "roleArr", void 0);
        return (e = __decorate([a], e));
    })(i.default);
o.default = c;
