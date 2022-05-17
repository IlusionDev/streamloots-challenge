/**
 * @interface
 * @description DTO for IntUserService search function
 * @property {string} name - User name
 * @property {string} email - User email
 * @property {string} surname - User surname
 * @property {number} skip - Number of records to skip
 * @property {number} take - Number of records to return
 */
export interface UserServiceSearchDto {
  id?: number;
  name?: string;
  email?: string;
  surname?: string;
  take?: number;
  skip?: number;
  active?: boolean;
}

/**
 * @interface
 * @description DTO for IntUserService update function
 * @property {string} name - User name
 * @property {string} email - User email
 * @property {string} surname - User surname
 * @property {string} password - User password encrypted with bcrypt
 * @property {boolean} active - User activation status
 */
export interface UserServiceUpdateDto {
  email?: string;
  name?: string;
  surname?: string;
  password?: string;
  active?: boolean;
}

/**
 * @interface
 * @description DTO for IntUserService create function
 * @property {string} name - User name
 * @property {string} email - User email
 * @property {string} surname - User surname
 * @property {string} password - User password encrypted with bcrypt
 * @property {boolean} active - User activation status
 */
export interface UserServiceCreateDto {
  name: string;
  email: string;
  password: string;
  active: boolean;
  surname: string;
}
