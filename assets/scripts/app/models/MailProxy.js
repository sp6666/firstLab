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
            this.mailList = [];
        }
        t.prototype.ctor = function() {
            JsonHttp.subscribe(proto_sc.mail.mailList, this.onMailList, this);
        };
        t.prototype.clearData = function() {
            this.mailList = null;
        };
        t.prototype.onMailList = function(t) {
            null == this.mailList
                ? (this.mailList = t)
                : i.utils.copyList(this.mailList, t);
            l.default.change("mail", this.hasNewMail());
            facade.send("MAIL_UPDATE");
        };
        t.prototype.sendGetMail = function() {
            JsonHttp.send(new proto_cs.mail.getMail(), function() {
                i.utils.openPrefabView("mail/Mail");
            });
        };
        t.prototype.sendReadMail = function(t) {
            var value = this.getMail(t);
            var e = new proto_cs.mail.redMails();
            e.mid = t;
            JsonHttp.send(e, function() {
                n.timeProxy.floatReward();
                if(value && value.items.length > 0)
                {
                    //特殊处理 提示974道具
                    var item974 = null;
                    for(var idx = 0; idx < value.items.length; idx++)
                    {
                        if(value.items[idx].id == 974)
                        {
                            item974 = value.items[idx];
                        }
                    }

                    if(item974)
                    {
                        var itemCfg = localcache.getItem(localdb.table_item, item974.id);
                        i.alertUtil.alert(i18n.t("CONFIDANTE_STRENGTH_GET",{num:item974.count, name:itemCfg.name}));
                    }
                }
            });
        };
        t.prototype.sendDelete = function(t) {
            var e = new proto_cs.mail.delMail();
            e.mid = t;
            var o = this;
            JsonHttp.send(e, function() {
                var t = o.getMail(e.mid),
                    i = o.mailList.indexOf(t);
                o.mailList.splice(i, 1);
                facade.send("MAIL_UPDATE");
            });
        };
        t.prototype.sendDeleteAll = function() {
            var t = this;
            JsonHttp.send(new proto_cs.mail.delMails(), function() {
                for (var e = [], o = 0; o < t.mailList.length; o++)
                    0 == t.mailList[o].rts && e.push(t.mailList[o]);
                t.mailList = e;
                facade.send("MAIL_UPDATE");
            });
        };
        t.prototype.sendOpenMail = function(t) {
            var e = new proto_cs.mail.openMails();
            e.mid = t;
            JsonHttp.send(e);
        };
        t.prototype.getMail = function(t) {
            for (var e = 0; e < this.mailList.length; e++)
                if (this.mailList[e].id == t) return this.mailList[e];
            return null;
        };
        t.prototype.getMailNum = function(t) {
            for (var e = 0, o = 0; o < this.mailList.length; o++)
                t
                    ? this.mailList[o].rts > 0 && e++
                    : (this.mailList[o].rts <= 0 ||
                          null == this.mailList[o].rts) &&
                      e++;
            return e;
        };
        t.prototype.sortList = function(t, e) {
            var o = t.rts > 0 ? 1 : 0,
                i = e.rts > 0 ? 1 : 0;
            return o != i ? o - i : e.fts - t.fts;
        };
        t.prototype.getMailContent = function(t) {
            for (var e = "", o = (t + "").split("|"), i = 0; i < o.length; i++)
                i18n.has(o[i]) ? (e += i18n.t(o[i])) : (e += o[i]);
            return e;
        };
        t.prototype.hasNewMail = function() {
            for (var t = !1, e = 0; e < this.mailList.length; e++)
                if (0 == this.mailList[e].rts) {
                    t = !0;
                    break;
                }
            return t;
        };
        return t;
    })();
o.MailProxy = r;
