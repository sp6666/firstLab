var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = require("../../component/List"),
    l = require("../../Initializer"),
    r = require("../../component/UrlLoad"),
    a = require("../../utils/UIUtils"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.list = null;
            e.rwd = null;
            e.itemRwds = null;
            e.lbl = null;
            e.btn = null;
            e.curItem = null;
            return e;
        }
        e.prototype.onLoad = function() {
            l.limitActivityProxy.sendLookActivityData(
                l.limitActivityProxy.SEVEN_DAY_ID
            );
            facade.subscribe(
                l.limitActivityProxy.UPDATE_LIMIT_ACTIVE_SEVEN,
                this.onUpdateSHow,
                this
            );
            this.onUpdateSHow();
        };
        e.prototype.onUpdateSHow = function() {
            this.curItem = null;
            this.list.data = l.limitActivityProxy.sevenSign
                ? l.limitActivityProxy.sevenSign.level
                : [];
            if (l.limitActivityProxy.sevenSign) {
                for (
                    var t = l.limitActivityProxy.sevenSign.level.length, e = 0;
                    e < t;
                    e++
                ) {
                    var o = l.limitActivityProxy.sevenSign.level[e];
                    if (2 != o.type) {
                        this.curItem = o;
                        break;
                    }
                }
                null == this.curItem &&
                    (this.curItem =
                        l.limitActivityProxy.sevenSign.level[t - 1]);
            }
            this.showItem(this.curItem);
        };
        e.prototype.showItem = function(t) {
            if (t) {
                this.curItem = t;
                this.rwd.url = a.uiHelps.getSevenDay(t.day);
                this.itemRwds.data =
                    l.limitActivityProxy.sevenSign.rwd[t.day - 1].items;
                this.lbl.url = a.uiHelps.getSevenDayLbl(t.day);
                this.btn.interactable = 1 == t.type;
                this.btn.node.active = 2 != t.type;
            }
        };
        e.prototype.onClickItem = function(t, e) {
            var o = e.data;
            this.showItem(o);
        };
        e.prototype.onClickRwd = function() {
            this.curItem && 1 != this.curItem.type
                ? 0 == this.curItem.type
                    ? i.alertUtil.alert18n("SEVEN_DAY_RWD_LIMIT")
                    : 2 == this.curItem.type &&
                      i.alertUtil.alert18n("SEVEN_DAY_RWDED")
                : l.limitActivityProxy.sendSevenRwd(this.curItem.day);
        };
        e.prototype.onClickClost = function() {
            i.utils.closeView(this);
        };
        __decorate([_(n.default)], e.prototype, "list", void 0);
        __decorate([_(r.default)], e.prototype, "rwd", void 0);
        __decorate([_(n.default)], e.prototype, "itemRwds", void 0);
        __decorate([_(r.default)], e.prototype, "lbl", void 0);
        __decorate([_(cc.Button)], e.prototype, "btn", void 0);
        return (e = __decorate([c], e));
    })(cc.Component);
o.default = d;
