var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../Initializer"),
    l = require("../../utils/Utils"),
    r = require("../../component/UrlLoad"),
    a = require("../../utils/UIUtils"),
    s = require("../../utils/ShaderUtils"),
    c = cc._decorator,
    _ = c.ccclass,
    d = c.property,
    u = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblUnlock = null;
            e.lblName = null;
            e.lblCost = null;
            e.lblTime = null;
            e.nodeUnlock = null;
            e.nodelock = null;
            e.btn = null;
            e.plant = null;
            e.grays = [];
            e.clNode = null;
            e.cashNode = null;
            return e;
        }
        e.prototype.onLoad = function () {
            this.addBtnEvent(this.btn);
        };
        e.prototype.onClickItem = function () {
            var t = this.data;
            if (t) {
                var e = new a.ItemSlotData();
                e.id = t.itemid;
                l.utils.openPrefabView("ItemInfo", !1, e);
            }
        };
        e.prototype.showData = function () {
            var t = this.data;
            if (t) {
                this.nodeUnlock.active = t.lv > n.flowerFriendProxy.level.flv;
                for (var e = 0; e < this.grays.length; e++)
                    s.shaderUtils.setImageGray(
                        this.grays[e],
                        this.nodeUnlock.active
                    );
                this.nodeUnlock.active &&
                    (this.lblUnlock.string = i18n.t("FLOWER_UNLOCK_LEVEL", {
                        d: t.lv
                    }));
                this.nodelock.active = !this.nodeUnlock.active;
                this.lblName.string = t.flower;
                if (t.dew) {
                    this.lblCost.string = l.utils.formatMoney(t.dew);
                    this.clNode.active = true;
                } else {
                    this.lblCost.string = l.utils.formatMoney(t.cash);
                    this.clNode.active = false;
                }
                this.cashNode.active = !this.clNode.active;
                this.lblTime.string = i18n.t("FLOWER_PLANT_TIME", {
                    d: l.timeUtil.second2hms(t.time)
                });
                this.plant.url = a.uiHelps.getFlowerFriendPlant(t.id, 2);
            }
        };
        __decorate([d(cc.Label)], e.prototype, "lblUnlock", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblName", void 0);

        __decorate([d(cc.Node)], e.prototype, "clNode", void 0);
        __decorate([d(cc.Node)], e.prototype, "cashNode", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblCost", void 0);

        __decorate([d(cc.Label)], e.prototype, "lblTime", void 0);
        __decorate([d(cc.Node)], e.prototype, "nodeUnlock", void 0);
        __decorate([d(cc.Node)], e.prototype, "nodelock", void 0);
        __decorate([d(cc.Button)], e.prototype, "btn", void 0);
        __decorate([d(r.default)], e.prototype, "plant", void 0);
        __decorate([d([cc.Sprite])], e.prototype, "grays", void 0);
        return (e = __decorate([_], e));
    })(i.default);
o.default = u;