var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../utils/Utils"),
    n = cc._decorator,
    l = n.ccclass,
    r = n.property,
    a = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.minTime = 1;
            e.maxTime = 10;
            e.anima = null;
            e.count = 1;
            e._time = 0;
            e._lastTime = 0;
            return e;
        }
        e.prototype.onLoad = function() {
            this._time =
                Math.random() * (this.maxTime - this.minTime) + this.minTime;
            this._lastTime = cc.sys.now();
            this.schedule(this.onTimer, 0.05);
            this.runAnima();
        };
        e.prototype.onTimer = function() {
            if ((cc.sys.now() - this._lastTime) / 1e3 >= this._time) {
                this.runAnima();
                this._time =
                    Math.random() * (this.maxTime - this.minTime) +
                    this.minTime;
                this._lastTime = cc.sys.now();
            }
        };
        e.prototype.runAnima = function() {
            if (null == this.anima) {
                this.anima = this.node.getComponent(cc.Animation);
                this.count = this.anima.getClips().length;
            }
            i.utils.showEffect(this, Math.floor(Math.random() * this.count));
        };
        __decorate([r], e.prototype, "minTime", void 0);
        __decorate([r], e.prototype, "maxTime", void 0);
        return (e = __decorate([l], e));
    })(cc.Component);
o.default = a;
