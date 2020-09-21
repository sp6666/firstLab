var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("../../utils/Utils"),
    l = require("../../Initializer"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.list = null;
            e.herolist = null;
            return e;
        }
        e.prototype.onLoad = function () {
            facade.subscribe(
                l.qixiProProxy.QIXI_PRO_DATA_UPDATE,
                this.onDataUpdate,
                this
            );
            facade.subscribe(
                l.qixiProProxy.QIXI_PRO_SELECT_HERO,
                this.onSelectHero,
                this
            );
            this.onInfo();
            this.onDataUpdate();
        };
        e.prototype.onInfo = function () {
            this.herolist.selectHandle = function (t) {
                var e = t;
                if (null != e) {
                    l.qixiProProxy.selectHeroId = e.hid;
                    facade.send(l.qixiProProxy.QIXI_PRO_SELECT_HERO);
                }
            };
            this.herolist.data = l.qixiProProxy.data.rwds;
            var t = l.qixiProProxy.data.rwds[0];
            l.qixiProProxy.selectHeroId = t ? t.hid : 0;
            this.herolist.selectData = t;
        };
        e.prototype.onClickRank = function () {
            n.utils.openPrefabView("qixiPro/QiXiProView");
        };
        e.prototype.sortHuoDong = function (t, e) {
            return t.get != e.get ? t.get - e.get : t.id - e.id;
        };
        e.prototype.onSelectHero = function () {
            this.onDataUpdate();
        };
        e.prototype.onDataUpdate = function () {
            for (
                var t = l.qixiProProxy.getHeroRwd(l.qixiProProxy.selectHeroId),
                    e = 0,
                    o = 0; o < t.rwd.length; o++
            )
                e < t.rwd[o].items.length && (e = t.rwd[o].items.length);
            var i = Math.ceil(e / 4),
                n = 100 * i + 10 * (i - 1) + 150;
            this.list.setWidthHeight(475, n);
            this.list.data = t ? t.rwd : null;
        };
        e.prototype.onClickClose = function () {
            n.utils.closeView(this);
        };
        __decorate([s(i.default)], e.prototype, "list", void 0);
        __decorate([s(i.default)], e.prototype, "herolist", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;