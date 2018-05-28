import Mock from 'mockjs';

const organizations=['集团总部','北京分公司','广州分公司','南京分公司','西安分公司'];

const Users = [];

for (let i = 0; i < 86; i++) {
  Users.push(Mock.mock({
    id: Mock.Random.guid(),
    name: Mock.Random.cname(),
    account: Mock.Random.first(),
    organization:organizations[Mock.Random.integer(0,4)],
    addr: Mock.mock('@county(true)'),
    'age|18-60': 1,
    birth: Mock.Random.date(),
    sex: Mock.Random.integer(0, 1)
  }));
}

export { Users };
