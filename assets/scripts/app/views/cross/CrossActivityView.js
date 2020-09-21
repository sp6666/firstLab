var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = require("../../component/RoleSpine"),
    l = require("../../component/List"),
    r = require("./CrossActivityRankItem"),
    a = require("../../Initializer"),
    s = require("../../utils/UIUtils"),
    c = cc._decorator,
    _ = c.ccclass,
    d = c.property,
    u = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblTitle = null;
            e.lblTime = null;
            e.role = null;
            e.lblRankTitle1 = null;
            e.lblRankTitle2 = null;
            e.rankList = null;
            e.myRank = null;
            e.tabs = [];
            e.btnnode1 = null;
            e.btnnode2 = null;
            e.btnnode3 = null;
            e.ranknode = null;
            e.haveRankNode = null;
            e.noRankNode = null;
            e.curActivityId = 0;
            e.tabIndex = "1";
            e.hdData = null;
            e.enterNum = 0;
            e.yuXuanEndCd = 0;
            e.comein = 0;
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe(a.crossProxy.CROSS_SHI_LI_CFG, this.onShiLiCFG, this);
            facade.subscribe(a.crossProxy.CROSS_LOVE_CFG, this.onLoveCFG, this);
            facade.subscribe(a.crossProxy.CROSS_GONGDOU_CFG, this.onGongDouCFG, this);

            facade.subscribe(a.crossProxy.CROSS_USER_LIST, this.onUserList, this);
            facade.subscribe(a.crossProxy.CROSS_USER_LOVE_LIST, this.onUserLoveList, this);
            facade.subscribe(a.crossProxy.CROSS_USER_GONGDOU_LIST, this.onUserGongDouList, this);

            facade.subscribe(a.crossProxy.CROSS_MY_KUA_SHI_LI, this.onMyKuaShiLi, this);
            facade.subscribe(a.crossProxy.CROSS_MY_KUA_LOVE, this.onMyKuaLove, this);
            facade.subscribe(a.crossProxy.CROSS_MY_KUA_GONGDOU, this.onMyKuaGongDou, this);

            facade.subscribe(a.crossProxy.CROSS_QU_FU_LIST, this.onQuFuList,this);
            facade.subscribe(a.crossProxy.CROSS_QU_FU_LOVE_LIST, this.onQuFuLoveList, this);
            facade.subscribe(a.crossProxy.CROSS_QU_FU_GONGDOU_LIST, this.onQuFuGongDouList, this);

            facade.subscribe(a.crossProxy.CROSS_MY_KUA_QU_FU, this.onMyKuaQuFu, this);
            facade.subscribe(a.crossProxy.CROSS_MY_KUA_QU_FU_LOVE, this.onMyKuaQuFuLove, this);
            facade.subscribe(a.crossProxy.CROSS_MY_KUA_QU_FU_GONGDOU, this.onMyKuaQuFuGongDou, this);

            var t = a.crossProxy.getCurHuoDong();
            if (t) {
                this.curActivityId = t.id;
                a.crossProxy.sendInfo(this.curActivityId);
            }
            this.updateRoleShow();
        };
        e.prototype.updateRoleShow = function() {
            this.role.updatePlayerShow();
        };
        e.prototype.onShiLiCFG = function() {
            var t = this;
            if (a.crossProxy.kuashili) {
                var e = this;
                if (0 == a.crossProxy.kuashili.type) {
                    this.yuXuanEndCd = a.crossProxy.kuashili.cd.next;
                    a.crossProxy.getYuXuanCd(a.crossProxy.kuashili.cd.next) > 0
                        ? s.uiUtils.countDown(
                              a.crossProxy.kuashili.cd.next - 7200,
                              this.lblTime,
                              function() {
                                  s.uiUtils.countDown(
                                      a.crossProxy.kuashili.cd.next,
                                      t.lblTime,
                                      function() {
                                          a.crossProxy.sendInfo(
                                              t.curActivityId
                                          );
                                      },
                                      !0,
                                      "CROSS_READY_REWARD_TIME",
                                      "d"
                                  );
                              },
                              !0,
                              "CROSS_READY_TIME",
                              "d"
                          )
                        : s.uiUtils.countDown(
                              a.crossProxy.kuashili.cd.next,
                              this.lblTime,
                              function() {
                                  a.crossProxy.sendInfo(t.curActivityId);
                              },
                              !0,
                              "CROSS_READY_REWARD_TIME",
                              "d"
                          );
                    this.btnnode1.active = !0;
                    this.btnnode2.active = !1;
                    this.btnnode3.active = !1;
                    this.ranknode.active = !1;
                } else if (1 == a.crossProxy.kuashili.type) {
                    s.uiUtils.countDown(
                        a.crossProxy.kuashili.cd.next,
                        this.lblTime,
                        function() {
                            e.lblTime.string = i18n.t("CROSS_END");
                        },
                        !0,
                        "CROSS_LEFT_TIME",
                        "d"
                    );
                    this.onClickTab(null, this.tabIndex);
                    this.btnnode1.active = !1;
                    this.btnnode2.active = !0;
                    this.btnnode3.active = !0;
                    this.ranknode.active = !0;
                    0 == a.crossProxy.kuashili.comein &&
                        i.alertUtil.alert18n("FORCES_HD_YX_CONTENT_2");
                } else {
                    this.lblTime.string = i18n.t("CROSS_END");
                    this.btnnode1.active = !1;
                    this.btnnode2.active = !0;
                    this.btnnode3.active = !0;
                    this.ranknode.active = !0;
                    this.onClickTab(null, this.tabIndex);
                }
                this.comein = a.crossProxy.kuashili.comein;
                this.haveRankNode.active = 1 == a.crossProxy.kuashili.comein;
                this.noRankNode.active = !this.haveRankNode.active;
                this.enterNum = a.crossProxy.kuashili.rnum;
                this.hdData = a.crossProxy.kuashili.cfg;
                this.lblRankTitle2.string = i18n.t("RANK_SHI_LI_ZHANG_FU");
                this.lblTitle.string = a.crossProxy.kuashili.cfg.info.title;
                a.crossProxy.isShow = 0 != a.crossProxy.kuashili.type;
            }
        };
        e.prototype.onLoveCFG = function() {
            var t = this;
            if (a.crossProxy.kualove) {
                var e = this;
                if (0 == a.crossProxy.kualove.type) {
                    this.yuXuanEndCd = a.crossProxy.kualove.cd.next;
                    a.crossProxy.getYuXuanCd(a.crossProxy.kualove.cd.next) > 0
                        ? s.uiUtils.countDown(
                              a.crossProxy.kualove.cd.next - 7200,
                              this.lblTime,
                              function() {
                                  s.uiUtils.countDown(
                                      a.crossProxy.kualove.cd.next,
                                      t.lblTime,
                                      function() {
                                          a.crossProxy.sendInfo(
                                              t.curActivityId
                                          );
                                      },
                                      !0,
                                      "CROSS_READY_REWARD_TIME",
                                      "d"
                                  );
                              },
                              !0,
                              "CROSS_READY_TIME",
                              "d"
                          )
                        : s.uiUtils.countDown(
                              a.crossProxy.kualove.cd.next,
                              this.lblTime,
                              function() {
                                  a.crossProxy.sendInfo(t.curActivityId);
                              },
                              !0,
                              "CROSS_READY_REWARD_TIME",
                              "d"
                          );
                    this.btnnode1.active = !0;
                    this.btnnode2.active = !1;
                    this.btnnode3.active = !1;
                    this.ranknode.active = !1;
                } else if (1 == a.crossProxy.kualove.type) {
                    s.uiUtils.countDown(
                        a.crossProxy.kualove.cd.next,
                        this.lblTime,
                        function() {
                            e.lblTime.string = i18n.t("CROSS_END");
                        },
                        !0,
                        "CROSS_LEFT_TIME",
                        "d"
                    );
                    this.onClickTab(null, this.tabIndex);
                    this.btnnode1.active = !1;
                    this.btnnode2.active = !0;
                    this.btnnode3.active = !0;
                    this.ranknode.active = !0;
                    0 == a.crossProxy.kualove.comein &&
                        i.alertUtil.alert18n("CLOSE_HD_YX_CONTENT_2");
                } else {
                    this.lblTime.string = i18n.t("CROSS_END");
                    this.btnnode1.active = !1;
                    this.btnnode2.active = !0;
                    this.btnnode3.active = !0;
                    this.ranknode.active = !0;
                    this.onClickTab(null, this.tabIndex);
                }
                this.comein = a.crossProxy.kualove.comein;
                this.haveRankNode.active = 1 == a.crossProxy.kualove.comein;
                this.noRankNode.active = !this.haveRankNode.active;
                this.hdData = a.crossProxy.kualove.cfg;
                this.lblRankTitle2.string = i18n.t("CROSS_QINMI");
                this.enterNum = a.crossProxy.kualove.rnum;
                this.lblTitle.string = a.crossProxy.kualove.cfg.info.title;
                a.crossProxy.isShow = 0 != a.crossProxy.kualove.type;
            }
        };
        e.prototype.onGongDouCFG = function() {
            var t = this;
            if (a.crossProxy.kuagongdou) {
                var e = this;
                if (0 == a.crossProxy.kuagongdou.type) {
                    this.yuXuanEndCd = a.crossProxy.kuagongdou.cd.next;
                    a.crossProxy.getYuXuanCd(a.crossProxy.kuagongdou.cd.next) > 0
                        ? s.uiUtils.countDown(
                              a.crossProxy.kuagongdou.cd.next - 7200,
                              this.lblTime,
                              function() {
                                  s.uiUtils.countDown(
                                      a.crossProxy.kuagongdou.cd.next,
                                      t.lblTime,
                                      function() {
                                          a.crossProxy.sendInfo(
                                              t.curActivityId
                                          );
                                      },
                                      !0,
                                      "CROSS_READY_REWARD_TIME",
                                      "d"
                                  );
                              },
                              !0,
                              "CROSS_READY_TIME",
                              "d"
                          )
                        : s.uiUtils.countDown(
                              a.crossProxy.kuagongdou.cd.next,
                              this.lblTime,
                              function() {
                                  a.crossProxy.sendInfo(t.curActivityId);
                              },
                              !0,
                              "CROSS_READY_REWARD_TIME",
                              "d"
                          );
                    this.btnnode1.active = !0;
                    this.btnnode2.active = !1;
                    this.btnnode3.active = !1;
                    this.ranknode.active = !1;
                } else if (1 == a.crossProxy.kuagongdou.type) {
                    s.uiUtils.countDown(
                        a.crossProxy.kuagongdou.cd.next,
                        this.lblTime,
                        function() {
                            e.lblTime.string = i18n.t("CROSS_END");
                        },
                        !0,
                        "CROSS_LEFT_TIME",
                        "d"
                    );
                    this.onClickTab(null, this.tabIndex);
                    this.btnnode1.active = !1;
                    this.btnnode2.active = !0;
                    this.btnnode3.active = !0;
                    this.ranknode.active = !0;
                    0 == a.crossProxy.kuagongdou.comein &&
                        i.alertUtil.alert18n("GOVERN_HD_YX_CONTENT_2");
                } else {
                    this.lblTime.string = i18n.t("CROSS_END");
                    this.btnnode1.active = !1;
                    this.btnnode2.active = !0;
                    this.btnnode3.active = !0;
                    this.ranknode.active = !0;
                    this.onClickTab(null, this.tabIndex);
                }
                this.comein = a.crossProxy.kuagongdou.comein;
                this.haveRankNode.active = 1 == a.crossProxy.kuagongdou.comein;
                this.noRankNode.active = !this.haveRankNode.active;
                this.hdData = a.crossProxy.kuagongdou.cfg;
                this.lblRankTitle2.string = i18n.t("CROSS_RANK_ARENA");
                this.enterNum = a.crossProxy.kuagongdou.rnum;
                this.lblTitle.string = a.crossProxy.kuagongdou.cfg.info.title;
                a.crossProxy.isShow = 0 != a.crossProxy.kuagongdou.type;
            }
        };

        e.prototype.onUserList = function() {
            a.crossProxy.userlist &&
                (this.rankList.data = a.crossProxy.userlist);
        };
        e.prototype.onUserLoveList = function() {
            if(this.tabIndex != 1)
            {
                return;
            }
            a.crossProxy.userlovelist &&
                (this.rankList.data = a.crossProxy.userlovelist);
        };
        e.prototype.onUserGongDouList = function() {
            if(this.tabIndex != 1)
            {
                return;
            }
            a.crossProxy.usergongdoulist &&
                (this.rankList.data = a.crossProxy.usergongdoulist);
        };

        e.prototype.onMyKuaShiLi = function() {
            "1" == this.tabIndex &&
                (this.myRank.data = a.crossProxy.mykuashiliRid);
        };
        e.prototype.onMyKuaLove = function() {
            "1" == this.tabIndex &&
                (this.myRank.data = a.crossProxy.mykualoveRid);
        };
        e.prototype.onMyKuaGongDou = function() {
            "1" == this.tabIndex &&
                (this.myRank.data = a.crossProxy.mykuagongdouRid);
        };

        e.prototype.onQuFuList = function() {
            a.crossProxy.qufulist &&
                (this.rankList.data = a.crossProxy.qufulist);
        };
        e.prototype.onQuFuLoveList = function() {
            if(this.tabIndex != 2)
            {
                return;
            }
            a.crossProxy.qufulovelist &&
                (this.rankList.data = a.crossProxy.qufulovelist);
        };
        e.prototype.onQuFuGongDouList = function() {
            if(this.tabIndex != 2)
            {
                return;
            }
            a.crossProxy.qufugongdoulist &&
                (this.rankList.data = a.crossProxy.qufugongdoulist);
        };

        e.prototype.onMyKuaQuFu = function() {
            "2" == this.tabIndex &&
                (this.myRank.data = a.crossProxy.mykuaquRid);
        };
        e.prototype.onMyKuaQuFuLove = function() {
            "2" == this.tabIndex &&
                (this.myRank.data = a.crossProxy.mykuaquloveRid);
        };
        e.prototype.onMyKuaQuFuGongDou = function() {
            "2" == this.tabIndex &&
                (this.myRank.data = a.crossProxy.mykuaqugongdouRid);
        };

        e.prototype.setTab = function(t) {
            var e = parseInt(t) - 1;
            this.tabIndex = t;
            for (var o = 0; o < this.tabs.length; o++)
                this.tabs[o].interactable = o != e;
        };
        e.prototype.onClickTab = function(t, e) {
            switch (e) {
                case "1":
                    this.curActivityId > 0 &&
                        a.crossProxy.sendUserRank(this.curActivityId);
                    this.lblRankTitle1.string = i18n.t("RANK_NAME_TIP");
                    this.setTab(e);
                    break;

                case "2":
                    this.curActivityId > 0 &&
                        a.crossProxy.sendQuRank(this.curActivityId);
                    this.lblRankTitle1.string = i18n.t("CROSS_SERVER");
                    this.setTab(e);
                    break;

                case "3":
                    i.utils.openPrefabView("cross/FengXianHallView");
                    break;

                case "4":
                    i.utils.openPrefabView(
                        "cross/CrossActivityWindow",
                        null,
                        this.hdData
                    );
                    break;

                case "5":
                    i.utils.openPrefabView("cross/CrossRankView", null, {
                        id: this.curActivityId,
                        isShow: 1,
                        comein: this.comein
                    });
                    break;

                case "6":
                    a.crossProxy.sendYXRank(this.curActivityId);
                    i.utils.openPrefabView(
                        "limitactivity/AtListRankView",
                        null,
                        {
                            isKuaFu: !0,
                            id: this.curActivityId,
                            num: this.enterNum,
                            cd: this.yuXuanEndCd
                        }
                    );
            }
        };
        e.prototype.onClickClose = function() {
            a.crossProxy.isShow = !0;
            i.utils.closeView(this);
        };
        __decorate([d(cc.Label)], e.prototype, "lblTitle", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblTime", void 0);
        __decorate([d(n.default)], e.prototype, "role", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblRankTitle1", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblRankTitle2", void 0);
        __decorate([d(l.default)], e.prototype, "rankList", void 0);
        __decorate([d(r.default)], e.prototype, "myRank", void 0);
        __decorate([d([cc.Button])], e.prototype, "tabs", void 0);
        __decorate([d(cc.Node)], e.prototype, "btnnode1", void 0);
        __decorate([d(cc.Node)], e.prototype, "btnnode2", void 0);
        __decorate([d(cc.Node)], e.prototype, "btnnode3", void 0);
        __decorate([d(cc.Node)], e.prototype, "ranknode", void 0);
        __decorate([d(cc.Node)], e.prototype, "haveRankNode", void 0);
        __decorate([d(cc.Node)], e.prototype, "noRankNode", void 0);
        return (e = __decorate([_], e));
    })(cc.Component);
o.default = u;
