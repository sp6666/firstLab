var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../Config"),
    n = require("../utils/Utils"),
    l = cc._decorator,
    r = l.ccclass,
    a = l.property,
    s = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.nodes = [];
            e.objLayer = null;
            e.speedstr = "";
            e.speedstrY = "";
            e.statrX = 169;
            e.statrY = 0;
            e.scroll = null;
            e._off = 0;
            e._offY = 0;
            e._last = 0;
            e._lastY = 0;
            e.speeds = [];
            e.speedYs = [];
            e.offH = 0;
            return e;
        }
        e.prototype.onLoad = function() {
            for (var t = this.speedstr.split("|"), e = 0; e < t.length; e++)
                this.speeds.push(parseFloat(t[e]));
            t = n.stringUtil.isBlank(this.speedstrY)
                ? []
                : this.speedstrY.split("|");
            for (e = 0; e < t.length; e++) this.speedYs.push(parseFloat(t[e]));
            if (this.scroll) {
                this.scroll.scrollToOffset(
                    new cc.Vec2(this.statrX, this.statrY)
                );
                this._last = this.statrX;
                this._lastY = this.statrY;
            }
            this.moveOff(this.statrX, this.statrY);
            if (this.scroll) {
                this.offH = this.node.height - i.Config.showHeight;
                this.schedule(this.onTimer, 0.03);
            }
        };
        e.prototype.onTimer = function() {
            if (
                this._last != -this.scroll.getScrollOffset().x ||
                this._lastY != -this.scroll.getScrollOffset().y
            ) {
                this._last = -this.scroll.getScrollOffset().x;
                this._lastY = -this.scroll.getScrollOffset().y;
                this.moveTo(this._last, this._lastY);
            }
        };
        e.prototype.addObject = function(t, e, o) {
            void 0 === e && (e = 0);
            void 0 === o && (o = 0);
            if (this.objLayer) {
                this.objLayer.addChild(t);
                t.x = e;
                t.y = o;
            }
        };
        e.prototype.moveOff = function(t, e) {
            this._off += t;
            this._offY += e;
            this._off =
                this._off + cc.winSize.width > this.node.width
                    ? this.node.width - cc.winSize.width
                    : this._off;
            this._offY =
                this._offY + i.Config.showHeight > this.node.height
                    ? this.node.height - i.Config.showHeight
                    : this._offY;
            for (var o = 0; o < this.nodes.length; o++) {
                var n = this._off * this.speeds[o];
                this.nodes[o].x = this.scroll ? this._last - n : -n;
                if (0 != this.speedYs.length) {
                    var l =
                        this.speedYs.length > o
                            ? this._offY * this.speedYs[o]
                            : 0;
                    this.nodes[o].y = this.scroll ? this._lastY - l : -l;
                    this.nodes[o].y =
                        0 == this.speedYs[o]
                            ? Math.floor(this.offH + this._lastY)
                            : this.nodes[o].y;
                }
            }
        };
        e.prototype.moveTo = function(t, e) {
            this._off = t;
            this._offY = e;
            this.moveOff(0, 0);
        };
        __decorate([a([cc.Node])], e.prototype, "nodes", void 0);
        __decorate([a(cc.Node)], e.prototype, "objLayer", void 0);
        __decorate(
            [
                a({
                    tooltip: "速度字符串以'|'分隔"
                })
            ],
            e.prototype,
            "speedstr",
            void 0
        );
        __decorate(
            [
                a({
                    tooltip: "速度字符串以'|'分隔"
                })
            ],
            e.prototype,
            "speedstrY",
            void 0
        );
        __decorate(
            [
                a({
                    tooltip: "初始位移X位置"
                })
            ],
            e.prototype,
            "statrX",
            void 0
        );
        __decorate(
            [
                a({
                    tooltip: "初始位移Y位置"
                })
            ],
            e.prototype,
            "statrY",
            void 0
        );
        __decorate([a(cc.ScrollView)], e.prototype, "scroll", void 0);
        return (e = __decorate([r], e));
    })(cc.Component);
o.default = s;
