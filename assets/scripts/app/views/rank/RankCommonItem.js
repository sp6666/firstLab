var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../Initializer"),
    l = require("../user/UserHeadItem"),
    r = require("../../models/TimeProxy"),
    a = require("../chenghao/ChengHaoItem"),
    s = require("../../Config"),
    c = cc._decorator,
    _ = c.ccclass,
    d = c.property,
    u = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblName = null;
            e.lblRank = null;
            e.lblContent = null;
            e.headImg = null;
            e.lblshili = null;
            e.btn = null;
            e.lblNoChenghao = null;
            e.chengHao = null;
            return e;
        }
        e.prototype.onLoad = function () {
            this.btn && this.addBtnEvent(this.btn);
        };
        e.prototype.onClickItem = function () {
            var t = this.data;
            t &&
                (t.uid == n.playerProxy.userData.uid ?
                    r.funUtils.openView(r.funUtils.userView.id) :
                    n.playerProxy.sendGetOther(t.uid));
        };
        e.prototype.showData = function () {
            var t = this._data;
            if (t) {
                if (
                    s.Config.isShowChengHao &&
                    r.funUtils.isOpenFun(r.funUtils.chenghao)
                ) {
                    var e = localcache.getItem(
                        localdb.table_fashion,
                        t.chenghao
                    );
                    this.chengHao.data = e;
                    this.lblNoChenghao.active = !e;
                }
                this.lblName.string = t.name;
                this.lblRank.string = t.rid + "";
                this.headImg && this.headImg.setUserHead(t.job, t.headavatar);
                if (this.lblshili) {
                    var o = localcache.getItem(localdb.table_officer, t.level);
                    this.lblshili.string = o ? o.name : "";
                }
                switch (n.rankProxy.rankType) {
                    case n.rankProxy.JIU_LOU_RANK:
                        this.lblContent.string =
                            i18n.t("JIULOU_FEN_SHU") + " " + t.num;
                        break;

                    case n.rankProxy.BOSS_SCORE_RANK:
                        this.lblContent.string =
                            i18n.t("BOSS_JI_FEN_TXT") + t.num;
                        break;

                    case n.rankProxy.BOSS_HURT_RANK:
                        this.lblContent.string =
                            i18n.t("BOSS_XIAN_LI_TXT") + t.num;
                        break;

                    case n.rankProxy.TREASURE_RANK:
                        this.lblContent.string = i18n.t("TREASURE_RANK_SCORE", {
                            v: t.num
                        });
                        break;

                    case n.rankProxy.CLOTHE_RANK:
                        this.lblContent.string = i18n.t("USER_CLOTHE_SCORE", {
                            v: t.num
                        });
                        break;

                    case n.rankProxy.DALISI_RANK:
                        this.lblContent.string = i18n.t("DALISI_RANK_SCROE", {
                            v: t.num
                        });
                        break;

                    case n.rankProxy.TREASURE_TIDY_RANK:
                        this.lblContent.string = i18n.t(
                            "TREASURE_RANK_TIDY_SCORE", {
                                v: t.num
                            }
                        );
                        break;

                    case n.rankProxy.CLOTHE_PVE_RANK:
                        this.lblContent.string = i18n.t(
                            "CLOTHE_PVE_RANK_SCROE", {
                                v: t.num
                            }
                        );
                        break;

                    case n.rankProxy.CLOTHE_PVP_RANK:
                        this.lblContent.string = i18n.t(
                            "CLOTHE_PVP_RANK_SCROE", {
                                v: t.num
                            }
                        );
                        break;

                    case n.rankProxy.FLOWER_RANK:
                        this.lblContent.string = i18n.t("FLOWER_RANK_NAME", {
                            d: t.num
                        });
                        break;
                    case n.rankProxy.FLOWER_FRIEND_RANK:
                        this.lblContent.string = i18n.t("FLOWER_FRIEND_RANK_NAME", {
                            d: t.num
                        });
                        break;

                    case n.rankProxy.FLOWER_RANK_TREE:
                        this.lblContent.string = i18n.t(
                            "FLOWER_RANK_TREE_NAME", {
                                d: t.num
                            }
                        );
                        break;

                    case n.rankProxy.ACTBOSS_RANK:
                        this.lblContent.string = i18n.t("ACTBOSS_RANK_SCROE", {
                            v: t.num
                        });
                }
            }
        };
        __decorate([d(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblRank", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblContent", void 0);
        __decorate([d(l.default)], e.prototype, "headImg", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblshili", void 0);
        __decorate([d(cc.Button)], e.prototype, "btn", void 0);
        __decorate([d(cc.Node)], e.prototype, "lblNoChenghao", void 0);
        __decorate([d(a.default)], e.prototype, "chengHao", void 0);
        return (e = __decorate([_], e));
    })(i.default);
o.default = u;