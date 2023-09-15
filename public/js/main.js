const update = async ()=>{

    let students = await fetch("/students")
    .then(response => response.json())
    .then(data => {
        return data
    }).catch(err =>{
        console.warn(err)
        return []
    })

    return students
}

const renderStudents = (array)=>{
    let html = ""
    for(let i in array){
        html+=
        `
        <div class="card" style="width: 100%;">
            <div class="card-body" group=${array[i].group}>
              ${array[i].name}
            </div>
        </div>
        `
    }
    // console.log(html)
    document.getElementById("students").innerHTML = html
}

document.addEventListener("DOMContentLoaded", ()=>{
    document.querySelector("[btn]").addEventListener("click", ()=>{
        update().then(data=>{
            console.table(data)
            renderStudents(data)
            AlertEventListeners();
        })
    })
})

function AlertEventListeners(){
    document.querySelectorAll(".card").forEach(element => {
        element.addEventListener("click", (event)=>{
            alert(event.target.textContent.trim() + ' - ' + event.target.getAttribute('group'));
        })
    })
}