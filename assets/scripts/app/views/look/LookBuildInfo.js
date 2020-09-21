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
            e.lblBuildName = null;
            e.lblCost = null;
            e.nodeLook = null;
            e.btnLook = null;
            e._curBuiliId = 0;
            return e;
        }
        e.prototype.onLoad = function() {
            var t = (this._curBuiliId = this.node.openParam);
            if (t) {
                for (
                    var e = localcache.getGroup(
                            localdb.table_lookCityEvent,
                            "city",
                            t
                        ),
                        o = [],
                        i = 0;
                    i < e.length;
                    i++
                ) {
                    var n = !0;
                    0 != e[i].disappear &&
                        (1 == e[i].disappear
                            ? (n = l.lookProxy.isOpen(e[i].dp_para))
                            : 2 == e[i].disappear
                            ? (n = l.taskProxy.mainTask.id < e[i].dp_para)
                            : 3 == e[i].disappear
                            ? (n = l.playerProxy.userData.bmap >= e[i].dp_para)
                            : 4 == e[i].disappear &&
                              (n =
                                  l.playerProxy.userData.level >=
                                  e[i].dp_para));
                    n && o.push(e[i]);
                }
                var r = localcache.getItem(localdb.table_lookBuild, t);
                this.lblBuildName.string = r.name;
                o.sort(this.sortList);
                this.list.data = o;
                this.updateCost();
                this.nodeLook.active =
                    l.playerProxy.userData.level > 5 &&
                    l.playerProxy.userData.bmap > r.lock;
            }
            facade.subscribe(
                l.lookProxy.UPDATE_XUNFANG_XFINFO,
                this.updateCost,
                this
            );
        };
        e.prototype.updateCost = function() {
            this.lblCost.string = n.utils.formatMoney(this.getCost());
            this.btnLook.interactable = !0;
        };
        e.prototype.getCost = function() {
            return (
                n.utils.getParamInt("xunfang_city_jiage") +
                n.utils.getParamInt("xunfang_city_jiage_add") *
                    (l.lookProxy.xfinfo.lastTime < n.timeUtil.getTodaySecond()
                        ? 0
                        : null == l.lookProxy.xfinfo.count
                        ? 0
                        : l.lookProxy.xfinfo.count)
            );
        };
        e.prototype.onClickLook = function() {
            if (0 != this._curBuiliId)
                if (l.playerProxy.userData.cash < this.getCost())
                    n.alertUtil.alertItemLimit(1);
                else if (l.lookProxy.xfinfo.num <= 0) {
                    var t = n.utils.getParamInt("xf_cost_item_tl"),
                        e = l.bagProxy.getItemCount(t);
                    n.utils.showConfirmItem(
                        i18n.t("LOOK_USE_RECY_CONFIRM", {
                            n: l.playerProxy.getKindIdName(1, t),
                            c: 1
                        }),
                        t,
                        e,
                        function() {
                            e < 1
                                ? n.alertUtil.alertItemLimit(t)
                                : l.lookProxy.sendRecover();
                        },
                        "LOOK_USE_RECY_CONFIRM"
                    );
                } else {
                    this.btnLook.interactable = !1;
                    l.lookProxy.sendXunfan(100 + this._curBuiliId);
                    this.onClickClose();
                }
        };
        e.prototype.sortList = function(t, e) {
            var o = l.lookProxy.isLock(t) ? 0 : 1,
                i = l.lookProxy.isLock(e) ? 0 : 1;
            return o > i ? 1 : o < i ? -1 : o == i ? t.id - e.id : -1;
        };
        e.prototype.onClickClose = function() {
            n.utils.closeView(this);
        };
        __decorate([s(i.default)], e.prototype, "list", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblBuildName", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblCost", void 0);
        __decorate([s(cc.Node)], e.prototype, "nodeLook", void 0);
        __decorate([s(cc.Button)], e.prototype, "btnLook", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;
