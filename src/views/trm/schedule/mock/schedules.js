import Mock from 'mockjs';

const Courses = [];

const years=['2017','2018'];
const grades=[{id:1,name:'幼儿班',sections:8,price:800},{id:2,name:'基础班',sections:8,price:800},{id:3,name:'提高班',sections:16,price:1200},{id:4,name:'精英班',sections:24,price:1800}];
const phases=[{id:1,name:'第一阶段'},{id:2,name:'第二阶段'},{id:3,name:'第四阶段'},{id:4,name:'第四阶段'}];

for (let i = 0; i < 31; i++) {
  var grade=grades[Mock.Random.integer(0, 3)];
  Courses.push(Mock.mock({
    id: Mock.Random.guid(),
    name:years[Mock.Random.integer(0, 1)]+grade['name'],
    grade: grade,
    phase: phases[Mock.Random.integer(0, 3)],
    sections: grade['sections'],
    price: grade['price'],
  }));
}

const Venues = [];

const venueNames = ['华力','羽俱','堡狮龙','新兴月','仙杜拉','合力','仁龙','保芝林','行守冠','新塘中学','二小','仙村中学','永和中学','三中','毅海','富土康'];

for (let i = 0; i < 16; i++) {
  Venues.push(Mock.mock({
    id: Mock.Random.guid(),
    name: venueNames[i],
    addr: Mock.mock('@county(true)')
  }));
}

const Coaches = [];

for (let i = 0; i < 123; i++) {
  Coaches.push(Mock.mock({
    id: Mock.Random.guid(),
    name: Mock.Random.cname(),
    birth: Mock.Random.date(),
    sex: Mock.Random.integer(0, 1),
    telphone: Mock.Random.integer(13000000000,13999999999)
  }));
}

const CourseStudents = [];

for (let i = 0; i < 231; i++) {
  let course = Courses[Mock.Random.integer(0, 30)];
  CourseStudents.push(Mock.mock({
    id: Mock.Random.guid(),
    name: Mock.Random.cname(),
    course: course['id'],
    sections: course['sections'],
    beingSchedule:course['sections']

  }));
}


export { Courses,Venues,Coaches,CourseStudents };
