//import axios from 'axios';
//import MockAdapter from 'axios-mock-adapter';
import { Courses } from './courses';
let _Courses = Courses;

const CourseMock = mock => {

    //获取员工列表
    mock.onGet('/Course/list').reply(config => {
      let {name} = config.params;
      let mockCourses = _Courses.filter(course => {
        if (name && course.name.indexOf(name) == -1) return false;
        return true;
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            courses: mockCourses
          }]);
        }, 1000);
      });
    });

    //获取员工列表（分页）
    mock.onGet('/Course/listpage').reply(config => {
      let {page, name, sex, phone} = config.params;
      let mockCourses = _Courses.filter(course => {
        if (name && course.name.indexOf(name) == -1) return false;
        if (sex && course.sex != sex) return false;
        if (phone && course.phone.indexOf(phone) == -1) return false;
        return true;
      });
      let total = mockCourses.length;
      mockCourses = mockCourses.filter((u, index) => index < 20 * page && index >= 20 * (page - 1));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            total: total,
            courses: mockCourses
          }]);
        }, 1000);
      });
    });

    //删除员工
    mock.onGet('/Course/remove').reply(config => {
      let { id } = config.params;
      _Courses = _Courses.filter(u => u.id !== id);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '删除成功'
          }]);
        }, 500);
      });
    });

    //批量删除员工
    mock.onGet('/Course/batchremove').reply(config => {
      let { ids } = config.params;
      ids = ids.split(',');
      _Courses = _Courses.filter(u => !ids.includes(u.id));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '删除成功'
          }]);
        }, 500);
      });
    });

    //编辑员工
    mock.onGet('/Course/edit').reply(config => {
      let { id, name, addr, age, birth, sex } = config.params;
      _Courses.some(u => {
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

    //新增员工
    mock.onGet('/Course/add').reply(config => {
      let { name, addr, age, birth, sex } = config.params;
      _Courses.push({
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
};
//要用这种方式导出;
export default CourseMock;