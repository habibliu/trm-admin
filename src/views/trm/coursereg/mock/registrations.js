import Mock from 'mockjs';

import { Students,schools } from '../../../master/student/mock/students';
import { Courses } from '../../../master/course/mock/courses';


const Registrations = [];


for (let i = 0; i < 102; i++) {
  var course=Courses[Mock.Random.integer(0, Courses.length-1)];
  var student=Students[Mock.Random.integer(0, Students.length-1)];
  var payoff=Mock.Random.integer(0, 1);
  var registerDate=Mock.Random.date();
  var periods=Mock.Random.integer(1, 4);
  Registrations.push(Mock.mock({
    id: Mock.Random.guid(),
    courseName: course.name,
    courseGrade: course.grade,
    coursePhase: course.phase,
    totalFee: course.price * periods,
    totalSections:course.sections * periods + periods * 4,
    payoff:payoff,
    periods:periods,
    studentName: student.name,
    studentSchool: student.school,
    studentSex: student.sex,
    studentAge: student.age,
    studentTelephone: student.telephone,
    registerDate: Mock.Random.date(),
    paymentDate: payoff==1?registerDate:''
  }));
}

export { Registrations,Courses,schools };
