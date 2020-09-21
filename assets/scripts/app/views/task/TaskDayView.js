var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("./TaskDayRwdItem"),
    n = require("../../component/List"),
    l = require("../../Initializer"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblScore = null;
            e.rwds = [];
            e.prg = null;
            e.list = null;
            e.pers = [0.1, 0.32, 0.53, 0.75, 0.95];
            return e;
        }
        e.prototype.onLoad = function() {
            var t = localcache.getList(localdb.table_dailyRwd);
            t.sort(function(t, e) {
                return t.id - e.id;
            });
            for (var e = 0; e < this.rwds.length; e++)
                this.rwds[e].data = t.length > e ? t[e] : null;
            this.updateTask();
            facade.subscribe(
                l.achievementProxy.UPDATE_DAILY,
                this.updateShow,
                this
            );
            facade.subscribe(
                l.achievementProxy.UPDATE_REWARD,
                this.updateRwd,
                this
            );
        };
        e.prototype.updateShow = function() {
            this.updateRwd();
            this.updateTask();
        };
        e.prototype.updateRwd = function() {
            for (var t = 0; t < this.rwds.length; t++)
                this.rwds[t].data = this.rwds[t].data;
        };
        e.prototype.updateTask = function() {
            for (
                var t = localcache.getList(localdb.table_dailyTask),
                    e = {},
                    o = [],
                    i = 0;
                i < t.length;
                i++
            ) {
                var n = t[i].id,
                    r = l.achievementProxy.getDailyTask(n);
                if (r) {
                    e[n] = r;
                    o.push(t[i]);
                }
            }
            o.sort(function(t, o) {
                var i = e[t.id],
                    n = e[o.id],
                    l = i ? i.num : 0,
                    r = n ? n.num : 0;
                return (
                    (l >= t.num ? -1e3 : 0) +
                    (i && 1 == i.rwd ? 1e4 : 0) +
                    t.id -
                    ((r >= o.num ? -1e3 : 0) +
                        (n && 1 == n.rwd ? 1e4 : 0) +
                        o.id)
                );
            });
            this.list.data = o;
            this.prg.progress = this.getPrg();
            this.lblScore.string = i18n.t("ACHIEVE_DAILY_SCORE", {
                c: l.achievementProxy.score
            });
        };
        e.prototype.getPrg = function() {
            var t = localcache.getList(localdb.table_dailyRwd);
            t.sort(function(t, e) {
                return t.id - e.id;
            });
            for (var e = l.achievementProxy.score, o = 0; o < t.length; o++)
                if (t[o].need > e) {
                    var i = o > 0 ? t[o].need - t[o - 1].need : t[o].need;
                    return (
                        (o > 0 ? this.pers[o - 1] : 0) +
                        (o > 0 ? (e - t[o - 1].need) / i : e / i) *
                            (o > 0
                                ? this.pers[o] - this.pers[o - 1]
                                : this.pers[0])
                    );
                }
            return 1;
        };
        __decorate([s(cc.Label)], e.prototype, "lblScore", void 0);
        __decorate([s([i.default])], e.prototype, "rwds", void 0);
        __decorate([s(cc.ProgressBar)], e.prototype, "prg", void 0);
        __decorate([s(n.default)], e.prototype, "list", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;
