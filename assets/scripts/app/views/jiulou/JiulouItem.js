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
            e.jia_bg = null;
            e.guan_bg = null;
            return e;
        }
        e.prototype.onClickGo = function() {
            var t = this._data;
            t && n.jiulouProxy.sendYhGo(t.uid);
        };
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                this.lblName.string = t.name;
                this.jia_bg.active = 1 == t.type;
                this.guan_bg.active = 2 == t.type;
            }
        };
        __decorate([a(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([a(cc.Node)], e.prototype, "jia_bg", void 0);
        __decorate([a(cc.Node)], e.prototype, "guan_bg", void 0);
        return (e = __decorate([r], e));
    })(i.default);
o.default = s;
