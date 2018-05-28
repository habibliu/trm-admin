//import axios from 'axios';
//import MockAdapter from 'axios-mock-adapter';
import { Courses,Venues,Coaches ,CourseStudents} from './schedules';
let _Courses = Courses;
let _Venues = Venues;
let _Coaches = Coaches;
let _CourseStudents = CourseStudents;

const CourseScheduleMock = mock => {

    //获课程列表
    mock.onGet('/CourseSchedule/Course/list').reply(config => {
      let {name} = config.params;
      let mockCourses = _Courses.filter(course => {
        if (name && course.name.indexOf(name) == -1) return false;
        return true;
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            courses: mockCourses
          }]);
        }, 100);
      });
    });
    //获教练列表
    mock.onGet('/CourseSchedule/Coach/list').reply(config => {
      let {name} = config.params;
      let mockCoaches = _Coaches.filter(coach => {
        if (name && coach.name.indexOf(name) == -1) return false;
        return true;
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            coaches: mockCoaches
          }]);
        }, 100);
      });
    });
    //获取场地列表
    mock.onGet('/CourseSchedule/Venue/list').reply(config => {
      let {name} = config.params;
      let mockVenues = _Venues.filter(venue => {
        if (name && venue.name.indexOf(name) == -1) return false;
        return true;
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            venues: mockVenues
          }]);
        }, 100);
      });
    });

    //获取课程的报名学生
    mock.onGet('/CourseSchedule/Student/list').reply(config => {
      let {course} = config.params;
      let mockStudents = _CourseStudents.filter(student => {
        if (course && student.course.indexOf(course) == -1) return false;
        return true;
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            students: mockStudents
          }]);
        }, 100);
      });
    });

    //获取场地列表（分页）
    mock.onGet('/CourseSchedule/listpage').reply(config => {
      let {page, name} = config.params;
      let mockVenues = _Schedules.filter(schedule => {
        if (name && schedule.name.indexOf(name) == -1) return false;
        return true;
      });
      let total = mockVenues.length;
      mockVenues = mockVenues.filter((u, index) => index < 20 * page && index >= 20 * (page - 1));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            total: total,
            schedules: mockVenues
          }]);
        }, 1000);
      });
    });

    
};
//要用这种方式导出;
export default CourseScheduleMock;