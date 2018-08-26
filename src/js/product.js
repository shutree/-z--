
require(['config'],function(){
    require(['jquery','common'],function($,com){
        var _pageNo = 1;
        var _qty = 48;
        var len;
        $.ajax({
            type:"post",
            url:'../api/goods.php',
            data:{
                qty:_qty,
                pageNo:_pageNo
            },
            success:function(res){
                res = JSON.parse(res);

                len = Math.ceil(res[0].total/res[0].qty);
                console.log(len)
                for(var i =0;i<len;i++){
                    var $span = $('<span/>');
                    $span.html(i+1);
                    $('.pages').append($span);
                    if(i===0){
                        $span.addClass('active');
                    }
                }
                
                console.log($('.pages'));
                cre(res);
            }

        });
        // 分页
        $('.page-t').on('click','span',function(){
            
            if($(this).text() == '<'){
                console.log($(this).text());
                _pageNo--;
                if(_pageNo<=1){
                    _pageNo=1;
                }
                $('.pro_page').html(_pageNo);
            }
            if($(this).text() == '>'){
                _pageNo++;
                if(_pageNo>=3){
                    _pageNo=3;
                }
                $('.pro_page').html(_pageNo);
            }
            $.ajax({
                type:"post",
                url:'../api/goods.php',
                data:{
                    qty:_qty,
                    pageNo:_pageNo
                },
                success:function(res){
                    res = JSON.parse(res);
                    outres = res;
                    cre(res);
                }
            });
        });


        var outres;
        $('.pages').on('click','span',function(){
            _pageNo = $(this).text();
            var s = $('.pages').children('span');
            s.each(function(idx){
                s.eq(idx).removeClass('active');
            })
            console.log(s);
            $(this).addClass('active');
            $.ajax({
                type:"post",
                url:'../api/goods.php',
                data:{
                    qty:_qty,
                    pageNo:_pageNo
                },
                success:function(res){
                    res = JSON.parse(res);
                    outres = res;
                    cre(res);
                }
            })
            console.log(_pageNo);
        })


        function cre(data){
            // console.log(data[0].row);
            var lis = data[0].row.map(function(item){
            return `<li data-guid = "${item.id}">
                    <img src="${item.imgurl}" />
                    <div class="pro_num">
                    <p class="price_n fl"><span>￥</span><span class="pro_price">${item.price}</span></p>
                    <p class="sale_n fr"><span>销量</span><span class="sales">${item.sales}</span></p>
                    </div>
                    <h5>${item.title}</h5>
                    <p class="p_dealer">${item.dealer}</p>
                    <div class="add-goods">
                    <span class="add1">加入收藏</span>
                    <span class="through-car">加入购物车</span>
                    </div>
                </li>`;
            }).join('');
            $('.main-r-list ul').html(lis);
        }

        $('.main-r-list ul').on('click','img',function(){
            var $currentLi = $(this).closest('li');

            var obj = {
                id:$currentLi.index(),
                imgurl:$currentLi.children('img').attr('src'),
                price:$currentLi.children('.pro_num').find('.pro_price').text(),
                sales:$currentLi.children('.pro_num').find('.sales').text(),
                title:$currentLi.children('h5').text()
            }
            var params = "";
            for(var key in obj){
                params += key + '=' + encodeURI(obj[key])+'&'
            }
            params = params.slice(0,-1);
            location.href = 'details.html?' + params;
        });
        

        // 商品价格排序
        $('.price_sort').on('click',function(){
            $.ajax({
                url:'../api/priceSort.php',
                data:{
                    qty:_qty,
                    pageNo:_pageNo
                },
                success:function(res){
                    res1 = JSON.parse(res);
                    $('.main-r-list>ul>li').empty();
                    cre(res1);
                }
            });
        });
        // 商品时间排序
        $('.new_pro').on('click',function(){
            $.ajax({
                url:'../api/timeSort.php',
                data:{
                    qty:_qty,
                    pageNo:_pageNo
                },
                success:function(res){
                    res2 = JSON.parse(res);
                    $('.main-r-list>ul>li').empty();
                    cre(res2);
                }
            });
        });

        // 侧边栏点击显示更多
        var display = true;
        $('.icon-iconfontadd').on('click',function(){
            if(display){
                $(this).closest('li').find('ul').css('display','block');
                display = false;
            }else{
                $(this).closest('li').find('ul').css('display','none');
                display = true;
            }
        });

        // 右侧边效果
        $('.side').load('html/sidebar.html');
        $('.car-s1').hide();
        var lock = true;
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
            car.show();
            lock = false;
        }else{
            car.hide();
            lock = true;
        }
    });

        
    });
});
