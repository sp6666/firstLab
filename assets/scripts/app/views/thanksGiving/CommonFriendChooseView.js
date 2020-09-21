const Utils = require("../../utils/Utils");
const Initializer = require("../../Initializer");
const List = require("../../component/List");

cc.Class({
    extends: cc.Component,

    properties: {
        list:List.default,
        editAccount:cc.EditBox,
    },


    onLoad () {
        this.onShowData();
    },


    onShowData: function(){
        this.list.data = Initializer.thanksGivingProxy.friends;
    },


    onClickClose: function() {
        Utils.utils.closeView(this);
    },

    onItemChoose : function (t, e) {
        var o = e ? e.data : null;
        facade.send(Initializer.thanksGivingProxy.THANKSGIVING_ON_FRIEND_LIST_SELECTED, o);
        this.onClickClose();
    },

    onSearchClick : function () {
        var id = this.editAccount.string;
        if(id == "") {
            this.list.data = Initializer.thanksGivingProxy.friends;
            return;
        }

        var list = Initializer.thanksGivingProxy.friends;
        var searched = false;
        for(var idx = 0; idx < list.length; idx ++) {
            if(list[idx].id == parseInt(id)) {
                this.list.data = [list[idx]];
                searched = true;
                break;
            }
        }

        if(!searched) {
            Utils.alertUtil.alert18n("USER_999");
            return;
        }
    }
});
