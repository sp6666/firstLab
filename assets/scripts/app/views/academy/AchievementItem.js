var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../Initializer"),
    l = require("../../utils/Utils"),
    r = require("../../component/UrlLoad"),
    a = require("../../utils/UIUtils"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.node_Doing = null;
            e.node_Fishing = null;
            e.nodeGet = null;
            e.img = null;
            e.bar = null;
            e.label = null;
            e.lblName = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                this.lblName.string = t.title;
                this.label.string = t.isOver
                    ? ""
                    : i18n.t("COMMON_NUM", {
                          f: t.num,
                          s: t.need
                      });
                this.bar.progress = t.isOver ? 1 : t.percent;
                this.nodeGet.active = t.percent >= 1 && !t.isOver;
                this.node_Doing.active = t.percent < 1 && !t.isOver;
                this.node_Fishing.active = t.isOver;
                this.img.url = a.uiHelps.getAchieveIcon(t.id);
            }
        };
        e.prototype.onClickGet = function() {
            var t = this._data;
            t && n.achievementProxy.sendGetRwd(t.id);
        };
        e.prototype.onClickDetail = function(t, e) {
            var o = this._data;
            if (o) {
                n.achievementProxy.setSelectInfo(o.id);
                n.achievementProxy.selectDetail &&
                    l.utils.openPrefabView("achieve/AchieveDetail");
            }
        };
        e.prototype.onClickGo = function() {
            this._data;
        };
        __decorate([_(cc.Node)], e.prototype, "node_Doing", void 0);
        __decorate([_(cc.Node)], e.prototype, "node_Fishing", void 0);
        __decorate([_(cc.Node)], e.prototype, "nodeGet", void 0);
        __decorate([_(r.default)], e.prototype, "img", void 0);
        __decorate([_(cc.ProgressBar)], e.prototype, "bar", void 0);
        __decorate([_(cc.Label)], e.prototype, "label", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblName", void 0);
        return (e = __decorate([c], e));
    })(i.default);
o.default = d;
