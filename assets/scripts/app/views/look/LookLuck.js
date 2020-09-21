var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = require("../../utils/UIUtils"),
    l = require("../../component/List"),
    r = require("../../component/StateImg"),
    a = require("../../Initializer"),
    s = require("../../models/PlayerProxy"),
    c = require("../../models/JiulouProxy"),
    _ = require("../../component/SelectMax"),
    d = cc._decorator,
    u = d.ccclass,
    p = d.property,
    h = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblMoeny = null;
            e.lblFood = null;
            e.lblGold = null;
            e.lblCurLuck = null;
            e.luckCount = null;
            e.autoMoney = null;
            e.autoFood = null;
            e.list = null;
            e.luckImg = null;
            e.lastData = new s.RoleData();
            e.l = [];
            return e;
        }
        e.prototype.onLoad = function() {
            this.updateRole();
            this.udpateCurLuck();
            this.updateZhenzai();
            facade.subscribe(
                a.playerProxy.PLAYER_USER_UPDATE,
                this.updateRole,
                this
            );
            facade.subscribe(
                a.lookProxy.UPDATE_XUNFANG_RECOVER,
                this.udpateCurLuck,
                this
            );
            facade.subscribe(
                a.lookProxy.UPDATE_XUNFANG_ZHENZAI,
                this.updateZhenzai,
                this
            );
        };
        e.prototype.updateZhenzai = function() {
            this.l = [];
            for (var t = 1; t < 4; t++) {
                var e = new c.JiulouChooseData();
                e.type = t;
                e.add = 3 == t ? 10 : 2;
                e.cost = 3 == t ? 0 : 2e4;
                e.itemId = 1 == t ? 2 : 2 == t ? 3 : 1;
                this.l.push(e);
            }
            this.list.data = this.l;
        };
        e.prototype.updateZhenzaiCost = function() {
            this.list.data = this.l;
        };
        e.prototype.udpateCurLuck = function() {
            this.luckImg.total = 10;
            this.luckImg.value = Math.floor(a.lookProxy.recover.num / 10);
            this.autoFood.isChecked = 1 == a.lookProxy.recover.auto3;
            this.autoMoney.isChecked = 1 == a.lookProxy.recover.auto2;
            this.luckCount.max = 90;
            this.luckCount.curValue =
                1 == a.lookProxy.recover.ysSet ? 80 : a.lookProxy.recover.ysSet;
            this.lblCurLuck.string = a.lookProxy.recover.num + "";
        };
        e.prototype.updateRole = function() {
            n.uiUtils.showNumChange(
                this.lblMoeny,
                this.lastData.coin,
                a.playerProxy.userData.coin
            );
            n.uiUtils.showNumChange(
                this.lblFood,
                this.lastData.food,
                a.playerProxy.userData.food
            );
            n.uiUtils.showNumChange(
                this.lblGold,
                this.lastData.cash,
                a.playerProxy.userData.cash
            );
            this.lastData.coin = a.playerProxy.userData.coin;
            this.lastData.food = a.playerProxy.userData.food;
            this.lastData.cash = a.playerProxy.userData.cash;
        };
        e.prototype.onClickSet = function() {
            a.lookProxy.sendYunshi(
                this.autoMoney.isChecked ? 1 : 0,
                this.autoFood.isChecked ? 1 : 0,
                this.luckCount.curValue
            );
        };
        e.prototype.onClickClost = function() {
            i.utils.closeView(this);
        };
        __decorate([p(cc.Label)], e.prototype, "lblMoeny", void 0);
        __decorate([p(cc.Label)], e.prototype, "lblFood", void 0);
        __decorate([p(cc.Label)], e.prototype, "lblGold", void 0);
        __decorate([p(cc.Label)], e.prototype, "lblCurLuck", void 0);
        __decorate([p(_.default)], e.prototype, "luckCount", void 0);
        __decorate([p(cc.Toggle)], e.prototype, "autoMoney", void 0);
        __decorate([p(cc.Toggle)], e.prototype, "autoFood", void 0);
        __decorate([p(l.default)], e.prototype, "list", void 0);
        __decorate([p(r.default)], e.prototype, "luckImg", void 0);
        return (e = __decorate([u], e));
    })(cc.Component);
o.default = h;
