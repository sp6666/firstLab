var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = require("../../component/UrlLoad"),
    l = require("../../Initializer"),
    r = require("../../utils/UIUtils"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.nameUrl = null;
            e.roleUrl = null;
            e.lblArr = [];
            e.lbltalk = null;
            e.talkNode = null;
            e.eff1 = null;
            e.talkArr = [];
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe("UPDATE_BAG_ITEM", this.onBagItem, this);
            facade.subscribe("UI_TOUCH_MOVE_LEFT", this.onClickClose, this);
            this.hero = this.node.openParam;
            this.nameUrl.url = r.uiHelps.getStoryRoleName(this.hero.heroid);
            this.roleUrl.url = r.uiHelps.getServantSpine(this.hero.heroid);
            var t = localcache.getItem(
                localdb.table_yingyuantalk,
                this.hero.heroid
            );
            this.talkArr = t.gift.split("|");
            this.talkNode.active = !1;
            this.onBagItem();
        };
        e.prototype.onClickClose = function() {
            i.utils.closeView(this);
        };
        e.prototype.onClickTab = function(t, e) {
            "1" == e
                ? i.utils.openPrefabView("support/SupportChangeShop")
                : "2" == e
                ? i.utils.openPrefabView("support/SupportBuyShop")
                : "3" == e && l.supportProxy.sendLookRank();
        };
        e.prototype.onClickSupport = function(t, e) {
            var o = l.supportProxy.cfg.info.eTime,
                n = l.supportProxy.cfg.info.sTime,
                r = i.timeUtil.second;
            if (n <= r && r < o) {
                var a = localcache.getItem(localdb.table_yingyuanBuyShop, e);
                localcache.getItem(localdb.table_item, a.itemid);
                if (0 == l.bagProxy.getItemCount(a.itemid)) {
                    i.utils.openPrefabView("support/SupportBuyShop");
                    return;
                }
                l.supportProxy.sendGift(a.itemid, this.hero.heroid);
                this.lbltalk.string = this.talkArr[
                    Math.floor(Math.random() * this.talkArr.length)
                ];
                l.supportProxy.sendLookRecord(l.supportProxy.cfg.info.id);
                this.talkNode.active = !0;
                this.eff1.animation = "animation";
                this.eff1.node.active = !0;
                i.alertUtil.alert(
                    i18n.t("SUPPORT_REN_QI_ZENG_JIA", {
                        name: this.hero.name,
                        value1: a.gongxian,
                        value2: a.gongxian
                    })
                );
            } else i.alertUtil.alert18n("ACTIVITY_NOT_IN_TIME");
        };
        e.prototype.onBagItem = function() {
            for (var t = [1100, 1101, 1102, 1103], e = 0; e < t.length; e++)
                this.lblArr[e].string = l.bagProxy.getItemCount(t[e]) + "";
        };
        __decorate([c(n.default)], e.prototype, "nameUrl", void 0);
        __decorate([c(n.default)], e.prototype, "roleUrl", void 0);
        __decorate([c([cc.Label])], e.prototype, "lblArr", void 0);
        __decorate([c(cc.Label)], e.prototype, "lbltalk", void 0);
        __decorate([c(cc.Node)], e.prototype, "talkNode", void 0);
        __decorate([c(sp.Skeleton)], e.prototype, "eff1", void 0);
        return (e = __decorate([s], e));
    })(cc.Component);
o.default = _;
