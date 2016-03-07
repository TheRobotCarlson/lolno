function apiCall(){

  var username = $('#username').val();
  var api_key = "45eca838-6550-4cb8-a00a-1277a73cede1";
  //$('#api_key').val();
  var region = 'na';
  var eventuri   = 'https://na.api.pvp.net/api/lol/'+region+'/v1.4/summoner/by-name/' + username+'?api_key='+api_key;

  requestJSON(eventuri,function(json){
    var outhtml = '<h1><strong>'+ username+':</strong></h1> <ul>';
    $.each(json, function(index) {

      var d = new Date(json[index].revisionDate); // The 0 there is the key, which sets the date to the epoch
      var epoch = new Date();
      var timeDiff = Math.abs(d.getTime() -epoch.getTime())/1000; // in seconds
      var timeSince = timeDiff/(3600);//in hours
      var timeType = "hours";
      if(timeDiff < 60){
        timeSince = timeDiff;
        timeType = "seconds";
      }else if(timeDiff < 3600){
        timeSince = timeDiff/60;
        timeType = "minutes";
      }else if(timeDiff < 3600*24){
        timeSince = timeDiff/3600;
        timeType = "hours";
      }else{
        timeSince = timeDiff/(3600*24);
        timeType = "days";
      }

        outhtml = outhtml + '<li class="feedbox">Last time '+username+' played: '+d.toLocaleString()+'</li>';
        outhtml += '<li>Length of time since: '+timeSince+' '+timeType+'</li>'
    });
    outhtml = outhtml + '</ul>';

    $('#result').html(outhtml);
  });

  function requestJSON(url, callback) {
    $.ajax({
     url: url,
      complete: function(xhr) {
        callback.call(null, xhr.responseJSON);
      }
    });
  }
}
