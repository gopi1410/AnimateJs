/****************************************************************************
PARAMETERS: lineWidth, lineColour, duration, start, draw, stop

*****************************************************************************/

HTMLCanvasElement.prototype.animateLines=function(pointArr,params) {
	if(params)
		initLines(this,pointArr,params.lineColour,params.lineWidth,params.duration,params.start,params.draw,params.stop);
	else
		initLines(this,pointArr);
};

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