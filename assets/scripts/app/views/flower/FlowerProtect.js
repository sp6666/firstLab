var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = require("../../Initializer"),
    l = require("../item/ItemSlotUI"),
    r = require("../../utils/UIUtils"),
    a = require("../../component/SelectMax"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.itemSlot = null;
            e.btnSure = null;
            e.btnCancel = null;
            e.lblTip = null;
            e.lblCoolCd = null;
            e.silder = null;
            e.chenluNode = null;
            e.yuanbaoNode = null;
            e.bCliCK = !1;
            e.type = 0;
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe(
                n.flowerProxy.UPDATE_FLOWER_PROTECT,
                this.onUpdateShow,
                this
            );
            this.ininProtect();
        };
        e.prototype.ininProtect = function() {
            var t = this,
                e = this.node.openParam;
            this.type = e.type;
            var o = new r.ItemSlotData();
            o.id = 1 == this.type ? 10001 : 1;
            o.count =
                1 == this.type
                    ? n.flowerProxy.level.chenlu
                    : n.playerProxy.userData.cash;
            this.itemSlot.data = o;
            this.chenluNode.active = 1 == this.type;
            this.yuanbaoNode.active = 2 == this.type;
            this.protects = localcache.getList(localdb.table_flowerProtect);
            if (
                null != this.protects &&
                !(this.protects.length <= 0) &&
                this.silder
            ) {
                this.silder.max = this.protects.length;
                this.silder.changeHandler = function() {
                    var e = t.protects[t.silder.curValue - 1];
                    if (null != e) {
                        t.curProtect = e;
                        var o = Math.floor(t.curProtect.cd / 3600),
                            i = Math.floor(t.curProtect.time / 3600);
                        t.lblCoolCd.string = i18n.t("FLOWER_PROTECT_TIME", {
                            h: o
                        });
                        t.lblTip.string = i18n.t("FLOWER_PROTECT_CD_LIMIT", {
                            n: 1 == t.type ? e.dew : e.yb
                        });
                        t.silder.lblCount.string = i18n.t("COMMON_HOUR", {
                            d: i
                        });
                        t.chenluNode.x = e.dew > 9999 ? -78 : -74;
                        t.yuanbaoNode.x = e.yb > 999 ? -70 : -66;
                    }
                };
                this.silder.curValue = 1;
            }
        };
        e.prototype.onUpdateShow = function() {
            if (null != this.curProtect && this.bCliCK) {
                this.bCliCK = !1;
                var t = Math.floor(this.curProtect.time / 3600);
                i.alertUtil.alert(
                    i18n.t("FLOWER_PROTECT_SUCCESS", {
                        h: t
                    })
                );
                this.onClickClost();
            }
        };
        e.prototype.onClickGo = function() {
            if (!this.bCliCK && null != this.curProtect) {
                if (1 == this.type) {
                    if (this.curProtect.dew > n.flowerProxy.level.chenlu) {
                        i.alertUtil.alert18n("FLOWER_PROTECT_CHENLU_LIMIT");
                        return;
                    }
                } else if (this.curProtect.yb > n.playerProxy.userData.cash) {
                    i.alertUtil.alertItemLimit(1);
                    return;
                }
                this.bCliCK = !0;
                n.flowerProxy.sendProtect(
                    this.curProtect.id,
                    1 == this.type ? 0 : 1
                );
            }
        };
        e.prototype.onClickClost = function() {
            i.utils.closeView(this);
        };
        __decorate([_(l.default)], e.prototype, "itemSlot", void 0);
        __decorate([_(cc.Button)], e.prototype, "btnSure", void 0);
        __decorate([_(cc.Button)], e.prototype, "btnCancel", void 0);
        __decorate([_(cc.RichText)], e.prototype, "lblTip", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblCoolCd", void 0);
        __decorate([_(a.default)], e.prototype, "silder", void 0);
        __decorate([_(cc.Node)], e.prototype, "chenluNode", void 0);
        __decorate([_(cc.Node)], e.prototype, "yuanbaoNode", void 0);
        return (e = __decorate([c], e));
    })(cc.Component);
o.default = d;
