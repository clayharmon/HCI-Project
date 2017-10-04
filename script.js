/* global $ */

$('#loginbtn').click(function(){
    window.location.href = '/';
});

$('#logbtn').click(function(){
    $('body').toggleClass('no-log');
    $(this).toggleClass('active');
});


$('.log a').click(function(){
    var url = $(this).attr('data-url');
    window.location.hash = url;
});

$('#settingsbtn').click(function(){
    back.push(window.location.hash);
    window.location.hash = '/settings';
});

$('.alert-close').click(function(){
    
    var count = $(this).closest('.alerts').children().length;
    
    $('#logbtn span').html(count - 1);
    
    if(count == 1){
        $('#alert-message').html('No Alerts');
        $('#logbtn span').hide();
    }
    
    $(this).parent().remove();
    
});

$('.alerts h1').click(function(){
    window.location.hash = $(this).attr('data-url');
});

$('.container').on('click', '.station', function() {
    var id = $(this).attr('data-id');
    window.location.hash = '/station/' + id;
});

$('.upper').on('click', '#packagesbtn', function() {
    var hash = hash_check();
    window.location.hash = '/' + hash[0] +'/'+ hash[1]+'/packages';
});

$('.upper').on('click', '#overviewbtn', function() {
    var hash = hash_check();
    window.location.hash = '/' + hash[0] +'/'+ hash[1];
});

$('.upper').on('click', '#couriersbtn', function() {
    var hash = hash_check();
    window.location.hash = '/' + hash[0] +'/'+ hash[1]+'/couriers';
});

$('.upper').on('change', '.filter select', function() {
    var hash = hash_check();
    var url;
    if(hash.length == 4){
        var temp = hash[3];
        temp = temp.split('+');
        url = '/' + hash[0] +'/'+ hash[1]+'/'+hash[2]+'/'+this.value;
    } else {
        url = '/' + hash[0] +'/'+ hash[1]+'/'+hash[2]+'/'+this.value;
    }
    window.location.hash = url; 
});

$('body').on('change', '#ex-slider', function() {
    settings_save[0] = $(this).val();
    localStorage.setItem("settings", JSON.stringify(settings_save));
});

$('body').on('change', '#late-slider', function() {
    settings_save[1] = $(this).val();
    localStorage.setItem("settings", JSON.stringify(settings_save));
});

$('header').on('click', '#back', function() {
    //window.location.hash = '';
    window.location.href = '/'
});

$('.container').on('click', '#favorite', function(event) {
    var sid = $(this).closest('.tile').attr('data-id');
    if($(this).attr('data-type') == 'fav'){
        var i = favorites.indexOf(sid);
        if (i > -1) {favorites.splice(i, 1);}
        localStorage.setItem("favorites", JSON.stringify(favorites));
        
        $(this).attr('data-type','');
        $(this).find('i').removeClass('fa-star').addClass('fa-star-o');
        
        
    } else {
        favorites.push(sid);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        
        $(this).attr('data-type','fav');
        $(this).find('i').removeClass('fa-star-o').addClass('fa-star');
    }
    
    console.log(localStorage.getItem("favorites"));
    event.stopPropagation();
});

$('.container').on('click', '.courier', function() {
    back.push(window.location.hash);
    var hash = hash_check();
    var id = $(this).attr('data-id');
    window.location.hash = '/' + hash[0] +'/'+ hash[1]+'/couriers/' + id;
});

$('.container').on('click', '.package', function() {
    back.push(window.location.hash);
    var hash = hash_check();
    var id = $(this).attr('data-id');
    window.location.hash = '/' + hash[0] +'/'+ hash[1]+'/packages/' + id;
});

$('.container').on('click', '.overview', function() {
    var hash = hash_check();
    var url = $(this).attr('data-url');
    window.location.hash = '/' + hash[0] +'/'+ hash[1]+'/' + url;
});
$('body').on('click', '#popup-close', function() {
    $('.black-bg').css('display','none');
    if(back.length > 0){
        console.log(back);
        window.location.hash = back.pop();
        console.log(back);
    } else {
        var hash = hash_check();
        if(hash.length >= 3){
            window.location.hash = '/' + hash[0] +'/'+ hash[1]+'/' + hash[2];
        } else {
            window.location.hash = '';
        }
    }

});

