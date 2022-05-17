import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import ApiResponseService from "@/domain/services/ApiResponseService";
import apiRouter from "@/routes";
import bodyParser from 'body-parser';
import { loadInjectors } from "@/express-config/injectors";
import { rawBodySaver } from "@/express-config/middlewares/rawBodyParser";
import helmet from "helmet";
import compression from "compression";

const app = express();


const options = {
    verify: rawBodySaver
};

app.use(bodyParser.json(options));
app.use(loadInjectors)
app.use(helmet());
app.use(compression());
// Cors setup for allow external api calls
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/v1', apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    const apiResponse = ApiResponseService.getInstance(req, res);
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "dev" ? err : {};
    apiResponse.generateAndSendErrorResponse(err, {
        message: err.message,
        statusCode: 500
    });
});

export default app;
