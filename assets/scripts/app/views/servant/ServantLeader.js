var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = require("../item/ItemSlotUI"),
    l = require("../../Initializer"),
    r = require("./ServantLeaderItem"),
    a = require("../../models/TimeProxy"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblCurLv = null;
            e.lblCurEff = null;
            e.lblCurAdd = null;
            e.lblNextLv = null;
            e.lblNextEff = null;
            e.lblNextAdd = null;
            e.lblNum = null;
            e.lblDes = null;
            e.itemSlot = null;
            e.info = null;
            e.lock = null;
            e.upNode = null;
            e.lblMaxLv = null;
            e.btnUp = null;
            e.leaderItems = [];
            e.danyao = null;
            e.shuxing = null;
            e.curHero = null;
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe("PLAYER_USER_UPDATE", this.showData, this);
            facade.subscribe(
                l.bagProxy.UPDATE_BAG_ITEM,
                this.updateCount,
                this
            );
            this.curHero = this.node.openParam;
            var t = l.servantProxy.isActivedLeader(l.servantProxy.curSelectId);
            this.info.active = t;
            this.lock.active = !t;
            if (t) this.showData();
            else {
                var e = l.servantProxy.getLeadSys(l.servantProxy.curSelectId);
                this.lblDes.string = i18n.t("LEADER_ACTIVITE_DES", {
                    num: e.activation.length
                });
                if (e)
                    for (var o = 0; o < e.activation.length; o++)
                        if (o < this.leaderItems.length) {
                            var i = localcache.getItem(
                                localdb.table_hero,
                                e.activation[o]
                            );
                            this.leaderItems[o].data = i;
                        } else this.leaderItems[o].data = null;
            }
        };
        e.prototype.showData = function() {
            if (this.curHero) {
                var t = l.servantProxy.getLeadLv(
                    this.curHero.id,
                    this.curHero.leadlv
                );
                if (null == t) return;
                var e = l.servantProxy.getLeadLv(
                    this.curHero.id,
                    this.curHero.leadlv,
                    !0
                );
                this.lblCurLv.string = t.level + "";
                this.lblCurEff.string = "" + t.ep;
                this.lblCurAdd.string = t.drug / 100 + "%";
                this.lblNextLv.string = e
                    ? e.level + ""
                    : i18n.t("LEADER_MAX_LEVEL");
                this.lblNextEff.string = e ? "" + e.ep : "" + t.ep;
                this.lblNextAdd.string = e
                    ? e.drug / 100 + "%"
                    : t.drug / 100 + "%";
                var o = localcache.getItem(localdb.table_item, t.itemid);
                this.itemSlot.data = o;
                var i = l.bagProxy.getItemCount(t.itemid);
                this.upNode.active = null != e;
                this.lblMaxLv.node.active = null == e;
                this.lblNum.string = e
                    ? i18n.t("LEADER_NEED_NUM", {
                          num: e ? e.cost : 0,
                          count: i
                      })
                    : i18n.t("LEADER_MAX_LEVEL");
                if (e) {
                    this.shuxing.active = 0 != e.ep && 0 != t.ep;
                    this.danyao.active = 0 != e.drug && 0 != t.drug;
                }
            }
        };
        e.prototype.updateCount = function() {
            var t = l.servantProxy.getLeadLv(
                this.curHero.id,
                this.curHero.leadlv
            );
            if (null != t) {
                var e = l.servantProxy.getLeadLv(
                        this.curHero.id,
                        this.curHero.leadlv,
                        !0
                    ),
                    o = l.bagProxy.getItemCount(t.itemid);
                this.lblNum.string = e
                    ? i18n.t("LEADER_NEED_NUM", {
                          num: e ? e.cost : 0,
                          count: o
                      })
                    : i18n.t("LEADER_MAX_LEVEL");
            }
        };
        e.prototype.onClickUp = function() {
            var t = l.servantProxy.getLeadLv(
                this.curHero.id,
                this.curHero.leadlv
            );
            if (null != t) {
                var e = l.servantProxy.getLeadLv(
                    this.curHero.id,
                    this.curHero.leadlv,
                    !0
                );
                l.bagProxy.getItemCount(t.itemid) < e.cost
                    ? i.alertUtil.alertItemLimit(t.itemid)
                    : l.servantProxy.sendLeaderUp(this.curHero.id);
            }
        };
        e.prototype.onClickGo = function() {
            var t = l.servantProxy.getLeadSys(this.curHero.id);
            a.funUtils.openView(t.iconopen);
            i.utils.closeView(this);
            i.utils.closeNameView("servant/ServantView");
            i.utils.closeNameView("servant/ServantListView");
        };
        e.prototype.onClickClose = function() {
            i.utils.closeView(this);
        };
        __decorate([_(cc.Label)], e.prototype, "lblCurLv", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblCurEff", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblCurAdd", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblNextLv", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblNextEff", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblNextAdd", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblNum", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblDes", void 0);
        __decorate([_(n.default)], e.prototype, "itemSlot", void 0);
        __decorate([_(cc.Node)], e.prototype, "info", void 0);
        __decorate([_(cc.Node)], e.prototype, "lock", void 0);
        __decorate([_(cc.Node)], e.prototype, "upNode", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblMaxLv", void 0);
        __decorate([_(cc.Button)], e.prototype, "btnUp", void 0);
        __decorate([_([r.default])], e.prototype, "leaderItems", void 0);
        __decorate([_(cc.Node)], e.prototype, "danyao", void 0);
        __decorate([_(cc.Node)], e.prototype, "shuxing", void 0);
        return (e = __decorate([c], e));
    })(cc.Component);
o.default = d;
