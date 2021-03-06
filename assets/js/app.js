// @TODO: YOUR CODE HERE!
var svgWidth = 850;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 120,
  bottom: 80,
  left: 35
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3.select("#chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Retrieve data from the CSV file and execute everything below
//  how the abbr column which are string values are treated, versus numbers columns
// Reference:  http://learnjsdata.com/read_data.html.  Examples show the use of .then and the formatting for strings
// Reference:  https://www.tutorialsteacher.com/d3js/loading-data-from-file-in-d3js - the official but not as helpful
// I had difficulties using the d3.csv call without the .then function :
// I would always get an undetected promise error, and the file would not be read
// Also the console log would not work
// Using the .then function does not allow errors to be displayed
// Instead you have to use console.log

d3.csv("/assets/data/data.csv")
  .then(function(censusData) {
    
  //console.log(censusData); 
  // parse data
  censusData.forEach(function(data) {
    //data.id = +data.id;
    //data["state"] = +data["state"];
    data["abbr"] = data["abbr"];
    //data.poverty = +data.poverty;
    //data.povertyMoe = +data.povertyMoe;
    data.age = +data.age;
    //data.ageMoe = +data.ageMoe;
    //data.income = +data.income;
    //data.incomeMoe = +data.incomeMoe;
    //data.noHealthInsurance = +data.noHealthInsurance;
    data.obesity = +data.obesity;
    data.smokes = +data.smokes;
  //  console.log(data.age);
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

    // Step 5: Create Circles and texts
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

    // Create labels inside the circles
    // The following snippet of code comes from my tutor
    // Sivakumar Venkatachalam
    // The text doesn't come out in the right location
    // So editing was used to position the text labels properly
    // inside the circles.  There is probably a better way to do this


    svg.selectAll(".dot")
    .data(censusData)
    .enter()
    .append("text")
    .text(function(data) { return data["abbr"]; })
    .attr('x', function(data) {
      return xLinearScale(data.obesity)+35;
    })
    .attr('y', function(data) {
      return yLinearScale(data.smokes)+25;
    })
    .attr("font-size", "10px")
    .attr("fill", "black")
    .style("text-anchor", "middle");
    

    // Step 6: Initialize tool tip - Right now not using mouseover animation
    // ==============================
    //var toolTip = d3.tip()
    //  .attr("class", "tooltip")
    //  .offset([80, -60])
     // .html(function(d) {
     //   return (`${d.abbr}`);
     // });

    // Step 7: Create tooltip in the chart
    // ==============================
    //chartGroup.call(toolTip);

    // Step 8: Create event listeners to display and hide the tooltip
    // ==============================
    //circlesGroup.on("click", function(data) {
    //  toolTip.show(data, this);
    //})
      // onmouseout event
    //  .on("mouseout", function(data, index) {
    //    toolTip.hide(data);
    //  });

    // Create axes labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left -20)
      .attr("x", 0 - (height / 2) -35)
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("% Smokers");

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2 - 25}, ${height + margin.top + 25})`)
      .attr("class", "axisText")
      .text("% Obese");
  });
   