package global;

import com.google.inject.AbstractModule;
import com.google.inject.Guice;
import com.google.inject.Injector;
import play.Application;
import play.GlobalSettings;
import play.Logger;

/**
 * Created by Antoni_Bertel on 10/16/2014.
 */
public class GoogleGuiceConfiguration extends GlobalSettings {
    public static final String APPLICATION_CONFIGURING_GOOGLE_GUICE = "Configuring google guice";
    private Injector injector;

    @Override
    public void onStart(Application app) {
        injector = configureInjector();
    }

    private Injector configureInjector() {
        Logger.info(APPLICATION_CONFIGURING_GOOGLE_GUICE);

        return Guice.createInjector(new AbstractModule() {
            @Override
            protected void configure() {
//                bind(UserDAO.class).to(UserDAOImpl.class);
//                bind(UserService.class).to(UserServiceImpl.class);
//
//                bind(FeatureDAO.class).to(FeatureDAOImpl.class);
//                bind(FeatureService.class).to(FeatureServiceImpl.class);
//
//                bind(SecurityService.class).to(SecurityServiceImpl.class);
            }
        });
    }

    public GoogleGuiceConfiguration(Injector injector) {
        this.injector = injector;
    }

    @Override
    public <T> T getControllerInstance(Class<T> aClass) throws Exception {
        return injector.getInstance(aClass);
    }
}
