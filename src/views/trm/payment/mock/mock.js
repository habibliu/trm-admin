//import axios from 'axios';
//import MockAdapter from 'axios-mock-adapter';
import { Payments } from './payments';
let _Payments = Payments;


const CoursePaymentMock = mock => {

    //获取场地列表
    mock.onGet('/CoursePayment/list').reply(config => {
      let {name} = config.params;
      let mockVenues = _Payments.filter(payment => {
        if (name && payment.name.indexOf(name) == -1) return false;
        return true;
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            payments: mockVenues
          }]);
        }, 1000);
      });
    });

    //获取场地列表（分页）
    mock.onGet('/CoursePayment/listpage').reply(config => {
      let {page, name, phone} = config.params;
      let mockVenues = _Payments.filter(payment => {
        if (name && payment.name.indexOf(name) == -1) return false;
        if (phone && payment.phone.indexOf(phone) == -1) return false;
        return true;
      });
      let total = mockVenues.length;
      mockVenues = mockVenues.filter((u, index) => index < 20 * page && index >= 20 * (page - 1));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            total: total,
            payments: mockVenues
          }]);
        }, 1000);
      });
    });

    //删除场地
    mock.onGet('/CoursePayment/remove').reply(config => {
      let { id } = config.params;
      _Payments = _Payments.filter(u => u.id !== id);
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
    mock.onGet('/CoursePayment/batchremove').reply(config => {
      let { ids } = config.params;
      ids = ids.split(',');
      _Payments = _Payments.filter(u => !ids.includes(u.id));
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
    mock.onGet('/CoursePayment/edit').reply(config => {
      let { id, name, addr, age, birth, sex } = config.params;
      _Payments.some(u => {
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
    mock.onGet('/CoursePayment/add').reply(config => {
      let { name, addr, age, birth, sex } = config.params;
      _Payments.push({
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
export default CoursePaymentMock;