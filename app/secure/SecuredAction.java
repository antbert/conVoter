package secure;

import models.Jury;
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

    public static final String SECURED_ACTION_NOT_PASSED_FOR = "Secured action not passed for ";
    public static final String YOU_ARE_NOT_LOGGED_IN = "You are not logged in";
    public static final String TRYING_LOGIN_WITH_USERNAME = "Trying login with username ";
    public static final String AUTHORISATION_PASSED = "Authorisation passed";

    @Override
    public F.Promise<Result> call(Http.Context ctx) throws Throwable {
        try {
            String username = Authenticator.getUsername(ctx);
            Logger.info(TRYING_LOGIN_WITH_USERNAME + username);
            if (StringUtils.isNotEmpty(username)) {
                try {
                    ctx.request().setUsername(username);
                    Logger.info(AUTHORISATION_PASSED);
                    return delegate.call(ctx);
                } finally {
                    ctx.request().setUsername(null);
                }
            } else {
                Logger.error(SECURED_ACTION_NOT_PASSED_FOR + username);

                Result unauthorized = Authenticator.onUnauthorized(ctx);
                return F.Promise.pure(unauthorized);
            }
        } catch (RuntimeException e) {
            throw e;
        } catch (Throwable t) {
            throw new RuntimeException(t);
        }
    }

    public static class Authenticator extends Results {

        public static String getUsername(Http.Context ctx) {
            return ctx.session().get(Jury.LOGIN);
        }

        public static Result onUnauthorized(Http.Context ctx) {
            return unauthorized(Json.toJson(new AngularError(YOU_ARE_NOT_LOGGED_IN)));
        }

    }

}