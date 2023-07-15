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
        data.push({details:inputBox.value,id:id});
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
        li.innerHTML = "Details: " + data[i].details + "  " + "Id: "+data[i].id;
        li.className = data[i].id;
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
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


// Api call to push data into the array
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