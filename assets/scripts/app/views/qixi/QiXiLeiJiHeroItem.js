var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../component/UrlLoad"),
    l = require("../../utils/UIUtils"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.heroHead = null;
            e.selectImg = null;
            e.selectImg_1 = null;
            e.selectImg_2 = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this._data;
            null != t && (this.heroHead.url = l.uiHelps.getServantHead(t.hid));
        };
        Object.defineProperty(e.prototype, "select", {
            set: function(t) {
                this.selectImg.active = t;
                this.selectImg_1.active = t;
                this.selectImg_2.active = t;
            },
            enumerable: !0,
            configurable: !0
        });
        __decorate([s(n.default)], e.prototype, "heroHead", void 0);
        __decorate([s(cc.Node)], e.prototype, "selectImg", void 0);
        __decorate([s(cc.Node)], e.prototype, "selectImg_1", void 0);
        __decorate([s(cc.Node)], e.prototype, "selectImg_2", void 0);
        return (e = __decorate([a], e));
    })(i.default);
o.default = c;
