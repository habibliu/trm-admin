//import axios from 'axios';
//import MockAdapter from 'axios-mock-adapter';
import { Coaches } from './coaches';
let _Coaches = Coaches;


const CoachMock = mock => {

    //获取员工列表
    mock.onGet('/Coach/list').reply(config => {
      let {name} = config.params;
      let mockCoaches = _Coaches.filter(coach => {
        if (name && coach.name.indexOf(name) == -1) return false;
        return true;
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            coaches: mockCoaches
          }]);
        }, 1000);
      });
    });

    //获取员工列表（分页）
    mock.onGet('/Coach/listpage').reply(config => {
      let {page, name, sex, phone} = config.params;
      let mockCoaches = _Coaches.filter(coach => {
        if (name && coach.name.indexOf(name) == -1) return false;
        if (sex && coach.sex != sex) return false;
        if (phone && coach.phone.indexOf(phone) == -1) return false;
        return true;
      });
      let total = mockCoaches.length;
      mockCoaches = mockCoaches.filter((u, index) => index < 20 * page && index >= 20 * (page - 1));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            total: total,
            coaches: mockCoaches
          }]);
        }, 1000);
      });
    });

    //删除员工
    mock.onGet('/Coach/remove').reply(config => {
      let { id } = config.params;
      _Coaches = _Coaches.filter(u => u.id !== id);
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
    mock.onGet('/Coach/batchremove').reply(config => {
      let { ids } = config.params;
      ids = ids.split(',');
      _Coaches = _Coaches.filter(u => !ids.includes(u.id));
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
    mock.onGet('/Coach/edit').reply(config => {
      let { id, name, addr, age, birth, sex } = config.params;
      _Coaches.some(u => {
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
    mock.onGet('/Coach/add').reply(config => {
      let { name, addr, age, birth, sex } = config.params;
      _Coaches.push({
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
export default CoachMock;