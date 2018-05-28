//import axios from 'axios';
//import MockAdapter from 'axios-mock-adapter';
import { Rules } from './rules';
let _Rules = Rules;


const RuleMock = mock => {

    //获取赠送规则列表
    mock.onGet('/RuleSetting/list').reply(config => {
      let {courseName} = config.params;
      let mockRules = _Rules.filter(rule => {
        if (courseName && rule.courseName.indexOf(courseName) == -1) return false;
        return true;
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            rules: mockRules
          }]);
        }, 1000);
      });
    });

    //获取赠送规则列表（分页）
    mock.onGet('/RuleSetting/listpage').reply(config => {
      let {page, courseName} = config.params;
      let mockRules = _Rules.filter(rule => {
        if (courseName && rule.courseName.indexOf(courseName) == -1) return false;
      
        return true;
      });
      let total = mockRules.length;
      mockRules = mockRules.filter((u, index) => index < 20 * page && index >= 20 * (page - 1));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            total: total,
            rules: mockRules
          }]);
        }, 1000);
      });
    });

    //删除赠送规则
    mock.onGet('/RuleSetting/remove').reply(config => {
      let { id } = config.params;
      _Rules = _Rules.filter(u => u.id !== id);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '删除成功'
          }]);
        }, 500);
      });
    });

    //批量删除赠送规则
    mock.onGet('/RuleSetting/batchremove').reply(config => {
      let { ids } = config.params;
      ids = ids.split(',');
      _Rules = _Rules.filter(u => !ids.includes(u.id));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '删除成功'
          }]);
        }, 500);
      });
    });

    //编辑赠送规则
    mock.onGet('/RuleSetting/edit').reply(config => {
      let { id, name, addr, age, birth, sex } = config.params;
      _Rules.some(u => {
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

    //新增赠送规则
    mock.onGet('/RuleSetting/add').reply(config => {
      let { name, addr, age, birth, sex } = config.params;
      _Rules.push({
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
export default RuleMock;