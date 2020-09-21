var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../utils/Utils"),
    n = require("../component/RedDot"),
    l = require("../Initializer"),
    a = (function () {
        function t() {

            this.data = null;
            this.scoreBase = 40;

            this.OLD_USERS_PRO_BACK = "OLD_USERS_PRO_BACK";

        }
        t.prototype.ctor = function () {

            JsonHttp.subscribe(proto_sc.Activity.present, this.onDataUpdate, this);
        };

        t.prototype.clearData = function () {
            this.data = null;
        };

        t.prototype.onDataUpdate = function (t) {
            if (t) {
                this.data = t;
                this.sendUIChange();
            }
        };

        t.prototype.sendUIChange = function () {
            facade.send(this.OLD_USERS_PRO_BACK);
            this.updateRedDot();
        };

        t.prototype.sendActivityRwd = function (id) {
            var e = new proto_cs.huodong.hd6281Rwd();
            JsonHttp.send(e, function () {
                l.timeProxy.floatReward();
            });
        };

        t.prototype.sendInfoCmd = function () {
            JsonHttp.send(new proto_cs.huodong.hd6281Info());
        };



        t.prototype.updateRedDot = function () {
            var bActivity = false;

            //活跃bActivity
            if (this.data) {
                if (this.data.cons >= this.data.rwd * this.scoreBase + this.scoreBase && this.data.rwd < this.data.cfg.rwd.length) {
                    bActivity = true;
                }
            }

            n.default.change("normalUsers_seven_gift", bActivity);
        };

        return t;
    })();
o.OldUsersProProxy = a;