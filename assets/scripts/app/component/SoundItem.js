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
            e.soundBGM = null;
            e.isBase = !1;
            e.isLoop = !0;
            e.isRever = !0;
            e._isPlay = !1;
            return e;
        }
        e.prototype.onLoad = function() {
            this.playSound();
        };
        e.prototype.playSound = function() {
            if (null != this.soundBGM && this.enabled && !this._isPlay) {
                this._isPlay = !0;
                this.isLoop
                    ? i.audioManager.playBGM(this.soundBGM, this.isBase)
                    : i.audioManager.playSound(this.soundBGM, !0, !0);
            }
        };
        e.prototype.onEnable = function() {
            this.playSound();
        };
        e.prototype.onDestroy = function() {
            this.isLoop
                ? this.isRever && i.audioManager.stopBGM(!0)
                : i.audioManager.playSound("", !0, !0);
        };
        __decorate([r(cc.AudioClip)], e.prototype, "soundBGM", void 0);
        __decorate(
            [
                r({
                    tooltip: "是否是基础声音，用于主场景"
                })
            ],
            e.prototype,
            "isBase",
            void 0
        );
        __decorate(
            [
                r({
                    tooltip: "是否循环"
                })
            ],
            e.prototype,
            "isLoop",
            void 0
        );
        __decorate(
            [
                r({
                    tooltip: "销毁是否还原主场景声音"
                })
            ],
            e.prototype,
            "isRever",
            void 0
        );
        return (e = __decorate([l], e));
    })(cc.Component);
o.default = a;
