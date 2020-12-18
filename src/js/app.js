var Site = /** @class */ (function () {
    function Site() {
    }
    Site.prototype.name = function () {
        console.log("输出内容");
    };
    return Site;
}());
var obj = new Site();
obj.name();
var te = "kingdom";
var years = 5;
var text = "\u60A8\u597D\uFF0C\u4ECA\u5E74\u662F" + te + "\u53D1\u5E03" + (years + 1) + "\u5468\u5E74";
var flag = true;
var arr = [1, 2];
var ar = [1, 2];
var x;
x = ["元组", 1];
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
var c = Color.Blue;
var d = 1;
var arrayList = [1, false, "text"];
arrayList[1] = 100;
var e;
var y;
var y1;
var g = 10;
for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
    var a1 = arr_1[_i];
    //console.log(a1);
}
var e1 = 3;
do {
    e1++;
    if (e1 == 6) {
        continue;
    }
    //console.log(e1);
} while (e1 < 8);
(function () {
})();
var myFun = new Function("a", "b", "return a*b");
var y2 = myFun(3, 4);
console.log(y2);
