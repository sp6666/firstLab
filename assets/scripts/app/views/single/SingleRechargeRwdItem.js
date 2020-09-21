var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../component/List"),
    l = cc._decorator,
    r = l.ccclass,
    a = l.property,
    s = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblIndex = null;
            e.lblNum = null;
            e.btnGet = null;
            e.btnYlq = null;
            e.bottomNode = null;
            e.bg = null;
            e.list = null;
            e.button = null;
            return e;
        }
        e.prototype.onLoad = function() {
            this.addBtnEvent(this.button);
        };
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                this.lblIndex.string = i18n.t("SINGLE_RECHARGE_DANG_CI", {
                    num: t.dc
                });
                this.list.data = t.items;
                this.btnGet.node.active = 0 == t.get;
                this.btnYlq.active = 1 == t.get;
                this.btnGet.interactable = t.cons >= t.need;
                this.lblNum.string = i18n.t("SINGLE_RECHARGE_YUAN_BAO", {
                    need: t.need
                });
            }
        };
        e.prototype.setWidthHeigth = function(t, e) {
            this.node.height = e;
            this.bg.height = e;
            this.bottomNode.y = -(e - 250);
        };
        __decorate([a(cc.Label)], e.prototype, "lblIndex", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblNum", void 0);
        __decorate([a(cc.Button)], e.prototype, "btnGet", void 0);
        __decorate([a(cc.Node)], e.prototype, "btnYlq", void 0);
        __decorate([a(cc.Node)], e.prototype, "bottomNode", void 0);
        __decorate([a(cc.Node)], e.prototype, "bg", void 0);
        __decorate([a(n.default)], e.prototype, "list", void 0);
        __decorate([a(cc.Button)], e.prototype, "button", void 0);
        return (e = __decorate([r], e));
    })(i.default);
o.default = s;
