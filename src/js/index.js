require(['config'],function(){
    require(['jquery','common'],function($){
    $('.nav-more').load('html/html/nav.html');
    $('.side').load('html/html/sidebar.html');

    $('.pop_stores').on('mouseover','img',function(){
        
        var w = $(this).width();
        var h = $(this).height();
        var current = $(this).get(0);
        current.style.overflow = 'hidden';
        $(this).animate({
            width: 650,
            height: 300},
            1000, function(){
            $(this).css({
                width:w,
                height:h
            });
        });
    });
    $('.pop_stores').on('mouseout','img',function(){
        $(this).stop(true,true);
    });

    // 右侧边效果
    // $('.car-s1').hide();
    var display = true;
    var lock = true;
    // 点击出现列表框
    $('.side').on('click','div',function(){
        console.log(666)
        // 回到顶部效果
        if($(this).get(0).className == 'back'){
            let timer = setInterval(()=>{
                // 计算缓冲速度
                let speed = Math.ceil(window.scrollY/5);//1

                scrollBy(0,-speed);

                if(window.scrollY <= 0){
                    clearInterval(timer);
                }
            },30);
        }
        var car = $(this).find('.car-s1');
        if(lock){
            car.get(0).style.display:'flex';
            lock = false;
        }else{
            car.get(0).style.display:'none';
            lock = true;
        }
    });
         
    });
});