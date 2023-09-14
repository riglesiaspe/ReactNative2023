export default class SingFyClient
{
static API_KEY = '1a2f1d1067msh5644e4a62fc5ab9p1d3418jsn29918b48d2f2';
static BASE_URL = 'https://spotify23.p.rapidapi.com';
static ID_URL = '37i9dQZF1DX4Wsb4d7NKfP';
//static API_KEY = 'fc2849cc17425442e036dea3a6c48bde';
//static BASE_URL = 'https://api.themoviedb.org/3';


async getTracks()
{
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '1a2f1d1067msh5644e4a62fc5ab9p1d3418jsn29918b48d2f2',
            'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
        }
    };
    
    let url = fetch('https://spotify23.p.rapidapi.com/playlist_tracks/?id=37i9dQZF1DX4Wsb4d7NKfP&offset=0&limit=100', options);
        //.then(response => response.json())
        //.then(response => console.log(response))
       // .catch(err => console.error(err));
   
    //console.log(url);  
    const response = await url;
    const responseJSON = await response.json();

    // alert(JSON.stringify(response));
    // console.log(JSON.stringify(response));
    // alert(JSON.stringify(responseJSON)); 
    // console.log(JSON.stringify(responseJSON)); 

    return{
        resultTracks: responseJSON.items,  
        //numberOfPages: responseJSON.total_pages,
    };
}



// getTrackDetails(trackID){
//     //clase 6 hora y 25 minutos
//     //creo que se hara en otra clase diferente
// }

// getTracksTop20(){
//     //como el primero pero sacando los que tengan un ranking por debajo de 20
// }


//aqui hare uno para playlist pero si puedo asyn mejor
/*
async getPopularMovies(page)
{
    let url = `${SingFyClient.BASE_URL}/movie/popular?page=${page}&api_key=${SingFyClient.API_KEY}`;
    console.log(url);
    const response = await fetch(url);
    const responseJSON = await response.json();
    //alert(JSON.stringify(responseJSON));
    return{
        resultMovies: responseJSON.results,
        numberOfPages: responseJSON.total_pages,
    };
}
*/


}