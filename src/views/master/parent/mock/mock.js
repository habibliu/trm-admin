//import axios from 'axios';
//import MockAdapter from 'axios-mock-adapter';
import { Parents } from './parents';
let _Parents = Parents;


const ParentMock = mock => {

    //获取员工列表
    mock.onGet('/Parent/list').reply(config => {
      let {name} = config.params;
      let mockParents = _Parents.filter(parent => {
        if (name && parent.name.indexOf(name) == -1) return false;
        return true;
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            parents: mockParents
          }]);
        }, 1000);
      });
    });

    //获取员工列表（分页）
    mock.onGet('/Parent/listpage').reply(config => {
      let {page, name, sex, phone} = config.params;
      let mockParents = _Parents.filter(parent => {
        if (name && parent.name.indexOf(name) == -1) return false;
        if (sex && parent.sex != sex) return false;
        if (phone && parent.phone.indexOf(phone) == -1) return false;
        return true;
      });
      let total = mockParents.length;
      mockParents = mockParents.filter((u, index) => index < 20 * page && index >= 20 * (page - 1));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            total: total,
            parents: mockParents
          }]);
        }, 1000);
      });
    });

    //删除员工
    mock.onGet('/Parent/remove').reply(config => {
      let { id } = config.params;
      _Parents = _Parents.filter(u => u.id !== id);
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
    mock.onGet('/Parent/batchremove').reply(config => {
      let { ids } = config.params;
      ids = ids.split(',');
      _Parents = _Parents.filter(u => !ids.includes(u.id));
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
    mock.onGet('/Parent/edit').reply(config => {
      let { id, name, addr, age, birth, sex } = config.params;
      _Parents.some(u => {
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
    mock.onGet('/Parent/add').reply(config => {
      let { name, addr, age, birth, sex } = config.params;
      _Parents.push({
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
export default ParentMock;