$(function(){
    var $content = $("#wrap>.content")
    var $cList = $content.children('.contentList')
    var $cLiNodes = $cList.children('li')

    var $head = $('#wrap>.header')
    var $nList = $head.find('.headerContent>nav>ul>li')
    var $pList = $content.find('.sideNav>li')
    var $firstLiImg = $cList.find('.firstLi img')

    var $secondLis = $cList.find('.secondLi .second>.left>.photoList>li')
    var $secondLi1 = $secondLis.eq(0)
    var $secondLi2 = $secondLis.eq(1)
    var $secondLi3 = $secondLis.eq(2)
    var $secondRight = $cList.find('.secondLi .second>.right')

    var $thirdLis = $cList.find('.thirdLi .third>.left>.photoList>li')
    var $thirdLi2 = $thirdLis.eq(1)
    var $thirdLi3 = $thirdLis.eq(2)
    var $thirdRight = $cList.find('.thirdLi .third>.right')

    var $fourLis = $cList.find('.fourLi .four>.left>.photoList>li')
    var $fourLi1 = $fourLis.eq(0)
    var $fourLi2 = $fourLis.eq(1)
    var $fourLi3 = $fourLis.eq(2)
    var $fourRight = $cList.find('.fourLi .four>.right')

    var $fiveLis = $cList.find('.fiveLi .five>.left>.photoList>li')
    var $fiveLi1 = $fiveLis.eq(0)
    var $fiveLi2 = $fiveLis.eq(1)
    var $fiveLi3 = $fiveLis.eq(2)
    var $fiveRight = $cList.find('.fiveLi .five>.right')

    var currentIndex = 0
    var preIndex = 0
    var timer

//    窗口重置
    window.onresize = function(){
        setContentHeight()
    }

//    出入场动画
    var animations = [
        {
            in: cssTimeout($firstLiImg,{opacity: 1},1000),
            out: cssTimeout($firstLiImg,{opacity: 0},1000)
        },
        {
            in: function(){
                cssTimeout($secondLi1,{transform: 'translateY(0px)'},800)()
                cssTimeout($secondLi2,{transform: 'translateY(0px)'},1000)()
                cssTimeout($secondLi3,{transform: 'translateY(0px)'},1200)()
                cssTimeout($secondRight,{transform: 'translateY(0px)'},1200)()
            },
            out: function () {
                cssTimeout($secondLi1,{transform: 'translateY(800px)'},800)()
                cssTimeout($secondLi2,{transform: 'translateY(800px)'},1000)()
                cssTimeout($secondLi3,{transform: 'translateY(800px)'},1200)()
                cssTimeout($secondRight,{transform: 'translateY(-800px)'},1200)()
            }
        },
        {
            in: function() {
                setTimeout(function() {
                    $thirdLi2.css({ transform: "translateX(0px)" })
                    $thirdLi3.css({ transform: "translateX(0px)" })
                    $thirdRight.css({ transform: "translateX(0px)" })
                }, 1000)
            },
            out: function() {
                setTimeout(function() {
                    $thirdLi2.css({ transform: "translateX(-279px)" })
                    $thirdLi3.css({ transform: "translateX(-558px)" })
                    $thirdRight.css({ transform: "translateX(300px)" })
                }, 1000)
            }
        },
        {
            in: function() {
                $fourLi1.css({ display: "block", animation: "move1 2s 0.8s " });
                $fourLi2.css({ display: "block", animation: "move2 2s 0.8s " });
                $fourLi3.css({ display: "block", animation: "move3 2s 0.8s " });

                setTimeout(function() {
                    $fourLi1.css({ transform: "translate(0px,0px)" })
                    $fourLi2.css({ transform: "translate(0px,0px)" })
                    $fourLi3.css({ transform: "translate(0px,0px)" })
                    $fourRight.css({ opacity: 1 })
                }, 2000)
            },
            out: function() {
                $fourLi1.css({
                    display: "none",
                    transform: "translate(330px,-1000px)"
                });
                $fourLi2.css({
                    display: "none",
                    transform: "translate(0px,-1000px)"
                })
                $fourLi3.css({
                    display: "none",
                    transform: "translate(-330px,-1000px)"
                })
                $fourRight.css({ opacity: 0 })
            }
        },
        {
            in: function() {
                cssTimeout($fiveLi1, { transform: "translate3d(0,0,0) rotateX(0deg)" }, 800)()
                cssTimeout($fiveLi2, { transform: "translate3d(0,0,0) rotateX(0deg)" }, 1000)()
                cssTimeout($fiveLi3, { transform: "translate3d(0,0,0) rotateX(0deg)" }, 1200)()
                cssTimeout($fiveRight, { opacity: 1 }, 1200)()
            },
            out: function() {
                cssTimeout($fiveLi1, { transform: "translate3d(-1000px,-800px,0)" }, 800)()
                cssTimeout($fiveLi2, { transform: "translate3d(-1000px,-800px,0)" }, 1000)()
                cssTimeout($fiveLi3, { transform: "translate3d(-1000px,-800px,0)" }, 1200)()
                cssTimeout($fiveRight, { opacity: 0 }, 1200)()
            }
        }
    ]

    $.each(animations,function(i){
       i > 0 && animations[i]['out']()
    })

//    滚轮事件的实现
    $content.on("mousewheel DOMMouseScroll", function(e) {
        e = e || event
        var delta =
            (e.originalEvent.wheelDelta &&
            (e.originalEvent.wheelDelta > 0 ? 1 : -1)) || // chrome & ie
            (e.originalEvent.detail && (e.originalEvent.detail > 0 ? -1 : 1)) // firefox
        clearTimeout(timer)
        timer = setTimeout(function() {
            if (delta > 0) {
                if (currentIndex > 0) {
                    currentIndex--
                }
                move(currentIndex)
            } else if (delta < 0) {
                if (currentIndex < $cLiNodes.length - 1) {
                    currentIndex++
                    if ((currentIndex == 0 && delta < 0) || (currentIndex == $cLiNodes.length && delta < 0)) {
                        return
                    }
                    move(currentIndex)
                }
            }
            preIndex = currentIndex
        }, 200)
        window.event ? (window.event.returnValue = false) : e.preventDefault()
    })

    clickBind()
    setContentHeight()

//    延迟设置元素的样式
    function cssTimeout($el,css,time){
        return function(){
            setTimeout(() => {
                $el.css(css)
            },time)
        }
    }

//    绑定点击监听
    function clickBind(){
        function clickFun($el){
           return function(){
               var index = $el.index(this)
               preIndex = currentIndex
               move(index)
               currentIndex = index
           }
        }
        $nList.on('click',clickFun($nList))
        $pList.on('click',clickFun($pList))
    }

//    设置内容区的高度
    function setContentHeight(){
        $content.height(document.documentElement.clientHeight - $head.outerHeight())
        $cLiNodes.height(document.documentElement.clientHeight - $head.outerHeight())
    }

    // 同步主导航与侧边导航
    function move(index){
        $nList.attr('class','')
        $nList.eq(index).addClass('active')
        $pList.attr('class','')
        $pList.eq(index).addClass('active')

        $cList.css({top: -index*(document.documentElement.clientHeight - $head.outerHeight())})
        animations[index] && animations[index]["in"] && animations[index]["in"]()
        animations[preIndex] && animations[preIndex]["out"] && animations[preIndex]["out"]()

    }

})