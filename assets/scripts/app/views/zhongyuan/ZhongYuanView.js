var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = require("../../Initializer"),
    l = require("../../utils/UIUtils"),
    r = require("./ZhongYuanItem"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblBall = null;
            e.items = [];
            e.lblTime = null;
            e.lblConsume = null;
            e.btnPlay = null;
            e.tipNode = null;
            e.pointerNode = null;
            e.itemNode = null;
            e.consume = null;
            e.curIndex = 0;
            e.roundIndex = 0;
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe(
                n.zhongyuanProxy.ZHONGYUAN_DATA_UPDATE,
                this.onDataUpDate,
                this
            );
            facade.subscribe(
                n.bagProxy.UPDATE_BAG_ITEM,
                this.onItemUpdate,
                this
            );
            l.uiUtils.scaleRepeat(this.tipNode, 0.9, 1.1);
            n.zhongyuanProxy.sendInfo();
            n.shopProxy.sendList(!1);
            this.onItemUpdate();
        };
        e.prototype.onDataUpDate = function() {
            var t = this,
                e = n.zhongyuanProxy.data,
                o = 0;
            if (e) {
                l.uiUtils.countDown(e.info.eTime, this.lblTime, function() {
                    i.timeUtil.second >= e.info.eTime &&
                        (t.lblTime.string = i18n.t("ACTHD_OVERDUE"));
                });
                for (var r = 0; r < this.items.length; r++) {
                    this.items[r].data = e.list[r];
                    this.items[r].select = 0 == r;
                    this.pointerNode.rotation = -30;
                    e.list[r].get && o++;
                }
                if (n.zhongyuanProxy.win && n.zhongyuanProxy.isTrun) {
                    this.curIndex = n.zhongyuanProxy.win.id;
                    this.showEff(0);
                }
                this.btnPlay.node.active = o < e.list.length;
                this.consume = localcache.getItem(
                    localdb.table_zhongyuan,
                    o + 1
                );
                if (o >= e.list.length) {
                    this.lblConsume.string = i18n.t(
                        "ZHONG_YUAN_QUAN_BU_LIN_QU"
                    );
                    this.itemNode.active = !1;
                } else {
                    this.lblConsume.string = this.consume.cons
                        ? i18n.t("ZHONG_YUAN_XIAO_HAO", {
                              num: this.consume.cons
                          })
                        : i18n.t("ZHONG_YUAN_MIAN_FEI");
                    this.itemNode.active = this.consume.cons;
                }
                this.lblBall.string = n.bagProxy.getItemCount(e.need) + "";
                this.tipNode.active = 0 == n.bagProxy.getItemCount(e.need);
            }
        };
        e.prototype.showEff = function(t) {
            this.unscheduleAllCallbacks();
            this.schedule(this.showSelect, t);
        };
        e.prototype.showSelect = function() {
            for (
                var t = this.roundIndex % 16, e = 0;
                e < this.items.length;
                e++
            )
                this.items[e].select = t == e;
            this.pointerNode.rotation = (22.5 * t - 30) % 360;
            this.roundIndex++;
            if (this.roundIndex >= 16 && this.roundIndex < 32)
                this.showEff(0.03);
            else if (this.roundIndex >= 32 && this.roundIndex < 48)
                this.showEff(0.03 + (this.roundIndex - 32) / 320);
            else if (
                this.roundIndex >= 48 + this.curIndex &&
                this.roundIndex < 160
            ) {
                this.roundIndex = 0;
                this.curIndex = 0;
                this.unscheduleAllCallbacks();
                n.timeProxy.floatReward();
                n.zhongyuanProxy.isTrun = !1;
                facade.send(n.zhongyuanProxy.ZHONGYUAN_ITEM_LINQU);
            }
        };
        e.prototype.onItemUpdate = function() {
            if (n.zhongyuanProxy.data) {
                var t = n.bagProxy.getItemCount(n.zhongyuanProxy.data.need);
                this.tipNode.active = 0 == t;
                this.lblBall.string = t + "";
            }
        };
        e.prototype.onClickClose = function() {
            i.utils.closeView(this);
        };
        e.prototype.onClickPlay = function() {
            if (!n.zhongyuanProxy.isTrun) {
                if (
                    n.bagProxy.getItemCount(n.zhongyuanProxy.data.need) <
                    this.consume.cons
                ) {
                    i.alertUtil.alertItemLimit(n.zhongyuanProxy.data.need);
                    this.onClickAdd();
                } else {
                    n.zhongyuanProxy.sendPlay();
                    n.zhongyuanProxy.isTrun = !0;
                }
            }
        };
        e.prototype.onClickAdd = function() {
            i.utils.openPrefabView("ActivitySpecialBuy", null, {
                data: n.zhongyuanProxy.shop[0],
                activityId: n.zhongyuanProxy.data.info.id
            });
            n.shopProxy.openShopBuy(n.zhongyuanProxy.data.need);
        };
        e.prototype.onClickTab = function(t, e) {
            switch (e) {
                case "1":
                    i.utils.openPrefabView(
                        "ActivityShopView",
                        null,
                        n.zhongyuanProxy.dhShop
                    );
                    break;

                case "2":
                    i.utils.openPrefabView(
                        "limitactivity/LimitActivityView",
                        null,
                        {
                            type: n.limitActivityProxy.ZHONGYUAN_TYPE
                        }
                    );
                    break;

                case "3":
                    i.utils.openPrefabView("zhongyuan/SacrificeView");
                    break;

                case "4":
                    n.zhongyuanProxy.sendPaiHang();
            }
        };
        __decorate([c(cc.Label)], e.prototype, "lblBall", void 0);
        __decorate([c([r.default])], e.prototype, "items", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblTime", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblConsume", void 0);
        __decorate([c(cc.Button)], e.prototype, "btnPlay", void 0);
        __decorate([c(cc.Node)], e.prototype, "tipNode", void 0);
        __decorate([c(cc.Node)], e.prototype, "pointerNode", void 0);
        __decorate([c(cc.Node)], e.prototype, "itemNode", void 0);
        return (e = __decorate([s], e));
    })(cc.Component);
o.default = _;
