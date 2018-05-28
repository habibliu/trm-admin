//import axios from 'axios';
//import MockAdapter from 'axios-mock-adapter';
import { Registrations,Courses,schools } from './registrations';
let _Registrations = Registrations;
let _Courses = Courses;
let _Schools = schools;
const CourseRegistrationMock = mock => {

  //获课程列表
  mock.onGet('/CourseRegistration/Course/list').reply(config => {
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
      }, 100);
    });
  });

  //获课程列表
  mock.onGet('/CourseRegistration/Course/get').reply(config => {
    let {id} = config.params;
    let mockCourses = _Courses.filter(course => {
      if (id && course.id == id) return true;
      return false;
    });
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([200, {
          course: mockCourses[0]
        }]);
      }, 100);
    });
  });

  //获取场地列表
  mock.onGet('/CourseRegistration/list').reply(config => {
    let {name} = config.params;
    let mockVenues = _Registrations.filter(registration => {
      if (name && registration.name.indexOf(name) == -1) return false;
      return true;
    });
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([200, {
          registrations: mockVenues
        }]);
      }, 1000);
    });
  });

  //获取场地列表（分页）
  mock.onGet('/CourseRegistration/listpage').reply(config => {
    let {page, name, phone} = config.params;
    let mockVenues = _Registrations.filter(registration => {
      if (name && registration.name.indexOf(name) == -1) return false;
      if (phone && registration.phone.indexOf(phone) == -1) return false;
      return true;
    });
    let total = mockVenues.length;
    mockVenues = mockVenues.filter((u, index) => index < 20 * page && index >= 20 * (page - 1));
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([200, {
          total: total,
          registrations: mockVenues
        }]);
      }, 1000);
    });
  });

    //删除场地
    mock.onGet('/CourseRegistration/remove').reply(config => {
      let { id } = config.params;
      _Registrations = _Registrations.filter(u => u.id !== id);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '删除成功'
          }]);
        }, 500);
      });
    });

    //批量删除场地
    mock.onGet('/CourseRegistration/batchremove').reply(config => {
      let { ids } = config.params;
      ids = ids.split(',');
      _Registrations = _Registrations.filter(u => !ids.includes(u.id));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '删除成功'
          }]);
        }, 500);
      });
    });

    //编辑场地
    mock.onGet('/CourseRegistration/edit').reply(config => {
      let { id, name, addr, age, birth, sex } = config.params;
      _Registrations.some(u => {
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

    //新增场地
    mock.onGet('/CourseRegistration/add').reply(config => {
      let { name, addr, age, birth, sex } = config.params;
      _Registrations.push({
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
    mock.onGet('/CourseRegistration/listSchools').reply(config => {
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
export default CourseRegistrationMock;