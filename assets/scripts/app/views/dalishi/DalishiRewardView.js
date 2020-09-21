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
    c = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.list = null;
            e.lblRwd = null;
            e.canClose = !1;
            e._curIndex = -1;
            return e;
        }
        e.prototype.onLoad = function() {
            this.list.data = [
                {
                    index: 0
                },
                {
                    index: 1
                },
                {
                    index: 2
                },
                {
                    index: 3
                },
                {
                    index: 4
                },
                {
                    index: 5
                }
            ];
            facade.subscribe(
                l.dalishiProxy.UPDATE_DALISHI_WIN,
                this.onUpdateWin,
                this
            );
            this.lblRwd.string = "";
            facade.send("DALISHI_MASK_ACTIVE", false);
        };
        e.prototype.testWin = function() {
            l.dalishiProxy.win = {};
            l.dalishiProxy.win.rwd = {};
            l.dalishiProxy.win.rwd.items = [];
            l.dalishiProxy.win.rwd.items.push({
                id: l.dalishiProxy.info.qhid,
                count: 12,
                kind: 5
            });
            this._curIndex = Math.floor(6 * Math.random());
            this.onUpdateWin();
        };
        e.prototype.onUpdateWin = function() {
            var t = [];
            this.canClose = !0;
            for (var e = 0; e < 6; e++)
                e == this._curIndex
                    ? t.push(l.dalishiProxy.win.rwd.items[0])
                    : t.push({
                          index: e
                      });
            var o = l.dalishiProxy.win.rwd.items[0];
            this.lblRwd.string = i18n.t("DALISI_RWD_TIP", {
                n: l.playerProxy.getKindIdName(o.kind, o.id),
                d: o.count
            });
            this.list.data = t;
            this.scheduleOnce(this.onShowEnd, 1);
        };
        e.prototype.onShowEnd = function() {
            var t = l.dalishiProxy.getAwardReward(
                l.dalishiProxy.win.rwd.items[0],
                this._curIndex
            );
            this.list.data = t;
        };
        e.prototype.onClickItem = function(t, e) {
            var o = e.data;
            if (null == o.id && -1 == this._curIndex) {
                this._curIndex = o.index;
                l.dalishiProxy.sendRwd();
            }
        };
        e.prototype.onClickClost = function() {
            if (this.canClose) {
                n.utils.closeView(this);
                l.dalishiProxy.openShop();
            }
        };
        __decorate([s(i.default)], e.prototype, "list", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblRwd", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;
