(function(){

  var data = "foo", 
    circle, 
    svg, 
    arr = [], 
    years = [], 
    processedData = [], 
    newData;

  d3.csv("pop.csv", function(error, json) {
    if (error) {
      console.log("error");
    }
    else {
      data = json;  
    }
    init();
  });

  function drawCircle() {

    svg = d3.select("#vis")
      .append("svg")
      .attr({
        "width": function() {
         return $(window).width() * 0.5; 
      },
        "height": function() {
        return $(window).height() * 0.35;
      }
    });

    var temp = [];
    temp.push(processedData[0][1]);

    circle = svg.selectAll("circle")
      .data(temp)
      .enter()
      .append("circle")
      .attr({
        "cx" : 100, // fix later
        "cy" : 100, 
        "r" : function(d, i) {
          return temp / 1000000;
        }, 
        "fill" : "#8e44ad"
      });

    initialiseSlider(processedData[0][0],processedData[processedData.length - 1][0]);
  
  }

  function init() {
    for(var k = 0; k < data.length; k++ ) {
      var inner = [];
      inner.push(parseInt(data[k].Year));
      inner.push(parseInt(data[k].UK));
      processedData.push(inner);
    }
    
    drawCircle();
  }


  function update(year) {
    var temp = [];

    for(var i = 0; i < processedData.length; i++) {
      if(processedData[i][0] == year) {
        temp.push(processedData[i][1]);
      }
    }

    circle = svg.selectAll("circle")
      .data(temp)
      .transition()
      .duration(300)
      .delay(100)
      .attr({
        "r" : function(d, i) {
          return temp / 1000000;
        }
      }
    );

    $("#population").val(temp[0]);
  }

  function initialiseSlider(start, end) {
    $("#slider").slider({
      value:1953,
      min: 1953,
      max: end,
      step: 10,
      slide: function(event, ui) {
        $("#year").val(ui.value);
        $("#population").val(ui.value);
        update(ui.value);
      },
      create: function(event, ui){
        $(this).slider('value',$(this).parent().find("#year").val());
      }
    });
  }



})();
