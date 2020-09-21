var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../utils/Utils"),
    l = require("../../component/UrlLoad"),
    redDot = require("../../component/RedDot"),
    r = require("../../utils/UIUtils"),
    timeProxy = require("../../models/TimeProxy"),
    limitActivityProxy = require("../../models/LimitActivityProxy"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblDate = null;
            e.lblTime = null;
            e.lblTitle = null;
            e.redNode = null;
            e.itemBg = null;
            e.hdData = null;
            e.reddot = null;
            return e;
        }
        e.prototype.showData = function () {
            this.hdData = this._data;
            this.lblTitle.string = this.hdData.title;
            this.lblDate.string = i18n.t("COMMON_MAO_HAO", {
                l: i18n.t("ACTIVITY_DATE_TXT"),
                r: n.timeUtil.format(this.hdData.sTime, "MM-dd") +
                    i18n.t("COMMON_ZHI") +
                    n.timeUtil.format(this.hdData.eTime, "MM-dd")
            });
            this.redNode.active = 1 == this.hdData.news;

            if (this.hdData.groupId !== undefined && this.reddot) {
                var data = limitActivityProxy.activityUtils.activityList;
                for (var one of data) {
                    if (one.id === this.hdData.id) {
                        this.reddot.addBinding(one.binding);
                        break;
                    }
                }
            }
            this.hdData.skin && 0 != this.hdData.skin ?
                (this.itemBg.url = r.uiHelps.getLimitActivityBg(
                    this.hdData.skin
                )) :
                (this.itemBg.url = r.uiHelps.getLimitActivityBg(
                    this.hdData.id
                ));
            var t = this;
            r.uiUtils.countDown(
                this.hdData.eTime,
                this.lblTime,
                function () {
                    t.lblTime.string = i18n.t("ACTHD_OVERDUE");
                },
                !0,
                "USER_REMAIN_TIME",
                "d"
            );
        };


        e.prototype.onClickEnterDaily = function (t, e) {
            var data = timeProxy.funUtils.getDataByActivityType(this.hdData.type);
            if (data) {
                timeProxy.funUtils.openView(data.id);
            }

        };
        e.prototype.onClickEnter = function (t, e) {
            if (this.hdData.groupId !== undefined) {
                if (n.timeUtil.second >= this.hdData.showTime) {
                    n.alertUtil.alert(i18n.t("ACTIVITY_NOT_IN_TIME"));
                } else {
                    this.onClickEnterDaily();
                }
                return;
            }
            n.timeUtil.second >= this.hdData.showTime ?
                n.alertUtil.alert(i18n.t("ACTIVITY_NOT_IN_TIME")) :
                "2" == e ?
                n.utils.openPrefabView(
                    "limitactivity/LimitActivityWindow",
                    null,
                    this.hdData
                ) :
                "3" == e ?
                n.utils.openPrefabView(
                    "limitactivity/AtListWindow",
                    null,
                    this.hdData
                ) :
                "4" == e &&
                n.utils.openPrefabView(
                    "limitactivity/RechargeWindow",
                    null,
                    this.hdData
                );
        };
        __decorate([c(cc.Label)], e.prototype, "lblDate", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblTime", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblTitle", void 0);
        __decorate([c(cc.Node)], e.prototype, "redNode", void 0);
        __decorate([c(redDot.default)], e.prototype, "reddot", void 0);
        __decorate([c(l.default)], e.prototype, "itemBg", void 0);
        return (e = __decorate([s], e));
    })(i.default);
o.default = _;