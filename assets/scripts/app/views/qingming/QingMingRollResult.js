var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = require("../../Initializer"),
    l = cc._decorator,
    r = l.ccclass,
    a = l.property,
    s = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.aniArr = [];
            e.pointArr = [];
            e.sprites = [];
            e.aniNode = null;
            e.resultNode = null;
            return e;
        }
        e.prototype.onLoad = function() {
            if (n.qingMingProxy.rollData)
                for (var t = 0; t < this.aniArr.length; t++) {
                    var e = n.qingMingProxy.rollData.dice["num" + (t + 1)];
                    this.aniArr[t].node.active = e > 0;
                }
            this.scheduleOnce(this.onTimer, 1);
        };
        e.prototype.onTimer = function() {
            this.aniNode.active = !1;
            this.resultNode.active = !0;
            this.showPoint();
        };
        e.prototype.showPoint = function() {
            for (var t = 0; t < this.pointArr.length; t++) {
                var e = n.qingMingProxy.rollData.dice["num" + (t + 1)];
                this.pointArr[t].node.active = e > 0;
                e > 0 && (this.pointArr[t].spriteFrame = this.sprites[e - 1]);
            }
            this.scheduleOnce(this.onClickClose, 1);
        };
        e.prototype.onClickBg = function() {
            i.alertUtil.alert18n("QING_MING_ZHENG_ZAI_YAO_DIAN");
        };
        e.prototype.onClickClose = function() {
            i.utils.closeView(this);
            facade.send(n.qingMingProxy.QING_MING_MOVE_POINT);
        };
        __decorate([a([cc.Animation])], e.prototype, "aniArr", void 0);
        __decorate([a([cc.Sprite])], e.prototype, "pointArr", void 0);
        __decorate([a([cc.SpriteFrame])], e.prototype, "sprites", void 0);
        __decorate([a(cc.Node)], e.prototype, "aniNode", void 0);
        __decorate([a(cc.Node)], e.prototype, "resultNode", void 0);
        return (e = __decorate([r], e));
    })(cc.Component);
o.default = s;
