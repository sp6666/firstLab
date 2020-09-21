var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = require("../../component/List"),
    l = require("../../Initializer"),
    r = require("../../component/RoleSpine"),
    a = require("./RankItem"),
    s = require("../../component/UrlLoad"),
    c = require("../../utils/UIUtils"),
    _ = require("../chenghao/ChengHaoItem"),
    d = require("../../Config"),
    u = require("../../models/TimeProxy"),
    p = cc._decorator,
    h = p.ccclass,
    y = p.property,
    f = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.list = null;
            e.lblContext = null;
            e.btns = [];
            e.lblRank = null;
            e.lblContent = null;
            e.nodeMobai = null;
            e.nodeMobaied = null;
            e.role = null;
            e.rankArr = [];
            e.lblName = null;
            e.lblShiLi = null;
            e.lblLv = null;
            e.bgUrl = null;
            e.redShili = null;
            e.redGuanka = null;
            e.redQinmi = null;
            e.btnRe = null;
            e.lblRe = null;
            e.lblNoChenghao = null;
            e.chengHao = null;
            e.flag = !1;
            e.curIndex = 1;
            e.curList = null;
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe(
                l.rankProxy.UPDATE_RANK_SELF_RID,
                this.updateCurShow,
                this
            );
            facade.subscribe(
                l.rankProxy.UPDATE_RANK_MOBAI,
                this.updateMobai,
                this
            );
            facade.subscribe(
                l.rankProxy.UPDATE_RANK_GUAN_KA,
                this.updateShowGuanKa,
                this
            );
            facade.subscribe(
                l.rankProxy.UPDATE_RANK_LOVE,
                this.updateShowLove,
                this
            );
            facade.subscribe(
                l.rankProxy.UPDATE_RANK_SHILI,
                this.updateShowShili,
                this
            );
            facade.subscribe("UI_TOUCH_MOVE_LEFT", this.onClickClost, this);
            this.list.selectHandle = function(t) {
                var e = t;
                l.playerProxy.sendGetOther(e.uid);
            };
            this.onClickTab(null, 1);
            this.updateMobai();
            this.onTimer();
            this.schedule(this.onTimer, 1);
        };
        e.prototype.updateShowShili = function() {
            if (null != l.rankProxy.shili) {
                var t = l.rankProxy.shili.slice(3, l.rankProxy.shili.length);
                this.list.data = t;
                l.playerProxy.userEp;
                this.onSetPanelData(l.rankProxy.shili);
            }
        };
        e.prototype.updateShowGuanKa = function() {
            if (null != l.rankProxy.guanKa) {
                l.rankProxy.isShowGuanKa = !0;
                var t = l.rankProxy.guanKa.slice(3, l.rankProxy.guanKa.length);
                this.list.data = t;
                this.lblContent.string = l.rankProxy.getGuankaString(
                    l.playerProxy.userData.smap
                );
                this.onSetPanelData(l.rankProxy.guanKa);
            }
        };
        e.prototype.sortGuanQia = function(t, e) {
            return e.num - t.num;
        };
        e.prototype.updateShowLove = function() {
            if (null != l.rankProxy.love) {
                var t = l.rankProxy.love.slice(3, l.rankProxy.love.length);
                this.list.data = t;
                this.lblContent.string =
                    i18n.t("RANK_TIP_3") +
                    " " +
                    i.utils.formatMoney(l.wifeProxy.base.allLove);
                this.onSetPanelData(l.rankProxy.love);
            }
        };
        e.prototype.updateMobai = function() {
            var t = 0;
            switch (this.curIndex) {
                case 1:
                    t = l.rankProxy.mobai.shili;
                    break;

                case 2:
                    t = l.rankProxy.mobai.guanka;
                    break;

                case 3:
                    t = l.rankProxy.mobai.love;
            }
            this.nodeMobai.active = 0 == t;
            this.nodeMobaied.active = 0 != t;
            this.redShili.active = 0 == l.rankProxy.mobai.shili;
            this.redGuanka.active = 0 == l.rankProxy.mobai.guanka;
            this.redQinmi.active = 0 == l.rankProxy.mobai.love;
        };
        e.prototype.updateCurShow = function() {
            if (1 == l.rankProxy.showRankType) {
                var t = l.rankProxy.selfRid ? l.rankProxy.selfRid.shili : 0;
                this.lblRank.string = 0 == t ? i18n.t("RAKN_UNRANK") : t + "";
            } else if (2 == l.rankProxy.showRankType) {
                t = l.rankProxy.selfRid ? l.rankProxy.selfRid.guanka : 0;
                this.lblRank.string = 0 == t ? i18n.t("RAKN_UNRANK") : t + "";
            } else if (3 == l.rankProxy.showRankType) {
                t = l.rankProxy.selfRid ? l.rankProxy.selfRid.love : 0;
                this.lblRank.string = 0 == t ? i18n.t("RAKN_UNRANK") : t + "";
            }
        };
        e.prototype.onClickTab = function(t, e) {
            this.flag = !1;
            var o = parseInt(e);
            this.curIndex = o;
            for (var i = 0; i < this.btns.length; i++)
                this.btns[i].interactable = i != o - 1;
            this.lblContext.string = i18n.t("RANK_TIP_" + o);
            l.rankProxy.isShowGuanKa = !1;
            l.rankProxy.showRankType = o;
            switch (o) {
                case 1:
                    l.rankProxy.sendRank(1);
                    break;

                case 2:
                    l.rankProxy.sendRank(2);
                    break;

                case 3:
                    l.rankProxy.sendRank(3);
            }
            this.updateMobai();
        };
        e.prototype.onClickMobai = function() {
            l.rankProxy.sendMoBai(this.curIndex);
        };
        e.prototype.onClickClost = function() {
            i.utils.closeView(this, !0);
        };
        e.prototype.onSetPanelData = function(t) {
            this.curList = t;
            this.lblName.string = l.playerProxy.userData.name;
            var e =
                    l.playerProxy.userEp.e1 +
                    l.playerProxy.userEp.e2 +
                    l.playerProxy.userEp.e3 +
                    l.playerProxy.userEp.e4,
                o = localcache.getItem(
                    localdb.table_officer,
                    l.playerProxy.userData.level
                );
            this.lblLv.string = o.name;
            if (
                d.Config.isShowChengHao &&
                u.funUtils.isOpenFun(u.funUtils.chenghao)
            ) {
                var n = localcache.getItem(
                    localdb.table_fashion,
                    l.playerProxy.userData.chenghao
                );
                this.chengHao.data = n;
                this.lblNoChenghao.active = !n;
            }
            if (1 == l.rankProxy.showRankType)
                this.lblShiLi.string = i18n.t("MAIN_SHILI", {
                    d: i.utils.formatMoney(e)
                });
            else if (2 == l.rankProxy.showRankType)
                this.lblShiLi.string = l.rankProxy.getGuankaString(
                    l.playerProxy.userData.smap
                );
            else if (3 == l.rankProxy.showRankType) {
                for (var r = 0, a = 0; a < l.wifeProxy.wifeList.length; a++)
                    r += l.wifeProxy.wifeList[a].love;
                this.lblShiLi.string =
                    i18n.t("RANK_TIP_3") + "：" + i.utils.formatMoney(r);
            }
            this.onClickRender(null, "0");
        };
        e.prototype.onClickRender = function(t, e) {
            for (
                var o = this.curList.slice(0, 3), i = 0;
                i < this.rankArr.length;
                i++
            )
                i < o.length && (this.rankArr[i].data = o[i]);
            var n = o[parseInt(e)];
            this.role.setClothes(n.sex, n.job, n.level, n.clothe);
            this.bgUrl.node.active = 0 != n.clothe.background;
            if (this.bgUrl.node.active) {
                var l = localcache.getItem(
                    localdb.table_userClothe,
                    n.clothe.background
                );
                l && (this.bgUrl.url = c.uiHelps.getStoryBg(l.model));
            }
        };
        e.prototype.onClickRe = function() {
            l.rankProxy.sendRefresh(this.curIndex);
        };
        e.prototype.onTimer = function() {
            var t = i.timeUtil.second - l.rankProxy.lastTime;
            t >= 60 && (this.btnRe.interactable = !0);
            this.btnRe.interactable = t >= 60;
            this.lblRe.string =
                t >= 60
                    ? i18n.t("COMMON_REFRESH")
                    : i18n.t("FLOWER_SHENG_YU_SHI_JIAN", {
                          num: 60 - t
                      });
        };
        __decorate([y(n.default)], e.prototype, "list", void 0);
        __decorate([y(cc.Label)], e.prototype, "lblContext", void 0);
        __decorate([y([cc.Button])], e.prototype, "btns", void 0);
        __decorate([y(cc.Label)], e.prototype, "lblRank", void 0);
        __decorate([y(cc.Label)], e.prototype, "lblContent", void 0);
        __decorate([y(cc.Node)], e.prototype, "nodeMobai", void 0);
        __decorate([y(cc.Node)], e.prototype, "nodeMobaied", void 0);
        __decorate([y(r.default)], e.prototype, "role", void 0);
        __decorate([y([a.default])], e.prototype, "rankArr", void 0);
        __decorate([y(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([y(cc.Label)], e.prototype, "lblShiLi", void 0);
        __decorate([y(cc.Label)], e.prototype, "lblLv", void 0);
        __decorate([y(s.default)], e.prototype, "bgUrl", void 0);
        __decorate([y(cc.Node)], e.prototype, "redShili", void 0);
        __decorate([y(cc.Node)], e.prototype, "redGuanka", void 0);
        __decorate([y(cc.Node)], e.prototype, "redQinmi", void 0);
        __decorate([y(cc.Button)], e.prototype, "btnRe", void 0);
        __decorate([y(cc.Label)], e.prototype, "lblRe", void 0);
        __decorate([y(cc.Node)], e.prototype, "lblNoChenghao", void 0);
        __decorate([y(_.default)], e.prototype, "chengHao", void 0);
        return (e = __decorate([h], e));
    })(cc.Component);
o.default = f;