$('body').on('click', '.courier-boxes', function() {
    $('.black-bg').css('display','none');
    var hash = hash_check();
    var url = $(this).attr('data-url');
    window.location.hash = '/' + hash[0] +'/'+ hash[1]+'/packages/'+url;
});

$('body').on('click', '.packages-info a', function() {
    $('.black-bg').css('display','none');
    back.push(window.location.hash);
    var hash = hash_check();
    var url = $(this).attr('data-url');
    window.location.hash = '/' + hash[0] +'/'+ hash[1]+'/couriers/'+url;
});

$('.black-bg').click(function(){
    $(this).css('display','none');
    if(back.length > 0){
        console.log(back);
        window.location.hash = back.pop();
        console.log(back);
    } else {
        var hash = hash_check();
        if(hash.length >= 3){
            window.location.hash = '/' + hash[0] +'/'+ hash[1]+'/' + hash[2];
        } else {
            window.location.hash = '';
        }
    }
});

var favorites = localStorage.getItem("favorites");
var settings_save = localStorage.getItem("settings");
var back = [];


if(!favorites){
    favorites = [];
    localStorage.setItem("favorites", JSON.stringify(favorites));
} else {
    favorites = JSON.parse(favorites);
}

if(!settings_save){
    settings_save = [5,5];
    localStorage.setItem("settings", JSON.stringify(settings_save));
} else {
    settings_save = JSON.parse(settings_save);
}

function courierpage_html(id, status, fname, lname, packages, delivered, exceptions, late, phone){
return '<div data-id="'+id+'" class="courier-page popbox"><div class="courier-header"><a id="popup-close" href="javascript:void(0);"><i class="fa fa-times" aria-hidden="true"></i></a><div class="spacer" style="clear: both;"></div><h1><span>'+fname+'</span>'+lname+'</h1></div><div class="courier-info"><div class="courier-picture"><img height="100" width="100" src="no-user-image.gif" /></div><div class="courier-contact"><h2>Status: '+status+'</h2><h2>Phone: '+phone+'</h2></div></div><div class="courier-packages"><div class="courier-total"><h2>'+packages+'<span>Total</span>32<span>Remaining</span></h2></div><div class="courier-boxes" data-url="exception+'+id+'"><h2>Exceptions</h2><h2 class="number">'+exceptions+'</h2></div><div class="courier-boxes" data-url="late+'+id+'"><h2>Late</h2><h2 class="number">'+late+'</h2></div><div class="courier-boxes" data-url="delivered+'+id+'"><h2>On Time</h2><h2 class="number">'+delivered+'</h2></div></div></div>';
}

function packagepage_html(id, status, courier, time, type, courier_id){
return '<div data-id="'+id+'" class="package-page popbox"><div class="courier-header"><a id="popup-close" href="javascript:void(0);"><i class="fa fa-times" aria-hidden="true"></i></a><div class="spacer" style="clear: both;"></div><h1><span>Package Id</span>'+id+'</h1></div><img width="100%" src="location.jpg" /><div class="packages-info"><h2><span>Status:</span>'+status+'<span></h2><h2><span>Time:</span>'+time+'<span></h2><h2><span>Type:</span>'+type+'<span></h2><h2><span>Courier:</span><a href="javascript:void(0);" data-url="'+courier_id+'">'+courier+'</a></h2></div></div>';
}

function settingspage_html(ex, late){
    return '<div data-id="1" class="settings-page popbox"><div class="courier-header"><a id="popup-close" href="javascript:void(0);"><i class="fa fa-times" aria-hidden="true"></i></a><div class="spacer" style="clear: both;"></div><h1>Settings</h1></div><div class="settings-info"><h2 class="weight">Alert me when:</h2><h2>a station\'s exceptions reach (in %):</h2><div class="range-container"><div class="range"><input id="ex-slider" type="range" min="1" max="9" steps="1" value="'+ex+'"/></div><ul class="range-points"><li>1</li><li>5</li><li>10</li><li>15</li><li>20</li><li>25</li><li>30</li><li>35</li><li>40</li></ul><h2>a station\'s late deliveries reach (in %):</h2><div class="range-container"><div class="range"><input id="late-slider" type="range" min="1" max="9" steps="1" value="'+late+'"/></div><ul class="range-points"><li>1</li><li>5</li><li>10</li><li>15</li><li>20</li><li>25</li><li>30</li><li>35</li><li>40</li></ul></div></div></div>';
}


