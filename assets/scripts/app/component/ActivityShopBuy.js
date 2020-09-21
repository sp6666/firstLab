var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("./ActivityShopItem"),
    n = require("./SelectMax"),
    l = require("../Initializer"),
    r = require("../models/BagProxy"),
    a = require("../utils/Utils"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblDes = null;
            e.item = null;
            e.select = null;
            e.lblCost = null;
            e.btnBuy = null;
            e.info = null;
            e._curItem = null;
            e.nodeTag = null;
            e.animation = null;
            return e;
        }
        e.prototype.onLoad = function () {
            var t = this.node.openParam;
            this._curItem = t;
            this.item.data = t;
            var e = localcache.getItem(localdb.table_item, t.items[1].id),
                o = e ? e.explain.split("|") : "";
            this.select.node.active = t.count - t.buy > 1 || 0 == t.count;
            var i = l.bagProxy.getItemCount(this._curItem.items[0].id),
                n = this._curItem.items[0].count;
            this.select.max =
                0 == t.count || t.count - t.buy > Math.floor(i / n) ?
                Math.floor(i / n) :
                t.count - t.buy;
            this.btnBuy.node.active = 0 == t.count || t.count - t.buy > 0;
            var a = this;
            this.lblCost.string = 1 * n + "";
            this.select.changeHandler = function () {
                a.lblCost.string =
                    a._curItem.items[0].count * a.select.curValue + "";
            };
            this.info.node.active = !1;
            switch (t.items[1].kind) {
                case r.DataType.HEAD_BLANK:
                    var s = localcache.getItem(
                        localdb.table_userblank,
                        t.items[1].id
                    );
                    this.lblDes.string = s.des;
                    break;

                case r.DataType.CLOTHE:
                    var c = localcache.getItem(
                        localdb.table_userClothe,
                        t.items[1].id
                    );
                    this.lblDes.string = c.des;
                    this.nodeTag.clotheData = c;
                    break;

                case r.DataType.HERO:
                    var _ = localcache.getItem(
                        localdb.table_hero,
                        t.items[1].id
                    );
                    this.lblDes.string = _.txt;
                    this.info.node.active = !0;
                    break;
                case r.DataType.JB_ITEM:
                    var jb = localcache.getItem(
                        localdb.table_heropve,
                        t.items[1].id
                    );

                    if (jb) {
                        if (jb.unlocktype == 6) {
                            this.lblDes.string = jb.msg;
                        }
                    }
                    break;
                case r.DataType.CHENGHAO: {
                    var ch = localcache.getItem(localdb.table_fashion, t.items[1].id);
                    if (ch) {
                        this.lblDes.string = ch.des;
                    }
                    break;
                }
                case r.DataType.HEAD_HEAD: {
                    var ch = localcache.getItem(localdb.table_userhead, t.items[1].id);
                    this.lblDes.string = ch ? ch.des : "";
                    break;
                }
                default:
                    this.lblDes.string =
                        o.length > 1 ? o[1] : e ? e.explain : "";
                    break;
            }

            if (t.items[1].kind == r.DataType.CLOTHE) {
                this.nodeTag.active = true;
            } else {
                this.nodeTag.active = false;
            }
        };

        e.prototype.start = function () {
            if (this.item.data) {
                if (this.item.data.items[1].kind == r.DataType.CLOTHE) {
                    this.animation.stop();
                    this.animation.play("MainTaskDetailopenClothe");
                }
            }
        };

        e.prototype.onClickInfo = function () {
            if (this._curItem) {
                var t = this._curItem.items[1].id;
                if (null == l.servantProxy.getHeroData(t))
                    a.utils.openPrefabView(
                        "servant/ServantInfo",
                        !1,
                        localcache.getItem(localdb.table_hero, t)
                    );
                else {
                    var e = localcache.getItem(localdb.table_hero, t);
                    a.utils.openPrefabView("servant/ServantView", !1, {
                        hero: e,
                        tab: 4
                    });
                }
            }
        };
        e.prototype.onClickBuy = function () {
            if (this._curItem) {
                var t = this.select.node.active ? this.select.curValue : 1,
                    e = l.bagProxy.getItemCount(this._curItem.items[0].id);
                if (t * this._curItem.items[0].count > e) {
                    a.alertUtil.alertItemLimit(this._curItem.items[0].id);
                    return;
                };
                if(this._curItem.count != null && t > this._curItem.count) {
                    a.alertUtil.alert18n("HD_TYPE8_EXCEED_LIMIT");
                    return;
                };
                l.limitActivityProxy.sendActivityShopExchange(
                    l.limitActivityProxy.curExchangeId,
                    1e4 * t + this._curItem.id
                );
            }
            this.onClickClost();
        };
        e.prototype.onClickClost = function () {
            a.utils.closeView(this);
        };
        __decorate([_(cc.Label)], e.prototype, "lblDes", void 0);
        __decorate([_(i.default)], e.prototype, "item", void 0);
        __decorate([_(n.default)], e.prototype, "select", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblCost", void 0);
        __decorate([_(cc.Button)], e.prototype, "btnBuy", void 0);
        __decorate([_(cc.Button)], e.prototype, "info", void 0);
        __decorate([_(cc.Node)], e.prototype, "nodeTag", void 0);
        __decorate([_(cc.Animation)], e.prototype, "animation", void 0);
        return (e = __decorate([c], e));
    })(cc.Component);
o.default = d;