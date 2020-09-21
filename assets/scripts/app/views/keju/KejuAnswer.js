var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../Initializer"),
    n = require("../../utils/Utils"),
    l = require("../item/ItemSlotUI"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblType = null;
            e.lblTitle = null;
            e.lblQuest = null;
            e.lblAnswers = [];
            e.nodeEff = [];
            e.nodeRight = [];
            e.nodeError = [];
            e.item = null;
            e.lblCount = null;
            e.nodeRwd = null;
            e._curType = null;
            e._answers = null;
            e._curQuest = null;
            e._isShow = !1;
            return e;
        }
        e.prototype.onLoad = function() {
            this._curType = this.node.openParam;
            facade.subscribe(
                i.achievementProxy.UPDATE_KEJU,
                this.updateShow,
                this
            );
            this.updateShow();
        };
        e.prototype.updateShow = function() {
            if (!this._isShow && this._curType) {
                var t = i.achievementProxy.getKejuType(this._curType.id);
                this.lblType.string = this._curType.name;
                var e = t && t.answer ? t.answer : 1;
                this.lblTitle.string = i18n.t("KEJU_CUR_ANSWER", {
                    n: n.utils.getHanzi(e),
                    f: e,
                    s: this._curType.total
                });
                this.randQuest();
            }
        };
        e.prototype.randQuest = function() {
            for (
                var t = i.timeProxy.getLoacalValue("KEJU_ANSWER"),
                    e = n.stringUtil.isBlank(t) ? {} : JSON.parse(t),
                    o = this._curType.id,
                    l = i.achievementProxy.getKejuType(this._curType.id),
                    r = 0;
                r < this.nodeEff.length;
                r++
            )
                this.nodeEff[r].active = !1;
            if (l && e[o] && e[o].answer == l.answer)
                this._curQuest = localcache.getItem(
                    localdb.table_exam_quest,
                    e[o].id
                );
            else {
                var a = localcache.getGroup(
                        localdb.table_exam_quest,
                        "type",
                        o
                    ),
                    s = Math.floor(Math.random() * a.length);
                this._curQuest = a[s];
                e[o] = {
                    answer: l ? l.answer : 1,
                    id: this._curQuest.id
                };
                i.timeProxy.saveLocalValue("KEJU_ANSWER", JSON.stringify(e));
            }
            this.lblQuest.string = this._curQuest.question;
            this._answers = [];
            this._answers.push(this._curQuest.right);
            this._answers.push(this._curQuest.wrong1);
            this._answers.push(this._curQuest.wrong2);
            this._answers.sort(function(t, e) {
                return 10 * Math.random() < 5 ? 1 : -1;
            });
            for (r = 0; r < this.lblAnswers.length; r++)
                this.lblAnswers[r].string = this._answers[r];
        };
        e.prototype.onClickAnswer = function(t, e) {
            for (var o = parseInt(e) - 1, l = 0; l < this.nodeEff.length; l++)
                if (this.nodeEff[l].active) return;
            this.nodeEff[o].active = !0;
            n.utils.showNodeEffect(this.nodeEff[l]);
            var r = i.achievementProxy.getKejuType(this._curType.id),
                a = r ? r.error : 0;
            if (this._answers[o] == this._curQuest.right) {
                i.achievementProxy.sendAnswer(1e4 * this._curType.id + 1);
                this.nodeRight[o].active = !0;
                this.nodeError[o].active = !1;
            } else {
                i.achievementProxy.sendAnswer(1e4 * this._curType.id + 2);
                this.nodeRight[o].active = !1;
                this.nodeError[o].active = !0;
                a += 1;
            }
            a >= this._curType.lose && n.alertUtil.alert18n("KEJU_ERROR_MORE");
            this._isShow = !0;
            this.scheduleOnce(this.delayShow, 1);
        };
        e.prototype.delayShow = function() {
            this._isShow = !1;
            0 == i.achievementProxy.getKejuType(this._curType.id).answer
                ? this.onClickClost()
                : this.updateShow();
        };
        e.prototype.onClickClost = function() {
            n.utils.closeView(this);
        };
        __decorate([s(cc.Label)], e.prototype, "lblType", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblTitle", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblQuest", void 0);
        __decorate([s([cc.Label])], e.prototype, "lblAnswers", void 0);
        __decorate([s([cc.Node])], e.prototype, "nodeEff", void 0);
        __decorate([s([cc.Node])], e.prototype, "nodeRight", void 0);
        __decorate([s([cc.Node])], e.prototype, "nodeError", void 0);
        __decorate([s(l.default)], e.prototype, "item", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblCount", void 0);
        __decorate([s(cc.Node)], e.prototype, "nodeRwd", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;