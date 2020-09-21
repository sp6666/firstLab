var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../Initializer"),
    n = require("../../utils/Utils"),
    r = require("../../utils/ShaderUtils"),
    RoleSpine = require("../../component/RoleSpine"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.battleBtn = null;
            // e.lblOpen = null;
            // e.lblClose = null;
            e.lblcd = null;
            e.alertBtn = null;
            e.lblcount = null;
            //服装展示
            e.roleSpine = null;
            //展示的衣服
            e.clothId = 74;
            return e;
        }
        e.prototype.onLoad = function () {

            facade.subscribe(
                i.xiXiangProxy.XIXIANG_DATA_UPDATE,
                this.onDataUpdate,
                this
            );

            facade.subscribe(
                i.xiXiangProxy.XIXIANG_RANK,
                this.openRank,
                this
            );

            facade.subscribe(
                i.bagProxy.UPDATE_BAG_ITEM,
                this.updateBoxCount,
                this
            );

            i.xiXiangProxy.sendOpenArborDay();
            var cloth = localcache.getItem(localdb.table_usersuit, this.clothId),
                o = {};
            for (c = 0; c < cloth.clother.length; c++) {
                var a = localcache.getItem(
                    localdb.table_userClothe,
                    cloth.clother[c]
                )
                switch (a.part) {
                    case 1:
                        o.head = a.id;
                        break;
                    case 2:
                        o.body = a.id;
                        break;
                    case 3:
                        o.ear = a.id;
                        break;
                    case 4:
                        o.background = a.id;
                        break;
                    case 5:
                        o.effect = a.id;
                        break;
                    case 6:
                        o.animal = a.id;
                }
            }
            var t = i.playerProxy.userData;
            this.roleSpine.setClothes(t.sex, t.job, t.level, o);
            this.roleSpine.replayAll();
        };

        e.prototype.openRank = function () {
            n.utils.openPrefabView("xixiang/XiXiangRankView");
        };

        e.prototype.updateGotoFeedBtn = function () {


            var changed = false;

            // if (n.timeUtil.second <= i.xiXiangProxy.endTime &&
            //     n.timeUtil.second >= i.xiXiangProxy.startTime) {
            if (!this.battleBtn.interactable) {
                changed = true;
            }
            this.battleBtn.interactable = true;
            this.alertBtn.node.zIndex = 0;
            this.battleBtn.node.zIndex = 100;
            // } else {
            //     if (this.battleBtn.interactable) {
            //         changed = true;
            //     }
            //     this.battleBtn.interactable = false;
            //     this.alertBtn.node.zIndex = 100;
            //     this.battleBtn.node.zIndex = 0;
            // }

            if (changed) {
                for (var child of this.battleBtn.node.children) {
                    r.shaderUtils.setImageGray(
                        child.getComponent(cc.Sprite),
                        !this.battleBtn.interactable
                    );
                }
            }

        }

        e.prototype.onDataUpdate = function () {

            // this.lblOpen.string = n.timeUtil.format(i.xiXiangProxy.startTime, "HH:mm:ss");
            // this.lblClose.string = n.timeUtil.format(i.xiXiangProxy.endTime, "HH:mm:ss");

            this.updateGotoFeedBtn();
            this.updateBoxCount();
            this.showTime();
            this.unschedule(this.showTime);
            this.schedule(this.showTime, 1);
        };

        e.prototype.showTime = function () {

            if (n.timeUtil.second <= i.xiXiangProxy.data.info.eTime) {
                // var t = i.xiXiangProxy.startTime,
                //     e = i.xiXiangProxy.endTime;

                // if (t - n.timeUtil.second > 0) {
                // var o = t - n.timeUtil.second;
                var o = i.xiXiangProxy.data.info.eTime - n.timeUtil.second;
                this.lblcd.string = i18n.t("XIXIANG_TIME_COUNT_DOWN_2", {
                    time: n.timeUtil.second2hms(o)
                });
                // } else if (e - n.timeUtil.second > 0) {
                //     var l = e - n.timeUtil.second;
                //     this.lblcd.string = i18n.t("XIXIANG_TIME_COUNT_DOWN_2", {
                //         time: n.timeUtil.second2hms(l, "HH:mm:ss")
                //     });
                // } else if (i.xiXiangProxy.data.info.eTime - n.timeUtil.second > 86400) {
                //     this.lblcd.string = i18n.t("XIXIANG_DAY_OVER_TXT");
                // } else {
                //     this.lblcd.string = i18n.t("XIXIANG_IS_OVER");
                // }
            } else
                this.lblcd.string = i18n.t("XIXIANG_IS_OVER");

            this.updateGotoFeedBtn();
        };

        e.prototype.alert = function () {
            // var text;
            // if (i.xiXiangProxy.data.info.eTime - n.timeUtil.second > 86400) {
            //     text = i18n.t("XIXIANG_DAY_OVER_TXT");
            // } else {
            //     text = i18n.t("XIXIANG_IS_OVER");
            // }

            // n.alertUtil.alert(text);
        }

        e.prototype.onClickClose = function () {
            n.utils.closeView(this);
        };
        e.prototype.onClickBattle = function () {
            n.utils.openPrefabView("xixiang/XiXiangView");
        };
        e.prototype.onClickRank = function () {
            i.xiXiangProxy.sendLookRank();
        };
        e.prototype.onClickActivity = function () {

            var o = i.limitActivityProxy.XIXIANG_TYPE;
            n.utils.openPrefabView(
                "limitactivity/LimitActivityView",
                null, {
                type: o
            }
            );
        };
        e.prototype.onClickShop = function () {
            n.utils.openPrefabView(
                "ActivityShopView",
                null,
                i.xiXiangProxy.dhShop
            );
        };
        e.prototype.onClickLjjl = function () {
            n.utils.openPrefabView(
                "xixiang/XiXiangLeiJi"
            );
        };

        e.prototype.onClickItemAdd = function () {
            n.utils.openPrefabView("ActivitySpecialBuy", null, {
                data: i.xiXiangProxy.shop[1],
                activityId: i.xiXiangProxy.data.info.type
            });
        };

        e.prototype.updateBoxCount = function () {
            var count = i.bagProxy.getItemCount(i.xiXiangProxy.data.loot.itemid);
            this.lblcount.string = count + "";
        };

        __decorate([_(cc.Button)], e.prototype, "alertBtn", void 0);
        __decorate([_(cc.Button)], e.prototype, "battleBtn", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblcount", void 0);
        // __decorate([_(cc.Label)], e.prototype, "lblOpen", void 0);
        // __decorate([_(cc.Label)], e.prototype, "lblClose", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblcd", void 0);
        __decorate([_(RoleSpine.default)], e.prototype, "roleSpine", void 0);
        return (e = __decorate([c], e));
    })(cc.Component);
o.default = d;