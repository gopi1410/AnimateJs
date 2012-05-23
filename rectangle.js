/****************************************************************************
PARAMETERS: direction, lineWidth, lineColour, divisions, duration, fill, fillColour start, draw, stop

NOTE THAT divisions/totalTime should not exceed 25.
*****************************************************************************/

HTMLCanvasElement.prototype.animateRect=function(x1,y1,x2,y2,params) {
	if(params)
		initRect(this,x1,y1,x2,y2,params.direction,params.lineColour,params.lineWidth,params.divisions,params.duration,params.fill,params.fillColour,params.start,params.draw,params.stop);
	else
		initRect(this,x1,y1,x2,y2);
};

function initRect(id,x1,y1,x2,y2,direction,lineColour,lineWidth,divisions,totalTime,fill,fillColor,start,draw,stop)
{
	var canvasId=id;
	var context=canvasId.getContext('2d');
	var rectWidth=Math.abs(x2-x1);
	var rectHeight=Math.abs(y2-y1);
	var halfPerimeter=rectWidth+rectHeight;
	if(!stop)
		stop=function() {};
	if(!draw)
		draw=function() {};
	
	function drawRectLineClock1()
	{
		id.animateLine(x1,y1,x2,y1,{ 'lineColour':lineColour, 'lineWidth':lineWidth, 'divisions':divisions, 'totalTime':(totalTime/4), 'draw': draw, 'stop': function() { drawRectLineClock2(); } });
	}
	function drawRectLineClock2()
	{
		id.animateLine(x2,y1,x2,y2,{ 'lineColour':lineColour, 'lineWidth':lineWidth, 'divisions':divisions, 'totalTime':(totalTime/4), 'draw': draw, 'stop': function() { drawRectLineClock3(); } });
	}
	function drawRectLineClock3()
	{
		id.animateLine(x2,y2,x1,y2,{ 'lineColour':lineColour, 'lineWidth':lineWidth, 'divisions':divisions, 'totalTime':(totalTime/4), 'draw': draw, 'stop': function() { drawRectLineClock4(); } });
	}
	function drawRectLineClock4()
	{
		id.animateLine(x1,y2,x1,y1,{ 'lineColour':lineColour, 'lineWidth':lineWidth, 'divisions':divisions, 'totalTime':(totalTime/4), 'draw': draw, 'stop': function() {end();} });
	}
	function drawRectLineAnti1()
	{
		id.animateLine(x1,y1,x1,y2,{ 'lineColour':lineColour, 'lineWidth':lineWidth, 'divisions':divisions, 'totalTime':(totalTime/4), 'draw': draw, 'stop': function() { drawRectLineAnti2(); } });
	}
	function drawRectLineAnti2()
	{
		id.animateLine(x1,y2,x2,y2,{ 'lineColour':lineColour, 'lineWidth':lineWidth, 'divisions':divisions, 'totalTime':(totalTime/4), 'draw': draw, 'stop': function() { drawRectLineAnti3(); } });
	}
	function drawRectLineAnti3()
	{
		id.animateLine(x2,y2,x2,y1,{ 'lineColour':lineColour, 'lineWidth':lineWidth, 'divisions':divisions, 'totalTime':(totalTime/4), 'draw': draw, 'stop': function() { drawRectLineAnti4(); } });
	}
	function drawRectLineAnti4()
	{
		id.animateLine(x2,y1,x1,y1,{ 'lineColour':lineColour, 'lineWidth':lineWidth, 'divisions':divisions, 'totalTime':(totalTime/4), 'draw': draw, 'stop': function() {end();} });
	}
	if(start)
		start();
	if(fill==="fillBefore")
	{
		context.beginPath();
		if(fillColor)
			context.fillStyle=fillColor;
		context.rect(x1,y1,Math.abs(x2-x1),Math.abs(y2-y1));
		context.fill();
		context.closePath();
	}
	if(direction)
		drawRectLineAnti1();
	else
		drawRectLineClock1();
	
	function end()
	{
		if(fill==="fillAfter")
		{
			if(!lineWidth)
				lineWidth=1;
			context.beginPath();
			if(fillColor)
				context.fillStyle=fillColor;
			context.rect(x1+(lineWidth/2),y1+(lineWidth/2),Math.abs(x2-x1)-(lineWidth),Math.abs(y2-y1)-(lineWidth));
			context.fill();
			context.closePath();
		}
		stop();
	}
}