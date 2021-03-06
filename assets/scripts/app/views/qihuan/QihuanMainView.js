var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../Initializer"),
    n = require("../../utils/Utils"),
    r = require("../../utils/ShaderUtils"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.battleBtn = null;
            e.lblOpen = null;
            e.lblClose = null;
            e.lblcd = null;
            e.alertBtn = null;
            return e;
        }
        e.prototype.onLoad = function () {

            facade.subscribe(
                i.qihuanProxy.QIHUAN_DATA_UPDATE,
                this.onDataUpdate,
                this
            );

            facade.subscribe(
                i.qihuanProxy.QIHUAN_RANK,
                this.openRank,
                this
            );


            i.qihuanProxy.sendOpenArborDay();

        };



        e.prototype.openRank = function () {
            n.utils.openPrefabView("qihuan/QiHuanRankView");
        };

        e.prototype.updateGotoFeedBtn = function () {


            var changed = false;

            if (n.timeUtil.second <= i.qihuanProxy.endTime &&
                n.timeUtil.second >= i.qihuanProxy.startTime) {
                if (!this.battleBtn.interactable) {
                    changed = true;
                }
                this.battleBtn.interactable = true;
                this.alertBtn.node.zIndex = 0;
                this.battleBtn.node.zIndex = 100;
            } else {
                if (this.battleBtn.interactable) {
                    changed = true;
                }
                this.battleBtn.interactable = false;
                this.alertBtn.node.zIndex = 100;
                this.battleBtn.node.zIndex = 0;
            }

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

            this.lblOpen.string = n.timeUtil.format(i.qihuanProxy.startTime, "HH:mm:ss");
            this.lblClose.string = n.timeUtil.format(i.qihuanProxy.endTime, "HH:mm:ss");

            this.updateGotoFeedBtn();

            this.showTime();
            this.unschedule(this.showTime);
            this.schedule(this.showTime, 1);
        };

        e.prototype.showTime = function () {

            if (n.timeUtil.second <= i.qihuanProxy.data.info.eTime) {
                var t = i.qihuanProxy.startTime,
                    e = i.qihuanProxy.endTime;

                if (t - n.timeUtil.second > 0) {
                    var o = t - n.timeUtil.second;

                    this.lblcd.string = i18n.t("QIHUAN_TIME_COUNT_DOWN_1", {
                        time: n.timeUtil.second2hms(o, "HH:mm:ss")
                    });
                } else if (e - n.timeUtil.second > 0) {
                    var l = e - n.timeUtil.second;
                    this.lblcd.string = i18n.t("QIHUAN_TIME_COUNT_DOWN_2", {
                        time: n.timeUtil.second2hms(l, "HH:mm:ss")
                    });
                } else if (i.qihuanProxy.data.info.eTime - n.timeUtil.second > 86400) {
                    this.lblcd.string = i18n.t("QIHUAN_DAY_OVER_TXT");
                } else {
                    this.lblcd.string = i18n.t("QIHUAN_IS_OVER");
                }
            } else
                this.lblcd.string = i18n.t("QIHUAN_IS_OVER");

            this.updateGotoFeedBtn();
        };

        e.prototype.alert = function () {

            var text;
            if (i.qihuanProxy.data.info.eTime - n.timeUtil.second > 86400) {
                text = i18n.t("QIHUAN_DAY_OVER_TXT");
            } else {
                text = i18n.t("QIHUAN_IS_OVER");
            }

            n.alertUtil.alert(text);
        }

        e.prototype.onClickClose = function () {
            n.utils.closeView(this);
        };
        e.prototype.onClickBattle = function () {
            n.utils.openPrefabView("qihuan/QihuanView");
        };
        e.prototype.onClickRank = function () {
            i.qihuanProxy.sendLookRank();
        };
        e.prototype.onClickActivity = function () {

            var o = i.limitActivityProxy.QIHUAN_TYPE;
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
                i.qihuanProxy.dhShop
            );
        };
        __decorate([_(cc.Button)], e.prototype, "alertBtn", void 0);
        __decorate([_(cc.Button)], e.prototype, "battleBtn", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblOpen", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblClose", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblcd", void 0);
        return (e = __decorate([c], e));
    })(cc.Component);
o.default = d;