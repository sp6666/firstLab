var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../Initializer"),
    n = require("../../utils/Utils"),
    l = require("../../utils/UIUtils"),
    cfg = require("../../Config"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblName = null;
            e.lblChenlu = null;
            e.lblExp = null;
            e.pro = null;
            e.lblBJ = null;
            return e;
        }
        e.prototype.onLoad = function () {
            facade.subscribe(
                i.flowerFriendProxy.UPDATE_FLOWER_LEVEL,
                this.onLevel,
                this
            );
            this.onLevel();
        };
        e.prototype.onLevel = function () {
            if (null != i.flowerFriendProxy.level) {
                var t = i.flowerFriendProxy.level.flv,
                    e = i.flowerFriendProxy.level.fexp,
                    o = localcache.getItem(localdb.table_friend_flowerLv, t);
                this.lblExp.string = i18n.t("COMMON_NUM", {
                    f: e,
                    s: o ? o.exp : 0
                });
                this.lblBJ &&
                    (this.lblBJ.string = i18n.t("FLOWER_BAOJI_PER", {
                        d: o.chance / 100
                    }));
                this.pro.progress = o ? e / o.exp : 1;
                this.lblName.string = i18n.t("FLOWER_FRIEND_LEVEL_NAME", {
                    d: t
                });
                this.lblChenlu.string = n.utils.formatMoney(
                    i.flowerFriendProxy.level.chenlu
                );
            }
        };
        __decorate([s(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblChenlu", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblExp", void 0);
        __decorate([s(cc.ProgressBar)], e.prototype, "pro", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblBJ", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;