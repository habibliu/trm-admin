

const OrganizationData=[{
  id: 1,
  code:'000000',
  label: '恒大集团',
  type:0,
  director:'许家印',
  telephone:'243123412',
  addr:'花果山水濂洞',
  children:[
  {
    id: 1,
    code:'001',
    label: '华南区',
    type:1,
    director:'陈非年',
    telephone:'1330120012121',
    addr:'广州市椒江东路',
    children: [{
      id: 4,
      code:'923232',
      label: '广州分公司',
      type:2,
      director:'朱广沪',
      telephone:'134343223423',
      addr:'广州市白云区增槎路223号',
      children: [{
        id: 9,
        code:'34132',
        label: '恒大山水城',
        type:3,
        director:'李恒星',
        telephone:'123423233424',
        addr:'增城区朱村镇恒大山水城'
      }, {
        id: 10,
        code:'3324342',
        label: '星湖水郡',
        type:3,
        director:'江小白',
        telephone:'2234132143',
        addr:'花都区人民路89路-9'
      }]
    }]
  }, {
    id: 2,
    label: '华北区',
    type:2,
    children: [{
      id: 5,
      label: '北京分公司',
      type:3
    }, {
      id: 6,
      label: '天津分公司',
      type:3
    }]
  }, {
    id: 3,
    label: '华东区',
    type:2,
    children: [{
      id: 7,
      label: '上海分公司',
      type:3
    }, {
      id: 8,
      label: '南京分公司',
      type:3
    }]
  }]
}];


export  { OrganizationData };