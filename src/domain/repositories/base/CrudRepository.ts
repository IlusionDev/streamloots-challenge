import { CrudRepositoryInterface } from "@/global/definitions/CrudRepositoryInterface";
import { SearchOptionsDto } from "@/global/definitions/dto/commonDto";
import { HydratedDocument } from "mongoose";

/**
 * @class CrudRepository
 * @description Base repository class
 */
export default abstract class CrudRepository<T> implements CrudRepositoryInterface<T> {

    model: any;

    constructor(model: any) {
        this.model = model;
    }

    getOne(search: any, options?: SearchOptionsDto): Promise<HydratedDocument<T>> {
        return this.model.findOne(search)
    }

    getMany(search: any, options?: SearchOptionsDto): HydratedDocument<T>[] {
        return this.model.find(search)
    }

    async update(search, updateData): Promise<HydratedDocument<T>> {
            return await this.model.update(search, updateData);

    }

    async delete(data): Promise<any> {
            return await this.model.deleteOne(data)

    }

    async deleteMany(data): Promise<HydratedDocument<T>> {
            return await this.model.deleteMany(data)

    }

    create(data: any): Promise<HydratedDocument<T>> {
        return this.model.create(data);
    }

}
