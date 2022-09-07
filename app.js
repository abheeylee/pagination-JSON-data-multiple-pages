/*const url = 'https://randomuser.me/api/?results=50';
fetch(url)
.then(rep => rep.json())
.then(data => {
    data.results.forEach(element => {
        console.log(element)
    });
});
*/

const url = 'https://script.google.com/macros/s/AKfycbzA9ZdLwhwicQUyoITsJnhheoCaS4xzJSX5WFLnTYPlFiSyrxvynNRJ/exec';

let page = {};
document.addEventListener('DOMContentLoaded', init);



function init(){
    page.currentPage = 1;
    page.output = document.querySelector('.output')
    page.pagin = document.querySelector('.pagin')
    getDataVals()
    //console.log(page.output);
}

function getDataVals(){
    page.output.innerHTML = ''
    getContents()
}


function getContents(pageVal){
    const tempURL = !pageVal ? url : url + '?page=' + pageVal
    page.currentPage = !pageVal ? 1 : pageVal;
    console.log(tempURL)
    page.output.innerHTML = 'loading....'
    fetch(tempURL).then((response) => response.json()).then((data) =>{
        console.log(data)
        page.output.innerHTML = `<h1 class="h1">page #${page.currentPage}</h1>`;
        addContent(data.data);
        data.pages.total = data.total
        addPages(data.pages);
        //document.write(JSON.stringify(data));
    });
};

function addPages(data){
    console.log(data);
    page.pagin.innerHTML = '';
    const div =  elMaker(page.pagin, 'main', 'div');
    const firstBtn = elMaker(div, 'btn', 'button');
    firstBtn.textContent = 'first'
    firstBtn.addEventListener('click',(e) =>{
        getContents(1)
    })
    const prevBtn = elMaker(div, 'btn', 'button');
    
    prevBtn.textContent = 'prev';
    if(data.previous!=null){
        prevBtn.classList.remove('mute');
        prevBtn.disabled =false;
        
        prevBtn.addEventListener('click', (e) => {
            getContents(data.previous)
        //console.log('move to'+ data.previous);
    })
}else{
        prevBtn.classList.add('mute');
        prevBtn.style.disabled =true;
    }

    // add more buttons
    let start = page.currentPage - 3;   
    for(let i=start; i<start+7;i++){
        console.log(i)
        if(i>=1 && i <= data.total){
            const curBtn = elMaker(div, 'btn', 'button');
            curBtn.textContent = i;
            curBtn.addEventListener('click', (e) =>{
                getContents(i)

            })
            if(i== page.currentPage){
                curBtn.classList.add('active')
            }
        }
        
    }


    
    
    
    
    
    
    
    
    
    const nextBtn = elMaker(div, 'btn', 'button');
    nextBtn.textContent = 'next'
    
    if (data.next != null) {
        nextBtn.classList.remove('mute');
        nextBtn.disabled = false;
        nextBtn.addEventListener('click', (e) => {
            getContents(data.next )
            console.log('move to ' + data.next);
        
        })
    }
else{
        nextBtn.classList.add('mute');
        nextBtn.disabled = true;
    }
    const lastBtn = elMaker(div, 'btn', 'button');
    lastBtn.textContent = 'last'
    lastBtn.addEventListener('click',(e) =>{
        getContents(data.total)
    })
}


function elMaker(parent, classAdd, element){
    const temp = document.createElement(element);
    parent.append(temp)
    temp.classList.add(classAdd);
    return temp;
}



function addContent (arr){
    arr.forEach(el => {
        const div = document.createElement('div');
        div.innerHTML = `
            <h3>${el.title}</h3>
            <div class="posted">
            <p>${el.content}</p>
            </div>
            <small>${el.author}</small>
            </div>
        `
        page.output.append(div);
        
        //console.log(el)
    });
};
