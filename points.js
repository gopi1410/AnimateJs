/****************************************************************************
PARAMETERS: lineWidth, lineColour, duration, start, draw, stop

*****************************************************************************/

HTMLCanvasElement.prototype.animatePoints=function(pointArr,params) {
	if(params)
		initPoints(this,pointArr,params.lineColour,params.lineWidth,params.duration,params.start,params.draw,params.stop);
	else
		initPoints(this,pointArr);
};

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