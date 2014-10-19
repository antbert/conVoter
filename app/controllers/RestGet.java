package controllers;

import com.avaje.ebean.Ebean;
import controllers.core.CorsAction;
import models.*;
import models.pojo.JsonGlobal;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;
import play.mvc.With;

import java.util.ArrayList;

public class RestGet extends Controller {

    @With(CorsAction.class)
    public Result addJuryVoute() {
        String projectId = request().getQueryString("projectId");
        Integer mark = Integer.parseInt(request().getQueryString("juryId"));
        Jury jury = Ebean.find(Jury.class).where().eq(Jury.LOGIN, "login").findUnique();
        Project project = Ebean.find(Project.class).where().eq("id", projectId).findUnique();
        Rating rating = new Rating();
        rating.jury = jury;
        rating.project = project;
        rating.mark = mark;
        Ebean.save(rating);
        return ok();
    }

    @With(CorsAction.class)
    public Result addParticipantVoute() {
        String projectId = request().getQueryString("projectId");
        Project project = Ebean.find(Project.class).where().eq("id", projectId).findUnique();
        project.participantsCount++;
        Ebean.update(project);
        return ok();
    }

    @With(CorsAction.class)
    public Result competition(String competitionId) {
        Integer competitionIdI = Integer.parseInt(competitionId);
        JsonGlobal jsonGlobal = new JsonGlobal();
        jsonGlobal.competitionsOfCurrentUser = new ArrayList<>();
        //session().get(Jury.LOGIN)

        Jury currentJury = Ebean.find(Jury.class).where().eq(Jury.LOGIN, "login").findUnique();
        jsonGlobal.userInfo = currentJury;
        jsonGlobal.competitionsOfCurrentUser.addAll(currentJury.competitions);
        //current for copy
        Competition currentCompetition = Ebean.find(Competition.class).
                where().eq("id", competitionIdI).findUnique();
        RecursiveCompetition recursiveCompetition = new RecursiveCompetition(currentCompetition);

        jsonGlobal.currentCompetition = recursiveCompetition;

//        models.addAll(Ebean.find(Jury.class).where().eq(Jury.LOGIN, session().get(Jury.LOGIN)).findUnique().competitions);
        return ok(Json.toJson(jsonGlobal));
    }

}
