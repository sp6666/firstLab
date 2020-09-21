var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var n = require("../../utils/Utils"),
    l = require("../../Initializer"),
    r = require("../../utils/ShaderUtils"),
    a = require("../../models/TimeProxy"),
    uIUtils = require("../../utils/UIUtils"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.itemArr = [];
            e.lblHqCount = null;
            e.bg = null;
            e.lblTime = null;
            e.curIndex = -1;
            e.roundIndex = 0;
            e.itemParent = null;
            e.tipNode = null;
            e.nodeArrow = null;
            e.effTen = null;
            return e;
        }
        e.prototype.onLoad = function () {
            facade.subscribe(
                l.queenProxy.QUEEN_DATA_UPDATE,
                this.onDataUpdate,
                this
            );
            facade.subscribe(
                l.bagProxy.UPDATE_BAG_ITEM,
                this.onItemUpdate,
                this
            );

            facade.subscribe(
                l.queenProxy.QUEEN_PLAY_UPDATE,
                this.onDataUpdate,
                this
            );


            facade.subscribe("UI_TOUCH_MOVE_LEFT", this.onClickClose, this);

            var node = this.itemParent.children[0];
            for (var i = 0; i < l.queenProxy.tableNum - 1; i++) {
                var newNode = cc.instantiate(node);
                newNode.parent = this.itemParent;
                newNode.rotation = l.queenProxy.tableAngle * (i + 1);
            }

            for (var node of this.itemParent.children) {
                this.itemArr.push(node.getComponent('QueenItem'));
            }

            r.shaderUtils.setBlur(this.bg);
            l.queenProxy.sendOpen();
            this.onItemUpdate();
            l.shopProxy.sendList(!1);

            uIUtils.uiUtils.scaleRepeat(this.tipNode, 0.9, 1.1);

            this.effTen.opacity = 0;
        };
        e.prototype.onDataUpdate = function (t) {
            if (!t) {
                return;
            }
            if (t.play_num > 0) {
                this.curIndex = t.queen_status.position - 1;
                this.showEff(0);
                if (t.play_num > 1) {
                    this.effTen.stopAllActions();
                    this.effTen.runAction(cc.fadeIn(0.5));
                }
                t.play_num = 0;
            } else if (t) {

                var order = t.queen_status.rwd_order;
                for (var e = 0; e < this.itemArr.length; e++) {
                    if (e < t.items.length) {
                        this.itemArr[e].select = t.queen_status.position - 1 == e;
                        this.itemArr[e].data = t.items[e].item_rwd[order[e + 1]];
                    }
                    if (t.queen_status.position - 1 == e) {
                        this.nodeArrow.rotation = e * l.queenProxy.tableAngle;
                    }
                }
            }

            var self = this;
            uIUtils.uiUtils.countDown(
                t.info.eTime,
                this.lblTime,
                function () {
                    self.lblTime.string = i18n.t("ACTHD_OVERDUE");
                },
                !0,
                "USER_REMAIN_TIME",
                "d"
            );

            this.tipNode.active =
                0 == l.bagProxy.getItemCount(t.present.id);

            l.queenProxy.data && this.onItemUpdate();
        };
        e.prototype.showEff = function (t) {
            this.unscheduleAllCallbacks();
            this.schedule(this.showSelect, t);
        };
        e.prototype.showSelect = function () {

            for (var t = this.roundIndex % 10, e = 0; e < this.itemArr.length; e++) {
                this.itemArr[e].select = t == e;
                if (t == e) {
                    this.nodeArrow.rotation = e * l.queenProxy.tableAngle;
                }
            }
            this.roundIndex++;
            if (this.roundIndex >= 10 && this.roundIndex < 20)
                this.showEff(0.03);
            else if (this.roundIndex >= 20 && this.roundIndex < 30)
                this.showEff(0.03 + (this.roundIndex - 20) / 200);
            else if (
                this.roundIndex >= 30 + this.curIndex &&
                this.roundIndex < 100
            ) {
                this.roundIndex = 0;
                this.curIndex = 0;
                this.unscheduleAllCallbacks();
                l.timeProxy.floatReward();
                this.schedule(this.updateIcons, 0);

                this.startShowRwd = true;

                var t = l.queenProxy.data;
                for (var e = 0; e < this.itemArr.length; e++) {
                    if (e < t.items.length) {
                        this.itemArr[e].select = t.queen_status.position - 1 == e;
                    }
                    if (t.queen_status.position - 1 == e) {
                        this.nodeArrow.rotation = e * l.queenProxy.tableAngle;
                    }
                }
                if (this.effTen.opacity > 0) {
                    this.effTen.runAction(cc.fadeOut(0.5));
                }

            }


        };

        e.prototype.updateIcons = function () {
            if ((n.utils.isOpenView("AlertItemShow") || n.utils.isOpenView("AlertItemMore")) && this.startShowRwd) {
                this.startShowRwd = false;
            } else {
                //关闭后再刷新
                if (!n.utils.isOpenView("AlertItemMore") && !n.utils.isOpenView("AlertItemShow") && !this.startShowRwd) {
                    var t = l.queenProxy.data;
                    var order = t.queen_status.rwd_order;
                    for (var e = 0; e < this.itemArr.length; e++) {
                        if (e < t.items.length) {
                            this.itemArr[e].select = t.queen_status.position - 1 == e;
                            this.itemArr[e].data = t.items[e].item_rwd[order[e + 1]];
                        }
                        if (t.queen_status.position - 1 == e) {
                            this.nodeArrow.rotation = e * l.queenProxy.tableAngle;
                        }
                    }

                    this.unschedule(this.updateIcons);
                    this.curIndex = -1;
                }

            }
        };

        e.prototype.onItemUpdate = function () {
            if (l.queenProxy.data) {
                var t = l.bagProxy.getItemCount(l.queenProxy.data.present.id);
                this.lblHqCount.string = t + "";
            }
        };

        e.prototype.onClickRoll = function (t, e) {
            if (0 > this.curIndex) {
                var o = parseInt(e);
                if (
                    l.bagProxy.getItemCount(l.queenProxy.data.present.id) < o
                ) {
                    var i = localcache.getItem(
                        localdb.table_item,
                        l.queenProxy.data.present.id
                    );

                    this.onClickAdd();

                    n.alertUtil.alert(
                        i18n.t("COMMON_LIMIT", {
                            n: i.name
                        })
                    );

                } else l.queenProxy.sendBtnDraw(o);
            } else n.alertUtil.alert18n("QUEEN_IS_ROLLING");
        };
        e.prototype.onClickClose = function () {
            n.utils.closeView(this);
        };
        e.prototype.onClickAdd = function () {

            n.utils.openPrefabView("ActivitySpecialBuy", null, {
                data: l.queenProxy.shop[0],
                activityId: l.queenProxy.data.info.id
            });
            l.shopProxy.openShopBuy(l.queenProxy.data.present.id);
        };
        e.prototype.onClickRecharge = function () {
            a.funUtils.openView(a.funUtils.recharge.id);
        };
        e.prototype.onClickTab = function (t, e) {
            switch (e) {
                case "0":
                    n.utils.openPrefabView(
                        "ActivityShopView",
                        null,
                        l.queenProxy.dhShop
                    );
                    break;

                case "1":
                    var o = l.limitActivityProxy.QUEEN_TYPE;
                    n.utils.openPrefabView(
                        "limitactivity/LimitActivityView",
                        null, {
                            type: o
                        }
                    );
                    break;

                case "2":
                case "3":
                    l.queenProxy.sendRank(e);
                    break;
                case "4":

                    if (l.queenProxy.rwdList) {
                        var t = l.queenProxy.rwdList;
                        t && n.utils.openPrefabView("queen/QueenRwdView", !1, t);
                    }
                    break;
                case "5": {

                    n.utils.openPrefabView("queen/QueenRecordsView", null, l.queenProxy.data.queen_status.rwd_log);
                }

                break;
            }
        };
        __decorate([_(cc.Node)], e.prototype, "effTen", void 0);
        __decorate([_(cc.Node)], e.prototype, "tipNode", void 0);
        __decorate([_(cc.Node)], e.prototype, "itemParent", void 0);
        __decorate([_(cc.Node)], e.prototype, "nodeArrow", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblHqCount", void 0);
        __decorate([_(cc.Sprite)], e.prototype, "bg", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblTime", void 0);
        return (e = __decorate([c], e));
    })(cc.Component);
o.default = d;