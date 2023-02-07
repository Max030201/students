export default class Student {
  constructor(name, surename, lastname, dateBirth, startTraining, faculty) {
    this.name = name
    this.surename = surename
    this.lastname = lastname
    this.dateBirth = dateBirth
    this.startTraining = startTraining
    this.faculty = faculty
  }

  get fio() {
    return this.surename+' '+this.name+' '+this.lastname
  }

  getFaculty() {
    return this.faculty
  }

  getAge() {
    let yyyy = this.dateBirth.getFullYear();
    let mm = this.dateBirth.getMonth() + 1;
    let dd = this.dateBirth.getDate();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const today = new Date ()
    let yyyyAge = today.getFullYear();

    const age = yyyyAge-yyyy;
    let years;
    let count = age % 100;
    if (count >= 5 && count <= 20) {
      years = 'лет';
    } else {
      count = count % 10;
      if (count == 1) {
        years = 'год';
      } else if (count >= 2 && count <= 4) {
        years = 'года';
      } else {
        years = 'лет';
      }
    }

    return dd+'.'+mm+'.'+yyyy+' '+`(${age} ${years})`;
  }

  getTrainingPeriod() {
    let currentTime = new Date();
    if ((currentTime.getMonth() + 1 >= 9 && (currentTime.getFullYear() - this.startTraining > 4)) || (currentTime.getFullYear() - this.startTraining > 4) ) {
      return `${+this.startTraining} - ${+this.startTraining + 4} (закончил)`;
    } else {
      return `${+this.startTraining} - ${+this.startTraining + 4} (${currentTime.getFullYear() - this.startTraining}-й курс)`;
    }
  }
}


