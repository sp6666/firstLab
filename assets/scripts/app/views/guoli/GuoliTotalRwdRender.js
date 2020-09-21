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
            e.lblTitle = null;
            e.list = null;
            e.btnGet = null;
            e.btnYlq = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                this.lblTitle.string = i18n.t("GUO_LI_TOTAL_GET", {
                    num: t.need
                });
                this.btnGet.node.active = 0 == t.get;
                this.btnGet.interactable =
                    0 == t.get && t.need <= l.guoliPorxy.data.allgl;
                this.btnYlq.active = 1 == t.get;
                this.list.data = t.items;
            }
        };
        e.prototype.onClickGet = function() {
            var t = this._data;
            l.guoliPorxy.sendGetReward(t.dc);
        };
        __decorate([s(cc.Label)], e.prototype, "lblTitle", void 0);
        __decorate([s(n.default)], e.prototype, "list", void 0);
        __decorate([s(cc.Button)], e.prototype, "btnGet", void 0);
        __decorate([s(cc.Node)], e.prototype, "btnYlq", void 0);
        return (e = __decorate([a], e));
    })(i.default);
o.default = c;
