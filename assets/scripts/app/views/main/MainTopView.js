var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../Initializer"),
    n = require("../../utils/Utils"),
    l = require("../../utils/UIUtils"),
    r = require("../../models/PlayerProxy"),
    a = require("../user/UserHeadItem"),
    s = require("../../models/TimeProxy"),
    c = cc._decorator,
    _ = c.ccclass,
    d = c.property,
    u = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblMoney = null;
            e.lblSolider = null;
            e.lblFood = null;
            e.lblGold = null;
            e.lblPower = null;
            e.nodePaoma = null;
            e.paomaLbl = null;
            e.paomaLbl2 = null;
            e.roleSpine = null;
            e.nodeVip = null;
            e.lblVip = null;
            e.vipBg = null;
            e.lastData = new r.RoleData();
            e.isShowPaoma = !1;
            e.paomaHeight = 0;
            return e;
        }
        e.prototype.onLoad = function () {
            this.update_UserData();
            this.updateEp();
            facade.subscribe(
                i.playerProxy.PLAYER_USER_UPDATE,
                this.update_UserData,
                this
            );
            facade.subscribe(
                i.playerProxy.PLAYER_PAOMA_UPDATE,
                this.onPaoMa,
                this
            );

            facade.subscribe(
                i.playerProxy.PLAYER_UPDATE_HEAD,
                this.updateRoleShow,
                this
            );
            facade.subscribe(
                i.playerProxy.PLAYER_RESET_JOB,
                this.updateRoleShow,
                this
            );
            facade.subscribe(
                i.playerProxy.PLAYER_LEVEL_UPDATE,
                this.updateRoleShow,
                this
            );
            facade.subscribe(
                i.playerProxy.PLAYER_EP_UPDATE,
                this.updateEp,
                this
            );
            facade.subscribe("MAIN_TOP_HIDE_PAO_MA", this.onHidePaoma, this);


            facade.subscribe(
                i.flowerFriendProxy.UPDATE_FLOWER_PAOMA_UPDATE,
                this.onPaoMa,
                this
            );

            l.uiUtils.scaleRepeat(this.vipBg, 1, 1.1);
            this.paomaHeight = this.nodePaoma.height;

            this.onPaoMa();

            //好友
            //拉数据
            facade.subscribe(i.playerProxy.TOP_VIEW_MSG,this.sendTopViewMsg,this);
            this.sendTopViewMsg();
            //end好友

            //友情鲜花
            this.scheduleOnce(this.httpFlower, 1);
            //this.onSendFlowerAdok();
            this.schedule(this.onSendFlowerAdok, 5);
            this.schedule(this.updateJijin,5);
        };
        e.prototype.sendTopViewMsg = function() {
            switch(i.playerProxy.startTopViewMsg)
            {
                case 0:{i.haoyouProxy.sendFriends();        break;} //好友列表
                case 1:{i.chatProxy.sendBlackList();        break;} //黑名单
                case 2:{i.haoyouProxy.sendApplyFriends();   break;} //好友申请列表
                case 3:{i.guanxiProxy.sendRelation();       break;}
            }
        };
        e.prototype.httpFlower = function () {
            //查询种植情况,redDot提示
            i.flowerProxy.sendInfo();
            i.flowerFriendProxy.sendInfo();
        };

        e.prototype.onSendFlowerAdok = function () {
            i.flowerFriendProxy.sendNoticeAdok();
        };

        e.prototype.updateJijin =function (){
            i.jiJinChengZhangProxy.sendJiJinAdok();
        }
        e.prototype.updateRoleShow = function () {
            this.roleSpine.updateUserHead();
        };
        e.prototype.updateEp = function () {
            var t =
                i.playerProxy.userEp.e1 +
                i.playerProxy.userEp.e2 +
                i.playerProxy.userEp.e3 +
                i.playerProxy.userEp.e4;
            l.uiUtils.showNumChange(
                this.lblPower,
                this.lastData.ep,
                t,
                30,
                "MAIN_SHILI",
                "d"
            );
            this.lastData.ep = t;
        };
        e.prototype.update_UserData = function () {
            l.uiUtils.showNumChange(
                this.lblMoney,
                this.lastData.coin,
                Math.floor(i.playerProxy.userData.coin)
            );
            l.uiUtils.showNumChange(
                this.lblFood,
                this.lastData.food,
                Math.floor(i.playerProxy.userData.food)
            );
            l.uiUtils.showNumChange(
                this.lblSolider,
                this.lastData.army,
                Math.floor(i.playerProxy.userData.army)
            );
            l.uiUtils.showNumChange(
                this.lblGold,
                this.lastData.cash,
                Math.floor(i.playerProxy.userData.cash)
            );
            var t = i.playerProxy.userData.level - 1;
            t = t < 1 ? 1 : t;
            this.lastData.coin = i.playerProxy.userData.coin;
            this.lastData.food = i.playerProxy.userData.food;
            this.lastData.army = i.playerProxy.userData.army;
            this.lastData.cash = i.playerProxy.userData.cash;
            this.lblVip.string = i18n.t("COMMON_VIP_NAME", {
                v: 0 != i.playerProxy.userData.vip ?
                    i.playerProxy.userData.vip : ""
            });
        };
        e.prototype.onPaoMa = function () {
            this.paomaMsg = i.playerProxy.paoma;
            if (!this.paomaMsg || this.paomaMsg.length === 0) {
                this.paomaMsg = i.flowerFriendProxy.paoma;
            }

            if (!this.isShowPaoma)
                if (
                    null != this.paomaMsg &&
                    this.paomaMsg.length > 0
                ) {
                    var t = this.paomaMsg.shift();
                    this.paomaLbl2.string = "";
                    this.nodePaoma.active && this.nodePaoma.stopAllActions();
                    this.nodePaoma.active = !0;
                    this.nodePaoma.opacity = 0;
                    this.nodePaoma.runAction(cc.fadeTo(0.5, 255));
                    if (t && !n.stringUtil.isBlank(t.msg)) {
                        this.isShowPaoma = !0;
                        this.paomaLbl.string = t.msg;
                        this.showLblEffect();
                    }
                } else this.nodePaoma.active = !1;
        };
        e.prototype.showLblEffect = function () {
            this.paomaLbl.node.x = 0;
            this.paomaLbl.node.y = 0;
            var t = this.paomaLbl.node.width,
                e = this.paomaLbl.node.parent.width,
                o = Math.ceil((t + e) / 100);
            t > e && this.paomaLbl.node.runAction(cc.moveTo(o, -t, 0));
            this.scheduleOnce(this.showNextPaoma, o);
        };
        e.prototype.showNextPaoma = function () {
            this.paomaMsg = i.playerProxy.paoma;
            if (!this.paomaMsg || this.paomaMsg.length === 0) {
                this.paomaMsg = i.flowerFriendProxy.paoma;
            }
            if (this.isShowPaoma)
                if (
                    null != this.paomaMsg &&
                    this.paomaMsg.length > 0
                ) {
                    var t = this.paomaMsg.shift();
                    this.paomaLbl2.string = this.paomaLbl.string;
                    this.paomaLbl2.node.x = this.paomaLbl.node.x;
                    this.paomaLbl2.node.y = this.paomaLbl.node.y;
                    this.paomaLbl.string = t.msg;
                    this.paomaLbl.node.x = 0;
                    this.paomaLbl.node.y = -this.paomaHeight;
                    this.paomaLbl2.node.runAction(
                        cc.moveTo(1, this.paomaLbl2.node.x, this.paomaHeight)
                    );
                    this.paomaLbl.node.runAction(cc.moveTo(1, 0, 0));
                    this.scheduleOnce(this.showLblEffect, 1);
                } else {
                    var e = this;
                    this.isShowPaoma = !1;
                    this.nodePaoma.runAction(
                        cc.sequence(
                            cc.fadeTo(1, 0),
                            cc.callFunc(function () {
                                e.nodePaoma.active = !1;
                            })
                        )
                    );
                }
        };
        e.prototype.onClickVip = function (t, e) {
            s.funUtils.openView(s.funUtils.vipview.id);
        };
        e.prototype.onHidePaoma = function () {
            var t = this;
            this.isShowPaoma = !1;
            this.nodePaoma.runAction(
                cc.sequence(
                    cc.fadeTo(1, 0),
                    cc.callFunc(function () {
                        t.nodePaoma.active = !1;
                    })
                )
            );
        };
        __decorate([d(cc.Label)], e.prototype, "lblMoney", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblSolider", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblFood", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblGold", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblPower", void 0);
        __decorate([d(cc.Node)], e.prototype, "nodePaoma", void 0);
        __decorate([d(cc.Label)], e.prototype, "paomaLbl", void 0);
        __decorate([d(cc.Label)], e.prototype, "paomaLbl2", void 0);
        __decorate([d(a.default)], e.prototype, "roleSpine", void 0);
        __decorate([d(cc.Node)], e.prototype, "nodeVip", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblVip", void 0);
        __decorate([d(cc.Node)], e.prototype, "vipBg", void 0);
        return (e = __decorate([_], e));
    })(cc.Component);
o.default = u;