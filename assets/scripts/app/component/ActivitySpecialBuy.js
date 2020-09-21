var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("./SelectMax"),
    n = require("../views/item/ItemSlotUI"),
    l = require("../Initializer"),
    u = require("./UrlLoad"),
    r = require("../utils/Utils"),
    ui = require("../utils/UIUtils"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblDes = null;
            e.silderCount = null;
            e.item = null;
            e.lblPrice = null;
            e.lblLimit = null;
            e.curData = null;
            e.activityId = null;
            e.urlload = null;
            e.count = 1;    //初始的数量，没有就是1
            return e;
        }
        e.prototype.onLoad = function() {
            var t = this.node.openParam;
            this.curData = t.data;
            this.activityId = t.activityId;
            if(!r.stringUtil.isBlank(t.count))
            {
                this.count = t.count;
            }
            if (this.curData) {
                var e = localcache.getItem(
                    localdb.table_item,
                    this.curData.items.id
                );
                this.item.data = e;
                this.lblDes.string = e.explain;
                this.lblPrice.string = this.curData.need.count * this.count + "";
                if(t.buyOnce) {
                    this.silderCount.buyOnce = t.buyOnce;
                }
                this.silderCount.curValue = this.count;
                this.lblLimit.string = i18n.t("LEVEL_GIFT_XIAN_TXT_2", {
                    num: this.curData.limit
                });
                this.silderCount.max = this.curData.limit;
                var o = this;
                this.silderCount.changeHandler = function() {
                    var t = o.curData.need.count * o.silderCount.curValue;
                    o.lblPrice.string = t + "";
                };

                this.urlload.url = ui.uiHelps.getResIcon(this.curData.need.id);
            }
        };
        e.prototype.onClickBuy = function() {
            var t = this.curData.items.count * this.silderCount.curValue;
            if (0 != this.curData.limit){
                if(this.curData.need.id == 1 && t > l.playerProxy.userData.cash){
                    r.alertUtil.alertItemLimit(this.curData.need.id);
                }
                else if(this.curData.need.id == 3 && t > l.playerProxy.userData.food){
                    r.alertUtil.alertItemLimit(this.curData.need.id);
                }else if(t > this.curData.limit) {
                    r.alertUtil.alert18n("SHOP_BUY_NUM_GT_MAX");
                }
                else {
                    l.limitActivityProxy.sendSpecialBuy(
                        this.activityId,
                        this.curData.id,
                        this.silderCount.curValue
                    );
                    this.onClickClose();
                }
            }
            else r.alertUtil.alert18n("SHOP_BUY_NUM_GT_MAX");
        };
        e.prototype.onClickClose = function() {
            r.utils.closeView(this);
        };
        __decorate([c(cc.Label)], e.prototype, "lblDes", void 0);
        __decorate([c(i.default)], e.prototype, "silderCount", void 0);
        __decorate([c(n.default)], e.prototype, "item", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblPrice", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblLimit", void 0);
        __decorate([c(u.default)], e.prototype, "urlload", void 0);
        return (e = __decorate([s], e));
    })(cc.Component);
o.default = _;
