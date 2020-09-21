var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../Initializer"),
    l = require("../../utils/Utils"),
    r = require("../../utils/UIUtils"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblTime = null;
            e.lblChen = null;
            e.nodeChen = null;
            e.nodeItem = null;
            e.nodeOver = null;
            e.nodeUnover = null;
            return e;
        }
        e.prototype.onLoad = function() {
            r.uiUtils.floatPos(this.nodeItem, 0, 5, 3);
        };
        e.prototype.onClickBtn = function() {
            var t = this.data;
            if (t) {
                if (t.time + 60 > l.timeUtil.second) return;
                if (n.flowerProxy.getOtherProtectCd() > 0) {
                    l.alertUtil.alert18n("FLOWER_PROTECT_PROTECT_LIMIT");
                    return;
                }
                l.utils.showNodeEffect(this.nodeItem);
                t.rwd = 1;
                t.sUids.push(n.playerProxy.userData.uid);
                this.data = null;
                facade.send("CLEAR_CHEN", t.id);
                n.flowerProxy.sendSteal(t.id, n.flowerProxy.steal.fuser.uid);
            }
        };
        e.prototype.showData = function() {
            var t = this.data;
            if (t) {
                this.lblTime.unscheduleAllCallbacks();
                this.nodeOver.active = this.nodeChen.active =
                    t.time + 60 <= l.timeUtil.second;
                this.nodeUnover.active = !this.nodeChen.active;
                this.lblTime.string = "";
                var e = this;
                this.nodeChen.active
                    ? (this.lblChen.string = l.utils.formatMoney(t.chen))
                    : r.uiUtils.countDown(
                          t.time + 60,
                          this.lblTime,
                          function() {
                              e.showData();
                          },
                          !0,
                          "FLOWER_REMAIN_TIME",
                          "t",
                          "HH:mm"
                      );
            }
        };
        __decorate([c(cc.Label)], e.prototype, "lblTime", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblChen", void 0);
        __decorate([c(cc.Node)], e.prototype, "nodeChen", void 0);
        __decorate([c(cc.Node)], e.prototype, "nodeItem", void 0);
        __decorate([c(cc.Node)], e.prototype, "nodeOver", void 0);
        __decorate([c(cc.Node)], e.prototype, "nodeUnover", void 0);
        return (e = __decorate([s], e));
    })(i.default);
o.default = _;
