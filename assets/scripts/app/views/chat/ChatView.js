var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("../../Initializer"),
    l = require("../../utils/Utils"),
    r = require("./ChatItem"),
    a = require("../../models/TimeProxy"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.btnList = [];
            e.lblCount = null;
            e.lblFontSize = null;
            e.editContext = null;
            e.nodeTab = null;
            e.nodeContext = null;
            e.chatItem = null;
            e.scroll = null;
            e.nodeUnsend = null;
            e.ndoeSend = null;
            e.list = null;
            e.nodeUnread = null;
            e.lblUnread = null;
            e.labaItem = null;
            e.lblLBCount = null;
            e.labaSprite = null;
            e.labaCheck = null;
            e.nodeLabaTip = null;
            //好友聊天
            e.nodeFriends = null;
            e.friendList = null;
            e.nodeFriendsList = null;
            e.friendChatList = null;
            e.lblFriendChatTitle = null;
            e.editFriendChat = null;
            e.nodeNoMsg = null;
            e.scrollFriendChat = null;
            e.editFriendSearch = null;
            e.nodeSearch = null;
            e.nodeBack = null;
            //end 好友聊天
            e.curIndex = 0;
            e._renders = [];
            e._chatitemId = 0;
            e._unreadCount = 0;
            e._isSend = !1;
            e._curFriendId = 0;
            return e;
        }
        e.prototype.onLoad = function () {
            var t = this.node.openParam;
            if (t) {
                this.curIndex = parseInt(t.type) - 1;
                //this.onClickBtn(null, t.type);
            }
            this._chatitemId = l.utils.getParamInt("chat_item");
            this.chatItem.active = !1;
            this.btnList[2].node.active = !1;
            this.btnList[1].node.active = null != n.unionProxy.clubInfo;
            this.btnList[0].interactable = !1;
            this.btnList[4].interactable = !0;
            //暂时关闭黑名单
            this.btnList[4].node.active = !1;

            this.upItemList();
            this.UPDATE_SCROLL_TO_BOT();
            this.updateLabaMsg();
            this.updateLabaCount();
            facade.subscribe(
                n.chatProxy.UPDATE_BLACK_MSG,
                this.UPDATE_BLACK_MSG,
                this
            );
            facade.subscribe(
                n.chatProxy.UPDATE_CLUB_MSG,
                this.UPDATE_CLUB_MSG,
                this
            );
            facade.subscribe(
                n.chatProxy.UPDATE_KUAFU_MSG,
                this.UPDATE_KUAFU_MSG,
                this
            );
            facade.subscribe(
                n.chatProxy.UPDATE_NOR_MSG,
                this.UPDATE_NOR_MSG,
                this
            );
            facade.subscribe(
                n.chatProxy.UPDATE_SYS_MSG,
                this.UPDATE_SYS_MSG,
                this
            );
            facade.subscribe(
                n.chatProxy.UPDATE_LABA_MSG,
                this.updateLabaMsg,
                this
            );
            facade.subscribe(
                n.chatProxy.UPDATE_SCROLL_TO_BOT,
                this.UPDATE_SCROLL_TO_BOT,
                this
            );
            facade.subscribe(
                n.chatProxy.UPDATE_SCROLL_TO_TOP,
                this.UPDATE_SCROLL_TO_TOP,
                this
            );
            facade.subscribe(
                n.bagProxy.UPDATE_BAG_ITEM,
                this.updateLabaCount,
                this
            );



            //好友聊天
            //获得聊天列表返回
            facade.subscribe(n.haoyouProxy.ON_GET_CHAT_FRIEND_LIST, this.onFriendChatList, this);
            //选中聊天好友
            facade.subscribe(n.haoyouProxy.ON_FRIEND_CHAT_LIST_SELECTED, this.friendChat, this);
            //end 好友聊天
            this.editContext.placeholder = i18n.t("COMMON_INPUT_TXT");
            this.schedule(this.onSendAdok, 5);
            this.onSelect(this.curIndex);
        };

        e.prototype.onDisable = function () {
            //
            n.haoyouProxy.curFriendChat = [];
        };

        e.prototype.updateLabaCount = function () {
            var t = l.utils.getParamInt("speaker_itemid");
            this.lblLBCount.string = n.bagProxy.getItemCount(t) + "";
        };
        e.prototype.onSendAdok = function () {
            n.chatProxy.sendChatAdok();
        };
        e.prototype.delayCreate = function () {
            for (
                var t = n.chatProxy.getMsg(this.getMsgType(this.curIndex))
                    .length,
                    e = [],
                    o = 0; o < t - this._renders.length; o++
            ) {
                var i = cc.instantiate(this.chatItem),
                    l = i.getComponent(r.default);
                i.active = !0;
                this.nodeContext.addChild(i);
                i.setSiblingIndex(0);
                e.push(l);
            }
            for (o = 0; o < this._renders.length; o++) e.push(this._renders[o]);
            this._renders = e;
            this.renderMsg();
        };
        e.prototype.upItemList = function () {
            this.lblCount.string =
                n.bagProxy.getItemCount(this._chatitemId) + "";
        };
        e.prototype.onClickBlack = function () {
            l.utils.openPrefabView("chat/ChatBlackView");
        };
        e.prototype.onClickSend = function () {
            var t = this.editContext.string;
            t = this.editContext.string.trim();
            t = this.editContext.string.replace("\n", "");
            if (a.funUtils.isOpenFun(a.funUtils.chatView))
                if (l.stringUtil.isBlank(t)) l.alertUtil.alert18n("chat_EMPTY");
                else {
                    if (
                        this.labaCheck.interactable &&
                        this.labaCheck.isChecked
                    ) {
                        var e = l.utils.getParamInt("speaker_itemid");
                        if (n.bagProxy.getItemCount(e) < 1) {
                            l.alertUtil.alertItemLimit(e);
                            return;
                        }
                    }
                    this._isSend = !0;
                    n.chatProxy.sendChat(
                        t.substr(0, 60),
                        this.curIndex,
                        this.labaCheck.interactable && this.labaCheck.isChecked ?
                        1 :
                        0
                    );
                    this.editContext.string = "";
                    this.onEditChange(null, null);
                }
            else {
                var o = localcache.getItem(
                    localdb.table_iconOpen,
                    a.funUtils.chatView.id
                );
                l.alertUtil.alert(o.errmsg);
            }
        };
        e.prototype.onClickBtn = function (t, e) {
            this.onSelect(parseInt(e) - 1);
        };
        e.prototype.onEditChange = function (t, e) {
            -1 == this.editContext.string.indexOf("\n") ?
                (this.lblFontSize.string =
                    this.editContext.string.length + "/60") :
                this.onClickSend();
        };
        e.prototype.onSelect = function (t, e) {
            void 0 === e && (e = !0);

            //1:聊天频道,2:宫殿频道,3:姐妹聊天
            if (t == 0) {
                n.chatProxy.channel = 1;
            } else if (t == 5) {
                n.chatProxy.channel = 3;
            } else if (t == 1) {
                n.chatProxy.channel = 2;
            } else {
                n.chatProxy.channel = 0;
            }

            this.nodeUnsend.active = 3 == t || 4 == t;
            this.ndoeSend.active = 3 != t && 4 != t;
            this.curIndex = t;
            for (var o = 0; o < this.btnList.length; o++)
                this.btnList[o].interactable = o != t;
            this.labaCheck.interactable = 0 == t;
            this.updateLaba();
            var i = !e &&
                this.scroll.getScrollOffset().y + this.scroll.node.height <
                this.list.node.height - this.list.item.node.height;
            this.renderMsg(i);
            (i && !this._isSend) ||
            this.scheduleOnce(this.UPDATE_SCROLL_TO_BOT, 0.1);

            //好友聊天
            this.nodeFriends.active = t == 5;
            if (t == 5) {
                //如果是好友聊天需要特殊处理
                //拉聊天数据
                n.haoyouProxy.sendGetListChat();
                //先隐藏聊天列表
                this.nodeFriendsList.active = false;
                //设置显示状态
                this.conctrlFriendNode(1);
            }
            //end 好友聊天


        };

        e.prototype.onClickEnd = function () {
            facade.send(n.chatProxy.HIDE_OTHER_REPORT_MSG);
        };

        e.prototype.updateLaba = function () {
            this.nodeLabaTip.active = this.labaSprite.node.active =
                0 == this.curIndex &&
                this.labaCheck.isChecked &&
                this.labaCheck.interactable;
        };
        e.prototype.renderMsg = function (t) {
            void 0 === t && (t = !1);
            var e = n.chatProxy.getMsg(this.getMsgType(this.curIndex));
            this.nodeUnread.active = !1;
            if (t) {
                var o = this.list.data ? this.list.data.length : 0;
                this.nodeUnread.active = e.length > o;
                this._unreadCount = this._unreadCount + e.length - o;
                this.lblUnread.string = i18n.t("CAHT_UNREAD", {
                    d: this._unreadCount
                });
            }
            this.list.data = e;
        };
        e.prototype.getMsgType = function (t) {
            switch (t) {
                case 0:
                    return n.chatProxy.norMsg;

                case 1:
                    return n.chatProxy.clubMsg;

                case 2:
                    return n.chatProxy.kuafuMsg;

                case 3:
                    return n.chatProxy.sysMsg;

                case 4:
                    return n.chatProxy.blackMsg;
            }
            return null;
        };
        e.prototype.updateScollChange = function () {
            if (
                this.nodeUnread.active &&
                this.scroll.getScrollOffset().y + this.scroll.node.height >
                this.list.node.height - this.list.item.node.height
            ) {
                this.nodeUnread.active = !1;
                this._unreadCount = 0;
                this._isSend = !1;
            }
        };
        e.prototype.onClickClose = function () {
            l.utils.closeView(this);
        };
        e.prototype.updateLabaMsg = function () {
            this.labaItem.node.active =
                n.chatProxy.laba &&
                n.chatProxy.laba.length > 0 &&
                n.chatProxy.laba[0].time + 3600 > l.timeUtil.second;
            this.labaItem.node.active &&
                (this.labaItem.data = n.chatProxy.laba[0]);
        };
        e.prototype.UPDATE_BLACK_MSG = function () {
            this.updateShow(4);
        };
        e.prototype.UPDATE_CLUB_MSG = function () {
            this.updateShow(1);
        };
        e.prototype.UPDATE_KUAFU_MSG = function () {
            this.updateShow(2);
        };
        e.prototype.UPDATE_NOR_MSG = function () {
            this.updateShow(0);
        };
        e.prototype.UPDATE_SYS_MSG = function () {
            this.updateShow(3);
        };
        e.prototype.updateShow = function (t) {
            if (t == this.curIndex) {
                this.onSelect(this.curIndex, !1);
                this.updateLabaMsg();
            }
        };
        e.prototype.UPDATE_SCROLL_TO_BOT = function () {
            this.nodeUnread.active = !1;
            this._unreadCount = 0;
            this._isSend = !1;
            this.scroll.scrollToBottom();
        };
        e.prototype.UPDATE_SCROLL_TO_TOP = function () {
            this.scroll.scrollToTop();
        };
        //好友聊天
        e.prototype.onFriendChatList = function () {
            if (n.haoyouProxy.curSelectId > 0 && n.haoyouProxy.goChat) {
                //如果有选中的目标，先取私聊列表
                n.haoyouProxy.sendHistoryChat(n.haoyouProxy.curSelectId);
            }

            //这里需要先筛选一遍，把非好友的去掉
            var chatFriends = [];
            for (var idx = 0; idx < n.haoyouProxy.friendsChat.length; idx++) {
                var friend = n.haoyouProxy.friendsChat[idx];
                if (n.haoyouProxy.isFriend(friend.id)) {
                    chatFriends.push(friend);
                }
            }
            this.friendList.data = chatFriends;
            this.onClickFriendChatBack();
        };
        e.prototype.friendChat = function (id) {
            //点击好友回调
            if (id <= 0 && !n.haoyouProxy.goChat)
                return;

            this._curFriendId = id;

            //暂无消息图标
            this.nodeNoMsg.active = l.stringUtil.isBlank(n.haoyouProxy.curFriendChat.length);


            for (var idx = 0; idx < n.haoyouProxy.friends.length; idx++) {
                if (n.haoyouProxy.friends[idx].id == this._curFriendId) {
                    //名字
                    this.lblFriendChatTitle.string = i18n.t("HAOYOU_TALK_TO", {
                        name: n.haoyouProxy.friends[idx].name
                    });
                }
            }

            //显示界面
            this.nodeFriendsList.active = true;

            //赋值要在active后面
            this.friendChatList.data = n.haoyouProxy.curFriendChat;
            //
            this.friendChatList.updateShow();
            this.scrollFriendChat.scrollToBottom();

            //
            n.haoyouProxy.goChat = false;

            //界面打开开始拉数据
            this.schedule(this.onGetCurFriendChat, 3);
        };

        e.prototype.onClickFriendChatBack = function () {
            //从好友聊天面板返回聊天好友列表
            this.nodeFriendsList.active = false;
            n.haoyouProxy.curFriendChat = [];
        };
        e.prototype.onClickSendFriendChat = function () {
            //发送私聊
            if (this._curFriendId <= 0)
                return;

            var str = this.editFriendChat.string;
            str = this.editFriendChat.string.trim();
            str = this.editFriendChat.string.replace("\n", "");
            if (!l.stringUtil.isBlank(str)) {
                n.haoyouProxy.sendFriendChat(this._curFriendId, str);
                this.editFriendChat.string = "";
            } else {
                l.alertUtil.alert18n("chat_EMPTY");
            }
        };
        e.prototype.onClickSearch = function () {
            //搜索好友
            var lst = [];
            var name = this.editFriendSearch.string;
            for (var idx = 0; idx < n.haoyouProxy.friendsChat.length; idx++) {
                var user = n.haoyouProxy.getUser(n.haoyouProxy.friendsChat[idx].id)
                if (user && user.name == name) {
                    //找到好友
                    lst.push(n.haoyouProxy.friendsChat[idx]);
                }
            }

            if (lst.length > 0) {
                this.friendList.data = lst;

                //界面控制
                this.conctrlFriendNode(2);
            } else {
                l.alertUtil.alert18n("HAOYOU_SEARCH_NOT_FOUND");
            }

            //清空对话框
            this.editFriendSearch.string = "";
        };
        e.prototype.onClickBack = function () {
            //从搜索列表返回
            this.conctrlFriendNode(1);
            n.haoyouProxy.sendGetListChat();
        };
        e.prototype.onClickBackFriends = function () {
            //从好友聊天回到好友列表
            n.haoyouProxy.sendGetListChat();
        };

        e.prototype.conctrlFriendNode = function (tab) {
            //控制界面显示 1显示搜索， 2显示撤回
            this.nodeSearch.active = 1 == tab;
            this.nodeBack.active = 2 == tab;
        };

        e.prototype.onGetCurFriendChat = function () {
            //好友列表打开的情况下3秒拉一下数据
            if (this.nodeFriendsList.active == false || this._curFriendId <= 0) {
                this.unschedule(this.onGetCurFriendChat);
                return;
            }

            n.haoyouProxy.sendHistoryChat(this._curFriendId);
        };

        //end 好友聊天
        __decorate([_([cc.Button])], e.prototype, "btnList", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblCount", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblFontSize", void 0);
        __decorate([_(cc.EditBox)], e.prototype, "editContext", void 0);
        __decorate([_(cc.Node)], e.prototype, "nodeTab", void 0);
        __decorate([_(cc.Node)], e.prototype, "nodeContext", void 0);
        __decorate([_(cc.Node)], e.prototype, "chatItem", void 0);
        __decorate([_(cc.ScrollView)], e.prototype, "scroll", void 0);
        __decorate([_(cc.Node)], e.prototype, "nodeUnsend", void 0);
        __decorate([_(cc.Node)], e.prototype, "ndoeSend", void 0);
        __decorate([_(i.default)], e.prototype, "list", void 0);
        __decorate([_(cc.Node)], e.prototype, "nodeUnread", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblUnread", void 0);
        __decorate([_(r.default)], e.prototype, "labaItem", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblLBCount", void 0);
        __decorate([_(cc.Sprite)], e.prototype, "labaSprite", void 0);
        __decorate([_(cc.Toggle)], e.prototype, "labaCheck", void 0);
        __decorate([_(cc.Node)], e.prototype, "nodeLabaTip", void 0);
        __decorate([_(cc.Node)], e.prototype, "nodeFriends", void 0); //好友面板
        __decorate([_(i.default)], e.prototype, "friendList", void 0); //好友列表
        __decorate([_(cc.Node)], e.prototype, "nodeFriendsList", void 0); //好友聊天面板
        __decorate([_(i.default)], e.prototype, "friendChatList", void 0); //好友聊天列表
        __decorate([_(cc.Label)], e.prototype, "lblFriendChatTitle", void 0); //标题
        __decorate([_(cc.EditBox)], e.prototype, "editFriendChat", void 0); //好友聊天输入框
        __decorate([_(cc.Node)], e.prototype, "nodeNoMsg", void 0); //暂无信息
        __decorate([_(cc.ScrollView)], e.prototype, "scrollFriendChat", void 0); //好友私聊
        __decorate([_(cc.EditBox)], e.prototype, "editFriendSearch", void 0); //好友搜索
        __decorate([_(cc.Node)], e.prototype, "nodeSearch", void 0); //好友聊天搜索面板
        __decorate([_(cc.Node)], e.prototype, "nodeBack", void 0); //好友聊天返回面板
        return (e = __decorate([c], e));
    })(cc.Component);
o.default = d;