var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../Initializer"),
    l = require("../../utils/ShaderUtils"),
    r = require("../../utils/Utils"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblName = null;
            e.lblCount = null;
            e.lblNext = null;
            e.lblParam = null;
            e.bg = null;
            e.nodeAnswer = null;
            e.nodeRwd = null;
            e.nodeUnlock = null;
            return e;
        }
        e.prototype.onClickRwd = function() {
            var t = this._data;
            t && r.utils.openPrefabView("achieve/TaskDayRwdView", !1, t);
        };
        e.prototype.onClickAnswer = function() {
            var t = this._data;
            if (t) {
                var e = n.achievementProxy.getKejuType(t.id);
                if (null == e || (e.num < 1 && 0 == e.answer)) {
                    r.alertUtil.alert18n("KEJU_COUNT_TIP");
                    return;
                }
                0 == e.answer && n.achievementProxy.sendAnswer(1e4 * t.id);
                r.utils.openPrefabView("achieve/KejuAnswer", !1, t);
            }
        };
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                var e = n.achievementProxy.getKejuType(t.id);
                this.lblName.string = t.name;
                this.nodeRwd.active = this.nodeAnswer.active =
                    1 == t.id || 2 == t.id;
                l.shaderUtils.setImageGray(this.bg, !this.nodeRwd.active);
                this.nodeUnlock.active = !this.nodeRwd.active;
                if (1 == t.id) {
                    this.lblCount.string = i18n.t("KEJU_REMAIN_DAY_COUNT", {
                        d: e ? e.num : 0
                    });
                    for (
                        var o = n.achievementProxy.score, i = 0, r = 0, a = 0;
                        a < t.ticket.length;
                        a++
                    ) {
                        var s = t.ticket[a];
                        i = i < s.value ? s.value : i;
                        if (s.value > o) {
                            r = s.value;
                            break;
                        }
                    }
                    this.lblNext.string =
                        0 != r
                            ? i18n.t("KEJU_NEXT_DES1", {
                                  d: r
                              })
                            : i18n.t("KEJU_MAX_HUOYUE");
                    this.lblParam.string = i18n.t("KEJU_NEXT_PARAM1", {
                        d: o
                    });
                } else {
                    this.lblCount.string = i18n.t("KEJU_REMAIN_COUNT", {
                        d: e ? e.num : 0
                    });
                    var c = localcache.getItem(
                            localdb.table_exam_type,
                            t.ticket[0].type - 1
                        ),
                        _ = n.achievementProxy.getKejuType(
                            t.ticket[0].type - 1
                        ),
                        d = _
                            ? t.ticket[0].value *
                              Math.ceil((_.count + 1) / t.ticket[0].value)
                            : t.ticket[0].value;
                    this.lblNext.string = i18n.t("KEJU_NEXT_DES2", {
                        d: d,
                        n: c ? c.name : ""
                    });
                    this.lblParam.string = i18n.t("KEJU_NEXT_PARAM2", {
                        d: _ ? _.count : 0,
                        n: c ? c.name : ""
                    });
                    1 != t.id &&
                        2 != t.id &&
                        (this.lblNext.string = this.lblParam.string = "");
                }
            }
        };
        __decorate([c(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblCount", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblNext", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblParam", void 0);
        __decorate([c(cc.Sprite)], e.prototype, "bg", void 0);
        __decorate([c(cc.Node)], e.prototype, "nodeAnswer", void 0);
        __decorate([c(cc.Node)], e.prototype, "nodeRwd", void 0);
        __decorate([c(cc.Node)], e.prototype, "nodeUnlock", void 0);
        return (e = __decorate([s], e));
    })(i.default);
o.default = _;
