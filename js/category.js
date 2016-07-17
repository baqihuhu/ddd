/**
 * Created by HuXiaoXiao on 2016/7/7.
 */
window.onload = function () {
    swipeLeft();
    swipeRight();
}
function swipeRight() {
    //获取元素
    var categoryContent = document.querySelector(".category-right-content");
    var catagoryRight = document.querySelector(".category-right");
    //开始滑动的位置
    var startY = 0;
    //滑动中的位置
    var moveY = 0;
    //当前要定位的位置
    var currentY = 0;
    //滑动距离
    var distanceY = 0;
    //可以移动的最大，最小位置
    var maxPosition = 0;
    var minPosition = -(categoryContent.offsetHeight - catagoryRight.offsetHeight);
    //缓冲距离
    var buffer = 150;
    //可以滑动的最大，最小距离
    var minSwipe = minPosition - buffer;
    var maxSwipe = maxPosition + buffer;

    //触摸开始事件，记录最开始触碰的位置
    categoryContent.addEventListener("touchstart", function (e) {
        startY = e.touches[0].clientY;
        console.log(startY);
    })
    //触摸移动事件，记录滑动的位置
    categoryContent.addEventListener("touchmove", function (e) {
        moveY = e.touches[0].clientY;
        distanceY = moveY - startY;
        //判断滑动的距离是否在最大，最小的距离之间
        if ((currentY + distanceY) < maxSwipe && (currentY + distanceY) > minSwipe) {
            setTranslateY(currentY + distanceY);
            addTransition();
        }
    })
    //触摸结束事件
    categoryContent.addEventListener("touchend", function () {
        currentY += distanceY;
        //如果移动位置大于最大位置返回最大位置，小于最小位置返回最小位置
        if (currentY < minPosition) {
            currentY = minPosition;
            setTranslateY(currentY);
            addTransition();
        } else if (currentY > maxPosition) {
            currentY = maxPosition;
            setTranslateY(currentY);
            addTransition();
        }
    })


    //过渡事件
    function setTranslateY(y) {
        categoryContent.style.transform = "translateY(" + y + "px) ";
    }

    //动画效果
    function addTransition() {
        categoryContent.style.transition = "all 0.5s";
    }

    //删除动画效果
    function removeTransition() {
        categoryContent.style.transition = "none";
    }


}
function swipeLeft() {
    //1，上下拉的时候记录当前位置，让滚动条定在当前位置
    //2, 拉动的时候，上下有150px的缓冲区
    //3, 点击每一分类，添加类名，当前分类，上升到最顶部

    var categoryLeft = document.querySelector(".category-left");
    var categoryUl = categoryLeft.querySelector("ul");
    var lis = categoryUl.children;

    //console.log(categoryUl);
    //console.log(categoryLeft);
    //console.log(lis);

    var startY = 0;//初始滑动的时候的位置
    var moveY = 0;//滑动中的位置
    var distanceY = 0;//滑动中的距离
    var currentY = 0;//记录当前要定位的位置
    var maxPosition = 0;//最大定位的位置
    var minPosition = -(categoryUl.offsetHeight - categoryLeft.offsetHeight);
    //ul总长度减去框的长度，为最大定位值
    //console.log(minPosition);
    var buffer = 150;
    var maxSwipe = buffer + maxPosition;//允许滑动的最大值
    var minSwipe = minPosition - buffer;//允许滑动的最小值
    //console.log(maxSwipe);
    //console.log(minSwipe);
    categoryUl.addEventListener("touchstart", function (e) {
        startY = e.touches[0].clientY;
        //console.log(startY);
        //触摸开始的位置
    });
    categoryUl.addEventListener("touchmove", function (e) {
        //触摸结束的位置
        moveY = e.touches[0].clientY;

        distanceY = moveY - startY;
        //console.log(distanceY);
        //console.log(distanceY);
        //触摸移动的距离
        //如果，当前定位的位置加移动的距离小于最大移动值，且大于最小移动值时，可以移动
        if ((currentY + distanceY) < maxSwipe && (currentY + distanceY) > minSwipe) {
            setTranslateY(currentY + distanceY);
            removeTransition();
        }
    })
    categoryUl.addEventListener("touchend", function (e) {
        //当前定位的位置，滑动的距离
        currentY += distanceY;
        //当currentY
        if (currentY > maxPosition) {
            currentY = maxPosition;
            //每次你只要设置了这个setTranslateY current就要记录一下
            setTranslateY(currentY);
            //因为这时候很快弹回去了所以要加过渡慢慢弹回去
            addTransition();
        } else if (currentY < minPosition) {
            currentY = minPosition;
            setTranslateY(currentY);
            addTransition();
        }
    });


    tap(categoryUl, function (e) {
        for (var i = 0; i < lis.length; i++) {
            lis[i].className = "";
            lis[i].index = i;
        }
        e.target.parentNode.className = "now";
        var height = -e.target.parentNode.index * 50;
        if (height > minPosition) {
            currentY = height;
            setTranslateY(currentY);
            addTransition();
        } else {
            currentY = minPosition;
            setTranslateY(currentY);
            addTransition();
        }

    })
    function tap(dom, fun) {
        var idMove = false;
        dom.addEventListener("touchstart", function () {

        });
        dom.addEventListener("touchmove", function () {
            idMove = true;
        })
        dom.addEventListener("touchend", function (e) {
            if (idMove == false) {
                fun && fun(e);
            }
            idMove = false;
        })
    }


    //过渡事件
    function setTranslateY(y) {
        categoryUl.style.transform = "translateY(" + y + "px) ";
    }

    //动画效果
    function addTransition() {
        categoryUl.style.transition = "all 0.5s";
    }

    //删除动画效果
    function removeTransition() {
        categoryUl.style.transition = "none";
    }

}