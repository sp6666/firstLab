var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = require("../../component/SliderCount"),
    l = require("../../Initializer"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblSolder = null;
            e.lblCost = null;
            e.silderCount = null;
            e.waves = {};
            e.maxId = 0;
            return e;
        }
        e.prototype.onLoad = function() {
            var t = l.playerProxy.userData;
            this.lblSolder.string = i.utils.formatMoney(t.army);
            var e = this;
            this.silderCount.changeHandler = function() {
                e.lblCost.string =
                    e.waves[
                        l.taofaProxy.playerInfo.gid + e.silderCount.curValue
                    ];
            };
        };
        e.prototype.updateCount = function() {
            this.silderCount.showMmin = l.taofaProxy.playerInfo.gid;
            this.silderCount.max = this.maxId - l.taofaProxy.playerInfo.gid;
            this.genMaxWave();
            this.lblCost.string = this.waves[
                l.taofaProxy.playerInfo.gid + this.silderCount.curValue
            ];
        };
        e.prototype.onClickClost = function() {
            this.node.active = !1;
        };
        e.prototype.genMaxWave = function() {
            var t = l.playerProxy.userData,
                e = l.playerProxy.userEp.e1,
                o = localcache.getList(localdb.table_taofaChaper),
                i = 0;
            this.maxId = 0;
            for (var n = 0; n < o.length; n++) {
                var r = o[n];
                if (r.id >= l.taofaProxy.playerInfo.gid) {
                    var a = parseFloat(r.army);
                    i += Math.ceil(Math.max(((a * a) / e) * 0.101, 0.26 * a));
                    if (t.army > i) {
                        this.waves[r.id] = i;
                        this.maxId = r.id > this.maxId ? r.id : this.maxId;
                    }
                }
            }
        };
        __decorate([s(cc.Label)], e.prototype, "lblSolder", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblCost", void 0);
        __decorate([s(n.default)], e.prototype, "silderCount", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;
