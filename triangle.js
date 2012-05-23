/****************************************************************************
PARAMETERS: lineWidth, lineColour, divisions, duration, fill, fillColour, start, draw, stop

NOTE THAT divisions/totalTime should not exceed 33.
*****************************************************************************/

HTMLCanvasElement.prototype.animateTriangle=function(x1,y1,x2,y2,x3,y3,params) {
	if(params)
		initTriangle(this,x1,y1,x2,y2,x3,y3,params.lineColour,params.lineWidth,params.divisions,params.duration,params.fill,params.fillColour,params.start,params.draw,params.stop);
	else
		initTriangle(this,x1,y1,x2,y2,x3,y3);
};

function initTriangle(id,x1,y1,x2,y2,x3,y3,lineColour,lineWidth,divisions,totalTime,fill,fillColor,start,draw,stop)
{
	var canvasId=id;
	var context=canvasId.getContext('2d');
	if(!stop)
		stop=function() {};
	if(!draw)
		draw=function() {};
	
	function drawTrianLine1()
	{
		id.animateLine(x1,y1,x2,y2,{ 'lineColour':lineColour, 'lineWidth':lineWidth, 'divisions':divisions, 'totalTime':(totalTime/3), 'draw': draw, 'stop': function() { drawTrianLine2(); }});
	}
	function drawTrianLine2()
	{
		id.animateLine(x2,y2,x3,y3,{ 'lineColour':lineColour, 'lineWidth':lineWidth, 'divisions':divisions, 'totalTime':(totalTime/3), 'draw': draw, 'stop': function() { drawTrianLine3(); }});
	}
	function drawTrianLine3()
	{
		id.animateLine(x3,y3,x1,y1,{ 'lineColour':lineColour, 'lineWidth':lineWidth, 'divisions':divisions, 'totalTime':(totalTime/3), 'draw': draw, 'stop': function() {end();} });
	}
	function end()
	{
		if(fill==="fillAfter")
		{
			context.beginPath();
			if(fillColor)
				context.fillStyle=fillColor;
			context.moveTo(x1,y1);
			context.lineTo(x2,y2);
			context.lineTo(x3,y3);
			context.lineTo(x1,y1);
			context.fill();
			context.closePath();
		}
		stop();
	}
	
	if(start)
		start();
	if(fill==="fillBefore")
	{
		context.beginPath();
		if(fillColor)
			context.fillStyle=fillColor;
		context.moveTo(x1,y1);
		context.lineTo(x2,y2);
		context.lineTo(x3,y3);
		context.lineTo(x1,y1);
		context.fill();
		context.closePath();
	}
	drawTrianLine1();
}