var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../component/UrlLoad"),
    l = require("../../utils/UIUtils"),
    r = require("../../utils/ShaderUtils"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.day = null;
            e.rwd = null;
            e.btn = null;
            e.effect = null;
            e.nodeGet = null;
            return e;
        }
        e.prototype.onLoad = function() {
            this.addBtnEvent(this.btn);
        };
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                this.effect && (this.effect.active = 1 == t.type);
                this.day.url = l.uiHelps.getSevenDayNum(t.day);
                this.rwd.url = l.uiHelps.getSevenDay(t.day);
                var e = this.node.getComponentsInChildren(cc.Sprite);
                this.nodeGet.active = 2 == t.type;
                for (var o = 0; o < e.length; o++)
                    e[o].node != this.nodeGet &&
                        r.shaderUtils.setImageGray(e[o], 2 == t.type);
            }
        };
        __decorate([c(n.default)], e.prototype, "day", void 0);
        __decorate([c(n.default)], e.prototype, "rwd", void 0);
        __decorate([c(cc.Button)], e.prototype, "btn", void 0);
        __decorate([c(cc.Node)], e.prototype, "effect", void 0);
        __decorate([c(cc.Node)], e.prototype, "nodeGet", void 0);
        return (e = __decorate([s], e));
    })(i.default);
o.default = _;
