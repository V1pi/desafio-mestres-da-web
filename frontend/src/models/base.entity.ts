export abstract class BaseModel<T> {
  id!: number

  abstract fillFromJson(json: any): T
}
