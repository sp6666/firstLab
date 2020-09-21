var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("../../Initializer"),
    l = require("../../utils/Utils"),
    r = require("../../utils/UIUtils"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblLock = null;
            e.list = null;
            e.nodeBg = null;
            return e;
        }
        e.prototype.onLoad = function() {
            var t = this.node.openParam;
            if (null != t.rwd_q) {
                this.lblLock.string = i18n.t("ACHIEVE_RWD_TYPE", {
                    d: t.need
                });
                this.list.data = t.rwd_q;
                this.nodeBg.height =
                    t.rwd_q.length > 5
                        ? this.nodeBg.height + 100
                        : this.nodeBg.height;
                this.list.node.x = -this.list.node.width / 2;
            } else {
                var e = this.node.openParam,
                    o = localcache.getItem(
                        localdb.table_exam_lv,
                        n.achievementProxy.level.level
                    );
                this.lblLock.string = i18n.t("COMMON_LEVEL_TIP", {
                    d: n.achievementProxy.level.level,
                    n: o ? o.name : ""
                });
                for (
                    var i = o["typereward" + e.id], l = [], a = {}, s = 0;
                    s < i.length;
                    s++
                )
                    if (1 != a[i[s].itemid]) {
                        a[i[s].itemid] = 1;
                        var c = new r.ItemSlotData();
                        c.id = i[s].itemid;
                        l.push(c);
                    }
                this.list.data = l;
                this.nodeBg.height =
                    l.length > 5
                        ? this.nodeBg.height + 100
                        : this.nodeBg.height;
                this.list.node.x = -this.list.node.width / 2;
            }
        };
        e.prototype.onClickClost = function() {
            l.utils.closeView(this);
        };
        __decorate([c(cc.RichText)], e.prototype, "lblLock", void 0);
        __decorate([c(i.default)], e.prototype, "list", void 0);
        __decorate([c(cc.Node)], e.prototype, "nodeBg", void 0);
        return (e = __decorate([s], e));
    })(cc.Component);
o.default = _;
