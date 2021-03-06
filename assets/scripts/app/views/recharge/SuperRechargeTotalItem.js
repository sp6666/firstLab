var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../component/List"),
    l = require("../../Initializer"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblIndex = null;
            e.lblCount = null;
            e.btnYLQ = null;
            e.btnGet = null;
            e.list = null;
            e.itemBg = null;
            e.bottom = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                this.lblIndex.string = i18n.t("LIMIT_SUPER_REHCARGE_INDEX", {
                    index: t.id,
                    day: t.need
                });
                this.list.data = t.items;
                this.btnGet.node.active = 0 == t.get;
                this.btnGet.interactable =
                    l.limitActivityProxy.superRecharge.day >= t.need;
                this.btnYLQ.active = 1 == t.get;
                this.lblCount.string = i18n.t("LIMIT_LEI_TIAN_DAY_TXT", {
                    num: l.limitActivityProxy.superRecharge.day,
                    need: t.need
                });
            }
        };
        e.prototype.setWidthHeigth = function(t, e) {
            this.node.height = e;
            this.itemBg.height = e;
            this.bottom.y = -(e - 250);
        };
        e.prototype.onClickGet = function() {
            var t = this._data;
            l.limitActivityProxy.sendGetSuperRechargeTotal(t.id);
        };
        __decorate([s(cc.Label)], e.prototype, "lblIndex", void 0);
        __decorate([s(cc.RichText)], e.prototype, "lblCount", void 0);
        __decorate([s(cc.Node)], e.prototype, "btnYLQ", void 0);
        __decorate([s(cc.Button)], e.prototype, "btnGet", void 0);
        __decorate([s(n.default)], e.prototype, "list", void 0);
        __decorate([s(cc.Node)], e.prototype, "itemBg", void 0);
        __decorate([s(cc.Node)], e.prototype, "bottom", void 0);
        return (e = __decorate([a], e));
    })(i.default);
o.default = c;
