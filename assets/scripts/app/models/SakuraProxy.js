var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../Initializer"),
    n = require("../utils/Utils"),
    l = require("../component/RedDot"),
    r = (function () {
        function t() {
            this.data = null;
            this.records = null;
            this.shop = null;
            this.level_data = null;
            this.rank = null;
            this.myRank = null;
            this.reset = true;
            this.exchange = {};
            this.playList = [];//当前玩过的卡
            this.SAKURA_DATA_UPDATE = "SAKURA_DATA_UPDATE";
            this.SAKURA_RECORDS = "SAKURA_RECORDS";
            this.SAKURA_SHOP = "SAKURA_SHOP";
            this.SAKURA_LEVELDATA = "SAKURA_LEVELDATA";
            this.SAKURA_EXCHANGE = "SAKURA_EXCHANGE";
            this.SAKURA_MYRANK = "SAKURA_MYRANK";
        }
        t.prototype.ctor = function () {
            JsonHttp.subscribe(proto_sc.sakura.info, this.onData, this);
            JsonHttp.subscribe(proto_sc.sakura.records, this.onRwdLog, this);
            JsonHttp.subscribe(proto_sc.sakura.shop, this.onShop, this);
            JsonHttp.subscribe(proto_sc.sakura.level_data, this.onLevelData, this);
            JsonHttp.subscribe(proto_sc.sakura.exchange, this.onExchange, this);
            JsonHttp.subscribe(proto_sc.sakura.myRank, this.onMyRank, this);
            JsonHttp.subscribe(proto_sc.sakura.rank, this.onRank, this);
        };

        t.prototype.clearData = function () {
            this.data = null;
            this.records = null;
            this.shop = null;
            this.level_data = null;
            this.exchange = {};
            this.rank = null;
            this.myRank = null;
            this.playList = [];
        };



        t.prototype.onData = function (t) {
            this.data = t;
            this.exchange.hid = this.data && this.data.info ? this.data.info.type : 1;
            this.exchange.stime = this.data && this.data.info ? this.data.info.showTime : 0;
            facade.send(this.SAKURA_DATA_UPDATE);
        };

        t.prototype.onRwdLog = function (t) {
            this.records = t;
            facade.send(this.SAKURA_RECORDS);
        };

        t.prototype.onShop = function (t) {
            this.shop = t;
            facade.send(this.SAKURA_SHOP);
        };
        t.prototype.onLevelData = function (t) {
            this.level_data = t;
            var isRed = false;
            for (let index = 0; index < this.level_data.total.length; index++) {
                const element = this.level_data.total[index];
                if (this.level_data.score >= element.need && !element.get) {
                    isRed = true;
                    break;
                }
            }
            l.default.change("sakura_leiji", isRed);
            facade.send(this.SAKURA_LEVELDATA);
        };

        t.prototype.onExchange = function (t) {
            this.exchange.hid = this.data && this.data.info ? this.data.info.type : 1;
            this.exchange.rwd = [];
            for (var index = 0; index < t.length; ++index) {
                var item = t[index];
                this.exchange.rwd.push(item);
            }

            this.exchange.stime = this.data && this.data.info ? this.data.info.showTime : 0;
            facade.send(i.limitActivityProxy.ACTIVITY_SHOP_UPDATE, this.exchange);
        };

        t.prototype.onMyRank = function (t) {
            this.myRank = t;
            facade.send(this.SAKURA_MYRANK);
        };

        t.prototype.onRank = function (t) {
            i.limitActivityProxy.cbRankList = t;
            this.rank = t;
            //facade.send(this.SHENGDAN_MYRANK);
        };
        //查询
        t.prototype.sendOpenActivity = function () {
            JsonHttp.send(new proto_cs.huodong.hd6510Info(), function () {
                i.timeProxy.floatReward();
            });
        };


        t.prototype.sendExchange = function (type) {
            var o = new proto_cs.huodong.hd6266exchange();
            o.id = type;
            JsonHttp.send(o, function (info) {
                if (info.a.system.errror == null) {
                    //n.alertUtil.alert18n("USER_CLOTHE_UNLOCK_SUC");
                    i.timeProxy.floatReward();
                }
            });

        };

        //排行
        t.prototype.sendRank = function (t) {
            JsonHttp.send(new proto_cs.huodong.hd6510Rank());
        };

        t.prototype.getCurrentTagData = function (level, page, count) {
            var levelData = this.level_data.cts[level];
            var returnData = [];
            for (var i = 0; i < count; i++) {
                var item = {};
                if (levelData == null) {
                    //returnData.push({});
                } else {
                    var pageData = null;
                    for (var j = 0; j < levelData.pages.length; j++) {
                        if (levelData.pages[j].eid == page + 1) {
                            pageData = levelData.pages[j];
                        }
                    }
                    //var pageData = levelData.pages[page];
                    if (pageData == null) {
                        //returnData.push({});
                    } else {
                        for (var j = 0; j < pageData.rwd.length; j++) {
                            if (pageData.rwd[j].tid == i + 1) {
                                // returnData.push({
                                //     data : pageData.rwd[j]
                                // });
                                item.data = pageData.rwd[j];
                                break;
                            }
                        }
                    }
                }
                returnData.push(item);
            }
            return returnData;
        };

        t.prototype.getCurrentLevelData = function (level) {
            return this.data.cts[level];
        };

        t.prototype.getCount = function (level) {
            var needData = this.data.cts[level].need;
            return i.bagProxy.getItemCount(needData.id);
        };

        t.prototype.getIsEnough = function (level) {
            var needData = this.data.cts[level].need;
            var bagNum = i.bagProxy.getItemCount(needData.id);
            return bagNum >= needData.count;
        };

        t.prototype.getNeed = function (level) {
            return this.data.cts[level].need.count;
        };

        t.prototype.getCurrentTreeLeft = function (level) {
            return this.data.cts[level].tree - this.level_data.cts[level].curr_tree;
        };

        t.prototype.getCurrentBoxLeft = function (level, tag) {
            var pages = this.level_data.cts[level].pages;
            for (var i = 0; i < pages.length; i++) {
                if (pages[i].eid == tag + 1) {
                    return 1 - pages[i].box;
                }
            }
            return 1;
        };

        t.prototype.sendGetRewad = function (id, eid, tid) {
            var e = new proto_cs.huodong.hd6510Flop();
            e.id = id;
            e.eid = eid;
            e.tid = tid;
            JsonHttp.send(e, function () {
                //i.timeProxy.floatReward();
            });
        };

        t.prototype.isPalyed = function (t) {
            for (var e = 0; e < this.playList.length; e++)
                if (t.tid == this.playList[e].tid) return true;
            return false;
        };

        t.prototype.isAlertPass = function () {
            if (this.level_data.is_pass == 1) {
                this.level_data.is_pass = 0;
                return true;
            }
            return false;
        };

        t.prototype.isBoxOpen = function () {
            if (this.level_data.is_box == 1) {
                this.level_data.is_box = 0;
                return true;
            }
            return false;
        };

        t.prototype.refresh = function (cb) {
            var e = new proto_cs.huodong.hd6510Refresh();
            JsonHttp.send(e, function (info) {
                if (info.a.system.errror == null) {
                    if (cb) cb();
                }
            });
        };

        t.prototype.getRefreshBtnShow = function (level) {
            return this.level_data.cts[level].rh == 1;
        }

        //进度奖励
        /**
         * @param id 关卡
         * @param type 1:领取关卡的奖励,2:领取圣诞树的奖励,3:累计奖励的领取
         */
        t.prototype.sendRwd = function (id, type) {
            var e = new proto_cs.huodong.hd6510Rwd();
            e.id = id;
            e.type = type;
            JsonHttp.send(e, function () {
                i.timeProxy.floatReward();
            });
        };

        t.prototype.getLevelProgress = function () {
            return this.level_data.cts.length / this.data.cts.length;
        }

        t.prototype.getMostLevel = function () {
            return this.level_data.cts.length;
        }
        return t;
    })();
o.SakuraProxy = r;
