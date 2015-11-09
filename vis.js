(function(){

  var data,
    circle, 
    svg, 
    width, 
    height, 
    arr = [];

  d3.csv("pop.csv", function(error, json) {
    if (error) console.log("error");
    else data = json;  
    init();
  });



  function init() {
    svg = d3.selectAll("#vis")
      .append("svg")
      .attr({
        "width": function() {
          return $(window).width() * 0.5; 
        },
        "height": function() {
          return $(window).height() * 0.5;
        }
      });

    circle = svg.selectAll("#vis circle")
      .data([50])
      .enter()
      .append("circle")
      .attr({
        "cx" : 100, // fix later
        "cy" : 100, 
        "r" : 40, 
        "fill" : "#efefef"
      });

    // for(var prop in data) {
    //   if(data.hasOwnProperty(prop)) {
    //     // arr.push(data[prop].Year);
    //     console.log(prop.length);
    //   }
    // }

    // console.log(arr);
  }

  $( "#slider" ).slider({
    value:100,
    min: 0,
    max: 500,
    step: 1,
    slide: function( event, ui ) {
      $( "#amount" ).val( "$" + ui.value );
    }
  });
  $( "#amount" ).val( "$" + $( "#slider" ).slider( "value" ) );

})();
