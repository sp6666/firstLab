var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../Initializer"),
    n = require("../../utils/UIUtils"),
    l = require("../../utils/Utils"),
    r = require("../../component/LangSprite"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblPower = null;
            e.nodeShow = null;
            e.spine = null;
            e.last = 0;
            e.isShow = !1;
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe(
                i.playerProxy.PLAYER_EP_UPDATE,
                this.updateEp,
                this
            );
            var t = i.playerProxy.userEp;
            this.last = t.e1 + t.e2 + t.e3 + t.e4;
            this.nodeShow.active = !1;
        };
        e.prototype.updateEp = function() {
            this.nodeShow.active = !0;
            var t = i.playerProxy.userEp;
            if (0 != this.last) {
                var e = t.e1 + t.e2 + t.e3 + t.e4;
                if (e != this.last) {
                    var o = this;
                    this.unscheduleAllCallbacks();
                    if (!this.isShow) {
                        l.utils.showEffect(this, 0);
                        this.spine.animation = "animation";
                    }
                    this.isShow = !0;
                    n.uiUtils.showNumChange(
                        this.lblPower,
                        this.last,
                        e,
                        15,
                        "",
                        "",
                        function() {
                            o.isShow = !1;
                            o.last = e;
                            o.scheduleOnce(o.hideShow, 1);
                        },
                        !1
                    );
                } else {
                    this.unscheduleAllCallbacks();
                    this.hideShow();
                    this.isShow = !1;
                }
            } else this.last = t.e1 + t.e2 + t.e3 + t.e4;
        };
        e.prototype.hideShow = function() {
            this.nodeShow.active = !1;
        };
        __decorate([c(cc.Label)], e.prototype, "lblPower", void 0);
        __decorate([c(cc.Node)], e.prototype, "nodeShow", void 0);
        __decorate([c(r.default)], e.prototype, "spine", void 0);
        return (e = __decorate([s], e));
    })(cc.Component);
o.default = _;
