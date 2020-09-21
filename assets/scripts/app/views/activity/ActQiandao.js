var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../item/ItemSlotUI"),
    n = require("../../component/UrlLoad"),
    l = require("../../utils/Utils"),
    r = require("../../utils/UIUtils"),
    a = require("../../Initializer"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.url = null;
            e.item = null;
            e.item1 = null;
            e.lblnongli = null;
            e.lblDes = null;
            return e;
        }
        e.prototype.onLoad = function() {
            var t = a.welfareProxy.actqd;
            this.url.url = r.uiHelps.getLimitActivityBg("6012_" + t.type);
            this.lblnongli.string = t.nongli;
            this.lblDes.string = t.label;
            facade.subscribe(
                a.timeProxy.UPDATE_FLOAT_REWARD,
                this.updateItem,
                this
            );
            this.updateItem();
        };
        e.prototype.updateItem = function() {
            if (null != a.timeProxy.itemReward) {
                this.item.data =
                    a.timeProxy.itemReward.length > 1
                        ? a.timeProxy.itemReward[0]
                        : null;
                this.item1.data =
                    a.timeProxy.itemReward.length > 1
                        ? a.timeProxy.itemReward[1]
                        : null;
                null == this.item1.data &&
                    (this.item.node.x = -this.item.node.width / 2);
            }
        };
        e.prototype.onClickClost = function() {
            l.utils.closeView(this);
            a.timeProxy.itemReward = null;
        };
        __decorate([_(n.default)], e.prototype, "url", void 0);
        __decorate([_(i.default)], e.prototype, "item", void 0);
        __decorate([_(i.default)], e.prototype, "item1", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblnongli", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblDes", void 0);
        return (e = __decorate([c], e));
    })(cc.Component);
o.default = d;
