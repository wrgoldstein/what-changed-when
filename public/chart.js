// chart variables
var width = 1200,
    height = 400,
    barHeight = height / 2,
    barWidth = 10,
    x = d3.time.scale(),
    y = d3.scale.linear().domain([0, d3.max(daily.map(function(d) { return d.count; }))]).range([barHeight, 0]);

// helpers
function mouseover(d, i) {
    div.style("left", i * barWidth + "px")
        .style("top", barHeight + 10 + "px")
        .style("opacity", 1)
        .text(d.date);

    ul = makeUL(d.messages);
    document.body.appendChild(ul);
}

function mouseout() {
    div.style("opacity", 1e-6)
        .text('');
    document.body.removeChild(ul)
}

function makeUL(array) {
    var list = document.createElement('ul');
    for (var i = 0; i < array.length; i++) {
        var item = document.createElement('li');
        item.appendChild(document.createTextNode(array[i]));
        list.appendChild(item);
    }
    return list;
}

// canvas
var barsvg = d3.select("body")
    .append("svg")
    .attr("height", barHeight)
    .attr("width", width);

var bar = barsvg.selectAll("g")
    .data(daily)
    .enter().append("g")
    .attr("transform", function(d, i) {
        return "translate(" + i * barWidth + ",0)";
    })
    .classed("chart", true);

var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 1e-6);

// chart
bar.append("rect")
    .attr("y", function(d) {
        return y(d.count);
    })
    .attr("height", function(d) {
        return barHeight - y(d.count) + .5;
    })
    .attr("width", barWidth - 1)
    .on('mouseover', function(d, i) {
        mouseover(d, i);
    })
    .on("mouseout", mouseout);