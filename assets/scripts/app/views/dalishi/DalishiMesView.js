var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("../../utils/Utils"),
    l = require("../../Initializer"),
    r = require("../../component/RoleSpine"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.buttons = [];
            e.list1 = null;
            e.lblNode1 = null;
            e.list2 = null;
            e.lblNode2 = null;
            e.input = null;
            e.box1 = null;
            e.box2 = null;
            e.box3 = null;
            e.roleInfo = null;
            e.roelSpine = null;
            e.lblName = null;
            e.lblShili = null;
            e.lblCount = null;
            e.scoreRank = null;
            e._curFuChouId = 0;
            e.curIndex = 0;
            return e;
        }
        e.prototype.onLoad = function() {
            this.input.placeholder = i18n.t("COMMON_INPUT_TXT");
            facade.subscribe(
                l.dalishiProxy.UPDATE_DALISHI_ZHUISHA,
                this.onUpdateZhuisha,
                this
            );
            facade.subscribe(
                l.dalishiProxy.UPDATE_DALISHI_DEFLOG,
                this.onUpdateDefLog,
                this
            );
            facade.subscribe(
                "DALISI_SERVANT_SELECT",
                this.onServantSelect,
                this
            );
            l.dalishiProxy.sendGetHistory();
            this.onTab(null, 1);
        };
        e.prototype.onTab = function(t, e) {
            var o = parseInt(e) - 1;
            this.curIndex = o;
            for (var i = 0; i < this.buttons.length; i++)
                this.buttons[i].interactable = i != o;
            this.box1.active = 0 == o;
            this.box2.active = 1 == o;
            this.box3.active = 2 == o;
            this.onShowData(o);
        };
        e.prototype.onUpdateDefLog = function() {
            0 == this.curIndex && this.onTab(null, 1);
        };
        e.prototype.onShowData = function(t) {
            switch (t) {
                case 0:
                    l.dalishiProxy.defLog &&
                        l.dalishiProxy.defLog.length > 1 &&
                        l.dalishiProxy.defLog.sort(function(t, e) {
                            return e.dtime - t.dtime;
                        });
                    this.list1.data = l.dalishiProxy.defLog;
                    this.lblNode1.active =
                        null == l.dalishiProxy.defLog ||
                        l.dalishiProxy.defLog.length <= 0;
                    break;

                case 1:
                    l.dalishiProxy.enemyMsg &&
                        l.dalishiProxy.enemyMsg.length > 1 &&
                        l.dalishiProxy.enemyMsg.sort(function(t, e) {
                            return e.time - t.time;
                        });
                    this.list2.data = l.dalishiProxy.enemyMsg;
                    this.lblNode2.active =
                        null == l.dalishiProxy.enemyMsg ||
                        l.dalishiProxy.enemyMsg.length <= 0;
                    break;

                case 2:
                    this.input.string = "";
                    this.roleInfo.active = !1;
            }
        };
        e.prototype.onClickFuChou = function(t, e) {
            var o = e.data;
            if (o) {
                if (l.dalishiProxy.isHaveFight()) {
                    n.alertUtil.alert18n("YAMUN_HAVE_PLAYING_HERO");
                    return;
                }
                this._curFuChouId = o.fuser.id;
                facade.send("DALISI_FUCHOU_SELECT", o.fuser.id);
                n.utils.openPrefabView("dalishi/DServantSelect", !1, {
                    id: n.utils.getParamInt("gongdou_attack_id")
                });
            }
        };
        e.prototype.onServantSelect = function(t) {
            if (this.roleInfo.active && this.box3.active) {
                var e = n.utils.getParamInt("gongdou_zhuisha_id");
                if (l.bagProxy.getItemCount(e) < 1) {
                    n.alertUtil.alertItemLimit(e);
                    return;
                }
                l.dalishiProxy.sendZhuiSha(l.dalishiProxy.zhuisha.fuser.id, t);
                this.onClickClost();
            }
            if (this.box2.active && 0 != this._curFuChouId) {
                e = n.utils.getParamInt("gongdou_attack_id");
                if (l.bagProxy.getItemCount(e) < 1) {
                    n.alertUtil.alertItemLimit(e);
                    return;
                }
                l.dalishiProxy.sendFuChou(this._curFuChouId, t);
                this._curFuChouId = 0;
                this.onClickClost();
            }
        };
        e.prototype.onClickSearch = function() {
            var t = this.input.string;
            if (n.stringUtil.isBlank(t))
                n.alertUtil.alert(i18n.t("SON_TO_QIN_UID"));
            else {
                this.input.string = "";
                l.dalishiProxy.sendFindZhuiSha(t);
            }
        };
        e.prototype.onUpdateZhuisha = function() {
            var t = l.dalishiProxy.zhuisha;
            this.roleInfo.active = null != t;
            if (this.roleInfo.active) {
                this.lblName.string = i18n.t("DALISI_USER_NAME_SCORE", {
                    n: t.fuser.name,
                    d: t.score
                });
                this.lblCount.string = t.hnum + "";
                this.lblShili.string = n.utils.formatMoney(t.fuser.shili);
                this.scoreRank.string = t.rank + "";
                this.roelSpine.setClothes(
                    t.fuser.sex,
                    t.fuser.job,
                    t.fuser.level,
                    t.fuser.clothe
                );
            }
        };
        e.prototype.onClickAttack = function() {
            l.dalishiProxy.isHaveFight()
                ? n.alertUtil.alert18n("YAMUN_HAVE_PLAYING_HERO")
                : n.utils.openPrefabView("dalishi/DServantSelect", !1, {
                      id: n.utils.getParamInt("gongdou_zhuisha_id")
                  });
        };
        e.prototype.onClickClost = function() {
            n.utils.closeView(this);
        };
        __decorate([c([cc.Button])], e.prototype, "buttons", void 0);
        __decorate([c(i.default)], e.prototype, "list1", void 0);
        __decorate([c(cc.Node)], e.prototype, "lblNode1", void 0);
        __decorate([c(i.default)], e.prototype, "list2", void 0);
        __decorate([c(cc.Node)], e.prototype, "lblNode2", void 0);
        __decorate([c(cc.EditBox)], e.prototype, "input", void 0);
        __decorate([c(cc.Node)], e.prototype, "box1", void 0);
        __decorate([c(cc.Node)], e.prototype, "box2", void 0);
        __decorate([c(cc.Node)], e.prototype, "box3", void 0);
        __decorate([c(cc.Node)], e.prototype, "roleInfo", void 0);
        __decorate([c(r.default)], e.prototype, "roelSpine", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblShili", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblCount", void 0);
        __decorate([c(cc.Label)], e.prototype, "scoreRank", void 0);
        return (e = __decorate([s], e));
    })(cc.Component);
o.default = _;
