
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
            return `<li>
                    <a href="details.html">
                    <img src="${item.imgurl}" />
                    <div class="pro_num">
                    <p class="price_n fl"><span>￥</span><span class="pro_price">${item.price}</span></p>
                    <p class="sale_n fr"><span>销量</span><span class="sales">${item.sales}</span></p>
                    </div>
                    <h5>${item.title}</h5>
                    <p class="p_dealer">${item.dealer}</p>
                    <div class="add-goods">
                    <span class="add1">加入收藏</span>
                    <span>加入购物车</span>
                    </div>
                    </a>
                </li>`;
            }).join('');
            $('.main-r-list ul').html(lis);
        }
        

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