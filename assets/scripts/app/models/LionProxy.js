var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../Initializer"),
    n = (function() {
        function t() {
            this.cfg = null;
            this.exchange = null;
            this.hdShop = null;
            this.shopCfg = null;
            this.LION_DATA_UPDATE = "LION_DATA_UPDATE";
            this.LION_EXCHANGE_UPDATE = "LION_EXCHANGE_UPDATE";
            this.LION_GOLD_LOCK = "LION_GOLD_LOCK";
            this.LION_VIEW_CLOSE = "LION_VIEW_CLOSE";
            this.LION_TASK_CLICK = "LION_TASK_CLICK";
            this.isLockGold = !1;
            this.isFirst = !0;

            //
            this.init = false;
            
            //解锁中
            this.isUnlocking = false;

            //执行次数
            this.oldNum = -1;
            //
            this.isChangeTask = false;

            //到下一级需要的经验
            this.curLvExp = 0;
            
            //到最后一级需要的经验
            this.toLastExp = 0;

            //经验特效
            this.curData = null;
            
            this.startX = 9999;
            this.startY = 9999;

            this.endX = 9999;
            this.endY = 9999;
            //end经验特效

            //升级特效
            this.oldLv = -1;
            //end升级
        }
        t.prototype.ctor = function() {
            JsonHttp.subscribe(proto_sc.liondance.cfg, this.onCfg, this);
            JsonHttp.subscribe(proto_sc.liondance.shop, this.onShop, this);
            JsonHttp.subscribe(proto_sc.liondance.exchange, this.onExchange, this);
        };
        t.prototype.clearData = function() {
            this.cfg = null;
            this.exchange = null;
            this.hdShop = null;
            this.shopCfg = null;
            this.isLockGold = !1;

            this.onOpenEff = false;

            this.curLvExp = 0;
            this.toLastExp = 0;

            this.pushX = 9999;
            this.pushY = 9999;
        };
        t.prototype.updateExp = function() {
            //刷新当前等级所需经验，以及升到顶所需经验
            this.curLvExp = 0;
            this.toLastExp = 0;

            this.exp = this.cfg.cons;
            for(var idx = 0; idx < this.cfg.rwd.length; idx++)
            {
                if(idx < this.cfg.grade)
                {
                    if(this.cfg.exp[idx].need > this.exp)
                    {
                        //报错，需要重新计算
                    }
                    this.exp -= this.cfg.exp[idx].need;
                }
                else if(idx == this.cfg.grade)
                {
                    //当前等级,计算到下一级需要多少exp
                    this.curLvExp = this.exp;
                    this.toLastExp += this.cfg.exp[idx].need - this.exp;
                }
                else
                {
                    this.toLastExp += this.cfg.exp[idx].need;
                }
            }
        };
        t.prototype.checkAddExp = function(addNum) {
            //以现有经验，计算增加以后会达到的等级
            var allExp = this.cfg.cons + addNum;
            for(var idx = 0; idx < this.cfg.exp.length; idx++)
            {
                if(allExp < this.cfg.exp[idx].need)
                {
                    return idx;
                }
                else
                {
                    allExp -= this.cfg.exp[idx].need;
                }
            }

            return this.cfg.exp[this.cfg.exp.length - 1].id;
        };

        t.prototype.onCfg = function(t) {
            this.cfg = t;

            this.onShop(this.cfg.shop);
            if(this.exchange)
            {
                this.hdShop = {};
                this.hdShop.hid = this.cfg.info.id;
                this.hdShop.stime = this.cfg.info.showTime;
                this.hdShop.rwd = this.exchange;
            }

            this.updateExp();
            facade.send(this.LION_DATA_UPDATE);
        };
        t.prototype.onExchange = function(t) {
            this.exchange = t;
            if(this.cfg)
            {
                this.hdShop = {};
                this.hdShop.hid = this.cfg.info.id;
                this.hdShop.stime = this.cfg.info.showTime;
                this.hdShop.rwd = this.exchange;

                facade.send(i.limitActivityProxy.ACTIVITY_SHOP_UPDATE, this.hdShop);
            }
            facade.send(this.LION_EXCHANGE_UPDATE);
        };
        t.prototype.onShop = function(t) {
            //快速提升配置
            this.shopCfg = t;
        };
        t.prototype.sendLvUp = function(num) {
            //快速升级
            var self = this;
            var req = new proto_cs.huodong.hd6224lvUp();
            req.num = num;
            JsonHttp.send(req, function(){
                self.sendOpenActivity();
            });
        };
        t.prototype.sendOpenActivity = function() {
            JsonHttp.send(new proto_cs.huodong.hd6224Info());
        };
        t.prototype.sendLockGold = function() {
            JsonHttp.send(new proto_cs.huodong.hd6224buy());
        };
        t.prototype.sendChangeTask = function() {
            JsonHttp.send(new proto_cs.huodong.hd6224change());
        };
        t.prototype.sendExchangeTask = function() {
            JsonHttp.send(new proto_cs.huodong.hd6224change());
        };
        t.prototype.sendGetRwd = function(t) {
            var e = new proto_cs.huodong.hd6224Rwd();
            e.id = t;
            JsonHttp.send(e, function() {
                i.timeProxy.floatReward();
            });
        };
        t.prototype.sendGetTask = function(t) {
            var e = new proto_cs.huodong.hd6224task();
            e.id = t;
            JsonHttp.send(e, function(data) {
                i.timeProxy.floatReward();
            });
        };
        t.prototype.getRwdData = function() {
            var data = {};
            data.goldBig = [];
            data.goldNormal = [];
            data.sliveBig = [];
            data.sliveNormal = [];
            //this.cfg.rwd;
            for(var i = 0; i < this.cfg.rwd.length; i ++) {
                var item = this.cfg.rwd[i];
                if(item.gold != null) {
                    for(var j = 0; j < item.gold.length; j ++) {
                        if(item.gold[j].kind == 95) {
                            this.checkToPut(data.goldBig, item.gold[j]);
                        }else {
                            this.checkToPut(data.goldNormal, item.gold[j]);
                        }
                    }
                }
                if(item.silver != null) {
                    for(var j = 0; j < item.silver.length; j ++) {
                        if(item.silver[j].kind == 95) {
                            this.checkToPut(data.sliveBig, item.silver[j]);
                        }else {
                            this.checkToPut(data.sliveNormal, item.silver[j]);
                        }
                    }
                }
            }

            //排序
            data.goldBig.sort((a, b)=> {
                return a.id - b.id;
            });
            data.goldNormal.sort((a, b)=> {
                var aItem = localcache.getItem(
                    localdb.table_item,
                    a.id
                );
                var bItem = localcache.getItem(
                    localdb.table_item,
                    b.id
                );
                if(aItem == null || bItem == null) return 0;
                return bItem.color - aItem.color;
            });
            data.sliveBig.sort((a, b)=> {
                return a.id - b.id;
            });
            data.sliveNormal.sort((a, b)=> {
                var aItem = localcache.getItem(
                    localdb.table_item,
                    a.id
                );
                var bItem = localcache.getItem(
                    localdb.table_item,
                    b.id
                );
                if(aItem == null || bItem == null) return 0;
                return bItem.color - aItem.color;
            });

            return data;
        };


        t.prototype.checkToPut = function(data, item) {
            for(var i = 0; i < data.length; i ++) {
                if(data[i].id == item.id) {
                    data[i].count += item.count;
                    return;
                }
            }
            data.push(JSON.parse(JSON.stringify(item)));
        };
        return t;
    })();
o.LionProxy = n;
