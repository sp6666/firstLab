var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../utils/Utils"),
    n = require("../Initializer"),
    l = require("../component/RedDot"),
    r = (function () {
        function t() {
            this.childList = null;
            this.actList = null;
            this.sonMarryList = null;
            this.unMarryList = null;
            this.zhaoQinData = null;
            this.tiQinData = null;
            this.tiQinObj = {
                tUid: 0,
                type: 0,
                tSid: 0,
                mySid: 0,
                marryType: 0
            };
            this.base = null;
            this.lilianData = null;
            this.renameId = null;
            this.lilianSeat = null;
            this.lilianList = null;
            this.lilianLvli = [];
            this.lilianSonData = null;
            this.keJuId = 0;
            this.UPDATE_SON_INFO = "UPDATE_SON_INFO";
            this.UPDATE_SON_SEAT = "UPDATE_SON_SEAT";
            this.UPDATE_SON_ZHAO_QIN = "UPDATE_SON_ZHAO_QIN";
            this.UPDATE_SON_TI_QIN = "UPDATE_SON_TI_QIN";
            this.UPDATE_SON_SHOW_ERRECT = "UPDATE_SON_SHOW_ERRECT";
            this.UPDATE_SON_CHOSE = "UPDATE_SON_CHOSE";

            this.selectMsg = {
                star: [true, true, true, true, true, true],
                sex: [true, true],
                show: true
            };
        }
        t.prototype.ctor = function () {
            JsonHttp.subscribe(proto_sc.son.base, this.onBase, this);
            JsonHttp.subscribe(proto_sc.son.sonList, this.onSonList, this);
            JsonHttp.subscribe(proto_sc.son.win, this.onSonWindow, this);
            JsonHttp.subscribe(proto_sc.son.firstkeju, this.onKeju, this);
            JsonHttp.subscribe(proto_sc.son.cList, this.onZhaoQinData, this);
            JsonHttp.subscribe(proto_sc.son.qList, this.onTiQinList, this);
            JsonHttp.subscribe(
                proto_sc.son.lilianList,
                this.onLilianList,
                this
            );
            JsonHttp.subscribe(
                proto_sc.son.lilianSeatNum,
                this.onLilianSeat,
                this
            );
        };
        t.prototype.clearData = function () {
            this.childList = null;
            this.actList = null;
            this.sonMarryList = null;
            this.unMarryList = null;
            this.zhaoQinData = null;
            this.tiQinData = null;
            this.base = null;
            this.renameId = null;
            this.lilianSeat = null;
            this.lilianList = null;
            this.lilianLvli = [];
            this.lilianSonData = null;
            this.lilianData = null;
            this.selectMsg = {
                star: [true, true, true, true, true, true],
                sex: [true, true],
                show: true
            };
        };
        t.prototype.onBase = function (t) {
            this.base = t;
            facade.send(this.UPDATE_SON_SEAT);
        };
        t.prototype.onSonList = function (t) {
            null == this.childList ?
                (this.childList = t) :
                i.utils.copyList(this.childList, t);
            this.sonMarryList = [];
            this.actList = [];
            this.unMarryList = [];
            for (var e = 0; e < this.childList.length; e++) {
                var o = this.childList[e];
                switch (o.state) {
                    case proto_sc.SomState.tName:
                    case proto_sc.SomState.baby:
                    case proto_sc.SomState.Child:
                    case proto_sc.SomState.Student:
                        this.actList.push(o);
                        break;

                    case proto_sc.SomState.loser:
                    case proto_sc.SomState.request:
                    case proto_sc.SomState.pass:
                    case proto_sc.SomState.timeout:
                    case proto_sc.SomState.ok:
                    case proto_sc.SomState.requestAll:
                        this.unMarryList.push(o);
                        break;

                    case proto_sc.SomState.huen:
                        this.sonMarryList.push(o);
                }
            }
            if (null != t && t.length > 0 && t[0].id == this.keJuId) {
                var n = this.getSon(this.keJuId);
                i.utils.openPrefabView("child/ChildKejuView", !1, n);
                this.keJuId = 0;
            }
            facade.send(this.UPDATE_SON_INFO, t);
        };
        t.prototype.onSonWindow = function (t) {
            if (t.jiehun) {
                i.utils.openPrefabView(
                    "marry/MarryEffectView",
                    null,
                    t.jiehun[0]
                );
                facade.send(this.UPDATE_SON_SHOW_ERRECT);
            }
            t.backitem && n.timeProxy.floatReward();
        };
        t.prototype.onKeju = function (t) {
            i.utils.openPrefabView("child/ChildKejuView", !1, t);
        };
        t.prototype.onZhaoQinData = function (t) {
            this.zhaoQinData = t;
            facade.send(this.UPDATE_SON_ZHAO_QIN);
        };
        t.prototype.onTiQinList = function (t) {
            this.tiQinData = t;
            facade.send(this.UPDATE_SON_TI_QIN);
        };
        t.prototype.onLilianSeat = function (t) {
            this.lilianSeat = t;
            facade.send("SON_LI_LIAN_SEAT");
        };
        t.prototype.onLilianList = function (t) {
            this.lilianList = t;
            for (var e = !1, o = 0; o < t.length; o++)
                if (0 != t[o].sid && 0 == t[o].cd.next) {
                    e = !0;
                    break;
                }
            l.default.change("sonLilian", e);
            facade.send("SON_LI_LIAN_LIST");
        };
        t.prototype.sendSonName = function (t, e) {
            var o = new proto_cs.son.sonname();
            o.id = t;
            o.name = e;
            JsonHttp.send(o);
        };
        t.prototype.sendBuySeat = function () {
            var t = new proto_cs.son.buyseat();
            JsonHttp.send(t);
        };
        t.prototype.sendOnFood = function (t) {
            var e = new proto_cs.son.onfood();
            e.id = t;
            JsonHttp.send(e);
        };
        t.prototype.sendKeJu = function (t) {
            var e = new proto_cs.son.keju();
            e.id = t;
            this.keJuId = t;
            JsonHttp.send(e, function (t) {});
        };
        t.prototype.sendRname = function (t, e) {
            var o = new proto_cs.son.rname();
            o.id = t;
            o.name = e;
            JsonHttp.send(o);
        };
        t.prototype.sendPlay = function (t) {
            var e = new proto_cs.son.play();
            e.id = t;
            JsonHttp.send(e);
        };
        t.prototype.sendAllPlay = function () {
            var t = new proto_cs.son.allplay();
            JsonHttp.send(t);
        };
        t.prototype.sendAllFood = function () {
            var t = new proto_cs.son.allfood();
            JsonHttp.send(t);
        };
        t.prototype.sendRefreshZhaoQin = function (t, e) {
            var o = new proto_cs.son.rstzhaoqin();
            o.id = t;
            o.naqie = e;
            JsonHttp.send(o);
        };
        t.prototype.sendShuaXinZQ = function (t, e) {
            var o = new proto_cs.son.zhaoqin();
            o.id = t;
            o.naqie = e;
            JsonHttp.send(o);
        };
        t.prototype.sendJuJueTiQin = function (t, e) {
            var o = new proto_cs.son.pass();
            o.uid = t;
            o.sid = e;
            JsonHttp.send(o);
        };
        t.prototype.sendOneKeyJuJueTiQin = function () {
            var t = new proto_cs.son.allpass();
            JsonHttp.send(t);
        };
        t.prototype.sendRefreshTiQin = function () {
            var t = new proto_cs.son.getTiqin();
            JsonHttp.send(t);
        };
        t.prototype.sendAgree = function (t, e, o, n) {
            var l = new proto_cs.son.agree();
            l.uid = t;
            l.type = e;
            l.sid = o;
            l.mysid = n;
            JsonHttp.send(l, function () {
                i.utils.isOpenView("marry/MySonListView") &&
                    i.utils.closeNameView("marry/MySonListView");
                i.utils.isOpenView("marry/BringUpRequestView") &&
                    i.utils.closeNameView("marry/BringUpRequestView");
            });
        };
        t.prototype.sendJieHun = function (t, e, o, n) {
            var l = new proto_cs.son.jiehun();
            l.uid = t;
            l.type = e;
            l.sid = o;
            l.mysid = n;
            JsonHttp.send(l, function () {
                i.utils.isOpenView("marry/MySonListView") &&
                    i.utils.closeNameView("marry/MySonListView");
                i.utils.isOpenView("marry/MarryGetView") &&
                    i.utils.closeNameView("marry/MarryGetView");
            });
        };
        t.prototype.sendTiQin = function (t, e, o, i) {
            var n = new proto_cs.son.tiqin();
            n.uid = t;
            (n.type = e), (n.sid = o);
            n.ishonor = i;
            JsonHttp.send(n);
        };
        t.prototype.sendMeiPo = function () {
            JsonHttp.send(new proto_cs.son.meipo());
        };
        t.prototype.sendCancel = function (t) {
            var e = new proto_cs.son.cancel();
            e.id = t;
            JsonHttp.send(e);
        };
        t.prototype.sendInfoLilian = function () {
            JsonHttp.send(new proto_cs.son.intoLilian());
        };
        t.prototype.sendBuyLilianSeat = function () {
            JsonHttp.send(new proto_cs.son.buyLilianSeat());
        };
        t.prototype.sendLilianSon = function (t, e, o, i, n) {
            var l = new proto_cs.son.liLianSon();
            l.sid = t;
            l.did = e;
            l.luggage = o;
            l.travel = i;
            l.localep2 = n;
            JsonHttp.send(l);
        };
        t.prototype.sendLilianReward = function (t, e) {
            var o = new proto_cs.son.liLianReward();
            o.did = t;
            o.sid = e;
            JsonHttp.send(o, function () {
                n.timeProxy.floatReward();
            });
        };
        t.prototype.sendDeleteMail = function () {
            JsonHttp.send(new proto_cs.son.delReadMail());
        };
        t.prototype.sendOneKeyLilian = function (t) {
            var e = new proto_cs.son.yjLiLianSon();
            e.arr = t;
            JsonHttp.send(e);
        };
        t.prototype.sendOneKeyLilianFinish = function () {
            JsonHttp.send(new proto_cs.son.yjLiLianReward(), function () {
                n.timeProxy.floatReward();
            });
        };
        t.prototype.getSon = function (t) {
            for (var e = 0; e < this.childList.length; e++)
                if (this.childList[e].id == t) return this.childList[e];
            return null;
        };
        t.prototype.getMarryList = function (t) {
            for (var e = new Array(), o = 0; o < this.childList.length; o++)
                t ?
                this.childList[o].sptime &&
                this.childList[o].sptime >= 0 &&
                e.push(this.childList[o]) :
                (null == this.childList[o].sptime ||
                    null == this.childList[o].sptime ||
                    (0 == this.childList[o].sptime &&
                        4 == this.childList[o].state)) &&
                e.push(this.childList[o]);
            return e;
        };
        t.prototype.getHonourStr = function (t) {
            return localcache.getItem(localdb.table_adult, t).name;
        };
        t.prototype.getUnMarryBySex = function (t) {
            for (var e = [], o = 0; o < this.unMarryList.length; o++)
                this.unMarryList[o].sex == t &&
                4 == this.unMarryList[o].state &&
                e.push(this.unMarryList[o]);
            return e;
        };
        t.prototype.getWifeSonNum = function (t) {
            for (var e = 0, o = 0; o < this.childList.length; o++)
                this.childList[o].mom == t && e++;
            return e;
        };
        t.prototype.getLilianData = function (t) {
            var e = null;
            if (this.lilianList)
                for (var o = 0; o < this.lilianList.length; o++)
                    if (this.lilianList[o].id == t) {
                        e = this.lilianList[o];
                        break;
                    }
            return e;
        };
        t.prototype.isTraveling = function (t) {
            var e = !1;
            if (this.lilianList)
                for (var o = 0; o < this.lilianList.length; o++)
                    if (this.lilianList[o].sid == t) {
                        e = !0;
                        break;
                    }
            return e;
        };
        t.prototype.getChengList = function () {
            var t = [];
            if (this.childList)
                for (var e = 0; e < this.childList.length; e++)
                    this.childList[e].state > 3 && t.push(this.childList[e]);
            return t;
        };
        t.prototype.sendChildLilianAdok = function () {
            if (null != this.lilianList)
                for (var t = 0; t < this.lilianList.length; t++)
                    if (
                        0 != this.lilianList[t].sid &&
                        this.lilianList[t].cd.next > 0
                    ) {
                        this.sendInfoLilian();
                        break;
                    }
        };
        return t;
    })();
o.SonProxy = r;