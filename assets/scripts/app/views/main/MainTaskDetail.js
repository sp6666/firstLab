var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = require("../../component/List"),
    l = require("../../Initializer"),
    r = require("../../models/TimeProxy"),
    a = require("../../Config"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.list = null;
            e.nodeBtn = null;
            e.nodeGo =null;
            e.lblName = null;
            e.lblDes = null;
            e.lblTarget = null;
            e.prg = null;
            e.isTrigMain = !0;
            return e;
        }
        e.prototype.onLoad = function() {
            this.isTrigMain = null == this.node.openParam;
            facade.subscribe(l.taskProxy.MAIN_TASK_REFESH, this.onRefresh, this);
            this.onRefresh();
        };
        e.prototype.onClickClose = function() {
            i.utils.closeView(this);
            l.playerProxy.updateRoleLvupRed();
            this.isTrigMain &&
                facade.send(l.guideProxy.UPDATE_TRIGGER_GUIDE, {
                    type: 3,
                    value: l.taskProxy.mainTask.id
                });
        };
        e.prototype.onClickRwd = function() {
            facade.send(l.guideProxy.UPDATE_TRIGGER_GUIDE, {
                type: 7,
                value: l.taskProxy.mainTask.id
            });
            l.taskProxy.sendRecvMain();
        };
        e.prototype.onClickGo = function() {
            this.onClickClose();
            var t = l.taskProxy.mainTask,
                e = localcache.getItem(localdb.table_mainTask, t.id + "");
            if (e) {
                r.funUtils.openView(e.jumpTo);
                e.jumpTo != r.funUtils.battleView.id &&
                    facade.send("MAIN_TASK_OPEN");
            }
        };
        e.prototype.onRefresh = function() {
            var t = l.taskProxy.mainTask,
                e = localcache.getItem(localdb.table_mainTask, t.id + "");
            if (e) {
                var o = l.taskProxy.isFiltTaskType(e.type);
                this.lblName.string = i18n.t(
                    a.Config.DEBUG ? "MAIN_TASK_TITLE" : "MAIN_TASK_UNID_TITLE",
                    {
                        id: t.id,
                        t: e.name
                    }
                );
                this.lblDes.string = e.msg;
                t.max = 0 == t.max ? 1 : t.max;
                this.lblTarget.string = o
                    ? i18n.t("COMMON_NUM", {
                          f: t.num < t.max ? 0 : 1,
                          s: 1
                      })
                    : i18n.t("COMMON_NUM", {
                          f: t.num,
                          s: t.max
                      });
                this.list.data = this.getRwd(e.rwd);
                this.list.node.x = -this.list.node.width / 2;
                this.nodeBtn.active = t.num >= t.max;
                this.nodeGo.active =!this.nodeBtn.active;
                var i = o ? (t.num < t.max ? 0 : 1) : t.num / t.max;
                i = i > 1 ? 1 : i;
                this.prg.progress = i;
            }
        };
        e.prototype.getRwd = function(t) {
            for (var e = [], o = 0; o < t.length; o++)
                (2 == t[o].kind && 100 == t[o].id) || e.push(t[o]);
            return e;
        };
        __decorate([_(n.default)], e.prototype, "list", void 0);
        __decorate([_(cc.Node)], e.prototype, "nodeBtn", void 0);
        __decorate([_(cc.Node)], e.prototype, "nodeGo", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblDes", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblTarget", void 0);
        __decorate([_(cc.ProgressBar)], e.prototype, "prg", void 0);
        __decorate([_], e.prototype, "isTrigMain", void 0);
        return (e = __decorate([c], e));
    })(cc.Component);
o.default = d;
