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
            //e.lblIndex = null;
            e.lblNum = null;
            e.btnGet = null;
            //e.btnYlq = null;
            //e.btnLock = null;
            e.sliderGot = []; //已领取
            e.goldGot = []; //已领取

            e.sliderItems = [];
            e.goldItems = [];

            //锁
            e.lockSliderNode = [];  
            e.lockGoldNode = [];

            //只有一个物品
            e.nodeSliderOnce = [];  
            e.nodeGoldOnce = [];

            //奖励的根节点
            e.nodeSlider = [];  
            e.nodeGold = [];
            return e;
        }
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                if(t.id == 1)
                {
                    var i = 0;
                }

                /*
                var rwd = null;
                for(var idx = 0; idx < l.lionProxy.cfg.rwd.length; idx++)
                {
                    if(l.lionProxy.cfg.rwd[idx].id == t.id)
                    {
                        rwd = l.lionProxy.cfg.rwd[idx];
                        break;
                    }
                }
                */
                
                //是否可领奖
                var canUse = l.lionProxy.cfg.grade >= t.id;  //id

                //等级
                this.lblNum.string = t.coin + "";

                //
                this.btnGet.interactable = canUse;

                //已领取标签
                for(var key in this.goldGot)
                {
                    this.goldGot[key].active = 1 == t.gGet;
                }
                //已领取标签
                for(var key in this.sliderGot)
                {
                    this.sliderGot[key].active = 1 == t.sGet;
                }

                if (l.lionProxy.isLockGold) {
                    //领取按钮
                    this.btnGet.node.active =
                        0 == t.sGet || 0 == t.gGet || null == t.gGet;
                } 
                else {
                    //领取按钮
                    this.btnGet.node.active = 0 == t.sGet;
                }
                
                //银奖
                for(var i=0;i<this.sliderItems.length;i++){
                    var silverItem = this.sliderItems[i];
                    if(i < t.silver.length){
                        silverItem.data = t.silver[i];
                        silverItem.node.parent.active = true;

                        this.nodeSliderOnce[i].active = t.silver[i].count == 1;
                    }
                    else{
                        silverItem.node.parent.active = false;
                    }
                }

                //银奖的锁
                for(var key in this.lockSliderNode)
                {
                    this.lockSliderNode[key].active = !canUse;
                }

                //金奖
                for (var idx = 0; idx < this.goldItems.length; idx++)
                {
                    if(idx < t.gold.length)
                    {
                        this.goldItems[idx].data = t.gold[idx];
                        this.nodeGold[idx].active = true;

                        this.nodeGoldOnce[idx].active = t.gold[idx].count == 1;
                    }
                    else{
                        this.nodeGold[idx].active = false;
                    }
                }

                //金奖的锁，金狮解锁，并且可领取
                var lockGold = l.lionProxy.isLockGold && canUse;
                for(var key in this.lockGoldNode)
                {
                    this.lockGoldNode[key].active = !lockGold;
                }

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
            if(t.noOpen)
            {
                //这个标记说明是放在界面下面的，不能点击
                return;
            }
            l.lionProxy.sendGetRwd(t.id);
        };
        //__decorate([_(cc.Label)], e.prototype, "lblIndex", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblNum", void 0);
        __decorate([_(cc.Button)], e.prototype, "btnGet", void 0);
        __decorate([_([cc.Node])], e.prototype, "sliderGot", void 0);   //银奖已领取标记
        __decorate([_([cc.Node])], e.prototype, "goldGot", void 0);   //金奖已领取标记
        //__decorate([_(cc.Button)], e.prototype, "btnYlq", void 0);
        //__decorate([_(cc.Button)], e.prototype, "btnLock", void 0);
        __decorate([_(n.default)], e.prototype, "sliderItems", void 0);
        __decorate([_([n.default])], e.prototype, "goldItems", void 0);

        __decorate([_([cc.Node])], e.prototype, "lockSliderNode", void 0);  //银奖的锁
        __decorate([_([cc.Node])], e.prototype, "lockGoldNode", void 0);    //金奖的锁

        __decorate([_([cc.Node])], e.prototype, "nodeSliderOnce", void 0);  //银奖只有1个物品
        __decorate([_([cc.Node])], e.prototype, "nodeGoldOnce", void 0);    //金奖只有1个物品

        __decorate([_([cc.Node])], e.prototype, "nodeSlider", void 0);  //银奖的节点
        __decorate([_([cc.Node])], e.prototype, "nodeGold", void 0);    //金奖的节点
        return (e = __decorate([c], e));
    })(i.default);
o.default = d;
