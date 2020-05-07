import qs from 'qs';

import AbstractService from './AbstractService'
import { ajaxRequest } from "../_helpers/ajax";
import { isEmpty } from '../_helpers/utils'

export default class QueueSchedulerHistory extends AbstractService {

  static getHistory = async (scheduleId, filters) => {
    const queryString = isEmpty(filters) ? '' : '?' + qs.stringify(filters);
    const url = `${this.getApiDomain()}/api/v1/queue_scheduler/history/${scheduleId}${queryString}`;

    let items = [];

    await ajaxRequest().get(url)
      .then(res => {
        if (200 === res.status) {
          items = res.data;
        }
      })
      .catch(error => {
        console.error("getHistory > ", error.response)
      });

    return items;
  }

  static getResume = async (scheduleId, workId, filters) => {
    const queryString = isEmpty(filters) ? '' : '?' + qs.stringify(filters);
    const url = `${this.getApiDomain()}/api/v1/queue_scheduler/resume/${scheduleId}/${workId}${queryString}`;

    let items = {
      counter: 0,
      entities: [],
    };

    await ajaxRequest().get(url)
      .then(res => {
        if (200 === res.status) {
          items = res.data;
        }
      })
      .catch(error => {
        console.error("getResume > ", error.response)
      });

    return items;
  }

  static getDetails = async (workId, filters) => {
    const queryString = isEmpty(filters) ? '' : '?' + qs.stringify(filters);
    const url = `${this.getApiDomain()}/api/v1/queue_scheduler/details/${workId}${queryString}`;

    let items = {
      counter: 0,
      entities: [],
    };

    await ajaxRequest().get(url)
      .then(res => {
        if (200 === res.status) {
          items = res.data;
        }
      })
      .catch(error => {
        console.error("getHistory > ", error.response)
      });

    return items;
  }

}
