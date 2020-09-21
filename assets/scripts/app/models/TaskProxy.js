var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../Initializer"),
    n = require("../utils/Utils"),
    l = (function() {
        function t() {
            this.mainTask = null;
            this.MAIN_TASK_REFESH = "MAIN_TASK_REFESH";
            this._isDelayShowTask = !1;
            this._lastCount = 0;
        }
        t.prototype.ctor = function() {
            JsonHttp.subscribe(proto_sc.task.tmain, this.onMainTask, this);
        };
        t.prototype.clearData = function() {
            this.mainTask = null;
        };
        t.prototype.onMainTask = function(t) {
            var e = null != this.mainTask;
            this.mainTask = t;
            facade.send(this.MAIN_TASK_REFESH);
            if (
                !this._isDelayShowTask &&
                e &&
                0 != this.mainTask.num &&
                this._lastCount != this.mainTask.num
            ) {
                var o = localcache.getItem(localdb.table_mainTask, t.id);
                (o && this.isFiltTaskType(o.type) && t.num < t.max) ||
                    n.utils.openPrefabView("TaskFinishTip", !0);
            }
            this._lastCount = this.mainTask.num;
        };
        t.prototype.setDelayShow = function(t, e) {
            void 0 === e && (e = !0);
            this._isDelayShowTask = t;
            if (!this._isDelayShowTask && e && 0 != this.mainTask.num) {
                var o = localcache.getItem(
                    localdb.table_mainTask,
                    this.mainTask.id
                );
                (o &&
                    this.isFiltTaskType(o.type) &&
                    this.mainTask.num < this.mainTask.max) ||
                    n.utils.openPrefabView("TaskFinishTip", !0);
            }
        };
        t.prototype.sendRecvMain = function() {
            var t = new proto_cs.task.taskdo();
            t.id = this.mainTask.id;
            JsonHttp.send(t, function() {
                i.timeProxy.floatReward(!1);
            });
        };
        t.prototype.isFiltTaskType = function(t) {
            return 7 == t || 48 == t || 49 == t || 52 == t;
        };
        t.prototype.getCurPower = function() {
            var t = localcache.getList(localdb.table_power),
                e = this.mainTask ? this.mainTask.id : 0,
                o = null;
            if (1 == e) o = t[0];
            else
                for (var i = 0; i < t.length; i++) {
                    var n = t[i < t.length - 1 ? i + 1 : i],
                        l = t[i];
                    if (l.taskid < e && e <= n.taskid) {
                        o = l;
                        break;
                    }
                }
            return null == o ? t[t.length - 1] : o;
        };
        return t;
    })();
o.TaskProxy = l;
