var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../Initializer"),
    n = require("../../utils/Utils"),
    l = cc._decorator,
    r = l.ccclass,
    a = l.property,
    s = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.btnUI = "";
            e.btnName = "";
            e._key = "";
            e.addLast = false;
            return e;
        }
        Object.defineProperty(e.prototype, "key", {
            get: function () {
                return n.stringUtil.isBlank(this._key) ? "" : "-" + this._key;
            },
            set: function (t) {
                this.onDestroy();
                this._key = t;
                this.start();
            },
            enumerable: !0,
            configurable: !0
        });
        e.prototype.start = function () {
            if (i.guideProxy.guideUI) {
                i.guideProxy.guideUI.setItem(
                    this.btnUI + "-" + this.btnName + this.key,
                    this,
                    this.addLast
                );
            }

        };
        e.prototype.onDestroy = function () {
            if (i.guideProxy.guideUI) {
                i.guideProxy.guideUI.setItem(
                    this.btnUI + "-" + this.btnName + this.key,
                    null,
                    this.addLast
                );
            }
        };
        __decorate([a(cc.Boolean)], e.prototype, "addLast", void 0);
        __decorate([a], e.prototype, "btnUI", void 0);
        __decorate([a], e.prototype, "btnName", void 0);
        return (e = __decorate([r], e));
    })(cc.Component);
o.default = s;