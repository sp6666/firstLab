var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/UrlLoad"),
    n = require("../../utils/Utils"),
    l = require("../../Initializer"),
    r = require("../../utils/UIUtils"),
    a = require("../../component/List"),
    s = require("../../component/RoleSpine"),
    c = require("../../formula"),
    _ = cc._decorator,
    d = _.ccclass,
    u = _.property,
    p = (function (t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.servant = null;
            e.servantName = null;
            e.nodeServant = null;
            e.lblServantTalk = null;
            e.roleSpine = null;
            e.lblName = null;
            e.lblTalk = null;
            e.lblCd = null;
            e.list = null;
            e.nodeCd = null;
            e.nodeFight = null;
            e.nodeAdd = null;
            e.lblAdd = null;
            e.btnClear = null;
            return e;
        }
        e.prototype.onLoad = function () {
            l.dalishiProxy.sendYaMen();
            this.maskHideOrShow(true);
            facade.subscribe(
                l.dalishiProxy.UPDATE_DALISHI_INFO,
                this.onInfoUpdate,
                this
            );
            facade.subscribe(
                "DALISHI_MASK_ACTIVE",
                this.maskHideOrShow,
                this
            );
            facade.subscribe("UI_TOUCH_MOVE_LEFT", this.onClickClost, this);
        };
        e.prototype.onInfoUpdate = function () {
            var t = l.dalishiProxy.info;
            this.nodeServant.active = 0 != t.qhid;
            this.nodeAdd.active = 3 == t.state;
            this.nodeCd.active =
                0 == t.state || 1 == t.state || 3 == t.state || 4 == t.state;
            this.btnClear.node.active = !1;
            switch (t.state) {
                case 0:
                    l.dalishiProxy.info.fitnum > 0 &&
                        l.dalishiProxy.sendYaMen();
                    this.lblCd.string = i18n.t("DALISI_HERO_LIMIT", {
                        d: n.utils.getParamInt("gongdou_unlock_level")
                    });
                    break;

                case 1:
                    this.btnClear.node.active = l.dalishiProxy.hasCanFight();
                    r.uiUtils.countDown(
                        l.dalishiProxy.info.cd.next,
                        this.lblCd,
                        function () {
                            l.playerProxy.sendAdok(
                                l.dalishiProxy.info.cd.label
                            );
                        }
                    );

                case 3:
                    this.lblAdd.string = i18n.t("DALISI_BUY_COUNT", {
                        f: t.chunum,
                        s: t.chumax
                    });
                    break;

                case 4:
                    this.lblCd.string = i18n.t("DALISI_ATTACK_OVER");
            }
            if (this.nodeServant.active) {
                this.servant.url = r.uiHelps.getServantSpine(t.qhid);
                this.servantName.url = r.uiHelps.getStoryRoleName(t.qhid);
                this.lblName.string = t.fuser.name;
                this.roleSpine.setClothes(
                    t.fuser.sex,
                    t.fuser.job,
                    t.fuser.level,
                    t.fuser.clothe
                );
                this.updateRightTalk();
            }
        };
        e.prototype.updateRightTalk = function () {
            this.lblServantTalk.node.parent.active = !1;
            this.lblTalk.node.parent.active = !0;
            this.lblTalk.string = l.dalishiProxy.getTalkType(2);
            n.utils.showNodeEffect(this.lblTalk.node.parent, 0);
            this.scheduleOnce(this.updateLeftTalk, 3 * Math.random() + 1);
        };
        e.prototype.updateLeftTalk = function () {
            this.lblServantTalk.node.parent.active = !0;
            this.lblTalk.node.parent.active = !1;
            this.lblServantTalk.string = l.dalishiProxy.getTalkType(1);
            n.utils.showNodeEffect(this.lblServantTalk.node.parent, 0);
            this.scheduleOnce(this.updateRightTalk, 3 * Math.random() + 1);
        };
        e.prototype.onClickRank = function () {
            l.dalishiProxy.sendRank();
        };
        e.prototype.onClickInfo = function () {
            n.utils.openPrefabView("dalishi/MesView");
        };
        e.prototype.onClickServant = function () {
            2 == l.dalishiProxy.info.state
                ? l.dalishiProxy.sendPiZun()
                : n.utils.openPrefabView("dalishi/DalishiServant");
        };
        e.prototype.onClickAddCount = function () {
            if (l.dalishiProxy.info.chunum < 1)
                n.alertUtil.alert18n("DALISI_ATTACK_OVER");
            else {
                var t = n.utils.getParamInt("gongdou_add_count_id"),
                    e = l.bagProxy.getItemCount(t),
                    o = l.playerProxy.getKindIdName(1, t);
                n.utils.showConfirmItem(
                    i18n.t("DALISI_ADD_COUNT_CONFRIM", {
                        n: o
                    }),
                    t,
                    e,
                    function () {
                        e < 1
                            ? n.alertUtil.alertItemLimit(t)
                            : l.dalishiProxy.sendChushi();
                    },
                    "DALISI_ADD_COUNT_CONFRIM"
                );
            }
        };
        e.prototype.onClickClear = function () {
            var t = c.formula.gongdou_cost(
                l.dalishiProxy.info.dayCount ? l.dalishiProxy.info.dayCount : 0
            );
            n.utils.showConfirmItem(
                i18n.t("DALISI_CLEAR_CD_CONFIRM", {
                    d: t
                }),
                1,
                l.playerProxy.userData.cash,
                function () {
                    l.dalishiProxy.sendBuy();
                },
                "DALISI_CLEAR_CD_CONFIRM"
            );
        };
        e.prototype.onClickClost = function () {
            n.utils.closeNameView("dalishi/WaitAlert");
            n.utils.closeView(this);
        };

        e.prototype.maskHideOrShow = function (show) {
            if (show)
                n.utils.openPrefabView("dalishi/WaitAlert");
            else{
                this.scheduleOnce(function(){
                n.utils.closeNameView("dalishi/WaitAlert")},
                0.3)
            }
        };

        __decorate([u(i.default)], e.prototype, "servant", void 0);
        __decorate([u(i.default)], e.prototype, "servantName", void 0);
        __decorate([u(cc.Node)], e.prototype, "nodeServant", void 0);
        __decorate([u(cc.Label)], e.prototype, "lblServantTalk", void 0);
        __decorate([u(s.default)], e.prototype, "roleSpine", void 0);
        __decorate([u(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([u(cc.Label)], e.prototype, "lblTalk", void 0);
        __decorate([u(cc.Label)], e.prototype, "lblCd", void 0);
        __decorate([u(a.default)], e.prototype, "list", void 0);
        __decorate([u(cc.Node)], e.prototype, "nodeCd", void 0);
        __decorate([u(cc.Node)], e.prototype, "nodeFight", void 0);
        __decorate([u(cc.Node)], e.prototype, "nodeAdd", void 0);
        __decorate([u(cc.Label)], e.prototype, "lblAdd", void 0);
        __decorate([u(cc.Button)], e.prototype, "btnClear", void 0);
        return (e = __decorate([d], e));
    })(cc.Component);
o.default = p;
