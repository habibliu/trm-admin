import { OrganizationData } from './data';

let _Organizations = OrganizationData;

const OrganizationMock = mock => {

    //获取员工列表
    mock.onGet('/Organization/list').reply(config => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            treeData: _Organizations//全部返回
          }]);
        }, 1000);
      });
    });

   
    //删除员工
    mock.onGet('/Organization/remove').reply(config => {
      let { id } = config.params;
      _Organizations = _Organizations.filter(u => u.id !== id);
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
    mock.onGet('/Organization/edit').reply(config => {
      let { id, name, addr, age, birth, sex } = config.params;
      _Organizations.some(u => {
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
    mock.onGet('/Organization/add').reply(config => {
      let { name, addr, age, birth, sex } = config.params;
      _Organizations.push({
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
export default OrganizationMock;