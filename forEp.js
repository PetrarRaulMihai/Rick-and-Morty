
let buttonEp = document.querySelector('#getEp');

buttonEp.addEventListener('click', async () => {   
  
  // this function clears previous th with the actual th for results'
  createTheadEp();
    
    // clear the tbody of content in order to insert the new one 
    document.querySelector('tbody').innerHTML = '';   

    let userInput = document.querySelector('#userInputEp').value;
    
    // condition fo which funtion to acces depending if ID was introduced or not 
    if(userInput == ''){
        await getAllEp();
    }else{
        await getByIdEp(userInput);
    }
      
});

// GET CHARACTERS FUNCTIONS //
async function getAllEp(){
   try{
        let url = 'https://rickandmortyapi.com/api/episode';
        let fetchUrl = await fetch(url);
        let data = await fetchUrl.json();
        let arrData = data.results;
        arrData.forEach(element => {
            // insert row function call for each element from array        
            insertRows(element.id, element.name, element.air_date, element.episode, element.url, element.created);
        })
   }
   catch(e){alert('Error occured in fetch data API')}
}

// GET CHARACTERS FUNCTIONS BY ID //
async function getByIdEp(input){
    try{
        let url = `https://rickandmortyapi.com/api/episode/${input}`;
        let fetchUrl = await fetch(url);
        let data = await fetchUrl.json();   
        console.log(data)
        // insert row function call for each element from array        
        insertRows(data.id, data.name, data.air_date, data.episode, data.url, data.created);   
    }
    catch(e){alert('Error occured in fetch data API')}
}



// INSERT ROW DATA FUNCTION //
function insertRows(id, name, date, episode, url, created){       

    // create row elements    
    let tbody = document.querySelector('tbody');
    let tr = document.createElement('tr');     
    let tdId = document.createElement('td');
    let tdName = document.createElement('td');
    let tdDate = document.createElement('td');
    let tdEpisode = document.createElement('td');
    let tdUrl = document.createElement('td');
    let tdCreated = document.createElement('td');    

    // assign value to each td
    tdId.textContent = id;
    tdName.textContent = name;
    tdDate.textContent = date;
    tdEpisode.textContent = episode;
    tdUrl.textContent = url; 
    tdCreated.textContent = created;

    // newly created tr's adding colors if odd or even
    if(id%2 == 1){
        tr.style.backgroundColor = 'rgba(16, 13, 34, 0.7)';
    }else{
        tr.style.backgroundColor = 'rgba(10, 20, 65, 0.7)';
    }
    
    // append created
    tbody.appendChild(tr);   
    tr.append(tdId, tdName, tdDate, tdEpisode, tdUrl, tdCreated);     
}


// THEAD ROW //
// create table head row elements in body //
function createTheadEp(){
    let theadEp = document.querySelector('thead');
    theadEp.innerHTML = '';

    let tr = document.createElement('tr');
    let thId = document.createElement('th');
    let thName = document.createElement('th');
    let thAirDate = document.createElement('th');
    let thEpisode = document.createElement('th');
    let thUrl = document.createElement('th');
    let thCreated = document.createElement('th');

    thId.textContent = 'ID';
    thName.textContent = 'Name';
    thAirDate.textContent = 'Air Date';
    thEpisode.textContent = 'Episode';
    thUrl.textContent = 'URL';
    thCreated.textContent = 'Created';

    theadEp.appendChild(tr);
    tr.append(thId, thName, thAirDate, thEpisode, thUrl, thCreated);
}
  