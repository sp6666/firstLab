var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../utils/Utils"),
    l = require("../../Initializer"),
    red = require("../../component/RedDot"),
    r = require("../../utils/ShaderUtils"),
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
                    "SINGLE_RECHARGE_BO_CI", {
                        num: t.id
                    }
                );
                this.redLeft.node.active = this.redRight.node.active = l.singleRechargeProxy.getBociRed(
                    t.id
                );

                if (!this.binded) {
                    var redStr = l.singleRechargeProxy.getRedDotName(t.id);
                    this.redLeft.addBinding([redStr]);
                    this.redRight.addBinding([redStr]);
                }

                l.singleRechargeProxy.cfg.wave < t.id &&
                    r.shaderUtils.setNodeGray(this.node);
                var e = l.singleRechargeProxy.getMainList().indexOf(t);
                this.bg.spriteFrame = this.bgArr[e];
                this.bg.node.x = e % 2 == 0 ? 25 : -25;
                this.leftNode.active = e % 2 == 0;
                this.rightNode.active = e % 2 == 1;
                this.box_1.spriteFrame = this.box_2.spriteFrame = this.boxArr[
                    t.id - 1
                ];

                if (l.singleRechargeProxy.cfg.wave < t.id || l.singleRechargeProxy.isGetedRwd(t.id)) {
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
            if (l.singleRechargeProxy.cfg.wave >= t.id && !l.singleRechargeProxy.isGetedRwd(t.id)) {
                n.utils.openPrefabView(
                    "singlerecharge/SingleRechargeReward",
                    null,
                    t
                );
                n.utils.closeNameView("singlerecharge/SingleRechargeMain");
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