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
            e.servant = null;
            e.nameUrl = null;
            e.btn = null;
            return e;
        }
        e.prototype.onLoad = function() {
            this.addBtnEvent(this.btn);
        };
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                this.servant.url = l.uiHelps.getServantSpine(t.id);
                this.nameUrl.url = l.uiHelps.getStoryRoleName(t.id);
            }
        };
        __decorate([s(n.default)], e.prototype, "servant", void 0);
        __decorate([s(n.default)], e.prototype, "nameUrl", void 0);
        __decorate([s(cc.Button)], e.prototype, "btn", void 0);
        return (e = __decorate([a], e));
    })(i.default);
o.default = c;
