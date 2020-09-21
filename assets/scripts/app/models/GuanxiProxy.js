var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var init = require("../Initializer"),
    red = require("../component/RedDot"),
    utils = require("../utils/Utils"),
    time = require("./TimeProxy"),
    r = (function () {
        function t() {
            this.ON_GET_RELATION_LIST = "ON_GET_RELATION_LIST"; //获得关系数据
            this.ON_GET_RELATION_RWD = "ON_GET_RELATION_RWD"; //领取关系奖励回调
            this.ON_RELATION_SELECT = "ON_RELATION_SELECT"; //选中关系好友
            this.ON_RELATION_FLOWER_SELECT = "ON_RELATION_FLOWER_SELECT"; //选中鲜花
            this.ON_RELATION_FLOWER_SET = "ON_RELATION_FLOWER_SET"; //在数量界面中设置鲜花
            this.ON_RELATION_FLOWER_GIVE_BACK = "ON_RELATION_FLOWER_GIVE_BACK"; //送花返回

            //关系好友列表
            this.relation = null;

            //当前选中鲜花
            this.curSelectFlowerId = 0;

            //已领取奖励的档次
            this.getRwd = 0;

            //当前奖励
            this.curRwd = null;

            //当前等级配置
            this.curLvCfg = null;

            //下一等级配置
            this.nextLvCfg = null;

            //下一级
            this.nextRwd = null;

            //最高可领取
            this.lastRwd = null;

            //最高fsClass
            this.maxFs = 7;

            //自己的友情值
            this.selfFriendPt = 0;

            //打开类型
            this.relationType = 0; //0不弹窗， 1弹窗

            //临时保存送花增加值
            this.givePt = 0;
        }
        t.prototype.ctor = function () {
            //协议 
            //好友列表   
            JsonHttp.subscribe(proto_sc.friends.relationship, this.onRelation, this);

            //送花返回
            JsonHttp.subscribe(proto_sc.flowerFriend.give, this.onGive, this);
        };
        t.prototype.clearData = function () {
            this.relation = null;
        };
        //数据处理
        t.prototype.sortRelation = function (t, e) {
            return -(t.relationship - e.relationship);
        };
        t.prototype.getColor = function (fsClass) {
            switch (this.maxFs - fsClass) {
                case 1: {
                    return "#6a31c1";
                }
                case 2: {
                    return "#b64f31";
                }
                case 3: {
                    return "#867d19";
                }
                case 4: {
                    return "#1a8488";
                }
                case 5: {
                    return "#1c965c";
                }
                case 6: {
                    return "#757b80";
                }
                default: {
                    return "#757b80";
                }
            }
        };
        t.prototype.searchGXConfig = function (score) {
            //根据分数查找自己档次
            var tab = localcache.getList(localdb.table_friendship_level);
            for (var idx = tab.length - 1; idx >= 0; idx--) {
                if (score >= tab[idx].need) {
                    if (idx >= (tab.length - 1) || score < tab[idx + 1].need) {
                        //最后一档，就认为是当前档 没有下一档
                        return tab[idx];
                    }
                }
            }

            return null;
        };
        t.prototype.searchOtherLevel = function (score) {
            //根据分数查找别人等级
            var tab = localcache.getList(localdb.table_friendship_other_level);
            for (var idx = tab.length - 1; idx >= 0; idx--) {
                if (score >= tab[idx].need) {
                    if (idx >= (tab.length - 1) || score < tab[idx + 1].need) {
                        //最后一档，就认为是当前档 没有下一档
                        return tab[idx];
                    }
                }
            }

            return null;
        };
        t.prototype.searchOtherClass = function (score) {
            var tab = localcache.getList(localdb.table_friendship_class);
            for (var idx = tab.length - 1; idx >= 0; idx--) {
                if (score >= tab[idx].need) {
                    if (idx >= (tab.length - 1) || score < tab[idx + 1].need) {
                        //最后一档，就认为是当前档 没有下一档
                        return tab[idx];
                    }
                }
            }

            return null;
        };

        //接收数据
        t.prototype.onRelation = function (t) {
            //防止后端数据错误
            this.selfFriendPt = 0;
            if (t.list) {
                if (t.list.length > 0) {
                    for (var idx = 0; idx < t.list.length; idx++) {
                        this.selfFriendPt += t.list[idx].score;
                    }
                }
            } else if (this.relation) {
                if (this.relation.length > 0) {
                    for (var idx = 0; idx < this.relation.length; idx++) {
                        this.selfFriendPt += this.relation[idx].score;
                    }
                }
            }

            //防止数据错误
            if(!t.rwd)
            {
                t.rwd = 0;
            }
            if(!t.cons)
            {
                t.cons = 0;
            }

            //已领取的最后一次
            this.getRwd = t.rwd;

            //当前可领奖的等级
            var rwd = t.rwd < t.cons ? t.rwd + 1 : t.cons + 1;
            this.curRwd = localcache.getItem(localdb.table_friendship_class, rwd + "");

            //最高可领奖的等级
            this.lastRwd = localcache.getItem(localdb.table_friendship_class, t.cons + "");

            //当前等级配置
            this.curLvCfg = this.searchGXConfig(this.selfFriendPt);

            if(this.curLvCfg)
            {
                //下一等级配置，这里是等级，用来显示属性加成
                var tab = localcache.getList(localdb.table_friendship_level);
                var lastLv = tab[tab.length - 1].level;
                var nextLv = this.curLvCfg.level < lastLv ? (this.curLvCfg.level + 1) : lastLv;
                this.nextLvCfg = localcache.getItem(localdb.table_friendship_level, nextLv + "");
            }

            //好友列表
            if (!t.list) {
                init.timeProxy.floatReward();
                facade.send(this.ON_GET_RELATION_RWD);
            } else {
                this.relation = [];
                for (var idx = 0; idx < t.list.length; idx++) {
                    var item = {};
                    item.id = t.list[idx].id; //id
                    item.score = t.list[idx].score; //分数
                    item.rank = idx + 1; //排行
                    this.relation.push(item);
                }
                facade.send(this.ON_GET_RELATION_LIST);
            }
        };
        t.prototype.onGive = function (t) {
            var data = t;
            var strName = "";
            for (var idx = 0; idx < init.haoyouProxy.friends.length; idx++) {
                if (init.haoyouProxy.friends[idx].id == t.fuid) {
                    init.haoyouProxy.friends[idx].fnum = t.fnum;
                    strName = init.haoyouProxy.friends[idx].name;
                    break;
                }
            }

            if (!utils.stringUtil.isBlank(strName)) {
                var str = i18n.t("GUANXI_TIP_RELATION_TO", {
                    name: strName,
                    num: init.guanxiProxy.givePt
                });
                utils.alertUtil.alert(str);
            }

            init.flowerFriendProxy.onGive(t);
        };

        //发送请求
        t.prototype.sendRelation = function (t) {
            this.relationType = t;
            //拉取关系列表
            JsonHttp.send(new proto_cs.friends.relation_list(), function (t) {
                var data = t;
                init.playerProxy.startTopViewMsg += 1;
                facade.send(init.playerProxy.TOP_VIEW_MSG);
            });
        };
        t.prototype.sendGive = function (uid, num, flowerId, fnum) {
            this.givePt = fnum * num;
            var self = this;
            //送花 uid是好友id， num是数量， flowerId是花的id
            var req = new proto_cs.flowerFriend.give();
            req.fuid = uid;
            req.num = num;
            req.itemid = flowerId;
            JsonHttp.send(req, function (t) {
                var data = t;
                facade.send(self.ON_RELATION_FLOWER_GIVE_BACK);
            });
        };
        t.prototype.sendGetRwd = function () {
            //领取奖励
            JsonHttp.send(new proto_cs.friends.get_rwd(), function (t) {
                var data = t;
                facade.send(self.ON_RELATION_FLOWER_GIVE_BACK);
            });
        };

        return t;
    })();
o.GuanxiProxy = r;