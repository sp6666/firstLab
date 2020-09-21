var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../component/UrlLoad"),
    l = require("../../utils/UIUtils"),
    r = require("../../utils/Utils"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.face = null;
            e.nodeLock = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this._data;
            if (null != t.islock) {
                this.nodeLock.active = 1 == t.islock;
                this.face.url = "";
            } else if (null != t.id) {
                this.nodeLock.active = !1;
                this.face.url = l.uiHelps.getServantHead(t.id);
            }
        };
        e.prototype.onClick = function(t, e) {
            r.utils.openPrefabView("JyWeipai", !1, {
                type: parseInt(e)
            });
        };
        __decorate([c(n.default)], e.prototype, "face", void 0);
        __decorate([c(cc.Node)], e.prototype, "nodeLock", void 0);
        return (e = __decorate([s], e));
    })(i.default);
o.default = _;
