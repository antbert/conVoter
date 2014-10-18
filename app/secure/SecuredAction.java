package secure;

import models.pojo.AngularError;
import org.apache.commons.lang3.StringUtils;
import play.Logger;
import play.libs.F;
import play.libs.Json;
import play.mvc.Action;
import play.mvc.Http;
import play.mvc.Result;
import play.mvc.Results;

/**
 * Created by Antoni Bertel on 17.10.2014.
 */
public class SecuredAction extends Action<Secured> {
    private static final String LOGIN = "login";

    @Override
    public F.Promise<Result> call(Http.Context ctx) throws Throwable {
        try {
            String username = Authenticator.getUsername(ctx);
            if (StringUtils.isNotEmpty(username)) {
                try {
                    ctx.request().setUsername(username);
                    return delegate.call(ctx);
                } finally {
                    ctx.request().setUsername(null);
                }
            } else {
                Logger.error("Secured action not passed");

                Result unauthorized = Authenticator.onUnauthorized(ctx);
                return F.Promise.pure(unauthorized);
//                return F.Promise.pure(Results.badRequest("123"));
            }
        } catch (RuntimeException e) {
            throw e;
        } catch (Throwable t) {
            throw new RuntimeException(t);
        }
    }

    public static class Authenticator extends Results {

        public static String getUsername(Http.Context ctx) {
            return ctx.session().get(LOGIN);
        }

        public static Result onUnauthorized(Http.Context ctx) {
            return unauthorized(Json.toJson(new AngularError("You are not logged in")));
        }

    }

}