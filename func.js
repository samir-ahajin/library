let myLibrary =[];
let bookCollection = document.querySelector('.books');
let myForm = document.querySelector('form');

function Book(){
    this.bookNumber;
    this.title;
    this.author;
    this.pages;
    this.read;
}



function addBookToLibrary(){
    let bAuthor = document.getElementById('author').value;
    let bTitle = document.getElementById('title').value;
    let bPages= document.getElementById('pages').value;
    let bRead = document.querySelector('.checkBox:checked').value;
    let cBook= new Book();
    cBook.bookNumber = myLibrary.length+1;
    cBook.title = bTitle;
    cBook.author =bAuthor;
    cBook.pages = bPages;
    cBook.read = bRead;
    myLibrary.push(cBook);
    //getting the value inside the array myLibrary[arrayvalue].key
    displayBook(cBook)
    //myForm.reset();//reset the input field
}

function disableOther(c){//disable other checkbox if the other is checked
    let check = document.querySelectorAll('.checkBox');
    for(let a = 0,b;b = check[a];a++ ){
        b.disabled = !(!c.checked || b === c);
    } 
}
let buttonVal = 1;
function displayBook(curBook){
    let cardVal = document.createElement("div");
    let remove = document.createElement("button"); 
    //add details in card
    let stat = ['Title', 'Author','Pages']
    let counter = 0;
    for(const key in curBook){
        let item = document.createElement("div"); 
        if(`${key}`== "bookNumber"){
            console.log("hello");
            continue;
        }else if(['read','notyet'].includes(`${curBook[key]}`)){
            let buttonRead = document.createElement('button'); 
            buttonRead.classList.add("read"); 
            //buttonRead.setAttribute("id",buttonVal);
            let word;
            `${curBook[key]}`=='read'? word = "Already Read":word = "Didn\'t Read Yet";
            buttonRead.textContent = word;
            cardVal.appendChild(buttonRead);
        }else{
        item.textContent = `${stat[counter]} : ${curBook[key]}`;
        cardVal.appendChild(item);
        }
        counter++;
    } 
    remove.textContent = "Remove";
    remove.classList.add("remove");
    remove.setAttribute("id",buttonVal); 
    cardVal.appendChild(remove);
    cardVal.classList.add('card');
    cardVal.setAttribute("id","card"+buttonVal); 
    bookCollection.appendChild(cardVal);
    buttonVal++;
}

let addBook = document.getElementById('addBook');
let closeModal = document.querySelector('.closebtn');
let openModal = document.querySelector('.open');
let modal = document.getElementById('modal');


addBook.addEventListener('click',addBookToLibrary);
openModal.addEventListener('click',function(){
    modal.style.display = 'block';
})
closeModal.addEventListener('click',function(){
    modal.style.display = 'none';
})

window.addEventListener('click',function(e){


    if(e.target == modal){
        modal.style.display = 'none';
    }else if(e.target.classList.value == 'read'){
        //use below if e doesnt work
        //let button = document.querySelector(`.read[id = "${e.target.id}"]`);
        e.target.textContent == "Already Read"?e.target.textContent = "Didn\'t Read Yet":e.target.textContent = "Already Read";     
    }else if(e.target.classList.value == 'remove'){
        let curCard = document.querySelector(`[id=card${e.target.id}]`)
        myLibrary.splice(myLibrary.findIndex(a=>a.bookNumber == e.target.id),1);
        bookCollection.removeChild(curCard);
        console.log(myLibrary);
        console.log(bookCollection);

       
    }
    
})

