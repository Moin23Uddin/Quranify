console.log('Lets write JavaScript');

// async function main(){
//     let a= await fetch("http://127.0.0.1:5500/songs/")
//     let response= await a.text();
//     console.log(response)

// }
// main()
async function getsongs() {
    let response = await fetch("http://127.0.0.1:5500/songs/");
    let htmlContent = await response.text();

    // Create a temporary container to parse the HTML content
    let tempContainer = document.createElement('div');
    tempContainer.innerHTML = htmlContent;
    let songs = []
    // Extract song links from anchor tags
    let as = tempContainer.getElementsByTagName('a');
    console.log(as)
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split("/songs/")[1])
        }
        // Log or process the song links as needed
        // songLinks.forEach(link => {
        //   console.log(link.href);
        // });
    }
    return songs
}

async function main() {
    let songs = await getsongs()
    console.log(songs)
    let surah = document.querySelector(".songList").getElementsByTagName("ul")[0]

    for (const song of songs) {
        // Decode percent-encoded characters and keep only alphabets and spaces
        let cleanedSong = decodeURIComponent(song.replace(/%([0-9A-Fa-f]{2})/g, (_, p1) => String.fromCharCode(parseInt(p1, 16))))
            .replace(/[^a-zA-Z\s]/g, '') // Keep only alphabets and spaces
            .replace(/\bMP3\b/g, '') // Remove "MP3" word
            .replace(/\bmpkmp\b/gi, ''); // Remove "mpkmp" word in a case-insensitive manner

        // Add the cleaned song to the list
        cleanedSong = cleanedSong.replace(/MPKmp/gi, '');
        cleanedSong = cleanedSong.replace(/(\S+)\s*$/, '$1.');
        surah.innerHTML = surah.innerHTML + ` <li class="listbhai flex justify-between gap-[10px] hover:cursor-pointer py-3 px-3 my-3 border-[1px] rounded-[5px] border-gray-600 text-[15px] ">
                            <img class="invert" src="img/music.svg" alt="">
                            <div class="info">

                                <div> ${cleanedSong}</div>
                                <div>Moin</div>

                            </div>
                            <div class="playnow flex justify-center items-center">
                                <span class="spanbhai text-[16px] width-[60px] p-3">Play Now</span>
                                <img class="invert" src="img/play.svg" alt="">
                            </div>
                        
        
       </li>`;
    }
    console.log(surah.innerHTML)
    var audio = new Audio(songs[0]);
    // audio.play();
}
main()
