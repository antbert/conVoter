package controllers;

import com.avaje.ebean.Ebean;
import controllers.core.CorsAction;
import models.Jury;
import models.pojo.AngularError;
import models.pojo.AngularSuccess;
import play.Logger;
import play.data.Form;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;
import play.mvc.With;

public class Authorisation extends Controller {
    private final Form<Jury> juryForm = Form.form(Jury.class);

    @With(CorsAction.class)
    public Result login() {
        Logger.info("Try to login");
        Form<Jury> receivedForm = juryForm.bindFromRequest();
        if (receivedForm.hasErrors()) {
            Logger.error("Form has errors");
            return ok(Json.toJson(new AngularError("Cannot cast data to entity")));
        }
        Logger.info("Form has not errors");
        Jury jury = receivedForm.get();
        if (validateJury(jury)) {
            Logger.info("Yuri validated");
            session(Jury.LOGIN, jury.login);
            return ok(Json.toJson(new AngularSuccess("Authorisation passed")));
        }
        Logger.info("Yuri not validated ");
        return ok(Json.toJson(new AngularError("Can't find user")));
    }


    private boolean validateJury(Jury actual) {
        try {
            Jury expected = Ebean.find(Jury.class).where().eq("login", actual.login).findUnique();
            if (expected == null) {
                Logger.error("Can't get Jury from database");
                return false;
            }
            Logger.info("Actual password: " + actual.password + " , expected password " + expected.password);
            return actual.password.equals(expected.password);
        } catch (Throwable throwable) {
            Logger.error(throwable.getMessage());
            return false;
        }
    }
}
