var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../Initializer"),
    n = require("../../Config"),
    l = require("../../utils/Utils"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.textLabel = null;
            e.textLabel1 = null;
            e.nodeOver = null;
            e.nodePer = null;
            return e;
        }
        e.prototype.onLoad = function() {
            this.updateShow();
            facade.subscribe(
                i.taskProxy.MAIN_TASK_REFESH,
                this.updateShow,
                this
            );
        };
        e.prototype.updateShow = function() {
            this.unscheduleAllCallbacks();
            l.utils.showEffect(this, 0);
            var t = i.taskProxy.mainTask,
                e = localcache.getItem(localdb.table_mainTask, t.id + "");
            this.nodeOver.active = t.num >= t.max;
            this.nodePer.active = t.num < t.max;
            e && i.taskProxy.isFiltTaskType(e.type)
                ? (this.textLabel1.string = this.textLabel.string = e
                      ? i18n.t(
                            n.Config.DEBUG
                                ? "MAIN_TASK_SHOW"
                                : "MAIN_TASK_UNID_SHOW",
                            {
                                id: t.id,
                                t: e.name,
                                c: t.num < t.max ? 0 : 1,
                                m: 1
                            }
                        )
                      : i18n.t("MAIN_TASK_OVER"))
                : (this.textLabel1.string = this.textLabel.string = e
                      ? i18n.t(
                            n.Config.DEBUG
                                ? "MAIN_TASK_SHOW"
                                : "MAIN_TASK_UNID_SHOW",
                            {
                                id: t.id,
                                t: e.name,
                                c: t.num,
                                m: t.max
                            }
                        )
                      : i18n.t("MAIN_TASK_OVER"));
            this.scheduleOnce(this.onTimer, 2);
        };
        e.prototype.onTimer = function() {
            l.utils.closeView(this);
        };
        __decorate([s(cc.Label)], e.prototype, "textLabel", void 0);
        __decorate([s(cc.Label)], e.prototype, "textLabel1", void 0);
        __decorate([s(cc.Node)], e.prototype, "nodeOver", void 0);
        __decorate([s(cc.Node)], e.prototype, "nodePer", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;
