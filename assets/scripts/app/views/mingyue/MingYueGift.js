var u = require("../../utils/Utils"),
    n = require("../../Initializer"),
    List = require("../../component/List");

cc.Class({
    extends: cc.Component,

    properties: {
        list:List.default,
        editAccount:cc.EditBox
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        facade.subscribe(n.mingyueProxy.MINGYUE_UPDATE_ITEM,this.onShowData,this);

        this.onShowData();
    },

    // start () {

    // },

    // update (dt) {},

    onShowData: function(){
        this.list.data = n.mingyueProxy.foodList;
        
        //editbox
        if(!u.stringUtil.isBlank(n.mingyueProxy.userId)){
            this.editAccount.string = n.mingyueProxy.userId;
        }
        else{
            this.editAccount.string = "";
        }  
    },

    onTextChange: function() {
        n.mingyueProxy.userId = this.editAccount.string;

        //save to local 
        // n.timeProxy.saveLocalValue("mingyue_user_id",n.mingyueProxy.userId);
    },

    onClickClose: function() {
        u.utils.closeView(this);
    },
});
