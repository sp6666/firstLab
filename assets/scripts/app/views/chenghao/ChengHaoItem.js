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
            e.chengHaoUrl = null;
            e.lblChengHao = null;
            e.urlNode = null;
            e.txtNode = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                this.lblChengHao.string = t.name;
                this.chengHaoUrl.url = l.uiHelps.getChengHaoUrl(t.img);
            }
        };
        __decorate([s(n.default)], e.prototype, "chengHaoUrl", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblChengHao", void 0);
        __decorate([s(cc.Node)], e.prototype, "urlNode", void 0);
        __decorate([s(cc.Node)], e.prototype, "txtNode", void 0);
        return (e = __decorate([a], e));
    })(i.default);
o.default = c;
