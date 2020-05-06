import qs from 'qs';

import AbstractService from './AbstractService'
import { ajaxRequest } from "../_helpers/ajax";
import QueueSchedulerEntity from '../_models/QueueScheduler'

import { isEmpty } from '../_helpers/utils'

export default class QueueScheduler extends AbstractService {

  static getEntities = async (filters) => {
    const queryString = isEmpty(filters) ? '' : '?' + qs.stringify(filters);
    const url = `${this.getApiDomain()}/api/v1/queues_scheduler${queryString}`;

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
        console.error("getEntities > ", error.response)
      });

    return items;
  }

  static getEntity = async (id) => {
    const url = `${this.getApiDomain()}/api/v1/queue_scheduler/${id}`

    let item = new QueueSchedulerEntity();

    await ajaxRequest().get(url)
      .then(res => {
        if (200 === res.status) {
          item = new QueueSchedulerEntity(res.data.entity);
        }
      })
      .catch(error => {
        console.error("getCompany > ", error.response)
      });

    return item;
  }

  static setEntity = async (entity) => {
    const url = `${this.getApiDomain()}/api/v1/queue_scheduler`

    let item = false;

    if (null === entity.id) {
      await ajaxRequest().post(url, entity)
        .then(res => {
          if (201 === res.status) {
            item = new QueueSchedulerEntity(res.data);
          }
        })
        .catch(error => {
          console.error("setEntity > ", error.response)
        });
    } else {
      await ajaxRequest().put(`${url}/${entity.id}`, entity)
        .then(res => {
          if (200 === res.status) {
            item = new QueueSchedulerEntity(res.data);
          }
        })
        .catch(error => {
          console.error("setEntity > ", error.response)
        });
    }

    return item;
  }

  static launch = async (id) => {
    const url = `${this.getApiDomain()}/api/v1/queue_scheduler/schedule/${id}`

    let item = false;

    await ajaxRequest().put(url)
      .then(res => {
        if (200 === res.status) {
          item = true;
        }
      })
      .catch(error => {
        console.error("launch > ", error.response)
      });

    return item;
  }

  static disabled = async (id, enabled) => {
    const url = `${this.getApiDomain()}/api/v1/queue_scheduler/${id}`

    let item = false;

    await ajaxRequest().put(url, { enabled: enabled })
      .then(res => {
        if (200 === res.status) {
          item = new QueueSchedulerEntity(res.data);
        }
      })
      .catch(error => {
        console.error("disabled > ", error.response)
      });

    return item;
  }

  static delete = async (id) => {
    const url = `${this.getApiDomain()}/api/v1/queue_scheduler/${id}`

    let ok = false;

    await ajaxRequest().delete(url)
      .then(res => {
        if (200 === res.status) {
          ok = true;
        }
      })
      .catch(error => {
        console.error("delete > ", error.response)
      });

    return ok;
  }

}
