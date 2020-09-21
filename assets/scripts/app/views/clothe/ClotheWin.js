var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RoleSpine"),
    n = require("../../Initializer"),
    l = require("../../utils/Utils"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.roleSpine = null;
            e.lblScore = null;
            e.lblScore1 = null;
            e.nodeWin = null;
            e.nodeLost = null;
            e.spWin = null;
            e.spLost = null;
            e.curData = null;
            return e;
        }
        e.prototype.onLoad = function() {
            this.curData = this.node.openParam;
            var t = n.playerProxy.userData;
            this.roleSpine.setClothes(
                t.sex,
                t.job,
                t.level,
                this.curData == null ? n.clothePveProxy.win : this.curData
            );
            this.lblScore1.string = this.lblScore.string = i18n.t(
                "CLOTHE_PVE_WIN_SCORE",
                {
                    d: this.curData == null ? n.clothePveProxy.win.score : this.curData.score
                }
            );
            this.spWin.node.active = this.nodeWin.active = 1 == (this.curData == null ? n.clothePveProxy.win.iswin : this.curData.iswin);
            this.spLost.node.active = this.nodeLost.active = 1 != (this.curData == null ? n.clothePveProxy.win.iswin : this.curData.iswin);
            1 == (this.curData == null ? n.clothePveProxy.win.iswin : this.curData.iswin)
                ? (this.spWin.animation = "animation")
                : (this.spLost.animation = "shibai");
            this.scheduleOnce(this.delayShow, 2);
        };
        e.prototype.delayShow = function() {
            if (1 == (this.curData == null ? n.clothePveProxy.win.iswin : this.curData.iswin)) {
                this.spWin.loop = !0;
                this.spWin.animation = "animation2";
            } else {
                this.spLost.loop = !0;
                this.spLost.animation = "shibai2";
            }
        };
        e.prototype.onClickClost = function() {
            l.utils.closeView(this);
            n.timeProxy.floatReward();
        };
        __decorate([s(i.default)], e.prototype, "roleSpine", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblScore", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblScore1", void 0);
        __decorate([s(cc.Node)], e.prototype, "nodeWin", void 0);
        __decorate([s(cc.Node)], e.prototype, "nodeLost", void 0);
        __decorate([s(sp.Skeleton)], e.prototype, "spWin", void 0);
        __decorate([s(sp.Skeleton)], e.prototype, "spLost", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;