function packtile_html(id, status, courier, time){
return '<article class="tile ani package" data-id="'+id+'" data-type="package"><div class="inner"><div class="badge"><div class="center"><span class="left">ID: '+id+'</span><span class="right">'+time+'</span><div class="spacer" style="clear: both;"></div></div></div><div class="hgroup"><h1 class="status"><span>Status:</span> '+status+'</h1><h2 class="pack-courier"><span>Courier:</span> '+courier+'</h2><span class="arrow"><span>View Details</span><i class="fa fa-angle-right ani" aria-hidden="true"></i></span></div></div></article>';
}

function couriertile_html(id, status, fname, lname, packages, delivered, exceptions, late){
return '<article class="tile ani courier" data-id="'+id+'" data-type="courier"><div class="inner"><div class="badge"><div class="center"><span class="left">Status: '+status+'</span><div class="spacer" style="clear: both;"></div></div></div><div class="hgroup"><h1 class="name">'+fname + ' ' + lname +'</h1><span class="left"><h3 class="numbers"><span>Packages:</span> '+packages+'</h3><h3 class="numbers"><span>On Time:</span> '+delivered+'</h3></span><span class="left"><h3 class="numbers"><span>Exceptions:</span> '+exceptions+'</h3><h3 class="numbers"><span>Late:</span> '+late+'</h3></span><div class="spacer" style="clear: both;"><span class="arrow"><span>View Details</span><i class="fa fa-angle-right ani" aria-hidden="true"></i></span></div></div></article>';
}

function stationtile_html(id, status, name, packages, delivered, exceptions, late, favorite){
    if(favorite){
        return '<article class="tile ani station" data-id="'+id+'" data-type="station"><div class="inner"><div class="badge"><div class="center"><span class="left">Status: '+status+'</span><span class="right" id="favorite" data-type="fav"><i class="fa fa-star" aria-hidden="true"></i></span><div class="spacer" style="clear: both;"></div></div></div><div class="hgroup"><h1 class="name">'+name+'</h1><span class="left"><h3 class="numbers"><span>Packages:</span> '+packages+'</h3><h3 class="numbers"><span>On Time:</span> '+delivered+'</h3></span><span class="left"><h3 class="numbers"><span>Exceptions:</span> '+exceptions+'</h3><h3 class="numbers"><span>Late:</span> '+late+'</h3></span><div class="spacer" style="clear: both;"><span class="arrow"><span>View Details</span><i class="fa fa-angle-right ani" aria-hidden="true"></i></span></div></div></article>';
    }
return '<article class="tile ani station" data-id="'+id+'" data-type="station"><div class="inner"><div class="badge"><div class="center"><span class="left">Status: '+status+'</span><span class="right" id="favorite"><i class="fa fa-star-o" aria-hidden="true"></i></span><div class="spacer" style="clear: both;"></div></div></div><div class="hgroup"><h1 class="name">'+name+'</h1><span class="left"><h3 class="numbers"><span>Packages:</span> '+packages+'</h3><h3 class="numbers"><span>On Time:</span> '+delivered+'</h3></span><span class="left"><h3 class="numbers"><span>Exceptions:</span> '+exceptions+'</h3><h3 class="numbers"><span>Late:</span> '+late+'</h3></span><div class="spacer" style="clear: both;"><span class="arrow"><span>View Details</span><i class="fa fa-angle-right ani" aria-hidden="true"></i></span></div></div></article>';
}

function overviewtile_html(title,number,url){
return '<article class="tile ani overview" data-type="overview" data-url="'+url+'"><div class="inner"><div class="badge"><div class="center"><span>'+title+'</span></div></div><div class="hgroup"><h3></h3><h1 class="name">'+number+'</h1><span class="arrow"><span>View Details</span><i class="fa fa-angle-right ani" aria-hidden="true"></i></span></div></div></article>';
}

