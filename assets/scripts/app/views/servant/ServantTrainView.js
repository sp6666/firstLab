var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("../../utils/Utils"),
    l = cc._decorator,
    r = l.ccclass,
    a = l.property,
    s = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.itemList = null;
            e.tabs = [];
            e.totalArr = [];
            e.curSelect = "1";
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe("SERVANT_UP", this.updateData, this);
            var t = n.utils.getParamStr("ep_wl_item"),
                e = n.utils.getParamStr("ep_zl_item"),
                o = n.utils.getParamStr("ep_zz_item"),
                i = n.utils.getParamStr("ep_ml_item"),
                l =
                    n.utils.getParamStr("ep_all_item") +
                    "|" +
                    t +
                    "|" +
                    e +
                    "|" +
                    o +
                    "|" +
                    i;
            this.totalArr = l.split("|");
            this.onClickTab(null, this.curSelect);
        };
        e.prototype.onClickTab = function(t, e) {
            for (var o = parseInt(e), i = 0; i < this.tabs.length; i++)
                i > 0 && (this.tabs[i].interactable = i != o);
            this.curSelect = e;
            this.onShowData();
        };
        e.prototype.onShowData = function() {
            "0" == this.curSelect
                ? (this.itemList.data = this.totalArr)
                : "1" == this.curSelect
                ? (this.itemList.data = n.utils.getParamStrs("ep_wl_item"))
                : "2" == this.curSelect
                ? (this.itemList.data = n.utils.getParamStrs("ep_zl_item"))
                : "3" == this.curSelect
                ? (this.itemList.data = n.utils.getParamStrs("ep_zz_item"))
                : "4" == this.curSelect &&
                  (this.itemList.data = n.utils.getParamStrs("ep_ml_item"));
        };
        e.prototype.updateData = function() {
            this.itemList.updateItemShow();
        };
        e.prototype.onClickClose = function() {
            n.utils.closeView(this);
        };
        __decorate([a(i.default)], e.prototype, "itemList", void 0);
        __decorate([a([cc.Button])], e.prototype, "tabs", void 0);
        return (e = __decorate([r], e));
    })(cc.Component);
o.default = s;
