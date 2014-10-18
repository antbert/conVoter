package controllers;

import com.avaje.ebean.Ebean;
import controllers.core.CorsAction;
import models.Competition;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;
import play.mvc.With;

public class RestGet extends Controller {

    @With(CorsAction.class)
    public Result competition(String competitionId) {
        Integer competitionIdI = Integer.parseInt(competitionId);
        return ok(Json.toJson(Ebean.find(Competition.class).
                where().eq("id", competitionIdI).findList()));
    }


}
