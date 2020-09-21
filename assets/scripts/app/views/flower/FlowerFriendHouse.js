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
    item = require("FlowerFriendFieldItem"),
    confirmView = require("../../component/ConfirmView"),
    c = cc._decorator,
    _ = c.ccclass,
    d = c.property,
    u = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.list = null;
            e.msgList = null;
            e.msgItem = null;
            e.parts = [];
            e.msgItems = [];
            e.toggleContainer = null;
            e.plant = null;
            e.lblTime = null;
            e.lblDes = null;
            e.lblName = null;
            e.info = null;
            e.nodeCore = null;
            e.btnGet = null;
            e.listCore = null;
            e.bot = null;
            e.btnOneKeyPlant = null;
            e.btnUnlock = null;
            return e;
        }
        e.prototype.onLoad = function () {


            if (!l.flowerFriendProxy.field || !l.flowerFriendProxy.field.fields) {
                r.utils.closeView(this);
                return;
            }

            this.list.data = this.getPlant();


            var len = this.list.data.length;



            this.msgItem.getComponent(item.default).data = this.list.data[len - 1];
            this.msgItem.position = this.parts[0].node.position;
            this.msgItems.push(this.msgItem.getComponent(item.default));



            for (var o = 1, n = this.parts.length; o < n; o++) {
                var node = cc.instantiate(this.msgItem);
                node.parent = this.msgList;
                node.position = this.parts[o].node.position;
                this.msgItems.push(node.getComponent(item.default));
            }



            for (var o = 0, n = this.parts.length; o < n; o++) {
                this.toggleContainer.toggleItems[o].node.position = this.parts[o].node.position.add(cc.v2(0, 20));
                this.toggleContainer.toggleItems[o].clickEvents.push(this.toggleContainer.toggleItems[o].checkEvents[0]);
                this.toggleContainer.toggleItems[o].checkEvents = [];
            }



            var select = 0;
            this.list.selectIndex = select;
            this.toggleContainer.toggleItems[select].isChecked = true;
            this.list.selectData = this.list.data[select];



            this.onUpdateLevel(!1);



            //若有已解锁花盆没有种植鲜花，则自动选中该花盆，同时弹出种植鲜花选择页
            for (var o = 0, n = this.parts.length; o < n; o++) {
                if (this.parts[o].data && !l.flowerFriendProxy.isNextUnlock(this.parts[o].data.id)) {
                    select = o;
                    break;
                }
            }


            //若有已成熟的鲜花，则优先收获成熟鲜花。（默认只收获一朵成熟花朵。）
            for (var o = 0, n = this.parts.length; o < n; o++) {
                if (this.parts[o].data) {
                    var t = this.parts[o].data;
                    var e = localcache.getItem(localdb.table_friend_flowerCore, t.pid);
                    if (null != e && t.stime + e.time < r.timeUtil.second) {
                        l.flowerFriendProxy.sendPlantRwd(t.id);
                        break;
                    }
                }
            }


            if (select !== 0) {
                this.list.selectIndex = select;
                this.toggleContainer.toggleItems[select].isChecked = true;
                this.list.selectData = this.list.data[select];
                this.updateShow();
            }


            facade.subscribe("UI_TOUCH_MOVE_LEFT", this.onClickLeft, this);
            facade.subscribe(
                l.flowerFriendProxy.UPDATE_FLOWER_FIELD,
                this.onUpdateShow,
                this
            );
            facade.subscribe(
                l.flowerFriendProxy.UPDATE_FLOWER_LEVEL,
                this.onUpdateLevel,
                this
            );

        };

        e.prototype.selectHandle = function (t, e) {


            var n = 0;
            for (var o = 0, len = this.toggleContainer.toggleItems.length; o < len; o++) {
                if (this.toggleContainer.toggleItems[o].node === t.target) {
                    this.list.selectIndex = n;
                    this.list.selectData = this.parts[n].data;
                    this.onClickGet();
                    this.updateShow();
                    break;
                }
                n++;
            }

        };

        e.prototype.onUpdateLevel = function (t) {
            void 0 === t && (t = !0);
            this.listCore.data = this.getCore();
            t && (this.list.selectIndex = this.list.selectIndex);
            this.onUpdateShow();
        };
        e.prototype.onUpdateShow = function () {
            this.list.data = this.getPlant();
            for (var o = 0, n = this.parts.length; o < n; o++) {
                this.parts[o].data = this.list.data[this.list.data.length - 1 - o];
                this.msgItems[o].data = this.list.data[this.list.data.length - 1 - o];
            }
            this.list.selectData = this.parts[this.list.selectIndex].data;
            this.updateShow();
        };
        e.prototype.updateShow = function () {
            this.bot.onShow();
            var t = this.list.selectData;
            if (null != t) {
                this.nodeCore.active = this.btnUnlock.active = this.btnGet.active = this.info.active = !1;
                var e = localcache.getItem(localdb.table_friend_flowerField, t.id);
                this.lblName.string = this.lblTime.string = "";
                if (0 == t.pid) this.nodeCore.active = !0;
                else if (-1 == t.pid) {
                    this.info.active = !0;
                    this.lblDes.string = i18n.t("FLOWER_UNLOCK_GOLD_TIP", {
                        d: e.lv,
                        g: e.yb
                    });
                    this.btnUnlock.active = l.flowerFriendProxy.isNextUnlock(t.id);
                    this.plant.node.active = !1;
                } else {
                    this.info.active = !0;
                    var o = localcache.getItem(localdb.table_friend_flowerCore, t.pid);
                    if (!o) {
                        o = localcache.getItem(localdb.table_friend_flowerCore, 1);
                    }
                    var i = localcache.getItem(localdb.table_item, o.itemid);
                    this.lblDes.string = i ? i.explain : "";
                    var n = t.stime + o.time;
                    this.plant.node.active = !0;
                    this.plant.url = a.uiHelps.getFlowerFriendPlant(
                        t.pid,
                        l.flowerFriendProxy.getStatu(t.stime, o.time)
                    );
                    this.btnGet.active = n < r.timeUtil.second;
                    this.lblName.string = o.flower;
                }
                // this.btnOneKeyPlant.node.active = l.flowerFriendProxy.field.status !== 0;
            } else {
                this.nodeCore.active = this.btnGet.active = this.info.active = !1;
                this.lblName.string = this.lblTime.string = "";
                this.info.active = true;
                this.lblDes.string = i18n.t("FLOWER_UN_UNLOCK_TIP");
                this.plant.node.active = !1;
                this.btnUnlock.active = false;
            }
        };
        e.prototype.onClickRank = function () {
            l.flowerFriendProxy.sendRank();
        };
        e.prototype.getPlant = function () {

            var fields = l.flowerFriendProxy.field.fields;

            var t = [],
                e = {};
            fields.sort(function (t, e) {
                return t.id - e.id;
            });
            for (var o = 0; o < fields.length; o++) {
                var i = fields[o];
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
            var a = localcache.getList(localdb.table_friend_flowerField),
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
        e.prototype.getItem = function (t) {
            var e = l.flowerFriendProxy.level.flv,
                o = {},
                i = localcache.getItem(localdb.table_friend_flowerField, t);
            o.id = t;
            o.pid = i.lv <= e || this.isOpen(i.id) ? 0 : -1;
            o.stime = 0;
            return o;
        };
        e.prototype.isOpen = function (t) {
            for (var e = 0, openids = l.flowerFriendProxy.field.openid, len = openids.length; e < len; e++)
                if (openids[e] == t) return !0;
            return !1;
        };
        e.prototype.getCore = function () {
            for (
                var t = [],
                e = l.flowerFriendProxy.level.flv,
                o = localcache.getList(localdb.table_friend_flowerCore),
                i = 0; i < o.length; i++
            )
                o[i].lv > e + 5 || t.push(o[i]);
            /*
            t.sort(function (t, o) {
                var i = t.lv <= e ? -1 : 1,
                    n = o.lv <= e ? -1 : 1;
                return i != n ? i - n : o.time - t.time;
            });*/
            return t;
        };
        e.prototype.onClickClost = function () {
            r.utils.closeView(this);
            r.utils.closeNameView("flower/FlowerView");
        };
        e.prototype.onClickLeft = function (t) {
            t < 340 || this.onClickBack();
        };
        e.prototype.onClickBack = function () {
            r.utils.closeView(this);
        };
        e.prototype.onClickUnlock = function () {
            var t = this.list.selectData;
            if (null != t && -1 == t.pid) {
                var e = localcache.getItem(localdb.table_friend_flowerField, t.id);
                r.utils.showConfirmItem(
                    i18n.t("FLOWER_UNLOCK_CONFIRM_TIP", {
                        g: e.yb
                    }),
                    1,
                    l.playerProxy.userData.cash,
                    function () {
                        l.playerProxy.userData.cash < e.yb ?
                            r.alertUtil.alertItemLimit(1) :
                            l.flowerFriendProxy.sendOpen(t.id);
                    },
                    "FLOWER_UNLOCK_CONFIRM_TIP"
                );
            }
        };
        e.prototype.onClickGet = function () {
            if (this.list.selectData && this.list.selectData.pid) {
                var t = this.list.selectData,
                    e = localcache.getItem(localdb.table_friend_flowerCore, t.pid);
                if (null != e) {
                    t.stime + e.time < r.timeUtil.second &&
                        l.flowerFriendProxy.sendPlantRwd(t.id);
                }
            }

        };
        e.prototype.onClickCore = function (t, e) {
            var o = this.list.selectData;
            if (null != o && 0 == o.pid) {
                var i = e.data;
                if (i) {
                    if (i.lv > l.flowerFriendProxy.level.flv) {
                        r.alertUtil.alert(
                            i18n.t("FLOWER_UNLOCK_LEVEL", {
                                d: i.lv
                            })
                        );
                        return;
                    }
                    if (i.dew && l.flowerFriendProxy.level.chenlu < i.dew) {
                        r.alertUtil.alert18n("FLOWER_CHENLU_LIMIT");
                        return;
                    }
                    if (i.cash && l.playerProxy.userData.cash < i.cash) {
                        r.alertUtil.alertItemLimit(1);
                        return;
                    }
                    l.flowerFriendProxy.sendPlant(o.id, i.id);
                    var n = l.timeProxy.getLoacalValue("FLOWER_FRIEND_FIELD_DATA"),
                        a = JSON.parse(n);
                    null == a && (a = {});
                    var s = {};
                    s.id = o.id;
                    s.fid = i.id;
                    a[o.id] = s;
                    var c = JSON.stringify(a);
                    l.timeProxy.saveLocalValue("FLOWER_FRIEND_FIELD_DATA", c);
                }
            } else r.alertUtil.alert18n("FLOWER_FLOWER_PLANT");
        };
        e.prototype.onClickYjPlant = function () {
            if (l.playerProxy.userData.vip < 5)
                r.alertUtil.alert18n("FLOWER_YI_JIAN_ZHONG_HUA");
            else {
                var t = l.timeProxy.getLoacalValue("FLOWER_FRIEND_FIELD_DATA"),
                    e = JSON.parse(t),
                    o = [];
                var plants =l.flowerFriendProxy.field.fields;
                var lostCCount =0;
                for (const key in plants) {
                    if (plants.hasOwnProperty(key)) {
                        const element = plants[key];
                        if(element&&element.stime>0){
                            lostCCount +=1;
                        }
                    }
                }
                if (e != null) {
                    //TODO 查找需要一键种植的花里面消耗元宝的是哪几个？如果有？提示是否花费元宝 ：直接一键种植
                    //
                    //获取缓存信息
                    var sort_e = [];
                    var needCash = [];
                    var goldCount = 0;
                    var needDew = [];

                    for (var index in e) {//遍历本地缓存
                        var a = {};
                        a.id = e[index].id;
                        a.uid = e[index].fid;
                        var s = localcache.getItem(
                            localdb.table_friend_flowerCore,
                            e[index].fid
                        );
                        if (s != null) {
                            var t = null;
                            this.list.data.forEach(element => {
                                if (element && element.id == e[index].id) {
                                    t = element;
                                }
                            })
                            a.hasPlant = 0 != t.pid && -1 != t.pid;//是否有成长的植物。
                            if (s.dew) {
                                a.dew = s.dew;
                                a.cash = 0;
                                !a.hasPlant && needDew.push(a);
                            } else {
                                a.cash = s.cash;
                                a.dew = 0;
                                !a.hasPlant && (goldCount += Number(s.cash));
                                !a.hasPlant && needCash.push(a);
                            }
                            !a.hasPlant && sort_e.push(a);
                        }
                    }
                    if (needCash.length > 0) {
                        //如果有需要消耗元宝的需要弹确认框  确认框拿不到取消状态下的回调函数 所以不好处理。一次请求变成两次。
                        // (t, e, o, i, n, l)
                        // txt targe handle color left right
                        r.utils.showConfirm(i18n.t("FLOWER_FRIEND_COST_GOLD", { num: goldCount }),
                            function (e) {
                                o=[];
                                sort_e.forEach((v) => {
                                    var item = {};
                                    item.id = v.id;
                                    item.uid = v.uid;
                                    o.push(item);
                                })
                                //1 剔除元宝
                                o.length > 0 ? l.flowerFriendProxy.sendYjPlant(o,2) : lostCCount>0&&lostCCount==plants.length?r.alertUtil.alert18n("FLOWER_FLOWER_PLANT"):r.alertUtil.alert18n("FLOWER_YI_JIAN_PLANT_LIMIT");
                            },this);
                        var needCL = 0;
                        needDew.sort((a, b) => { return a.dew - b.dew });
                        for (var v in needDew) {
                            var item = {};
                            item.id = needDew[v].id;
                            item.uid = needDew[v].uid;
                            needCL += needDew[v].dew;
                            if (l.flowerProxy.level.chenlu < needCL) {
                                ineedCL -= needDew[v].dew;
                                break;
                            }
                            o.push(item);
                        }
                        //剔除晨露
                        l.flowerFriendProxy.sendYjPlant(o,0);

                    } else {
                        sort_e.forEach((v) => {
                            var item = {};
                            item.id = v.id;
                            item.uid = v.uid;
                            o.push(item);
                        })
                        o.length > 0 ? l.flowerFriendProxy.sendYjPlant(1) : lostCCount>0&&lostCCount==plants.length?r.alertUtil.alert18n("FLOWER_FLOWER_PLANT"):r.alertUtil.alert18n("FLOWER_YI_JIAN_PLANT_LIMIT");
                    }
                } else {
                    lostCCount>0&&lostCCount==plants.length?r.alertUtil.alert18n("FLOWER_FLOWER_PLANT"):r.alertUtil.alert18n("FLOWER_YI_JIAN_PLANT_LIMIT");
                }
            }
        };
        e.prototype.onClickYjsq = function () {
            l.playerProxy.userData.vip < 4 ?
                r.alertUtil.alert18n("FLOWER_YI_JIAN_SHOU_QU_LIMIT") :
                l.flowerFriendProxy.sendYjsh();
        };

        __decorate([d(cc.Node)], e.prototype, "list", void 0);
        __decorate([d(cc.Node)], e.prototype, "msgList", void 0);
        __decorate([d(cc.Node)], e.prototype, "msgItem", void 0);
        __decorate([d(cc.ToggleContainer)], e.prototype, "toggleContainer", void 0);

        __decorate([d([item.default])], e.prototype, "parts", void 0);


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