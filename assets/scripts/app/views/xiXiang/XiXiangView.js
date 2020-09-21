var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = require("../../Initializer"),
    l = require("../../component/UrlLoad"),
    r = require("../../utils/UIUtils"),
    c = require("../../component/LangSprite"),
    _ = cc._decorator,
    d = _.ccclass,
    u = _.property,
    p = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.qihuan = null;
            e.btnSp = [];
            e.sprites = [];
            e.qihuanHeads = [];
            e.headNames = [];
            e.nodeBg = null;
            e.nodeItem = null;
            e.addItem = null;
            e.lblNames = [];
            e.lblcd = null;
            e.talkLabel = null;
            e.talkBoxes = [];
            e.talkSprite = null;
            e.likeBar = null;
            e.likeLabel = null;
            e.likeLevel = null;
            e.tipNode = null;
            e.likeEffect = null
            e.lab_BoxCount = null;
            e.lblCounts = [];
            e.giftId = null;
            return e;
        }

        e.prototype.onLoad = function () {

            facade.subscribe(
                n.xiXiangProxy.XIXIANG_FEED_BACK,
                this.showFeedback,
                this
            );
            facade.subscribe(
                n.bagProxy.UPDATE_BAG_ITEM,
                this.updateBoxCount,
                this
            );
            this.bFeed = false;
            this.levelCount = n.xiXiangProxy.data.proportion;
            this.talkSprite.node.opacity = 0;

            this.nodeItem.active = !1;
            this.initData();
            this.dataUpdate();
            this.mwUpdate();
            this.showHeads();
            // this.showTime();
            // this.schedule(this.showTime, 1);
            this.schedule(this.request, 20);
            this.onClickTip();

            this.onHideSpine();
            this.updateBoxCount();
        };

        e.prototype.request = function () {
            n.xiXiangProxy.sendOpenArborDay();
        };

        e.prototype.initData = function () {

            this.servantIndex = 1;
            this.updateLike(this.servantIndex);

        };
        e.prototype.dataUpdate = function () {

            for (
                var t = localcache.getList(
                    localdb.table_xixiang_candy
                ),
                e = 0; e < this.btnSp.length; e++
            ) {
                this.btnSp[e].spriteFrame = this.sprites[
                    t[e].icon - 1
                ];
                this.lblNames[e].string = t[e].name;
            }

        };


        e.prototype.showFeedback = function () {
            this.showEffectIndex(this.giftId);
            this.talkSprite.node.opacity = 255;

            var persons = localcache.getList(localdb.table_xixiang_person);

            for (var servant of persons) {
                if (servant.hid === n.xiXiangProxy.likeMsg.hid) {
                    break;
                }
            }

            if (servant.id !== this.servantIndex) {
                return;
            }

            n.xiXiangProxy.aPersonStatus[servant.id - 1].id = n.xiXiangProxy.likeMsg.candy_id;

            if (n.xiXiangProxy.likeMsg.candy_id === 0) {
                n.xiXiangProxy.aPersonStatus[servant.id - 1].like = n.xiXiangProxy.eTalkMode.none;
            } else if (n.xiXiangProxy.likeMsg.candy_id === 2) {
                //不喜欢
                n.xiXiangProxy.aPersonStatus[servant.id - 1].like = n.xiXiangProxy.eTalkMode.dislike;

            } else if (n.xiXiangProxy.likeMsg.candy_id === 1) {
                //喜欢
                n.xiXiangProxy.aPersonStatus[servant.id - 1].like = n.xiXiangProxy.eTalkMode.like;

            } else if (n.xiXiangProxy.likeMsg.candy_id > 0) {
                n.xiXiangProxy.aPersonStatus[servant.id - 1].like = n.xiXiangProxy.eTalkMode.tip;
            }

            this.updateLike(servant.id);
        };

        e.prototype.updateLike = function (index) {
            var curScore = n.xiXiangProxy.likeScore[index - 1];

            if (n.xiXiangProxy.aPersonStatus[index - 1].like === n.xiXiangProxy.eTalkMode.tip) {

                var candies = localcache.getList(localdb.table_xixiang_candy);

                for (var candy of candies) {
                    if (candy.itemid === n.xiXiangProxy.aPersonStatus[index - 1].id) {
                        break;
                    }
                }
                this.talkLabel.string = candy.like;
                this.talkSprite.spriteFrame = this.talkBoxes[n.xiXiangProxy.eTalkMode.tip];
                this.talkSprite.node.opacity = 255;
            } else if (n.xiXiangProxy.aPersonStatus[index - 1].like === n.xiXiangProxy.eTalkMode.like) {
                this.talkSprite.node.opacity = 255;
                this.talkLabel.string = localcache.getItem(localdb.table_xixiang_text, 1).liketxt;
                this.talkSprite.spriteFrame = this.talkBoxes[n.xiXiangProxy.eTalkMode.like];
            } else if (n.xiXiangProxy.aPersonStatus[index - 1].like === n.xiXiangProxy.eTalkMode.dislike) {
                this.talkSprite.node.opacity = 255;
                this.talkLabel.string = localcache.getItem(localdb.table_xixiang_text, 1).disliketxt;
                this.talkSprite.spriteFrame = this.talkBoxes[n.xiXiangProxy.eTalkMode.dislike];
            } else {
                this.talkSprite.node.opacity = 0;
            }


            for (var lv = 1, lastTotal = 0, total = 0; total < curScore; lv++) {
                lastTotal = total;
                total += this.levelCount * lv;
            }
            lv--;
            if (n.xiXiangProxy.aPersonStatus[index - 1].lv > 0 && n.xiXiangProxy.aPersonStatus[index - 1].lv !== lv) {
                //升级
                this.likeEffect.active = true;
                this.scheduleOnce(this.onHideSpine, 3);
            }
            n.xiXiangProxy.aPersonStatus[index - 1].lv = lv;

            this.likeBar.progress = (curScore - lastTotal) / (this.levelCount * lv);
            this.likeLabel.string = '' + (curScore - lastTotal) + '/' + (this.levelCount * lv);
            this.likeLevel.string = '' + lv;
        };

        e.prototype.onHideSpine = function () {
            this.likeEffect.active = false;
        };

        e.prototype.showHeads = function () {
            for (
                var t = localcache.getList(localdb.table_xixiang_person),
                i = 0; i < this.qihuanHeads.length; i++
            ) {
                this.qihuanHeads[i].url = r.uiHelps.getServantHead(t[i].head);
                this.headNames[i].string = t[i].name;
            }
        };

        e.prototype.mwUpdate = function () {
            var a = localcache.getItem(
                localdb.table_xixiang_person,
                this.servantIndex
            );
            this.qihuan.url = r.uiHelps.getServantSpine(a.head);
            this.updateLike(this.servantIndex);
        };

        e.prototype.onClickHit = function (t, e) {

            if (this.bFeed) {
                return;
            }
            var id = parseInt(e);

            var candy = localcache.getItem(
                localdb.table_xixiang_candy,
                id
            );

            var self = this;
            var count = n.bagProxy.getItemCount(candy.itemid);
            if (count > 0) {
                self.giftId = id;
                n.xiXiangProxy.sendFeed(self.servantIndex, id);
            } else {
                var candySet = n.xiXiangProxy.data.shop[id - 1];
                if (!candySet || (candySet.items.id != candy.itemid)) {
                    i.alertUtil.alert(
                        i18n.t("XIXIANG_GIFT_NOT_ENOUGH")
                    );
                    return;
                }
                if (candy.costType === 3) {
                    i.utils.showConfirmItem(
                        i18n.t("XIXIANG_COST_FOOD", {
                            num: candySet.need.count,
                            name: candy.name
                        }),
                        candySet.need.id,
                        n.playerProxy.userData.food,
                        function () {
                            if (n.playerProxy.userData.food < candySet.need.count) {
                                i.alertUtil.alertItemLimit(candySet.need.id)
                            } else {
                                //送糖成功
                                self.giftId = id;
                                n.xiXiangProxy.sendFeed(self.servantIndex, id);
                            }
                        },
                        "XIXIANG_COST_FOOD"
                    );
                } else if (candy.costType === 1) {
                    i.utils.showConfirmItem(
                        i18n.t("XIXIANG_COST_CASH", {
                            num: candySet.need.count,
                            name: candy.name
                        }),
                        candySet.need.id,
                        n.playerProxy.userData.cash,
                        function () {
                            if (n.playerProxy.userData.cash < candySet.need.count) {
                                i.alertUtil.alertItemLimit(candy.costType)
                            } else {
                                //送糖成功
                                self.giftId = id;
                                n.xiXiangProxy.sendFeed(self.servantIndex, id);
                            }
                        },
                        "XIXIANG_COST_CASH" + e
                    );
                }
            }
            this.bFeed = true;
            this.scheduleOnce(this.changeFeed, 1);
        };

        e.prototype.changeFeed = function (t) {
            this.bFeed = false;
        }

        e.prototype.showEffectIndex = function (t) {
            var e = cc.instantiate(this.nodeItem);
            e.active = !0;
            this.addItem.addChild(e);
            var o = e.getComponent(cc.Sprite),
                n = this.btnSp[t - 1];
            e.x = n.node.x;
            e.y = n.node.y;
            o.spriteFrame = n.spriteFrame;
            i.utils.showEffect(o, t - 1, function () {
                e.removeFromParent(!0);
                e.destroy();
            });
        };
        e.prototype.onPetsList = function (t, e) {
            this.servantIndex = parseInt(e);
            this.mwUpdate();
        };
        e.prototype.onClickTip = function (t, e) {
            this.tipNode.opacity = 255;
            this.tipNode.runAction(cc.sequence(cc.delayTime(3), cc.fadeOut(1)));
        };
        e.prototype.onClickClose = function () {
            i.utils.closeView(this);
        };
        // e.prototype.showTime = function () {
        // if (i.timeUtil.second <= n.xiXiangProxy.data.info.eTime) {
        // var t = n.xiXiangProxy.startTime,
        //     e = n.xiXiangProxy.endTime;

        // if (t - i.timeUtil.second > 0) {
        //     var o = t - i.timeUtil.second;

        //     this.lblcd.string = i18n.t("XIXIANG_TIME_COUNT_DOWN_1", {
        //         time: i.timeUtil.second2hms(o, "HH:mm:ss")
        //     });
        // } else if (e - i.timeUtil.second > 0) {
        //     var l = e - i.timeUtil.second;
        //     this.lblcd.string = i18n.t("XIXIANG_TIME_COUNT_DOWN_2", {
        //         time: i.timeUtil.second2hms(l, "HH:mm:ss")
        //     });
        // } else if (n.xiXiangProxy.data.info.eTime - i.timeUtil.second > 86400) {
        //     this.lblcd.string = i18n.t("XIXIANG_DAY_OVER_TXT");
        // } else {
        //     this.lblcd.string = i18n.t("XIXIANG_IS_OVER");
        // }
        // } else
        //     this.lblcd.string = i18n.t("XIXIANG_IS_OVER");

        // };

        e.prototype.onClickBox = function () {
            var t = {
                id: n.xiXiangProxy.data.loot.itemid
            };
            i.utils.openPrefabView("bag/BagUse", !1, t);
        };

        e.prototype.updateBoxCount = function () {
            var count = n.bagProxy.getItemCount(n.xiXiangProxy.data.loot.itemid);
            this.lab_BoxCount.string = count + "";
            for (let index = 0; index < this.lblCounts.length; index++) {
                const element = this.lblCounts[index];
                let candy = localcache.getList(localdb.table_xixiang_candy);
                if (!candy)
                    continue;
                let item = candy[index + 1];
                if (!item)
                    continue;
                let itemCount = n.bagProxy.getItemCount(item.itemid);
                element.string = itemCount + "";
            }
        };

        __decorate([u(cc.Node)], e.prototype, "tipNode", void 0);
        __decorate([u(cc.Node)], e.prototype, "likeEffect", void 0);
        __decorate([u(cc.ProgressBar)], e.prototype, "likeBar", void 0);
        __decorate([u(cc.Label)], e.prototype, "likeLabel", void 0);
        __decorate([u(cc.Label)], e.prototype, "likeLevel", void 0);
        __decorate([u(l.default)], e.prototype, "qihuan", void 0);
        __decorate([u([cc.Sprite])], e.prototype, "btnSp", void 0);
        __decorate([u([cc.SpriteFrame])], e.prototype, "sprites", void 0);
        __decorate([u([cc.SpriteFrame])], e.prototype, "talkBoxes", void 0);
        __decorate([u(cc.Label)], e.prototype, "talkLabel", void 0);
        __decorate([u(cc.Sprite)], e.prototype, "talkSprite", void 0);
        __decorate([u([l.default])], e.prototype, "qihuanHeads", void 0);
        __decorate([u([cc.Label])], e.prototype, "headNames", void 0);
        __decorate([u(cc.Node)], e.prototype, "nodeBg", void 0);
        __decorate([u(cc.Node)], e.prototype, "nodeItem", void 0);
        __decorate([u(cc.Node)], e.prototype, "addItem", void 0);
        __decorate([u([cc.Label])], e.prototype, "lblNames", void 0);
        __decorate([u(cc.Label)], e.prototype, "lblcd", void 0);
        __decorate([u(cc.Label)], e.prototype, "lab_BoxCount", void 0);
        __decorate([u([cc.Label])], e.prototype, "lblCounts", void 0);
        return (e = __decorate([d], e));
    })(cc.Component);
o.default = p;