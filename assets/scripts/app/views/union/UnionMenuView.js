var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../Initializer"),
    n = require("../../utils/Utils"),
    l = require("../../component/RoleSpine"),
    r = require("../../component/List"),
    uIUtils = require("../../utils/UIUtils"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.noticeBg = null;
            e.lblName = null;
            e.lblFund = null;
            e.lblNum = null;
            e.lblId = null;
            e.lblExp = null;
            e.lblNotice = null;
            e.lblPos = null;
            e.lblGx = null;
            e.lblLevel = null;
            e.lblChat = null;
            e.lblNameChat = null;
            e.nodeBtn = [];
            e.prgExp = null;
            e.lblMaster = null;
            e.roleSpine = null;
            e.nodeRecord = null;
            e.logList = null;
            e.nodeUp = null;
            e.nodeDown = null;
            e.scorll = null;
            e.flag = !1;
            e.redManage = null;
            e.redCopy = null;
            e.dismissLabel = null;
            e.pos = [];
            return e;
        }
        e.prototype.onLoad = function () {
            facade.subscribe("UNION_CLOSE_MAIN", this.eventClose, this);
            facade.subscribe(
                "UPDATE_MEMBER_INFO",
                this.UPDATE_MEMBER_INFO,
                this
            );
            facade.subscribe(
                "UPDATE_SEARCH_INFO",
                this.UPDATE_SEARCH_INFO,
                this
            );
            facade.subscribe("UNION_CLUB_LOG_UPDATE", this.onClubLog, this);
            facade.subscribe(
                i.chatProxy.UPDATE_CLUB_MSG,
                this.UPDATE_CLUB_MSG,
                this
            );
            facade.subscribe("UPDATE_APPLY_LIST", this.updateApplyList, this);
            facade.subscribe("UPDATE_BOSS_INFO", this.updateCopyRed, this);
            facade.subscribe("UI_TOUCH_MOVE_LEFT", this.eventClose, this);

            facade.subscribe(i.unionProxy.UNION_UPDATE_DISMISS_MSG, this.updateDismiss, this);

            this.updateDismiss();

            for (var t = 0; t < this.nodeBtn.length; t++) {
                var e = this.nodeBtn[t];
                this.pos.push({
                    x: e.x,
                    y: e.y
                });
            }
            this.UPDATE_SEARCH_INFO();
            this.UPDATE_MEMBER_INFO();
            this.UPDATE_CLUB_MSG();
            this.onClubLog();
            this.updateApplyList();
            this.updateCopyRed();
        };



        e.prototype.updateDismiss = function () {

            var set = i.unionProxy.dismiss;
            if (set && set.end_time) {

                this.dismissLabel.node.active = true;

                var endTime = set.end_time;
                var t = this;

                uIUtils.uiUtils.countDown(
                    endTime,
                    this.dismissLabel,
                    function () {
                        t.dismissLabel.string = i18n.t("CLUB_DRESSINGED_TIP");
                        i.unionProxy.clearData();
                        t.eventClose();
                    },
                    !0,
                    "UNION_JIE_SAN_TIME_TIP"
                );


            } else {
                this.dismissLabel.node.active = false;
            }
        };

        e.prototype.UPDATE_SEARCH_INFO = function () {
            var t = i.unionProxy.clubInfo;
            if (t) {
                this.lblName.string = t.name;
                this.lblFund.string = t.fund + "";
                this.lblNum.string = i18n.t("COMMON_NUM", {
                    f: t.members.length,
                    s: i.unionProxy.getUnionLvMaxCount(t.level)
                });
                this.lblNotice.string = i18n.has(t.notice) ?
                    i18n.t(t.notice) :
                    t.notice;
                this.lblExp.string = i18n.t("COMMON_NUM", {
                    f: t.exp,
                    s: i.unionProxy.getUnionLvExp(t.level)
                });
                this.lblId.string = t.id + "";
                this.prgExp.progress =
                    0 == i.unionProxy.getUnionLvExp(t.level) ?
                    0 :
                    t.exp / i.unionProxy.getUnionLvExp(t.level);
                this.lblLevel.string = i18n.t("UNION_LEVEL_TXT", {
                    num: t.level
                });
                var e = i.unionProxy.getMengzhu(i.unionProxy.clubInfo.members);
                if (e) {
                    this.lblMaster.string = e ? e.name : "";
                    this.roleSpine.setClothes(e.sex, e.job, e.level, e.clothe);
                }
            }
        };
        e.prototype.UPDATE_MEMBER_INFO = function () {
            var t = i.unionProxy.memberInfo;
            if (null == t || t.cid <= 0) this.eventClose();
            else {
                this.lblPos.string = i.unionProxy.getPostion(t.post);
                this.lblGx.string = i18n.t("COMMON_NUM", {
                    f: t.leftgx,
                    s: t.allgx
                });
            }
            this.updateBtn();
        };
        e.prototype.updateBtn = function () {
            var t = i.unionProxy.memberInfo;
            if (t) {
                this.nodeBtn[0].active = 1 == t.post || 2 == t.post || 3 == t.post;
                this.nodeBtn[5].active = !1;
                for (var e = 0, o = 0; o < this.nodeBtn.length; o++) {
                    this.nodeBtn[o].x = this.pos[e].x;
                    this.nodeBtn[o].y = this.pos[e].y;
                    this.nodeBtn[o].active && e++;
                }
            }
        };
        e.prototype.setShowChat = function (t) {
            this.lblNameChat.string = t ?
                i18n.t("chat_home_show", {
                    name: t.user ? t.user.name : i18n.t("CHAT_SYS_TIP")
                }) :
                "";
            this.lblChat.string = t ? i.chatProxy.getSpMsg(t.msg) : "";
        };
        e.prototype.UPDATE_CLUB_MSG = function () {
            this.setShowChat(i.chatProxy.getLastMsg(i.chatProxy.clubMsg));
        };
        e.prototype.eventClose = function () {
            n.utils.closeView(this);
        };
        e.prototype.eventCloseNotice = function () {
            this.noticeBg.active = !1;
        };
        e.prototype.eventManage = function () {
            n.utils.openPrefabView("union/UnionManage");
        };
        e.prototype.eventBuild = function () {
            n.utils.openPrefabView("union/UnionBuild");
        };
        e.prototype.eventMembers = function () {
            n.utils.openPrefabView("union/UnionMebInfo");
        };
        e.prototype.eventGifts = function () {
            n.utils.openPrefabView("union/UnionGiftView");
        };
        e.prototype.eventRwdView = function () {
            n.utils.openPrefabView("union/UnionRwdView");
        };
        e.prototype.eventExchange = function () {
            i.unionProxy.sendShopList();
        };
        e.prototype.eventCopy = function () {
            i.unionProxy.sendBossList();
        };
        e.prototype.eventCrossFight = function () {
            n.utils.openPrefabView("union/");
        };
        e.prototype.eventRank = function () {
            i.unionProxy.sendRankList(i.unionProxy.memberInfo.cid);
        };
        e.prototype.eventChat = function () {
            n.utils.openPrefabView("chat/ChatView", !1, {
                type: 2
            });
        };
        e.prototype.onClickInfo = function () {
            n.utils.openPrefabView(
                "union/UnionInfo",
                null,
                i.unionProxy.clubInfo
            );
        };
        e.prototype.onClickRecord = function () {
            if (1 == this.flag) {
                this.flag = !1;
                this.nodeRecord.y = -(this.node.height / 2 - 40);
            } else {
                this.flag = !0;
                this.scorll.scrollToTop();
                this.nodeRecord.y = -(this.node.height / 2 - 435);
            }
            this.nodeUp.active = !this.flag;
            this.nodeDown.active = this.flag;
        };
        e.prototype.onClubLog = function () {
            this.logList.data = i.unionProxy.clubLog;
        };
        e.prototype.updateApplyList = function () {
            this.redManage.active =
                i.unionProxy.applyList && i.unionProxy.applyList.length > 0;
        };
        e.prototype.updateCopyRed = function () {
            var t = !1,
                e = i.unionProxy.bossInfo;
            if (e && e.length > 0)
                for (var o = 0; o < e.length; o++)
                    if (0 != e[o].id && 1 == e[o].type) {
                        t = !0;
                        break;
                    }
            var l =
                n.timeUtil.second > n.timeUtil.getTodaySecond(0) &&
                n.timeUtil.second < n.timeUtil.getTodaySecond(23.5);
            this.redCopy.active = t && l;
        };


        __decorate([c(cc.Label)], e.prototype, "dismissLabel", void 0);
        __decorate([c(cc.Node)], e.prototype, "noticeBg", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblFund", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblNum", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblId", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblExp", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblNotice", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblPos", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblGx", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblLevel", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblChat", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblNameChat", void 0);
        __decorate([c([cc.Node])], e.prototype, "nodeBtn", void 0);
        __decorate([c(cc.ProgressBar)], e.prototype, "prgExp", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblMaster", void 0);
        __decorate([c(l.default)], e.prototype, "roleSpine", void 0);
        __decorate([c(cc.Node)], e.prototype, "nodeRecord", void 0);
        __decorate([c(r.default)], e.prototype, "logList", void 0);
        __decorate([c(cc.Node)], e.prototype, "nodeUp", void 0);
        __decorate([c(cc.Node)], e.prototype, "nodeDown", void 0);
        __decorate([c(cc.ScrollView)], e.prototype, "scorll", void 0);
        __decorate([c(cc.Node)], e.prototype, "redManage", void 0);
        __decorate([c(cc.Node)], e.prototype, "redCopy", void 0);
        return (e = __decorate([s], e));
    })(cc.Component);
o.default = _;