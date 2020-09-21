var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../utils/Utils"),
    n = require("../Initializer"),
    l = require("../component/RedDot"),
    r = (function() {
        function t() {
            this.UPDATE_BOOK_LIST = "UPDATE_BOOK_LIST";
            this.UPDATE_BOOK_BASE = "UPDATE_BOOK_BASE";
            this.UPDATE_BOOK_LEVEL = "UPDATE_BOOK_LEVEL";
            this.list = null;
            this.base = null;
            this.level = null;
        }
        t.prototype.ctor = function() {
            JsonHttp.subscribe(proto_sc.school.list, this.onList, this);
            JsonHttp.subscribe(proto_sc.school.base, this.onBase, this);
            JsonHttp.subscribe(proto_sc.school.level, this.onLevel, this);
        };
        t.prototype.clearData = function() {
            this.list = null;
            this.base = null;
            this.level = null;
        };
        t.prototype.onLevel = function(t) {
            this.level = t;
            facade.send(this.UPDATE_BOOK_LEVEL);
        };
        t.prototype.onList = function(t) {
            null == this.list
                ? (this.list = t)
                : i.utils.copyList(this.list, t);
            this.updateRed();
            facade.send(this.UPDATE_BOOK_LIST);
        };
        t.prototype.updateRed = function() {
            for (var t = !1, e = 0; e < this.list.length; e++) {
                var o = this.list[e];
                if (
                    o &&
                    0 != o.hid &&
                    (o.cd.next < i.timeUtil.second || 0 == o.cd.next)
                ) {
                    t = !0;
                    break;
                }
            }
            l.default.change("book_get", t);
        };
        t.prototype.onBase = function(t) {
            this.base = t;
            this.createSeat();
            facade.send(this.UPDATE_BOOK_BASE);
        };
        t.prototype.createSeat = function() {
            if (
                null == this.list ||
                0 == this.list.length ||
                this.list.length != this.base.desk
            ) {
                null == this.list && (this.list = []);
                for (var t = this.list.length; t < this.base.desk; t++) {
                    var e = {};
                    e.id = t + 1;
                    e.hid = 0;
                    e.cd = {};
                    e.cd.next = 0;
                    e.cd.label = "";
                    this.list.push(e);
                }
            }
        };
        t.prototype.sendAllOver = function() {
            JsonHttp.send(new proto_cs.school.allover());
        };
        t.prototype.sendBuyDesk = function() {
            new proto_cs.school.buydesk();
            JsonHttp.send(new proto_cs.school.buydesk());
        };
        t.prototype.sendOver = function(t) {
            var e = new proto_cs.school.over();
            e.id = t;
            JsonHttp.send(e, function() {
                n.timeProxy.floatReward();
            });
        };
        t.prototype.sendStart = function(t, e) {
            var o = new proto_cs.school.start();
            o.id = e;
            o.hid = t;
            JsonHttp.send(o);
        };
        t.prototype.sendOneKyOver = function() {
            JsonHttp.send(new proto_cs.school.allover(), function() {
                n.timeProxy.floatReward();
            });
        };
        t.prototype.sendOneKeyStudy = function(t) {
            var e = new proto_cs.school.yjStart();
            e.arr = t;
            JsonHttp.send(e);
        };
        return t;
    })();
o.BookProxy = r;
