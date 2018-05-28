import Mock from 'mockjs';

const Students = [];

let currentDate = new Date();

const schools = [
  {id:'001', name:'新塘一小'},
  {id:'002', name:'新塘二小'},
  {id:'002', name:'菊泉中学'},
  {id:'004', name:'白江小学'},
  {id:'005', name:'新康小学'},
  {id:'006', name:'久裕小学'},
  {id:'007', name:'瑶田小学'},
  {id:'008', name:'白石小学'},
  {id:'009', name:'官湖小学'},
  {id:'010', name:'新墩小学'},
  {id:'011', name:'水南小学'},
  {id:'012', name:'东洲小学'},
  {id:'013', name:'西洲小学'},
  {id:'014', name:'新塘中学'},
  {id:'015', name:'新塘二中'},
  {id:'016', name:'新塘三中'}];

let STUDENT_COUNT=Mock.Random.integer(70,110);
let loop =0;
if (Students.length==0){
  while(loop<STUDENT_COUNT){
    var birthDate=Mock.Random.date();
    var borthYear=parseInt(birthDate.substring(0,5));
    var age = currentDate.getFullYear()-borthYear;
    if (age < 5 || age > 18) {
      continue;
    } 
    var parentTelephone=Mock.Random.integer(13000000000,13999999999);
    Students.push(Mock.mock({
      id: Mock.Random.guid(),
      name: Mock.Random.cname(),
      addr: Mock.mock('@county(true)'),
      birth: birthDate,
      height: Mock.Random.integer(110,170),
      age:age,
      school: schools[Mock.Random.integer(0,schools.length-1)].name,
      sex: Mock.Random.integer(0, 1),
      telephone:Mock.Random.integer(13000000000,13999999999),
      parentName: Mock.Random.cname(),
      parentSex: Mock.Random.integer(0, 1),
      parentTelephone: parentTelephone,
      parentWx: parentTelephone,
    }));
    loop++;
  }
}
export { Students,schools};
