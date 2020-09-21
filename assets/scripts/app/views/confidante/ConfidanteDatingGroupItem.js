var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../component/List"),
    init = require("../../Initializer"),
    l = cc._decorator,
    r = l.ccclass,
    a = l.property,
    s = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.list = null;
            e.bg = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                var csts = init.confidanteProxy.getCurChapterList(t.lv);
                for (o = [], i = 0; i < csts.length; i++ )
                {
                    o.push(csts[i]);
                }

                o.sort(function(t, e) {
                    return t.lv - e.lv;
                });

                this.list.data = o;
                this.node.height = this.bg.height = -this.list.node.y + this.list.node.height + 82;
                this.bg.y = this.bg.height;
                this.bg.stopAllActions();
                this.bg.runAction(cc.moveTo(0.3, this.bg.x, 0));
            }
        };
        __decorate([a(n.default)], e.prototype, "list", void 0);
        __decorate([a(cc.Node)], e.prototype, "bg", void 0);
        return (e = __decorate([r], e));
    })(i.default);
o.default = s;
