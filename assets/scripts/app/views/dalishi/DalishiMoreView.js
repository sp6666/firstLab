var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("../../Initializer"),
    l = require("../../utils/Utils"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.list = null;
            e._curId = 0;
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe(
                n.dalishiProxy.UPDATE_DALISHI_KILL20LOG,
                this.onUpdateMsg,
                this
            );
            facade.subscribe(
                "DALISI_SERVANT_SELECT",
                this.onServantSelect,
                this
            );
            this.onUpdateMsg();
        };
        e.prototype.onServantSelect = function(t) {
            if (0 != this._curId) {
                var e = l.utils.getParamInt("gongdou_attack_id");
                if (n.bagProxy.getItemCount(e) < 1) {
                    l.alertUtil.alertItemLimit(e);
                    return;
                }
                n.dalishiProxy.sendTiaoZhan(this._curId, t);
                this._curId = 0;
                facade.send("BOT_EXTEND_HIDE");
            }
        };
        e.prototype.onClickChangle = function(t, e) {
            if (n.dalishiProxy.isHaveFight())
                l.alertUtil.alert18n("YAMUN_HAVE_PLAYING_HERO");
            else {
                var o = e.data;
                if (o) {
                    this._curId = o.user.uid;
                    facade.send("BOT_EXTEND_HIDE");
                    l.utils.openPrefabView("dalishi/DServantSelect", !1, {
                        id: l.utils.getParamInt("gongdou_attack_id")
                    });
                }
            }
        };
        e.prototype.onUpdateMsg = function() {
            this.node.active =
                null != n.dalishiProxy.kill20Log &&
                n.dalishiProxy.kill20Log.length > 0;
            this.list.data = n.dalishiProxy.kill20Log;
        };
        __decorate([s(i.default)], e.prototype, "list", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;
