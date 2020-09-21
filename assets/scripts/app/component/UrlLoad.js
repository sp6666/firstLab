var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../utils/Utils"),
    n = cc._decorator.ccclass,
    l = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e._url = "";
            e._res = null;
            e.content = null;
            e.loadHandle = null;
            e.target = null;
            return e;
        }
        Object.defineProperty(e.prototype, "url", {
            get: function () {
                return this._url;
            },
            set: function (t) {
                if (this._url != t) {
                    this._url = t;
                    this.onChangeUrl();
                }
            },
            enumerable: !0,
            configurable: !0
        });
        e.prototype.onDestroy = function () {
            this.loadHandle = null;
            this.target = null;
            this.reset();
            this.clearRes();
        };
        e.prototype.reset = function () {
            this._url = null;
            if (null != this.content) {
                this.content.removeFromParent(!0);
                this.content.destroy();
                this.content = null;
            } else {
                if (null == this.node) return;
                var t = this.node.getComponent(cc.Sprite);
                null != t && null != t.spriteFrame && (t.spriteFrame = null);
            }
            this.clearRes();
        };
        e.prototype.clearRes = function () {
            if (this._res) {
                i.utils.releaseAsset(this._res);
                this._res = null;
            }
        };
        e.prototype.onChangeUrl = function () {
            var t = this,
                e = this._url;
            if (null != e && 0 != e.length) {
                this._url = e;
                this.reset(); -
                1 != e.indexOf("res/") ?
                    cc.loader.loadRes(e, cc.SpriteFrame, function (o, i) {
                        if (null == o && null != i) {
                            t._res = t._url = e;
                            t.node &&
                                (t.node.getComponent(
                                    cc.Sprite
                                ).spriteFrame = i);
                            null != t.loadHandle &&
                                t.loadHandle.apply(t.target);
                        } else cc.warn(JSON.stringify(o));
                    }) :
                    -1 != e.indexOf("prefabs/") ?
                    cc.loader.loadRes(e, function (o, i) {
                        if (null == o && null != i) {
                            t.node && t.node.childrenCount > 0 && t.reset();
                            t._res = t._url = e;
                            var n = cc.instantiate(i);
                            t.content = n;
                            t.node && t.node.addChild(n);
                            null != t.loadHandle &&
                                t.loadHandle.apply(t.target);
                        } else cc.warn(JSON.stringify(o));
                    }) :
                    -1 != e.indexOf("http") &&
                    cc.loader.load(e, function (o, i) {
                        if (null != i) {
                            t._res = t._url = e;
                            var n = new cc.SpriteFrame(i);
                            t.node &&
                                (t.node.getComponent(
                                    cc.Sprite
                                ).spriteFrame = n);
                            null != t.loadHandle &&
                                t.loadHandle.apply(t.target);
                        } else cc.warn(JSON.stringify(o));
                    });
            } else this.reset();
        };
        return (e = __decorate([n], e));
    })(cc.Component);
o.default = l;