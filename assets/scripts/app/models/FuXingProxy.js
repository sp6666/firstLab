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
            this.data = null;
            this.hongbaoData = null;
            this.base = null;
            this.recordsData = null;
            this.rankData = null;
            this.shopData = null;
            this.dhShop = {};
            this.FUXING_DATA_UPDATE = "FUXING_DATA_UPDATE";
            this.FUXING_HONGBAO_UPDATE  = "FUXING_HONGBAO_UPDATE";
            this.FUXING_BASE_UPDATE = "FUXING_BASE_UPDATE";
            this.FUXING_RECORDS_UPDATE = "FUXING_RECORDS_UPDATE";
            this.FUXING_RANK_UPDATE = "FUXING_RANK_UPDATE";
            this.FUXING_DUIHUAN_UPDATE = "FUXING_DUIHUAN_UPDATE";
            this.FUXING_OPENEFFECT = "FUXING_OPENEFFECT";
        }
        t.prototype.ctor = function() {
            JsonHttp.subscribe(proto_sc.hongbao.lists, this.onData, this);
            JsonHttp.subscribe(proto_sc.hongbao.position, this.onPositionUpdate, this);
            JsonHttp.subscribe(proto_sc.hongbao.info, this.onBase, this);
            JsonHttp.subscribe(proto_sc.hongbao.records, this.onRecords, this);
            JsonHttp.subscribe(proto_sc.hongbao.rank, this.onRank, this);
            JsonHttp.subscribe(proto_sc.hongbao.shop, this.onShop, this);
            JsonHttp.subscribe(proto_sc.hongbao.exchange, this.onDHShop, this);
        };

        t.prototype.clearData = function() {
            this.data = null;
            this.hongbaoData = null;
            this.base = null;
            this.recordsData = null;
            this.rankData = null;
            this.shopData = null;
            this.dhShop = {};
        };

    
        t.prototype.onData = function(t) {
            this.data = t;
            facade.send(this.FUXING_DATA_UPDATE);
            this.updateRed();
        };

        t.prototype.onBase = function(t) {
            this.base = t;
            facade.send(this.FUXING_BASE_UPDATE);
        },

        t.prototype.onRecords = function(t) {
            this.recordsData = t;
            facade.send(this.FUXING_RECORDS_UPDATE);
        }

        t.prototype.onPositionUpdate = function(t) {
            this.hongbaoData = t;
            facade.send(this.FUXING_HONGBAO_UPDATE);
            this.updateRed();
        };

        t.prototype.onRank = function(t) {
            this.rankData = t;
            facade.send(this.FUXING_RANK_UPDATE);
        };
        t.prototype.onShop = function(t) {
            this.shopData = t;
        };
        t.prototype.onDHShop = function(t) {
            this.dhShop.hid =
            this.base && this.base.info ? this.base.info.id : 1;
            this.dhShop.rwd = t;
            this.dhShop.stime =
            this.base && this.base.info ? this.base.info.showTime : 0;
            facade.send(i.limitActivityProxy.ACTIVITY_SHOP_UPDATE, this.dhShop);
        }
        t.prototype.getHongBaoList = function(nodeName) {
            var list = [];
            var db = localcache.getList(localdb.table_fuxinghongbao);
            if(db != null) {
                var pos = this.hongbaoData.pos;
                for(var idx = 0; idx < pos.length; idx ++) {
                    var dbIndex = pos[idx].id - 1;
                    var dbItem = db[dbIndex];
                    if(dbItem != null && dbItem.nodeName == nodeName) {
                        dbItem.data = pos[idx];
                        list.push(dbItem);
                    }
                }
            }

            return list;
        }

        t.prototype.getHongBaoWorlds = function(nodeName) {
            var db = localcache.getList(localdb.table_hongbaowords);
            if(db != null) {
                var length = db.length;
                var index = Math.floor(Math.random() * length);
                return db[index].content;
            }

            return "";
        }

        t.prototype.getXingYunHongBaoList = function () {
            var listData = [];
            if(this.data != null) {
                for(var i = 0; i < 3; i ++) {
                    var itemData = {};
                    itemData.data = this.data.lucky[i];
                    listData.push(itemData);
                }
            }


            return listData;
        },

        t.prototype.sendOpenActivity = function(cb) {
            JsonHttp.send(new proto_cs.huodong.hd6507Info(), function(info) {
                if(info.a.system.errror == null) {
                    if(cb) cb();
                }
            });
        };

        t.prototype.sendGetXinChunHongbao = function(id, cb) {
            var e = new proto_cs.huodong.hd6507LookEnvelope();
            e.id = id;
            JsonHttp.send(e, function(info) {
                if(info.a.system.errror == null) {
                    if(cb) cb();
                }
                //i.timeProxy.floatReward();
            });
  
        };

        t.prototype.sendGetHongbao = function(type, id, cb) {
            var e = new proto_cs.huodong.hd6507RobEnvelopes();
            e.id = id;
            e.type = type;
            JsonHttp.send(e, (info)=> {
                if(info.a.system.errror == null) {
                    if(cb) cb();
                    facade.send(this.FUXING_OPENEFFECT);
                }
                //i.timeProxy.floatReward();
            });
        };

        t.prototype.sendOpenHongbao = function(id, cb) {
            var e = new proto_cs.huodong.hd6507GrantEnvelopes();
            e.id = id;
            JsonHttp.send(e, function(info) {
                if(info.a.system.errror == null) {
                    if(cb) cb();
                }
            });
        };

        t.prototype.sendGetRecords = function(cb) {
            var e = new proto_cs.huodong.hd6507Records();
            JsonHttp.send(e, function(info) {
                if(info.a.system.errror == null) {
                    if(cb) cb();
                }
            });
        };

        t.prototype.sendGetRank = function(cb) {
            var e = new proto_cs.huodong.hd6507Rank();
            JsonHttp.send(e, function(info) {
                if(info.a.system.errror == null) {
                    if(cb) cb();
                }
            });
        };

        t.prototype.updateRed = function() {

            var xingyunList = this.getXingYunHongBaoList();
            for(var i = 0; i < xingyunList.length; i ++) {
                if(xingyunList[i].data != null) {
                    l.default.change("fuxing_effect",true);
                    return;
                }
            }
            if(this.hongbaoData != null && this.hongbaoData.pos.length > 0) {
                l.default.change("fuxing_effect",true);
                return;
            }

            if(this.data != null && this.data.fortune != null 
                && this.data.fortune[0] != null 
                && n.timeUtil.second >= this.data.fortune[0].ly_time && n.timeUtil.second <= this.data.fortune[0].settle_time) {
                    l.default.change("fuxing_effect",true);
                    return;
                }
            l.default.change("fuxing_effect",false);
        }
        return t;
    })();
o.FuXingProxy = r;
