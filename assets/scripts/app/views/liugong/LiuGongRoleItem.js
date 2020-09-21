const RoleSpine = require("../../component/RoleSpine");
cc.Class({
    extends: cc.Component,

    properties: {
        roleSpine : RoleSpine.default,
        lblServerName : cc.Label,
        emptyNode : cc.Node,
        btnRoleInfo : cc.Button,

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    init : function(t) {
        //set reoleSpine
        //set name
        if(t.roleData == null) {
            this.lblServerName.node.active = false;
            this.roleSpine.node.active = false;
            this.emptyNode.active = true;
            //this.btnRoleInfo.interactable = false;
        }else {
            this.lblServerName.node.active = true;
            this.roleSpine.node.active = true;
            this.emptyNode.active = false;

            var info = t.roleData.userInfo;
            this.lblServerName.string = t.roleData.sevName + " " + info.name;
            this.roleSpine.setClothes(info.sex, info.job, info.level, info.clothe);
            this.roleSpine.animalH.node.active = false;
            this.roleSpine.animalF.node.active = false;
            //this.btnRoleInfo.interactable = true;
        }

    },
});
