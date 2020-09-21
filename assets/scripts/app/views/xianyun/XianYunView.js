var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("./XianYunItem"),
    n = require("../../utils/Utils"),
    l = require("../../Initializer"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblXiwei = null;
            e.leftArrow = null;
            e.rightArrow = null;
            e.xianyunItems = [];
            e.tipNode = null;
            e.index = 0;
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe(
                l.xianyunProxy.XIAN_YUN_HERO_LIST,
                this.onXianYunHeroList,
                this
            );
            facade.subscribe(
                l.xianyunProxy.XIAN_YUN_DESK_INFO_LIST,
                this.updateDeskShow,
                this
            );
            facade.subscribe(
                l.xianyunProxy.XIAN_YUN_DESK_COUNT_UPDATE,
                this.onDeskCountUpdate,
                this
            );
            facade.subscribe("XIAN_YUN_AN_ZHI", this.onTips, this);
            l.xianyunProxy.sendOpenXianYun();
        };
        e.prototype.onXianYunHeroList = function() {};
        e.prototype.updateDeskShow = function() {
            if (null != l.xianyunProxy.deskCashList) {
                for (var t = 0; t < this.xianyunItems.length; t++) {
                    var e = 4 * this.index + t + 1;
                    this.xianyunItems[t].data = l.xianyunProxy.getDeskPrice(e);
                }
                var o = Math.floor(l.xianyunProxy.deskCashList.length / 4);
                this.leftArrow.active = this.index > 0;
                this.rightArrow.active = this.index < o;
                this.lblXiwei.string = i18n.t("XIAN_YUN_WEI_ZHI_TXT", {
                    cur: l.xianyunProxy.heroList
                        ? l.xianyunProxy.heroList.length
                        : 0,
                    total: l.xianyunProxy.base.desk
                });
            }
        };
        e.prototype.onClickTab = function(t, e) {
            var o = parseInt(e);
            this.index += o;
            this.updateDeskShow();
        };
        e.prototype.onClickAdd = function() {
            var t = l.xianyunProxy.getDeskPrice(l.xianyunProxy.base.desk + 1);
            n.utils.showConfirmItem(
                i18n.t("XIAN_YUN_KAI_QI_TXT", {
                    num: t.cash
                }),
                1,
                l.playerProxy.userData.cash,
                function() {
                    l.playerProxy.userData.cash < t.cash
                        ? n.alertUtil.alertItemLimit(1)
                        : l.xianyunProxy.sendAddDesk();
                }
            );
        };
        e.prototype.onDeskCountUpdate = function() {
            this.updateDeskShow();
        };
        e.prototype.onClickClose = function() {
            n.utils.closeView(this);
        };
        e.prototype.onTips = function() {
            this.tipNode.active = !0;
        };
        e.prototype.onClsoeTip = function() {
            this.tipNode.active = !1;
            l.xianyunProxy.curSelectIndex = 0;
            l.xianyunProxy.curSelectHero = 0;
        };
        e.prototype.onClickSure = function() {
            l.xianyunProxy.sendFapei(
                l.xianyunProxy.curSelectHero,
                l.xianyunProxy.curSelectIndex
            );
            this.tipNode.active = !1;
        };
        __decorate([s(cc.Label)], e.prototype, "lblXiwei", void 0);
        __decorate([s(cc.Node)], e.prototype, "leftArrow", void 0);
        __decorate([s(cc.Node)], e.prototype, "rightArrow", void 0);
        __decorate([s([i.default])], e.prototype, "xianyunItems", void 0);
        __decorate([s(cc.Node)], e.prototype, "tipNode", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;
