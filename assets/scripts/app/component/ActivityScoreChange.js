var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("./List"),
    n = require("../utils/Utils"),
    l = require("../Initializer"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblScore = null;
            e.list = null;
            e.score = 0;
            e.cList = [];
            e.activityId = 0;
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe(
                "ACTIVITY_SCORE_CHANGE_LIST_UPDATE",
                this.updateClist,
                this
            );
            facade.subscribe(
                "ACTIVITY_SCORE_CHANEG_SCORE_UPDATE",
                this.updateScore,
                this
            );
            var t = this.node.openParam;
            this.score = t.score;
            this.cList = t.list;
            this.activityId = t.activityId;
            this.updateClist(null);
            this.updateScore(null);
        };
        e.prototype.updateClist = function(t) {
            this.list.data = t || this.cList;
        };
        e.prototype.updateScore = function(t) {
            this.lblScore.string = i18n.t("LUCKY_JI_FEN_TXT", {
                num: t || this.score
            });
        };
        e.prototype.onClickChange = function(t, e) {
            var o = e.data;
            if (o) {
                if (o.is_limit && o.limit <= 0) {
                    n.alertUtil.alert18n("JINGYING_COUNT_LIMIT");
                    return;
                }
                if (this.score < o.need) {
                    n.alertUtil.alert18n("BOITE_EXCHANGE_SCORE_SHORT");
                    return;
                }
                l.limitActivityProxy.sendScoreChange(this.activityId, o.id);
            }
        };
        e.prototype.onClickClose = function() {
            n.utils.closeView(this);
        };
        __decorate([s(cc.Label)], e.prototype, "lblScore", void 0);
        __decorate([s(i.default)], e.prototype, "list", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;
