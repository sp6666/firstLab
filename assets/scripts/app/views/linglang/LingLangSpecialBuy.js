var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/SelectMax"),
    l = require("../../Initializer"),
    r = require("../../utils/Utils"),
    ui = require("../../utils/UIUtils"),
    u = require("../../component/UrlLoad"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblDes = null;
            e.silderCount = null;
            e.lblPrice = null;
            e.lblLimit = null;
            e.curData = null;
            e.activityId = null;
            e.urlload = null;
            e.count = 1;    //初始的数量，没有就是1
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe(l.lingLangProxy.LINGLANG_DATA_UPDATE, this.updateData, this);
            var t = this.node.openParam;
            this.curData = t.data;
            if(!r.stringUtil.isBlank(t.count))
            {
                this.count = t.count;
            }
            if (this.curData) {
                this.lblDes.string = t.explain;
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
            var t = this.curData.need.count * this.silderCount.curValue;
            if (0 != this.curData.limit){
                if(this.curData.need.id == 1 && t > l.playerProxy.userData.cash){
                    r.alertUtil.alertItemLimit(this.curData.need.id);
                }
                else if(this.curData.need.id == 3 && t > l.playerProxy.userData.food){
                    r.alertUtil.alertItemLimit(this.curData.need.id);
                }else if(this.silderCount.curValue > this.curData.limit) {
                    r.alertUtil.alert18n("SHOP_BUY_NUM_GT_MAX");
                }
                else {
                    // l.limitActivityProxy.sendSpecialBuy(
                    //     this.activityId,
                    //     this.curData.id,
                    //     this.silderCount.curValue
                    // );
                    l.lingLangProxy.sendBuy(this.silderCount.curValue);
                    if(this.node.openParam.cb != null) this.node.openParam.cb();
                    this.onClickClose();
                }
            }
            else r.alertUtil.alert18n("SHOP_BUY_NUM_GT_MAX");
        };
        e.prototype.onClickClose = function() {
            r.utils.closeView(this);
        };
        e.prototype.updateData = function() {
            this.onClickClose();
        };
        __decorate([c(cc.Label)], e.prototype, "lblDes", void 0);
        __decorate([c(i.default)], e.prototype, "silderCount", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblPrice", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblLimit", void 0);
        __decorate([c(u.default)], e.prototype, "urlload", void 0);
        return (e = __decorate([s], e));
    })(cc.Component);
o.default = _;
