// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 50,
  bottom: 80,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3.select("#chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Retrieve data from the CSV file and execute everything below

d3.csv("/assets/data/data.csv")
  .then(function(censusData) {
  console.log(censusData);

//const censusData = await d3.csv("data.csv");
//console.log(censusData);

 

  // parse data
  censusData.forEach(function(data) {
    //data.id = +data.id;
    //data.state = +data.state;
    data.abbr = +data.abbr;
    //data.poverty = +data.poverty;
    //data.povertyMoe = +data.povertyMoe;
    data.age = +data.age;
    //data.ageMoe = +data.ageMoe;
    //data.income = +data.income;
    //data.incomeMoe = +data.incomeMoe;
    //data.noHealthInsurance = +data.noHealthInsurance;
    data.obesity = +data.obesity;
    data.smokes = +data.smokes;
    console.log(data.age)
  });

   //process csv file using a for loop.
   //for (var i = 0; i < censusData.length; i++) {
   // console.log(i, data.abbr[i], data.poverty[i], data.noHealthInsurance[i] );
// //   console.log(i, censusData[i].obesity, censusData[i].income, censusData[i].smokes  );
   // };
// Step 2: Create scale functions
    // ==============================
    var xLinearScale = d3.scaleLinear()
      .domain([18, d3.max(censusData, d => d.obesity)+3])
      .range([0, width]);

    var yLinearScale = d3.scaleLinear()
      .domain([0, d3.max(censusData, d => d.smokes)+5])
      .range([height, 0]);

    // Step 3: Create axis functions
    // ==============================
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Step 4: Append Axes to the chart
    // ==============================
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);

    // Step 5: Create Circles
    // ==============================
    var circlesGroup = chartGroup.selectAll("circle")
    .data(censusData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.obesity))
    .attr("cy", d => yLinearScale(d.smokes))
    .attr("r", "15")
    .attr("fill", "lightblue")
    .attr("opacity", ".5");

    // Step 6: Initialize tool tip
    // ==============================
    var toolTip = d3.tip()
      .attr("class", "tooltip")
      .offset([80, -60])
      .html(function(d) {
        return (`${d.abbr}`);
      });

    // Step 7: Create tooltip in the chart
    // ==============================
    chartGroup.call(toolTip);

    // Step 8: Create event listeners to display and hide the tooltip
    // ==============================
    circlesGroup.on("click", function(data) {
      toolTip.show(data, this);
    })
      // onmouseout event
      .on("mouseout", function(data, index) {
        toolTip.hide(data);
      });

    // Create axes labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("% Smoke");

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .text("% Obese");
  });
    // Create scale functions. scale y to chart height.
    //var yLinearScale = d3.scaleLinear().range([chartHeight, 0]);
    // scale x to chart width.
    //var xLinearScale = d3.scaleLinear().range([0, chartWidth]);

    // Create axis functions
    //var bottomAxis = d3.axisBottom(xLinearScale);
    //var leftAxis = d3.axisLeft(yLinearScale);

    // Scale the domain
    //xLinearScale.domain([8,
    //    d3.max(censusData, function(data) {
    //    return +data.poverty * 1.05;
    //  }),
    //]);

    //yLinearScale.domain([0,
    //    d3.max(censusData, function(data) {
    //    return +data.healthcare * 1.1;
    //  }),
    //]);

    //console.log("creating tooltip")
    // Create tool tip
    //var toolTip = d3
     // .tip()
     // .attr('class', 'tooltip')
     // .offset([60, 15])
      //.offset([80, -60])
     // .html(function(data) {
      //    var state = data.abbr;
       //   var poverty = +data.poverty;
        //  var noHealthInsurance = +data.noHealthInsurance;
        //  return (
        //  state + '<br> Poverty Percentage: ' + poverty + '<br> Lacks Healthcare Percentage: ' + noHealthInsurance
        //  );
     // });

    //chartGroup.call(toolTip);
    
    // Generate Scatter Plot
    //chartGroup
    //.selectAll('circle')
    //.data(censusData)
    //.enter()
    //.append('circle')
    //.attr('cx', function(data, index) {
    //  return xLinearScale(data.poverty);
    //})
    //.attr('cy', function(data, index) {
    //  return yLinearScale(data.noHealthInsurance);
    //})
    //.attr('r', '16')
    //.attr('fill', 'lightblue')
    //.attr('fill-opacity',0.6)
    ////.on('click', function(data) {
    // Display tooltip on mouseover. 
    //.on("mouseover",function(data) {
     // toolTip.show(data);
    //})
    // Hide and Show on mouseout
    //.on("mouseout", function(data, index) {
     // toolTip.hide(data);
    //});

   // chartGroup
    //  .append('g')
    //  .attr('transform', `translate(0, ${chartHeight})`)
    //  .call(bottomAxis);

    //chartGroup.append('g').call(leftAxis);

    //svg.selectAll(".dot")
    //.data(censusData)
    //.enter()
    //.append("text")
    //.text(function(data) { return data.abbr; })
    //.attr('x', function(data) {
    //  return xLinearScale(data.poverty);
    //})
    //.attr('y', function(data) {
    //  return yLinearScale(data.noHealthInsurance);
    //})
    //.attr("font-size", "10px")
    //.attr("fill", "black")
    //.style("text-anchor", "middle");

    //chartGroup
    //  .append('text')
    //  .attr('transform', 'rotate(-90)')
    //  .attr('y', 0 - margin.left + 40)
    //  .attr('x', 0 - chartHeight / 2)
    //  .attr('dy', '1em')
    //  .attr('class', 'axisText')
    //  .text('No Healthcare (%)');

    // x-axis labels
    //chartGroup
    //  .append('text')
    //  .attr(
    //    'transform',
    //    'translate(' + chartWidth / 2 + ' ,' + (chartHeight + margin.top + 40) + ')',
    //  )
    //  .attr('class', 'axisText')
    //  .text('Poverty (%)');

     


//})

  