var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../utils/Utils"),
    l = require("../../Initializer"),
    r = require("../../utils/ShaderUtils"),
    red = require("../../component/RedDot"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblIndex_1 = null;
            e.lblIndex_2 = null;
            e.redLeft = null;
            e.redRight = null;
            e.bg = null;
            e.leftNode = null;
            e.rightNode = null;
            e.box_1 = null;
            e.box_2 = null;
            e.bgArr = [];
            e.boxArr = [];

            e.binded = false;
            return e;
        }
        e.prototype.showData = function () {
            var t = this._data;
            if (t) {
                this.lblIndex_1.string = this.lblIndex_2.string = i18n.t(
                    "RECHARGE_GIFT_BO_CI", {
                        num: t.id
                    }
                );

                if (!this.binded) {
                    var redStr = l.mergeSingleRechargeProxy.getRedDotName(t.id);
                    this.redLeft.addBinding([redStr]);
                    this.redRight.addBinding([redStr]);
                }

                var e = l.mergeSingleRechargeProxy.getMainList().indexOf(t);
                this.bg.spriteFrame = this.bgArr[e];
                this.bg.node.x = e % 2 == 0 ? 25 : -25;
                this.leftNode.active = e % 2 == 0;
                this.rightNode.active = e % 2 == 1;
                this.box_1.spriteFrame = this.box_2.spriteFrame = this.boxArr[
                    t.id - 1
                ];



                if (l.mergeSingleRechargeProxy.cfg.wave < t.id || l.mergeSingleRechargeProxy.isGetedRwd(t.id)) {
                    r.shaderUtils.setImageGray(this.bg, true);
                    r.shaderUtils.setImageGray(this.box_1, true);
                    r.shaderUtils.setImageGray(this.box_2, true);
                } else {
                    r.shaderUtils.setImageGray(this.bg, false);
                    r.shaderUtils.setImageGray(this.box_1, false);
                    r.shaderUtils.setImageGray(this.box_2, false);
                }
            }
        };
        e.prototype.onClickItem = function () {
            var t = this._data;
            if (l.mergeSingleRechargeProxy.cfg.wave >= t.id && !l.mergeSingleRechargeProxy.isGetedRwd(t.id)) {
                n.utils.openPrefabView(
                    "singlerecharge/MergeSingleRechargeReward",
                    null,
                    t
                );
                n.utils.closeNameView("singlerecharge/MergeSingleRechargeMain");
            }
        };
        __decorate([c(cc.Label)], e.prototype, "lblIndex_1", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblIndex_2", void 0);
        __decorate([c(red.default)], e.prototype, "redLeft", void 0);
        __decorate([c(red.default)], e.prototype, "redRight", void 0);
        __decorate([c(cc.Sprite)], e.prototype, "bg", void 0);
        __decorate([c(cc.Node)], e.prototype, "leftNode", void 0);
        __decorate([c(cc.Node)], e.prototype, "rightNode", void 0);
        __decorate([c(cc.Sprite)], e.prototype, "box_1", void 0);
        __decorate([c(cc.Sprite)], e.prototype, "box_2", void 0);
        __decorate([c([cc.SpriteFrame])], e.prototype, "bgArr", void 0);
        __decorate([c([cc.SpriteFrame])], e.prototype, "boxArr", void 0);
        return (e = __decorate([s], e));
    })(i.default);
o.default = _;