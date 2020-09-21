var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../Initializer"),
    n = require("../utils/Utils"),
    l = require("../component/RedDot"),
    r = (function() {
        function t() {
            this.UPDATE_READ = "UPDATE_READ";
            this.list = null;
            this.sonFeigeList = null;
            this.lookSonFeige = !1;
            this.sonFeigeData = null;
            this.readingSonMail = !1;
        }
        t.prototype.ctor = function() {
            JsonHttp.subscribe(proto_sc.feige.feige, this.onFeige, this);
            JsonHttp.subscribe(proto_sc.feige.sonFeige, this.onSonFeige, this);
        };
        t.prototype.onFeige = function(t) {
            null == this.list
                ? (this.list = t)
                : n.utils.copyList(this.list, t);
            facade.send(this.UPDATE_READ);
            this.updateRed();
        };
        t.prototype.updateRed = function() {
            l.default.change("feige", this.getIsHaveUnread());
        };
        t.prototype.clearData = function() {
            this.list = null;
            this.lookSonFeige = !1;
            this.sonFeigeList = null;
            this.sonFeigeData = null;
        };
        t.prototype.getFeigeData = function(t) {
            for (var e = 0; this.list && e < this.list.length; e++) {
                var o = this.list[e];
                if (o.id == t) return o;
            }
            var i = {};
            i.id = t;
            i.select = "";
            return i;
        };
        t.prototype.isOpenFeige = function(t) {
            switch (t.type) {
                case 1:
                    return i.playerProxy.userData.level >= t.param;

                case 2:
                    if (1 == t.fromtype) {
                        var e = i.servantProxy.getHeroData(t.heroid);
                        if (e && i.jibanProxy.getHeroJB(e.id) >= t.param)
                            return !0;
                    } else if (2 == t.fromtype) {
                        var o = i.wifeProxy.getWifeData(t.heroid);
                        if (o && i.jibanProxy.getWifeJB(o.id) >= t.param)
                            return !0;
                    }
                    break;

                case 3:
                    return i.playerProxy.userData.mmap > t.param;

                case 4:
                    return i.jibanProxy.isOverStory(t.param);

                case 5:
                    return i.taskProxy.mainTask.id > t.param;
            }
            return !1;
        };
        t.prototype.getOpenFeige = function() {
            for (
                var t = this,
                    e = localcache.getList(localdb.table_emailgroup),
                    o = [],
                    i = 0;
                i < e.length;
                i++
            )
                this.isOpenFeige(e[i]) && o.push(e[i]);
            var n = {};
            o.sort(function(e, o) {
                var i = n[e.id] ? n[e.id] : t.isRead(e.id),
                    l = n[o.id] ? n[o.id] : t.isRead(o.id);
                n[e.id] = i;
                n[o.id] = l;
                return i != l ? (i ? 1 : -1) : o.id - e.id;
            });
            return o;
        };
        t.prototype.isRead = function(t) {
            var e = this.getFeigeData(t),
                o = i.playerProxy.getEmailGroup(t, "group");
            return null != o && (e.select && e.select.length >= o.length);
        };
        t.prototype.getIsHaveUnread = function() {
            for (var t = this.getOpenFeige(), e = 0; e < t.length; e++)
                if (!this.isRead(t[e].id)) return !0;
            return !1;
        };
        t.prototype.sendReadFeige = function(t) {
            var e = new proto_cs.scpoint.emailStory();
            e.id = t;
            JsonHttp.send(e, function() {
                i.timeProxy.floatReward();
            });
        };
        t.prototype.sendReadSonFeige = function(t, e, o, n) {
            var l = this;
            void 0 === n && (n = !1);
            var r = new proto_cs.scpoint.emailSonStory();
            r.id = e;
            r.sid = t;
            r.time = o;
            JsonHttp.send(r, function(t) {
                if (n) {
                    null != l.getUnReadSonMail() &&
                        i.timeProxy.floatReward(!1, !0);
                    if (null == l.getUnReadSonMail()) {
                        i.timeProxy.floatAllReward();
                        i.feigeProxy.readingSonMail = !1;
                    }
                } else i.timeProxy.floatReward();
            });
        };
        t.prototype.sendGetSonFeige = function() {
            JsonHttp.send(new proto_cs.son.liLianMail());
        };
        t.prototype.sendOneKeyRead = function() {
            JsonHttp.send(new proto_cs.scpoint.yjEmailSonStory(), function() {
                i.timeProxy.floatReward();
            });
        };
        t.prototype.onSonFeige = function(t) {
            this.sonFeigeList = t;
            this.sonFeigeList.sort(function(t, e) {
                return (
                    (t.select.length > 0 ? 1 : 0) -
                    (e.select.length > 0 ? 1 : 0)
                );
            });
            l.default.change("sonMail", this.hasSonFeige());
            facade.send("UPDATE_READ_SON");
        };
        t.prototype.getSonFeige = function() {
            var t = [];
            if (this.sonFeigeList)
                for (var e = 0; e < this.sonFeigeList.length; e++) {
                    var o = this.getSonfeigeData(this.sonFeigeList[e].id);
                    o && t.push(o);
                }
            return t;
        };
        t.prototype.getSonfeigeData = function(t) {
            for (
                var e = localcache.getList(localdb.table_emailgroup),
                    o = null,
                    i = 0;
                i < e.length;
                i++
            )
                if (e[i].id == t) {
                    o = e[i];
                    break;
                }
            return o;
        };
        t.prototype.getSonFeigeItem = function(t, e, o) {
            for (var i = null, n = 0; n < this.sonFeigeList.length; n++)
                if (
                    this.sonFeigeList[n].id == t &&
                    this.sonFeigeList[n].sid == e &&
                    this.sonFeigeList[n].time == o
                ) {
                    i = this.sonFeigeList[n];
                    break;
                }
            return i;
        };
        t.prototype.hasSonFeige = function() {
            for (var t = !1, e = 0; e < this.sonFeigeList.length; e++)
                if (0 == this.sonFeigeList[e].select.length) {
                    t = !0;
                    break;
                }
            return t;
        };
        t.prototype.sendTalkStory = function(t, e, o) {
            var n = new proto_cs.scpoint.heroOrwifeStory();
            n.pid = t;
            n.type = e;
            n.id = o;
            JsonHttp.send(n, function() {
                i.timeProxy.floatReward();
            });
        };
        t.prototype.getUnReadSonMail = function() {
            for (var t = null, e = 0; e < this.sonFeigeList.length; e++)
                if (this.sonFeigeList[e].select.length <= 0) {
                    t = this.sonFeigeList[e];
                    break;
                }
            return t;
        };
        return t;
    })();
o.FeigeProxy = r;
var a = function() {
    this.id = 0;
    this.index = 0;
    this.selectList = null;
};
o.FeiGeData = a;
