var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("../../Initializer"),
    l = require("../../utils/Utils"),
    r = require("../../utils/UIUtils"),
    timeP = require("../../models/TimeProxy"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.list = null;
            e.lblTitle = null;
            e.lbldate = null;
            e.lblcd = null;
            e.lblMyRank = null;
            e.lblDes = null;
            e.overTime = 0;
            e.curData = null;
            e.btnGoStore = null;
            return e;
        }
        e.prototype.onLoad = function () {
            facade.subscribe("LIMIT_ACTIVITY_UPDATE", this.onDataUpdate, this);
            facade.subscribe("AT_LIST_MY_RANK_UPDATE", this.onMyRank, this);
            facade.subscribe("AT_LIST_UPDATE", this.onDataUpdate, this);



            var t = this.node.openParam;
            if (t) {
                n.limitActivityProxy.sendLookActivityData(t.id);
                315 == t.id ?
                    (this.lblDes.string = i18n.t("AI_LIST_TXT_2")) :
                    (this.lblDes.string = i18n.t("AI_LIST_TXT"));

                var data = n.limitActivityProxy.getActivityData(t.id);
                if (data.need && data.need[0] !== 0) {
                    this.btnGoStore.active = true;
                } else {
                    this.btnGoStore.active = false;
                }
            }
            n.limitActivityProxy.cbMyRank && this.onMyRank();
        };
        e.prototype.onDataUpdate = function (t) {
            this.lblTitle.string = t.cfg.info.title;
            this.curData = t;
            var e = 0,
                o = t.cfg.rwd[0].member.length,
                i = 10 * (Math.ceil(o / 6) - 1);
            e = 100 * Math.ceil(o / 6) + 70 + i;
            if (t.cfg.rwd[0].mengzhu) {
                var n = t.cfg.rwd[0].mengzhu.length,
                    a = 10 * (Math.ceil(n / 6) - 1);
                e += 100 * Math.ceil(n / 6) + 70 + a;
            }
            this.list.setWidthHeight(640, e);
            this.list.data = t.cfg.rwd;
            this.lbldate.string =
                l.timeUtil.format(t.cfg.info.sTime, "yyyy-MM-dd") +
                i18n.t("COMMON_ZHI") +
                l.timeUtil.format(t.cfg.info.eTime, "yyyy-MM-dd");
            this.overTime = t.cfg.info.eTime;
            var s = this;
            r.uiUtils.countDown(
                this.overTime,
                this.lblcd,
                function () {
                    s.lblcd.string = i18n.t("ACTHD_OVERDUE");
                },
                !0,
                "USER_REMAIN_TIME",
                "d"
            );


            if (this.curData.cfg.info.need[0] !== 0) {
                this.btnGoStore.active = true;
            } else {
                this.btnGoStore.active = false;
            }
        };
        e.prototype.sortList = function (t, e) {
            var o = t.id > n.limitActivityProxy.curSelectData.rwd ? -1 : 1,
                i = e.id > n.limitActivityProxy.curSelectData.rwd ? -1 : 1;
            return o != i ? o - i : t.id - e.id;
        };
        e.prototype.onMyRank = function () {
            0 == n.limitActivityProxy.cbMyRank.rid ||
                100001 == n.limitActivityProxy.cbMyRank.rid ?
                (this.lblMyRank.string = i18n.t("RAKN_UNRANK")) :
                (this.lblMyRank.string =
                    n.limitActivityProxy.cbMyRank.rid + "");
        };
        e.prototype.onClickClose = function () {
            l.utils.closeView(this);
            l.utils.openPrefabView("limitactivity/AtListView");
        };
        e.prototype.onClickBd = function (t, e) {
            if (e === '0') {
                var id = this.curData.cfg.info.jumpto;
                if (id) {
                    timeP.funUtils.openView(id);
                }
            } else if (e === '1') {
                n.shopProxy.openShopBuyItem(this.curData.cfg.info.need);
            } else {
                l.utils.openPrefabView(
                    "limitactivity/AtListRankView",
                    null,
                    this.curData
                );
            }

        };
        __decorate([c(i.default)], e.prototype, "list", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblTitle", void 0);
        __decorate([c(cc.Label)], e.prototype, "lbldate", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblcd", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblMyRank", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblDes", void 0);
        __decorate([c(cc.Node)], e.prototype, "btnGoStore", void 0);
        return (e = __decorate([s], e));
    })(cc.Component);
o.default = _;