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
            e.titleUrl = null;
            e.wordUrl = null;
            e.lblNum = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this._data,
                e = t.star;
            this.titleUrl.url = l.uiHelps.getJbTitle(e);
            this.wordUrl.url = l.uiHelps.getJbTitleWord(e);
            this.lblNum.string = t.num + "";
        };
        __decorate([s(n.default)], e.prototype, "titleUrl", void 0);
        __decorate([s(n.default)], e.prototype, "wordUrl", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblNum", void 0);
        return (e = __decorate([a], e));
    })(i.default);
o.default = c;
