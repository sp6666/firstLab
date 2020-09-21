var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../utils/Utils"),
    n = require("../utils/UIUtils"),
    l = cc._decorator,
    r = l.ccclass,
    a = l.property,
    s = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.toolTip = "";
            e.itemId = 0;
            e.btn = null;
            return e;
        }
        e.prototype.onLoad = function() {
            null == this.btn && (this.btn = this.node.getComponent(cc.Button));
            if (null == this.btn)
                cc.sys.isMobile
                    ? this.node.on(
                          cc.Node.EventType.TOUCH_START,
                          this.onClickBtn
                      )
                    : this.node.on(
                          cc.Node.EventType.MOUSE_DOWN,
                          this.onClickBtn
                      );
            else {
                var t = new cc.Component.EventHandler();
                t.component = "Tip";
                t.target = this.node;
                t.handler = "onClickBtn";
                this.btn.clickEvents.push(t);
            }
        };
        e.prototype.onClickBtn = function() {
            if (0 != this.itemId) {
                var t = new n.ItemSlotData();
                t.id = this.itemId;
                t.kind = 1;
                i.utils.openPrefabView("ItemInfo", !1, t);
            } else
                i.stringUtil.isBlank(this.toolTip) ||
                    i.alertUtil.alert18n(this.toolTip);
        };
        __decorate(
            [
                a({
                    tooltip: "显示备注"
                })
            ],
            e.prototype,
            "toolTip",
            void 0
        );
        __decorate(
            [
                a({
                    tooltip: "显示物品id"
                })
            ],
            e.prototype,
            "itemId",
            void 0
        );
        return (e = __decorate([r], e));
    })(cc.Component);
o.default = s;
