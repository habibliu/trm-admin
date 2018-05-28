//import axios from 'axios';
//import MockAdapter from 'axios-mock-adapter';
import { Employees } from './employeeData';
let _Employees = Employees;


const EmployeeMock = mock => {

    //获取员工列表
    mock.onGet('/Employee/list').reply(config => {
      debugger;
      let {name} = config.params;
      let mockUsers = _Employees.filter(employee => {
        if (name && employee.name.indexOf(name) == -1) return false;
        return true;
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            employees: mockUsers
          }]);
        }, 1000);
      });
    });

    //获取员工列表（分页）
    mock.onGet('/Employee/listpage').reply(config => {
      debugger;
      let {page, name} = config.params;
      let mockUsers = _Employees.filter(employee => {
        if (name && employee.name.indexOf(name) == -1) return false;
        return true;
      });
      let total = mockUsers.length;
      mockUsers = mockUsers.filter((u, index) => index < 20 * page && index >= 20 * (page - 1));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            total: total,
            employees: mockUsers
          }]);
        }, 1000);
      });
    });

    //删除员工
    mock.onGet('/Employee/remove').reply(config => {
      let { id } = config.params;
      _Employees = _Employees.filter(u => u.id !== id);
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
    mock.onGet('/Employee/batchremove').reply(config => {
      let { ids } = config.params;
      ids = ids.split(',');
      _Employees = _Employees.filter(u => !ids.includes(u.id));
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
    mock.onGet('/Employee/edit').reply(config => {
      let { id, name, addr, age, birth, sex } = config.params;
      _Employees.some(u => {
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
    mock.onGet('/Employee/add').reply(config => {
      let { name, addr, age, birth, sex } = config.params;
      _Employees.push({
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
export default EmployeeMock;