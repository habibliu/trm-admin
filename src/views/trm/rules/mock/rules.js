import Mock from 'mockjs';
import { Courses } from '../../../master/course/mock/courses';

const Rules = [];

if(Rules.length==0){
  for (let i = 0; i < 10; i++) {
    var course = Courses [Mock.Random.integer(0, Courses.length-1)];
    var periods= Mock.Random.integer(2, 4);
    Rules.push(Mock.mock({
      id: Mock.Random.guid(),
      courseName: course.name,
      periods:periods,
      freeSections: periods * 4,
      memo: Mock.Random.date()
    }));
  }
}


export { Rules };
