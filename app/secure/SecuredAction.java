package secure;

import org.apache.commons.lang3.StringUtils;
import play.libs.F;
import play.mvc.Action;
import play.mvc.Http;
import play.mvc.Result;
import play.mvc.Results;

/**
 * Created by Antoni Bertel on 17.10.2014.
 */
public class SecuredAction extends Action<Secured> {
    private static final String USERNAME = "username";

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
            return ctx.session().get(USERNAME);
        }

        public static Result onUnauthorized(Http.Context ctx) {
            return unauthorized(views.html.defaultpages.unauthorized.render());
        }

    }

}