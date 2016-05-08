/**
 * Created by kevin on 2016/4/30.
 */
$(function(){
    $('.del').click(function(e){
        var target=$(e.target);
        var id=target.data('id');
        var tr=$('.item-id-'+id);

        $.ajax({
            type:'DELETE',
            url:'/admin/movie/list?id='+id
        })

        .done(function(result){
            if(result.success===1){
                if(tr.length>0){
                    tr.remove();
                }
            }
        })
    })
})

