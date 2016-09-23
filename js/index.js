$(document).ready(function() {
	var Streamer = {
		name: '',
		status: '',
		game: '',
		viewers: ''
	},
		streamers = [],
		streamNames= ['ESL_SC2', 'OgamingSC2', 'cretetion', 'freecodecamp', 'storbeck', 'habathcx', 'RobotCaleb', 'noobs2ninjas', 'sjow', 'brunofin'],
		len = streamNames.length;
	function call(name, i) {
		$.ajax({
			type: 'GET',
			url: 'https://api.twitch.tv/kraken/streams/' + name,
			headers: {
				'Client-ID': 'amycsbs4rb3ulsbu7f8djykugyvq50b'
			},
			success: function(data){
				process(data, i);
			},
			error: function(data) {
				process(data, i);
			}
		});
	}
	function process(data, i) {
		console.log(data);
		if (!data._links) {
			streamers[i].status = 'Unavailable channel';
		} else if (!data.stream) {
			streamers[i].status = 'Offline';
		} else {
			streamers[i].status = data.stream.channel.status;
			streamers[i].game = data.stream.channel.game;
			streamers[i].viewers = data.stream.viewers;
		}
		var tabl = $('table tr').eq(i + 1);
		tabl.children().eq(0).html('<a href="http://www.twitch.tv/' + streamers[i].name + '">'  + streamers[i].name + '</a>');
		tabl.children().eq(1).text(streamers[i].status);
		tabl.children().eq(2).text(streamers[i].game);
		tabl.children().eq(3).text(streamers[i].viewers);
		if (streamers[i].status === 'Offline') {
			tabl.css('backgroundColor', 'lightblue');
		} else if (streamers[i].status === 'Unavailable channel') {
			tabl.css('backgroundColor', 'lightgray');
		} else {
			tabl.css('backgroundColor', 'lightgreen')
		}
	}
	for (var i = 0; i < len; i++) {
		$('table').append('<tr> <td> </td> <td> </td> <td> </td> <td> </td> </tr>');
		streamers[i] = Object.create(Streamer);
		streamers[i].name = streamNames[i];
		call(streamNames[i], i);    
	}
	$('#online').click(function() {
		$('#online').addClass('active');
		$('#all').removeClass('active');
		$('#offline').removeClass('active');
		$('body').css('backgroundColor', '#265');
		$('.btn').css('color', '#265');
		for (var i = 0; i < len; i++) {
			var tabl = $('table tr').eq(i + 1);
			if (streamers[i].status == 'Offline' || streamers[i].status == 'Unavailable channel') {
				tabl.css('display', 'none');
			} else {
				tabl.css('display', '');
			}
		}
	});
	$('#offline').click(function() {
		$('#offline').addClass('active');
		$('#all').removeClass('active');
		$('#online').removeClass('active');
		$('body').css('backgroundColor', '#777');
		$('.btn').css('color', '#777');
		for (var i = 0; i < len; i++) {
			var tabl = $('table tr').eq(i + 1);
			if (streamers[i].status == 'Offline') {
				tabl.css('display', '');
			} else {
				tabl.css('display', 'none');
			}
		}
	});
	$('#all').click(function() {
		$('#all').addClass('active');
		$('#offline').removeClass('active');
		$('#online').removeClass('active');
		$('body').css('backgroundColor', '#833');
		$('.btn').css('color', '#833');
		for (var i = 0; i < len; i++) {
			$('table tr').eq(i + 1).css('display', '');
		}
	});
});