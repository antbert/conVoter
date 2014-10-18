package controllers.core;

import play.Logger;
import play.libs.F;
import play.mvc.Action;
import play.mvc.Http.Context;
import play.mvc.Http.Response;
import play.mvc.Result;


/**
 * Created by Antoni Bertel on 17.10.2014.
 */
public class CorsAction extends Action.Simple {


    public static final String TRYING_TO_SET_DEFAULT_HEADERS_TO_RESPONSE = "Trying to set default headers to response";

    @Override
    public F.Promise<Result> call(Context context) throws Throwable {
        Logger.info(TRYING_TO_SET_DEFAULT_HEADERS_TO_RESPONSE);
        Response response = context.response();
        response.setHeader("Access-Control-Allow-Origin", "*");

        //Handle preflight requests
        if (context.request().method().equals("OPTIONS")) {
            response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
            response.setHeader("Access-Control-Max-Age", "3600");
            response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Auth-Token");
            response.setHeader("Access-Control-Allow-Credentials", "true");

            return delegate.call(context);
        }

        response.setHeader("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, X-Auth-Token");
        return delegate.call(context);
    }
}
