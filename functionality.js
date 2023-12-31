data = [];

var id = 1;
const inputBox = document.getElementById("input-box");
const listBox = document.getElementById("list-container");


// To add new task to the list
function addTask(){
    // check no input
    if(inputBox.value==='')
    {
        alert("You need to write Task");
    }
    // push task detail to array
    else{
        data.unshift({details:inputBox.value,id:id});
        id++;
        inputBox.value = "";
        render();
    }
}


// function to show array elements on frontend
function render(){
    while(listBox.firstChild)
    {
        listBox.firstChild.remove();
    }
    for(var i=0;i<data.length;i++)
    {
        let li = document.createElement("li");
        li.innerHTML = data[i].details;
        li.className = data[i].id;
        let but = document.createElement("image");
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(but);
        li.appendChild(span);
        listBox.appendChild(li);
    };
}

// EventListener to delete 
listBox.addEventListener("click",function(e){
    if(e.target.tagName==="SPAN"){
       var id = e.target.parentElement.className;
       for(var i=0;i<data.length;i++)
       {
           if(data[i].id==id)
           {
               data.splice(i,1);
               break;
           }
       }
       render();
    }
},false);

// Add listner to edit button
listBox.addEventListener("click",function(e){
    if(e.target.tagName==="IMAGE"){
        let inpu = e.target.parentElement.textContent;
        inpu = inpu.substr(0,inpu.length-1);
        console.log(inpu);
        var row = document.getElementById("rowtwo");
        row.style.visibility = 'visible';
        var edit = document.getElementById("input");
        edit.value = inpu;
        edit.className = e.target.parentElement.className;
    }
})

// Saving changes done to task detail
function save(){
    var edit = document.getElementById("input");
    var ids = edit.className;
    var deta = edit.value;
    console.log(deta);
    for(var i=0;i<data.length;i++)
       {
           if(data[i].id==ids)
           {
               data[i].details = deta;
           }
       }
    var row = document.getElementById("rowtwo");
    row.style.visibility = 'hidden';   
    render();
}

// Api call And push response data into the array
fetch('https://jsonplaceholder.typicode.com/todos').then((response)=>{
    if(!response.ok){
        throw new Error("Request failed");
    }
    return response.json();
}).then((res)=>{
    for(var i =0;i<res.length;i++)
    {
          data.push({details:res[i].title,id:id});
          id++;
          render();
    }
}).catch((error)=>{
    console.log("Error:",error.message);    
});
