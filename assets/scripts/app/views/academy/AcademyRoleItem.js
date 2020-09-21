var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../component/UrlLoad"),
    l = cc._decorator,
    r = l.ccclass,
    a = l.property,
    s = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblName = null;
            e.lblLv = null;
            e.lblExp = null;
            e.role = null;
            e.infoNode = null;
            e.btnClick = null;
            return e;
        }
        e.prototype.onLoad = function() {
            this.addBtnEvent(this.btnClick);
        };
        e.prototype.showData = function() {
            var t = this._data;
            this.infoNode.active = null != t;
            if (t) {
                this.lblName.string = t.name;
                var e = t.num2 - t.num,
                    o = localcache.getItem(
                        localdb.table_governmentIncome,
                        t.level
                    );
                o &&
                    (this.lblExp.string =
                        i18n.t("ACADEMY_EXP_TOTAL") + "：" + (e / 60) * o.exp);
                this.lblLv.string = i18n.t("COMMON_PALACE", {
                    lv: t.level
                });
            }
        };
        __decorate([a(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblLv", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblExp", void 0);
        __decorate([a(n.default)], e.prototype, "role", void 0);
        __decorate([a(cc.Node)], e.prototype, "infoNode", void 0);
        __decorate([a(cc.Button)], e.prototype, "btnClick", void 0);
        return (e = __decorate([r], e));
    })(i.default);
o.default = s;
