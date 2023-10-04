let diceIcon = document.querySelector("#dice-icon");
let adviceId = document.querySelector("#advice-id");
let adviceText = document.querySelector("#advice-text");

//  custom our fetching error when promise not ok (404)

class FetchErrorNotOk extends Error{
    constructor(message){
        super(message);
        this.name = "fetchErrorNotOk"
    }
}


// loader to be more comfortable and efficient for fetching data


function showLoder (){
    adviceId.innerHTML = ``;
    adviceText.innerHTML = ``;
    document.querySelector(".advice-text").classList.add("load");
    document.querySelector(".advice-num").classList.add("load");
}

function hideLoder (){
    document.querySelector(".advice-text").classList.remove("load");
    document.querySelector(".advice-num").classList.remove("load");
}


// custom the DOM when request is done

let displayAdvice = async function(obj){
    let {slip:{id,advice}} = obj;

    hideLoder();

    adviceId.innerHTML = `Advice #<span>${id}<span>`;
    adviceText.innerHTML = `&ldquo;${advice}&rdquo;`;
}

// process for fetching the url

let getAdvice = async function(){
    const url = "https://api.adviceslip.com/advice";

    let promise = await fetch(url);

    if(!promise.ok){
        throw new FetchErrorNotOk("can't reach , please try again")
    }

    let response = await promise.json();

    await displayAdvice(response)
}

// in case of error display Error will run

let displayError = function (error){
    showLoder();

    document.querySelector(".err-box").classList.add("show")
    document.querySelector("#error").innerHTML = error


    setTimeout(()=>{
        document.querySelector(".err-box").classList.remove("show")
    },2000)
}


let runAdvice = async function(){
    try{
        getAdvice();
    }catch (err){
        if (err instanceof FetchErrorNotOk){
            displayError(err)
        }else{
            showLoder();
            displayError("somthing wrong , please wait");
        }
    }
}

window.onload = ()=>{
    showLoder();
    runAdvice();
}

diceIcon.onclick = ()=>{

    // show the loader untill fetching request
    showLoder();

    //setTimeout done to wait for the fetch to process 
    setTimeout(()=>{
        runAdvice();
    },1500)

}

