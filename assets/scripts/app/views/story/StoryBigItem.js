var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../Initializer"),
    l = cc._decorator,
    r = l.ccclass,
    a = l.property,
    s = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblItem = null;
            e.lblCount = null;
            e.btn = null;
            return e;
        }
        e.prototype.onLoad = function() {
            this.addBtnEvent(this.btn);
        };
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                for (
                    var e = localcache.getGroup(
                            localdb.table_midPve,
                            "bmap",
                            t.id
                        ),
                        o = 0,
                        i = n.playerProxy.userData.mmap,
                        l = 0;
                    l < e.length;
                    l++
                )
                    o += e[l].id < i ? 1 : 0;
                o += n.playerProxy.userData.bmap > t.id ? 1 : 0;
                this.lblItem.string =
                    i18n.t("FIGHT_BIG_TIP", {
                        s: t.id
                    }) + t.name;
                this.lblCount.string = i18n.t("COMMON_NUM", {
                    f: o,
                    s: e.length + 1
                });
            }
        };
        __decorate([a(cc.Label)], e.prototype, "lblItem", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblCount", void 0);
        __decorate([a(cc.Button)], e.prototype, "btn", void 0);
        return (e = __decorate([r], e));
    })(i.default);
o.default = s;
