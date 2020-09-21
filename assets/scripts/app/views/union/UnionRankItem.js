var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../Initializer"),
    n = require("../../component/RenderListItem"),
    l = require("../../utils/Utils"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblName = null;
            e.lblLead = null;
            e.lblCount = null;
            e.lblShili = null;
            e.lblRank = null;
            e.imgRank = null;
            e.ranks = [];
            e.nodeApplyed = null;
            e.btnApply = null;
            e.btnName = null;
            return e;
        }
        e.prototype.onLoad = function() {
            this.btnApply &&
                this.btnApply.clickEvents &&
                this.btnApply.clickEvents.length > 0 &&
                (this.btnApply.clickEvents[0].customEventData = this);
            this.btnName &&
                this.btnName.clickEvents &&
                this.btnName.clickEvents.length > 0 &&
                (this.btnName.clickEvents[0].customEventData = this);
        };
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                var e = i.unionProxy.getMengzhu(t.members);
                this.lblLead.string = e ? e.name : "";
                this.lblName.string = i18n.t("UNION_LEVEL_TXT_2", {
                    name: t.name,
                    lv: t.level
                });
                this.lblShili.string = l.utils.formatMoney(t.allShiLi);
                this.lblCount.string =
                    t.members.length +
                    "/" +
                    i.unionProxy.getUnionLvMaxCount(t.level);
                this.imgRank.node.active = t.rid < 4;
                this.lblRank.node.active = t.rid >= 4;
                this.lblRank.string = t.rid + "";
                t.rid < 4 &&
                    (this.imgRank.spriteFrame = this.ranks[
                        t.rid - 1 < 0 ? 0 : t.rid - 1
                    ]);
            }
        };
        e.prototype.onClickItem = function() {
            l.utils.openPrefabView("union/UnionInfo", null, this._data);
        };
        __decorate([s(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblLead", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblCount", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblShili", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblRank", void 0);
        __decorate([s(cc.Sprite)], e.prototype, "imgRank", void 0);
        __decorate([s([cc.SpriteFrame])], e.prototype, "ranks", void 0);
        __decorate([s(cc.Node)], e.prototype, "nodeApplyed", void 0);
        __decorate([s(cc.Button)], e.prototype, "btnApply", void 0);
        __decorate([s(cc.Button)], e.prototype, "btnName", void 0);
        return (e = __decorate([a], e));
    })(n.default);
o.default = c;
