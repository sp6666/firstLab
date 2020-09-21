var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("../../utils/Utils"),
    l = require("../../Initializer"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.list = null;
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe(
                l.arborDayProxy.ARBOR_DAY_DATA_UPDATE,
                this.onDataUpdate,
                this
            );
            var t = l.arborDayProxy.data.brwd[0].items.length,
                e = 10 * (Math.ceil(t / 6) - 1),
                o = 100 * Math.ceil(t / 6) + e + 150;
            this.list.setWidthHeight(680, o);
            this.onDataUpdate();
        };
        e.prototype.onDataUpdate = function() {
            l.arborDayProxy.data.brwd.sort(this.sortList);
            this.list.data = l.arborDayProxy.data.brwd;
        };
        e.prototype.sortList = function(t, e) {
            var o = l.arborDayProxy.myRid.score >= t.need ? 0 : 1,
                i = l.arborDayProxy.myRid.score >= e.need ? 0 : 1;
            return t.get != e.get ? t.get - e.get : o - i;
        };
        e.prototype.onClickClose = function() {
            n.utils.closeView(this);
        };
        __decorate([s(i.default)], e.prototype, "list", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;
