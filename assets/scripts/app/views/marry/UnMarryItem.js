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
            e.lblShengFen = null;
            e.tiqiNode = null;
            e.selectImg = null;
            return e;
        }
        Object.defineProperty(e.prototype, "select", {
            set: function(t) {
                this.selectImg.active = t;
            },
            enumerable: !0,
            configurable: !0
        });
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                this.lblName.string = t.name;
                this.lblShengFen.string = i18n.t("SON_HONOUR_TEXT", {
                    str: n.sonProxy.getHonourStr(t.honor)
                });
                this.tiqiNode &&
                    (this.tiqiNode.active =
                        t.state == proto_sc.SomState.request ||
                        t.state == proto_sc.SomState.requestAll);
            }
        };
        __decorate([a(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblShengFen", void 0);
        __decorate([a(cc.Node)], e.prototype, "tiqiNode", void 0);
        __decorate([a(cc.Node)], e.prototype, "selectImg", void 0);
        return (e = __decorate([r], e));
    })(i.default);
o.default = s;
