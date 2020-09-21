var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../component/UrlLoad"),
    l = require("../../utils/UIUtils"),
    p = require("../../Initializer"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblName = null;
            e.lblLv = null;
            e.lblZZ = null;
            e.lblProp = null;
            e.head = null;
            e.lblTimes = null;
            e.btnFight = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                var e = localcache.getItem(localdb.table_hero, t.id);
                this.lblName.string = e.name;
                this.head.url = l.uiHelps.getServantHead(t.id);
                this.lblLv.string = i18n.t("COMMON_LV", {
                    lv: t.level
                });
                var o = t.zz.e1 + t.zz.e2 + t.zz.e3 + t.zz.e4;
                this.lblZZ.string = i18n.t("SERVANT_PROP_TOTAL", {
                    value: o
                });
                this.lblProp.string = i18n.t("COMMON_ADD_2", {
                    n: i18n.t("COMMON_PROP5"),
                    c: t.aep.e1 + t.aep.e2 + t.aep.e3 + t.aep.e4
                });

                var times = p.dalishiProxy.getCanFightTimes(t.id);
                this.lblTimes.string = times + "/" +  p.dalishiProxy.info.maxf;
                this.btnFight.interactable = false;
                if(times > 0){
                    this.btnFight.interactable = true;
                }
            }
        };
        e.prototype.onClickAttact = function() {
            var t = this._data;
            t && facade.send("DALISI_SERVANT_SELECT", t.id);
        };
        __decorate([s(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblLv", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblZZ", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblProp", void 0);
        __decorate([s(n.default)], e.prototype, "head", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblTimes", void 0);
        __decorate([s(cc.Button)], e.prototype, "btnFight", void 0);
        return (e = __decorate([a], e));
    })(i.default);
o.default = c;
