var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../Initializer"),
    l = require("../../component/UrlLoad"),
    r = require("../../utils/UIUtils"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblName = null;
            e.lblDes = null;
            e.lblCount = null;
            e.bg = null;
            e.stars = [];
            e.bgs = [];
            e.starLay = null;
            e.btn = null;
            e.lblLv = null;
            e.redNode = null;
            e.proUrl = null;
            return e;
        }
        e.prototype.onLoad = function() {
            this.btn && this.addBtnEvent(this.btn);
        };
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                var e = localcache.getItem(localdb.table_epSkill, t.id + "");
                this.lblName.string = e.name;
                this.lblDes.string = i18n.t("SERVANT_ZZ" + e.ep);
                this.bg.spriteFrame = this.bgs[e.ep - 1];
                this.starLay.spacingX = 2 - e.star;
                for (var o = 0; o < this.stars.length; o++)
                    this.stars[o].active = o < e.star;
                var i = t.level + (t.hlv ? t.hlv : 0);
                i = i < 1 ? 1 : i;
                this.lblCount.string = e.star * i + "";
                this.lblLv.string = 0 == t.level ? "" : t.level + "";
                if (
                    n.servantProxy.curSelectId &&
                    0 != n.servantProxy.curSelectId
                ) {
                    var l = n.servantProxy.getHeroData(
                        n.servantProxy.curSelectId
                    );
                    this.redNode.active = n.servantProxy.tanlentIsEnoughUp(
                        l,
                        t
                    );
                }
                var a = localcache.getItem(localdb.table_epSkill, t.id);
                this.proUrl &&
                    (this.proUrl.url = r.uiHelps.getLangSp(a ? a.ep : 1));
            }
        };
        __decorate([c(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblDes", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblCount", void 0);
        __decorate([c(cc.Sprite)], e.prototype, "bg", void 0);
        __decorate([c([cc.Node])], e.prototype, "stars", void 0);
        __decorate([c([cc.SpriteFrame])], e.prototype, "bgs", void 0);
        __decorate([c(cc.Layout)], e.prototype, "starLay", void 0);
        __decorate([c(cc.Button)], e.prototype, "btn", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblLv", void 0);
        __decorate([c(cc.Node)], e.prototype, "redNode", void 0);
        __decorate([c(l.default)], e.prototype, "proUrl", void 0);
        return (e = __decorate([s], e));
    })(i.default);
o.default = _;
