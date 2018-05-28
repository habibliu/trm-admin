

const DepartmentData=[{
  id: 1,
  code:'000000',
  label: '恒大集团',
  director:'许家印',
  telephone:'243123412',
  addr:'花果山水濂洞',
  children:[
  {
    id: 1,
    code:'001',
    label: '采购中心',
    director:'陈非年',
    telephone:'1330120012121',
    addr:'广州市椒江东路',
    children: [{
      id: 4,
      code:'923232',
      label: '易耗品采购部',
      director:'朱广沪',
      telephone:'134343223423',
      addr:'广州市白云区增槎路223号',
      children: [{
        id: 9,
        code:'34132',
        label: '办公用品采购部',
        director:'李恒星',
        telephone:'123423233424',
        addr:'增城区朱村镇恒大山水城'
      }, {
        id: 10,
        code:'3324342',
        label: '家装小饰品采购部',
        director:'江小白',
        telephone:'2234132143',
        addr:'花都区人民路89路-9'
      }]
    }]
  }, {
    id: 2,
    label: '运营中心',
    children: [{
      id: 5,
      label: '市场营销部'
    }, {
      id: 6,
      label: '客户管理部'
    }]
  }, {
    id: 3,
    label: '信息部',
    children: [{
      id: 7,
      label: '应用运维组'
    }, {
      id: 8,
      label: '系统运维组'
    }]
  }]
}];


export  { DepartmentData };