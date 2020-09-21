var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = (function() {
    function t() {
        this.CREATE_RANDOM_NAME = "CREATE_RANDOM_NAME";
        this.randomName = "";
    }
    t.prototype.ctor = function() {
        JsonHttp.subscribe(proto_sc.system.randname, this.onRandomName, this);
    };
    t.prototype.clearData = function() {
        this.randomName = "";
    };
    t.prototype.onRandomName = function(t) {
        this.randomName = t.name;
        facade.send(this.CREATE_RANDOM_NAME, this.randomName);
    };
    t.prototype.sendRandomName = function() {
        var t = new proto_cs.guide.randName();
        JsonHttp.send(t);
    };
    t.prototype.sendCreate = function(t, e, o) {
        var i = new proto_cs.guide.setUinfo();
        i.sex = t;
        i.job = e;
        i.name = o;
        JsonHttp.send(i, function() {
            facade.send("USER_DATA_OVER");
        });
    };
    return t;
})();
o.CreateProxy = i;
var n = function(t, e, o) {
    this.sex = t;
    this.job = e;
    this.skin = o;
};
o.CreateData = n;
