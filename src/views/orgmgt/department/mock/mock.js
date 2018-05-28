import { DepartmentData } from './data';

let _Departments = DepartmentData;

const DepartmentMock = mock => {

    //获取部门
    mock.onGet('/Department/list').reply(config => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            treeData: _Departments//全部返回
          }]);
        }, 1000);
      });
    });

   
    //删除部门
    mock.onGet('/Department/remove').reply(config => {
      let { id } = config.params;
      _Departments = _Departments.filter(u => u.id !== id);
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
    mock.onGet('/Department/edit').reply(config => {
      let { id, name, addr, age, birth, sex } = config.params;
      _Departments.some(u => {
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
    mock.onGet('/Department/add').reply(config => {
      let { name, addr, age, birth, sex } = config.params;
      _Departments.push({
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
export default DepartmentMock;