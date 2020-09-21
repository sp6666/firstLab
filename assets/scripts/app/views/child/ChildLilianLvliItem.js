var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = cc._decorator,
    l = n.ccclass,
    r = n.property,
    a = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblContent = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this._data.name,
                e = this._data.sys;
            if (e) {
                for (var o = e.text; -1 != o.indexOf("#name"); )
                    o = o.replace("#name", t);
                this.lblContent.string = o;
                this.node.height = this.lblContent.node.height + 4;
            }
        };
        __decorate([r(cc.Label)], e.prototype, "lblContent", void 0);
        return (e = __decorate([l], e));
    })(i.default);
o.default = a;
