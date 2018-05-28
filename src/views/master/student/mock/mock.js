//import axios from 'axios';
//import MockAdapter from 'axios-mock-adapter';
import { Students,schools } from './students';
let _Students = Students;
let _Schools = schools;
const StudentMock = mock => {

    //获取学生列表
    mock.onGet('/Student/list').reply(config => {
      let {name} = config.params;
      let mockStudents = _Students.filter(student => {
        if (name && student.name.indexOf(name) == -1) return false;
        return true;
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            students: mockStudents
          }]);
        }, 1000);
      });
    });

    //获取学生列表（分页）
    mock.onGet('/Student/listpage').reply(config => {
      let {page, name, sex, parentName} = config.params;
      let mockStudents = _Students.filter(student => {
        if (name && student.name.indexOf(name) == -1) return false;
        if (sex && student.sex != sex) return false;
        if (parentName && student.parentName.indexOf(parentName) == -1) return false;
        return true;
      });
      let total = mockStudents.length;
      mockStudents = mockStudents.filter((u, index) => index < 20 * page && index >= 20 * (page - 1));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            total: total,
            students: mockStudents
          }]);
        }, 1000);
      });
    });

    //删除学生
    mock.onGet('/Student/remove').reply(config => {
      let { id } = config.params;
      _Students = _Students.filter(u => u.id !== id);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '删除成功'
          }]);
        }, 500);
      });
    });

    //批量删除学生
    mock.onGet('/Student/batchremove').reply(config => {
      let { ids } = config.params;
      ids = ids.split(',');
      _Students = _Students.filter(u => !ids.includes(u.id));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '删除成功'
          }]);
        }, 500);
      });
    });

    //编辑学生
    mock.onGet('/Student/edit').reply(config => {
      let { id, name, addr, age, birth, sex } = config.params;
      _Students.some(u => {
        if (u.id === id) {
          u.name = name;
          u.addr = addr;
          u.age = age;
          u.birth = birth;
          u.sex = sex;
          return true;
        }
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '编辑成功'
          }]);
        }, 500);
      });
    });

    //新增学生
    mock.onGet('/Student/add').reply(config => {
      let { name, addr, age, birth, sex } = config.params;
      _Students.push({
        name: name,
        addr: addr,
        age: age,
        birth: birth,
        sex: sex
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '新增成功'
          }]);
        }, 500);
      });
    });
    //获取学校列表
    mock.onGet('/Student/listSchools').reply(config => {
      debugger;
      let {name} = config.params;
      let mockSchools = _Schools.filter(school => {
        if (name && school.name.indexOf(name) == -1) return false;
        return true;
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            schools: mockSchools
          }]);
        }, 100);
      });
    });
};
//要用这种方式导出;
export default StudentMock;