var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../item/ItemSlotUI"),
    l = require("../../Initializer"),
    r = require("../../utils/ApiUtils"),
    a = require("../../Config"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblIndex = null;
            e.lblNum = null;
            e.btnGet = null;
            e.btnYlq = null;
            e.btnLock = null;
            e.sliderItems = [];
            e.goldItems = [];
            e.lockNode = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                var e = localcache.getItem(localdb.table_lion_rwd, t.id);
                this.lblIndex.string = e.name;
                this.lblNum.string = t.coin + "";
                if (l.lionProxy.isLockGold) {
                    this.btnYlq.node.active = 1 == t.sGet && 1 == t.gGet;
                    this.btnGet.node.active =
                        0 == t.sGet || 0 == t.gGet || null == t.gGet;
                    this.btnGet.interactable = l.lionProxy.cfg.cons >= t.coin;
                } else {
                    this.btnYlq.node.active = 1 == t.sGet;
                    this.btnGet.node.active = 0 == t.sGet;
                    this.btnGet.interactable = l.lionProxy.cfg.cons >= t.coin;
                }
                
                if(t.silver)
                {
                    for(var i=0;i<this.sliderItems.length;i++){
                        var silverItem = this.sliderItems[i];
                        if(i < t.silver.length){
                            silverItem.data = t.silver[i];
                        }
                        else{
                            silverItem.node.parent.active = false;
                        }
                    }
                }
                else
                {
                    var i = e.name;
                }

                for (var o = 0; o < this.goldItems.length; o++)
                    o < t.gold.length && (this.goldItems[o].data = t.gold[o]);
                this.lockNode.active = !l.lionProxy.isLockGold;
                this.btnLock.node.active = !l.lionProxy.isLockGold;
            }
        };
        e.prototype.onClickLock = function() {
            for (var t = null, e = 0; e < l.purchaseProxy.gift.length; e++)
                if (
                    l.purchaseProxy.gift[e].type == l.limitActivityProxy.LION_ID
                ) {
                    t = l.purchaseProxy.gift[e];
                    break;
                }
            if (t) {
                // l.lionProxy.isLockGold = !0;
                // facade.send(l.lionProxy.LION_GOLD_LOCK);
                //开始解锁标志
                l.lionProxy.isUnlocking = true;

                //test
                // facade.send("MOON_CARD_BUY_UPDATE");
                // facade.send("RECHARGE_FAIL");

                var o = 10 * t.grade + 1e6 + 1e4 * t.id;
                r.apiUtils.recharge(
                    l.playerProxy.userData.uid,
                    a.Config.serId,
                    o,
                    t.grade,
                    i18n.t("LION_GOLD_RWD"),
                    0
                );
            }
        };
        e.prototype.onClickGet = function() {
            var t = this._data;
            l.lionProxy.sendGetRwd(t.id);
        };
        __decorate([_(cc.Label)], e.prototype, "lblIndex", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblNum", void 0);
        __decorate([_(cc.Button)], e.prototype, "btnGet", void 0);
        __decorate([_(cc.Button)], e.prototype, "btnYlq", void 0);
        __decorate([_(cc.Button)], e.prototype, "btnLock", void 0);
        __decorate([_(n.default)], e.prototype, "sliderItems", void 0);
        __decorate([_([n.default])], e.prototype, "goldItems", void 0);
        __decorate([_(cc.Node)], e.prototype, "lockNode", void 0);
        return (e = __decorate([c], e));
    })(i.default);
o.default = d;
