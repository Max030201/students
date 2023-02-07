import Student from './students.js'
const originalStudents = [
  new Student('Максим', 'Земледух-Волкович', 'Сергеевич', new Date(2001, 1, 3), 2017, 'Экономики и права'),
  new Student('Ира', 'Степнякова', 'Игоревна', new Date(2002, 4, 5), 2019, 'Юриспруденции'),
  new Student('Никита', 'Мухоморов', 'Вадимович', new Date(2003, 6, 7), 2020, 'Журналистики')
]

let students = [...originalStudents];
const $studentsList = document.getElementById('students-list'),
      $studentsListTHAll = document.querySelectorAll('.studentsTable th')
let column = "fio",
    columDir = true


function newStudentTR(student) {
  const $studentTR = document.createElement('tr'),
        $fioTD = document.createElement('td'),
        $facTD = document.createElement('td'),
        $birthDateTD = document.createElement('td'),
        $trainingStartTD = document.createElement('td')

    $fioTD.textContent = student.fio
    $facTD.textContent = student.getFaculty()
    $birthDateTD.textContent = student.getAge()
    $trainingStartTD.textContent = student.getTrainingPeriod()

  $studentTR.append($fioTD)
  $studentTR.append($facTD)
  $studentTR.append($birthDateTD)
  $studentTR.append($trainingStartTD)

  return $studentTR;
}

function getSortStudents(prop, dir) {
  const studentsCopy = [...students]
  console.log(studentsCopy);
  return studentsCopy.sort(function(studentA, studentB) {
    if ((!dir == false ? studentA[prop] < studentB[prop] : studentA[prop] > studentB[prop]))
    return -1;
    console.log(studentA[prop]);
    console.log(studentB[prop]);
  })
}

function render() {
  let studentsCopy = [...students]

  studentsCopy = getSortStudents(column, columDir)

  $studentsList.innerHTML = ''
  for (const student of studentsCopy) {
    $studentsList.append(newStudentTR(student))
  }
}

$studentsListTHAll.forEach(element => {
  element.addEventListener('click', function() {
    column = this.dataset.column;
    columDir = !columDir
    render ()
  })
})

document.getElementById('add-student').addEventListener('submit', function(event) {
  event.preventDefault()

  let inpSurename = document.getElementById('input-surename');
  let inpName = document.getElementById('input-name');
  let inpLastname = document.getElementById('input-lastname');
  let inpDateBirth = document.getElementById('input-dateBirth');
  let inpStartTraining = document.getElementById('input-startTraining');
  let inpFaculty = document.getElementById('input-faculty');
  let inputs = [
    inpSurename,
    inpName,
    inpLastname,
    inpDateBirth,
    inpStartTraining,
    inpFaculty
  ];

  if (validationOfText(inputs) === false && validationStudyStart(inpStartTraining, 2000, Number(new Date().getFullYear())) === true && validationBirthDay(inpDateBirth, new Date(1900, 1, 1), new Date()) === true) {
    students.push(new Student(
      document.getElementById('input-name').value.trim(),
      document.getElementById('input-surename').value.trim(),
      document.getElementById('input-lastname').value.trim(),
      new Date(document.getElementById('input-dateBirth').value.trim()),
      Number(document.getElementById('input-startTraining').value.trim()),
      document.getElementById('input-faculty').value.trim(),
    ));
    render ()
  }

  (document.getElementById("input-name").value = ""),
  (document.getElementById("input-surename").value = ""),
  (document.getElementById("input-lastname").value = ""),
  (document.getElementById("input-dateBirth").value = ""),
  (document.getElementById("input-startTraining").value = ""),
  (document.getElementById("input-faculty").value = "");

  render ()
  event.target.reset();
})

render ();

function validationStudyStart(inputElements, min, max) {
  let correct = true;
  if (inputElements.value < min) {
    showError(inputElements, "Дата поступления не может быть раньше 2000 года. Заполните ");
    correct = false;
  } else if (inputElements.value > max) {
    showError(inputElements, "Дата поступления не может быть больше 2022 года. Заполните ");
    correct = false;
  } else {
    removeError(inputElements);
  }
  return correct;
}

function validationBirthDay(inputElements, min, max) {
  let correct = true;
  if (new Date(inputElements.value) < min) {
    showError(inputElements, "Дата рождения не может быть меньше 01.01.1900. Заполните ");
    correct = false;
  } else if (new Date(inputElements.value) > max) {
    showError(inputElements, "Дата рождения не может быть больше текущей даты. Заполните ");
    correct = false;
  } else {
    removeError(inputElements);
  }
  return correct;
}

function validationOfText(inputElements) {
  let correct = false;
  inputElements.forEach(function (input) {
    if (input.value === "") {
      showError(input, "Заполните");
      correct = true;
    } else {
      removeError(input);
    }
  });
  return correct;
}

function showError(input, message) {
  let $placeholder = input.getAttribute("placeholder");
  const $errorContainer = input.parentElement.querySelector(".error");
  $errorContainer.innerText = `${message} поле: ${$placeholder}`;
}

function removeError(input) {
  const $errorContainer = input.parentElement.querySelector(".error");
  $errorContainer.innerText = "";
}

function filterOfStudents() {
  let $filter_fio = document.getElementById("filter-fio").value;
  let $filter_faculty = document.getElementById("filter-faculty").value;
  let $filter_StudyStart = document.getElementById("filter-teachStart").value;
  let $filter_StudyOver = document.getElementById("filter-teachFinish").value;

  if (!$filter_fio && !$filter_faculty && !$filter_StudyStart && !$filter_StudyOver) {
    students = originalStudents;
    render();
    return;
  }

  const filterCount = [
    $filter_fio,
    $filter_faculty,
    $filter_StudyStart,
    $filter_StudyOver,
  ].filter((f) => f).length;

  students = originalStudents.filter((student) => {
    let count = 0;

    if ($filter_fio !== "") {
      if (student.name == $filter_fio) {
        count++;
      } else if (student.surename == $filter_fio) {
        count++;
      } else if (student.lastname == $filter_fio) {
        count++;
      }
    }

    if ($filter_faculty !== "") {
      if (student.faculty == $filter_faculty) {
        count++;
      }
    }

    if ($filter_StudyStart !== "") {
      if (student.startTraining == $filter_StudyStart) {
        count++;
      }
    }

    if ($filter_StudyOver !== "") {
      if (student.startTraining + 4 == $filter_StudyOver) {
        count++;
      }
    }

    return count === filterCount;
  });

  render();
}

document.getElementById("filter-form").addEventListener("submit", function (event) {
    event.preventDefault();
    filterOfStudents();

    document.getElementById("filter-fio").value = "";
    document.getElementById("filter-faculty").value = "";
    document.getElementById("filter-teachStart").value = "";
    document.getElementById("filter-teachFinish").value = "";

});