function hash_check(){
    var hash = window.location.hash.substr(2);
    return hash.split('/');
}

function page_manager(hash, data){
    var container = $('.container');
    container.html('');
    $('.popbox').remove();
    
    console.log('page update');
    
    if(hash[0] === ""){
        // search / homepage
        $('body').addClass('no-log');
        $('#back').hide();
        $('#logbtn').hide()
        $('#stationid').html('');
            
        $('.upper').html('<div class="searchbar"><div class="inner"><i class="fa fa-search" aria-hidden="true"></i><input id="search" type="text" placeholder="Start Typing..." /><div class="spacer" style="clear: both;"></div></div></div>');
        if(favorites.length > 0){
            $('section').addClass('fixed_tall');
            for(var i = 0; i < favorites.length; i++){
                var sid = favorites[i];
                var station = data.stations[sid-1];
                container.append(stationtile_html(station.id, station.status, station.name, station.packages, station.delivered, station.exceptions, station.late, true));
            }
        } else {
           container.html('<h1 class="white">Looks like you don\'t have any stations or regions saved, search an id above to get started!<br>Ex: Columbus</h1>'); 
        }
    }
    
    if(hash.length == 1){
        if(hash[0] == 'settings'){
            $('body').append(settingspage_html(settings_save[0],settings_save[1]));
            $('.black-bg').css('display','block');
        }
    }
    
    if(hash.length > 1){
        
        var stationid = hash[1];
        var station = data.stations[stationid-1];
        
        $('#stationid').html('<h1>'+station.name+'</h1>');
        $('#back').show();
         $('#logbtn').show();
         
         $('.upper').html('<div class="optionbar"><div class="inner"><span class="left stationmenu"><a class="active" id="overviewbtn" href="javascript:void(0);">Overview</a><a id="packagesbtn" href="javascript:void(0);">Packages</a><a id="couriersbtn" href="javascript:void(0);">Couriers</a></span><span class="right filter"></span><div class="spacer" style="clear: both;"></div></div></div>');
         
         $('section').css('margin-top', '100px');
         if($(window).width() > 850){
            $('body').removeClass('no-log');
            $('#logbtn').addClass('active');
         }
    }
    
    if(hash.length == 2){
        //just station
        
        $('.stationmenu a').removeClass('active');
        $('#overviewbtn').addClass('active');
        
        
        var stationid = hash[1];
        var station = data.stations[stationid-1];

        container.append(overviewtile_html("Total Packages", station.packages, 'packages'));
        container.append(overviewtile_html("Delivered On Time", station.delivered, 'packages/delivered'));
        container.append(overviewtile_html("Exceptions", station.exceptions, 'packages/exception'));
        container.append(overviewtile_html("Delivered Late", station.late, 'packages/late'));
        container.append(overviewtile_html("Couriers", station.c.length, 'couriers'));
        
    }
    
    if(hash.length == 3 || hash.length == 4){
        if(hash[2] == 'packages'){
            $('.filter').html('<h2><span>Show</span><select><option value="all">All</option><option value="enroute">En Route</option><option value="delivered">Delivered</option><option value="late">Late</option><option value="exception">Exceptions</option></select></h2>');
            if($(window).width() < 600){
                $('section').css('margin-top', '150px');
            }
            
            $('.stationmenu a').removeClass('active');
            $('#packagesbtn').addClass('active');
            
            
            
            var stationid = hash[1];
            var station = data.stations[stationid-1];
            var packages = data.stations[stationid-1].p;
            
            var filter = 'all';
            var cid = 'none';
            
            if(hash.length == 4){
                if(!$.isNumeric(hash[3])){
                    var refine = hash[3].split('+');
                    
                    if($.inArray(refine[0],['exception','late', 'delivered', 'enroute','all']) !== -1){
                        $('.filter select').val(refine[0]);
                            //filter
                        filter = refine[0];
                    }
                    if(refine[1]){
                        cid = refine[1];
                        console.log(filter+'+'+cid);
                        $('.filter select').append('<option value="'+filter+'+'+cid+'">'+filter+' + '+cid+'</option>');
                        $('.filter select').val(filter+'+'+cid);
                    }
                }
            }

            for(var i = 0; i < packages.length; i++){
                    var packid = packages[i];
                    var thepack = data.packages[packid-1];
                if(filter == 'all' && cid == 'none'){
                    container.append(packtile_html(thepack.id, thepack.status, thepack.courier, thepack.time));
                } else if(thepack.status == filter && thepack.courier_id == cid) {
                    container.append(packtile_html(thepack.id, thepack.status, thepack.courier, thepack.time));
                } else if(thepack.status == filter && cid == 'none') {
                    container.append(packtile_html(thepack.id, thepack.status, thepack.courier, thepack.time));
                } else if(filter == 'all' && thepack.courier_id == cid) {
                    container.append(packtile_html(thepack.id, thepack.status, thepack.courier, thepack.time));
                }
                
            }
            
            if(container.children().length < 1){
                container.append('<h1 class="white">No Results!</h1>');
            }
            
            if(hash.length == 4){
                
                if($.isNumeric(hash[3])){
                    var pid = hash[3];
                    thepack = data.packages[pid-1];
                    $('body').append(packagepage_html(thepack.id, thepack.status, thepack.courier, thepack.time, thepack.type, thepack.courier_id));
                    $('.black-bg').css('display','block');
                }
                
            }
            
        } else if(hash[2] == 'couriers'){
            
            $('.stationmenu a').removeClass('active');
            $('#couriersbtn').addClass('active');
            
            var stationid = hash[1];
            var station = data.stations[stationid-1];
            var couriers = data.stations[stationid-1].c;

            for(var i = 0; i < couriers.length; i++){
                
                
                
                var cid = couriers[i];
                var courier = data.couriers[cid-1];
                container.append(couriertile_html(courier.id, courier.status, courier.fname, courier.lname, courier.packages, courier.delivered, courier.exceptions, courier.late));
            }
            
            if(hash.length == 4){
                
                if($.isNumeric(hash[3])){
                    var cid = hash[3];
                    courier = data.couriers[cid-1];
                    $('body').append(courierpage_html(courier.id, courier.status, courier.fname, courier.lname, courier.packages, courier.delivered, courier.exceptions, courier.late, courier.phone));
                    $('.black-bg').css('display','block');
                }
                
            }
            
        }
    }
}

