const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fetch = require('node-fetch');

app.set('view engine', 'hbs');

app.use(bodyParser.json());


let storage = {
    students : {
      157 : {
        id: 157,
        firstName: 'Justin',
        lastName: 'Bieber',
        dateOfBirth: '01-03-1994'
      },
      158 : {
        id: 158,
        firstName: 'Adele',
        lastName: 'Smith',
        dateOfBirth: '01-03-1988'
      },
    }
};


function getStudents( storage ){
    return storage.students;
}

function getStudentById( storage, studentId ){
    return storage.students[studentId];
}

function insertStudent (storage, newStudent){
  let clonedStorage = {...storage};
  let studentIds = Object.keys(clonedStorage.students);
  let newId = Math.max(...studentIds) + 1;
  newStudent["id"] = newId;
  clonedStorage.students[newId] = newStudent;
  return clonedStorage.students;
}

function updateStudent( storage, studentId, updateStudentInfo){
  let clonedStorage = {...storage};
  clonedStorage.students[studentId] = updateStudentInfo;
  return clonedStorage.students[studentId];
}

function patchStudent( storage, studentId, updateStudentInfo){
  let clonedStorage = {...storage};
  const studentToPatch = clonedStorage.students[studentId];
  let studentKeys = Object.keys(studentToPatch);
  studentKeys.forEach(function(key) {
    if (updateStudentInfo[key] !== undefined ) {
      studentToPatch[key] = updateStudentInfo[key];
    }
  });
  return clonedStorage.students[studentId];
}

function deleteStudent(storage, studentId) {
  let clonedStorage = {...storage};
  delete clonedStorage.students[studentId];
  console.log(clonedStorage);
  return clonedStorage;
}



app.get('/students', function(req, res){
  const students = getStudents(storage);
  res.json(students);
});

app.get('/students/:studentId', function(req, res){
  const student = getStudentById(storage, req.params.studentId);

  if(student){
    res.json(student);
  }
  else{
    res.status(404).json({error: 'student not found'});
  }
});

app.post('/students', function(req, res){
  const updatedStorage = insertStudent(storage, req.body);
  res.send(updatedStorage);
});

app.put('/students/:studentId', function(req, res){
  const updatedStudent = updateStudent(storage, req.params.studentId, req.body)
  res.send(updateStudent);
});

// app.patch('/students/:studentId', function(req, res){
//   res.send(patchStudent(storage, req.params.studentId, req.body));
// });


app.patch('/students/:studentId', function(req, res){
  const student = getStudentById(storage, req.params.studentId);
  if (student) {
    res.send(patchStudent(storage, req.params.studentId, req.body));
  }
  else{
    res.status(404).json({error: 'no Bieber'});
  }
});



app.delete('/students/:studentId', function(req, res){
  // const remainingStudents = deleteStudent(storage, req.params.studentId);
  // res.send(remainingStudents);
  storage = deleteStudent(storage, req.params.studentId);
  res.send(storage);
});

app.listen(8080, function(){ // Set app to listen for requests on port 3000
    console.log('Listening on port 8080!'); // Output message to indicate server is listening
});


module.exports = {getStudents, getStudentById, insertStudent, updateStudent, patchStudent, deleteStudent};
