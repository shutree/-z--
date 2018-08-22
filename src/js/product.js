
require(['config'],function(){
    require(['jquery','common'],function($,com){
        var _pageNo = 1;
        var _qty = 48;
        
        $.ajax({
            type:"post",
            url:'../api/goods.php',
            data:{
                qty:_qty,
                pageNo:_pageNo
            },
            success:function(res){
                res = JSON.parse(res);
                // console.log(d);
                cre(res);
            }

        });


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
        

        

            
/*       var Car = {
            goodslist:[],
            totalPrice:0,
            ele:'.cart-list ul',


            init(){
                this.ele = $(this.ele);

                // 删除单个商品
                this.ele.on('click','.btn-close',(e)=>{
                    // 获取当前li
                    let $currentLi = $(e.target).closest('li');
                    let idx = $currentLi.index();

                    this.remove(idx);
                });
            },

            // 添加商品
            add(idx){
                let $currentLi = $('.main-r-list li').eq(idx);
                let $currentImg =  $currentLi.children('img');
                
                 // 获取商品名称
                let name =  $currentLi.children('h5').eq(1).text();

                // 获取图片路径
                let imgurl = $currentImg.attr('src');

                this.currentImg = $currentImg;
            
                this.goodslist.push({
                    name:name,
                    imgurl:imgurl
                });

                // 动画完成后渲染
                this.animate(imgurl,()=>{
                    this.render();
                })

                

            },
            remove(idx){
                this.goodslist.splice(idx,1);

                 this.render();
            },

            // 清空
            clear(){
                this.goodslist = [];

                this.render();
            },

            // 渲染数据到页面
            render(){
                // 生成html结构
                let content = this.goodslist.map((item,idx)=>{
                    return `<li>
                            <img src="${item.imgurl}" />
                            <h4>${item.name}</h4>
                            <span class="btn-close">&times;</span>
                    </li>`
                }).join('');

                // 写入页面
                this.ele.html(content);
            },

            // 动画
            animate(imgurl,callback){
                // 创建以imgurl为地址的图片
                let $copyImg = $('<img/>').attr({src:imgurl});

                // 设置图片样式
                $copyImg.css({
                    position:'absolute',
                    left:this.currentImg.offset().left,
                    top:this.currentImg.offset().top,
                    width:this.currentImg.width()
                });

                $copyImg.animate({
                    left:this.ele.offset().left,
                    top:this.ele.offset().top+this.ele.outerHeight(),
                    width:10
                },function(){
                    callback();

                    // 移除复制的图片
                    $copyImg.remove();
                });

                // $('body').append($copyImg);
                $copyImg.appendTo('body');
            }
        }

        Car.init();

        $('.main-r-list').on('click','.through-car',function(){
            // 获取当前li
            let $currentLi = $(this).closest('li');

            // 获取商品名称
            // let name = $currentLi.children('p').eq(1).text();
            // 获取图片路径
            // let imgurl = $currentLi.children('img').attr('src');

            Car.add($currentLi.index());
        });
        
*/
    });
});



// define(['jquery'],function($){
//     var _pageNo = 1;
//     var _qty = 48;
//     $.ajax({
//         url:'../api/goods.php',
//         data:{
//             qty:_qty,
//             pageNo:_pageNo
//         }
//         success:function(res){
//             // var data = res.row;
//             console.log(res);
//             // cre(data);
//         }

//     });
//     function cre(data){
//         var lis = data.map(function(item){
//             return `<li>
//                     <img src="${item.imgurl}" />
//                     <div>
//                     <p><span>￥</span><span class="pro_price">${item.price}</span></p>
//                     <p><span>销量</span><span class="sales">${item.sales}</span></p>
//                     </div>
//                     <h5>${item.title}</h5>
//                     <p>${item.dealer}</p>
//                     <div>
//                     <span>加入收藏</span>
//                     <span>加入购物车</span>
//                     </div>
//                 </li>`;
//         }).join('');
//     }
//     $('.main-r-list ul').html(lis);

// })
// (function(){

//     var main = document.querySelector('.main-r-list');
//     var ul = main.children[0];
//     let status = [200,304];
//     var xhr = new XMLHttpRequest();
//     xhr.onload = function(){
//         if(status.indexOf(xhr.status)>=0){
//             var data= JSON.parse(xhr.responseText);
//             cre(data);
//         }
//     }
//     xhr.open('get','../api/goods.php');
//     xhr.send(null);

    // function cre(data){
    //     ul.innerHTML = data.map(function(item){
    //         return `<li>
    //                 <img src="${item.imgurl}" />
    //                 <div>
    //                 <p><span>￥</span><span class="pro_price">${item.price}</span></p>
    //                 <p><span>销量</span><span class="sales">${item.sales}</span></p>
    //                 </div>
    //                 <h5>${item.title}</h5>
    //                 <p>${item.dealer}</p>
    //                 <div>
    //                 <span>加入收藏</span>
    //                 <span>加入购物车</span>
    //                 </div>
    //             </li>`;
    //     }).join('');
    // }
// })();