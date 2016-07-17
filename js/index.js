/**
 * Created by HuXiaoXiao on 2016/7/5.
 */
window.onload = function () {
    search();
    slide();
    time();
}
//定时器
function time() {
    var timer = 5 * 60 * 60;
    var spans = document.querySelector(".seckill-time").children;
    console.log(spans);
    var animate = setInterval(function () {
        timer--;
        var h = timer / 3600;
        var m = timer % 3600 / 60;
        var s = timer % 60;

        spans[0].innerHTML = Math.floor(h/10);
        spans[1].innerHTML = Math.floor(h%10);
        spans[3].innerHTML = Math.floor(m/10);
        spans[4].innerHTML = Math.floor(m%10);
        spans[6].innerHTML = Math.floor(s/10);
        spans[7].innerHTML = Math.floor(s%10);

    }, 1000);


}


function search() {
    //获取元素
    var header = document.getElementById("header");
    var slideHeight = document.getElementById("slide").offsetHeight;
    //console.log(slideHeight);

    //获取轮波图，高度
    //添加事件
    window.onscroll = function () {
        var scrollTop = document.body.scrollTop;
        //console.log(scrollTop);
        var opcity = scrollTop / slideHeight;
        //console.log(opcity);
        header.style.background = "rgba(201,21,25," + opcity + ")";
    }
}

function slide() {
    //获取slide的宽度
    var slideUl = document.querySelector("#slide").children[0];
    var slideWidth = document.querySelector("#slide").offsetWidth;
    console.log(slideWidth);
    index = 1;
    //1.先让轮播图动起来，
    var timer = setInterval(function () {
        index++;
        setTranslates(-index * slideWidth);
        addTransition();
    }, 1000);
    //获取小圆点li
    var lis = document.getElementById("slide").children[1].children;
    console.log(lis);
    //2,到了最后一张的时候，返回第一张，到达第一张，跳到最后一张
    //添加过渡结束监听事件
    slideUl.addEventListener("transitionend", function () {
        if (index >= 9) {
            index = 1;
            setTranslates(-index * slideWidth);
            removeTransition();
        } else if (index <= 0) {
            index = 8;
            setTranslates(-index * slideWidth);
            removeTransition();
        }
        //3,添加小圆点，随着轮播图进行移动
        for (var i = 0; i < lis.length; i++) {
            lis[i].className = "";

        }
        lis[index - 1].className = "now";
    })

    //4,添加触摸的事件，
    var startX = 0;//x轴到浏览器的距离
    var moveX = 0;//移动中的位置
    var endX = 0;//结束的位置
    var distanceX = 0;//移动的距离
    var moveDistnaceX = 0;//滑动中时候的移动距离
    //触摸开始事件
    slideUl.addEventListener("touchstart", function (e) {
        startX = e.touches[0].clientX;

        clearInterval(timer);
    })
    //触摸滑动事件
    slideUl.addEventListener("touchmove", function (e) {
        moveX = e.touches[0].clientX;
        moveDistnaceX = moveX - startX;
        var x = moveDistnaceX + -index * slideWidth;
        setTranslates(x);
        addTransition();
    })
    //触摸结束事件
    slideUl.addEventListener("touchend", function (e) {
        endX = e.changedTouches[0].clientX;
        distanceX = endX - startX;
        if (Math.abs(distanceX) > slideWidth * 1 / 3) {
            if (distanceX < 0) {
                index++;
                setTranslates(-index * slideWidth);
                addTransition();
            } else if (distanceX > 0) {
                index--;
                setTranslates(index * slideWidth);
                addTransition();
            }
        }

        setTranslates(-index * slideWidth);
        addTransition();
        clearInterval(timer);
        timer = setInterval(function () {
            index++;
            setTranslates(-index * slideWidth);
            addTransition();
        }, 1000);
    })


    //封装事件函数
    //移动
    function setTranslates(x) {
        slideUl.style.transform = "translateX(" + x + "px)";
    }

    //过渡
    function addTransition() {
        slideUl.style.transition = "all 0.2s";
    }

    //移除过渡
    function removeTransition() {
        slideUl.style.transition = "none";
    }


}

