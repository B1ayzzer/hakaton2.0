let btn = $(".btn-save-modal");
let inpName = $(".text_area_title");
let inpLastName = $(".text_area_message");
let inpNum = $("#inpNum");
let list = $(".task-list");

btn.on("click", function () {
  let value = inpName.val();
  let value2 = inpLastName.val();

  if (!value.trim() || !value2.trim()) {
    alert("Заполните поле");
    return;
  }
  let newTask = {
    task: value,
    task2: value2,
  };

  postNewTask(newTask);
  inpName.val("");
  inpLastName.val("");
});

function postNewTask(task) {
  fetch("http://localhost:8000/todos", {
    method: "POST",
    body: JSON.stringify(task),
    headers: {
      "Content-type": "application/json;charset=utf-8",
    },
  }).then(() => render());
}

function render() {
  fetch("http://localhost:8000/todos")
    .then((response) => response.json())
    .then((data) => {
      list.html("");
      data.forEach((item) => {
        list.append(`
                
      
      <div id="${item.id}"  class="card border-success" style="width: 18rem">
        <div class="card-body">
          <h5 class="card-title text-center">${item.task}</h5>
          <p class="card-text">
          ${item.task2}
          </p>
          </div>
          <button class="btn-delete btn-primary ">Delete</button>
          
                `);
      });
    });
}

$("body").on("click", ".btn-delete", function (event) {
  let id = event.target.parentNode.id;
  fetch(`http://localhost:8000/todos/${id}`, {
    method: "DELETE",
  }).then(() => render());
});

render();

$('.inpSearch').on('input', function(){
    fetch("http://localhost:8000/todos")
    .then((res) => res.json())
    .then((data) => {
        data.forEach((elem) =>{
            if(
                elem.task.toUpperCase() === $('.inpSearch').val().toUpperCase() || elem.task2.toUpperCase() === $('.inpSearch').val().toUpperCase()
                
                ){
                $('.searchResult').html(`<div id="${elem.id}"  class="card border-warning" style="width: 18rem">
                <div class="card-body">
                  <h5 class="card-title text-center">${elem.task}</h5>
                  <p class="card-text">
                  ${elem.task2}
                  </p>
                  </div>`)
                
            }
        })

    })
})
render()