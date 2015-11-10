(function(){

  var data,
    circle, 
    svg, 
    arr = [], 
    years = [], 
    processedData = [];

  d3.csv("pop.csv", function(error, json) {
    if (error) console.log("error");
    else data = json;  
    init();
  });

  function init() {

    for(var k = 0; k < data.length; k++ ) {
      var inner = [];
      inner.push(parseInt(data[k].Year));
      inner.push(parseInt(data[k].UK));
      processedData.push(inner);
    }

    // processed data - to build into a function 
    // console.log(arr);
    // console.log(processedData[0][1]);

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

    arr.push(data[0].UK);

    for(var i = 0; i < data.length; i++) {
      years.push(data[i].Year);
    }

    circle = svg.selectAll("#vis circle")
      .data(arr)
      .enter()
      .append("circle")
      .attr({
        "cx" : 100, // fix later
        "cy" : 100, 
        "r" : function(d) {
          return d / 1000000;
        }, 
        "fill" : "#efefef"
      });

    initialiseSlider(processedData[0][0],processedData[processedData.length - 1][0]);
  }


  function initialiseSlider(start, end) {

    $("#slider").slider({
      value:start,
      min: start,
      max: end,
      step: 1,
      slide: function(event, ui) {
        $("#year").val(ui.value);
        console.log(ui.value);
      }
    });
  
  }



})();
