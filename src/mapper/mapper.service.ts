import { Injectable, Post } from '@nestjs/common';
import { resolve } from 'path/posix';

const noSuchValue = 'No such value'
const entityExists = 'Entity with such key exists'
const entityAdded = 'Entity added'

@Injectable()
export class MapperService {
  constructor() {}

  private data: DatabaseEntity[] = [
    {
      key: "testKey",
      value: "testValue"
    }
  ]
  
  async get(key: string): Promise<DatabaseEntity> {
    return new Promise<DatabaseEntity>((res, rej) => {
      let v = this.data.find(entity => (entity.key == key))
      if (v !== undefined) {
        console.log(v)
        res(v)
        return 
      }
      rej(noSuchValue)
    })
  }

  async set(entity: DatabaseEntity): Promise<DatabaseEntity> {
    return this.get(entity.key).then(err => Promise.reject(entityExists)).catch(err => {
      if (err == entityExists) {
        return Promise.reject(err)
      }
      console.log(err)
      this.data.push(entity)
      return Promise.resolve(entity)
    })
  }

  getAll(): DatabaseEntity[] {
     return this.data;
  }
}
