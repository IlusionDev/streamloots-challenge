import { SearchOptionsDto } from "@/global/definitions/dto/commonDto";
import { HydratedDocument } from "mongoose";

/**
 * @interface CrudRepositoryInterface
 * @description Repository interface
 */
export interface CrudRepositoryInterface<T> {
  create(data: any): Promise<HydratedDocument<T>>;
  update(id: number, data: any): Promise<HydratedDocument<T>>;
  delete(id: number): Promise<HydratedDocument<T>>;
  getOne(id: number): Promise<HydratedDocument<T>>;
  getMany(search: any, options: SearchOptionsDto): HydratedDocument<T>[];
}
