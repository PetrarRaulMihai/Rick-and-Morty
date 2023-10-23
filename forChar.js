
let buttonChar = document.querySelector('#getChar');

buttonChar.addEventListener('click', () => { 

    // this function clears previous th with the actual th for results'
    createTheadChar();
    
    // clear the tbody of content in order to insert the new one
    document.querySelector('tbody').innerHTML = '';    

    let userInput = document.querySelector('#userInputChar').value;
    
    // condition fo which funtion to acces depending if ID was introduced or not 
    if(userInput == ''){
        getAllChars();
    }else{
        getByIdChar(userInput);
    }
      
});

// GET CHARACTERS FUNCTIONS //
async function getAllChars(){
   try{
        let url = 'https://rickandmortyapi.com/api/character';
        let fetchUrl = await fetch(url);
        let data = await fetchUrl.json();
        let arrData = data.results;
        arrData.forEach(element => {
            // insert row function call for each element from array        
            insertRows(element.id, element.name, element.gender, element.status, element.species, element.type);
        })
   }
   catch(e){alert('Error occured in data fetch API')}
}

// GET CHARACTERS FUNCTIONS BY ID //
async function getByIdChar(input){
    try{
        let url = `https://rickandmortyapi.com/api/character/${input}`;
        let fetchUrl = await fetch(url);
        let data = await fetchUrl.json();   
        console.log(data)
        // insert row function call for each element from array        
        insertRows(data.id, data.name, data.gender, data.status, data.species, data.type);
    }   
    catch(e){alert('Error occured in data fetch API')}
}

// INSERT ROW DATA FUNCTION //
function insertRows(id, name, gender, status, species, type){      

    // create row elements    
    let tbody = document.querySelector('tbody');
    let tr = document.createElement('tr');     
    let tdId = document.createElement('td');
    let tdName = document.createElement('td');
    let tdGender = document.createElement('td');
    let tdStatus = document.createElement('td');
    let tdSpecies = document.createElement('td');
    let tdType = document.createElement('td');    

    // assign value to each td
    tdId.textContent = id;
    tdName.textContent = name;
    tdGender.textContent = gender;
    tdStatus.textContent = status;
    tdSpecies.textContent = species; 
    if(type === ''){
        tdType.textContent = 'UNKNOWN';
    }else{
        tdType.textContent = type; 
    }   

    // newly created tr's adding colors if odd or even
    if(id%2 == 1){
        tr.style.backgroundColor = 'rgba(16, 13, 34, 0.7)';
    }else{
        tr.style.backgroundColor = 'rgba(10, 20, 65, 0.7)';
    }
    
    // append created
    tbody.appendChild(tr);   
    tr.append(tdId, tdName, tdGender, tdStatus, tdSpecies, tdType);     
}

//  THEAD ROW //
// create table head row elements in body //
function createTheadChar(){
    let theadChar = document.querySelector('thead');
    theadChar.innerHTML = '';
    
    let tr = document.createElement('tr');
    let thId = document.createElement('th');
    let thName = document.createElement('th');
    let thGender = document.createElement('th');
    let thStatus = document.createElement('th');
    let thSpecies = document.createElement('th');
    let thType = document.createElement('th');

    thId.textContent = "ID"
    thName.textContent = "Name"
    thGender.textContent = "Gender"
    thStatus.textContent = "Status"
    thSpecies.textContent = "Species"
    thType.textContent ="Type" 

    theadChar.appendChild(tr);
    tr.append(thId, thName, thGender, thStatus, thSpecies, thType);
}
