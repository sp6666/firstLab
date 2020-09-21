var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../item/ItemSlotUI"),
    n = require("../../utils/UIUtils"),
    l = require("../../utils/Utils"),
    r = require("../../Initializer"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.item = null;
            e.nodeTake = null;
            e.nodeLook = null;
            e.nodeGroup = null;
            e.lblName = null;
            e.lblScore = null;
            e.curItem = null;
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe("TREASURE_NEXT_REWARD", this.showNext, this);
            this.showNext();
        };
        e.prototype.getNextData = function() {
            for (
                var t = null,
                    e = l.utils.getParamInt("treasure_com_item"),
                    o = 0;
                o < r.treasureProxy.tGroupList.length;
                o++
            ) {
                for (
                    var i = r.treasureProxy.tGroupList[o], n = 0, a = 0;
                    a < i.items.length;
                    a++
                ) {
                    var s = i.items[a];
                    if (r.bagProxy.getItemCount(s.data.itemid) > 0) {
                        t = s.data;
                        break;
                    }
                    if (
                        r.bagProxy.getItemCount(s.data.tagid) >=
                            s.data.tagnum &&
                        (0 == s.rwd || s.data.tagid != e)
                    ) {
                        t = s.data;
                        break;
                    }
                    n += 1 == s.rwd ? 1 : 0;
                }
                n >= i.items.length && 0 == i.rwd && (t = i.data);
            }
            return t;
        };
        e.prototype.showNext = function() {
            this.curItem = this.getNextData();
            if (null != this.curItem) {
                l.utils.showEffect(this, 0);
                if (this.curItem) {
                    var t = new n.ItemSlotData();
                    if (this.curItem.number) {
                        this.nodeLook.active = this.nodeTake.active = !1;
                        this.nodeGroup.active = !0;
                        t.id = this.curItem.photo;
                        this.item.data = t;
                        this.lblName.string = this.curItem.name;
                        this.lblScore.string = "";
                    } else {
                        var e =
                            r.bagProxy.getItemCount(this.curItem.itemid) <= 0;
                        this.nodeTake.active = !e;
                        this.nodeLook.active = e;
                        this.nodeGroup.active = !1;
                        t.id = this.curItem.itemid;
                        this.item.data = t;
                        var o = r.treasureProxy.tItems[this.curItem.itemid],
                            i = o && 1 == o.rwd;
                        this.lblScore.string = i18n.t("TREASURE_SCORE_ADD", {
                            v: i ? this.curItem.twopoints : this.curItem.points
                        });
                    }
                }
            } else l.utils.closeView(this);
        };
        e.prototype.onClickGroup = function() {
            r.treasureProxy.sendRwd(this.curItem.id);
        };
        e.prototype.onClickPost = function() {
            r.treasureProxy.sendTreasure(this.curItem.id);
        };
        e.prototype.onClickLook = function() {
            r.treasureProxy.sendClipTrea(this.curItem.id);
        };
        e.prototype.onClickClose = function() {
            l.utils.closeView(this);
        };
        __decorate([c(i.default)], e.prototype, "item", void 0);
        __decorate([c(cc.Node)], e.prototype, "nodeTake", void 0);
        __decorate([c(cc.Node)], e.prototype, "nodeLook", void 0);
        __decorate([c(cc.Node)], e.prototype, "nodeGroup", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblScore", void 0);
        return (e = __decorate([s], e));
    })(cc.Component);
o.default = _;
