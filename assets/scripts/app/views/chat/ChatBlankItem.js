var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../component/UrlLoad"),
    l = require("../../utils/UIUtils"),
    r = require("../../utils/Utils"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblContext = null;
            e.lblContext1 = null;
            e.sprite = null;
            e.bg = null;
            e.spine = null;
            e.minWidth = 50;
            e.minHeight = 44;
            return e;
        }
        e.prototype.setBlank = function (t, e, o, i, n) {
            this.minHeight = o;
            this.minWidth = e;
            this.bg &&
                this.sprite.spriteFrame &&
                this.sprite.spriteFrame._name != t + "k" &&
                (this.bg.url = l.uiHelps.getChatBlank(t));
            this.spine && (this.spine.node.active = 0 != i);
            this.lblContext.node.color = this.lblContext1.node.color = r.stringUtil.isBlank(
                    n
                ) ?
                cc.Color.WHITE.fromHEX("#3D150D") :
                cc.Color.WHITE.fromHEX(n);
            0 != i &&
                this.spine &&
                (this.spine.url = l.uiHelps.getChatSpine(i));
        };
        e.prototype.setDest = function (t, e) {
            this.lblContext.string = t;
            this.lblContext1.string = "";

            var o = Math.abs(this.lblContext.node.x),
                i = Math.abs(this.lblContext.node.y),
                n = this.lblContext.node.getContentSize().width,
                l = this.lblContext.node.getContentSize().height;
            if (n > e - 2 * o - 10) {
                this.lblContext1.string = t;
                this.lblContext.string = "";
                n = this.lblContext1.node.getContentSize().width;
                l = this.lblContext1.node.getContentSize().height;
            }
            this.sprite.node.width =
                n + 2 * o < this.minWidth ? this.minWidth : n + 2 * o - 10;
            this.sprite.node.height =
                l + 2 * i < this.minHeight ? this.minHeight : l + 2 * i;
            if (this.spine) {
                this.spine.node.x =
                    (this.sprite.node.width - 4) * this.spine.node.scaleX;
                this.spine.node.y = 10 - this.sprite.node.height;
            }
        };

        __decorate([c(cc.Label)], e.prototype, "lblContext", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblContext1", void 0);
        __decorate([c(cc.Sprite)], e.prototype, "sprite", void 0);
        __decorate([c(n.default)], e.prototype, "bg", void 0);
        __decorate([c(n.default)], e.prototype, "spine", void 0);
        __decorate([c], e.prototype, "minWidth", void 0);
        __decorate([c], e.prototype, "minHeight", void 0);
        return (e = __decorate([s], e));
    })(i.default);
o.default = _;