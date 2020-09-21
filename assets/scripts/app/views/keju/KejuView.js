var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("./KejuItem"),
    n = require("../../Initializer"),
    l = cc._decorator,
    r = l.ccclass,
    a = l.property,
    s = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.items = [];
            e.lblLv = null;
            e.lblExp = null;
            e.prg = null;
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe(
                n.achievementProxy.UPDATE_KEJU_LEVEL,
                this.updateLevel,
                this
            );
            facade.subscribe(
                n.achievementProxy.UPDATE_KEJU,
                this.updateShow,
                this
            );
            facade.subscribe(
                n.achievementProxy.UPDATE_SCORE,
                this.updateShow,
                this
            );
            this.updateLevel();
            this.updateShow();
        };
        e.prototype.updateLevel = function() {
            var t = n.achievementProxy.level.level,
                e = n.achievementProxy.level.exp,
                o = localcache.getItem(localdb.table_exam_lv, t),
                i = o ? o.exp : 1;
            this.lblLv.string = i18n.t("COMMON_LEVEL_TIP", {
                d: t,
                n: o ? o.name : ""
            });
            this.lblExp.string =
                null == o || 0 == i
                    ? i18n.t("COMMON_MAX")
                    : i18n.t("COMMON_NUM", {
                          f: e,
                          s: i
                      });
            this.prg.progress = null == o || 0 == i ? 1 : e / i;
        };
        e.prototype.updateShow = function() {
            for (
                var t = localcache.getList(localdb.table_exam_type), e = 0;
                e < this.items.length;
                e++
            )
                this.items[e].data = t[e];
        };
        __decorate([a([i.default])], e.prototype, "items", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblLv", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblExp", void 0);
        __decorate([a(cc.ProgressBar)], e.prototype, "prg", void 0);
        return (e = __decorate([r], e));
    })(cc.Component);
o.default = s;
