var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../component/RoleSpine"),
    l = require("../item/ItemSlotUI"),
    r = require("../../Initializer"),
    a = require("../../utils/Utils"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.item = null;
            e.spine = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                var e = r.playerProxy.userData;
                this.item.data = t.cost;
                this.spine.setClothes(
                    e.sex,
                    t.id,
                    e.level,
                    r.playerProxy.userClothe
                );
            }
        };
        e.prototype.onClickItem = function() {
            var t = this._data;
            if (t) {
                var e = t.cost.itemid,
                    o = t.cost.count,
                    i = r.bagProxy.getItemCount(e);
                a.utils.showConfirmItem(
                    i18n.t("USER_CLOTHE_COST_CHANGE_FACE", {
                        n: r.playerProxy.getKindIdName(1, e),
                        c: o
                    }),
                    e,
                    i,
                    function() {
                        if (i < o) a.alertUtil.alertItemLimit(e);
                        else {
                            r.playerProxy.sendResetJob(t.id);
                            facade.send("USER_JOB_CHANGE_CLOST");
                        }
                    },
                    "USER_CLOTHE_COST_CHANGE_FACE"
                );
            }
        };
        __decorate([_(l.default)], e.prototype, "item", void 0);
        __decorate([_(n.default)], e.prototype, "spine", void 0);
        return (e = __decorate([c], e));
    })(i.default);
o.default = d;
