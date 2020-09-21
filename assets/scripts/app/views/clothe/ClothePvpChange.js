var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../user/UserClothe"),
    n = require("../../Initializer"),
    l = require("../../utils/Utils"),
    r = cc._decorator,
    a = r.ccclass,
    s = (r.property,
    (function(t) {
        __extends(e, t);
        function e() {
            return (null !== t && t.apply(this, arguments)) || this;
        }
        e.prototype.onLoad = function() {
            var t = n.clothePveProxy.pvpClothe;
            this.updateCurClothe(null == t ? n.playerProxy.userClothe : t);
            this.setRoleShow();
            this.onClickBack();
            facade.subscribe(
                n.playerProxy.PLAYER_CLOTH_UPDATE,
                this.updateShow,
                this
            );
            facade.subscribe("UI_TOUCH_MOVE_LEFT", this.onClickClost, this);
            this.nodeInfo.active = !1;
            this.tagNode.node.active = false;
            this.tagCtr = this.tagContainerNode.getComponent("TagInfo");
            this.pvpType = 0;//普通
        };
        e.prototype.onClickOver = function() {
            if (this.checkBuyItem()) {
                var t = {};
                t.ear = this._ear;
                t.body = this._body;
                t.animal = this._animal;
                t.background = this._bg;
                t.effect = this._eff;
                t.head = this._head;
                var e = this;
                if (
                    n.clothePveProxy.pvpClothe &&
                    0 != n.clothePveProxy.pvpClothe.body
                )
                    l.utils.showConfirm(
                        i18n.t("CLOTHE_PVP_CHANGE_CLOTHE"),
                        function() {
                            n.clothePveProxy.sendPvpEnter(
                                t.head,
                                t.body,
                                t.ear,
                                t.background,
                                t.effect,
                                t.animal
                            );
                            e.onClickClost();
                        }
                    );
                else {
                    n.clothePveProxy.sendPvpEnter(
                        t.head,
                        t.body,
                        t.ear,
                        t.background,
                        t.effect,
                        t.animal
                    );
                    this.onClickClost();
                }
            }
        };
        e.prototype.onClickClost = function() {
            l.utils.closeView(this, !0);
        };
        return (e = __decorate([a], e));
    })(i.default));
o.default = s;
