var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("../../Initializer"),
    l = require("../../utils/Utils"),
    a = require("../../utils/UIUtils"),
    timeProxy = require("../../models/TimeProxy"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.list = null;
            e.lblTime = null;
            e.isFirst = true;
            e.lblSwitch = null;
            e.scroll = null;

            e.cashIndex = 1; //1:600,2:1680，3：3280

            e.ndGeted = [];

            e.lblTips = [];
            e.btnCashGifts = [];
            e.btnCashBoxes = [];
            return e;
        }
        e.prototype.onLoad = function () {
            facade.subscribe(
                n.limitActivityProxy.SUPER_RECHARGE_PRO_UPDATE,
                this.onDataUpdate,
                this
            );

            n.limitActivityProxy.sendOpenSuperRechargePro();

            this.updateCashButtons();
        };
        e.prototype.onDataUpdate = function (day) {
            var t = this;
            if (!n.limitActivityProxy.superRechargePro) {
                return;
            }

            if (day !== this.day) {
                this.scroll.stopAutoScroll();
                this.scroll.scrollToTop();
            }

            if (!day && this.isFirst) {
                day = n.limitActivityProxy.superRechargePro.now;
                this.day = day;
                var money = n.limitActivityProxy.superRechargePro.cons[day];
                money = money ? money : 0;
                this.lblSwitch.string = i18n.t('LIMIT_SUPER_RECHARGE_PRO_TODAY_MONEY', {
                    day: money
                })
            } else if (!day) {
                day = this.day;
            }

            this.day = day;

            this.updateCashButtons();

            a.uiUtils.countDown(
                n.limitActivityProxy.superRechargePro.info.eTime,
                this.lblTime,
                function () {
                    t.lblTime.string = i18n.t("ACTHD_OVERDUE");
                },
                !0,
                "USER_REMAIN_TIME",
                "d"
            );

            var tempArry = [];
            var arr = n.limitActivityProxy.superRechargePro.rwd[day - 1];

            var indexA = [600, 1980, 3280];
            for (var i = 0; i < 3; i++) {
                var data = {};
                data.id = arr.id;
                data.items = arr.items[indexA[i]];
                data.need = indexA[i];
                data.get = arr[indexA[i]].get;
                tempArry.push(data);
            }

            tempArry.sort(function (
                t,
                e
            ) {
                var o =
                    n.limitActivityProxy.superRechargePro.day >= t.need ?
                    0 :
                    1,
                    i =
                    n.limitActivityProxy.superRechargePro.day >= e.need ?
                    0 :
                    1;
                return t.get != e.get ? t.get - e.get : o - i;
            });


            if (this.isFirst) {
                for (
                    var e = tempArry,
                        o = 0,
                        i = 0; i < e.length; i++
                )
                    e[i].items.length > o && (o = e[i].items.length);
                var l = Math.ceil(o / 7),
                    r = 80 * l + 5 * (l - 1) + 140;
                this.list.setWidthHeight(630, r);

            }

            this.isFirst = false;

            this.list.data = tempArry;
        };

        e.prototype.updateCashButtons = function () {

            if (!n.limitActivityProxy.superRechargePro) {
                return;
            }

            if (this.cashIndex === 3) {
                this.lblTips[0].string = i18n.t('LIMIT_SUPER_RECHARGE_PRO_DAYS1');
                this.lblTips[1].string = i18n.t('LIMIT_SUPER_RECHARGE_PRO_DAYS3');
                this.lblTips[2].string = i18n.t('LIMIT_SUPER_RECHARGE_PRO_DAYS5');
            } else {
                this.lblTips[0].string = i18n.t('LIMIT_SUPER_RECHARGE_PRO_DAYS3');
                this.lblTips[1].string = i18n.t('LIMIT_SUPER_RECHARGE_PRO_DAYS5');
                this.lblTips[2].string = i18n.t('LIMIT_SUPER_RECHARGE_PRO_DAYS7');
            }

            var continuity = n.limitActivityProxy.superRechargePro.continuity;
            var daySet = n.limitActivityProxy.superRechargePro.day;

            var e = 600;
            switch (this.cashIndex) {
                case 1:
                    e = 600;
                    break;
                case 2:
                    e = 1980;
                    break;
                case 3:
                    e = 3280;
                    break;
            }

            var day = [3, 5, 7];
            if (this.cashIndex === 3) {
                day = [1, 3, 5];
            }
            for (var i = 0; i < 3; i++) {
                this.btnCashBoxes[i].interactable = false;
                if (daySet[e] >= day[i] && continuity[i][e].get === 0) {
                    this.btnCashBoxes[i].interactable = true;
                }
                if (daySet[e] >= day[i] && continuity[i][e].get !== 0) {
                    this.ndGeted[i].active = true;
                } else {
                    this.ndGeted[i].active = false;
                }
            }

            for (var i = 0; i < 3; i++) {
                this.btnCashGifts[i].interactable = !this.btnCashBoxes[i].interactable;
            }
        };

        e.prototype.switchBoxes = function (t, e) {
            this.cashIndex = parseInt(e);

            this.updateCashButtons();
        };
        e.prototype.getBoxGift = function (t, e) {

            var k = parseInt(e);
            switch (this.cashIndex) {
                case 1:
                    e = 600;
                    break;
                case 2:
                    e = 1980;
                    break;
                case 3:
                    e = 3280;
                    break;
            }
            n.limitActivityProxy.sendGetSuperRechargeProTotal(k, e);
        };
        e.prototype.showBoxGift = function (t, e) {

            e = parseInt(e);

            var t = 0;
            switch (this.cashIndex) {
                case 1:
                    t = 600;
                    break;
                case 2:
                    t = 1980;
                    break;
                case 3:
                    t = 3280;
                    break;
            }
            l.utils.openPrefabView(
                "oldusers/OldUsersRwdNode",
                false,
                n.limitActivityProxy.superRechargePro.continuity[e - 1].items[t]
            );
        };
        e.prototype.gotoRecharge = function () {
            timeProxy.funUtils.openView(timeProxy.funUtils.recharge.id);
        };
        e.prototype.onClickClose = function () {
            l.utils.closeView(this);
        };
        __decorate([_(i.default)], e.prototype, "list", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblTime", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblSwitch", void 0);

        __decorate([_([cc.Label])], e.prototype, "lblTips", void 0);

        __decorate([_([cc.Node])], e.prototype, "ndGeted", void 0);
        __decorate([_(cc.ScrollView)], e.prototype, "scroll", void 0);

        __decorate([_([cc.Button])], e.prototype, "btnCashBoxes", void 0);
        __decorate([_([cc.Button])], e.prototype, "btnCashGifts", void 0);

        return (e = __decorate([c], e));
    })(cc.Component);
o.default = d;