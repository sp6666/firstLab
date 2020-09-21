var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../Initializer"),
    l = require("../../utils/Utils"),
    r = require("../../utils/UIUtils"),
    a = require("../../component/LabelShadow"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblTime = null;
            e.lblChen = null;
            e.lblTu = null;
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
                if (t.time > l.timeUtil.second) return;
                l.utils.showNodeEffect(this.nodeItem);
                t.rwd = 1;
                this.data = null;
                facade.send("CLEAR_CHEN", t.id);
                n.flowerProxy.sendRwd(t.id);
            }
        };
        e.prototype.showData = function() {
            var t = this.data;
            if (t) {
                this.lblTime.unscheduleAllCallbacks();
                this.nodeOver.active = this.nodeChen.active =
                    t.time <= l.timeUtil.second;
                this.nodeUnover.active = !this.nodeChen.active;
                this.lblTime.string = "";
                var e = localcache.getItem(localdb.table_flowerRain, t.type);
                this.lblTu.string = e.tips;
                var o = this;
                this.nodeChen.active
                    ? (this.lblChen.string = l.utils.formatMoney(t.chen))
                    : r.uiUtils.countDown(
                          t.time,
                          this.lblTime,
                          function() {
                              o.showData();
                          },
                          !0,
                          "FLOWER_REMAIN_TIME",
                          "t",
                          "HH:mm"
                      );
            }
        };
        __decorate([_(cc.Label)], e.prototype, "lblTime", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblChen", void 0);
        __decorate([_(a.default)], e.prototype, "lblTu", void 0);
        __decorate([_(cc.Node)], e.prototype, "nodeChen", void 0);
        __decorate([_(cc.Node)], e.prototype, "nodeItem", void 0);
        __decorate([_(cc.Node)], e.prototype, "nodeOver", void 0);
        __decorate([_(cc.Node)], e.prototype, "nodeUnover", void 0);
        return (e = __decorate([c], e));
    })(i.default);
o.default = d;
