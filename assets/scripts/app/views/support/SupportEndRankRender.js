var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../user/UserHeadItem"),
    l = require("../../Initializer"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblRank = null;
            e.lblName = null;
            e.lblGx = null;
            e.headItem = null;
            e.bgSprite = null;
            e.bgArr = [];
            e.rankSprite = null;
            e.rankArr = [];
            e.rankNode = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                this.lblRank.string = t.rid + "";
                this.lblName.string = t.name;
                this.lblGx.string = t.num + "";
                this.headItem.setUserHead(t.job, t.headavatar);
                this.bgSprite.spriteFrame =
                    t.rid > 3 ? this.bgArr[3] : this.bgArr[t.rid - 1];
                t.rid < 4 &&
                    (this.rankSprite.spriteFrame = this.rankArr[t.rid - 1]);
                this.rankNode.active = t.rid > 3;
                this.rankSprite.node.active = t.rid < 4;
            }
        };
        e.prototype.onClickHead = function() {
            var t = this._data;
            l.playerProxy.sendGetOther(t.uid);
        };
        __decorate([s(cc.Label)], e.prototype, "lblRank", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblGx", void 0);
        __decorate([s(n.default)], e.prototype, "headItem", void 0);
        __decorate([s(cc.Sprite)], e.prototype, "bgSprite", void 0);
        __decorate([s([cc.SpriteFrame])], e.prototype, "bgArr", void 0);
        __decorate([s(cc.Sprite)], e.prototype, "rankSprite", void 0);
        __decorate([s([cc.SpriteFrame])], e.prototype, "rankArr", void 0);
        __decorate([s(cc.Node)], e.prototype, "rankNode", void 0);
        return (e = __decorate([a], e));
    })(i.default);
o.default = c;
