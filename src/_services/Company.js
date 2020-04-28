import qs from 'qs';

import AbstractService from './AbstractService'
import { ajaxRequest } from "../_helpers/ajax";
import CompanyEntity from '../_models/Company'

import { isEmpty } from '../_helpers/utils'

export default class Company extends AbstractService {

  static getEntities = async (filters) => {
    const queryString = isEmpty(filters) ? '' : '?' + qs.stringify(filters);
    const url = `${this.getApiDomain()}/api/v1/companies${queryString}`;

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
    const url = `${this.getApiDomain()}/api/v1/company/${id}`

    let item = new CompanyEntity();

    await ajaxRequest().get(url)
      .then(res => {
        if (200 === res.status) {
          item = new CompanyEntity(res.data.entity);
        }
      })
      .catch(error => {
        console.error("getCompany > ", error.response)
      });

    return item;
  }

  static setEntity = async (entity) => {
    const url = `${this.getApiDomain()}/api/v1/company`

    let item = false;

    if (null === entity.id) {
      await ajaxRequest().post(url, entity)
        .then(res => {
          if (200 === res.status) {
            item = new CompanyEntity(res.data);
          }
        })
        .catch(error => {
          console.error("setEntity > ", error.response)
        });
    } else {
      await ajaxRequest().put(`${url}/${entity.id}`, entity)
        .then(res => {
          if (200 === res.status) {
            item = new CompanyEntity(res.data);
          }
        })
        .catch(error => {
          console.error("setEntity > ", error.response)
        });
    }

    return item;
  }

  static disabled = async (id, enabled) => {
    const url = `${this.getApiDomain()}/api/v1/company/${id}`

    let item = false;

    await ajaxRequest().put(url, { enabled: enabled })
      .then(res => {
        if (200 === res.status) {
          item = new CompanyEntity(res.data);
        }
      })
      .catch(error => {
        console.error("disabled > ", error.response)
      });

    return item;
  }

  static delete = async (id) => {
    const url = `${this.getApiDomain()}/api/v1/company/${id}`

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
