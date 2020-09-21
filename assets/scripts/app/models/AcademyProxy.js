var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../utils/Utils"),
    n = (function() {
        function t() {
            this.deskList = [];
            this.info = null;
            this.deskInfo = null;
        }
        t.prototype.ctor = function() {
            JsonHttp.subscribe(proto_sc.hanlin.ting, this.onDeskList, this);
            JsonHttp.subscribe(proto_sc.hanlin.info, this.onInfo, this);
            JsonHttp.subscribe(proto_sc.hanlin.desk, this.onDesk, this);
            JsonHttp.subscribe(proto_sc.hanlin.win, this.onWin, this);
        };
        t.prototype.clearData = function() {
            this.deskList = null;
            this.info = null;
            this.deskInfo = null;
        };
        t.prototype.onDeskList = function(t) {
            null == this.deskList
                ? (this.deskList = t)
                : i.utils.copyList(this.deskList, t);
            facade.send("ACADEMY_LIST_UPDATE");
        };
        t.prototype.onInfo = function(t) {
            this.info = t;
            facade.send("ACADEMY_PERSON_INFO_UPDATE");
        };
        t.prototype.onDesk = function(t) {
            this.deskInfo = t;
            facade.send("ACADEMY_DESK_INFO_UPDATE");
        };
        t.prototype.onWin = function(t) {
            t.tif &&
                (0 == t.tif.win
                    ? i.utils.openPrefabView("academy/FailPop")
                    : 1 == t.tif.win &&
                      i.utils.openPrefabView("academy/WinPop"));
            t.tim && i.utils.openPrefabView("academy/AcademyPopView");
            t.fang && i.utils.openPrefabView("acdemy/AcdemyEnd", null, t.fang);
            t.find && facade.send("ACADEMY_FIND_UNDATE", t.find);
            if (t.upskill) {
                i.utils.openPrefabView("academy/UpSkillView", null, t.upskill);
                facade.send("ACADEMY_SKILL_UPDATE");
            }
        };
        t.prototype.sendRefreshList = function() {
            JsonHttp.send(new proto_cs.hanlin.listinfo(), function() {
                i.utils.openPrefabView("academy/AcademyView");
            });
        };
        t.prototype.sendCreate = function() {
            JsonHttp.send(new proto_cs.hanlin.opendesk(), function() {
                i.utils.openPrefabView("academy/AcademyInside");
            });
        };
        t.prototype.sendInto = function(t) {
            var e = new proto_cs.hanlin.comein();
            e.fuid = t;
            JsonHttp.send(e, function() {
                i.utils.openPrefabView("academy/AcademyInside");
            });
        };
        t.prototype.sendJoin = function(t, e) {
            var o = new proto_cs.hanlin.sitdown();
            o.fuid = t;
            o.rid = e;
            JsonHttp.send(o);
        };
        t.prototype.sendKick = function(t, e, o) {
            var i = new proto_cs.hanlin.ti();
            i.fuid = t;
            i.rid = e;
            i.uid = o;
            JsonHttp.send(i);
        };
        t.prototype.sendFind = function(t) {
            var e = new proto_cs.hanlin.find();
            e.fuid = t;
            JsonHttp.send(e);
        };
        t.prototype.sendUpSkill = function() {
            JsonHttp.send(new proto_cs.hanlin.upskill());
        };
        t.prototype.sendProtect = function(t, e, o) {
            var i = new proto_cs.hanlin.suoding();
            i.fuid = t;
            i.rid = e;
            i.uid = o;
            JsonHttp.send(i);
        };
        return t;
    })();
o.AcademyProxy = n;
