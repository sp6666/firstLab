var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("../../Initializer"),
    l = require("../../utils/Utils"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblTxt = null;
            e.rankList = null;
            e.lblRank = null;
            e.lblHurt = null;
            e.lblGx = null;
            e.lblName = null;
            return e;
        }
        e.prototype.onLoad = function() {
            this.lblTxt.string = i18n.t("UNION_KILL_BOSS_TXT", {
                name1: n.unionProxy.fightRank.kill,
                name2: n.unionProxy.openCopyParam.name,
                num: n.unionProxy.openCopyParam.rwd.exp
            });
            this.rankList.data = n.unionProxy.fightRank.list;
            this.lblRank.string = n.unionProxy.myFightRankInfo.rid + "";
            this.lblGx.string = n.unionProxy.myFightRankInfo.gx + "";
            this.lblHurt.string = n.unionProxy.myFightRankInfo.hit + "";
            this.lblName.string = n.playerProxy.userData.name;
        };
        e.prototype.onClickClose = function() {
            l.utils.closeView(this);
        };
        __decorate([s(cc.Label)], e.prototype, "lblTxt", void 0);
        __decorate([s(i.default)], e.prototype, "rankList", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblRank", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblHurt", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblGx", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblName", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;
