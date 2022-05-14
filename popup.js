
chrome.storage.local.get("song_title", function(result) {
    document.getElementById('title').innerText = result.song_title;
});
chrome.storage.local.get("artist_list", function(result) {
    document.getElementById('artist').innerText = result.artist_list;
});
