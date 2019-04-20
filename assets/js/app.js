// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
  .select(".chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');


// Append an SVG group
var chartGroup = svg.append("g")
 // .attr("transform", `translate(${margin.left}, ${margin.top})`);


// Retrieve data from the CSV file and execute everything below
d3.csv("/data/data.csv", function(err, censusData) {
  if (err) throw err;

  console.log(censusData)
    
  //process csv file using a for loop.
  for (var i = 0; i < censusData.length; i++) {
      console.log(i, censusData[i].abbr, censusData[i].poverty, censusData[i].healthcare );
      console.log(i, censusData[i].obesity, censusData[i].income, censusData[i].smokes  );
  }

  // parse data
  censusData.forEach(function(data) {
    data.id = +data.id;
    //data.state = +data.state;
    data.abbr = +data.abbr;
    data.poverty = +data.poverty;
    //data.povertyMoe = +data.povertyMoe;
    data.age = +data.age;
    //data.ageMoe = +data.ageMoe;
    data.income = +data.income;
    //data.incomeMoe = +data.incomeMoe;
    data.healthcare = +data.healthcare;
    //data.healthcareLow = +data.healthcareLow;
    //ata.healthcareHigh = +data.healthcareHigh;
    data.obesity = +data.obesity;
    //data.obesityLow = +data.obesityLow;
    //data.obesityHigh = +data.obesityHigh;
    data.smokes = +data.smokes;
    //data.smokesLow = +data.smokesLow;
    //data.smokesHigh = +data.smokesHigh;
  })

    // Create scale functions. scale y to chart height.
    var yLinearScale = d3.scaleLinear().range([chartHeight, 0]);
    // scale x to chart width.
    var xLinearScale = d3.scaleLinear().range([0, chartWidth]);

    // Create axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Scale the domain
    xLinearScale.domain([8,
        d3.max(censusData, function(data) {
        return +data.poverty * 1.05;
      }),
    ]);

    yLinearScale.domain([0,
        d3.max(censusData, function(data) {
        return +data.healthcare * 1.1;
      }),
    ]);

    console.log("creating tooltip")
    // Create tool tip
    var toolTip = d3
      .tip()
      .attr('class', 'tooltip')
      .offset([60, 15])
      //.offset([80, -60])
      .html(function(data) {
          var state = data.state;
          var poverty = +data.poverty;
          var healthcare = +data.healthcare;
          return (
          state + '<br> Poverty Percentage: ' + poverty + '<br> Lacks Healthcare Percentage: ' + healthcare
          );
      });

    chartGroup.call(toolTip);
    
    // Generate Scatter Plot
    chartGroup
    .selectAll('circle')
    .data(censusData)
    .enter()
    .append('circle')
    .attr('cx', function(data, index) {
      return xLinearScale(data.poverty);
    })
    .attr('cy', function(data, index) {
      return yLinearScale(data.healthcare);
    })
    .attr('r', '16')
    .attr('fill', 'lightblue')
    .attr('fill-opacity',0.6)
    //.on('click', function(data) {
    // Display tooltip on mouseover. 
    .on("mouseover",function(data) {
      toolTip.show(data);
    })
    // Hide and Show on mouseout
    .on("mouseout", function(data, index) {
      toolTip.hide(data);
    });

    chartGroup
      .append('g')
      .attr('transform', `translate(0, ${chartHeight})`)
      .call(bottomAxis);

    chartGroup.append('g').call(leftAxis);

    svg.selectAll(".dot")
    .data(censusData)
    .enter()
    .append("text")
    .text(function(data) { return data.abbr; })
    .attr('x', function(data) {
      return xLinearScale(data.poverty);
    })
    .attr('y', function(data) {
      return yLinearScale(data.healthcare);
    })
    .attr("font-size", "10px")
    .attr("fill", "black")
    .style("text-anchor", "middle");

    chartGroup
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 0 - margin.left + 40)
      .attr('x', 0 - chartHeight / 2)
      .attr('dy', '1em')
      .attr('class', 'axisText')
      .text('No Healthcare (%)');

    // x-axis labels
    chartGroup
      .append('text')
      .attr(
        'transform',
        'translate(' + chartWidth / 2 + ' ,' + (chartHeight + margin.top + 40) + ')',
      )
      .attr('class', 'axisText')
      .text('Poverty (%)');

     


})

  