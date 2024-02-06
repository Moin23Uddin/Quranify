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