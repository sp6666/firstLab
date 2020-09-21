var u = require("../../utils/Utils"),
    n = require("../../Initializer"),
    List = require("../../component/List"),
    UserHeadItem = require("../user/UserHeadItem"),
    ShaderUtils = require("../../utils/ShaderUtils");
cc.Class({
    extends: cc.Component,

    properties: {
        list:List.default,
        nodeHead: UserHeadItem.default,
        lblPlayerName:  cc.Label,
        lblPlayerId : cc.Label,
        friendNode : cc.Node,
        itemArray : [cc.Sprite],
        lblTip : cc.Label,
    },



    onLoad () {
        facade.subscribe(n.thanksGivingProxy.THANKSGIVING_UPDATE_ITEM,this.onShowData,this);
        facade.subscribe(n.thanksGivingProxy.THANKSGIVING_ON_FRIEND_LIST_SELECTED,this.onChooseFriend,this);
        this.friendNode.active = false;
        this.lblTip.node.active = true;
        this.onShowData();
    },


    onShowData: function(){
        this.list.data = n.thanksGivingProxy.foodList;
    },



    onClickClose: function() {
        n.thanksGivingProxy.clearUserData();
        u.utils.closeView(this);
    },

    onClickFriend : function() {
        u.utils.openPrefabView("thanksGiving/CommonFriendChooseView", false);  
    },

    onChooseFriend : function (t) {
        if(t == null) return;
        this.friendNode.active = true;
        this.lblTip.node.active = false;
        n.thanksGivingProxy.userData = t;
        n.thanksGivingProxy.userId = t.id;
        this.nodeHead.setUserHead(t.job, t.headavatar);
        this.lblPlayerName.string = t.name;
        this.lblPlayerId.string = i18n.t("USER_ID", {id : t.id});
        var foodData = t.data;
        for(var idx = 0; idx < foodData.length; idx ++) {
            if(foodData[idx].num <= 0 && this.itemArray[idx] != null) {
                ShaderUtils.shaderUtils.setImageGray(this.itemArray[idx], true);
            }else if(foodData[idx].num > 0 && this.itemArray[idx] != null){
                ShaderUtils.shaderUtils.setImageGray(this.itemArray[idx], false);
            }
        }
    }
});
