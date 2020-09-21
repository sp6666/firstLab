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
                n.arborDayProxy.ARBOR_DAY_DATA_UPDATE,
                this.onDataUpdate,
                this
            );
            facade.subscribe(
                n.arborDayProxy.ARBOR_DAY_MY_RID_UPDATE,
                this.onMyRid,
                this
            );
            n.arborDayProxy.sendOpenArborDay();
        };
        e.prototype.onDataUpdate = function() {
            if (n.arborDayProxy.data) {
                var t = this;
                r.uiUtils.countDown(
                    n.arborDayProxy.data.info.eTime,
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
                        n.arborDayProxy.data.set[0].pkID
                    ),
                    o = localcache.getItem(
                        localdb.table_hero,
                        n.arborDayProxy.data.set[1].pkID
                    );
                this.url_1.url = r.uiHelps.getServantSpine(e.heroid);
                this.url_2.url = r.uiHelps.getServantSpine(o.heroid);
                this.lblZy1.string = i18n.t("ARBOR_DAY_ZHEN_YING_TXT", {
                    name: e.name
                });
                this.lblZy2.string = i18n.t("ARBOR_DAY_ZHEN_YING_TXT", {
                    name: o.name
                });
                this.lblTree1.string = i18n.t("ARBOR_DAY_TOTAL_ZHONG_ZHI", {
                    num: n.arborDayProxy.data.set[0].score
                });
                this.lblTree2.string = i18n.t("ARBOR_DAY_TOTAL_ZHONG_ZHI", {
                    num: n.arborDayProxy.data.set[1].score
                });
                if (
                    null == n.arborDayProxy.data.selectID ||
                    0 == n.arborDayProxy.data.selectID
                ) {
                    this.watchNode.active = !0;
                    this.lblJoin.string = i18n.t("ARBOR_DAY_WEI_JIA_RU");
                } else {
                    var i = localcache.getItem(
                        localdb.table_hero,
                        n.arborDayProxy.data.selectID
                    );
                    this.lblJoin.string = i.name;
                }
                this.lblJoin_1.string = i18n.t("ARBOR_DAY_JOIN_SELECT", {
                    name: e.name
                });
                this.lblJoin_2.string = i18n.t("ARBOR_DAY_JOIN_SELECT", {
                    name: o.name
                });
                this.eff_1.node.active =
                    e.heroid == n.arborDayProxy.data.selectID;
                this.eff_2.node.active =
                    o.heroid == n.arborDayProxy.data.selectID;
                this.eff_1.animation = "animation";
                this.eff_2.animation = "animation";
            }
        };
        e.prototype.onMyRid = function() {
            this.lblRank.string =
                n.arborDayProxy.myRid &&
                n.arborDayProxy.myRid.rid &&
                n.arborDayProxy.myRid.rid > 0
                    ? n.arborDayProxy.myRid.rid + ""
                    : i18n.t("RAKN_UNRANK");
            this.lblTreeNum.string =
                n.arborDayProxy.myRid &&
                n.arborDayProxy.myRid.score &&
                n.arborDayProxy.myRid.score > 0
                    ? n.arborDayProxy.myRid.score + ""
                    : "0";
        };
        e.prototype.onClickEnter = function(t, e) {
            var o = parseInt(e);
            n.arborDayProxy.data &&
                (null == n.arborDayProxy.data.selectID ||
                0 == n.arborDayProxy.data.selectID
                    ? (this.selectNode.active = !0)
                    : n.arborDayProxy.data.selectID ==
                      n.arborDayProxy.data.set[o].pkID
                    ? i.utils.openPrefabView("arborday/ArborDayMain")
                    : i.alertUtil.alert18n("ARBOR_DAY_SELECT_WRONG"));
        };
        e.prototype.onClickTab = function(t, e) {
            "1" == e
                ? i.utils.openPrefabView("arborday/ArborDayZyRwd")
                : "2" == e
                ? i.utils.openPrefabView("arborday/ArborRankRwd")
                : "3" == e
                ? i.utils.openPrefabView(
                      "limitactivity/LimitActivityView",
                      null,
                      {
                          type: n.limitActivityProxy.ARBOR_TYPE
                      }
                  )
                : "4" == e &&
                  i.utils.openPrefabView("arborday/ArborDayPlantRwd");
        };
        e.prototype.onClickSelect = function(t, e) {
            var o = parseInt(e);
            (0 != e && 1 != e) ||
                n.arborDayProxy.sendJoin(n.arborDayProxy.data.set[o].pkID);
            this.selectNode.active = !1;
        };
        e.prototype.onClickWatch = function(t, e) {
            if ("0" == e) {
                var o = i.utils.getParamStr("tree_story_id");
                n.playerProxy.addStoryId(o);
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
        __decorate([c(sp.Skeleton)], e.prototype, "eff_1", void 0);
        __decorate([c(sp.Skeleton)], e.prototype, "eff_2", void 0);
        return (e = __decorate([s], e));
    })(cc.Component);
o.default = _;
