import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import LoginMock from '@/views/login/mock/mock';
import EmployeeMock from '@/views/orgmgt/employee/mock/mock';
import OrganizationMock from '@/views/orgmgt/organization/mock/mock';
import DepartmentMock from '@/views/orgmgt/department/mock/mock';
import UserMock from '@/views/pms/user/mock/mock';
//基础资料
import  StudentMock from '@/views/master/student/mock/mock';
import  ParentMock from '@/views/master/parent/mock/mock';
import  CoachMock from '@/views/master/coach/mock/mock';
import  SportVenueMock from '@/views/master/venue/mock/mock';
import  CourseMock from '@/views/master/course/mock/mock';
//业务管理
import  CourseRegistrationMock from '@/views/trm/coursereg/mock/mock';
import  CoursePaymentMock from '@/views/trm/payment/mock/mock';
import  CourseScheduleMock from '@/views/trm/schedule/mock/mock';
import  AttendanceMock from '@/views/trm/attendance/mock/mock';
import  RuleMock from '@/views/trm/rules/mock/mock';

export default {
  /**
   * mock bootstrap
   */

  bootstrap() {

    let mock = new MockAdapter(axios);


    // mock success request
    mock.onGet('/success').reply(200, {
      msg: 'success'
    });

    // mock error request
    mock.onGet('/error').reply(500, {
      msg: 'failure'
    });
  
    try{
      LoginMock(mock);
      EmployeeMock(mock);
      OrganizationMock(mock);
      DepartmentMock(mock);
      UserMock(mock);
      StudentMock(mock);
      ParentMock(mock);
      CoachMock(mock);
      SportVenueMock(mock);
      CourseMock(mock);
      CourseRegistrationMock(mock);
      CoursePaymentMock(mock);
      CourseScheduleMock(mock);
      AttendanceMock(mock);
      RuleMock(mock);
    }catch(error){
      console.log(error);
    }
    
  }

};