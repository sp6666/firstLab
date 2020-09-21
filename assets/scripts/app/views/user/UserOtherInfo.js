var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RoleSpine"),
    n = require("../../utils/Utils"),
    l = require("../../Initializer"),
    r = require("../../component/UrlLoad"),
    a = require("../../utils/UIUtils"),
    s = require("../../models/TimeProxy"),
    c = require("../chenghao/ChengHaoItem"),
    _ = require("../../Config"),
    d = require("../../component/ConfirmView"),
    u = require("../../utils/ShaderUtils"),
    init = require("../../Initializer"),
    p = cc._decorator,
    h = p.ccclass,
    y = p.property,
    f = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblOffice = null;
            e.lblId = null;
            e.lblName = null;
            e.lblShili = null;
            e.lblWuli = null;
            e.lblZhili = null;
            e.lblZhengzhi = null;
            e.lblMeili = null;
            e.lblGuild = null;
            e.roleSpine = null;
            e.bgUrl = null;
            e.btnYh = null;
            e.chenghao = null;
            e.wuNode = null;
            e.chenghaoparentNode = null;
            e.btnAddBlackNode = null;
            e.btnDelBlackNode = null;
            e.btnDelBlackBg = null;
            //好友
            e.nodeHaoYou = null;
            e.btnTianJiaNode = null;
            e.btnPingbiNode = null;
            //end 好友
            return e;
        }
        e.prototype.onLoad = function () {
            facade.subscribe("JIU_LOU_INFO_BACK", this.onJiulouInfo, this);
            facade.subscribe(l.chatProxy.ADD_BLACK_OK, this.onHaoyouUpdate, this);
            facade.subscribe(l.haoyouProxy.ON_FRIEND_APPLY_SUCCESS, this.onHaoyouUpdate, this);
            facade.subscribe(
                l.chatProxy.UPDATE_BLACK_MSG,
                this.onBlackUpdate,
                this
            );
            this.chenghaoparentNode.active =
                _.Config.isShowChengHao &&
                s.funUtils.isOpenFun(s.funUtils.chenghao);
            var t = l.playerProxy.fuser;
            if (
                _.Config.isShowChengHao &&
                s.funUtils.isOpenFun(s.funUtils.chenghao)
            ) {
                this.chenghaoparentNode.active = !0;
                if (t) {
                    var e = localcache.getItem(
                        localdb.table_fashion,
                        t.chenghao
                    );
                    this.chenghao.data = e;
                    this.wuNode.active = !e;
                } else {
                    this.chenghao.data = null;
                    this.wuNode.active = !0;
                }
            } else this.chenghaoparentNode.active = !1;
            this.lblGuild.string = t && t.clubname ? t.clubname : "   ——";
            if (null != l.playerProxy.fuser) {
                this.onBlackUpdate();
                u.shaderUtils.setImageGray(this.btnDelBlackBg);
                var o = localcache.getItem(localdb.table_officer, t.level);
                this.lblId.string = t.id + "";
                this.lblName.string = t.name;
                this.lblShili.string =
                    t.ep.e1 + t.ep.e2 + t.ep.e3 + t.ep.e4 + "";
                this.lblOffice.string = o ? o.name : "";
                this.lblMeili.string = t.ep.e4 + "";
                this.lblWuli.string = t.ep.e1 + "";
                this.lblZhili.string = t.ep.e2 + "";
                this.lblZhengzhi.string = t.ep.e3 + "";
                this.roleSpine.setClothes(t.sex, t.job, t.level, t.clothe);
                this.bgUrl.node.active = 0 != t.clothe.background;
                if (this.bgUrl.node.active) {
                    var i = localcache.getItem(
                        localdb.table_userClothe,
                        t.clothe.background
                    );
                    i && (this.bgUrl.url = a.uiHelps.getStoryBg(i.model));
                }
                this.btnYh.active =
                    l.playerProxy.userData.uid != t.id &&
                    s.funUtils.isOpenFun(s.funUtils.jiulouView);

                //好友
                this.onHaoyouUpdate();
                //end 好友
            }
        };
        e.prototype.onBlackUpdate = function () {
            //暂时关闭黑名单
            return;

            if (
                null != l.playerProxy.fuser &&
                l.playerProxy.fuser.id != l.playerProxy.userData.uid
            ) {
                this.btnDelBlackNode.active = l.chatProxy.isBlack(
                    l.playerProxy.fuser.id
                );
                this.btnAddBlackNode.active = !this.btnDelBlackNode.active;
            }
        };
        e.prototype.onClickClost = function () {
            n.utils.closeView(this);
        };
        e.prototype.onAddBlack = function () {
            var t = l.playerProxy.fuser;
            if (null != t) {
                var e = i18n.t("CHAT_BLACK_ADD", {
                    name: t.name
                });
                n.utils.showConfirm(i18n.t(e), function (e) {
                    e != d.default.NO && l.chatProxy.sendAddBlack(t.id);
                });
            }
        };
        e.prototype.onDelBlack = function () {
            var t = l.playerProxy.fuser;
            if (null != t) {
                var e = i18n.t("CHAT_BLACK_DEL", {
                    name: t.name
                });
                n.utils.showConfirm(i18n.t(e), function (e) {
                    e != d.default.NO && l.chatProxy.sendDelBlack(t.id);
                });
            }
        };
        e.prototype.onClickYanhui = function () {
            l.jiulouProxy.sendJlInfo();
        };
        e.prototype.onJiulouInfo = function () {
            if (null == l.jiulouProxy.getYhData(l.playerProxy.fuser.id))
                n.alertUtil.alert18n("JIU_LOU_MEI_YOU_JU_BAN");
            else {
                l.jiulouProxy.selectData = l.jiulouProxy.getYhData(
                    l.playerProxy.fuser.id
                );
                l.jiulouProxy.sendYhGo(l.playerProxy.fuser.id);
            }
        };
        e.prototype.onHaoyouUpdate = function () {
            //自己不显示
            this.nodeHaoYou.active = l.playerProxy.fuser.id != l.playerProxy.userData.uid;

            //添加好友按钮
            var isFriend = l.haoyouProxy.isFriend(l.playerProxy.fuser.id);
            this.btnTianJiaNode.active = !isFriend;

            //屏蔽按钮
            var isBlack = l.chatProxy.isBlack(l.playerProxy.fuser.id);
            this.btnPingbiNode.active = !isBlack;
            //end 好友
        };
        //好友
        e.prototype.onClickPingbi = function () {
            //添加黑名单
            n.utils.showConfirm(i18n.t("HAOYOU_JIARU_CONFIRM", {
                name: l.playerProxy.fuser.name
            }), function () {
                init.chatProxy.sendAddBlackOther(l.playerProxy.fuser.id);
            })
        };
        e.prototype.onClickTianjia = function () {
            //添加好友
            init.haoyouProxy.sendFApplay(l.playerProxy.fuser.id);
        };

        e.prototype.onClickInvestInUnion = function () {
            //邀请入会
            init.unionProxy.sendInvestFriend(l.playerProxy.fuser.id);
        };
        //end 好友

        __decorate([y(cc.Label)], e.prototype, "lblOffice", void 0);
        __decorate([y(cc.Label)], e.prototype, "lblId", void 0);
        __decorate([y(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([y(cc.Label)], e.prototype, "lblShili", void 0);
        __decorate([y(cc.Label)], e.prototype, "lblWuli", void 0);
        __decorate([y(cc.Label)], e.prototype, "lblZhili", void 0);
        __decorate([y(cc.Label)], e.prototype, "lblZhengzhi", void 0);
        __decorate([y(cc.Label)], e.prototype, "lblMeili", void 0);
        __decorate([y(cc.Label)], e.prototype, "lblGuild", void 0);
        __decorate([y(i.default)], e.prototype, "roleSpine", void 0);
        __decorate([y(r.default)], e.prototype, "bgUrl", void 0);
        __decorate([y(cc.Node)], e.prototype, "btnYh", void 0);
        __decorate([y(c.default)], e.prototype, "chenghao", void 0);
        __decorate([y(cc.Node)], e.prototype, "wuNode", void 0);
        __decorate([y(cc.Node)], e.prototype, "chenghaoparentNode", void 0);
        __decorate([y(cc.Node)], e.prototype, "btnAddBlackNode", void 0);
        __decorate([y(cc.Node)], e.prototype, "btnDelBlackNode", void 0);
        __decorate([y(cc.Sprite)], e.prototype, "btnDelBlackBg", void 0);
        //好友
        __decorate([y(cc.Node)], e.prototype, "nodeHaoYou", void 0);
        __decorate([y(cc.Node)], e.prototype, "btnTianJiaNode", void 0);
        __decorate([y(cc.Node)], e.prototype, "btnPingbiNode", void 0);
        //end 好友
        return (e = __decorate([h], e));
    })(cc.Component);
o.default = f;