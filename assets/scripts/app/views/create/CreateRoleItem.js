var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../component/RoleSpine"),
    l = cc._decorator,
    r = l.ccclass,
    a = l.property,
    s = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.role = null;
            e.selectNode = null;
            return e;
        }
        Object.defineProperty(e.prototype, "select", {
            set: function(t) {
                this.selectNode && (this.selectNode.active = t);
            },
            enumerable: !0,
            configurable: !0
        });
        e.prototype.showData = function() {
            var t = this.data;
            t && this.role.setLevel(t.sex, t.job, 0);
        };
        __decorate([a(n.default)], e.prototype, "role", void 0);
        __decorate([a(cc.Node)], e.prototype, "selectNode", void 0);
        return (e = __decorate([r], e));
    })(i.default);
o.default = s;