//function slide() {
//
//    var slideWidth = document.querySelector("#slide").offsetWidth;
//    //console.log(slideWidth);
//    var slideUl = document.getElementById("slide").children[0];
//    //console.log(slideUl);
//
//    var lis = document.getElementById("slide").children[1].children;
//
//    //console.log(lis);
//    //1,先让轮播图，每秒进行轮播，
//    var index = 1;
//    setTranslateX(-index*slideWidth);
//        //定时器每秒移动一张图的距离
//    var timer=setInterval(function(){
//        index++;
//        setTranslateX(-index*slideWidth);
//        addTransition();
//    },1000);
//    //2,添加过渡事件监听，添加图片，到了最后一张，抽回第一张
//    //过渡时间要小于定时器的时间，不然定时器会中断过渡，判断结束事件检测不到
//    slideUl.addEventListener("transitionend",function(){
//
//        if(index>=9){
//            index=1;
//
//            setTranslateX(-index*slideWidth);
//            removeTransiton();
//        }else if(index<=0){
//            index=8;
//            setTranslateX(-index*slideWidth);
//            removeTransiton();
//        }
//        //3,小点随着，图片进行移动
//        for (var i = 0; i < lis.length; i++) {
//            lis[i].className ="";
//        }
//        lis[index-1].className = "now";
//    })
//
//    //4,添加左右滑动的事件
//    var startX = 0;//开始位置
//    var endX = 0;//结束位置
//    var distanceX = 0;//移动距离
//    var moveX = 0; //移动中的位置
//    var moveDistanceX;//滑动中移动的距离
//
//    //当滑动时，获取触摸开始点位置,停止定时器
//    slideUl.addEventListener("touchstart",function(e){
//        //开始位置到浏览器的距离
//        startX = e.touches[0].clientX;
//        console.log(startX);
//        clearInterval(timer);
//    });
//    //当滑动时，获取触摸结束点位置
//    slideUl.addEventListener("touchmove",function(e){
//        //开始滑动后松手前，到浏览器的距离
//        moveX = e.touches[0].clientX;
//        moveDistanceX = moveX-startX;
//        console.log(moveDistanceX);
//        //判断向左走还是向右走
//        var x = moveDistanceX +-index*slideWidth;
//        setTranslateX(x);
//        removeTransiton();
//    })
//    //当滑动结束后，获取他的距离，判断轮播图的位置向前还是向后来移动
//    slideUl.addEventListener("touchend",function(e){
//        //获取结束的距离,touchend只有changedtouches方法
//        endX = e.changedTouches[0].clientX;
//        distanceX = endX-startX;
//        //计算绝对值来获取,如果图片滑动距离超过1/3就滑动
//        //distanceX正值向前负值向后
//        if(Math.abs(distanceX)>(slideWidth*1/3)){
//            if(distanceX<0){
//                index++;
//                setTranslateX(-index*slideWidth);
//                addTransition();
//            }else{
//                index--;
//                setTranslateX(-index*slideWidth);
//                addTransition();
//            }
//        }
//        //如果不超过1/3，就回到原来的位置
//        setTranslateX(-index*slideWidth);
//
//        clearInterval(timer);
//        timer=setInterval(function(){
//            index++;
//            setTranslateX(-index*slideWidth);
//            addTransition();
//
//        },1000);
//    })
//    //设置移动位置函数
//    function setTranslateX(x) {
//        slideUl.style.transform = "translateX(" + x + "px)";
//    }
//
//    //添加过渡函数,
//    function addTransition() {
//        slideUl.style.transition = "all 0.2s";
//    }
//
//    //删除过渡函数
//    function removeTransiton() {
//        slideUl.style.transition = "none";
//    }
//
//}