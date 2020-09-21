var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("../../utils/Utils"),
    l = require("../../Initializer"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.list = null;
            e.lblContent = null;
            e.lblName = null;
            e.btnRe = null;
            e.lblRe = null;
            e.tab = null;
            e.tabs = [];
            e.lblMyRank = null;
            e.lblMyName = null;
            e.lblMyScore = null;
            e.rankNode = null;
            e.norankNode = null;
            e.curActivityId = 0;
            e.tabIndex = "1";
            e.ranktype = 0;
            e.comein = 0;
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe(l.crossProxy.CROSS_USER_LIST, this.onUserList, this);
            facade.subscribe(l.crossProxy.CROSS_USER_LOVE_LIST, this.onUserLoveList, this);
            facade.subscribe(l.crossProxy.CROSS_USER_GONGDOU_LIST, this.onUserGongDouList, this);

            facade.subscribe(l.crossProxy.CROSS_QU_FU_LIST, this.onQuFuList, this);
            facade.subscribe(l.crossProxy.CROSS_QU_FU_LOVE_LIST, this.onQuFuLoveList, this);
            facade.subscribe(l.crossProxy.CROSS_QU_FU_GONGDOU_LIST, this.onQuFuGongDouList, this);

            facade.subscribe(l.crossProxy.CROSS_MY_KUA_SHI_LI, this.onMyKuaShiLi, this);
            facade.subscribe(l.crossProxy.CROSS_MY_KUA_LOVE, this.onMyKuaLove, this);
            facade.subscribe(l.crossProxy.CROSS_MY_KUA_GONGDOU, this.onMyKuaGongDou, this);

            facade.subscribe(l.crossProxy.CROSS_MY_KUA_QU_FU, this.onMyKuaQuFu, this);
            facade.subscribe(l.crossProxy.CROSS_MY_KUA_QU_FU_LOVE, this.onMyKuaQuFuLove, this);
            facade.subscribe(l.crossProxy.CROSS_MY_KUA_QU_FU_GONGDOU, this.onMyKuaQuFuGongDou, this);

            this.onRank();
            this.onTimer();
            this.schedule(this.onTimer, 1);
            var t = l.limitActivityProxy.getActivityData(this.curActivityId),
                e =
                    !!t &&
                    (n.timeUtil.second >= t.sTime &&
                        n.timeUtil.second <= t.eTime);
            this.btnRe.node.active = e;
        };
        e.prototype.onMyKuaShiLi = function() {
            if (null != l.crossProxy.mykuashiliRid && "1" == this.tabIndex) {
                var t =
                    null != l.crossProxy.mykuashiliRid.rid
                        ? l.crossProxy.mykuashiliRid.rid
                        : 0;
                this.lblMyRank.string =
                    t <= 0 ? i18n.t("RAKN_UNRANK") : t.toString();
                l.loginProxy.getServer(l.crossProxy.mykuashiliRid.serv);
                this.lblMyName.string = l.crossProxy.mykuashiliRid.name;
                this.lblMyScore.string = l.crossProxy.mykuashiliRid.score + "";
            }
        };
        e.prototype.onMyKuaLove = function() {
            if (null != l.crossProxy.mykualoveRid && "1" == this.tabIndex) {
                var t =
                    null != l.crossProxy.mykualoveRid.rid
                        ? l.crossProxy.mykualoveRid.rid
                        : 0;
                this.lblMyRank.string =
                    t <= 0 ? i18n.t("RAKN_UNRANK") : t.toString();
                l.loginProxy.getServer(l.crossProxy.mykualoveRid.serv);
                this.lblMyName.string = l.crossProxy.mykualoveRid.name;
                this.lblMyScore.string = l.crossProxy.mykualoveRid.score + "";
            }
        };    
        e.prototype.onMyKuaGongDou = function() {
            if (null != l.crossProxy.mykuagongdouRid && "1" == this.tabIndex) {
                var t =
                    null != l.crossProxy.mykuagongdouRid.rid
                        ? l.crossProxy.mykuagongdouRid.rid
                        : 0;
                this.lblMyRank.string =
                    t <= 0 ? i18n.t("RAKN_UNRANK") : t.toString();
                l.loginProxy.getServer(l.crossProxy.mykuagongdouRid.serv);
                this.lblMyName.string = l.crossProxy.mykuagongdouRid.name;
                this.lblMyScore.string = l.crossProxy.mykuagongdouRid.score + "";
            }
        };
    

        e.prototype.onMyKuaQuFu = function() {
            if (null != l.crossProxy.mykuaquRid && "2" == this.tabIndex) {
                var t =
                    null != l.crossProxy.mykuaquRid.rid
                        ? l.crossProxy.mykuaquRid.rid
                        : 0;
                this.lblMyRank.string =
                    t <= 0 ? i18n.t("RAKN_UNRANK") : t.toString();
                var e = l.loginProxy.getServer(l.crossProxy.mykuaquRid.serv);
                this.lblMyName.string = e ? e.name : "";
                this.lblMyScore.string =
                    null != l.crossProxy.mykuaquRid.score
                        ? l.crossProxy.mykuaquRid.score + ""
                        : "0";
            }
        };
        e.prototype.onMyKuaQuFuLove = function() {
            if (null != l.crossProxy.mykuaquloveRid && "2" == this.tabIndex) {
                var t =
                    null != l.crossProxy.mykuaquloveRid.rid
                        ? l.crossProxy.mykuaquloveRid.rid
                        : 0;
                this.lblMyRank.string =
                    t <= 0 ? i18n.t("RAKN_UNRANK") : t.toString();
                var e = l.loginProxy.getServer(
                    l.crossProxy.mykuaquloveRid.serv
                );
                this.lblMyName.string = e ? e.name : "";
                this.lblMyScore.string =
                    null != l.crossProxy.mykuaquloveRid.score
                        ? l.crossProxy.mykuaquloveRid.score + ""
                        : "0";
            }
        };
        e.prototype.onMyKuaQuFuGongDou = function() {
            if (null != l.crossProxy.mykuaqugongdouRid && "2" == this.tabIndex) {
                var t =
                    null != l.crossProxy.mykuaqugongdouRid.rid
                        ? l.crossProxy.mykuaqugongdouRid.rid
                        : 0;
                this.lblMyRank.string =
                    t <= 0 ? i18n.t("RAKN_UNRANK") : t.toString();
                var e = l.loginProxy.getServer(
                    l.crossProxy.mykuaqugongdouRid.serv
                );
                this.lblMyName.string = e ? e.name : "";
                this.lblMyScore.string =
                    null != l.crossProxy.mykuaqugongdouRid.score
                        ? l.crossProxy.mykuaqugongdouRid.score + ""
                        : "0";
            }
        };

        e.prototype.onUserList = function() {
            if (l.crossProxy.userlist) {
                this.list.data = l.crossProxy.userlist;
                this.list.resetScroll();
            }
        };
        e.prototype.onUserLoveList = function() {
            if(this.tabIndex != 1)
            {
                return;
            }
            if (l.crossProxy.userlovelist) {
                this.list.data = l.crossProxy.userlovelist;
                this.list.resetScroll();
            }
        };
        e.prototype.onUserGongDouList = function() {
            if(this.tabIndex != 1)
            {
                return;
            }
            if (l.crossProxy.usergongdoulist) {
                this.list.data = l.crossProxy.usergongdoulist;
                this.list.resetScroll();
            }
        };

        e.prototype.onQuFuList = function() {
            if (l.crossProxy.qufulist) {
                this.list.data = l.crossProxy.qufulist;
                this.list.resetScroll();
            }
        };
        e.prototype.onQuFuLoveList = function() {
            if(this.tabIndex != 2)
            {
                return;
            }
            if (l.crossProxy.qufulovelist) {
                this.list.data = l.crossProxy.qufulovelist;
                this.list.resetScroll();
            }
        };
        e.prototype.onQuFuGongDouList = function() {
            if(this.tabIndex != 2)
            {
                return;
            }
            if (l.crossProxy.qufugongdoulist) {
                this.list.data = l.crossProxy.qufugongdoulist;
                this.list.resetScroll();
            }
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
                        l.crossProxy.sendUserRank(this.curActivityId);
                    this.lblName.string = i18n.t("RANK_NAME_TIP");
                    this.setTab(e);
                    // this.ranktype =
                    //     this.curActivityId == l.limitActivityProxy.KUA_SHILI_ID
                    //         ? l.crossProxy.KUA_USER_TYPE
                    //         : l.crossProxy.KUA_LOVE_USER_TYPE;
                    this.rankNode.active = 1 == this.comein;
                    this.norankNode.active = !this.rankNode.active;
                    
                    // this.curActivityId == l.limitActivityProxy.KUA_SHILI_ID
                    //     ? this.onMyKuaShiLi()
                    //     : this.curActivityId ==
                    //           l.limitActivityProxy.KUA_LOV_ID &&
                    //       this.onMyKuaLove();
                    if(this.curActivityId == l.limitActivityProxy.KUA_SHILI_ID){
                        this.ranktype =  l.crossProxy.KUA_USER_TYPE;
                        this.onMyKuaShiLi()
                    }
                    else if(this.curActivityId == l.limitActivityProxy.KUA_LOV_ID){
                        this.ranktype =  l.crossProxy.KUA_LOVE_USER_TYPE;
                        this.onMyKuaLove();
                    }
                    else  if(this.curActivityId == l.limitActivityProxy.KUA_GONGDOU_ID){
                        this.ranktype =  l.crossProxy.KUA_GONGDOU_USER_TYPE;
                        this.onMyKuaGongDou();
                    }

                    break;

                case "2":
                    this.curActivityId > 0 &&
                        l.crossProxy.sendQuRank(this.curActivityId);
                    this.lblName.string = i18n.t("CROSS_SERVER");
                    // this.ranktype =
                    //     this.curActivityId == l.limitActivityProxy.KUA_SHILI_ID
                    //         ? l.crossProxy.KUA_QU_TYPE
                    //         : l.crossProxy.KUA_LOVE_QU_TYPE;
                    this.setTab(e);
                    this.norankNode.active = !1;
                    this.rankNode.active = !0;
                    // this.curActivityId == l.limitActivityProxy.KUA_SHILI_ID
                    //     ? this.onMyKuaQuFu()
                    //     : this.curActivityId ==
                    //           l.limitActivityProxy.KUA_LOV_ID &&
                    //       this.onMyKuaQuFuLove();
                    if(this.curActivityId == l.limitActivityProxy.KUA_SHILI_ID){
                        this.ranktype = l.crossProxy.KUA_QU_TYPE;
                        this.onMyKuaQuFu()
                    }
                    else if(this.curActivityId == l.limitActivityProxy.KUA_LOV_ID){
                        this.ranktype = l.crossProxy.KUA_LOVE_QU_TYPE;
                        this.onMyKuaQuFuLove();
                    }
                    else  if(this.curActivityId == l.limitActivityProxy.KUA_GONGDOU_ID){
                        this.ranktype = l.crossProxy.KUA_GONGDOU_QU_TYPE;
                        this.onMyKuaQuFuGongDou();
                    }
            }
        };
        e.prototype.onRank = function() {
            this.curActivityId = parseInt(this.node.openParam.id);
            this.ranktype =
                null != this.node.openParam.type
                    ? parseInt(this.node.openParam.type)
                    : 0;
            this.comein = parseInt(this.node.openParam.comein);
            var t =
                null != this.node.openParam.isShow
                    ? parseInt(this.node.openParam.isShow)
                    : 0;
            this.tab.active = 1 == t;
            this.tabIndex =
                this.ranktype == l.crossProxy.KUA_QU_TYPE ||
                this.ranktype == l.crossProxy.KUA_LOVE_QU_TYPE ||
                this.ranktype == l.crossProxy.KUA_GONGDOU_QU_TYPE
                    ? "2"
                    : "1";
            if (this.curActivityId == l.limitActivityProxy.KUA_SHILI_ID) {
                this.lblContent.string = i18n.t("RANK_SHI_LI_ZHANG_FU");
                this.onClickTab(null, this.tabIndex);
            } else if (this.curActivityId == l.limitActivityProxy.KUA_LOV_ID) {
                this.lblContent.string = i18n.t("CROSS_QINMI");
                this.onClickTab(null, this.tabIndex);
            }
            else if (this.curActivityId == l.limitActivityProxy.KUA_GONGDOU_ID) {
                this.lblContent.string = i18n.t("CROSS_RANK_ARENA");
                this.onClickTab(null, this.tabIndex);
            }
        };
        e.prototype.onClickClose = function() {
            n.utils.closeView(this);
        };
        e.prototype.onTimer = function() {
            var t = n.timeUtil.second - l.rankProxy.lastTime;
            t >= 60 && (this.btnRe.interactable = !0);
            this.btnRe.interactable = t >= 60;
            this.lblRe.string =
                t >= 60
                    ? i18n.t("COMMON_REFRESH")
                    : i18n.t("FLOWER_SHENG_YU_SHI_JIAN", {
                          num: 60 - t
                      });
            var e = l.limitActivityProxy.getActivityData(this.curActivityId);
            (!!e &&
                (n.timeUtil.second >= e.sTime &&
                    n.timeUtil.second <= e.eTime)) ||
                (this.btnRe.node.active = !1);
        };
        e.prototype.onClickRe = function() {
            0 != this.ranktype && l.rankProxy.sendRefresh(this.ranktype);
        };
        __decorate([s(i.default)], e.prototype, "list", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblContent", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([s(cc.Button)], e.prototype, "btnRe", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblRe", void 0);
        __decorate([s(cc.Node)], e.prototype, "tab", void 0);
        __decorate([s([cc.Button])], e.prototype, "tabs", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblMyRank", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblMyName", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblMyScore", void 0);
        __decorate([s(cc.Node)], e.prototype, "rankNode", void 0);
        __decorate([s(cc.Node)], e.prototype, "norankNode", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;
