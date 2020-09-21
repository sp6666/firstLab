var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("../../Initializer"),
    l = require("../../utils/Utils"),
    r = require("../../models/TimeProxy"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.list1 = null;
            e.list2 = null;
            e.wzmNode = null;
            e.arr = [
                {
                    type: 0
                },
                {
                    type: 1
                },
                {
                    type: 2
                },
                {
                    type: 3
                }
            ];
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe("XIAN_YUN_OPEN_END", this.onXianYun, this);
            facade.subscribe(
                n.xianyunProxy.XIAN_YUN_HERO_LIST,
                this.onXianYunUpdate,
                this
            );
            var t = this;
            this.list1.selectHandle = function(e) {
                var o = e;
                l.utils.openPrefabView("servant/ServantView", !1, {
                    hero: o,
                    tab: 4
                });
                l.utils.closeView(t);
            };
            this.list2.selectHandle = function(t) {
                var e = t;
                l.utils.openPrefabView("servant/ServantInfo", !1, e);
            };
            this.wzmNode.active = n.servantProxy.getHeroList(!1).length > 0;
            r.funUtils.isOpenFun(r.funUtils.xianyun)
                ? n.xianyunProxy.sendOpenXianYun()
                : this.scheduleOnce(this.oepnView, 0.25);
        };
        e.prototype.onXianYun = function() {
            this.oepnView();
        };
        e.prototype.oepnView = function() {
            this.list1.data = n.servantProxy
                .getHeroList(!0)
                .sort(this.sortStar);
            this.list2.data = n.servantProxy.getHeroList(!1);
        };
        e.prototype.sortLevel = function(t, e) {
            var o = n.servantProxy.getHeroData(t.heroid),
                i = n.servantProxy.getHeroData(e.heroid);
            return o.level > i.level ? -1 : 1;
        };
        e.prototype.sortZiZhi = function(t, e) {
            var o = n.servantProxy.getHeroData(t.heroid),
                i = n.servantProxy.getHeroData(e.heroid);
            return o.zz.e1 + o.zz.e2 + o.zz.e3 + o.zz.e4 >
                i.zz.e1 + i.zz.e2 + i.zz.e3 + i.zz.e4
                ? -1
                : 1;
        };
        e.prototype.sortId = function(t, e) {
            return t.heroid < e.heroid ? -1 : 1;
        };
        e.prototype.sortProp = function(t, e) {
            var o = n.servantProxy.getHeroData(t.heroid),
                i = n.servantProxy.getHeroData(e.heroid);
            return o.aep.e1 + o.aep.e2 + o.aep.e3 + o.aep.e4 >
                i.aep.e1 + i.aep.e2 + i.aep.e3 + i.aep.e4
                ? -1
                : 1;
        };
        e.prototype.sortStar = function(t, e) {
            var o = n.xianyunProxy.isXianYun(t.heroid) ? 1 : 0,
                i = n.xianyunProxy.isXianYun(e.heroid) ? 1 : 0,
                l = n.servantProxy.getHeroData(t.heroid),
                r = n.servantProxy.getHeroData(e.heroid);
            return o != i
                ? o - i
                : t.star != e.star
                ? e.star - t.star
                : r.level - l.level;
        };
        e.prototype.onClickClose = function() {
            l.utils.closeView(this, !0);
        };
        e.prototype.onXianYunUpdate = function() {
            this.oepnView();
        };
        __decorate([c(i.default)], e.prototype, "list1", void 0);
        __decorate([c(i.default)], e.prototype, "list2", void 0);
        __decorate([c(cc.Node)], e.prototype, "wzmNode", void 0);
        return (e = __decorate([s], e));
    })(cc.Component);
o.default = _;
