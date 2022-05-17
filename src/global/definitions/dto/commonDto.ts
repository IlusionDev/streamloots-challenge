/**
 * @description DTO for common data in search
 * @property {number} id - id of the entity
 * @property {number} take - number of entities to take
 * @property {number} skip - number of entities to skip
 */
export interface SearchOptionsDto {
  take: number;
  skip: number;
  getTranslations?: boolean;
}
