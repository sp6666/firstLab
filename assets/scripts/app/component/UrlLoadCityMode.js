var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../utils/Utils"),
    initializer = require("../Initializer"),
    d = cc._decorator.property,
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
            e.picName = '';
            e.bMainScene = true;
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

        e.prototype.onLoad = function () {
            facade.subscribe(
                'changeCityMode',
                this.onDataUpdate,
                this
            );

            this.onDataUpdate(true);
        };

        e.prototype.onDataUpdate = function (bInit) {
            if (this.mode != initializer.playerProxy._mainCityMode || bInit === true) {

                this.mode = initializer.playerProxy._mainCityMode;
                if (this.bMainScene) {
                    this.url = "gb/res/scene/fain/" + this.mode + '/' + this.picName;
                } else {
                    this.url = "gb/res/city/" + this.mode + '/' + this.picName;
                }
            }
        };

        e.prototype.onDestroy = function () {
            this.loadHandle = null;
            this.target = null;
            e.picName = '';
            e.bMainScene = true;
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
                this.reset();

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
                })

            } else this.reset();
        };

        __decorate([d(cc.String)], e.prototype, "picName", void 0);
        __decorate([d(cc.Boolean)], e.prototype, "bMainScene", void 0);

        return (e = __decorate([n], e));
    })(cc.Component);
o.default = l;