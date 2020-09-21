var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("./RankCommonItem"),
    l = require("../../utils/Utils"),
    r = require("../../component/RoleSpine"),
    a = require("../../Initializer"),
    s = require("../../component/UrlLoad"),
    c = require("../../utils/UIUtils"),
    _ = require("../chenghao/ChengHaoItem"),
    d = require("../../Config"),
    u = require("../../models/TimeProxy"),
    p = cc._decorator,
    h = p.ccclass,
    y = p.property,
    f = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.list = null;
            e.lblrank = null;
            e.lblcontent = null;
            e.rankArr = [];
            e.role = null;
            e.lblTip = null;
            e.lblname = null;
            e.wsb = null;
            e.bgUrl = null;
            e.lblNoChenghao = null;
            e.chengHao = null;
            return e;
        }
        e.prototype.onLoad = function () {
            this.updateShow();
            facade.subscribe("UI_TOUCH_MOVE_LEFT", this.onClickClose, this);
        };
        e.prototype.updateShow = function () {
            var t = this.node.openParam;
            a.rankProxy.rankType = t.rankType;
            var e = t.list;
            e.sort(a.rankProxy.sortRankList);
            for (var o = [], i = [], n = 0; n < e.length; n++)
                n < 3 ? i.push(e[n]) : o.push(e[n]);
            this.list.data = o;
            var l = t.mine;
            this.lblrank.string = l.rank + "";
            this.lblrank.node.active = l.rank > 0;
            this.wsb.node.active = l.rank <= 0;
            this.lblname.string = a.playerProxy.userData.name;
            if (
                d.Config.isShowChengHao &&
                u.funUtils.isOpenFun(u.funUtils.chenghao)
            ) {
                var r = localcache.getItem(
                    localdb.table_fashion,
                    a.playerProxy.userData.chenghao
                );
                this.chengHao.data = r;
                this.lblNoChenghao.active = !r;
            }
            this.updateRankLbl(l);
            this.list.selectHandle = function (t) {
                var e = t;
                a.playerProxy.sendGetOther(e.uid);
            };
            for (var s = 0; s < this.rankArr.length; s++)
                this.rankArr[s].data = i[s];
            this.onClickRender(null, this.rankArr[0]);
        };
        e.prototype.updateRankLbl = function (t) {
            switch (a.rankProxy.rankType) {
                case a.rankProxy.JIU_LOU_RANK:
                    this.lblTip.string = i18n.t("JIU_LOU_RANK_TIP");
                    this.lblcontent.string =
                        i18n.t("JIULOU_FEN_SHU") + " " + t.value;
                    break;

                case a.rankProxy.BOSS_SCORE_RANK:
                    this.lblTip.string = i18n.t("BOSS_RANK_JI_FEN_TIP");
                    this.lblcontent.string =
                        i18n.t("BOSS_JI_FEN_TXT") + " " + t.value;
                    break;

                case a.rankProxy.BOSS_HURT_RANK:
                    this.lblTip.string = i18n.t("BOSS_RANK_HAN_GAN_TIP");
                    this.lblcontent.string =
                        i18n.t("BOSS_XIAN_LI_TXT") + t.value;
                    break;

                case a.rankProxy.TREASURE_RANK:
                    this.lblTip.string = i18n.t("TREASURE_RANK");
                    this.lblcontent.string = i18n.t("TREASURE_RANK_SCORE", {
                        v: t.value
                    });
                    break;

                case a.rankProxy.TREASURE_TIDY_RANK:
                    this.lblTip.string = i18n.t("TREASURE_TIDY_RANK");
                    this.lblcontent.string = i18n.t(
                        "TREASURE_RANK_TIDY_SCORE", {
                            v: t.value
                        }
                    );
                    break;

                case a.rankProxy.CLOTHE_RANK:
                    this.lblTip.string = i18n.t("USER_CLOTHE_RANK");
                    this.lblcontent.string = i18n.t("USER_CLOTHE_SCORE", {
                        v: t.value
                    });
                    break;

                case a.rankProxy.DALISI_RANK:
                    this.lblTip.string = i18n.t("DALISI_RANK_TIP");
                    this.lblcontent.string = i18n.t("DALISI_RANK_SCROE", {
                        v: t.value
                    });
                    break;

                case a.rankProxy.CLOTHE_PVE_RANK:
                    this.lblTip.string = i18n.t("CLOTHE_PVE_RANK");
                    this.lblcontent.string = i18n.t("CLOTHE_PVE_RANK_SCROE", {
                        v: t.value
                    });
                    break;

                case a.rankProxy.CLOTHE_PVP_RANK:
                    this.lblTip.string = i18n.t("CLOTHE_PVP_RANK");
                    this.lblcontent.string = i18n.t("CLOTHE_PVP_RANK_SCROE", {
                        v: t.value
                    });
                    break;

                case a.rankProxy.FLOWER_RANK:
                    this.lblTip.string = i18n.t("FLOWER_RANK_TIP");
                    this.lblcontent.string = i18n.t("FLOWER_RANK_NAME", {
                        d: t.value
                    });
                    break;
                case a.rankProxy.FLOWER_FRIEND_RANK:
                    this.lblTip.string = i18n.t("FLOWER_FRIEND_RANK_TIP");
                    this.lblcontent.string = i18n.t("FLOWER_FRIEND_RANK_NAME", {
                        d: t.value
                    });
                    break;

                case a.rankProxy.FLOWER_RANK_TREE:
                    this.lblTip.string = i18n.t("FLOWER_RANK_TREE_TIP");
                    this.lblcontent.string = i18n.t("FLOWER_RANK_TREE_NAME", {
                        d: t.value
                    });
                    break;

                case a.rankProxy.ACTBOSS_RANK:
                    this.lblTip.string = i18n.t("ACTBOSS_RANK_RANK");
                    this.lblcontent.string = i18n.t("ACTBOSS_RANK_SCROE", {
                        d: t.value
                    });
            }
        };
        e.prototype.onClickRender = function (t, e) {
            var o = e.data;
            if (null != o) {
                this.role.setClothes(o.sex, o.job, o.level, o.clothe);
                this.bgUrl.node.active = 0 != o.clothe.background;
                if (this.bgUrl.node.active) {
                    var i = localcache.getItem(
                        localdb.table_userClothe,
                        o.clothe.background
                    );
                    i && (this.bgUrl.url = c.uiHelps.getStoryBg(i.model));
                }
            }
        };
        e.prototype.onClickClose = function () {
            l.utils.closeView(this);
        };
        __decorate([y(i.default)], e.prototype, "list", void 0);
        __decorate([y(cc.Label)], e.prototype, "lblrank", void 0);
        __decorate([y(cc.Label)], e.prototype, "lblcontent", void 0);
        __decorate([y([n.default])], e.prototype, "rankArr", void 0);
        __decorate([y(r.default)], e.prototype, "role", void 0);
        __decorate([y(cc.Label)], e.prototype, "lblTip", void 0);
        __decorate([y(cc.Label)], e.prototype, "lblname", void 0);
        __decorate([y(cc.Label)], e.prototype, "wsb", void 0);
        __decorate([y(s.default)], e.prototype, "bgUrl", void 0);
        __decorate([y(cc.Node)], e.prototype, "lblNoChenghao", void 0);
        __decorate([y(_.default)], e.prototype, "chengHao", void 0);
        return (e = __decorate([h], e));
    })(cc.Component);
o.default = f;