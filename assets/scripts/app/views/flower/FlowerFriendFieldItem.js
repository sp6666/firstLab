var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../utils/Utils"),
    l = require("../../utils/UIUtils"),
    r = require("../../component/UrlLoad"),
    a = require("../../Initializer"),
    s = require("../../utils/ShaderUtils"),
    c = cc._decorator,
    _ = c.ccclass,
    d = c.property,
    u = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.nodeCd = null;
            e.nodeUnlock = null;
            e.lblCd = null;
            e.lblUnlock = null;
            e.nodePlant = null;
            e.unplant = null;
            e.urlload = null;
            return e;
        }

        Object.defineProperty(e.prototype, "data", {
            get: function () {
                return this._data;
            },
            set: function (t) {
                this._data = t;
                this.node.active = true;
                this.showData();
            },
            enumerable: !0,
            configurable: !0
        });

        e.prototype.onLoad = function () {

        };

        e.prototype.showData = function () {
            var t = this.data;
            if (t) {

                var e = localcache.getItem(localdb.table_friend_flowerCore, t.pid);
                if (this.nodePlant) {

                    this.unplant.node.active = 0 == t.pid || -1 == t.pid;
                    //s.shaderUtils.setImageGray(this.unplant, -1 == t.pid);

                    this.nodePlant.active = !this.unplant.node.active;

                    this.urlload.url = "";
                    this.urlload.node.opacity = 0;

                    if (e) {
                        this.urlload.node.opacity = 255;
                        this.urlload.url = l.uiHelps.getFlowerFriendPlant(
                            t.pid,
                            a.flowerFriendProxy.getStatu(t.stime, e.time)
                        );
                    }
                    if (-1 == t.pid && a.flowerFriendProxy.isNextUnlock(t.id)) {
                        s.shaderUtils.setImageGray(this.unplant, true);
                    } else {
                        s.shaderUtils.setImageGray(this.unplant, false);
                    }

                } else if (this.nodeCd) {
                    this.nodeCd.active = 0 != t.pid && -1 != t.pid;
                    this.lblCd.string = "";
                    this.lblCd.unscheduleAllCallbacks();

                    this.nodeUnlock.active = -1 == t.pid && a.flowerFriendProxy.isNextUnlock(t.id);

                    if (this.nodeCd.active) {

                        var o = t.stime + e.time;
                        if (n.timeUtil.second > o)
                            this.lblCd.string = i18n.t("FLOWER_PLANT_CD_OVER");
                        else {
                            var i = this;
                            l.uiUtils.countDown(o, this.lblCd, function () {
                                i.lblCd.string = i18n.t("FLOWER_PLANT_CD_OVER");
                            });
                        }
                    }
                    if (this.nodeUnlock.active) {
                        var r = this.nodeCd.active ?
                            null :
                            localcache.getItem(localdb.table_friend_flowerField, t.id);
                        this.lblUnlock.string = i18n.t("FLOWER_UNLOCK_LEVEL", {
                            d: r.lv
                        });

                    }
                }


            } else {
                if (this.nodeCd) {
                    this.nodeUnlock.active = false;
                    this.lblUnlock.string = '';
                    this.lblCd.string = "";
                    this.nodeCd.active = false;
                }
                if (this.nodePlant) {

                    this.unplant.node.active = true;
                    this.nodePlant.active = false;
                    s.shaderUtils.setImageGray(this.unplant, true);

                    this.urlload.url = "";

                }

            }
        };
        __decorate([d(cc.Node)], e.prototype, "nodePlant", void 0);
        __decorate([d(cc.Sprite)], e.prototype, "unplant", void 0);
        __decorate([d(r.default)], e.prototype, "urlload", void 0);

        __decorate([d(cc.Node)], e.prototype, "nodeCd", void 0);
        __decorate([d(cc.Node)], e.prototype, "nodeUnlock", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblCd", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblUnlock", void 0);

        return (e = __decorate([_], e));
    })(i.default);
o.default = u;