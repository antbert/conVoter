package configuration;

import com.avaje.ebean.Ebean;
import com.avaje.ebean.config.ServerConfig;
import com.avaje.ebean.event.ServerConfigStartup;
import models.Jury;
import play.Logger;

/**
 * Created by Antoni Bertel on 17.10.2014.
 */
public class StartupConfig implements ServerConfigStartup {
    @Override
    public void onStart(ServerConfig serverConfig) {
        Logger.info("StartupConfig: configuring");
        Ebean.save(new Jury("name", "login", "password"));
    }
}
