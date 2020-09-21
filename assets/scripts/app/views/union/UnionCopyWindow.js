var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = cc._decorator,
    l = n.ccclass,
    r = n.property,
    a = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblgongxina = null;
            e.lblShanghai = null;
            return e;
        }
        e.prototype.onLoad = function() {
            var t = this.node.openParam;
            if (t) {
                this.lblgongxina.string = i18n.t("UNION_GE_REN_GONG_XIAN_2", {
                    num: t.cbosspkwin.gx
                });
                var e = localcache.getItem(
                    localdb.table_unionBoss,
                    t.cbosspkwin.id
                );
                this.lblShanghai.string = i18n.t("UNION_COPY_BOSS_HURT", {
                    name: e.name,
                    num: t.cbosspkwin.hit
                });
            }
        };
        e.prototype.onClickClose = function() {
            facade.send("UNION_CLOSE_WINDOW");
            i.utils.closeView(this);
        };
        __decorate([r(cc.Label)], e.prototype, "lblgongxina", void 0);
        __decorate([r(cc.Label)], e.prototype, "lblShanghai", void 0);
        return (e = __decorate([l], e));
    })(cc.Component);
o.default = a;
