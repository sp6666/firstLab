var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("./RenderListItem"),
    n = cc._decorator,
    l = n.ccclass,
    r = n.property,
    a = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.imgOpen = null;
            e.imgClose = null;
            return e;
        }
        e.prototype.showData = function() {
            this.imgOpen.active = this._data.isOpen;
            this.imgClose.active = !this._data.isOpen;
        };
        __decorate([r(cc.Node)], e.prototype, "imgOpen", void 0);
        __decorate([r(cc.Node)], e.prototype, "imgClose", void 0);
        return (e = __decorate([l], e));
    })(i.default);
o.default = a;
