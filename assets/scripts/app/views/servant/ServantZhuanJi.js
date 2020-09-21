var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = require("../../component/List"),
    l = require("../../Initializer"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.zjList = null;
            e.lblTxt = null;
            return e;
        }
        e.prototype.onLoad = function() {
            var t = this.node.openParam;
            if (t) {
                var e = localcache.getItem(localdb.table_heroinfo, t.id);
                this.lblTxt.string = e.recruit;
                for (
                    var o = [],
                        i = l.jibanProxy.getHeroJbLv(t.id).level % 1e3,
                        n = 1;
                    n < 11;
                    n++
                ) {
                    var r = {};
                    r.jb = n;
                    r.heroId = t.id;
                    r.active = i >= n;
                    o.push(r);
                }
                this.zjList.data = o;
            }
        };
        e.prototype.onClickClose = function() {
            i.utils.closeView(this);
        };
        __decorate([s(n.default)], e.prototype, "zjList", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblTxt", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;
