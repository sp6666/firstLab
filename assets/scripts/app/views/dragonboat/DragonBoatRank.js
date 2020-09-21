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
            e.myRank = null;
            e.myName = null;
            e.myNum = null;
            e.list = null;
            e.btnRe = null;
            e.lblRe = null;
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe(
                n.dragonBoatProxy.DRAGON_BOAT_RANK_UPDATE,
                this.onRank,
                this
            );
            this.onRank();
            this.onTimer();
            this.schedule(this.onTimer, 1);
        };
        e.prototype.onClickClose = function() {
            l.utils.closeView(this);
        };
        e.prototype.onRank = function() {
            this.myRank.string =
                n.dragonBoatProxy.myRid.rid > 0
                    ? n.dragonBoatProxy.myRid.rid + ""
                    : i18n.t("RAKN_UNRANK");
            this.myName.string = n.playerProxy.userData.name;
            this.myNum.string = n.dragonBoatProxy.myRid.score + "";
            this.list.data = n.dragonBoatProxy.ranks;
        };
        e.prototype.onClickRe = function() {
            n.rankProxy.sendRefresh(n.dragonBoatProxy.cfg.info.id);
        };
        e.prototype.onTimer = function() {
            var t = l.timeUtil.second - n.rankProxy.lastTime;
            t >= 60 && (this.btnRe.interactable = !0);
            this.btnRe.interactable = t >= 60;
            this.lblRe.string =
                t >= 60
                    ? i18n.t("COMMON_REFRESH")
                    : i18n.t("FLOWER_SHENG_YU_SHI_JIAN", {
                          num: 60 - t
                      });
        };
        __decorate([s(cc.Label)], e.prototype, "myRank", void 0);
        __decorate([s(cc.Label)], e.prototype, "myName", void 0);
        __decorate([s(cc.Label)], e.prototype, "myNum", void 0);
        __decorate([s(i.default)], e.prototype, "list", void 0);
        __decorate([s(cc.Button)], e.prototype, "btnRe", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblRe", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;
