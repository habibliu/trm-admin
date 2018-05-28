import Mock from 'mockjs';

const Venues = [];

const venueNames = ['华力','羽俱','堡狮龙','新兴月','仙杜拉','合力','仁龙','保芝林','行守冠','新塘中学','二小','仙村中学','永和中学','三中','毅海','富土康'];

for (let i = 0; i < 16; i++) {
  Venues.push(Mock.mock({
    id: Mock.Random.guid(),
    name: venueNames[i],
    addr: Mock.mock('@county(true)'),
    'age|8-20': 8,
    birth: Mock.Random.date(),
    sex: Mock.Random.integer(0, 1),
    telphone: Mock.Random.integer(13000000000,13999999999)
  }));
}

export { Venues };
