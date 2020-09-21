var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../Initializer"),
    l = require("../../component/List"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.btnYlq = null;
            e.btnGet = null;
            e.lblTxt = null;
            e.list = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this.data;
            if (t) {
                var e = localcache.getItem(localdb.table_officer, t.lv);
                this.lblTxt.string = i18n.t("LEVEL_GIFT_KE_GOU_MAI", {
                    name: e ? e.name : ""
                });
                this.btnYlq.active = 1 == t.isget;
                this.btnGet.node.active = 0 == t.isget;
                this.btnGet.interactable = n.playerProxy.userData.level >= t.lv;
                this.list.data = t.items;
            }
        };
        e.prototype.onClickGet = function() {
            var t = this.data;
            n.levelGiftProxy.sendGetReward(t.lv);
        };
        __decorate([s(cc.Node)], e.prototype, "btnYlq", void 0);
        __decorate([s(cc.Button)], e.prototype, "btnGet", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblTxt", void 0);
        __decorate([s(l.default)], e.prototype, "list", void 0);
        return (e = __decorate([a], e));
    })(i.default);
o.default = c;
