var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = require("../../Initializer"),
    l = cc._decorator,
    r = l.ccclass,
    a = l.property,
    s = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.oneNode = null;
            e.tenNode = null;
            e.tenNodeQian = null;
            e.TenPrefabs = null;
            return e;
        }
        e.prototype.onLoad = function() {
            this.updateMyScore();
        };
        e.prototype.updateMyScore = function() {
            if (1 == n.qixiProxy.result.draw.length) this.tenNode.active = !1;
            else {
                this.oneNode.active = !1;
                for (var t = 0; t < n.qixiProxy.result.draw.length; t++) {
                    var e = cc.instantiate(this.TenPrefabs);
                    this.tenNodeQian.addChild(e);
                    e.getComponent("QiXiChouQianItem").setSprite(t);
                }
            }
        };
        e.prototype.onClickClose = function() {
            i.utils.closeView(this);
        };
        __decorate([a(cc.Node)], e.prototype, "oneNode", void 0);
        __decorate([a(cc.Node)], e.prototype, "tenNode", void 0);
        __decorate([a(cc.Node)], e.prototype, "tenNodeQian", void 0);
        __decorate([a(cc.Prefab)], e.prototype, "TenPrefabs", void 0);
        return (e = __decorate([r], e));
    })(cc.Component);
o.default = s;
