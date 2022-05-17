export default class ApiResponseDto {
    message?: string;
    data: any;
    error: boolean | undefined;
    statusCode?: number;
    stack?: string;
    take?: number;
    hasMore?: boolean;
    total?: number | undefined;
    skip?: number | undefined;
}
