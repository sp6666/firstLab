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

            //获得好友列表
            this.ON_GET_FRIEND_LIST = "ON_GET_FRIEND_LIST";
            this.ON_GET_RECOMMEND_LIST = "ON_GET_RECOMMEND_LIST"; //推荐好友列表返回
            this.ON_GET_APPLY_FRIEND_LIST = "ON_GET_APPLY_FRIEND_LIST"; //申请列表
            this.ON_GET_SEARCH_FRIEND_LIST = "ON_GET_SEARCH_FRIEND_LIST"; //搜索结果
            this.ON_GET_CHAT_FRIEND_LIST = "ON_GET_CHAT_FRIEND_LIST"; //好友聊天数据

            this.ON_FRIEND_LIST_SELECTED = "ON_FRIEND_LIST_SELECTED"; //选中好友
            this.ON_FRIEND_CHAT_LIST_SELECTED = "ON_FRIEND_CHAT_LIST_SELECTED"; //选中聊天好友

            this.ON_FRIEND_APPLY_SUCCESS = "ON_FRIEND_APPLY_SUCCESS"; //申请成功

            //变量
            this.friends = null;
            this.applyFriends = null;
            this.searchFriends = null; //搜索结果
            this.friendRecommend = []; //推荐好友列表
            this.friendsChat = null; //好友聊天
            this.curFriendChat = null; //选中的某一个好友的聊天列表

            this.curSelectId = 0; //好友界面当前选中的id
            this.upLimit = 0; //加好友上限
            this.recommendIndex = 0; //推荐好友idx
            this.goChat = false; //直接聊天
            this.usedList = []; //临时保存已经申请过的人
        }
        t.prototype.ctor = function () {
            //协议 
            //好友列表
            JsonHttp.subscribe(proto_cs.friends.flist, this.onFriends, this);
            //好友申请列表
            JsonHttp.subscribe(proto_cs.friends.fapplylist, this.onApplyFriends, this);
            //好友聊天列表
            //JsonHttp.subscribe(proto_cs.friends.fllist, this.onCurChat, this);
            //搜索结果
            //JsonHttp.subscribe(proto_cs.friends.fuser, this.onSearchFriends, this);
            //聊天数据
            JsonHttp.subscribe(proto_cs.friends.flchat, this.onChatFriends, this);
            //拉推荐列表
            //JsonHttp.subscribe(proto_cs.friends.recommend, this.onRecommend, this);
        };
        t.prototype.clearData = function () {
            this.friends = null;
            this.applyFriends = null;
            this.searchFriends = null; //搜索结果
            this.friendRecommend = [];
            this.friendsChat = null; //好友聊天
            this.curFriendChat = null; //选中的某一个好友的聊天列表

            this.curSelectId = 0; //好友界面当前选中的id
            this.upLimit = 0; //加好友上限
            this.recommendIndex = 0; //推荐好友idx
            this.goChat = false; //直接聊天
            this.usedList = []; //临时保存已经申请过的人
        };
        //数据处理
        t.prototype.getFriendInfo = function (uid) {
            for (var idx = 0; idx < this.friends.length; idx++) {
                if (uid == this.friends[idx].id) {
                    return this.friends[idx];
                }
            }
        };
        t.prototype.addData = function (t, e) {
            for (var o = 0; o < e.length; o++) {
                var i = e[o];
                t.push(i);
                t.length > this.limitCount && t.splice(0, 1);
            }
        };
        t.prototype.getRecommend = function () {
            //提取推荐列表
            var curList = [];
            curList = this.friendRecommend[this.recommendIndex];

            return curList;
        };
        t.prototype.addRecommendIdx = function () {
            this.recommendIndex += 1;
            if (this.recommendIndex >= this.friendRecommend.length) {
                this.recommendIndex = 0;
            }
        };
        t.prototype.isApplied = function (id) {
            if(!this.usedList || this.usedList.length <= 0)
            {
                return false;
            }

            //是否已申请，这里只查了内存中的内容
            for (var idx = 0; idx < this.usedList.length; idx++) {
                if (this.usedList[idx] == id) {
                    return true;
                }
            }

            return false;
        };
        t.prototype.addToApplied = function (id) {
            if (!this.isApplied(id)) {
                this.usedList.push(id);
            }
        };
        t.prototype.isFriend = function (id) {
            if(id <= 0)
            {
                return false;
            }

            for (var idx = 0; idx < this.friends.length; idx++) {
                if (id == this.friends[idx].id) {
                    return true;
                }
            }

            return false;
        };
        t.prototype.sortFriends = function (t, r) {
            //好友列表排序
            return r.shili - t.shili;
        };
        t.prototype.sortChat = function(t, r){
            if((t.status > 0 && r.status > 0) || (r.status <= 0 && t.status <= 0))
            {
                return 0;
            }
            else if(t.status > 0 && r.status < 0)
            {
                return t.status;
            }
            else
            {
                return r.status;
            }

        }
        t.prototype.chectFriendUpgrade = function( list ){
            if(list.length <= 0 || this.friends.length <= 0)
            {
                return;
            }
            //检查列表、
            for(var idx = 0; idx < list.length; idx++)
            {
                var oldFriend = this.getFriendInfo(list[idx].id);
                if(oldFriend)
                {
                    if(oldFriend.flv < list[idx].flv)
                    {
                        utils.alertUtil.alert(i18n.t("GUANXI_LBL_UPGRADE",{name: oldFriend.name}));
                        break;
                    }
                }
            }
        }

        //接收数据
        t.prototype.onFriends = function (t) {
            //这里需要做个比较，如果有好友升级就要做提示
            if(t.list && this.friends)
            {
                this.chectFriendUpgrade(t.list);
            }
            //好友列表
            this.friends = [];
            var online = [];
            var offline = [];
            
            for(var idx = 0; idx < t.list.length; idx++)
            {
                if((utils.timeUtil.second - t.list[idx].last_operation) < 60)
                {
                    online.push(t.list[idx]);
                }
                else
                {
                    offline.push(t.list[idx]);
                }
            }

            online.sort(this.sortFriends);
            offline.sort(this.sortFriends);


            for(var idx = 0; idx < online.length; idx++)
            {
                this.friends.push(online[idx]);
            }
            for(var idx = 0; idx < offline.length; idx++)
            {
                this.friends.push(offline[idx]);
            }

            //this.friends.sort(this.sortFriends);
            this.upLimit = t.uplimit;
            facade.send(this.ON_GET_FRIEND_LIST);
        };
        t.prototype.onRecommend = function (t) {
            //接收推荐好友列表 
            if(t)
            {
                this.friendRecommend = [];
                for(var idx = 0; idx < t.length; idx++)
                {
                    //如果此列表有推荐好友才保存到内存
                    if(t[idx].length > 0)
                    {
                        this.friendRecommend.push(t[idx]);
                    }
                }
            }
            facade.send(this.ON_GET_RECOMMEND_LIST);
        };
        t.prototype.onApplyFriends = function (t) {
            //申请列表 如果获得，说明申请成功 **info去掉，传了id
            this.applyFriends = t.list;
            facade.send(this.ON_GET_APPLY_FRIEND_LIST);

            //更新红点
            red.default.change("haoyou", this.applyFriends.length > 0 && time.funUtils.isOpen(time.funUtils.haoyou));
        };
        t.prototype.onSearchFriends = function (t) {
            //搜索结果
            this.searchFriends = t;
            facade.send(this.ON_GET_SEARCH_FRIEND_LIST);
        };
        t.prototype.onChatFriends = function (t) {
            //好友聊天数据 **加了一个id字段
            this.friendsChat = t;
            facade.send(this.ON_GET_CHAT_FRIEND_LIST);
        };
        t.prototype.onCurChat = function (t) {
            //好友私聊数据 
            var self = this;
            
            //如果当前好友列表没有创建或者聊天记录是0的话，初始化列表
            if(!this.curFriendChat || t.length <= 0)
            {
                this.curFriendChat = [];
            }

            if (t.length > 0) {
                //如果有聊天记录，比较聊天记录和当前保留的记录
                if(t[0].sllist.length == this.curFriendChat.length && !this.goChat)
                {
                    var same = true;
                    for(var idx = 0; idx < t[0].sllist.length && idx < this.curFriendChat.length; idx++)
                    {
                        var lst = t[0].sllist[idx];
                        var cur = this.curFriendChat[idx];
                        if(lst.uid != cur.uid || lst.msg != cur.msg)
                        {
                            same = false;
                            break;
                        }
                    }

                    if(same)
                    {
                        return;
                    }
                }

                this.curFriendChat = [];
                var curFriend = t[0].sllist;
                for (var idx = 0; idx < curFriend.length; idx++) {
                    var cur = curFriend[idx];
                    cur.user = this.getUser(curFriend[idx].uid);
                    this.curFriendChat.push(cur);
                }
            }
            var curId = utils.stringUtil.isBlank(curFriend) ? this.curSelectId : t[0].id; //如果目前没有好友聊天数据的话，就用当前选中的好友的id
            facade.send(self.ON_FRIEND_CHAT_LIST_SELECTED, curId);
        };

        //发送
        t.prototype.sendFriends = function () {
            //拉好友列表
            var self = this;
            JsonHttp.send(new proto_cs.friends.flist(), function (t) {
                var data = t;
                init.playerProxy.startTopViewMsg += 1;
                facade.send(init.playerProxy.TOP_VIEW_MSG);
            });
        };
        t.prototype.sendFrecommend = function () {
            //拉取推荐列表
            var self = this;
            JsonHttp.send(new proto_cs.friends.frecommend(), function (t) {
                if (!utils.stringUtil.isBlank(t.a.system.errror)) {
                    //报错
                } else if (!utils.stringUtil.isBlank(t.a.friends) && !utils.stringUtil.isBlank(t.a.friends.recommend)) {
                    self.onRecommend(t.a.friends.recommend)
                }
            });
        };
        t.prototype.sendApplyFriends = function () {
            //申请好友列表
            JsonHttp.send(new proto_cs.friends.fapplylist(), function (t) {
                var data = t;
                init.playerProxy.startTopViewMsg += 1;
                facade.send(init.playerProxy.TOP_VIEW_MSG);
            });
        };
        t.prototype.sendFApplay = function (id) {
            //申请好友，对方的id
            var self = this;
            var req = new proto_cs.friends.fapply();
            req.fuid = id;
            JsonHttp.send(req, function (t) {
                if (!utils.stringUtil.isBlank(t.a.system.errror)) {
                    //报错
                } else {
                    //直接用传入的id
                    self.addToApplied(id);
                    facade.send(self.ON_FRIEND_APPLY_SUCCESS, id);
                }
            });
        };
        t.prototype.sendFriendSearch = function (id) {
            //搜索      id: 搜索玩家的id
            var self = this;
            var req = new proto_cs.friends.fsearch();
            req.id = id;
            JsonHttp.send(req, function (t) {
                self.searchFriends = t.a.friends.fuser;
                facade.send(self.ON_GET_SEARCH_FRIEND_LIST);
            });
        };
        t.prototype.sendfriendOK = function (id) {
            //同意好友申请      fox：申请玩家的id， 0代表一键拒绝
            var req = new proto_cs.friends.fok();
            req.fuid = id;
            JsonHttp.send(req, function (t) {
                if (!utils.stringUtil.isBlank(t.a.system.errror)) {
                    //报错
                } else {
                    utils.alertUtil.alert18n("HAOYOU_TIANJIA_SUCCESS");
                }
            });
        };
        t.prototype.sendfriendNo = function (id) {
            //拒绝好友申请      fno：申请玩家的id， 0代表一键拒绝
            var req = new proto_cs.friends.fno();
            req.fuid = id;
            JsonHttp.send(req, function (t) {
                var data = t;
            });
        };
        t.prototype.sendfriendSub = function (id) {
            //删除好友          fsub：申请玩家的id， 0代表一键拒绝
            var self = this;
            var req = new proto_cs.friends.fsub();
            req.fuid = id;
            JsonHttp.send(req, function (t) {
                var data = t;
                if (!utils.stringUtil.isBlank(t.a.system.errror)) {
                    //报错
                } else {
                    utils.alertUtil.alert18n("HAOYOU_SUB_SUCCESS");
                    self.sendFriends();
                }
            });
        };

        //好友聊天
        t.prototype.sendGetListChat = function () {
            //获取聊天好友的列表
            this.friendsChat = [];
            var self = this;
            var req = new proto_cs.friends.flchat();
            JsonHttp.send(req, function (t) {
                if (!utils.stringUtil.isBlank(t.a.system.errror)) {
                    //报错
                } else //if(!utils.stringUtil.isBlank(t.a.friends) && !utils.stringUtil.isBlank(t.a.friends.fsllist))
                {
                    if (utils.stringUtil.isBlank(t.a.friends.fsllist.length)) {
                        //如果这地方没有拿到数组
                        var chatList = [];
                        for (var key in t.a.friends.fsllist) {
                            var item = t.a.friends.fsllist[key];
                            chatList.push(item);
                        }
                        self.friendsChat = chatList;
                    } else {
                        self.friendsChat = t.a.friends.fsllist;
                    }

                    facade.send(self.ON_GET_CHAT_FRIEND_LIST);
                }
            });
        };
        t.prototype.sendFriendChat = function (id, msg) {
            //发送私聊     fuid:好友id.  msg:聊天内容
            var self = this;
            var req = new proto_cs.friends.fschat();
            req.fuid = id;
            req.msg = msg;
            JsonHttp.send(req, function (t) {
                if (!utils.stringUtil.isBlank(t.a.system.errror)) {
                    //报错
                } else if (!utils.stringUtil.isBlank(t.a.friends) && !utils.stringUtil.isBlank(t.a.friends.fllist)) {
                    var value = t.a.friends.fllist[0];
                    if (!utils.stringUtil.isBlank(value)) {
                        //压入聊天列表
                        var cur = value;
                        cur.user = self.getUser(value.uid);
                        self.curFriendChat.push(cur);
                        facade.send(self.ON_FRIEND_CHAT_LIST_SELECTED, id);
                    }
                }
            });
        };
        t.prototype.sendHistoryChat = function (id) {
            //获取和某个好友私聊的列表     fuid:好友id
            var self = this;
            var req = new proto_cs.friends.fhistory();
            req.fuid = id;
            JsonHttp.send(req, function (t) {
                if (utils.stringUtil.isBlank(t.a.friends) || utils.stringUtil.isBlank(t.a.friends.fllist)) {
                    var lst = [];
                    self.onCurChat(lst);
                } else {
                    self.onCurChat(t.a.friends.fllist);
                }
            });
        };

        //
        t.prototype.getUser = function (id) {
            //拼接user
            //先判断是不是自己
            if (id == init.playerProxy.userData.uid) {
                var user = {};
                user.uid = init.playerProxy.userData.uid;
                user.name = init.playerProxy.userData.name;
                user.job = init.playerProxy.userData.job;
                user.sex = init.playerProxy.userData.sex;
                user.level = init.playerProxy.userData.level;
                user.vip = init.playerProxy.userData.vip;
                user.chenghao = init.playerProxy.userData.chenghao;
                user.clothe = init.playerProxy.clothes;
                user.headavatar = init.playerProxy.headavatar;

                return user;
            }

            for (var idx = 0; idx < this.friends.length; idx++) {
                if (this.friends[idx].id == id) {
                    var user = {};
                    user.uid = this.friends[idx].id;
                    user.name = this.friends[idx].name;
                    user.job = this.friends[idx].job;
                    user.sex = this.friends[idx].sex;
                    user.level = this.friends[idx].level;
                    user.vip = this.friends[idx].vip;
                    user.chenghao = this.friends[idx].chenghao;
                    user.clothe = this.friends[idx].clothe;
                    user.headavatar = this.friends[idx].headavatar;
                    return user;
                }
            }

            return {};
        };
        //end 好友聊天

        return t;
    })();
o.HaoyouProxy = r;