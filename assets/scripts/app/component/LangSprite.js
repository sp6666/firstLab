var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("./UrlLoad"),
    n = require("../Config"),
    l = require("../utils/UIUtils"),
    r = require("../utils/Utils"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.key = "";
            e.pNode = null;
            e.sp = null;
            e._isShow = !0;
            return e;
        }
        Object.defineProperty(e.prototype, "animation", {
            set: function(t) {
                null == this.sp &&
                    (this.sp = this.node.getComponentInChildren(sp.Skeleton));
                this.sp && (this.sp.animation = t);
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(e.prototype, "setActive", {
            set: function(t) {
                this._isShow = t;
                this.pNode
                    ? (this.pNode.active = t)
                    : this.node.children[0] &&
                      (this.node.children[0].active = t);
            },
            enumerable: !0,
            configurable: !0
        });
        e.prototype.onLoad = function() {
            var t = this;
            if ("zh-ch" != n.Config.lang) {
                var e = "" == this.key ? this.getSpKey() : this.key;
                if (!r.stringUtil.isBlank(e))
                    if (null != this.pNode) {
                        this._isShow = this.pNode.active;
                        this.sp = null;
                        this.pNode.destroy();
                        this.pNode.removeFromParent();
                        this.pNode = null;
                        var o = l.uiHelps.getLangPrefab(e);
                        if (!this._isShow) {
                            var i = this;
                            this.loadHandle = function() {
                                i.setActive = t._isShow;
                            };
                        }
                        r.stringUtil.isBlank(o) || (this.url = o);
                    } else {
                        o = l.uiHelps.getLangSprite(e);
                        r.stringUtil.isBlank(o) || (this.url = o);
                    }
            }
        };
        e.prototype.getSpKey = function() {
            var t = this.node.getComponent(cc.Sprite);
            return null != t
                ? t.spriteFrame
                    ? t.spriteFrame._name
                    : ""
                : null != this.pNode
                ? this.pNode.name
                : "";
        };
        __decorate([c], e.prototype, "key", void 0);
        __decorate([c(cc.Node)], e.prototype, "pNode", void 0);
        return (e = __decorate([s], e));
    })(i.default);
o.default = _;
