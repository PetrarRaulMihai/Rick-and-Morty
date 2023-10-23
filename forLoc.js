
let buttonLoc = document.querySelector('#getLoc');

buttonLoc.addEventListener('click', async () => {   
  
  // this function clears previous th with the actual th for results'
  createTheadLoc();
    
    // clear the tbody of content in order to insert the new one 
    document.querySelector('tbody').innerHTML = '';   

    let userInput = document.querySelector('#userInputLoc').value;
    
    // condition fo which funtion to acces depending if ID was introduced or not 
    if(userInput == ''){
        await getAllLoc();
    }else{
        await getByIdLoc(userInput);
    }
      
});

// GET CHARACTERS FUNCTIONS //
async function getAllLoc(){
    try{
        let url = 'https://rickandmortyapi.com/api/location';
        let fetchUrl = await fetch(url);
        let data = await fetchUrl.json();
        let arrData = data.results;
        arrData.forEach(element => {
        // insert row function call for each element from array        
            insertRows(element.id, element.name, element.type, element.dimension, element.url, element.created);
        })
    }
    catch(e){alert('Data fetch API failed')}
}

// GET CHARACTERS FUNCTIONS BY ID //
async function getByIdLoc(input){
    try{
        let url = `https://rickandmortyapi.com/api/location/${input}`;
        let fetchUrl = await fetch(url);
        let data = await fetchUrl.json();   
        console.log(data)
        // insert row function call for each element from array        
        insertRows(data.id, data.name, data.type, data.dimension, data.url, data.created);  
    } 
    catch(e){alert('Error occured in data fetch API')}
}



// INSERT ROW DATA FUNCTION //
function insertRows(id, name, type, dimension, url, created){       

    // create row elements    
    let tbody = document.querySelector('tbody');
    let tr = document.createElement('tr');     
    let tdId = document.createElement('td');
    let tdName = document.createElement('td');
    let tdType = document.createElement('td');
    let tdDimension = document.createElement('td');
    let tdUrl = document.createElement('td');
    let tdCreated = document.createElement('td');    

    // assign value to each td
    tdId.textContent = id;
    tdName.textContent = name;
    tdType.textContent = type;
    tdDimension.textContent = dimension;
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
    tr.append(tdId, tdName, tdType, tdDimension, tdUrl, tdCreated);     
}


// THEAD ROW //
// create table head row elements in body //
function createTheadLoc(){
    let theadLoc = document.querySelector('thead');
    theadLoc.innerHTML = '';

    let tr = document.createElement('tr');
    let thId = document.createElement('th');
    let thName = document.createElement('th');
    let thType = document.createElement('th');
    let thDimension = document.createElement('th');
    let thUrl = document.createElement('th');
    let thCreated = document.createElement('th');

    thId.textContent = 'ID';
    thName.textContent = 'Name';
    thType.textContent = 'Type';
    thDimension.textContent = 'Dimension';
    thUrl.textContent = 'URL';
    thCreated.textContent = 'Created';

    theadLoc.appendChild(tr);
    tr.append(thId, thName, thType, thDimension, thUrl, thCreated);
}
  