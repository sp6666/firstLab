var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = require("../../component/List"),
    l = require("../../Initializer"),
    r = require("../../models/TimeProxy"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.listGift = null;
            e.list = null;
            e.nodeGift = null;
            e.nodeList = null;
            e.lblTime = null;
            e.nodeBtn1 = null;
            e.nodeBtn2 = null;
            e.nodeTab = null;
            e.btns = [];
            e.tab = null;
            e._curIndex = 4;
            return e;
        }
        e.prototype.onLoad = function() {
            var t = this.node.openParam;
            if (t && 0 != t.id) {
                var e = l.shopProxy.isHaveItem(t.id);
                if(e){
                    i.utils.openPrefabView("shopping/ShopBuy", !1, e);
                }
                else{
                    l.shopProxy.openShopBuy(t.id);
                }
            }
            this.onClickTab(null, 1);
            facade.subscribe(
                l.shopProxy.UPDATE_SHOP_LIST,
                this.updateCurShow,
                this
            );
            this.nodeBtn1.active = l.shopProxy.list.length > 0;
            this.nodeBtn2.active =
                null != l.shopProxy.giftList &&
                l.shopProxy.giftList.list.length > 0;
            this.nodeTab.active = this.nodeBtn1.active && this.nodeBtn2.active;
        };
        e.prototype.updateCurShow = function() {
            this.onClickTab(null, this.nodeList.active ? 1 : 2);
        };
        e.prototype.onClickTab = function(t, e) {
            var o = parseInt(e);
            this.tab.active = this.nodeList.active = 1 == o;
            this.nodeGift.active = 2 == o;
            this.lblTime.node.active = 2 == o;
            this.nodeList.active && this.onClickListTab(null, this._curIndex);
            if (this.nodeGift.active) {
                this.lblTime.string = i18n.t("SHOP_NEXT_TIME", {
                    t: i.timeUtil.getDateDiff(l.shopProxy.giftList.cft.eTime)
                });
                this.listGift.data = this.getGiftList();
            }
        };
        e.prototype.onClickListTab = function(t, e) {
            var o = parseInt(e);
            this._curIndex = o;
            for (var i = 0; i < this.btns.length; i++)
                this.btns[i].interactable = i != o;
            this.list.data = this.getShopList(o);
        };
        e.prototype.getShopList = function(t) {
            void 0 === t && (t = 0);
            for (var e = [], o = l.shopProxy.list.length, i = 0; i < o; i++) {
                var n = l.shopProxy.list[i];
                if (
                    null != n &&
                    !(0 != n.vip && n.vip > l.playerProxy.userData.vip)
                ) {
                    var r = localcache.getItem(localdb.table_item, n.item.id);
                    switch (t) {
                        case 4:
                            n.islimit && e.push(n);
                            break;

                        default:
                            (r.classify == t ||
                                (null == r.classify && 0 == t)) &&
                                e.push(n);
                    }
                }
            }
            e.sort(function(t, e) {
                var o = 1 == t.islimit ? -1 : 1,
                    i = 1 == e.islimit ? -1 : 1;
                return o != i ? o - i : t.need - e.need;
            });
            return e;
        };
        e.prototype.getGiftList = function() {
            for (
                var t = [], e = l.shopProxy.giftList.list.length, o = 0;
                o < e;
                o++
            ) {
                var i = l.shopProxy.giftList.list[o];
                (0 != i.vip && i.vip > l.playerProxy.userData.vip) || t.push(i);
            }
            t.sort(function(t, e) {
                return t.need - e.need;
            });
            return t;
        };
        e.prototype.onClickClost = function() {
            i.utils.closeView(this);
        };
        e.prototype.onClickRecharge = function() {
            r.funUtils.openView(r.funUtils.recharge.id);
        };
        __decorate([c(n.default)], e.prototype, "listGift", void 0);
        __decorate([c(n.default)], e.prototype, "list", void 0);
        __decorate([c(cc.Node)], e.prototype, "nodeGift", void 0);
        __decorate([c(cc.Node)], e.prototype, "nodeList", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblTime", void 0);
        __decorate([c(cc.Node)], e.prototype, "nodeBtn1", void 0);
        __decorate([c(cc.Node)], e.prototype, "nodeBtn2", void 0);
        __decorate([c(cc.Node)], e.prototype, "nodeTab", void 0);
        __decorate([c([cc.Button])], e.prototype, "btns", void 0);
        __decorate([c(cc.Node)], e.prototype, "tab", void 0);
        return (e = __decorate([s], e));
    })(cc.Component);
o.default = _;
