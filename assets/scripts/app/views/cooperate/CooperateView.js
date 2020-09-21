var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../Initializer"),
    n = require("../../utils/Utils"),
    redDot = require("../../component/RedDot"),
    List = require("../../component/List"),
    r = require("../../utils/ShaderUtils"),
    l = require("../../utils/UIUtils"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblcd = null;
            e.lblDes = null;
            e.lblProgress = null;
            e.totalList = null;
            e.totalProgressBar = null;
            e.selfProgressBar = null;
            e.totalBtn = null;
            e.totalEffect = null;
            e.lblItemNum = null;
            return e;
        }
        e.prototype.onLoad = function () {

            facade.subscribe(
                i.cooperateProxy.COOPERATE_DATA_UPDATE,
                this.onDataUpdate,
                this
            );

            facade.subscribe(i.bagProxy.UPDATE_BAG_ITEM, this.onItemUpdate, this);

            this.onItemUpdate();

            i.cooperateProxy.sendOpenActivity();


            this.lblDes.string = i18n.t("COOPERATE_REWARD_TIPS");
            this.schedule(this.updateSelfBarPos, 0);
        };

        e.prototype.onItemUpdate = function () {
            var t = i.bagProxy.getItemCount(i.cooperateProxy.COOPERATE_ITEM_ID);
            this.lblItemNum.string = t + "";
        }

        e.prototype.onDataUpdate = function () {

            this.showTime();
            this.totalList.data = i.cooperateProxy.data.score_rwd;


            this.selfProgressBar.node.width = this.totalList.content.height;
            this.selfProgressBar.barSprite.node.width = this.selfProgressBar.node.width;
            this.selfProgressBar.barSprite.node.x = -this.selfProgressBar.barSprite.node.width / 2;
            this.selfProgressBar.node.y = -this.totalList.content.height / 2;


            var selfScore = i.cooperateProxy.rwdData.score;
            this.selfProgressBar.progress = 0;



            if (selfScore >= this.totalList.data[this.totalList.data.length - 1].need) {
                this.selfProgressBar.progress = 1;
            } else if (selfScore !== 0) {
                if (selfScore <= this.totalList.data[0].need) {
                    this.selfProgressBar.progress = selfScore / this.totalList.data[0].need / this.totalList.data.length;
                } else {
                    for (var n = 1, len = this.totalList.data.length; n < len; n++) {
                        if (selfScore < this.totalList.data[n].need) {
                            var add = selfScore - this.totalList.data[n - 1].need;
                            this.selfProgressBar.progress = n / len + add / (this.totalList.data[n].need - this.totalList.data[n - 1].need) / len;
                            break;
                        }
                    }
                }

            }


            this.onTotalProgressUpdate();
            this.onHfjlUpdate();
        };

        e.prototype.updateSelfBarPos = function () {
            this.selfProgressBar.node.y = this.totalList.content.y - this.totalList.content.height / 2;
        };

        e.prototype.onClickAdd = function () {
            n.utils.openPrefabView("ActivitySpecialBuy", null, {
                data: i.cooperateProxy.shop[0],
                activityId: i.cooperateProxy.data.info.type
            });
            // n.shopProxy.openShopBuy(n.thanksGivingProxy.data.need);
        };

        e.prototype.onTotalProgressUpdate = function () {

            var rwdData = i.cooperateProxy.rwdData;

            if (rwdData.server_need === null) {


                this.lblProgress.string = i18n.t("COOPERATE_REWARD_ALL_TIP", {
                    n1: rwdData.server_score
                });

                this.totalProgressBar.progress = 1;
            } else {
                this.lblProgress.string = i18n.t("COOPERATE_REWARD_TIP", {
                    n1: rwdData.server_score,
                    n2: rwdData.server_need
                });

                this.totalProgressBar.progress = rwdData.server_score.toFixed(1) / rwdData.server_need;
            }


            if (this.totalProgressBar.progress >= 1 && rwdData.server_need !== null) {
                this.totalProgressBar.progress = 1;
                this.totalBtn.node.stopAllActions();
                this.totalBtn.node.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(0.2, 1.2, 1.2), cc.scaleTo(0.2, 1.0, 1.0))));
                this.totalEffect.active = true;
                redDot.default.change("cooperate_txs", true);

            } else {
                this.totalBtn.node.stopAllActions();
                this.totalBtn.node.runAction(cc.scaleTo(0.2, 1.0, 1.0));
                this.totalEffect.active = false;
                redDot.default.change("cooperate_txs", false);
            }
        };

        e.prototype.onHfjlUpdate = function () {
            var rwdData = i.cooperateProxy.rwdData;
            if (rwdData.compensate === 0) {
                redDot.default.change("cooperate_hfjl", true);
            } else {
                redDot.default.change("cooperate_hfjl", false);
            }
        };


        e.prototype.showTime = function () {
            if (!i.cooperateProxy.data) {
                return;
            }

            var t = this;
            l.uiUtils.countDown(
                i.cooperateProxy.data.info.eTime,
                this.lblcd,
                function () {
                    t.lblcd.string = i18n.t("ACTHD_OVERDUE");
                }
            );

        };

        e.prototype.onClickClose = function () {
            n.utils.closeView(this);
        };

        e.prototype.onClickTotalRwd = function () {
            if (this.totalProgressBar.progress >= 1) {
                i.cooperateProxy.getTxsRwd();
            } else {
                n.alertUtil.alert18n("JINGYING_WEIJIESUO");
            }
        };

        e.prototype.onClickRank = function () {
            i.cooperateProxy.sendLookRank();
            n.utils.openPrefabView("cooperate/CooperateReward");
        };

        e.prototype.onClickRwd = function () {

            n.utils.openPrefabView("cooperate/CooperateRwdNode");


        };

        e.prototype.onClickActivity = function () {

            var o = i.limitActivityProxy.COOPERATE_TYPE;
            n.utils.openPrefabView(
                "limitactivity/LimitActivityView",
                null, {
                    type: o
                }
            );
        };

        __decorate([_(cc.Label)], e.prototype, "lblItemNum", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblcd", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblDes", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblProgress", void 0);

        __decorate([_(cc.ProgressBar)], e.prototype, "totalProgressBar", void 0);
        __decorate([_(cc.ProgressBar)], e.prototype, "selfProgressBar", void 0);
        __decorate([_(List.default)], e.prototype, "totalList", void 0);
        __decorate([_(cc.Button)], e.prototype, "totalBtn", void 0);
        __decorate([_(cc.Node)], e.prototype, "totalEffect", void 0);

        return (e = __decorate([c], e));
    })(cc.Component);
o.default = d;