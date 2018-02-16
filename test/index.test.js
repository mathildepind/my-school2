const functions = require('../server.js');

const testStorage = {
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


test('getStudents', function(){
  const expected = {
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
  };

  const storage = {
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
  const result = functions.getStudents(storage);
  expect(result).toEqual(expected);
  
});


test('getStudentById', function(){
  const expected = {
    id: 158,
    firstName: 'Adele',
    lastName: 'Smith',
    dateOfBirth: '01-03-1988'
  };
  const storage = {
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
  const result = functions.getStudentById(storage, 158);
  expect(result).toEqual(expected);
})

test('insertStudent', function(){
  const expected = {
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
        159 : {
          id: 159,
          firstName: 'Newt',
          lastName: 'Bell',
          dateOfBirth: '01-03-1985'
        },
  };
  const newStudent = {
    firstName: 'Newt',
    lastName: 'Bell',
    dateOfBirth: '01-03-1985'
  };
  const result = functions.insertStudent(testStorage, {firstName: 'Newt',lastName: 'Bell',dateOfBirth: '01-03-1985'});
  expect(result).toEqual(expected);
})

test('update student', function(){
  const expected = {
          id: 158,
          firstName: 'Adele',
          lastName: 'Foster',
          dateOfBirth: '01-03-1988'
        };
  const updatedStudent = {
    id: 158,
    firstName: 'Adele',
    lastName: 'Foster',
    dateOfBirth: '01-03-1988'
  };

  const result = functions.updateStudent(testStorage, 158, updatedStudent);
  expect(result).toEqual(expected);
})

test('patchStudent', function() {
  const expected = {
    id: 158,
    firstName: 'Adele',
    lastName: 'Nichols',
    dateOfBirth: '01-03-1988'
  };
  const updateInfo = {lastName:"Nichols"};
  const result = functions.patchStudent(testStorage, 158, updateInfo);
  expect(result).toEqual(expected);
})

test('deleteStudent', function(){
  const testDeleteStorage = {
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
  const expected = { students:
   { '158':
      { id: 158,
        firstName: 'Adele',
        lastName: 'Smith',
        dateOfBirth: '01-03-1988' } } };
  const result = functions.deleteStudent(testDeleteStorage, 157);
  console.log(testDeleteStorage);
  expect(result).toEqual(expected);
})
