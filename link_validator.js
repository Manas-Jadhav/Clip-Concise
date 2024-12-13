const sum_btn = document.getElementById("search-button");
const search_bar = document.getElementById("search-bar");
sum_btn.disabled = true;
search_bar.addEventListener("input", () => {
    
	let videoId = null;
	const link = search_bar.value;

	// Regular expression pattern to match YouTube video URLs
	let pattern = /(?:youtu\.be\/|watch\?v=|\/videos\/|embed\/)([^#\&\?\n]+)(?:\?[^#\&\n]*)?/;

	// Match the pattern against the input URL
	let match = link.match(pattern);

	// Check if the URL contains a valid video ID
	if (match) {
		sum_btn.disabled = false;
		videoId = match[1];
        document.getElementById("videoid").value = videoId;
		search_bar.style.border = "2px green solid";
		const ytApiKey = 'API KEY';
		$.get(
			"https://www.googleapis.com/youtube/v3/videos?part=snippet&id=" +
				videoId +
				"&key=" +
				ytApiKey,
			function (data) {
				var t = data.items[0].snippet.title;
                document.getElementById("title").value = t;
			}
		);
	} else {
		sum_btn.disabled = true;
		search_bar.style.border = "2px red solid";
	}
});
