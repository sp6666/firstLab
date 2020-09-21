var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("../../Initializer"),
    l = require("../../utils/Utils"),
    r = require("../../utils/UIUtils"),
    a = require("../chenghao/ChengHaoItem"),
    s = require("../../models/BagProxy"),
    timeP = require("../../models/TimeProxy"),
    c = cc._decorator,
    _ = c.ccclass,
    d = c.property,
    u = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.list = null;
            e.lblTitle = null;
            e.lbldate = null;
            e.lblcd = null;
            e.lblMyRank = null;
            e.lblDes = null;
            e.selectImg = null;
            e.lblTitles = [];
            e.seColor = null;
            e.norColor = null;
            e.lblBtnName = null;
            e.userImg = null;
            e.quImg = null;
            e.btnReward = null;
            e.lblDesNode = null;
            e.btnRewardName = null;
            e.rewardNode = null;
            e.btnRank = null;
            e.chenghao1 = null;
            e.lblNo1 = null;
            e.chenghao2 = null;
            e.lblNo2 = null;
            e.chenghaoShowNode = null;
            e.scroll = null;
            e.scroll2 = null;
            e.list2 = null;
            e.overTime = 0;
            e.hdData = null;
            e.curIndex = 0;
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe(n.crossProxy.CROSS_MY_KUA_SHI_LI, this.onMyKuaShiLi, this);
            facade.subscribe(n.crossProxy.CROSS_MY_KUA_LOVE, this.onMyKuaLove, this);
            facade.subscribe(n.crossProxy.CROSS_MY_KUA_GONGDOU, this.onMyKuaGongDou, this);

            facade.subscribe(n.crossProxy.CROSS_MY_KUA_QU_FU, this.onMyKuaQuFu, this);
            facade.subscribe(n.crossProxy.CROSS_MY_KUA_QU_FU_LOVE, this.onMyKuaQuFuLove, this);
            facade.subscribe(n.crossProxy.CROSS_MY_KUA_QU_FU_GONGDOU, this.onMyKuaQuFuGongDou, this);

            facade.subscribe(n.crossProxy.CROSS_SHI_LI_CFG, this.onShiLiCFG, this);
            facade.subscribe(n.crossProxy.CROSS_LOVE_CFG, this.onShiLiCFG, this);
            facade.subscribe(n.crossProxy.CROSS_GONGDOU_CFG, this.onShiLiCFG, this);

            this.hdData = this.node.openParam;
            this.lblDes.string = i18n.t("AI_LIST_TXT");
            this.onClickTab(null, 1);
        };
        e.prototype.onShowChengHao = function() {
            this.lblNo1.string = i18n.t("AT_LIST_RAND_TXT_2", {
                num: 1
            });
            this.lblNo2.string = i18n.t("AT_LIST_RAND_TXT_1", {
                num1: 2,
                num2: 10
            });
            this.chenghaoShowNode.active = 0 == this.curIndex;
            if (null != this.hdData)
                if (this.chenghaoShowNode.active) {
                    var t = this.getChengHao(this.hdData.rwd, 1),
                        e = localcache.getItem(
                            localdb.table_fashion,
                            t ? t.id : 0
                        );
                    this.chenghao1.data = e;
                    var o = this.getChengHao(this.hdData.rwd, 2),
                        i = localcache.getItem(
                            localdb.table_fashion,
                            o ? o.id : 0
                        );
                    this.chenghao2.data = i;
                    this.rewardNode.y = 0;
                    this.scroll.active = !0;
                    this.scroll2.active = !1;
                } else {
                    this.rewardNode.y = 148;
                    this.scroll.active = !1;
                    this.scroll2.active = !0;
                }
        };
        e.prototype.getChengHao = function(t, e) {
            void 0 === e && (e = 1);
            for (var o = 0; o < t.length; o++) {
                var i = t[o];
                if (null != i && i.rand.rs == e)
                    for (var n = 0; n < i.member.length; n++) {
                        var l = i.member[n];
                        if (l && l.kind == s.DataType.CHENGHAO) return l;
                    }
            }
            return null;
        };
        e.prototype.onShiLiCFG = function() {
            if (
                null != this.hdData &&
                0 != this.curIndex &&
                null != this.hdData.info
            ) {
                var t = n.crossProxy.isGet(this.hdData.info.id);
                if (0 == t) {
                    this.btnRewardName.string = i18n.t("TREASURE_GET_GROUP");
                    this.btnReward.interactable = !1;
                } else if (1 == t) {
                    this.btnRewardName.string = i18n.t("TREASURE_GET_GROUP");
                    this.btnReward.interactable = !0;
                } else if (2 == t) {
                    this.btnRewardName.string = i18n.t("ACT66_HAVE_RECEIVE");
                    this.btnReward.interactable = !1;
                }
            }
        };
        e.prototype.onClickTab = function(t, e) {
            for (var o = parseInt(e) - 1, i = 0; i < this.lblTitles.length; i++)
                this.lblTitles[i].node.color =
                    o == i ? this.seColor : this.norColor;
            this.curIndex = o;
            this.userImg.spriteFrame = 0 == o ? this.selectImg : null;
            this.quImg.spriteFrame = 1 == o ? this.selectImg : null;
            0 == o
                ? n.crossProxy.sendUserRank(this.hdData.info.id)
                : n.crossProxy.sendQuRank(this.hdData.info.id);
            this.btnReward.node.active = 1 == o;
            if (!n.crossProxy.isShow) {
                this.btnReward.node.active = !1;
                this.btnRank.node.active = !1;
            }
            this.lblDesNode.active = 0 == o;
            this.lblBtnName.string =
                0 == o
                    ? i18n.t("CROSS_RANK_PERSONAL_LIST")
                    : i18n.t("CROSS_RANK_SERVER_LIST");
            this.onShiLiCFG();
            this.onDataUpdate(o);
        };

        e.prototype.onMyKuaShiLi = function() {
            if (0 == this.curIndex) {
                var t =
                    n.crossProxy.mykuashiliRid && n.crossProxy.mykuashiliRid.rid
                        ? n.crossProxy.mykuashiliRid.rid
                        : 0;
                this.lblMyRank.string =
                    0 == t ? i18n.t("RAKN_UNRANK") : t.toString();
            }
        };
        e.prototype.onMyKuaLove = function() {
            if (0 == this.curIndex) {
                var t =
                    n.crossProxy.mykualoveRid && n.crossProxy.mykualoveRid.rid
                        ? n.crossProxy.mykualoveRid.rid
                        : 0;
                this.lblMyRank.string =
                    0 == t ? i18n.t("RAKN_UNRANK") : t.toString();
            }
        };
        e.prototype.onMyKuaGongDou = function() {
            if (0 == this.curIndex) {
                var t =
                    n.crossProxy.mykuagongdouRid && n.crossProxy.mykuagongdouRid.rid
                        ? n.crossProxy.mykuagongdouRid.rid
                        : 0;
                this.lblMyRank.string =
                    0 == t ? i18n.t("RAKN_UNRANK") : t.toString();
            }
        };

        e.prototype.onMyKuaQuFu = function() {
            if (1 == this.curIndex) {
                var t =
                    n.crossProxy.mykuaquRid && n.crossProxy.mykuaquRid.rid
                        ? n.crossProxy.mykuaquRid.rid
                        : 0;
                this.lblMyRank.string =
                    0 == t ? i18n.t("RAKN_UNRANK") : t.toString();
            }
        };
        e.prototype.onMyKuaQuFuLove = function() {
            if (1 == this.curIndex) {
                var t =
                    n.crossProxy.mykuaquloveRid &&
                    n.crossProxy.mykuaquloveRid.rid
                        ? n.crossProxy.mykuaquloveRid.rid
                        : 0;
                this.lblMyRank.string =
                    0 == t ? i18n.t("RAKN_UNRANK") : t.toString();
            }
        };
        e.prototype.onMyKuaQuFuGongDou = function() {
            if (1 == this.curIndex) {
                var t =
                    n.crossProxy.mykuaqugongdouRid &&
                    n.crossProxy.mykuaqugongdouRid.rid
                        ? n.crossProxy.mykuaqugongdouRid.rid
                        : 0;
                this.lblMyRank.string =
                    0 == t ? i18n.t("RAKN_UNRANK") : t.toString();
            }
        };

        e.prototype.onDataUpdate = function(t) {
            if (null != this.hdData) {
                this.lblTitle.string = this.hdData.info.title;
                var e,
                    o =
                        0 == t
                            ? this.hdData.rwd[0].member.length
                            : this.hdData.qrwd[0].member.length,
                    i = 10 * (Math.ceil(o / 6) - 1);
                e = 100 * Math.ceil(o / 6) + 70 + i;
                if (1 == t) {
                    this.list2.setWidthHeight(640, e);
                    this.list2.data = this.hdData.qrwd;
                } else {
                    this.list.setWidthHeight(640, e);
                    this.list.data = this.hdData.rwd;
                }
                this.lbldate.string =
                    l.timeUtil.format(this.hdData.info.sTime, "yyyy-MM-dd") +
                    i18n.t("COMMON_ZHI") +
                    l.timeUtil.format(this.hdData.info.eTime, "yyyy-MM-dd");
                this.overTime = this.hdData.info.eTime;
                this.onShowChengHao();
                var n = this;
                r.uiUtils.countDown(
                    this.overTime,
                    this.lblcd,
                    function() {
                        n.lblcd.string = i18n.t("ACTHD_OVERDUE");
                    },
                    !0,
                    "USER_REMAIN_TIME",
                    "d"
                );
            }
        };
        e.prototype.onClickClose = function() {
            l.utils.closeView(this);
        };
        e.prototype.onClickBd = function(t,e) {
            if (null != this.hdData && e==='2') {
                var t = 0;
                var isComein = 0;
                if(this.hdData.info.id == n.limitActivityProxy.KUA_SHILI_ID){
                    if( 0 == this.curIndex){
                        t = n.crossProxy.KUA_USER_TYPE;
                    }
                    else{
                        t = n.crossProxy.KUA_QU_TYPE;
                    }

                    if(!l.stringUtil.isBlank(n.crossProxy.kuashili))
                    {
                        if(!l.stringUtil.isBlank(n.crossProxy.kuashili.comein))
                        {
                            isComein = n.crossProxy.kuashili.comein;
                        }
                    }
                }
                else if(this.hdData.info.id == n.limitActivityProxy.KUA_LOV_ID){
                    if( 0 == this.curIndex){
                        t = n.crossProxy.KUA_LOVE_USER_TYPE;
                    }
                    else{
                        t = n.crossProxy.KUA_LOVE_QU_TYPE;
                    }

                    if(!l.stringUtil.isBlank(n.crossProxy.kualove))
                    {
                        if(!l.stringUtil.isBlank(n.crossProxy.kualove.comein))
                        {
                            isComein = n.crossProxy.kualove.comein;
                        }
                    }
                }
                else  if(this.hdData.info.id == n.limitActivityProxy.KUA_GONGDOU_ID){
                    if( 0 == this.curIndex){
                        t = n.crossProxy.KUA_GONGDOU_USER_TYPE;
                    }
                    else{
                        t = n.crossProxy.KUA_GONGDOU_QU_TYPE;
                    }

                    if(!l.stringUtil.isBlank(n.crossProxy.kuagongdou))
                    {
                        if(!l.stringUtil.isBlank(n.crossProxy.kuagongdou.comein))
                        {
                            isComein = n.crossProxy.kuagongdou.comein;
                        }
                    }
                }

                l.utils.openPrefabView("cross/CrossRankView", null, {
                    id: this.hdData.info.id,
                    isShow: 0,
                    type: t,
                    comein: isComein
                });
            }else{
                if(e==='0'){
                    var id = this.hdData.info.jumpto;
                    if(id){
                        timeP.funUtils.openView(id);
                    }
                }else if(e==='1'){
                    n.shopProxy.openShopBuyItem(this.hdData.info.need);
                }
            }
        };
        e.prototype.onClickReward = function() {
            null != this.hdData && n.crossProxy.sendGet(this.hdData.info.id);
        };
        __decorate([d(i.default)], e.prototype, "list", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblTitle", void 0);
        __decorate([d(cc.Label)], e.prototype, "lbldate", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblcd", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblMyRank", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblDes", void 0);
        __decorate([d(cc.SpriteFrame)], e.prototype, "selectImg", void 0);
        __decorate([d([cc.Label])], e.prototype, "lblTitles", void 0);
        __decorate([d(cc.Color)], e.prototype, "seColor", void 0);
        __decorate([d(cc.Color)], e.prototype, "norColor", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblBtnName", void 0);
        __decorate([d(cc.Sprite)], e.prototype, "userImg", void 0);
        __decorate([d(cc.Sprite)], e.prototype, "quImg", void 0);
        __decorate([d(cc.Button)], e.prototype, "btnReward", void 0);
        __decorate([d(cc.Node)], e.prototype, "lblDesNode", void 0);
        __decorate([d(cc.Label)], e.prototype, "btnRewardName", void 0);
        __decorate([d(cc.Node)], e.prototype, "rewardNode", void 0);
        __decorate([d(cc.Button)], e.prototype, "btnRank", void 0);
        __decorate([d(a.default)], e.prototype, "chenghao1", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblNo1", void 0);
        __decorate([d(a.default)], e.prototype, "chenghao2", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblNo2", void 0);
        __decorate([d(cc.Node)], e.prototype, "chenghaoShowNode", void 0);
        __decorate([d(cc.Node)], e.prototype, "scroll", void 0);
        __decorate([d(cc.Node)], e.prototype, "scroll2", void 0);
        __decorate([d(i.default)], e.prototype, "list2", void 0);
        return (e = __decorate([_], e));
    })(cc.Component);
o.default = u;
