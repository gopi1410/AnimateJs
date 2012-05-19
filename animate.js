/****************************************************************************
PARAMETERS:-
Line: lineWidth, lineColour, divisions, duration, start, draw, stop
Lines: lineWidth, lineColour, duration, start, draw, stop
Rectangle: direction, lineWidth, lineColour, divisions, duration, fill, fillColour start, draw, stop
Triangle: lineWidth, lineColour, divisions, duration, fill, fillColour, start, draw, stop
Circle: lineWidth, lineColour, divisions, duration, fill, fillColour, start, draw, stop
Points: lineWidth, lineColour, duration, start, draw, stop

NOTE THAT divisions/duration should not exceed:-
100 for line
25 for rectangle
33 for triangle
100 for circle

FOR REDUCING FILE SIZE USE JSCOMPRESS.COM TO MINIFY THE CODE.
-Gopi Ramena (author)
*****************************************************************************/

HTMLCanvasElement.prototype.animateLine=function(x1,y1,x2,y2,params) {
	if(params)
		initLine(this,x1,y1,x2,y2,params.lineColour,params.lineWidth,params.divisions,params.duration,params.start,params.draw,params.stop);
	else
		initLine(this,x1,y1,x2,y2);
};
HTMLCanvasElement.prototype.animateLines=function(pointArr,params) {
	if(params)
		initLines(this,pointArr,params.lineColour,params.lineWidth,params.duration,params.start,params.draw,params.stop);
	else
		initLines(this,pointArr);
};
HTMLCanvasElement.prototype.animatePoints=function(pointArr,params) {
	if(params)
		initPoints(this,pointArr,params.lineColour,params.lineWidth,params.duration,params.start,params.draw,params.stop);
	else
		initPoints(this,pointArr);
};
HTMLCanvasElement.prototype.animateRect=function(x1,y1,x2,y2,params) {
	if(params)
		initRect(this,x1,y1,x2,y2,params.direction,params.lineColour,params.lineWidth,params.divisions,params.duration,params.fill,params.fillColour,params.start,params.draw,params.stop);
	else
		initRect(this,x1,y1,x2,y2);
};
HTMLCanvasElement.prototype.animateTriangle=function(x1,y1,x2,y2,x3,y3,params) {
	if(params)
		initTriangle(this,x1,y1,x2,y2,x3,y3,params.lineColour,params.lineWidth,params.divisions,params.duration,params.fill,params.fillColour,params.start,params.draw,params.stop);
	else
		initTriangle(this,x1,y1,x2,y2,x3,y3);
};
HTMLCanvasElement.prototype.animateCircle=function(x,y,r,params) {
	if(params)
		initCircle(this,x,y,r,params.lineColour,params.lineWidth,params.divisions,params.duration,params.fill,params.fillColour,params.start,params.draw,params.stop);
	else
		initCircle(this,x,y,r);
};

function initLine(id,x1,y1,x2,y2,lineColor,lineWidth,interval,totalTime,start,draw,stop)
{
	if(!interval)
		interval=100;
	if(!totalTime)
		totalTime=1;
	var canvasId=id;
	var context=canvasId.getContext('2d');
	context.beginPath();
	if(lineColor)
		context.strokeStyle=lineColor;
	if(lineWidth)
		context.lineWidth=lineWidth;
	context.moveTo(x1,y1);
	var data=[];
	var i=0;
	data[0]=new Array(interval);
	data[1]=new Array(interval);
	var xInt=(x2-x1)/interval;
	var yInt=(y2-y1)/interval;
	for(i=0;i<=interval;i++)
	{
		data[0][i]=x1+(i*xInt);
		data[1][i]=y1+(i*yInt);
	}
	if(start)
		start();
	
	i=0;
	var length=data[0].length;
	var pid = setInterval(function() {
		context.lineTo(data[0][i],data[1][i]);
		context.stroke();
		if(draw)
			draw();
		if(i++===length)
		{
			context.closePath();
			clearInterval(pid);
			if(stop)
				stop();
		}
	}, (1000*totalTime/interval));
}
function initLines(id,pointArr,lineColor,lineWidth,duration,start,draw,stop)
{
	if(!draw)
	{
		draw=function() {};
	}
	function drawLines(pointArr)
	{
		var l=pointArr.length;
		if(l==1)
		{
			if(stop)
				stop();
			return;
		}
		var pointOne=pointArr[0];
		var pointTwo=pointArr[1];
		id.animateLine(pointOne[0], pointOne[1], pointTwo[0], pointTwo[1], {'lineColour': lineColor, 'lineWidth': lineWidth, 'duration':duration, 'draw': draw, 'stop': function() { drawLines(pointArr.slice(1)); }});
	}
	if(start)
		start();
	drawLines(pointArr);
}
function initPoints(id,pointArr,lineColor,lineWidth,duration,start,draw,stop)
{
	function drawPoints(pointArr)
	{
		var l=pointArr.length;
		if(l==0)
		{
			if(stop)
				stop();
			return;
		}
		var pointOne=pointArr[0];
		var pointTwo=pointArr[1];
		id.animateLine(pointOne[0], pointOne[1], pointTwo[0], pointTwo[1], {'lineColour': lineColor, 'lineWidth': lineWidth, 'duration':duration, 'draw': draw, 'stop': function() { drawPoints(pointArr.slice(2)); }});
	}
	if(start)
		start();
	drawPoints(pointArr);
}
function initCircle(id,x,y,r,lineColor,lineWidth,interval,totalTime,fill,fillColor,start,draw,stop)
{
	if(!interval)
		interval=100;
	if(!totalTime)
		totalTime=1
	var canvasId=id;
	var context=canvasId.getContext('2d');
	
	var data=[];
	var i=0;
	for(i=0;i<=interval;i++)
	{
		data[i]=i*(2*Math.PI/interval);
	}
	if(start)
		start();
	if(fill==="fillBefore")
	{
		context.beginPath();
		if(fillColor)
			context.fillStyle=fillColor;
		context.arc(x,y,r,0,2*Math.PI);
		context.fill();
		context.closePath();
	}
	
	context.beginPath();
	if(lineColor)
		context.strokeStyle=lineColor;
	if(lineWidth)
		context.lineWidth=lineWidth;
	else
		lineWidth=1;
	i=0;
	var length=data.length;
	var pid = setInterval(function() {
		context.arc(x,y,r,data[i],data[i+1]);
		context.stroke();
		if(draw)
			draw();
		if(i++===length)
		{
			context.closePath();
			clearInterval(pid);
			if(fill==="fillAfter")
			{
				context.beginPath();
				if(fillColor)
					context.fillStyle=fillColor;
				context.arc(x,y,r-(lineWidth/2),0,2*Math.PI);
				context.fill();
				context.closePath();
			}
			if(stop)
			{
				stop();
			}
		}
	}, (1000*totalTime/interval));
}
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