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
            e.headImg = null;
            e.img = null;
            e.img1 = null;
            e.qImg = null;
            return e;
        }
        e.prototype.onClickHead = function() {
            this._data;
        };
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                var e = localcache.getItem(localdb.table_prisoner_pic, t.id);
                null != e
                    ? (this.headImg.url = l.uiHelps.getCellHeadIcon(e.mod1))
                    : (this.node.active = !1);
            }
        };
        __decorate([s(n.default)], e.prototype, "headImg", void 0);
        __decorate([s(cc.Sprite)], e.prototype, "img", void 0);
        __decorate([s(cc.Sprite)], e.prototype, "img1", void 0);
        __decorate([s(cc.Node)], e.prototype, "qImg", void 0);
        return (e = __decorate([a], e));
    })(i.default);
o.default = c;
