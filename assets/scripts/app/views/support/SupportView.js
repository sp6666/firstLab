var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/UrlLoad"),
    n = require("../../component/List"),
    l = require("../../utils/Utils"),
    r = require("../../Initializer"),
    a = require("../../utils/UIUtils"),
    s = require("../../utils/ShaderUtils"),
    c = cc._decorator,
    _ = c.ccclass,
    d = c.property,
    u = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.leftRole = null;
            e.leftName = null;
            e.rightRole = null;
            e.rightName = null;
            e.lblLeftRq = null;
            e.lblRightRq = null;
            e.leftWin = null;
            e.rightWin = null;
            e.leftYYbtn = null;
            e.rightYYbtn = null;
            e.bottomRecord = null;
            e.bottomRank = null;
            e.lblEndCd = null;
            e.lblGetCd = null;
            e.recordList = null;
            e.rankList = null;
            e.battleNode = null;
            e.leftNode = null;
            e.rightNode = null;
            e.btnGet = null;
            e.btnYlq = null;
            e.leftRqNode = null;
            e.rightRqNode = null;
            e.leftTalkNode = null;
            e.rightTalkNode = null;
            e.lblLeftTalk = null;
            e.lblRightTalk = null;
            e.scorll = null;
            e.lblBtn = null;
            e.lblranktip = null;
            e.leftTalk = [];
            e.rightTalk = [];
            e.curIndex = 1;
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe("SUPPORT_CFG_UPDATE", this.onCfgUpdate, this);
            facade.subscribe("SUPPORT_RECORD_UPDATE", this.onRecord, this);
            facade.subscribe("SUPPORT_RESULT_UPDATE", this.showPanel, this);
            facade.subscribe("SUPPORT_END_LIST", this.onEndList, this);
            facade.subscribe("UI_TOUCH_MOVE_LEFT", this.onClickClose, this);
            r.supportProxy.sendOpenYyhuodong();
            this.onCfgUpdate();
            this.onRecord();
            this.onRecordTime();
            this.schedule(this.onRecordTime, 20);
        };
        e.prototype.onCfgUpdate = function() {
            var t = r.supportProxy.cfg;
            if (t) {
                var e = localcache.getItem(
                        localdb.table_hero,
                        t.set.pk[0].pkID
                    ),
                    o = localcache.getItem(
                        localdb.table_hero,
                        t.set.pk[1].pkID
                    );
                this.leftName.url = a.uiHelps.getStoryRoleName(e.heroid);
                this.rightName.url = a.uiHelps.getStoryRoleName(o.heroid);
                this.leftRole.url = a.uiHelps.getServantSpine(e.heroid);
                this.rightRole.url = a.uiHelps.getServantSpine(o.heroid);
                if (0 == this.leftTalk.length) {
                    var i = localcache.getItem(
                        localdb.table_yingyuantalk,
                        t.set.pk[0].pkID
                    );
                    this.leftTalk = i.main.split("|");
                }
                if (0 == this.rightTalk.length) {
                    var n = localcache.getItem(
                        localdb.table_yingyuantalk,
                        t.set.pk[1].pkID
                    );
                    this.rightTalk = n.main.split("|");
                }
                this.showPanel();
                this.onRewardTypeUpdate();
            }
        };
        e.prototype.showPanel = function() {
            var t = r.supportProxy.cfg.info.eTime,
                e = r.supportProxy.cfg.info.sTime,
                o = r.supportProxy.cfg.info.showTime,
                i = l.timeUtil.second;
            this.battleNode.active = e <= i && i < t;
            this.leftYYbtn.active = this.rightYYbtn.active = e <= i && i < t;
            this.leftRqNode.active = this.rightRqNode.active = t <= i && i < o;
            this.bottomRecord.active = e <= i && i < t;
            this.bottomRank.active = t <= i && i <= o;
            this.leftTalkNode.active = this.rightTalkNode.active =
                e <= i && i < t;
            var n = this;
            if (e <= i && i < t) {
                this.battleNode.active = !0;
                this.lblEndCd.string = i18n.t("AT_LIST_ACTIVITY_CD");
                a.uiUtils.countDown(
                    r.supportProxy.cfg.info.eTime,
                    this.lblEndCd,
                    function() {
                        n.lblEndCd.string = i18n.t("ACTHD_OVERDUE");
                    },
                    !0,
                    "USER_REMAIN_TIME",
                    "d"
                );
                this.onTimer3();
                this.schedule(this.onTimer3, 10);
            } else if (t <= i && i <= o) {
                a.uiUtils.countDown(
                    r.supportProxy.cfg.info.eTime,
                    this.lblGetCd,
                    function() {
                        n.lblGetCd.string = i18n.t("ACTHD_OVERDUE");
                    },
                    !0,
                    "SUPPORT_SHENG_YU_LING_JIANG",
                    "d"
                );
                var c = 0;
                if (0 == r.supportProxy.winId) return;
                for (var _ = 0; _ < r.supportProxy.cfg.set.pk.length; _++)
                    if (
                        r.supportProxy.cfg.set.pk[_].pkID ==
                        r.supportProxy.winId
                    ) {
                        c = _;
                        break;
                    }
                this.onClickShowEndRank(null, c);
                if (0 == c) {
                    s.shaderUtils.setNodeGray(this.rightNode);
                    this.rightRole.loadHandle = function() {
                        s.shaderUtils.setNodeGray(n.rightRole.node);
                    };
                    if (r.supportProxy.result) {
                        this.lblLeftRq.string =
                            r.supportProxy.result.WinRank_contribution + "";
                        this.lblRightRq.string =
                            r.supportProxy.result.LostRank_contribution + "";
                    }
                } else if (1 == c) {
                    s.shaderUtils.setNodeGray(this.leftNode);
                    this.leftRole.loadHandle = function() {
                        s.shaderUtils.setNodeGray(n.leftRole.node);
                    };
                    if (r.supportProxy.result) {
                        this.lblLeftRq.string =
                            r.supportProxy.result.LostRank_contribution + "";
                        this.lblRightRq.string =
                            r.supportProxy.result.WinRank_contribution + "";
                    }
                }
                this.leftWin.active = 0 == c;
                this.rightWin.active = 1 == c;
                s.shaderUtils.clearNodeShader(this.leftRqNode);
                s.shaderUtils.clearNodeShader(this.rightRqNode);
            }
        };
        e.prototype.onClickShowEndRank = function(t, e) {
            if (
                r.supportProxy.cfg.info.eTime <= l.timeUtil.second &&
                l.timeUtil.second <= r.supportProxy.cfg.info.showTime
            ) {
                for (
                    var o = parseInt(e), i = 0, n = 0, a = 0;
                    a < r.supportProxy.cfg.set.pk.length;
                    a++
                )
                    o == a
                        ? (i = r.supportProxy.cfg.set.pk[a].pkID)
                        : (n = r.supportProxy.cfg.set.pk[a].pkID);
                this.rankList.data =
                    i > n ? r.supportProxy.big_list : r.supportProxy.small_list;
                this.curIndex = o;
                this.lblranktip.string =
                    i == r.supportProxy.winId
                        ? i18n.t("SUPPORT_RANK_TIP_WIN")
                        : i18n.t("SUPPORT_RANK_TIP_LOST");
            }
        };
        e.prototype.onTimer3 = function() {
            var t = this.leftTalk[
                Math.floor(Math.random() * this.leftTalk.length)
            ];
            this.lblLeftTalk.string = t;
            var e = this.rightTalk[
                Math.floor(Math.random() * this.rightTalk.length)
            ];
            this.lblRightTalk.string = e;
        };
        e.prototype.onClickTab = function(t, e) {
            "1" == e
                ? l.utils.openPrefabView("support/SupportChangeShop")
                : "2" == e
                ? l.utils.openPrefabView("support/SupportBuyShop")
                : "3" == e && r.supportProxy.sendLookRank();
        };
        e.prototype.onRewardTypeUpdate = function() {
            this.btnGet.active = 0 == r.supportProxy.cfg.get;
            this.btnYlq.active = 0 != r.supportProxy.cfg.get;
            1 == r.supportProxy.cfg.get
                ? (this.lblBtn.string = i18n.t("ACT66_HAVE_RECEIVE"))
                : 2 == r.supportProxy.cfg.get &&
                  (this.lblBtn.string = i18n.t("RAKN_UNRANK"));
        };
        e.prototype.onClickGetReward = function() {
            r.supportProxy.sendGetReward();
        };
        e.prototype.onRecord = function() {
            this.recordList.data = r.supportProxy.record;
            this.scorll.scrollToBottom();
        };
        e.prototype.onClickYy = function(t, e) {
            var o;
            "0" == e
                ? (o = localcache.getItem(
                      localdb.table_hero,
                      r.supportProxy.cfg.set.pk[0].pkID
                  ))
                : "1" == e &&
                  (o = localcache.getItem(
                      localdb.table_hero,
                      r.supportProxy.cfg.set.pk[1].pkID
                  ));
            l.utils.openPrefabView("support/SupportGiftView", null, o);
        };
        e.prototype.onRecordTime = function() {
            r.supportProxy.cfg &&
                r.supportProxy.sendLookRecord(r.supportProxy.cfg.info.id);
        };
        e.prototype.onClickClose = function() {
            l.utils.closeView(this);
        };
        e.prototype.onEndList = function() {
            this.onClickShowEndRank(null, this.curIndex);
        };
        __decorate([d(i.default)], e.prototype, "leftRole", void 0);
        __decorate([d(i.default)], e.prototype, "leftName", void 0);
        __decorate([d(i.default)], e.prototype, "rightRole", void 0);
        __decorate([d(i.default)], e.prototype, "rightName", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblLeftRq", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblRightRq", void 0);
        __decorate([d(cc.Node)], e.prototype, "leftWin", void 0);
        __decorate([d(cc.Node)], e.prototype, "rightWin", void 0);
        __decorate([d(cc.Node)], e.prototype, "leftYYbtn", void 0);
        __decorate([d(cc.Node)], e.prototype, "rightYYbtn", void 0);
        __decorate([d(cc.Node)], e.prototype, "bottomRecord", void 0);
        __decorate([d(cc.Node)], e.prototype, "bottomRank", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblEndCd", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblGetCd", void 0);
        __decorate([d(n.default)], e.prototype, "recordList", void 0);
        __decorate([d(n.default)], e.prototype, "rankList", void 0);
        __decorate([d(cc.Node)], e.prototype, "battleNode", void 0);
        __decorate([d(cc.Node)], e.prototype, "leftNode", void 0);
        __decorate([d(cc.Node)], e.prototype, "rightNode", void 0);
        __decorate([d(cc.Node)], e.prototype, "btnGet", void 0);
        __decorate([d(cc.Node)], e.prototype, "btnYlq", void 0);
        __decorate([d(cc.Node)], e.prototype, "leftRqNode", void 0);
        __decorate([d(cc.Node)], e.prototype, "rightRqNode", void 0);
        __decorate([d(cc.Node)], e.prototype, "leftTalkNode", void 0);
        __decorate([d(cc.Node)], e.prototype, "rightTalkNode", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblLeftTalk", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblRightTalk", void 0);
        __decorate([d(cc.ScrollView)], e.prototype, "scorll", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblBtn", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblranktip", void 0);
        return (e = __decorate([_], e));
    })(cc.Component);
o.default = u;
