require(['config'],function(){
    require(['jquery','common'],function($,com){
        var params = location.search.slice(1);
        params = params.split('&');
        var goods = {};
        params.forEach(function(item){
            var arr = item.split('=');
            var key = arr[0];
            var value = arr[1];
            goods[key] = decodeURI(value);

        });
        console.log(goods.id);
        var arr = [];
        $.ajax({
            url:'../api/car.php',
            data:{
                    guid:goods.id
                },
            success:function(res){
                res = JSON.parse(res);
                arr.unshift(res);
                console.log(arr);
                render(arr);
            }
        });

        // 页面渲染
        var storeName = ['东方双狮旗舰店','天梭旗舰店','赫柏林','劳力士','浪琴','江诗丹顿'];
        var s = storeName[randomNumber(1,6)];
        console.log(s);

        $('.store_name').html(s);
        function render(data){
           console.log(data);

            // var lis = arr.map(function(item){
            //     return `<li>
            //     <input type="checkbox" />
            //     <img src="${item[0].imgurl}"/>
            //     <i></i>
            //     <p class="des_goods">
            //     <span class="des-g">${item[0].title}</span>
            //     <span class="texture">不锈钢</span>
            //     <span class="car-color">深蓝色</span>
            //     </p>
            //     <p class="goods_num">
            //     <span class="reduce calc-btns">-</span>
            //     <input class="num" value="1"type="text">
            //     <span class="add calc-btns">+</span>
            //     </p>
            //     <p class="total-cost">
            //     <span>￥</span>
            //     <span class="t-pri">${item[0].price}</span>
            //     </p>
            //     <p class="ope-goods">
            //     <span class="g-del">删除</span>
            //     <span class="g-move">移入收藏夹</span>
            //     </p>
            // </li>`;
            // }).join('');
            // var lis = data.map(function(item){
            //     return `<li>
            //     <input type="checkbox" />
            //     <img src="${item.imgurl}"/>
            //     <i></i>
            //     <p class="des_goods">
            //     <span class="des-g">${item.title}</span>
            //     <span class="texture">不锈钢</span>
            //     <span class="car-color">深蓝色</span>
            //     </p>
            //     <p class="goods_num">
            //     <span class="reduce calc-btns">-</span>
            //     <input class="num" value="1"type="text">
            //     <span class="add calc-btns">+</span>
            //     </p>
            //     <p class="total-cost">
            //     <span>￥</span>
            //     <span class="t-pri">${item.price}</span>
            //     </p>
            //     <p class="ope-goods">
            //     <span class="g-del">删除</span>
            //     <span class="g-move">移入收藏夹</span>
            //     </p>
            // </li>`;});

            // $('.c-goodslist>ul').html(lis);
            
            
            // arr.forEach(function(item){
            //     if(item.guid == goods.id){
            //         $('.goods_num .num').get(0).value + goods.qty;
            //     }else{
            //         arr.push(data);
                    
                    
            //     }
            // });
            // console.log(arr);
            
        }
        

        // 输入框设置
        $('.goods_num').on('click','span',function(){
            if($(this).get(0).innerText == '-'){
                var res = $('.goods_num .num').get(0).value--;

                console.log(res);
                return false;
            }
            if($(this).get(0).innerText=="+"){
                var res1 = $('.goods_num .num').get(0).value++;
                console.log(res1);
                return false;
            }
        });

        $('.goods_num .num').on('change',function(){
            if($('.goods_num .num').get(0).value*1 <= 0){
                $('.goods_num .num').get(0).value = 0;
                
            }
        });

    });
});
