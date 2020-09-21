var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../component/UrlLoad"),
    l = require("../../utils/Utils"),
    r = require("../../Initializer"),
    a = require("../../component/ChildSpine"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblLv = null;
            e.nodeLock = null;
            e.head = null;
            e.nodeSelect = null;
            e.nodeLv = null;
            e.nodeFree = null;
            e.childSpine = null;
            e.lblVip =null;
            return e;
        }
        Object.defineProperty(e.prototype, "select", {
            set: function (t) {
                this.nodeSelect.active = t;
            },
            enumerable: !0,
            configurable: !0
        });
        e.prototype.showData = function () {
            var t = this._data;
            if (t && null != t.sex) {
                var e = localcache.getItem(localdb.table_minor, t.talent);
                this.lblLv.string = i18n.t("SON_LEVEL", {
                    l: t.level,
                    m: e.level_max
                });
                this.lblVip.node.active =0;
                this.nodeLock.active = !1;
                this.nodeLv.active = !0;
                this.nodeFree.active = false;
                this.childSpine.setKid(t.id, t.sex, !1);
                this.childSpine.node.active = !0;
            } else {
                this.nodeLv.active = !1;
                var cfg =localcache.getItem(localdb.table_seat, t.__index+1);
                this.lblVip.string =i18n.t("COMMON_VIP_NAME",{v:cfg.VIP})
                this.nodeLock.active = t.isLock;
                this.lblVip.node.active =t.isLock&&cfg.VIP!=0;
                this.nodeFree.active = null == t.isLock;
                this.childSpine.clearKid();
                this.childSpine.node.active = !1;
            }
        };
        e.prototype.onClickLock = function () {
            var t = localcache.getItem(
                localdb.table_seat,
                r.sonProxy.base.seat + 1
            );
            //add by Ocean 
            if(t.VIP>r.playerProxy.userData.vip){
                l.alertUtil.alert18n("LOOK_FOR_VIP_LEVEL_SHORT");
                return;
            }
            t &&
                l.utils.showConfirmItem(
                    i18n.t("SON_LOCK_SEAT", {
                        value: t.cash,
                        index: t.seat
                    }),
                    1,
                    r.playerProxy.userData.cash,
                    function () {
                        r.playerProxy.userData.cash < t.cash ?
                            l.alertUtil.alertItemLimit(1) :
                            r.sonProxy.sendBuySeat();
                    },
                    "SON_LOCK_SEAT"
                );
        };
        __decorate([_(cc.Label)], e.prototype, "lblLv", void 0);
        __decorate([_(cc.Node)], e.prototype, "nodeLock", void 0);
        __decorate([_(n.default)], e.prototype, "head", void 0);
        __decorate([_(cc.Node)], e.prototype, "nodeSelect", void 0);
        __decorate([_(cc.Node)], e.prototype, "nodeLv", void 0);
        __decorate([_(cc.Node)], e.prototype, "nodeFree", void 0);
        __decorate([_(a.default)], e.prototype, "childSpine", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblVip", void 0);
        return (e = __decorate([c], e));
    })(i.default);
o.default = d;