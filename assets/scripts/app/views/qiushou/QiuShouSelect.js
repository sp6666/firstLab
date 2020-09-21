var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = require("../../Initializer"),
    l = require("../../component/UrlLoad"),
    r = require("../../utils/UIUtils"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblDate = null;
            e.lblZy1 = null;
            e.lblTree1 = null;
            e.lblXy1 = null;
            e.lblZy2 = null;
            e.lblTree2 = null;
            e.lblXy2 = null;
            e.lblJoin = null;
            e.lblRank = null;
            e.lblTreeNum = null;
            e.url_1 = null;
            e.url_2 = null;
            e.selectNode = null;
            e.watchNode = null;
            e.lblJoin_1 = null;
            e.lblJoin_2 = null;
            e.eff_1 = null;
            e.eff_2 = null;
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe(
                n.qiushouProxy.QIU_SHOU_DATA_UPDATE,
                this.onDataUpdate,
                this
            );
            facade.subscribe(
                n.qiushouProxy.QIU_SHOU_MY_RID_UPDATE,
                this.onMyRid,
                this
            );
            n.qiushouProxy.sendOpenArborDay();
        };
        e.prototype.onDataUpdate = function() {
            if (n.qiushouProxy.data) {
                var t = this;
                r.uiUtils.countDown(
                    n.qiushouProxy.data.info.eTime,
                    this.lblDate,
                    function() {
                        t.lblDate.string = i18n.t("ACTHD_OVERDUE");
                    },
                    !0,
                    "USER_REMAIN_TIME",
                    "d"
                );
                var e = localcache.getItem(
                        localdb.table_hero,
                        n.qiushouProxy.data.set[0].pkID
                    ),
                    o = localcache.getItem(
                        localdb.table_hero,
                        n.qiushouProxy.data.set[1].pkID
                    );
                this.url_1.url = r.uiHelps.getServantSpine(e.heroid);
                this.url_2.url = r.uiHelps.getServantSpine(o.heroid);
                this.lblZy1.string = i18n.t("QIUSHOU_ZHEN_YING_TXT", {
                    name: e.name
                });
                this.lblZy2.string = i18n.t("QIUSHOU_ZHEN_YING_TXT", {
                    name: o.name
                });
                if (
                    i.timeUtil.second >
                    n.qiushouProxy.data.info.eTime - 86400
                ) {
                    this.lblTree1.string = i18n.t("QIUSHOU_TOTAL_ZHONG_ZHI", {
                        num: n.qiushouProxy.data.set[0].score
                    });
                    this.lblTree2.string = i18n.t("QIUSHOU_TOTAL_ZHONG_ZHI", {
                        num: n.qiushouProxy.data.set[1].score
                    });
                } else if (
                    n.qiushouProxy.data.set[0].score !=
                    n.qiushouProxy.data.set[1].score
                ) {
                    this.lblTree1.string =
                        n.qiushouProxy.data.set[0].score >
                        n.qiushouProxy.data.set[1].score
                            ? i18n.t("QIUSHOU_ZHUANG_TAI_1")
                            : i18n.t("QIUSHOU_ZHUANG_TAI_2");
                    this.lblTree2.string =
                        n.qiushouProxy.data.set[1].score >
                        n.qiushouProxy.data.set[0].score
                            ? i18n.t("QIUSHOU_ZHUANG_TAI_1")
                            : i18n.t("QIUSHOU_ZHUANG_TAI_2");
                } else
                    this.lblTree1.string = this.lblTree2.string = i18n.t(
                        "QIUSHOU_ZHUANG_TAI_3"
                    );
                if (
                    null == n.qiushouProxy.data.selectID ||
                    0 == n.qiushouProxy.data.selectID
                ) {
                    this.watchNode.active = !0;
                    this.lblJoin.string = i18n.t("QIUSHOU_WEI_JIA_RU");
                } else {
                    var l = localcache.getItem(
                        localdb.table_hero,
                        n.qiushouProxy.data.selectID
                    );
                    this.lblJoin.string = l.name;
                }
                this.lblJoin_1.string = i18n.t("QIUSHOU_JOIN_SELECT", {
                    name: e.name
                });
                this.lblJoin_2.string = i18n.t("QIUSHOU_JOIN_SELECT", {
                    name: o.name
                });
                this.eff_1.node.active =
                    e.heroid == n.qiushouProxy.data.selectID;
                this.eff_2.node.active =
                    o.heroid == n.qiushouProxy.data.selectID;
            }
        };
        e.prototype.onMyRid = function() {
            this.lblRank.string =
                n.qiushouProxy.myRid &&
                n.qiushouProxy.myRid.rid &&
                n.qiushouProxy.myRid.rid > 0
                    ? n.qiushouProxy.myRid.rid + ""
                    : i18n.t("RAKN_UNRANK");
            this.lblTreeNum.string =
                n.qiushouProxy.myRid &&
                n.qiushouProxy.myRid.score &&
                n.qiushouProxy.myRid.score > 0
                    ? n.qiushouProxy.myRid.score + ""
                    : "0";
        };
        e.prototype.onClickEnter = function(t, e) {
            var o = parseInt(e);
            n.qiushouProxy.data &&
                (null == n.qiushouProxy.data.selectID ||
                0 == n.qiushouProxy.data.selectID
                    ? (this.selectNode.active = !0)
                    : n.qiushouProxy.data.selectID ==
                      n.qiushouProxy.data.set[o].pkID
                    ? i.utils.openPrefabView("qiushou/QiuShouMain")
                    : i.alertUtil.alert18n("QIUSHOU_SELECT_WRONG"));
        };
        e.prototype.onClickTab = function(t, e) {
            "1" == e
                ? i.utils.openPrefabView("qiushou/QiuShouZyRwd")
                : "2" == e
                ? i.utils.openPrefabView("qiushou/QiuShouRankRwd")
                : "3" == e
                ? i.utils.openPrefabView(
                      "limitactivity/LimitActivityView",
                      null,
                      {
                          type: n.limitActivityProxy.QIUSHOU_TYPE
                      }
                  )
                : "4" == e &&
                  i.utils.openPrefabView(
                      "ActivityShopView",
                      null,
                      n.qiushouProxy.dhShop
                  );
        };
        e.prototype.onClickSelect = function(t, e) {
            var o = parseInt(e);
            (0 != e && 1 != e) ||
                n.qiushouProxy.sendJoin(n.qiushouProxy.data.set[o].pkID);
            this.selectNode.active = !1;
        };
        e.prototype.onClickWatch = function(t, e) {
            if ("0" == e) {
                n.playerProxy.addStoryId("laodongjie_001");
                i.utils.openPrefabView("StoryView");
            }
            this.watchNode.active = !1;
        };
        e.prototype.onClickClose = function() {
            i.utils.closeView(this);
        };
        __decorate([c(cc.Label)], e.prototype, "lblDate", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblZy1", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblTree1", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblXy1", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblZy2", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblTree2", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblXy2", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblJoin", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblRank", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblTreeNum", void 0);
        __decorate([c(l.default)], e.prototype, "url_1", void 0);
        __decorate([c(l.default)], e.prototype, "url_2", void 0);
        __decorate([c(cc.Node)], e.prototype, "selectNode", void 0);
        __decorate([c(cc.Node)], e.prototype, "watchNode", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblJoin_1", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblJoin_2", void 0);
        __decorate([c(cc.Animation)], e.prototype, "eff_1", void 0);
        __decorate([c(cc.Animation)], e.prototype, "eff_2", void 0);
        return (e = __decorate([s], e));
    })(cc.Component);
o.default = _;
