$(document).ready(init); 

function init(){
  console.log("here");
  var tasks = getTasks();
  console.log("tasks: " , tasks);
  renderTasks(tasks);
  console.log(tasks);

  $('.addNewTask').on('click', newTask);
  $('.submitTask').on('click', submitTask);
  $('.Done').on('click', taskCheck);
  $('.toDoList').on('click', '#delete', deleteTask);
  $('.toDoList').on('click', '#edit', editTask);
  $('.newTask').on('click', '.editTask', submitEdit);
  $('.cancelTask').on('click', cancelTask);
  $('.cancelAddTask').on('click', cancelTask);
  $('#deleteAll').on('click', deleteAllTasks);

  //$('.toDoList').on('checked', '.Done', taskDone);
  $('.cancelAddTask').hide();
  $('#deleteAllCompleted').on('click', deleteAllCompleted);

}

function newTask(){
  $('.newTask').show();
  $('.editTask').hide();
  $('.cancelTask').hide();
  $('.cancelAddTask').show();
}

function submitTask(){
  $('.newTask').hide();
  var description = $('.descriptionInput').val();
  $('.descriptionInput').val('');
  var date = $('.dueDateInput').val();
  $('.dueDateInput').val('');
  var done = false;
  var task = {description, date, done};
  var tasks = getTasks(); // read, parse
  tasks.push(task);
  writeTasks(tasks);
  //var ntasks = getTasks();
  renderTasks(tasks);
}

function getTasks(){
  var taskStr = localStorage.tasks;
  try{
    var tasks = JSON.parse(taskStr); 
  }
  catch(err){
    var tasks = [];
  }
  console.log("tasks at try catch: ", tasks);
  return tasks;

}

//write to storage
function writeTasks(tasks){
  var taskStr = JSON.stringify(tasks);
  localStorage.tasks = taskStr;
}


function renderTasks(tasks){
 console.log("tasks: " , tasks[0]);
 var $lis = tasks.map(task => {
  var $li = $('.template').clone(); 
  desc = task['description'];
  dte = task['date'];
  dne = task['done'];
  console.log("done ar render:?" ,dne);
  $li.find('.Description').text(desc);
  $li.find('.Date').text(dte);
  $li.find('.Done').prop('checked', dne);
  $li.removeClass('template');
  return $li;
 });
  $('.toDoList').empty().append($lis);

}

//set data to true
function taskCheck(){
  console.log("HERE");
  var tasks = getTasks();
  var index = ($(this).parent().parent().parent().parent().index());
  var task = tasks[index];
  task['done'] = ($(this).prop( "checked" ));
  writeTasks(tasks);
  var newTasks = getTasks()
  renderTasks(newTasks);
}

function deleteTask(){
  //console.log('click!');
  //cancelEdit();
  var tasks = getTasks();
  var index = $(this).parent().parent().parent().parent().index();
  console.log(tasks[index]);
  tasks.splice(index, 1);
  console.log(tasks);
  writeTasks(tasks);
  renderTasks(tasks);
}

function editTask(){
  $('.newTask').show();
  $('.editTask').show();
  $('.submitTask').hide();
  $('.cancelTask').show();
  $('.cancelAddTask').hide();
  $('.addNewTask').hide();
  console.log($(this))//.parent().parent().parent().parent())
  var description = $(this).parent().parent().parent().parent().find(".Description").text();
  var date = $(this).parent().parent().parent().parent().find(".Date").text();
  console.log(description);
  $('.descriptionInput').val(description);
  $('.dueDateInput').val(date);
  var index = $(this).parent().parent().parent().parent().index();
  //console.log("ind: " , index);
  $('.newTask').data('editIndex', index);
}

function submitEdit(){

  var description = $(this).parent().find('.descriptionInput').val();
  var date = $(this).parent().find('.dueDateInput').val();
  var index =  $('.newTask').data('editIndex');
  console.log(description);
  console.log(date);
  console.log("edit: " , index );
  var tasks = getTasks();
  console.log(tasks[index]);
  task =tasks[index];
  task['description'] = description;
  task['date'] = date;
  writeTasks(tasks);
  renderTasks(tasks);
  cancelTask();

}

function cancelTask(){
  $('.newTask').hide();
  $('.addNewTask').show();
}

function deleteAllTasks(){

  var tasks = getTasks();
  var size = tasks.length;
  console.log(size);
  tasks.splice(0,size);
  writeTasks(tasks);
  renderTasks(tasks);
  cancelTask();
}

function deleteAllCompleted(){
  var tasks = getTasks();
  var size = tasks.length;
  
  /*console.log(size);
  tasks.splice(0,size);
  writeTasks(tasks);
  renderTasks(tasks);
  cancelTask();*/
}





