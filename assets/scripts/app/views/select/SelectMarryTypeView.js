var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../item/ItemSlotUI"),
    n = require("../../utils/UIUtils"),
    l = require("../../Initializer"),
    r = require("../../utils/Utils"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblGoldCost = null;
            e.lblHaveGold = null;
            e.lblBallCost = null;
            e.lblHaveBall = null;
            e.goldItem = null;
            e.ballItem = null;
            e.curData = null;
            return e;
        }
        e.prototype.onLoad = function() {
            this.curData = this.node.openParam;
            if (this.curData) {
                this.adult = localcache.getItem(
                    localdb.table_adult,
                    this.curData.honor
                );
                var t = new n.ItemSlotData();
                t.itemid = 1;
                t.count = this.adult.zhaoqin;
                this.goldItem.data = t;
                this.lblGoldCost.string = i18n.t("SON_MARRY_COST_GOLD", {
                    str: this.adult.zhaoqin
                });
                this.lblHaveGold.string = i18n.t("SON_MARRY_COST_COUNT", {
                    value: l.playerProxy.userData.cash
                });
                var e = new n.ItemSlotData();
                e.itemid = this.adult.itemid;
                e.count = 1;
                var o = localcache.getItem(
                    localdb.table_item,
                    this.adult.itemid
                );
                this.lblBallCost.string = i18n.t("SON_MARRY_COST_ITEM", {
                    str: o.name
                });
                this.lblHaveBall.string = i18n.t("SON_MARRY_COST_COUNT", {
                    value: l.bagProxy.getItemCount(this.adult.itemid)
                });
            }
        };
        e.prototype.onClickGold = function() {
            l.playerProxy.userData.cash < this.adult.zhaoqin
                ? r.alertUtil.alertItemLimit(1)
                : this.onSendMSG(1);
        };
        e.prototype.onClickBall = function() {
            0 != l.bagProxy.getItemCount(this.adult.itemid)
                ? this.onSendMSG(2)
                : r.alertUtil.alertItemLimit(this.adult.itemid);
        };
        e.prototype.onSendMSG = function(t) {
            1 == l.sonProxy.tiQinObj.marryType
                ? l.sonProxy.sendJieHun(
                      l.sonProxy.tiQinObj.tUid,
                      t,
                      l.sonProxy.tiQinObj.tSid,
                      this.curData.id
                  )
                : 2 == l.sonProxy.tiQinObj.marryType &&
                  l.sonProxy.sendAgree(
                      l.sonProxy.tiQinObj.tUid,
                      t,
                      l.sonProxy.tiQinObj.tSid,
                      this.curData.id
                  );
            r.utils.closeView(this);
        };
        __decorate([c(cc.Label)], e.prototype, "lblGoldCost", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblHaveGold", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblBallCost", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblHaveBall", void 0);
        __decorate([c(i.default)], e.prototype, "goldItem", void 0);
        __decorate([c(i.default)], e.prototype, "ballItem", void 0);
        return (e = __decorate([s], e));
    })(cc.Component);
o.default = _;