$(function(){
    
    $.getJSON( "data.json", function( data ) {
        var hash = hash_check();
        console.log(hash);
        page_manager(hash,data);
    
        $(window).on('hashchange', function() {
            var hash = hash_check();
            console.log(hash);
            page_manager(hash,data);
        });
        
        $('.upper').on('keyup', '#search', function(e) {
            if (e.keyCode == 13) {
                $('#back').show();
                $(this).blur();
                var term = $('#search').val();
                var container = $('.container');
                container.html('');
                var isstation = false;
                for(var i = 0; i < Object.keys(data.stations).length; i++){
                    var station = data.stations[i];
                    if(station.name.toLowerCase() == term.toLowerCase()){
                        $('section').addClass('fixed_tall');
                        if($.inArray(station.id, favorites) !== -1){
                            container.append(stationtile_html(station.id, station.status, station.name, station.packages, station.delivered, station.exceptions, station.late, true));
                        } else {
                            container.append(stationtile_html(station.id, station.status, station.name, station.packages, station.delivered, station.exceptions, station.late, false));
                        }
                        
                        isstation = true;
                    }
                }
                if(!isstation){
                    $('section').removeClass('fixed_tall');
                    container.append('<h1 class="white">No Results!</h1>');
                }
            }
        });
        
    });
    
    
    
    /*for(var i = 0; i < Object.keys(data.packages).length; i++){
        var pack = data.packages[i];
        container.append(packtile_html(pack.id,pack.status,pack.courier,pack.time));

    }
    
    for(var i = 0; i < Object.keys(data.couriers).length; i++){
        var courier = data.couriers[i];
        container.append(couriertile_html(courier.id, courier.status, courier.name, courier.packages, courier.delivered, courier.exceptions, courier.late));
    } */
});