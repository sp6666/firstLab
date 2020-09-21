var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../utils/UIUtils"),
    n = cc._decorator,
    l = n.ccclass,
    r = n.property,
    a = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.scroll = null;
            e.showLeftNode = null;
            e.showRightNode = null;
            e.showRang = 50;
            return e;
        }
        e.prototype.onLoad = function() {
            if (
                null != this.scroll &&
                (null != this.showLeftNode || null != this.showRightNode)
            ) {
                i.uiUtils.scaleRepeat(this.showLeftNode, 0.9, 1.2);
                i.uiUtils.scaleRepeat(this.showRightNode, 0.9, 1.2);
                this.showLeftNode.active = !1;
                this.showRightNode.active = !1;
                var t = new cc.Component.EventHandler();
                t.component = "ShowScroll";
                t.target = this.node;
                t.handler = "onScroll";
                this.scroll.scrollEvents.push(t);
                this.onScroll();
                facade.subscribe("GUIDE_MOVE_ITEM", this.onMoveItem, this);
            }
        };
        e.prototype.onMoveItem = function(t) {
            var e = this.scroll.getScrollOffset();
            this.scroll.scrollToOffset(new cc.Vec2(Math.abs(e.x) + t, e.y));
            this.onScroll();
        };
        e.prototype.onClickMove = function(t, e) {
            var o = parseInt(e);
            this.scroll.horizontal
                ? 1 == o
                    ? this.scroll.scrollToRight()
                    : this.scroll.scrollToLeft()
                : 1 == o
                ? this.scroll.scrollToBottom()
                : this.scroll.scrollToTop();
            this.onScroll();
        };
        e.prototype.onScroll = function() {
            var t = this.scroll.getScrollOffset();
            if (this.scroll.horizontal) {
                this.showLeftNode.active = Math.abs(t.x) > this.showRang;
                this.showRightNode.active =
                    Math.abs(t.x) + this.showRang <
                    Math.abs(this.scroll.getMaxScrollOffset().x);
            } else {
                this.showLeftNode.active = Math.abs(t.y) > this.showRang;
                this.showRightNode.active =
                    Math.abs(t.y) + this.showRang <
                    Math.abs(this.scroll.getMaxScrollOffset().y);
            }
        };
        __decorate([r(cc.ScrollView)], e.prototype, "scroll", void 0);
        __decorate([r(cc.Node)], e.prototype, "showLeftNode", void 0);
        __decorate([r(cc.Node)], e.prototype, "showRightNode", void 0);
        __decorate([r], e.prototype, "showRang", void 0);
        return (e = __decorate([l], e));
    })(cc.Component);
o.default = a;
