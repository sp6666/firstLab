var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../Initializer"),
    n = require("../../utils/Utils"),
    l = require("../../utils/UIUtils"),
    cfg = require("../../Config"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblName = null;
            e.lblChenlu = null;
            e.lblExp = null;
            e.pro = null;
            e.lblBJ = null;
            e.imgHua = null;
            e.imgProtect = null;
            e.imgProtectLv = null;
            e.lblProtectTip = null;
            e.lblCoolCd = null;
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe(
                i.flowerProxy.UPDATE_FLOWER_LEVEL,
                this.onLevel,
                this
            );
            facade.subscribe(
                i.flowerProxy.UPDATE_FLOWER_PROTECT,
                this.onProtect,
                this
            );
            this.onLevel();
            this.onProtect();
        };
        e.prototype.onLevel = function() {
            if (null != i.flowerProxy.level) {
                var t = i.flowerProxy.level.lv,
                    e = i.flowerProxy.level.exp,
                    o = localcache.getItem(localdb.table_flowerLv, t);
                this.lblExp.string = i18n.t("COMMON_NUM", {
                    f: e,
                    s: o ? o.exp : 0
                });
                this.lblBJ &&
                    (this.lblBJ.string = i18n.t("FLOWER_BAOJI_PER", {
                        d: o.chance / 100
                    }));
                this.pro.progress = o ? e / o.exp : 1;
                this.lblName.string = i18n.t("FLOWER_LEVEL_NAME", {
                    d: t
                });
                this.lblChenlu.string = n.utils.formatMoney(
                    i.flowerProxy.level.chenlu
                );
            }
        };
        e.prototype.onProtect = function() {
            var t = this;
            if (null != this.lblProtectTip) {
                var e = i.flowerProxy.getProtectCd();
                var left = i.flowerProxy.getProtectLeftCd();
                if (left > 0) {

                    this.imgHua.active = !1;

                    //保护的时候如果是安卓并且是港澳台，显示绿人，否则显示普通
                    var showLv = i.flowerProxy.lvCanUse();

                    this.imgProtectLv.active = showLv;
                    this.imgProtect.active = !showLv;

                    l.uiUtils.countDown(
                        e,
                        this.lblProtectTip,
                        function() {
                            t.lblProtectTip.string = i18n.t(
                                "FLOWER_PROTECT_NOT"
                            );
                            t.imgHua.active = !0;
                            t.imgProtect.active = !1;
                            t.imgProtectLv.active = false;
                            t.onUpdateCoolCd();
                            //倒数计时结束时候发一下这个
                            facade.send(i.flowerProxy.UPDATE_FLOWER_PROTECT_COUNT_OVER);
                        },
                        !0,
                        "FLOWER_PROTECT_CD_LEFT",
                        "d"
                    );
                } else {
                    this.onUpdateCoolCd();
                    this.imgHua.active = !0;
                    this.imgProtect.active = !1;
                    this.imgProtectLv.active = false;
                    this.lblProtectTip.unscheduleAllCallbacks();
                    this.lblProtectTip.string = i18n.t("FLOWER_PROTECT_NOT");
                }
            }
        };
        e.prototype.onUpdateCoolCd = function() {
            var t = this;
            if (i.flowerProxy.getProtectCoolCd() > 0)
                l.uiUtils.countDown(
                    i.flowerProxy.getProtectCoolEndCd(),
                    this.lblCoolCd,
                    function() {
                        t.lblCoolCd.string = i18n.t("FLOWER_PROTECT_START");
                    },
                    !0,
                    "FLOWER_PROTECT_CD_DOWN",
                    "d"
                );
            else {
                this.lblCoolCd.unscheduleAllCallbacks();
                this.lblCoolCd.string = i18n.t("FLOWER_PROTECT_START");
            }
        };
        __decorate([s(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblChenlu", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblExp", void 0);
        __decorate([s(cc.ProgressBar)], e.prototype, "pro", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblBJ", void 0);
        __decorate([s(cc.Node)], e.prototype, "imgHua", void 0);
        __decorate([s(cc.Node)], e.prototype, "imgProtect", void 0);
        __decorate([s(cc.Node)], e.prototype, "imgProtectLv", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblProtectTip", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblCoolCd", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;
