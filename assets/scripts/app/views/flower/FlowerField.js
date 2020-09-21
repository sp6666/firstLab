var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("../../component/UrlLoad"),
    l = require("../../Initializer"),
    r = require("../../utils/Utils"),
    a = require("../../utils/UIUtils"),
    s = require("../../component/BotExtent"),
    c = cc._decorator,
    _ = c.ccclass,
    d = c.property,
    u = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.list = null;
            e.plant = null;
            e.lblTime = null;
            e.lblDes = null;
            e.lblName = null;
            e.info = null;
            e.nodeCore = null;
            e.btnGet = null;
            e.btnUnlock = null;
            e.listCore = null;
            e.bot = null;
            e.btnOneKeyPlant = null;
            return e;
        }
        e.prototype.onLoad = function() {
            var t = this;
            this.list.selectHandle = function(e) {
                if (0 != e.pid && -1 != e.pid) {
                    var o = localcache.getItem(localdb.table_flowerCore, e.pid);
                    if (e.sTime + o.time < r.timeUtil.second) {
                        l.flowerProxy.sendPlantRwd(e.id);
                        return;
                    }
                }
                t.updateShow();
            };
            this.onUpdateLevel(!1);
            var e = 0;
            if (this.list.data)
                for (var o = 0; o < this.list.data.length; o++) {
                    null != this.list.data[o] && (e = o);
                }
            this.list.selectIndex = e;
            facade.subscribe("UI_TOUCH_MOVE_LEFT", this.onClickLeft, this);
            facade.subscribe(
                l.flowerProxy.UPDATE_FLOWER_FEILD,
                this.onUpdateShow,
                this
            );
            facade.subscribe(
                l.flowerProxy.UPDATE_FLOWER_LEVEL,
                this.onUpdateLevel,
                this
            );
        };
        e.prototype.onUpdateLevel = function(t) {
            void 0 === t && (t = !0);
            this.listCore.data = this.getCore();
            this.onUpdateShow();
            t && (this.list.selectIndex = this.list.selectIndex);
        };
        e.prototype.onUpdateShow = function() {
            this.list.data = this.getPlant();
            this.updateShow();
        };
        e.prototype.updateShow = function() {
            this.bot.onShow();
            var t = this.list.selectData;
            if (null != t) {
                this.nodeCore.active = this.btnUnlock.active = this.btnGet.active = this.info.active = !1;
                var e = localcache.getItem(localdb.table_flowerFeild, t.id);
                this.lblName.string = this.lblTime.string = "";
                if (0 == t.pid) this.nodeCore.active = !0;
                else if (-1 == t.pid) {
                    this.info.active = !0;
                    this.lblDes.string = i18n.t("FLOWER_UNLOCK_GOLD_TIP", {
                        d: e.lv,
                        g: e.yb
                    });
                    this.btnUnlock.active = l.flowerProxy.isNextUnlock(t.id);
                    this.plant.node.active = !1;
                } else {
                    this.info.active = !0;
                    var o = localcache.getItem(localdb.table_flowerCore, t.pid),
                        i = localcache.getItem(localdb.table_item, o.itemid);
                    this.lblDes.string = i ? i.explain : "";
                    var n = t.sTime + o.time;
                    this.plant.node.active = !0;
                    this.plant.url = a.uiHelps.getFlowerPlant(
                        t.pid,
                        l.flowerProxy.getStatu(t.sTime, o.time)
                    );
                    this.btnGet.active = n < r.timeUtil.second;
                    this.lblName.string = o.flower;
                }
                for (
                    var s = !1, c = 0;
                    c < l.flowerProxy.feild.feilds.length;
                    c++
                )
                    if (0 != l.flowerProxy.feild.feilds[c].pid) {
                        s = !0;
                        break;
                    }
                var _ = l.timeProxy.getLoacalValue("FLOWER_FIELD_DATA");
                // s || r.stringUtil.isBlank(_)
                    // ? (this.btnOneKeyPlant.node.active = !1)
                    // : (this.btnOneKeyPlant.node.active = !0);
            }
        };
        e.prototype.onClickRank = function() {
            l.flowerProxy.sendRank();
        };
        e.prototype.getPlant = function() {
            var t = [],
                e = {};
            l.flowerProxy.feild.feilds.sort(function(t, e) {
                return t.id - e.id;
            });
            for (var o = 0; o < l.flowerProxy.feild.feilds.length; o++) {
                var i = l.flowerProxy.feild.feilds[o];
                e[i.id] = 1;
                if (i.id - 1 > t.length)
                    for (var n = t.length < 1 ? 1 : t.length; n < i.id; n++)
                        if (1 != e[n]) {
                            var r = this.getItem(n);
                            e[n] = 1;
                            t.push(r);
                        }
                t.push(i);
            }
            var a = localcache.getList(localdb.table_flowerFeild),
                s = !1;
            for (o = 0; o < a.length; o++) {
                var c = a[o];
                if (1 != e[c.id])
                    if (s) t.push(null);
                    else {
                        r = this.getItem(c.id);
                        t.push(r);
                        s = -1 == r.pid;
                    }
            }
            return (t = t.reverse());
        };
        e.prototype.getItem = function(t) {
            var e = l.flowerProxy.level.lv,
                o = {},
                i = localcache.getItem(localdb.table_flowerFeild, t);
            o.id = t;
            o.pid = i.lv <= e || this.isOpen(i.id) ? 0 : -1;
            o.sTime = 0;
            return o;
        };
        e.prototype.isOpen = function(t) {
            for (var e = 0; e < l.flowerProxy.feild.openid.length; e++)
                if (l.flowerProxy.feild.openid[e] == t) return !0;
            return !1;
        };
        e.prototype.getCore = function() {
            for (
                var t = [],
                    e = l.flowerProxy.level.lv,
                    o = localcache.getList(localdb.table_flowerCore),
                    i = 0;
                i < o.length;
                i++
            )
                o[i].lv > e + 5 || t.push(o[i]);
            t.sort(function(t, o) {
                var i = t.lv <= e ? -1 : 1,
                    n = o.lv <= e ? -1 : 1;
                return i != n ? i - n : o.time - t.time;
            });
            return t;
        };
        e.prototype.onClickClost = function() {
            r.utils.closeView(this);
            r.utils.closeNameView("flower/FlowerView");
        };
        e.prototype.onClickLeft = function(t) {
            t < 340 || this.onClickBack();
        };
        e.prototype.onClickBack = function() {
            r.utils.closeView(this);
        };
        e.prototype.onClickUnlock = function() {
            var t = this.list.selectData;
            if (null != t && -1 == t.pid) {
                var e = localcache.getItem(localdb.table_flowerFeild, t.id);
                r.utils.showConfirmItem(
                    i18n.t("FLOWER_UNLOCK_CONFIRM_TIP", {
                        g: e.yb
                    }),
                    1,
                    l.playerProxy.userData.cash,
                    function() {
                        l.playerProxy.userData.cash < e.yb
                            ? r.alertUtil.alertItemLimit(1)
                            : l.flowerProxy.sendOpen(t.id);
                    },
                    "FLOWER_UNLOCK_CONFIRM_TIP"
                );
            }
        };
        e.prototype.onClickGet = function() {
            var t = this.list.selectData,
                e = localcache.getItem(localdb.table_flowerCore, t.pid);
            if (null != e) {
                t.sTime + e.time < r.timeUtil.second &&
                    l.flowerProxy.sendPlantRwd(t.id);
            }
        };
        e.prototype.onClickCore = function(t, e) {
            var o = this.list.selectData;
            if (null != o && 0 == o.pid) {
                var i = e.data;
                if (i) {
                    if (i.lv > l.flowerProxy.level.lv) {
                        r.alertUtil.alert(
                            i18n.t("FLOWER_UNLOCK_LEVEL", {
                                d: i.lv
                            })
                        );
                        return;
                    }
                    if (l.flowerProxy.level.chenlu < i.dew) {
                        r.alertUtil.alert18n("FLOWER_CHENLU_LIMIT");
                        return;
                    }
                    l.flowerProxy.sendPlant(o.id, i.id);
                    var n = l.timeProxy.getLoacalValue("FLOWER_FIELD_DATA"),
                        a = JSON.parse(n);
                    null == a && (a = {});
                    var s = {};
                    s.id = o.id;
                    s.fid = i.id;
                    a[o.id] = s;
                    var c = JSON.stringify(a);
                    l.timeProxy.saveLocalValue("FLOWER_FIELD_DATA", c);
                }
            } else r.alertUtil.alert18n("FLOWER_FLOWER_PLANT");
        };
        e.prototype.onClickYjPlant = function() {
            if (l.playerProxy.userData.vip < 5)
                r.alertUtil.alert18n("FLOWER_YI_JIAN_ZHONG_HUA");
            else {
                var t = l.timeProxy.getLoacalValue("FLOWER_FIELD_DATA"),
                    e = JSON.parse(t),
                    o = [];
                if (null != e) {
                    //整合数据 策划需求 改为1.部分有植物的情况下也可以种植，2.晨露不满足所有情况下的话，种植花费最低的能种几个算几个，
                    var sort_e =[];
                    for(var index in e){
                        var a ={};
                        a.id =e[index].id;
                        a.uid = e[index].fid;
                        var s = localcache.getItem(
                            localdb.table_flowerCore,
                            e[index].fid
                        );
                        if(s!=null){
                            // var t = this.list.data[index-1];//0 != t.pid && -1 != t.pid
                            var t=null;
                            this.list.data.forEach(element=>{
                                if(element&&element.id==e[index].id){
                                    t=element;
                                }
                            })
                            a.dew =s.dew;
                            t!=null&&(a.hasPlant =0 != t.pid && -1 != t.pid);//是否有成长的植物。
                            t!=null&&(sort_e.push(a));
                        }
                    }
                    sort_e =sort_e.sort((a,b)=>{
                        return a.dew-b.dew;
                    })
                    var i = 0;
                    for(var v in sort_e){
                        var item={};
                        item.id =sort_e[v].id;
                        item.uid =sort_e[v].uid;
                        !sort_e[v].hasPlant&&(i +=sort_e[v].dew);
                        if(l.flowerProxy.level.chenlu < i&&v!=0){
                            i -=sort_e[v].dew;
                            break;
                        }
                        !sort_e[v].hasPlant&&(o.push(item));   
                    }
                    // for (var n in e) {
                    //     var a = {};
                    //     a.id = e[n].id;
                    //     a.uid = e[n].fid;
                    //     var s = localcache.getItem(
                    //         localdb.table_flowerCore,
                    //         e[n].id
                    //     );
                    //     if (null != s) {
                    //         var t = this.list.data[n-1];
                    //     //TODO
                    //         t.sTime==0&&(i += s.dew);
                    //         t.sTime==0&&o.push(a);
                    //     }
                    // }
                    l.flowerProxy.level.chenlu < i
                        ? r.alertUtil.alert18n("FLOWER_CHENLU_LIMIT")
                        : o.length>0?l.flowerProxy.sendYjPlant(o):r.alertUtil.alert18n("FLOWER_NOT_CAN_PLANT");
                } else r.alertUtil.alert18n("FLOWER_YI_JIAN_PLANT_LIMIT");
            }
        };
        e.prototype.onClickYjsq = function() {
            l.playerProxy.userData.vip < 4
                ? r.alertUtil.alert18n("FLOWER_YI_JIAN_SHOU_QU_LIMIT")
                : l.flowerProxy.sendYjsh();
        };
        __decorate([d(i.default)], e.prototype, "list", void 0);
        __decorate([d(n.default)], e.prototype, "plant", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblTime", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblDes", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([d(cc.Node)], e.prototype, "info", void 0);
        __decorate([d(cc.Node)], e.prototype, "nodeCore", void 0);
        __decorate([d(cc.Node)], e.prototype, "btnGet", void 0);
        __decorate([d(cc.Node)], e.prototype, "btnUnlock", void 0);
        __decorate([d(i.default)], e.prototype, "listCore", void 0);
        __decorate([d(s.default)], e.prototype, "bot", void 0);
        __decorate([d(cc.Button)], e.prototype, "btnOneKeyPlant", void 0);
        return (e = __decorate([_], e));
    })(cc.Component);
o.default = u;
