var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = (function() {
    function t() {}
    t.linklink_times = function(t) {
        return (t + 1) * (1 + Math.ceil((t + 1) / 5)) * 5;
    };
    t.linklink_right = function(t) {
        return Math.ceil(t / 10);
    };
    t.prentice_prop_add = function(t, e) {
        return Math.min(10, Math.ceil((t / 10 + 1) * (1e-4 * e + 0.5)));
    };
    t.partner_prop = function(t, e, o) {
        return (9 + t) * e + o * e * (Math.floor(t / 50) + 1);
    };
    t.club_boss_gx = function(t) {
        return t / 250;
    };
    t.gongdou_attk = function(t) {
        return 4 * t;
    };
    t.gongdou_hp = function(t) {
        return t;
    };
    t.tidy_chance_price = function(t) {
        return 5;
    };
    t.gongdou_cost = function(t) {
        return 100 * (t + 1);
    };
    t.xianli_haogan = function(t) {
        return Math.max(1, Math.min(Math.round(t / 10), 1e3));
    };
    t.kitchen_exp = function(t) {
        return t / 30;
    };
    t.jingying_time = function(t) {
        return Math.min(60 * Math.ceil(t / (1e3 * (1 + t / 5e4))), 1800);
    };
    t.city_lucky = function(t, e) {
        return Math.ceil(0.3 * Math.min(e, 15) * t);
    };
    t.flower_cost = function(t) {
        return 2e3 * Math.pow(Math.floor(t / 10), 2) + 1e3 * t;
    };
    t.wife_meet_cost = function(t, e) {
        return Math.min(
            5 * Math.ceil((0.55 * Math.pow(t, 0.7) + 0.025 * e) / 5),
            1e3
        );
    };
    t.wife_chuyou_cost = function(t) {
        return Math.min(5 * Math.ceil(Math.pow(t, 0.585)) + 10, 3e3);
    };
    t.tree_yb = function(t) {
        return 30 * Math.floor((t - 1) / 10) + 30;
    };
    t.tree_ms1 = function(t) {
        return 3e4 * Math.floor((t - 1) / 10) + 3e4;
    };
    t.tree_ms2 = function(t) {
        return (
            1e4 *
            Math.ceil(
                (15e3 * Math.pow(Math.floor((t - 1) / 10), 1.5) + 5e4) / 1e4
            )
        );
    };
    t.tree_ms3 = function(t) {
        return (
            1e4 *
            Math.ceil(
                (15e3 * Math.pow(Math.floor((t - 1) / 10), 1.5) + 5e4) / 1e4
            )
        );
    };
    return t;
})();
o.formula = i;
